import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadGetterTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type MemberData = {
    $$type: 'MemberData';
    totalVoted: bigint;
    lastClaimed: bigint;
    subscribedUntil: bigint;
    jettonsToClaim: bigint;
    inviter: Address;
    poolWithdrawnAt: bigint;
}

export function storeMemberData(src: MemberData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalVoted, 257);
        b_0.storeInt(src.lastClaimed, 257);
        b_0.storeInt(src.subscribedUntil, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.jettonsToClaim, 257);
        b_1.storeAddress(src.inviter);
        b_1.storeInt(src.poolWithdrawnAt, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMemberData(slice: Slice) {
    let sc_0 = slice;
    let _totalVoted = sc_0.loadIntBig(257);
    let _lastClaimed = sc_0.loadIntBig(257);
    let _subscribedUntil = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonsToClaim = sc_1.loadIntBig(257);
    let _inviter = sc_1.loadAddress();
    let _poolWithdrawnAt = sc_1.loadIntBig(257);
    return { $$type: 'MemberData' as const, totalVoted: _totalVoted, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadTupleMemberData(source: TupleReader) {
    let _totalVoted = source.readBigNumber();
    let _lastClaimed = source.readBigNumber();
    let _subscribedUntil = source.readBigNumber();
    let _jettonsToClaim = source.readBigNumber();
    let _inviter = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'MemberData' as const, totalVoted: _totalVoted, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadGetterTupleMemberData(source: TupleReader) {
    let _totalVoted = source.readBigNumber();
    let _lastClaimed = source.readBigNumber();
    let _subscribedUntil = source.readBigNumber();
    let _jettonsToClaim = source.readBigNumber();
    let _inviter = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'MemberData' as const, totalVoted: _totalVoted, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, poolWithdrawnAt: _poolWithdrawnAt };
}

function storeTupleMemberData(source: MemberData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalVoted);
    builder.writeNumber(source.lastClaimed);
    builder.writeNumber(source.subscribedUntil);
    builder.writeNumber(source.jettonsToClaim);
    builder.writeAddress(source.inviter);
    builder.writeNumber(source.poolWithdrawnAt);
    return builder.build();
}

function dictValueParserMemberData(): DictionaryValue<MemberData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMemberData(src)).endCell());
        },
        parse: (src) => {
            return loadMemberData(src.loadRef().beginParse());
        }
    }
}

export type TokenWallet$Data = {
    $$type: 'TokenWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
    lastClaimed: bigint;
    subscribedUntil: bigint;
    jettonsToClaim: bigint;
    inviter: Address;
    totalVoted: bigint;
    poolWithdrawnAt: bigint;
}

export function storeTokenWallet$Data(src: TokenWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeInt(src.lastClaimed, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.subscribedUntil, 257);
        b_1.storeInt(src.jettonsToClaim, 257);
        b_1.storeAddress(src.inviter);
        let b_2 = new Builder();
        b_2.storeInt(src.totalVoted, 257);
        b_2.storeInt(src.poolWithdrawnAt, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _lastClaimed = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _subscribedUntil = sc_1.loadIntBig(257);
    let _jettonsToClaim = sc_1.loadIntBig(257);
    let _inviter = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _totalVoted = sc_2.loadIntBig(257);
    let _poolWithdrawnAt = sc_2.loadIntBig(257);
    return { $$type: 'TokenWallet$Data' as const, balance: _balance, owner: _owner, master: _master, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, totalVoted: _totalVoted, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadTupleTokenWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _lastClaimed = source.readBigNumber();
    let _subscribedUntil = source.readBigNumber();
    let _jettonsToClaim = source.readBigNumber();
    let _inviter = source.readAddress();
    let _totalVoted = source.readBigNumber();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'TokenWallet$Data' as const, balance: _balance, owner: _owner, master: _master, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, totalVoted: _totalVoted, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadGetterTupleTokenWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _lastClaimed = source.readBigNumber();
    let _subscribedUntil = source.readBigNumber();
    let _jettonsToClaim = source.readBigNumber();
    let _inviter = source.readAddress();
    let _totalVoted = source.readBigNumber();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'TokenWallet$Data' as const, balance: _balance, owner: _owner, master: _master, lastClaimed: _lastClaimed, subscribedUntil: _subscribedUntil, jettonsToClaim: _jettonsToClaim, inviter: _inviter, totalVoted: _totalVoted, poolWithdrawnAt: _poolWithdrawnAt };
}

function storeTupleTokenWallet$Data(source: TokenWallet$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeNumber(source.lastClaimed);
    builder.writeNumber(source.subscribedUntil);
    builder.writeNumber(source.jettonsToClaim);
    builder.writeAddress(source.inviter);
    builder.writeNumber(source.totalVoted);
    builder.writeNumber(source.poolWithdrawnAt);
    return builder.build();
}

function dictValueParserTokenWallet$Data(): DictionaryValue<TokenWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTokenWallet$Data(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type PoolData = {
    $$type: 'PoolData';
    totalIncome: bigint;
    master: Address;
}

export function storePoolData(src: PoolData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.totalIncome);
        b_0.storeAddress(src.master);
    };
}

export function loadPoolData(slice: Slice) {
    let sc_0 = slice;
    let _totalIncome = sc_0.loadCoins();
    let _master = sc_0.loadAddress();
    return { $$type: 'PoolData' as const, totalIncome: _totalIncome, master: _master };
}

function loadTuplePoolData(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'PoolData' as const, totalIncome: _totalIncome, master: _master };
}

function loadGetterTuplePoolData(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'PoolData' as const, totalIncome: _totalIncome, master: _master };
}

function storeTuplePoolData(source: PoolData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalIncome);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserPoolData(): DictionaryValue<PoolData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolData(src)).endCell());
        },
        parse: (src) => {
            return loadPoolData(src.loadRef().beginParse());
        }
    }
}

export type IncomeEvent = {
    $$type: 'IncomeEvent';
    amount: bigint;
}

export function storeIncomeEvent(src: IncomeEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310569899, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadIncomeEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310569899) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'IncomeEvent' as const, amount: _amount };
}

function loadTupleIncomeEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'IncomeEvent' as const, amount: _amount };
}

function loadGetterTupleIncomeEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'IncomeEvent' as const, amount: _amount };
}

function storeTupleIncomeEvent(source: IncomeEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserIncomeEvent(): DictionaryValue<IncomeEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIncomeEvent(src)).endCell());
        },
        parse: (src) => {
            return loadIncomeEvent(src.loadRef().beginParse());
        }
    }
}

export type MembersPool$Data = {
    $$type: 'MembersPool$Data';
    totalIncome: bigint;
    master: Address;
}

export function storeMembersPool$Data(src: MembersPool$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.totalIncome);
        b_0.storeAddress(src.master);
    };
}

export function loadMembersPool$Data(slice: Slice) {
    let sc_0 = slice;
    let _totalIncome = sc_0.loadCoins();
    let _master = sc_0.loadAddress();
    return { $$type: 'MembersPool$Data' as const, totalIncome: _totalIncome, master: _master };
}

function loadTupleMembersPool$Data(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'MembersPool$Data' as const, totalIncome: _totalIncome, master: _master };
}

function loadGetterTupleMembersPool$Data(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'MembersPool$Data' as const, totalIncome: _totalIncome, master: _master };
}

function storeTupleMembersPool$Data(source: MembersPool$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalIncome);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserMembersPool$Data(): DictionaryValue<MembersPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMembersPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMembersPool$Data(src.loadRef().beginParse());
        }
    }
}

export type Level = {
    $$type: 'Level';
    jettons: bigint;
    price: bigint;
}

export function storeLevel(src: Level) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.jettons, 257);
        b_0.storeInt(src.price, 257);
    };
}

export function loadLevel(slice: Slice) {
    let sc_0 = slice;
    let _jettons = sc_0.loadIntBig(257);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'Level' as const, jettons: _jettons, price: _price };
}

function loadTupleLevel(source: TupleReader) {
    let _jettons = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'Level' as const, jettons: _jettons, price: _price };
}

function loadGetterTupleLevel(source: TupleReader) {
    let _jettons = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'Level' as const, jettons: _jettons, price: _price };
}

function storeTupleLevel(source: Level) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettons);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserLevel(): DictionaryValue<Level> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLevel(src)).endCell());
        },
        parse: (src) => {
            return loadLevel(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type CheckWallet = {
    $$type: 'CheckWallet';
    wallet: Address;
    sender: Address;
    amount: bigint;
}

export function storeCheckWallet(src: CheckWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2217665637, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.amount);
    };
}

export function loadCheckWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2217665637) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _sender = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'CheckWallet' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function loadTupleCheckWallet(source: TupleReader) {
    let _wallet = source.readAddress();
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'CheckWallet' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function loadGetterTupleCheckWallet(source: TupleReader) {
    let _wallet = source.readAddress();
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'CheckWallet' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function storeTupleCheckWallet(source: CheckWallet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCheckWallet(): DictionaryValue<CheckWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckWallet(src)).endCell());
        },
        parse: (src) => {
            return loadCheckWallet(src.loadRef().beginParse());
        }
    }
}

export type RefIncome = {
    $$type: 'RefIncome';
    amount: bigint;
    sender: Address;
    counter: bigint;
    income: bigint;
}

export function storeRefIncome(src: RefIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(588723692, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeUint(src.counter, 8);
        b_0.storeCoins(src.income);
    };
}

export function loadRefIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 588723692) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _counter = sc_0.loadUintBig(8);
    let _income = sc_0.loadCoins();
    return { $$type: 'RefIncome' as const, amount: _amount, sender: _sender, counter: _counter, income: _income };
}

function loadTupleRefIncome(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _counter = source.readBigNumber();
    let _income = source.readBigNumber();
    return { $$type: 'RefIncome' as const, amount: _amount, sender: _sender, counter: _counter, income: _income };
}

function loadGetterTupleRefIncome(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _counter = source.readBigNumber();
    let _income = source.readBigNumber();
    return { $$type: 'RefIncome' as const, amount: _amount, sender: _sender, counter: _counter, income: _income };
}

function storeTupleRefIncome(source: RefIncome) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.counter);
    builder.writeNumber(source.income);
    return builder.build();
}

function dictValueParserRefIncome(): DictionaryValue<RefIncome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRefIncome(src)).endCell());
        },
        parse: (src) => {
            return loadRefIncome(src.loadRef().beginParse());
        }
    }
}

export type AddVots = {
    $$type: 'AddVots';
    amount: bigint;
}

export function storeAddVots(src: AddVots) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3970053455, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadAddVots(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3970053455) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'AddVots' as const, amount: _amount };
}

function loadTupleAddVots(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddVots' as const, amount: _amount };
}

function loadGetterTupleAddVots(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddVots' as const, amount: _amount };
}

function storeTupleAddVots(source: AddVots) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAddVots(): DictionaryValue<AddVots> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddVots(src)).endCell());
        },
        parse: (src) => {
            return loadAddVots(src.loadRef().beginParse());
        }
    }
}

export type CheckSupply = {
    $$type: 'CheckSupply';
    totalVoted: bigint;
    sender: Address;
    poolWithdrawnAt: bigint;
}

export function storeCheckSupply(src: CheckSupply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(634001287, 32);
        b_0.storeCoins(src.totalVoted);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.poolWithdrawnAt);
    };
}

export function loadCheckSupply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 634001287) { throw Error('Invalid prefix'); }
    let _totalVoted = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _poolWithdrawnAt = sc_0.loadCoins();
    return { $$type: 'CheckSupply' as const, totalVoted: _totalVoted, sender: _sender, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadTupleCheckSupply(source: TupleReader) {
    let _totalVoted = source.readBigNumber();
    let _sender = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'CheckSupply' as const, totalVoted: _totalVoted, sender: _sender, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadGetterTupleCheckSupply(source: TupleReader) {
    let _totalVoted = source.readBigNumber();
    let _sender = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'CheckSupply' as const, totalVoted: _totalVoted, sender: _sender, poolWithdrawnAt: _poolWithdrawnAt };
}

function storeTupleCheckSupply(source: CheckSupply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalVoted);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.poolWithdrawnAt);
    return builder.build();
}

function dictValueParserCheckSupply(): DictionaryValue<CheckSupply> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckSupply(src)).endCell());
        },
        parse: (src) => {
            return loadCheckSupply(src.loadRef().beginParse());
        }
    }
}

export type ClaimPool = {
    $$type: 'ClaimPool';
    query_id: bigint;
}

export function storeClaimPool(src: ClaimPool) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2068911418, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadClaimPool(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2068911418) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'ClaimPool' as const, query_id: _query_id };
}

function loadTupleClaimPool(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'ClaimPool' as const, query_id: _query_id };
}

function loadGetterTupleClaimPool(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'ClaimPool' as const, query_id: _query_id };
}

function storeTupleClaimPool(source: ClaimPool) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserClaimPool(): DictionaryValue<ClaimPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimPool(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPool(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    owner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2242002949, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2242002949) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeInviter = {
    $$type: 'ChangeInviter';
    inviter: Address;
}

export function storeChangeInviter(src: ChangeInviter) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(387241414, 32);
        b_0.storeAddress(src.inviter);
    };
}

export function loadChangeInviter(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 387241414) { throw Error('Invalid prefix'); }
    let _inviter = sc_0.loadAddress();
    return { $$type: 'ChangeInviter' as const, inviter: _inviter };
}

function loadTupleChangeInviter(source: TupleReader) {
    let _inviter = source.readAddress();
    return { $$type: 'ChangeInviter' as const, inviter: _inviter };
}

function loadGetterTupleChangeInviter(source: TupleReader) {
    let _inviter = source.readAddress();
    return { $$type: 'ChangeInviter' as const, inviter: _inviter };
}

function storeTupleChangeInviter(source: ChangeInviter) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.inviter);
    return builder.build();
}

function dictValueParserChangeInviter(): DictionaryValue<ChangeInviter> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeInviter(src)).endCell());
        },
        parse: (src) => {
            return loadChangeInviter(src.loadRef().beginParse());
        }
    }
}

export type Claim = {
    $$type: 'Claim';
    query_id: bigint;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3281185899, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3281185899) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Claim' as const, query_id: _query_id };
}

function loadTupleClaim(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Claim' as const, query_id: _query_id };
}

function loadGetterTupleClaim(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Claim' as const, query_id: _query_id };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}

export type UpdateSubscribe = {
    $$type: 'UpdateSubscribe';
    jettons: bigint;
    price: bigint;
}

export function storeUpdateSubscribe(src: UpdateSubscribe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2522673192, 32);
        b_0.storeInt(src.jettons, 257);
        b_0.storeInt(src.price, 257);
    };
}

export function loadUpdateSubscribe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2522673192) { throw Error('Invalid prefix'); }
    let _jettons = sc_0.loadIntBig(257);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'UpdateSubscribe' as const, jettons: _jettons, price: _price };
}

function loadTupleUpdateSubscribe(source: TupleReader) {
    let _jettons = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'UpdateSubscribe' as const, jettons: _jettons, price: _price };
}

function loadGetterTupleUpdateSubscribe(source: TupleReader) {
    let _jettons = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'UpdateSubscribe' as const, jettons: _jettons, price: _price };
}

function storeTupleUpdateSubscribe(source: UpdateSubscribe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettons);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserUpdateSubscribe(): DictionaryValue<UpdateSubscribe> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateSubscribe(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateSubscribe(src.loadRef().beginParse());
        }
    }
}

export type Subscribe = {
    $$type: 'Subscribe';
    lvl: bigint;
}

export function storeSubscribe(src: Subscribe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(462151548, 32);
        b_0.storeUint(src.lvl, 8);
    };
}

export function loadSubscribe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 462151548) { throw Error('Invalid prefix'); }
    let _lvl = sc_0.loadUintBig(8);
    return { $$type: 'Subscribe' as const, lvl: _lvl };
}

function loadTupleSubscribe(source: TupleReader) {
    let _lvl = source.readBigNumber();
    return { $$type: 'Subscribe' as const, lvl: _lvl };
}

function loadGetterTupleSubscribe(source: TupleReader) {
    let _lvl = source.readBigNumber();
    return { $$type: 'Subscribe' as const, lvl: _lvl };
}

function storeTupleSubscribe(source: Subscribe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lvl);
    return builder.build();
}

function dictValueParserSubscribe(): DictionaryValue<Subscribe> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubscribe(src)).endCell());
        },
        parse: (src) => {
            return loadSubscribe(src.loadRef().beginParse());
        }
    }
}

export type ChangeSubscribePrice = {
    $$type: 'ChangeSubscribePrice';
    subscribePrice: Dictionary<bigint, Level>;
}

export function storeChangeSubscribePrice(src: ChangeSubscribePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(258417304, 32);
        b_0.storeDict(src.subscribePrice, Dictionary.Keys.BigInt(257), dictValueParserLevel());
    };
}

export function loadChangeSubscribePrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 258417304) { throw Error('Invalid prefix'); }
    let _subscribePrice = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLevel(), sc_0);
    return { $$type: 'ChangeSubscribePrice' as const, subscribePrice: _subscribePrice };
}

function loadTupleChangeSubscribePrice(source: TupleReader) {
    let _subscribePrice = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLevel(), source.readCellOpt());
    return { $$type: 'ChangeSubscribePrice' as const, subscribePrice: _subscribePrice };
}

function loadGetterTupleChangeSubscribePrice(source: TupleReader) {
    let _subscribePrice = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLevel(), source.readCellOpt());
    return { $$type: 'ChangeSubscribePrice' as const, subscribePrice: _subscribePrice };
}

function storeTupleChangeSubscribePrice(source: ChangeSubscribePrice) {
    let builder = new TupleBuilder();
    builder.writeCell(source.subscribePrice.size > 0 ? beginCell().storeDictDirect(source.subscribePrice, Dictionary.Keys.BigInt(257), dictValueParserLevel()).endCell() : null);
    return builder.build();
}

function dictValueParserChangeSubscribePrice(): DictionaryValue<ChangeSubscribePrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeSubscribePrice(src)).endCell());
        },
        parse: (src) => {
            return loadChangeSubscribePrice(src.loadRef().beginParse());
        }
    }
}

export type InternalTransfer = {
    $$type: 'InternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeInternalTransfer(src: InternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInternalTransfer(source: InternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserInternalTransfer(): DictionaryValue<InternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferNotification = {
    $$type: 'TransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeTransferNotification(src: TransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTransferNotification(source: TransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransferNotification(): DictionaryValue<TransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type MintVots = {
    $$type: 'MintVots';
    sender: Address;
    amount: bigint;
}

export function storeMintVots(src: MintVots) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2849257298, 32);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.amount);
    };
}

export function loadMintVots(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2849257298) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'MintVots' as const, sender: _sender, amount: _amount };
}

function loadTupleMintVots(source: TupleReader) {
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'MintVots' as const, sender: _sender, amount: _amount };
}

function loadGetterTupleMintVots(source: TupleReader) {
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'MintVots' as const, sender: _sender, amount: _amount };
}

function storeTupleMintVots(source: MintVots) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserMintVots(): DictionaryValue<MintVots> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintVots(src)).endCell());
        },
        parse: (src) => {
            return loadMintVots(src.loadRef().beginParse());
        }
    }
}

export type AddIncome = {
    $$type: 'AddIncome';
    amount: bigint;
}

export function storeAddIncome(src: AddIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2399678173, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadAddIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2399678173) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'AddIncome' as const, amount: _amount };
}

function loadTupleAddIncome(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddIncome' as const, amount: _amount };
}

function loadGetterTupleAddIncome(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'AddIncome' as const, amount: _amount };
}

function storeTupleAddIncome(source: AddIncome) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAddIncome(): DictionaryValue<AddIncome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddIncome(src)).endCell());
        },
        parse: (src) => {
            return loadAddIncome(src.loadRef().beginParse());
        }
    }
}

export type SendIncome = {
    $$type: 'SendIncome';
    totalSupply: bigint;
    totalVoted: bigint;
    wallet: Address;
    poolWithdrawnAt: bigint;
}

export function storeSendIncome(src: SendIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3775197011, 32);
        b_0.storeCoins(src.totalSupply);
        b_0.storeCoins(src.totalVoted);
        b_0.storeAddress(src.wallet);
        b_0.storeCoins(src.poolWithdrawnAt);
    };
}

export function loadSendIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3775197011) { throw Error('Invalid prefix'); }
    let _totalSupply = sc_0.loadCoins();
    let _totalVoted = sc_0.loadCoins();
    let _wallet = sc_0.loadAddress();
    let _poolWithdrawnAt = sc_0.loadCoins();
    return { $$type: 'SendIncome' as const, totalSupply: _totalSupply, totalVoted: _totalVoted, wallet: _wallet, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadTupleSendIncome(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _totalVoted = source.readBigNumber();
    let _wallet = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'SendIncome' as const, totalSupply: _totalSupply, totalVoted: _totalVoted, wallet: _wallet, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadGetterTupleSendIncome(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _totalVoted = source.readBigNumber();
    let _wallet = source.readAddress();
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'SendIncome' as const, totalSupply: _totalSupply, totalVoted: _totalVoted, wallet: _wallet, poolWithdrawnAt: _poolWithdrawnAt };
}

function storeTupleSendIncome(source: SendIncome) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.totalVoted);
    builder.writeAddress(source.wallet);
    builder.writeNumber(source.poolWithdrawnAt);
    return builder.build();
}

function dictValueParserSendIncome(): DictionaryValue<SendIncome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendIncome(src)).endCell());
        },
        parse: (src) => {
            return loadSendIncome(src.loadRef().beginParse());
        }
    }
}

export type Validate = {
    $$type: 'Validate';
    wallet: Address;
    sender: Address;
    amount: bigint;
}

export function storeValidate(src: Validate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1481772776, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.amount);
    };
}

export function loadValidate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1481772776) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _sender = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'Validate' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function loadTupleValidate(source: TupleReader) {
    let _wallet = source.readAddress();
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Validate' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function loadGetterTupleValidate(source: TupleReader) {
    let _wallet = source.readAddress();
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Validate' as const, wallet: _wallet, sender: _sender, amount: _amount };
}

function storeTupleValidate(source: Validate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserValidate(): DictionaryValue<Validate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeValidate(src)).endCell());
        },
        parse: (src) => {
            return loadValidate(src.loadRef().beginParse());
        }
    }
}

export type PoolIncome = {
    $$type: 'PoolIncome';
    poolWithdrawnAt: bigint;
}

export function storePoolIncome(src: PoolIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2755660441, 32);
        b_0.storeCoins(src.poolWithdrawnAt);
    };
}

export function loadPoolIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2755660441) { throw Error('Invalid prefix'); }
    let _poolWithdrawnAt = sc_0.loadCoins();
    return { $$type: 'PoolIncome' as const, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadTuplePoolIncome(source: TupleReader) {
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'PoolIncome' as const, poolWithdrawnAt: _poolWithdrawnAt };
}

function loadGetterTuplePoolIncome(source: TupleReader) {
    let _poolWithdrawnAt = source.readBigNumber();
    return { $$type: 'PoolIncome' as const, poolWithdrawnAt: _poolWithdrawnAt };
}

function storeTuplePoolIncome(source: PoolIncome) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.poolWithdrawnAt);
    return builder.build();
}

function dictValueParserPoolIncome(): DictionaryValue<PoolIncome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolIncome(src)).endCell());
        },
        parse: (src) => {
            return loadPoolIncome(src.loadRef().beginParse());
        }
    }
}

export type Burn = {
    $$type: 'Burn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeBurn(src: Burn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleBurn(source: Burn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserBurn(): DictionaryValue<Burn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurn(src)).endCell());
        },
        parse: (src) => {
            return loadBurn(src.loadRef().beginParse());
        }
    }
}

export type BurnNotification = {
    $$type: 'BurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeBurnNotification(src: BurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleBurnNotification(source: BurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserBurnNotification(): DictionaryValue<BurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type ChangeContent = {
    $$type: 'ChangeContent';
    jetton_content: Cell;
}

export function storeChangeContent(src: ChangeContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(274271986, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadChangeContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 274271986) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadGetterTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function storeTupleChangeContent(source: ChangeContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserChangeContent(): DictionaryValue<ChangeContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Address | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type MasterData = {
    $$type: 'MasterData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
    pool: Address;
}

export function storeMasterData(src: MasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.jetton_content);
        b_0.storeRef(src.jetton_wallet_code);
        b_0.storeAddress(src.pool);
    };
}

export function loadMasterData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _jetton_wallet_code = sc_0.loadRef();
    let _pool = sc_0.loadAddress();
    return { $$type: 'MasterData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code, pool: _pool };
}

function loadTupleMasterData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    let _pool = source.readAddress();
    return { $$type: 'MasterData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code, pool: _pool };
}

function loadGetterTupleMasterData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _jetton_wallet_code = source.readCell();
    let _pool = source.readAddress();
    return { $$type: 'MasterData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, jetton_wallet_code: _jetton_wallet_code, pool: _pool };
}

function storeTupleMasterData(source: MasterData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.jetton_wallet_code);
    builder.writeAddress(source.pool);
    return builder.build();
}

function dictValueParserMasterData(): DictionaryValue<MasterData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMasterData(src)).endCell());
        },
        parse: (src) => {
            return loadMasterData(src.loadRef().beginParse());
        }
    }
}

export type TokenMaster$Data = {
    $$type: 'TokenMaster$Data';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    jetton_content: Cell;
    subscribePrice: Dictionary<bigint, Level>;
}

export function storeTokenMaster$Data(src: TokenMaster$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.jetton_content);
        b_0.storeDict(src.subscribePrice, Dictionary.Keys.BigInt(257), dictValueParserLevel());
    };
}

export function loadTokenMaster$Data(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _jetton_content = sc_0.loadRef();
    let _subscribePrice = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLevel(), sc_0);
    return { $$type: 'TokenMaster$Data' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, subscribePrice: _subscribePrice };
}

function loadTupleTokenMaster$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _subscribePrice = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLevel(), source.readCellOpt());
    return { $$type: 'TokenMaster$Data' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, subscribePrice: _subscribePrice };
}

function loadGetterTupleTokenMaster$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jetton_content = source.readCell();
    let _subscribePrice = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLevel(), source.readCellOpt());
    return { $$type: 'TokenMaster$Data' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, jetton_content: _jetton_content, subscribePrice: _subscribePrice };
}

function storeTupleTokenMaster$Data(source: TokenMaster$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.jetton_content);
    builder.writeCell(source.subscribePrice.size > 0 ? beginCell().storeDictDirect(source.subscribePrice, Dictionary.Keys.BigInt(257), dictValueParserLevel()).endCell() : null);
    return builder.build();
}

function dictValueParserTokenMaster$Data(): DictionaryValue<TokenMaster$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenMaster$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTokenMaster$Data(src.loadRef().beginParse());
        }
    }
}

 type TokenMaster_init_args = {
    $$type: 'TokenMaster_init_args';
    owner: Address;
    jetton_content: Cell;
}

function initTokenMaster_init_args(src: TokenMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.jetton_content);
    };
}

async function TokenMaster_init(owner: Address, jetton_content: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTokenMaster_init_args({ $$type: 'TokenMaster_init_args', owner, jetton_content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TokenMaster_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    11184: { message: `Not a master` },
    14073: { message: `No claims available` },
    30201: { message: `Inviter already set` },
    41747: { message: `Invalid lvl` },
    48540: { message: `Not enough tons` },
    49345: { message: `Mint stopped` },
    51724: { message: `Invalid ton amount` },
    54227: { message: `Invalid token amount` },
    55027: { message: `wrong sender` },
}

const TokenMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MemberData","header":null,"fields":[{"name":"totalVoted","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"subscribedUntil","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonsToClaim","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"inviter","type":{"kind":"simple","type":"address","optional":false}},{"name":"poolWithdrawnAt","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TokenWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"subscribedUntil","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonsToClaim","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"inviter","type":{"kind":"simple","type":"address","optional":false}},{"name":"totalVoted","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"poolWithdrawnAt","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolData","header":null,"fields":[{"name":"totalIncome","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"IncomeEvent","header":2310569899,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MembersPool$Data","header":null,"fields":[{"name":"totalIncome","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Level","header":null,"fields":[{"name":"jettons","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Transfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CheckWallet","header":2217665637,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"RefIncome","header":588723692,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"counter","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"income","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddVots","header":3970053455,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CheckSupply","header":634001287,"fields":[{"name":"totalVoted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"poolWithdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimPool","header":2068911418,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeOwner","header":2242002949,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeInviter","header":387241414,"fields":[{"name":"inviter","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Claim","header":3281185899,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"UpdateSubscribe","header":2522673192,"fields":[{"name":"jettons","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Subscribe","header":462151548,"fields":[{"name":"lvl","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ChangeSubscribePrice","header":258417304,"fields":[{"name":"subscribePrice","type":{"kind":"dict","key":"int","value":"Level","valueFormat":"ref"}}]},
    {"name":"InternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"MintVots","header":2849257298,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddIncome","header":2399678173,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SendIncome","header":3775197011,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalVoted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"poolWithdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Validate","header":1481772776,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PoolIncome","header":2755660441,"fields":[{"name":"poolWithdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Burn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"BurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeContent","header":274271986,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"MasterData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"pool","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenMaster$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"subscribePrice","type":{"kind":"dict","key":"int","value":"Level","valueFormat":"ref"}}]},
]

const TokenMaster_getters: ABIGetter[] = [
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"MasterData","optional":false}},
    {"name":"subscribePrice","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Level","valueFormat":"ref"}},
    {"name":"get_wallet_address","arguments":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"poolAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const TokenMaster_getterMapping: { [key: string]: string } = {
    'get_jetton_data': 'getGetJettonData',
    'subscribePrice': 'getSubscribePrice',
    'get_wallet_address': 'getGetWalletAddress',
    'poolAddress': 'getPoolAddress',
}

const TokenMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeSubscribePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Subscribe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintVots"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CheckWallet"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CheckSupply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TokenMaster implements Contract {
    
    static async init(owner: Address, jetton_content: Cell) {
        return await TokenMaster_init(owner, jetton_content);
    }
    
    static async fromInit(owner: Address, jetton_content: Cell) {
        const init = await TokenMaster_init(owner, jetton_content);
        const address = contractAddress(0, init);
        return new TokenMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TokenMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TokenMaster_types,
        getters: TokenMaster_getters,
        receivers: TokenMaster_receivers,
        errors: TokenMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ChangeContent | ChangeOwner | ChangeSubscribePrice | Transfer | Subscribe | MintVots | ProvideWalletAddress | CheckWallet | 'Stop Mint' | BurnNotification | CheckSupply | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeContent') {
            body = beginCell().store(storeChangeContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeSubscribePrice') {
            body = beginCell().store(storeChangeSubscribePrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Subscribe') {
            body = beginCell().store(storeSubscribe(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintVots') {
            body = beginCell().store(storeMintVots(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideWalletAddress') {
            body = beginCell().store(storeProvideWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckWallet') {
            body = beginCell().store(storeCheckWallet(message)).endCell();
        }
        if (message === 'Stop Mint') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BurnNotification') {
            body = beginCell().store(storeBurnNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckSupply') {
            body = beginCell().store(storeCheckSupply(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleMasterData(source);
        return result;
    }
    
    async getSubscribePrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('subscribePrice', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLevel(), source.readCellOpt());
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner_address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner_address);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getPoolAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('poolAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}