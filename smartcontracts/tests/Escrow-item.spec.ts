import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, Cell, toNano, TupleItemInt } from '@ton/core';
import { Escrow } from '../wrappers/Escrow';
import { EscrowItem } from '../wrappers/Escrow-item';
import { JettonMinter } from '../wrappers/JettonMinter';
import { JettonWallet } from '../wrappers/JettonWallet';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Escrow-item', () => {
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
    let escrowItemUSDT: SandboxContract<EscrowItem>
    let minter: SandboxContract<JettonMinter>
    let randomUser: SandboxContract<TreasuryContract>;
    let seller: SandboxContract<TreasuryContract>;
    let buyer: SandboxContract<TreasuryContract>;

    let buyerUSDTWallet: SandboxContract<JettonWallet>
    let sellerUsdtWallet: SandboxContract<JettonWallet>
    let itemUSDTWallet: SandboxContract<JettonWallet>
    let deployerUSDTWallet: SandboxContract<JettonWallet>
    let escrowUSDTWallet: SandboxContract<JettonWallet>
    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        seller = await blockchain.treasury('seller');
        buyer = await blockchain.treasury('buyer');
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
                    fee: 400n,
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
            value: toNano(2.5)
        });

        await minter.sendMint(deployer.getSender(), {
            toAddress: buyer.address,
            jettonAmount: toNano(1337),
            amount: toNano(2),
            queryId: 0,
            value: toNano(2.5)
        });

        await minter.sendMint(deployer.getSender(), {
            toAddress: seller.address,
            jettonAmount: toNano(1337),
            amount: toNano(2),
            queryId: 0,
            value: toNano(2.5)
        });

        expect(sendUsdt.transactions).toHaveTransaction({
            from: deployer.address,
            to: minter.address,
            success: true
        });
        const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
        const result = await escrow.sendUserDeploy(seller.getSender(), {
            price: toNano(20),
            tonOrUsdt: 0,
            value: toNano('10.5'),
            deployerUsdtWallet: deployerUsdtWallet
        });
        const result1 = await escrow.sendUserDeploy(seller.getSender(), {
            price: toNano(20),
            tonOrUsdt: 1,
            value: toNano('10.5'),
            deployerUsdtWallet: deployerUsdtWallet
        });
        expect(result.transactions).toHaveTransaction({
            from: escrow.address,
            success: true,
            deploy: true
        });
        expect(result1.transactions).toHaveTransaction({
            from: escrow.address,
            success: true,
            deploy: true
        });
        const address = ((await escrow.getEscrowAddress(0n)).escrowAddress)
        const addressUSDT = ((await escrow.getEscrowAddress(1n)).escrowAddress)
        escrowItem = blockchain.openContract(
            EscrowItem.createFromAddress(address)
        );
        escrowItemUSDT = blockchain.openContract(
            EscrowItem.createFromAddress(addressUSDT)
        );

        buyerUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(buyer.address))
        )

        itemUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(escrowItemUSDT.address))
        )

        deployerUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(deployer.address))
        )
        sellerUsdtWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(seller.address))
        )
        escrowUSDTWallet = blockchain.openContract(
            JettonWallet.createFromAddress(await minter.getWalletAddress(escrow.address))
        )
        await minter.sendMint(deployer.getSender(), {
            toAddress: escrow.address,
            jettonAmount: toNano(10),
            amount: toNano(20),
            queryId: 0,
            value: toNano(200)
        });
        await minter.sendMint(deployer.getSender(), {
            toAddress: escrowItemUSDT.address,
            jettonAmount: toNano(0),
            amount: toNano(20),
            queryId: 0,
            value: toNano(200)
        });
        await minter.sendMint(deployer.getSender(), {
            toAddress: escrowItem.address,
            jettonAmount: toNano(0),
            amount: toNano(20),
            queryId: 0,
            value: toNano(200)
        });
    });
    it('should save escrow usdt wallet on deploy', async () => {
        expect((await escrowItem.getData()).usdtWallet).toEqualAddress(await minter.getWalletAddress(escrowItem.address))
    });    

    describe('Seller functionality', () => {
        it('should cancel escrow', async () => { 
            const result = await escrowItem.sendCancelBySeller(seller.getSender(), {
                value: toNano('10.5')
            });
            expect(result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            });
            expect(2n).toEqual((await escrowItem.getData()).status)
        })
        it('should revert cancel by random', async () => { 
            const result = await escrowItem.sendCancelBySeller(randomUser.getSender(), {
                value: toNano('10.5')
            });
            expect(result.transactions).toHaveTransaction({
                from: randomUser.address,
                success: false
            });
            expect(0n).toEqual((await escrowItem.getData()).status)
        })
        it('should revert cancel if someone paid', async () => { 
            const price = (await escrowItem.getData()).price
            const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                    value: price + toNano('10.5')
                });
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            const buyers = (await escrowItem.getData()).buyerAddress
            expect(buyer.address).toEqualAddress(buyers!)
            expect(1n).toEqual((await escrowItem.getData()).status)
            const result1 = await escrowItem.sendCancelBySeller(seller.getSender(), {
                value: toNano('10.5')
            });
            expect(result1.transactions).toHaveTransaction({
                from: seller.address,
                success: false
            });
            expect(1n).toEqual((await escrowItem.getData()).status)
        })
    }) 
    describe('Buyer functionality', () => { 
        describe('Pay in Ton', () => { 
            it('should pay in tons', async () => {
                const price = (await escrowItem.getData()).price
                const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                const buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
                expect(1n).toEqual((await escrowItem.getData()).status)
            });    
            it('should send back exceed ton amount', async () => {
                const price = (await escrowItem.getData()).price
                const oldBalance = await buyer.getBalance()
                const exceedAmount = toNano(10)
                const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                        value: price + exceedAmount
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                const newBalance = await buyer.getBalance()
                const buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
                expect(1n).toEqual((await escrowItem.getData()).status)
                expect(newBalance).toBeGreaterThan(oldBalance - price - toNano(1))
            });   
            it('should revert if tons is not enough', async () => {
                const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                        value: toNano('0.5')
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: false
                });
                expect(0n).toEqual((await escrowItem.getData()).status)
            });    
            it('should not change buyer if someone already paid', async () => {
                const price = (await escrowItem.getData()).price

                const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                let buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
                expect(1n).toEqual((await escrowItem.getData()).status)

                const revertResult = await escrowItem.sendPayInTons(randomUser.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(revertResult.transactions).toHaveTransaction({
                    from: randomUser.address,
                    success: false
                });
                buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
            });    
            it('should revert if payments in usdt', async () => {
                const price = (await escrowItemUSDT.getData()).price
                const result = await escrowItemUSDT.sendPayInTons(buyer.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: false
                });
                expect(0n).toEqual((await escrowItemUSDT.getData()).status)
            });
        }) 
        describe('Pay in USDT', () => { 
            it('should pay in USDT', async () => {
                const price = (await escrowItemUSDT.getData()).price

                const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                    value: toNano(5),
                    toAddress: escrowItemUSDT.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price 
                })
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                const buyers = (await escrowItemUSDT.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
                expect(1n).toEqual((await escrowItemUSDT.getData()).status)

            });    
            it('should send usdt back if amount is not enough', async () => {
                const price = (await escrowItemUSDT.getData()).price
                const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
                const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                    value: toNano(30),
                    toAddress: escrowItemUSDT.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price - toNano(1)
                })
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                const newUsdtBalance = (await buyerUSDTWallet.getData()).value
                expect(oldUsdtBalance).toEqual(newUsdtBalance)
                expect(0n).toEqual((await escrowItemUSDT.getData()).status)

            });
            it('should send usdt back if someone already paid', async () => {
                const price = (await escrowItemUSDT.getData()).price

                await deployerUSDTWallet.sendTransfer(deployer.getSender(), {
                    value: toNano(30),
                    toAddress: escrowItemUSDT.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price
                })
                expect(1n).toEqual((await escrowItemUSDT.getData()).status)
                const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
                const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                    value: toNano(30),
                    toAddress: escrowItemUSDT.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price
                })
                const newUsdtBalance = (await buyerUSDTWallet.getData()).value
                expect(oldUsdtBalance).toEqual(newUsdtBalance)
                expect(deployer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)
            });    
            it('should send usdt back if payments in ton', async () => {
                const price = (await escrowItem.getData()).price

                const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
                const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                    value: toNano(30),
                    toAddress: escrowItem.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price
                })
                const newUsdtBalance = (await buyerUSDTWallet.getData()).value
                expect(oldUsdtBalance).toEqual(newUsdtBalance)
                expect(0n).toEqual((await escrowItem.getData()).status)

            });    
            it('should not change buyer if someone already paid', async () => {
                const price = (await escrowItem.getData()).price

                const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(result.transactions).toHaveTransaction({
                    from: buyer.address,
                    success: true
                });
                let buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
                expect(1n).toEqual((await escrowItem.getData()).status)

                const revertResult = await escrowItem.sendPayInTons(randomUser.getSender(), {
                        value: price + toNano('10.5')
                    });
                expect(revertResult.transactions).toHaveTransaction({
                    from: randomUser.address,
                    success: false
                });
                buyers = (await escrowItem.getData()).buyerAddress
                expect(buyer.address).toEqualAddress(buyers!)
            });    
            it('should send exceed usdt back', async () => {
                const price = (await escrowItemUSDT.getData()).price

                const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
                const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                    value: toNano(30),
                    toAddress: escrowItemUSDT.address,
                    queryId: 0,
                    fwdAmount: 100n,
                    jettonAmount: price + toNano(1)
                })
                const newUsdtBalance = (await buyerUSDTWallet.getData()).value
                expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
                expect(1n).toEqual((await escrowItemUSDT.getData()).status)
                expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)
            });    
        }) 
    })
    describe('Approvment functionality', () => { 
        it('should approve by guarantor', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: deployer.address,
                success: true
            }); 
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)
        });    
        it('should not approve by guarantor if no one paid', async () => {
            expect(0n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(4)
            })
            expect(0n).toEqual((await escrowItemUSDT.getData()).status)
        });  
        it('should approve by seller, 1/2', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrowItemUSDT.sendApproveByUser(seller.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            }); 
            expect(seller.address).toEqualAddress((await escrowItemUSDT.getData()).approvedBy!)
        });    
        it('should approve by buyer, 1/2', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrowItemUSDT.sendApproveByUser(buyer.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            }); 
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).approvedBy!)
        });  
        it('should fully approve by buyer and seller, 2/2', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrowItemUSDT.sendApproveByUser(buyer.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            }); 
            const approve2Result = await escrowItemUSDT.sendApproveByUser(seller.getSender(), {
                value: toNano(4)
            })
            expect(approve2Result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            }); 
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)
        });
        it('should not approve by random, 0/2', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrowItemUSDT.sendApproveByUser(randomUser.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: randomUser.address,
                success: false
            }); 
            expect((await escrowItemUSDT.getData()).approvedBy).toBeNull()
        }); 
    })
    describe('Sending income', () => { 
        it('should send usdt to seller and fees after approvment by guarantor', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)
            const oldBalance = (await escrowUSDTWallet.getData()).value
            const oldsellerUsdtWallet = (await sellerUsdtWallet.getData()).value
            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(20.5)
            })
            const newBalance = (await escrowUSDTWallet.getData()).value
            const newsellerUsdtWallet = (await sellerUsdtWallet.getData()).value
  
            const fee = (price * (await escrowItemUSDT.getData()).fee) / 1000n;
            expect(seller.address).toEqualAddress((await escrowItemUSDT.getData()).ownerAddress!)
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)

            expect((await escrowUSDTWallet.getData()).owner).toEqualAddress((await escrowItemUSDT.getData()).collection_address!)
            expect(newsellerUsdtWallet).toEqual(oldsellerUsdtWallet + price - fee)
            expect(oldBalance).toEqual(newBalance - fee)
        });    
        it('should send usdt to buyer without fees if guarantor not approved escrow', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)
            const oldBalance = (await escrowUSDTWallet.getData()).value
            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 1,
                index: index,
                value: toNano(20.5)
            })
            const newBalance = (await escrowUSDTWallet.getData()).value
            const newBuyerUsdtWallet = (await buyerUSDTWallet.getData()).value

            const fee = (price * (await escrowItemUSDT.getData()).fee) / 1000n;
            expect(seller.address).toEqualAddress((await escrowItemUSDT.getData()).ownerAddress!)
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)

            expect((await escrowUSDTWallet.getData()).owner).toEqualAddress((await escrowItemUSDT.getData()).collection_address!)
            expect(newBuyerUsdtWallet).toEqual(newUsdtBalance + price)
            expect(oldBalance).toEqual(newBalance)
        });  
        it('should send tons to seller and fees after approvment by guarantor', async () => {
            const price = (await escrowItem.getData()).price

            const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                    value: price + toNano('10.5')
                });
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            const buyers = (await escrowItem.getData()).buyerAddress
            expect(buyer.address).toEqualAddress(buyers!)
            expect(1n).toEqual((await escrowItem.getData()).status)
            const index = (await escrowItem.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItem.getData()).buyerAddress!)

            const oldBalance = (await escrow.getBalance()).balance
            const oldSellerBalance = await seller.getBalance()
            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(20.5)
            })

            const newBalance = (await escrow.getBalance()).balance
            const newSellerBalance = await seller.getBalance()
            const fee = (price * (await escrowItem.getData()).fee) / 1000n;
            expect(seller.address).toEqualAddress((await escrowItem.getData()).ownerAddress!)
            expect(2n).toEqual((await escrowItem.getData()).status)

            expect((await escrowUSDTWallet.getData()).owner).toEqualAddress((await escrowItem.getData()).collection_address!)
            expect(newSellerBalance).toBeGreaterThan(oldSellerBalance - fee - toNano(0.001))
            expect(newBalance).toBeGreaterThan(oldBalance - fee - toNano(0.001))
        });    
        it('should send tons to buyer without fees if guarantor not approved escrow', async () => {
            const price = (await escrowItem.getData()).price

            const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                    value: price + toNano('10.5')
                });
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            const buyers = (await escrowItem.getData()).buyerAddress
            expect(buyer.address).toEqualAddress(buyers!)
            expect(1n).toEqual((await escrowItem.getData()).status)
            const index = (await escrowItem.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItem.getData()).buyerAddress!)

            const oldBalance = (await escrow.getBalance()).balance
            const oldBuyerAddress = await buyer.getBalance()
            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 1,
                index: index,
                value: toNano(20.5)
            })

            const newBalance = (await escrow.getBalance()).balance
            const newBuyerBalance = await buyer.getBalance()
            const fee = (price * (await escrowItem.getData()).fee) / 1000n;
            expect(seller.address).toEqualAddress((await escrowItem.getData()).ownerAddress!)
            expect(2n).toEqual((await escrowItem.getData()).status)
            expect((await escrowUSDTWallet.getData()).owner).toEqualAddress((await escrowItem.getData()).collection_address!)
            expect(newBuyerBalance).toBeGreaterThan(oldBuyerAddress + price - toNano(0.001))
            expect(newBalance).toBeGreaterThan(oldBalance - toNano(0.001))
        });  
        it('should send usdt and fees after fully approve by buyer and seller, 2/2', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const oldSellerUsdtBalance = (await sellerUsdtWallet.getData()).value
            const oldEscrowUsdtBalance = (await escrowUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)
            const fee = (price * (await escrowItemUSDT.getData()).fee) / 1000n;

            const approve2Result = await escrowItemUSDT.sendApproveByUser(seller.getSender(), {
                value: toNano(4)
            })
            expect(approve2Result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            }); 
            const approveResult = await escrowItemUSDT.sendApproveByUser(buyer.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            }); 
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)
            const newSellerUsdtBalance = (await sellerUsdtWallet.getData()).value
            const newEscrowUsdtBalance = (await escrowUSDTWallet.getData()).value

            expect(newEscrowUsdtBalance).toBe(oldEscrowUsdtBalance + fee)
            expect(newSellerUsdtBalance).toBe(oldSellerUsdtBalance + price - fee)

        });
        it('should send tons and fees after fully approve by buyer and seller, 2/2', async () => {
            const price = (await escrowItem.getData()).price
            const oldBalance = (await escrow.getBalance()).balance
            const oldSellerBalance = await seller.getBalance()
            const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                value: price + toNano('10.5')
            });
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            expect(1n).toEqual((await escrowItem.getData()).status)
            const index = (await escrowItem.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItem.getData()).buyerAddress!)

            const fee = (price * (await escrowItem.getData()).fee) / 1000n;
 
            const approve2Result = await escrowItem.sendApproveByUser(seller.getSender(), {
                value: toNano(0.01)
            })
            expect(approve2Result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            }); 
            const approveResult = await escrowItem.sendApproveByUser(buyer.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            }); 
            const newBalance = (await escrow.getBalance()).balance
            const newSellerBalance = await seller.getBalance()
            expect(2n).toEqual((await escrowItem.getData()).status)
            expect(newSellerBalance).toBeGreaterThan(oldSellerBalance + price - fee - toNano(0.02))
            expect(newBalance).toBeGreaterThan(oldBalance + fee - toNano(0.001))
        });
        it('should send tons back in critical cases to seller', async () => {
            const result = await escrowItem.sendCancelBySeller(seller.getSender(), {
                value: toNano('10.5')
            });
            expect(result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            });
            expect(2n).toEqual((await escrowItem.getData()).status)
            const oldBalance = await seller.getBalance()
            const result1 = await escrow.sendEscrowWithdraw(deployer.getSender(), {
                value: toNano('10.5'),
                index: (await escrowItem.getData()).index,
                tonOrUsdt: 0,
                buyerOrSender: 1, // seller*
                amount: toNano(5)
            });

            const newBalance = await seller.getBalance()
            expect(newBalance).toBeGreaterThan(oldBalance + toNano(4.9))
        });
        it('should send tons back in critical cases to buyer', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: deployer.address,
                success: true
            }); 
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            await escrow.sendUserDeploy(buyer.getSender(), {
                price: toNano(20),
                tonOrUsdt: 0,
                value: toNano('10.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });
            const oldBalance = await buyer.getBalance()
            const result1 = await escrow.sendEscrowWithdraw(deployer.getSender(), {
                value: toNano('10.5'),
                index: (await escrowItemUSDT.getData()).index,
                tonOrUsdt: 0,
                buyerOrSender: 0, // buyer*
                amount: toNano(3)
            });

            const newBalance = await buyer.getBalance()
            expect(newBalance).toBeGreaterThan(oldBalance + toNano(2.9))
        });
        it('should send usdt back in critical cases to seller', async () => {
            const nextEscrow = await escrow.getEscrowAddress((await escrow.getData()).index)
            await minter.sendMint(deployer.getSender(), {
                toAddress: nextEscrow.escrowAddress,
                jettonAmount: toNano(1337),
                amount: toNano(2),
                queryId: 0,
                value: toNano(2.5)
            });
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            await escrow.sendUserDeploy(seller.getSender(), {
                price: toNano(20),
                tonOrUsdt: 1,
                value: toNano('10.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });
            const escrowNewItem = blockchain.openContract(
                EscrowItem.createFromAddress(nextEscrow.escrowAddress)
            );
            const result = await escrowNewItem.sendCancelBySeller(seller.getSender(), {
                value: toNano('10.5')
            });
            expect(result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            });
            expect(2n).toEqual((await escrowNewItem.getData()).status)
            const oldBalance = (await sellerUsdtWallet.getData()).value
            const result1 = await escrow.sendEscrowWithdraw(deployer.getSender(), {
                value: toNano('10.5'),
                index: (await escrowNewItem.getData()).index,
                tonOrUsdt: 1,
                buyerOrSender: 1, // seller*
                amount: toNano(5)
            });

            const newBalance = (await sellerUsdtWallet.getData()).value
            expect(newBalance).toEqual(oldBalance + toNano(5))
        });
        it('should send usdt back in critical cases to buyer', async () => {
            const nextEscrow = await escrow.getEscrowAddress((await escrow.getData()).index)
            await minter.sendMint(deployer.getSender(), {
                toAddress: nextEscrow.escrowAddress,
                jettonAmount: toNano(1337),
                amount: toNano(2),
                queryId: 0,
                value: toNano(2.5)
            });
            const deployerUsdtWallet = await minter.getWalletAddress(escrow.address)
            await escrow.sendUserDeploy(seller.getSender(), {
                price: toNano(20),
                tonOrUsdt: 1,
                value: toNano('10.5'),
                deployerUsdtWallet: deployerUsdtWallet
            });
            const escrowNewItem = blockchain.openContract(
                EscrowItem.createFromAddress(nextEscrow.escrowAddress)
            );
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: nextEscrow.escrowAddress,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: toNano(40)
            })
            expect(1n).toEqual((await escrowNewItem.getData()).status)
            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: (await escrowNewItem.getData()).index,
                value: toNano(2)
            })
            const oldBuyerUSDTBalance = (await buyerUSDTWallet.getData()).value
            expect(2n).toEqual((await escrowNewItem.getData()).status)
            const result1 = await escrow.sendEscrowWithdraw(deployer.getSender(), {
                value: toNano('10.5'),
                index: (await escrowNewItem.getData()).index,
                tonOrUsdt: 1,
                buyerOrSender: 0, // buyer
                amount: toNano(5)
            });

            const newBuyerUSDTBalance = (await buyerUSDTWallet.getData()).value
            expect(newBuyerUSDTBalance).toEqual(oldBuyerUSDTBalance + toNano(5))
        });
    })

    describe('Emit changes ', () => { 
        it('should emit on ton payment', async () => {
            const price = (await escrowItem.getData()).price

            const result = await escrowItem.sendPayInTons(buyer.getSender(), {
                    value: price + toNano('10.5')
                });
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            const buyers = (await escrowItem.getData()).buyerAddress
            expect(buyer.address).toEqualAddress(buyers!)
            expect(1n).toEqual((await escrowItem.getData()).status)
            const eventBody = result.externals[0].body.beginParse()

            console.log('event: status', eventBody.loadUint(2), '\n' ,'buyer address:', eventBody.loadMaybeAddress(),'\n', 'approved by:', eventBody.loadMaybeAddress())

        });

        it('should emit on usdt payment', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(5),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price 
            })
            expect(result.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            });
            const buyers = (await escrowItemUSDT.getData()).buyerAddress
            expect(buyer.address).toEqualAddress(buyers!)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const eventBody = result.externals[0].body.beginParse()

            console.log('event: status', eventBody.loadUint(2), '\n' ,'buyer address:', eventBody.loadMaybeAddress(),'\n', 'approved by:', eventBody.loadMaybeAddress())
        });

        it('should emit on approvment by users', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrowItemUSDT.sendApproveByUser(buyer.getSender(), {
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: buyer.address,
                success: true
            }); 
            const eventBody = approveResult.externals[0].body.beginParse()
            console.log('event: status', eventBody.loadUint(2), '\n' ,'buyer address:', eventBody.loadMaybeAddress(),'\n', 'approved by:', eventBody.loadMaybeAddress())
            const approve2Result = await escrowItemUSDT.sendApproveByUser(seller.getSender(), {
                value: toNano(4)
            })
            expect(approve2Result.transactions).toHaveTransaction({
                from: seller.address,
                success: true
            }); 
            const eventBody2 = approve2Result.externals[0].body.beginParse()
            console.log('event: status', eventBody2.loadUint(2), '\n' ,'buyer address:', eventBody2.loadMaybeAddress(),'\n', 'approved by:', eventBody2.loadMaybeAddress())
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)

        });


        it('should emit on approvment by guarantor', async () => {
            const price = (await escrowItemUSDT.getData()).price

            const oldUsdtBalance = (await buyerUSDTWallet.getData()).value
            const result = await buyerUSDTWallet.sendTransfer(buyer.getSender(), {
                value: toNano(30),
                toAddress: escrowItemUSDT.address,
                queryId: 0,
                fwdAmount: 100n,
                jettonAmount: price + toNano(1)
            })
            const newUsdtBalance = (await buyerUSDTWallet.getData()).value
            expect(oldUsdtBalance).toEqual(newUsdtBalance + price)
            expect(1n).toEqual((await escrowItemUSDT.getData()).status)
            const index = (await escrowItemUSDT.getData()).index
            expect(buyer.address).toEqualAddress((await escrowItemUSDT.getData()).buyerAddress!)

            const approveResult = await escrow.sendApprove(deployer.getSender(), {
                approve: 0,
                index: index,
                value: toNano(4)
            })
            expect(approveResult.transactions).toHaveTransaction({
                from: deployer.address,
                success: true
            }); 
            expect(2n).toEqual((await escrowItemUSDT.getData()).status)
            const eventBody = approveResult.externals[0].body.beginParse()
            console.log('event: status', eventBody.loadUint(2), '\n' ,'buyer address:', eventBody.loadMaybeAddress(),'\n', 'approved by:', eventBody.loadMaybeAddress())
        });

    })
})

