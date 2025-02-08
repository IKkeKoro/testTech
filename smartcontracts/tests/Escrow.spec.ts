import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, Cell, toNano, TupleItemInt } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { EscrowItem } from '../wrappers/Escrow-item';
import { JettonMinter } from '../wrappers/JettonMinter';
import { JettonWallet } from '../wrappers/JettonWallet';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Escrow', () => {
    let code: Cell;
    let itemCode: Cell;
    let minterCode: Cell;
    let walletCode: Cell;
    beforeAll(async () => {
        code = await compile('Escrow');
        itemCode = await compile('Escrow-item')
        minterCode = await compile('JettonMinter')
        walletCode = await compile("JettonWallet")
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let escrow: SandboxContract<Escrow>;
    let escrowItem: SandboxContract<EscrowItem>
    let minter: SandboxContract<JettonMinter>
    let randomUser: SandboxContract<TreasuryContract>;
    let deployerUSDTWallet: SandboxContract<JettonWallet>
    let escrowUSDTWallet: SandboxContract<JettonWallet>
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        randomUser = await blockchain.treasury('randomUser');
    
        minter = blockchain.openContract(
            JettonMinter.createFromConfig(
                {
                    adminAddress: deployer.address,
                    content: beginCell().endCell(),
                    jettonWalletCode: walletCode
                },
                minterCode
            )
        );

        escrow = blockchain.openContract(
            Escrow.createFromConfig(
                {
                    owner: deployer.address,
                    usdtMaster: minter.address,
                    price: 0n,
                    fee: 5n,
                    itemCode: itemCode
                },
                code
            )
        );
        const minterDeployResult = await minter.sendDeploy(deployer.getSender(), toNano('0.05')); 
        const deployResult = await escrow.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(minterDeployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: minter.address,
            deploy: true,
            success: true,
        });

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: escrow.address,
            deploy: true,
            success: true,
        });

        const sendUsdt = await minter.sendMint(deployer.getSender(), {
            toAddress: deployer.address,
            jettonAmount: toNano(1337),
            amount: toNano(2),
            queryId: 0,
            value: toNano('2000')
        });


        await minter.sendMint(deployer.getSender(), {
            toAddress: escrow.address,
            jettonAmount: toNano(1337),
            amount: toNano(2),
            queryId: 0,
            value: toNano('2000')
        });

        expect(sendUsdt.transactions).toHaveTransaction({
            from: deployer.address,
            to: minter.address,
            success: true
        });

        deployerUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(deployer.address))
        )

        escrowUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(escrow.address))
        )
    });
    describe('Owner functionality', () => { 
        it('should change fee', async () => {
            const oldFee = ((await escrow.getData()).fee)
            const result = await escrow.sendChangeFee(deployer.getSender(), {
                fee: 70n,
                value: toNano('0.05'),
            });
            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: escrow.address,
                success: true,
            });
            const newFee = (await escrow.getData()).fee
            expect(newFee).toBe(70n)
            expect(newFee).toBeGreaterThan(oldFee)
        });

        it('should not change fee if it`s more than 50%', async () => {
            const oldFee = ((await escrow.getData()).fee)
            const result = await escrow.sendChangeFee(deployer.getSender(), {
                fee: 700n,
                value: toNano('0.05'),
            });
            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: escrow.address,
                success: false,
            });
            const newFee = (await escrow.getData()).fee
            expect(newFee).toBe(oldFee)
        });
    
        it('should change price', async () => {
            const oldPrice = ((await escrow.getData()).price)
            const price = toNano(100)
            const result = await escrow.sendChangePrice(deployer.getSender(), {
                deployPrice: price,
                value: toNano('0.05'),
            });
            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: escrow.address,
                success: true,
            });
            const newPrice = (await escrow.getData()).price
            expect(newPrice).toBe(price)
            expect(newPrice).toBeGreaterThan(oldPrice)
        });
    
        it('should change owner', async () => {
            const owner = ((await escrow.getData()).owner)
            expect(owner).toEqualAddress(deployer.address)
            const result = await escrow.sendChangeOwner(deployer.getSender(), {
                newOnwer: randomUser.address,
                value: toNano('0.05'),
            });
            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: escrow.address,
                success: true,
            });
            const newOwner = (await escrow.getData()).owner
            expect(newOwner).toEqualAddress(randomUser.address)
        });
        it('should deploy by admin', async () => {
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const result = await escrow.sendAdminDeploy(deployer.getSender(), {
                value: toNano('105'),
                price: toNano(2),
                tonOrUsdt: 0n,
                seller: deployer.address,
                deployerUsdtWallet: deployerUsdtWallet
            });
            expect(result.transactions).toHaveTransaction({
                from: escrow.address,
                success: true,
                deploy: true
            });  
            console.log(result.transactions[1].vmLogs)
        });
    
        it('should withdraw', async () => {
            const oldUsdtAmount = ( await deployerUSDTWallet.getData()).value
            const oldTonAmount = await deployer.getBalance()

            await randomUser.getSender().send({value: toNano(1000), to: escrow.address}) // sending tons to contract

            await minter.sendMint(deployer.getSender(), {
                toAddress: escrow.address,
                jettonAmount: toNano(1000), // sending usdt to contract
                amount: toNano(2),
                queryId: 0,
                value: toNano(2.5)
            })
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            await escrow.sendUserDeploy(randomUser.getSender(), {
                price: toNano(2),
                tonOrUsdt: 0,
                value: toNano('1000.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });

            const result = await escrow.sendWithdraw(deployer.getSender(), {
                tons: toNano(20),
                masterUsdtWallet: escrowUSDTWallet.address,
                jettons: toNano(100),
                value: toNano(1),
            });

            expect(result.transactions).toHaveTransaction({
                from: deployer.address,
                to: escrow.address,
                success: true
            });

            const newUsdtAmount = (await deployerUSDTWallet.getData()).value
            const newTonAmount = await deployer.getBalance()
            expect(oldUsdtAmount).toBe(newUsdtAmount - toNano(100))
            expect(oldTonAmount).toBeLessThan(newTonAmount)
        });
        describe('Check access', () => { 
            it('should revert change fee by not owner', async () => {
                const oldFee = ((await escrow.getData()).fee)
                await escrow.sendChangeFee(randomUser.getSender(), {
                    fee: 70n,
                    value: toNano('0.05'),
                });
                const newFee = (await escrow.getData()).fee
                expect(newFee).toBe(oldFee)
            });
        
            it('should revert change price by not owner', async () => {
                const oldPrice = ((await escrow.getData()).price)
                const price = toNano(100)
                await escrow.sendChangePrice(randomUser.getSender(), {
                    deployPrice: price,
                    value: toNano('0.05'),
                });
                const newPrice = (await escrow.getData()).price
                expect(newPrice).toBe(oldPrice)
            });
        
            it('should revert change owner by not owner', async () => {
                const owner = ((await escrow.getData()).owner)
                expect(owner).toEqualAddress(deployer.address)
                await escrow.sendChangeOwner(randomUser.getSender(), {
                    newOnwer: randomUser.address,
                    value: toNano('0.05'),
                });
                const newOwner = (await escrow.getData()).owner
                expect(newOwner).toEqualAddress(owner)
            });
            it('should revert deploy by not owner', async () => {
                const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
                const result = await escrow.sendAdminDeploy(randomUser.getSender(), {
                        price: toNano(2),
                        seller: randomUser.address,
                        tonOrUsdt: 0n,
                        value: toNano('10.5'),
                        deployerUsdtWallet: deployerUsdtWallet
                    });
                expect(result.transactions).toHaveTransaction({
                    from: randomUser.address,
                    to: escrow.address,
                    success: false,
                    deploy: false
                });  
            });
        
            it('should revert withdraw by not owner', async () => {
                const result = await escrow.sendWithdraw(randomUser.getSender(), {
                    tons: toNano(2),
                    masterUsdtWallet: randomUser.address,
                    jettons: toNano(2),
                    value: toNano('0.5'),
                });
                expect(result.transactions).toHaveTransaction({
                    from: randomUser.address,
                    to: escrow.address,
                    success: false
                }); 
            });
        })
    })
    describe('User functionality', () => { 
        it('should deploy by user', async () => {
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const result = await escrow.sendUserDeploy(randomUser.getSender(), {
                    price: toNano(2),
                    tonOrUsdt: 0,
                    value: toNano('10.5'),
                    deployerUsdtWallet: deployerUsdtWallet
                });
            expect(result.transactions).toHaveTransaction({
                from: escrow.address,
                success: true,
                deploy: true
            });
            const index = 0n
            const address = ((await escrow.getEscrowAddress(index)).escrowAddress)
            console.log(address)
            const escrowItem = blockchain.openContract(
                EscrowItem.createFromAddress(address)
            );
            const data = (await escrowItem.getData())
            console.log(data)
        });
        it('should revert deploy if tons is not enough', async () => {
            await escrow.sendChangePrice(deployer.getSender(), {
                value: toNano(0.1),
                deployPrice: toNano(10)
            })
            const price = (await escrow.getData()).price
            expect(price).toEqual(toNano(10))
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const result = await escrow.sendUserDeploy(randomUser.getSender(), {
                    price: toNano(1),
                    tonOrUsdt: 0,
                    value: toNano('1.5'),
                    deployerUsdtWallet: deployerUsdtWallet
                });
            expect(result.transactions).toHaveTransaction({
                from: randomUser.address,
                to: escrow.address,
                success: false
            });
        });
    })

    describe('Escrow index itteration', () => { 
        it('should change index', async () => {
            for(let i=0;i<50;i++) {
                let index = (await escrow.getData()).index
                const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
                const result = await escrow.sendUserDeploy(randomUser.getSender(), {
                    price: toNano(2),
                    tonOrUsdt: 0,
                    value: toNano('10.5'),
                    deployerUsdtWallet: deployerUsdtWallet
                });
                expect(result.transactions).toHaveTransaction({
                    from: escrow.address,
                    success: true,
                    deploy: true
                });
                let newIndex = (await escrow.getData()).index    
                expect(newIndex).toBeGreaterThan(index)      
            }
            expect((await escrow.getData()).index).toBe(50n)
        });
    
        it('should not change index on reverts', async () => {
            let index = (await escrow.getData()).index
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const result = await escrow.sendUserDeploy(randomUser.getSender(), {
                price: toNano(2),
                tonOrUsdt: 0,
                value: toNano('10.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });
            expect(result.transactions).toHaveTransaction({
                from: escrow.address,
                success: true,
                deploy: true
            });
            let newIndex = (await escrow.getData()).index    
            expect(newIndex).toBeGreaterThan(index)     
            
            //create reverted transaction
            await escrow.sendChangePrice(deployer.getSender(), {
                value: toNano(0.1),
                deployPrice: toNano(10)
            })
            const price = (await escrow.getData()).price
            expect(price).toEqual(toNano(10))
            const revertResult = await escrow.sendUserDeploy(randomUser.getSender(), {
                    price: toNano(1),
                    tonOrUsdt: 0,
                    value: toNano('1.5'),
                    deployerUsdtWallet: deployerUsdtWallet
                });
            expect(revertResult.transactions).toHaveTransaction({
                from: randomUser.address,
                to: escrow.address,
                success: false
            });
            expect((await escrow.getData()).index).toBe(newIndex)  
        });
    })

    describe('Emit new escrow ', () => { 
        it('should emit ecrow on deploy', async () => {
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const result = await escrow.sendUserDeploy(randomUser.getSender(), {
                price: toNano(2),
                tonOrUsdt: 0,
                value: toNano('10.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });   
            const eventBody = result.externals[0].body.beginParse()

            console.log('event: index', eventBody.loadUint(64), '\n' ,'owner:', eventBody.loadAddress(),'\n', 'contract address:', eventBody.loadAddress(), '\n', 'price:',
                eventBody.loadCoins(), '\n', 'ton or usd:', eventBody.loadUint(1))

        });
    
        it('should not emit on reverts', async () => {         
            //create reverted transaction
            await escrow.sendChangePrice(deployer.getSender(), {
                value: toNano(0.1),
                deployPrice: toNano(10)
            })
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            const revertResult = await escrow.sendUserDeploy(randomUser.getSender(), {
                    price: toNano(1),
                    tonOrUsdt: 0,
                    value: toNano('1.5'),
                    deployerUsdtWallet: deployerUsdtWallet
                });
            expect(revertResult.externals).toEqual([])
        });
    })
});
