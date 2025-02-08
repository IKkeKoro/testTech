
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
export function useTonClient() {
    const {network, wallet, sender} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;

            return new TonClient({
                endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
                apiKey: process.env.VITE_API
                // endpoint: await getHttpEndpoint({
                //     network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                // })
            })
        }, [network]),
        network: network,
        sender: sender,
        wallet: wallet
    }
}