import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { NetworkProvider } from '@ton/blueprint';
import { deployer, usdtMaster } from './const/addresses';
import { JettonMinter } from '../wrappers/JettonMinter';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const tons = toNano(1)
    const jettons = toNano(1) 
    const usdtMinter = provider.open(JettonMinter.createFromAddress(usdtMaster))
    const deployerUsdtWallet = await usdtMinter.getWalletAddress(escrowDeployer.address)
    await escrowDeployer.sendWithdraw(
        provider.sender(),
        {
            value: toNano('0.2'),
            tons: tons,
            jettons: jettons,
            masterUsdtWallet: deployerUsdtWallet
        }
    );

}
