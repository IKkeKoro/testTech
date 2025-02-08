import { Address, beginCell, toNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {

    const randomSeed = Math.floor(Math.random() * 10000);

    const jettonMinter = provider.open(JettonMinter.createFromConfig({
        
        adminAddress: provider.sender().address as Address,
        content: beginCell().storeUint(1,8).storeStringTail('https://harlequin-neat-alligator-564.mypinata.cloud/ipfs/QmcZzS1rPe6arrif7QaHyiBnjzYuSqeViq3VUMDM9TnuqJ').endCell(),
        jettonWalletCode: await compile('JettonWallet')

    }, await compile('JettonMinter')));

    await jettonMinter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jettonMinter.address);

    // run methods on `jettonMinter`
}