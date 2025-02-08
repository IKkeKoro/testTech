import { Address } from "ton-core";
import { useTonClient } from "./useTonClient";

export type EscrowItemData = {
    status: number;
    buyer: Address | null;
    approvedBy: Address | null;
}
let data: EscrowItemData;
export async function useEscrowEvent(address: Address) {

    const {client} = useTonClient()
    const transactions = await client?.getTransactions(address, { limit: 300 });

    for (const tx of transactions!) {
        if(tx.outMessages.get(1)?.body) {
            const tex =  tx.outMessages.get(1)?.body!.beginParse()
            data = {
                status: tex?.loadUint(2)!,
                buyer: tex?.loadMaybeAddress()!,
                approvedBy: tex?.loadMaybeAddress()!,
            }
            
        }
    }

    return {escrowItem: data};
}