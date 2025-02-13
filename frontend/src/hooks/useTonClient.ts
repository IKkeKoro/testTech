
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { getHttpEndpoint } from "@orbs-network/ton-access";
export function useTonClient() {
    const {network, wallet, sender} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;

            return new TonClient({
                endpoint: "https://toncenter.com/api/v2/jsonRPC",
                apiKey: process.env.VITE_API
                // endpoint: await getHttpEndpoint({
                //     network: "testnet"
                // })
            })
        }, [network]),  
        network: network,
        sender: sender,
        wallet: wallet
    }
}