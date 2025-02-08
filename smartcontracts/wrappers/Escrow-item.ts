import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SendMode } from '@ton/core';

export type EscrowConfig = {
    // owner: Address;
    // collectionAddress: Address;
    // status: number
    // price: bigint
    // fee: number
    // index: bigint
    // tonOrUsdt: number
    // buyerAddres: Address
    // usdtWallet: Address
    // appovedBy: Address
};

export function escrowConfigToCell(config: EscrowConfig): Cell {
    return beginCell().endCell();
}
//.storeUint(config.index, 64).storeAddress(config.collectionAddress).storeUint(config.status, 2).storeUint(config.tonOrUsdt, 1).storeCoins(config.price).storeUint(config.fee, 16).storeAddress(config.owner).storeAddress(config.buyerAddres).storeAddress(config.usdtWallet).storeAddress(config.appovedBy).
export const Opcodes = {
    cancel: 0,
    approveByMaster: 10,
    approveByUser: 11,
    payInTons: 12,
    payInUsdt: 0x7362d09,
    getUsdtWallet: 0xd1735400
};

export class EscrowItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new EscrowItem(address);
    }

    static createFromConfig(config: EscrowConfig, code: Cell, workchain = 0) {
        const data = escrowConfigToCell(config);
        const init = { code, data };
        return new EscrowItem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }


    async sendCancelBySeller(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.cancel, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }

    async sendApproveByMaster(
        provider: ContractProvider,
        via: Sender,
        opts: {
            approve: number;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.approveByMaster, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.approve, 1)
                .endCell(),
        });
    }

    async sendApproveByUser(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.approveByUser, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }

    async sendPayInTons(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.payInTons, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }

    async sendPayInUsdt(
        provider: ContractProvider,
        via: Sender,
        opts: {
            amount: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.payInUsdt, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeCoins(opts.amount)
                .endCell(),
        });
    }

    async sendGetWallet(
        provider: ContractProvider,
        via: Sender,
        opts: {
            usdtWallet: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.getUsdtWallet, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.usdtWallet)
                .endCell(),
        });
    }


    async getData(provider: ContractProvider) {
        const {stack} = (await provider.get('get_all_data', []));
        const index = stack.readBigNumber()
        const collection_address = stack.readAddress()
        const status = stack.readBigNumber()
        const tonOrUsdt = stack.readBigNumber()
        const price = stack.readBigNumber()
        const fee = stack.readBigNumber()
        const ownerAddress = stack.readAddress()
        const sellerAddress = stack.readAddressOpt()
        const addresses = stack.readCell().beginParse()
        return {
            index: index,
            collection_address: collection_address,
            status: status,
            tonOrUsdt: tonOrUsdt,
            price: price,
            fee: fee,
            ownerAddress: ownerAddress,
            buyerAddress: sellerAddress,
            usdtWallet: addresses.loadMaybeAddress(),
            approvedBy: addresses.loadMaybeAddress()
        }
    }
}
