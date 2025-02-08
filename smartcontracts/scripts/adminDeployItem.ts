import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { NetworkProvider } from '@ton/blueprint';
import { deployer, usdtMaster } from './const/addresses';
import { JettonMinter } from '../wrappers/JettonMinter';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const price = toNano(0.3)
    const seller = provider.sender().address!
    const usdtMinter = provider.open(JettonMinter.createFromAddress(usdtMaster))
    const deployerWallet = await usdtMinter.getWalletAddress(deployer)
    await escrowDeployer.sendAdminDeploy(
        provider.sender(),
        {
            value: toNano('0.3'),
            seller: seller, 
            price: price,
            tonOrUsdt: 0n, // 0 - ton
            deployerUsdtWallet: deployerWallet
        }
    );

}
