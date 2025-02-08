import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { NetworkProvider } from '@ton/blueprint';
import { deployer } from './const/addresses';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const newOwner = Address.parse("")
    await escrowDeployer.sendChangeOwner(
        provider.sender(),
        {
            value: toNano('0.03'),
            newOnwer: newOwner 
        }
    );

}
