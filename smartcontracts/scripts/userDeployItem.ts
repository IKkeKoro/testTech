import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { NetworkProvider } from '@ton/blueprint';
import { deployer, usdtMaster } from './const/addresses';
import { JettonMinter } from '../wrappers/JettonMinter';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const usdtMinter = provider.open(JettonMinter.createFromAddress(usdtMaster))
    const deployerWallet = await usdtMinter.getWalletAddress(deployer)
    const price = toNano(0.2)
    const deployPrice = (await escrowDeployer.getData()).price
    await escrowDeployer.sendUserDeploy(
        provider.sender(),
        {
            value: deployPrice + toNano('0.3'),
            price: price,
            tonOrUsdt: 0, // 0 - ton
            deployerUsdtWallet: deployerWallet
        }
    );

}
