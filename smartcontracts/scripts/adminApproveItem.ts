import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { NetworkProvider } from '@ton/blueprint';
import { deployer } from './const/addresses';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const index = 4n 
    await escrowDeployer.sendApprove(
        provider.sender(),
        {
            value: toNano('0.1'),
            approve: 0, // 0 - yes 1 - no
            index: index 
        }
    );

}
