import { TonClient } from "ton";
import { Address } from "ton-core";

// Define the emitted message formats
const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

export type EscrowData = {
    id: number;
    address: Address;
    seller: Address;
    price: bigint;
    tonOrUsdt: number;
}
const client = new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: process.env.VITE_API
})
let allEscrow: EscrowData[] = [];
export async function useEvent() {
    const transactions = await client.getTransactions(Address.parse("EQAJKiX_kv1TvWFvj-aytquW3flKD5M0NqWpA-WeR7LicJyy"), { limit: 300 });
    for (const tx of transactions) {
        if(tx.outMessages.get(1)?.body) {
            const tex =  tx.outMessages.get(1)?.body!.beginParse()
            const data: EscrowData = {
                id: tex?.loadUint(64)!,
                seller: tex?.loadAddress()!,
                address: tex?.loadAddress()!,
                price: tex?.loadCoins()!,
                tonOrUsdt: tex?.loadUint(1)!,
            }
            allEscrow.push(data)
        }
    }
    allEscrow.reverse();
    if(allEscrow.length == 0) {
        await sleep(100000);  
        useEvent()
    }
    return {escrows: allEscrow};

}