import {useEffect, useState} from 'react';
import { Address, OpenedContract, toNano} from 'ton-core';
import {EscrowItem} from '../../wrappers/Escrow-item'
import {Escrow} from '../../wrappers/Escrow'

import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';
import { deployer } from './addresses';
import { TonClient } from 'ton';


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
const emptyData: EscrowData = {
    index: -1n,
    collection_address: Address.parse(deployer),
    status: 2n,
    tonOrUsdt: -1n,
    price: -1n,
    fee: -1n,
    ownerAddress: Address.parse(deployer),
    buyerAddress: null,
    usdtWallet: null,
    approvedBy: null 
}
export function useEscrow(address: Address | null) {
    const client = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        apiKey: process.env.VITE_API
    })

    const {wallet, sender} = useTonConnect()
    const sleep = (time: number) =>
        new Promise((resolve) => setTimeout(resolve, time));

    const [contractData, setContractData] = useState<EscrowData>(emptyData);

    const escrowDeployer = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        const contract = Escrow.createFromAddress(Address.parse(deployer))        
        return client.open(contract) as OpenedContract<Escrow>
    }, [client, wallet])

    const escrowItem = useAsyncInitialize(async()=>{
        if(!client || !wallet || !escrowDeployer || !address) return;
        const contract = EscrowItem.createFromAddress(address)        
        return client.open(contract) as OpenedContract<EscrowItem>
    }, [client, wallet])

    const getItemData = (async() => {
        if(!escrowItem) return;

        const data = (await escrowItem.getData());
        setContractData({
            index: data.index,
            collection_address: data.collection_address,
            status: data.status,
            tonOrUsdt: data.tonOrUsdt,
            price: data.price,
            fee: data.fee,
            ownerAddress: data.ownerAddress,
            buyerAddress: data.buyerAddress,
            usdtWallet: data.usdtWallet,
            approvedBy: data.approvedBy
        });

        await sleep(10000);    
        if(contractData == null) getItemData()
    })

    useEffect(() => {
        if(contractData.index == -1n && address !=null) getItemData()
    }, [getItemData]);

    return {
        escrowAddress: escrowItem?.address,
        contractData,
        sendPayInTons: () => {
            escrowItem?.sendPayInTons(sender, {
                value: contractData?.price! + toNano("0.07")
            })
        },
        sendApproveByUser: () => {
            escrowItem?.sendApproveByUser(sender, {
                value: toNano("0.07")
            })
        },
        sendApproveByGuarantor: (approve: number) => {
            escrowItem?.sendApproveByMaster(sender, {
                approve: approve,
                value: toNano("0.09")
            })
        },
    };
}


