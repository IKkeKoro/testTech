import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { EscrowItem } from '../wrappers/Escrow-item';
import { JettonWallet } from '../wrappers/JettonWallet';
import { JettonMinter } from '../wrappers/JettonMinter';
import { NetworkProvider } from '@ton/blueprint';
import { deployer, usdtMaster } from './const/addresses';

export async function run(provider: NetworkProvider) {

    // For tests mint available to anyone
    const usdtMinter = provider.open(JettonMinter.createFromAddress(usdtMaster))
    const address = provider.sender().address!
    const amount = toNano(1000000)
    await usdtMinter.sendMint(provider.sender(), {
        toAddress: address,
        jettonAmount: amount,
        amount: toNano(0.01),
        queryId: 0,
        value: toNano('0.07')
    });

}
