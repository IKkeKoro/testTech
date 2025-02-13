import { Address, OpenedContract, toNano} from 'ton-core';
import {Escrow} from '../../wrappers/Escrow'
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';
import { deployer, mainnetDeployer } from './addresses';

export type EscrowData ={
    index: bigint;
    collection_address: Address;
    status: bigint;
    tonOrUsdt: bigint;
    price: bigint;
    fee: bigint;
    ownerAddress: Address;
    buyerAddress: Address | null;
    usdtWallet: Address | null;
    approvedBy: Address | null; 
}

export function useEscrowDeployer() {

    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()


    const escrowDeployer = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        const contract = Escrow.createFromAddress(Address.parse(mainnetDeployer))        
        return client.open(contract) as OpenedContract<Escrow>
    }, [client, wallet])


    return {
        sendDeployEscrow: (price: string, tonOrUsdt: number,) => {
            let value = toNano('0.3')
            escrowDeployer?.sendUserDeploy(sender, {
                price: toNano(price),
                tonOrUsdt: tonOrUsdt,
                value: value
            })
        }
    };
}


