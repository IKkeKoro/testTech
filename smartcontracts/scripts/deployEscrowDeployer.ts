import { Address, beginCell, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { compile, NetworkProvider } from '@ton/blueprint';
import { usdtMaster } from './const/addresses';

export async function run(provider: NetworkProvider) {
    const deployer = provider.open(Escrow.createFromConfig(
            {
                owner: provider.sender().address!,
                usdtMaster: usdtMaster,
                price: 0n,
                fee: 50n, //5%
                itemCode: await compile('Escrow-item')
            }, await compile('Escrow')
        ), 
    );       

    await deployer.sendDeploy(provider.sender(), toNano('0.15'));

    await provider.waitForDeploy(deployer.address);

    // run methods on `nftCollection`
}
