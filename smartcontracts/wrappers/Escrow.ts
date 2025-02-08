import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, TupleItemInt } from '@ton/core';

export type EscrowConfig = {
    owner: Address;
    usdtMaster: Address;
    price: bigint;
    fee: bigint
    itemCode: Cell
};

export function escrowConfigToCell(config: EscrowConfig): Cell {
    return beginCell().storeAddress(config.owner).storeAddress(config.usdtMaster).storeUint(0, 64).storeCoins(config.price).storeUint(config.fee, 16).storeRef(config.itemCode).endCell();
}

export const Opcodes = {
    userDeploy: 0,
    changeFee: 1,
    changePrce: 2,
    sendApprove: 3,
    changeOwner: 4,
    adminDeploy: 5,
    withdraw: 6,
    criticalWithdraw: 7
};

export class Escrow implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Escrow(address);
    }

    static createFromConfig(config: EscrowConfig, code: Cell, workchain = 0) {
        const data = escrowConfigToCell(config);
        const init = { code, data };
        return new Escrow(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendUserDeploy(
        provider: ContractProvider,
        via: Sender,
        opts: {
            price: bigint;
            value: bigint;
            deployerUsdtWallet: Address;
            tonOrUsdt: number;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.userDeploy, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeCoins(opts.price)
                .storeUint(opts.tonOrUsdt, 1)
                .storeAddress(opts.deployerUsdtWallet)
                .endCell(),
        });
    }

    async sendChangeFee(
        provider: ContractProvider,
        via: Sender,
        opts: {
            fee: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.changeFee, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.fee, 16)
                .endCell(),
        });
    }

    async sendChangePrice(
        provider: ContractProvider,
        via: Sender,
        opts: {
            deployPrice: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.changePrce, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeCoins(opts.deployPrice)
                .endCell(),
        });
    }

    async sendApprove(
        provider: ContractProvider,
        via: Sender,
        opts: {
            approve: number;
            index: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.sendApprove, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.index, 64)
                .storeUint(opts.approve, 1)
                .endCell(),
        });
    }

    async sendChangeOwner(
        provider: ContractProvider,
        via: Sender,
        opts: {
            newOnwer: Address;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.changeOwner, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeAddress(opts.newOnwer)
                .endCell(),
        });
    }

    async sendAdminDeploy(
        provider: ContractProvider,
        via: Sender,
        opts: {
            seller: Address;
            price: bigint;
            tonOrUsdt: bigint
            deployerUsdtWallet: Address
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.adminDeploy, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeCoins(opts.price)
                .storeUint(opts.tonOrUsdt, 1)
                .storeAddress(opts.seller)
                .storeAddress(opts.deployerUsdtWallet)
                .endCell(),
        });
    }

    async sendWithdraw(
        provider: ContractProvider,
        via: Sender,
        opts: {
            tons: bigint;
            jettons: bigint;
            masterUsdtWallet: Address
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.withdraw, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeCoins(opts.tons)
                .storeAddress(opts.masterUsdtWallet)
                .storeCoins(opts.jettons)
                .endCell(),
        });
    }


    
    async sendEscrowWithdraw(
        provider: ContractProvider,
        via: Sender,
        opts: {
            index: bigint;
            buyerOrSender: number;
            tonOrUsdt: number;
            amount: bigint;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.criticalWithdraw, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.index, 64)
                .storeUint(opts.buyerOrSender, 1)
                .storeUint(opts.tonOrUsdt, 1)
                .storeCoins(opts.amount)
                .endCell(),
        });
    }

    async getData(provider: ContractProvider) {
        const {stack} = (await provider.get('get_all_data', []));
        return {
            owner: stack.readAddress(),
            usdtMaster: stack.readAddress(),
            index: stack.readBigNumber(),
            price: stack.readBigNumber(),
            fee: stack.readBigNumber(),
            itemCode: stack.readCell()
        }
    }

    async getBalance(provider: ContractProvider) {
        const {stack} = (await provider.get('get_my_balance', []));
        return {
            balance: stack.readBigNumber()
        }
    }

    async getEscrowAddress(provider: ContractProvider, index: bigint) {
        const tupleItem: TupleItemInt = {
            type: 'int',
            value: index
        }
        const {stack} = (await provider.get('get_escrow_address', [tupleItem]));
        return {
            escrowAddress: stack.readAddress()
        }
    }
}
