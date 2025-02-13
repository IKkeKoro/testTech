import { Address, toNano } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { EscrowItem } from '../wrappers/Escrow-item';
import { NetworkProvider } from '@ton/blueprint';
import { deployer } from './const/addresses';

export async function run(provider: NetworkProvider) {
    const escrowDeployer = provider.open(Escrow.createFromAddress(deployer));
    const index = 3n 
    const itemAddress: Address = (await escrowDeployer.getEscrowAddress(index)).escrowAddress
    const escrowItem = provider.open(EscrowItem.createFromAddress(itemAddress))
    console.log(await escrowItem.getData())
}
