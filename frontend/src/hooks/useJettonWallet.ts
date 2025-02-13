import { Address, OpenedContract, toNano } from "ton-core";
import {JettonMinter} from '../../wrappers/JettonMinter'
import {JettonWallet} from '../../wrappers/JettonWallet'
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

import { master } from "./addresses";

export function useJettonContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        const contract = JettonMinter.createFromAddress(Address.parse(master))        
        return client.open(contract) as OpenedContract<JettonMinter>
    }, [client, wallet])
    

    const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getWalletAddress(
            Address.parse((wallet!))
        )

        return client.open(JettonWallet.createFromAddress(jettonWalletAddress))
    }, [jettonContract, client])
    

    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        transfer: (amount: bigint, to: string) => {
            jettonWalletContract?.sendTransfer(sender,
                {
                    value: toNano("0.04"),
                    toAddress: Address.parse(to),
                    queryId: Date.now(),
                    fwdAmount: toNano("0.001"),
                    jettonAmount: amount
                }
            );
        },
    }
}



