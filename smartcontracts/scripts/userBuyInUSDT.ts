import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { EscrowItem } from '../wrappers/Escrow-item';
import { JettonWallet } from '../wrappers/JettonWallet';
import { JettonMinter } from '../wrappers/JettonMinter';
import { NetworkProvider } from '@ton/blueprint';
import { deployer, usdtMaster } from './const/addresses';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const index = 4n 
    const itemAddress: Address = (await escrowDeployer.getEscrowAddress(index)).escrowAddress
    const escrowItem = provider.open(EscrowItem.createFromAddress(itemAddress))
    const usdtMinter = provider.open(JettonMinter.createFromAddress(usdtMaster))
    const userWallet = await usdtMinter.getWalletAddress(provider.sender().address!)
    const price = (await escrowItem.getData()).price
    const jettonWallet = provider.open(JettonWallet.createFromAddress(userWallet));

    await jettonWallet.sendTransfer(provider.sender(), {
        value: toNano('0.13'),
        fwdAmount: toNano('0.01'),
        jettonAmount: price,
        toAddress: itemAddress,
        queryId: Date.now()
    });

}
