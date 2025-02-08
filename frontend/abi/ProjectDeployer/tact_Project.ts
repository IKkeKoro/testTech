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

export type Project$Data = {
    $$type: 'Project$Data';
    deployer: Address;
    id: bigint;
    owner: Address;
    data: Data;
    voted: bigint;
    invested: bigint;
    required: bigint;
    withdrawn: bigint;
    income: bigint;
    stage: bigint;
    percents: Dictionary<bigint, bigint>;
}

export function storeProject$Data(src: Project$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.deployer);
        b_0.storeUint(src.id, 64);
        b_0.storeAddress(src.owner);
        let b_1 = new Builder();
        b_1.store(storeData(src.data));
        b_1.storeCoins(src.voted);
        b_1.storeCoins(src.invested);
        b_1.storeCoins(src.required);
        b_1.storeCoins(src.withdrawn);
        b_1.storeCoins(src.income);
        b_1.storeUint(src.stage, 8);
        b_1.storeDict(src.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadProject$Data(slice: Slice) {
    let sc_0 = slice;
    let _deployer = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = loadData(sc_1);
    let _voted = sc_1.loadCoins();
    let _invested = sc_1.loadCoins();
    let _required = sc_1.loadCoins();
    let _withdrawn = sc_1.loadCoins();
    let _income = sc_1.loadCoins();
    let _stage = sc_1.loadUintBig(8);
    let _percents = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'Project$Data' as const, deployer: _deployer, id: _id, owner: _owner, data: _data, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, stage: _stage, percents: _percents };
}

function loadTupleProject$Data(source: TupleReader) {
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadTupleData(source);
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _required = source.readBigNumber();
    let _withdrawn = source.readBigNumber();
    let _income = source.readBigNumber();
    let _stage = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Project$Data' as const, deployer: _deployer, id: _id, owner: _owner, data: _data, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, stage: _stage, percents: _percents };
}

function loadGetterTupleProject$Data(source: TupleReader) {
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadGetterTupleData(source);
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _required = source.readBigNumber();
    let _withdrawn = source.readBigNumber();
    let _income = source.readBigNumber();
    let _stage = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Project$Data' as const, deployer: _deployer, id: _id, owner: _owner, data: _data, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, stage: _stage, percents: _percents };
}

function storeTupleProject$Data(source: Project$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.deployer);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleData(source.data));
    builder.writeNumber(source.voted);
    builder.writeNumber(source.invested);
    builder.writeNumber(source.required);
    builder.writeNumber(source.withdrawn);
    builder.writeNumber(source.income);
    builder.writeNumber(source.stage);
    builder.writeCell(source.percents.size > 0 ? beginCell().storeDictDirect(source.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserProject$Data(): DictionaryValue<Project$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProject$Data(src)).endCell());
        },
        parse: (src) => {
            return loadProject$Data(src.loadRef().beginParse());
        }
    }
}

export type DonationData = {
    $$type: 'DonationData';
    donated: bigint;
    deployer: Address;
    id: bigint;
    owner: Address;
    data: Data;
}

export function storeDonationData(src: DonationData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.donated, 32);
        b_0.storeAddress(src.deployer);
        b_0.storeUint(src.id, 64);
        b_0.storeAddress(src.owner);
        b_0.store(storeData(src.data));
    };
}

export function loadDonationData(slice: Slice) {
    let sc_0 = slice;
    let _donated = sc_0.loadUintBig(32);
    let _deployer = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _data = loadData(sc_0);
    return { $$type: 'DonationData' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data };
}

function loadTupleDonationData(source: TupleReader) {
    let _donated = source.readBigNumber();
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadTupleData(source);
    return { $$type: 'DonationData' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data };
}

function loadGetterTupleDonationData(source: TupleReader) {
    let _donated = source.readBigNumber();
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadGetterTupleData(source);
    return { $$type: 'DonationData' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data };
}

function storeTupleDonationData(source: DonationData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.donated);
    builder.writeAddress(source.deployer);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleData(source.data));
    return builder.build();
}

function dictValueParserDonationData(): DictionaryValue<DonationData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDonationData(src)).endCell());
        },
        parse: (src) => {
            return loadDonationData(src.loadRef().beginParse());
        }
    }
}

export type DeployDonation = {
    $$type: 'DeployDonation';
    data: Data;
    owner: Address;
}

export function storeDeployDonation(src: DeployDonation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4017052970, 32);
        b_0.store(storeData(src.data));
        b_0.storeAddress(src.owner);
    };
}

export function loadDeployDonation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4017052970) { throw Error('Invalid prefix'); }
    let _data = loadData(sc_0);
    let _owner = sc_0.loadAddress();
    return { $$type: 'DeployDonation' as const, data: _data, owner: _owner };
}

function loadTupleDeployDonation(source: TupleReader) {
    const _data = loadTupleData(source);
    let _owner = source.readAddress();
    return { $$type: 'DeployDonation' as const, data: _data, owner: _owner };
}

function loadGetterTupleDeployDonation(source: TupleReader) {
    const _data = loadGetterTupleData(source);
    let _owner = source.readAddress();
    return { $$type: 'DeployDonation' as const, data: _data, owner: _owner };
}

function storeTupleDeployDonation(source: DeployDonation) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleData(source.data));
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserDeployDonation(): DictionaryValue<DeployDonation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployDonation(src)).endCell());
        },
        parse: (src) => {
            return loadDeployDonation(src.loadRef().beginParse());
        }
    }
}

export type Donate = {
    $$type: 'Donate';
    amount: bigint;
}

export function storeDonate(src: Donate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1091855686, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadDonate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1091855686) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Donate' as const, amount: _amount };
}

function loadTupleDonate(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Donate' as const, amount: _amount };
}

function loadGetterTupleDonate(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Donate' as const, amount: _amount };
}

function storeTupleDonate(source: Donate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDonate(): DictionaryValue<Donate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDonate(src)).endCell());
        },
        parse: (src) => {
            return loadDonate(src.loadRef().beginParse());
        }
    }
}

export type DonationEvent = {
    $$type: 'DonationEvent';
    amount: bigint;
    from: Address;
}

export function storeDonationEvent(src: DonationEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(310130085, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
    };
}

export function loadDonationEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 310130085) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'DonationEvent' as const, amount: _amount, from: _from };
}

function loadTupleDonationEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'DonationEvent' as const, amount: _amount, from: _from };
}

function loadGetterTupleDonationEvent(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'DonationEvent' as const, amount: _amount, from: _from };
}

function storeTupleDonationEvent(source: DonationEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserDonationEvent(): DictionaryValue<DonationEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDonationEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDonationEvent(src.loadRef().beginParse());
        }
    }
}

export type Donation$Data = {
    $$type: 'Donation$Data';
    donated: bigint;
    deployer: Address;
    id: bigint;
    owner: Address;
    data: Data;
    active: boolean;
}

export function storeDonation$Data(src: Donation$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.donated);
        b_0.storeAddress(src.deployer);
        b_0.storeUint(src.id, 64);
        b_0.storeAddress(src.owner);
        b_0.store(storeData(src.data));
        b_0.storeBit(src.active);
    };
}

export function loadDonation$Data(slice: Slice) {
    let sc_0 = slice;
    let _donated = sc_0.loadCoins();
    let _deployer = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _data = loadData(sc_0);
    let _active = sc_0.loadBit();
    return { $$type: 'Donation$Data' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data, active: _active };
}

function loadTupleDonation$Data(source: TupleReader) {
    let _donated = source.readBigNumber();
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadTupleData(source);
    let _active = source.readBoolean();
    return { $$type: 'Donation$Data' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data, active: _active };
}

function loadGetterTupleDonation$Data(source: TupleReader) {
    let _donated = source.readBigNumber();
    let _deployer = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadGetterTupleData(source);
    let _active = source.readBoolean();
    return { $$type: 'Donation$Data' as const, donated: _donated, deployer: _deployer, id: _id, owner: _owner, data: _data, active: _active };
}

function storeTupleDonation$Data(source: Donation$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.donated);
    builder.writeAddress(source.deployer);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleData(source.data));
    builder.writeBoolean(source.active);
    return builder.build();
}

function dictValueParserDonation$Data(): DictionaryValue<Donation$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDonation$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDonation$Data(src.loadRef().beginParse());
        }
    }
}

export type UserData$Data = {
    $$type: 'UserData$Data';
    owner: Address;
    projectId: bigint;
    deployer: Address;
    invested: bigint;
    voted: bigint;
    withdrawnAt: bigint;
    totalIncome: bigint;
}

export function storeUserData$Data(src: UserData$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.projectId, 64);
        b_0.storeAddress(src.deployer);
        b_0.storeCoins(src.invested);
        b_0.storeCoins(src.voted);
        b_0.storeCoins(src.withdrawnAt);
        let b_1 = new Builder();
        b_1.storeCoins(src.totalIncome);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUserData$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _projectId = sc_0.loadUintBig(64);
    let _deployer = sc_0.loadAddress();
    let _invested = sc_0.loadCoins();
    let _voted = sc_0.loadCoins();
    let _withdrawnAt = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _totalIncome = sc_1.loadCoins();
    return { $$type: 'UserData$Data' as const, owner: _owner, projectId: _projectId, deployer: _deployer, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, totalIncome: _totalIncome };
}

function loadTupleUserData$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    let _deployer = source.readAddress();
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    let _totalIncome = source.readBigNumber();
    return { $$type: 'UserData$Data' as const, owner: _owner, projectId: _projectId, deployer: _deployer, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, totalIncome: _totalIncome };
}

function loadGetterTupleUserData$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    let _deployer = source.readAddress();
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    let _totalIncome = source.readBigNumber();
    return { $$type: 'UserData$Data' as const, owner: _owner, projectId: _projectId, deployer: _deployer, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, totalIncome: _totalIncome };
}

function storeTupleUserData$Data(source: UserData$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.projectId);
    builder.writeAddress(source.deployer);
    builder.writeNumber(source.invested);
    builder.writeNumber(source.voted);
    builder.writeNumber(source.withdrawnAt);
    builder.writeNumber(source.totalIncome);
    return builder.build();
}

function dictValueParserUserData$Data(): DictionaryValue<UserData$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserData$Data(src)).endCell());
        },
        parse: (src) => {
            return loadUserData$Data(src.loadRef().beginParse());
        }
    }
}

export type DeployerData = {
    $$type: 'DeployerData';
    owner: Address;
    projectId: bigint;
    donationId: bigint;
    projectPrice: bigint;
    balance: bigint;
    master: Address;
}

export function storeDeployerData(src: DeployerData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.projectId, 64);
        b_0.storeUint(src.donationId, 64);
        b_0.storeCoins(src.projectPrice);
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.master);
    };
}

export function loadDeployerData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _projectId = sc_0.loadUintBig(64);
    let _donationId = sc_0.loadUintBig(64);
    let _projectPrice = sc_0.loadCoins();
    let _balance = sc_0.loadCoins();
    let _master = sc_0.loadAddress();
    return { $$type: 'DeployerData' as const, owner: _owner, projectId: _projectId, donationId: _donationId, projectPrice: _projectPrice, balance: _balance, master: _master };
}

function loadTupleDeployerData(source: TupleReader) {
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    let _donationId = source.readBigNumber();
    let _projectPrice = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'DeployerData' as const, owner: _owner, projectId: _projectId, donationId: _donationId, projectPrice: _projectPrice, balance: _balance, master: _master };
}

function loadGetterTupleDeployerData(source: TupleReader) {
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    let _donationId = source.readBigNumber();
    let _projectPrice = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _master = source.readAddress();
    return { $$type: 'DeployerData' as const, owner: _owner, projectId: _projectId, donationId: _donationId, projectPrice: _projectPrice, balance: _balance, master: _master };
}

function storeTupleDeployerData(source: DeployerData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.projectId);
    builder.writeNumber(source.donationId);
    builder.writeNumber(source.projectPrice);
    builder.writeNumber(source.balance);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserDeployerData(): DictionaryValue<DeployerData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployerData(src)).endCell());
        },
        parse: (src) => {
            return loadDeployerData(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    title: string;
    description: string;
    image: string;
    link: string;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.description);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.image);
        b_1.storeStringRefTail(src.link);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _title = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _image = sc_1.loadStringRefTail();
    let _link = sc_1.loadStringRefTail();
    return { $$type: 'Data' as const, title: _title, description: _description, image: _image, link: _link };
}

function loadTupleData(source: TupleReader) {
    let _title = source.readString();
    let _description = source.readString();
    let _image = source.readString();
    let _link = source.readString();
    return { $$type: 'Data' as const, title: _title, description: _description, image: _image, link: _link };
}

function loadGetterTupleData(source: TupleReader) {
    let _title = source.readString();
    let _description = source.readString();
    let _image = source.readString();
    let _link = source.readString();
    return { $$type: 'Data' as const, title: _title, description: _description, image: _image, link: _link };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeString(source.title);
    builder.writeString(source.description);
    builder.writeString(source.image);
    builder.writeString(source.link);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

export type NewProject = {
    $$type: 'NewProject';
    address: Address;
    id: bigint;
    data: Data;
    owner: Address;
    required: bigint;
    percents: Dictionary<bigint, bigint>;
}

export function storeNewProject(src: NewProject) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1463093253, 32);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.id, 64);
        let b_1 = new Builder();
        b_1.store(storeData(src.data));
        b_1.storeAddress(src.owner);
        b_1.storeCoins(src.required);
        b_1.storeDict(src.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNewProject(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1463093253) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = loadData(sc_1);
    let _owner = sc_1.loadAddress();
    let _required = sc_1.loadCoins();
    let _percents = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'NewProject' as const, address: _address, id: _id, data: _data, owner: _owner, required: _required, percents: _percents };
}

function loadTupleNewProject(source: TupleReader) {
    let _address = source.readAddress();
    let _id = source.readBigNumber();
    const _data = loadTupleData(source);
    let _owner = source.readAddress();
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'NewProject' as const, address: _address, id: _id, data: _data, owner: _owner, required: _required, percents: _percents };
}

function loadGetterTupleNewProject(source: TupleReader) {
    let _address = source.readAddress();
    let _id = source.readBigNumber();
    const _data = loadGetterTupleData(source);
    let _owner = source.readAddress();
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'NewProject' as const, address: _address, id: _id, data: _data, owner: _owner, required: _required, percents: _percents };
}

function storeTupleNewProject(source: NewProject) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.id);
    builder.writeTuple(storeTupleData(source.data));
    builder.writeAddress(source.owner);
    builder.writeNumber(source.required);
    builder.writeCell(source.percents.size > 0 ? beginCell().storeDictDirect(source.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserNewProject(): DictionaryValue<NewProject> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewProject(src)).endCell());
        },
        parse: (src) => {
            return loadNewProject(src.loadRef().beginParse());
        }
    }
}

export type NewDonation = {
    $$type: 'NewDonation';
    address: Address;
    id: bigint;
    owner: Address;
    data: Data;
}

export function storeNewDonation(src: NewDonation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3359593827, 32);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.id, 64);
        b_0.storeAddress(src.owner);
        b_0.store(storeData(src.data));
    };
}

export function loadNewDonation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3359593827) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _data = loadData(sc_0);
    return { $$type: 'NewDonation' as const, address: _address, id: _id, owner: _owner, data: _data };
}

function loadTupleNewDonation(source: TupleReader) {
    let _address = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadTupleData(source);
    return { $$type: 'NewDonation' as const, address: _address, id: _id, owner: _owner, data: _data };
}

function loadGetterTupleNewDonation(source: TupleReader) {
    let _address = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    const _data = loadGetterTupleData(source);
    return { $$type: 'NewDonation' as const, address: _address, id: _id, owner: _owner, data: _data };
}

function storeTupleNewDonation(source: NewDonation) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeTuple(storeTupleData(source.data));
    return builder.build();
}

function dictValueParserNewDonation(): DictionaryValue<NewDonation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewDonation(src)).endCell());
        },
        parse: (src) => {
            return loadNewDonation(src.loadRef().beginParse());
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

export type ChangeActive = {
    $$type: 'ChangeActive';
    active: boolean;
}

export function storeChangeActive(src: ChangeActive) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1103353291, 32);
        b_0.storeBit(src.active);
    };
}

export function loadChangeActive(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1103353291) { throw Error('Invalid prefix'); }
    let _active = sc_0.loadBit();
    return { $$type: 'ChangeActive' as const, active: _active };
}

function loadTupleChangeActive(source: TupleReader) {
    let _active = source.readBoolean();
    return { $$type: 'ChangeActive' as const, active: _active };
}

function loadGetterTupleChangeActive(source: TupleReader) {
    let _active = source.readBoolean();
    return { $$type: 'ChangeActive' as const, active: _active };
}

function storeTupleChangeActive(source: ChangeActive) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    return builder.build();
}

function dictValueParserChangeActive(): DictionaryValue<ChangeActive> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeActive(src)).endCell());
        },
        parse: (src) => {
            return loadChangeActive(src.loadRef().beginParse());
        }
    }
}

export type ChangePrice = {
    $$type: 'ChangePrice';
    projectPrice: bigint;
}

export function storeChangePrice(src: ChangePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3582265868, 32);
        b_0.storeCoins(src.projectPrice);
    };
}

export function loadChangePrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3582265868) { throw Error('Invalid prefix'); }
    let _projectPrice = sc_0.loadCoins();
    return { $$type: 'ChangePrice' as const, projectPrice: _projectPrice };
}

function loadTupleChangePrice(source: TupleReader) {
    let _projectPrice = source.readBigNumber();
    return { $$type: 'ChangePrice' as const, projectPrice: _projectPrice };
}

function loadGetterTupleChangePrice(source: TupleReader) {
    let _projectPrice = source.readBigNumber();
    return { $$type: 'ChangePrice' as const, projectPrice: _projectPrice };
}

function storeTupleChangePrice(source: ChangePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.projectPrice);
    return builder.build();
}

function dictValueParserChangePrice(): DictionaryValue<ChangePrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangePrice(src)).endCell());
        },
        parse: (src) => {
            return loadChangePrice(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    query_id: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1239257369, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1239257369) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Withdraw' as const, query_id: _query_id };
}

function loadTupleWithdraw(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Withdraw' as const, query_id: _query_id };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Withdraw' as const, query_id: _query_id };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type StageManage = {
    $$type: 'StageManage';
    id: bigint;
    stage: bigint;
}

export function storeStageManage(src: StageManage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1504448527, 32);
        b_0.storeUint(src.id, 64);
        b_0.storeUint(src.stage, 8);
    };
}

export function loadStageManage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1504448527) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadUintBig(64);
    let _stage = sc_0.loadUintBig(8);
    return { $$type: 'StageManage' as const, id: _id, stage: _stage };
}

function loadTupleStageManage(source: TupleReader) {
    let _id = source.readBigNumber();
    let _stage = source.readBigNumber();
    return { $$type: 'StageManage' as const, id: _id, stage: _stage };
}

function loadGetterTupleStageManage(source: TupleReader) {
    let _id = source.readBigNumber();
    let _stage = source.readBigNumber();
    return { $$type: 'StageManage' as const, id: _id, stage: _stage };
}

function storeTupleStageManage(source: StageManage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.stage);
    return builder.build();
}

function dictValueParserStageManage(): DictionaryValue<StageManage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStageManage(src)).endCell());
        },
        parse: (src) => {
            return loadStageManage(src.loadRef().beginParse());
        }
    }
}

export type ActiveManage = {
    $$type: 'ActiveManage';
    active: boolean;
    id: bigint;
}

export function storeActiveManage(src: ActiveManage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1639986858, 32);
        b_0.storeBit(src.active);
        b_0.storeUint(src.id, 64);
    };
}

export function loadActiveManage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1639986858) { throw Error('Invalid prefix'); }
    let _active = sc_0.loadBit();
    let _id = sc_0.loadUintBig(64);
    return { $$type: 'ActiveManage' as const, active: _active, id: _id };
}

function loadTupleActiveManage(source: TupleReader) {
    let _active = source.readBoolean();
    let _id = source.readBigNumber();
    return { $$type: 'ActiveManage' as const, active: _active, id: _id };
}

function loadGetterTupleActiveManage(source: TupleReader) {
    let _active = source.readBoolean();
    let _id = source.readBigNumber();
    return { $$type: 'ActiveManage' as const, active: _active, id: _id };
}

function storeTupleActiveManage(source: ActiveManage) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserActiveManage(): DictionaryValue<ActiveManage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeActiveManage(src)).endCell());
        },
        parse: (src) => {
            return loadActiveManage(src.loadRef().beginParse());
        }
    }
}

export type CreateProject = {
    $$type: 'CreateProject';
    data: Data;
    required: bigint;
    percents: Dictionary<bigint, bigint>;
    owner: Address;
}

export function storeCreateProject(src: CreateProject) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1719684186, 32);
        let b_1 = new Builder();
        b_1.store(storeData(src.data));
        b_1.storeCoins(src.required);
        b_1.storeDict(src.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_1.storeAddress(src.owner);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateProject(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1719684186) { throw Error('Invalid prefix'); }
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = loadData(sc_1);
    let _required = sc_1.loadCoins();
    let _percents = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    let _owner = sc_1.loadAddress();
    return { $$type: 'CreateProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function loadTupleCreateProject(source: TupleReader) {
    const _data = loadTupleData(source);
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _owner = source.readAddress();
    return { $$type: 'CreateProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function loadGetterTupleCreateProject(source: TupleReader) {
    const _data = loadGetterTupleData(source);
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _owner = source.readAddress();
    return { $$type: 'CreateProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function storeTupleCreateProject(source: CreateProject) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleData(source.data));
    builder.writeNumber(source.required);
    builder.writeCell(source.percents.size > 0 ? beginCell().storeDictDirect(source.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCreateProject(): DictionaryValue<CreateProject> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateProject(src)).endCell());
        },
        parse: (src) => {
            return loadCreateProject(src.loadRef().beginParse());
        }
    }
}

export type CreateDonation = {
    $$type: 'CreateDonation';
    data: Data;
    owner: Address;
}

export function storeCreateDonation(src: CreateDonation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3989847898, 32);
        b_0.store(storeData(src.data));
        b_0.storeAddress(src.owner);
    };
}

export function loadCreateDonation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3989847898) { throw Error('Invalid prefix'); }
    let _data = loadData(sc_0);
    let _owner = sc_0.loadAddress();
    return { $$type: 'CreateDonation' as const, data: _data, owner: _owner };
}

function loadTupleCreateDonation(source: TupleReader) {
    const _data = loadTupleData(source);
    let _owner = source.readAddress();
    return { $$type: 'CreateDonation' as const, data: _data, owner: _owner };
}

function loadGetterTupleCreateDonation(source: TupleReader) {
    const _data = loadGetterTupleData(source);
    let _owner = source.readAddress();
    return { $$type: 'CreateDonation' as const, data: _data, owner: _owner };
}

function storeTupleCreateDonation(source: CreateDonation) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleData(source.data));
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCreateDonation(): DictionaryValue<CreateDonation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDonation(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDonation(src.loadRef().beginParse());
        }
    }
}

export type DeployProject = {
    $$type: 'DeployProject';
    data: Data;
    required: bigint;
    percents: Dictionary<bigint, bigint>;
    owner: Address;
}

export function storeDeployProject(src: DeployProject) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(11469140, 32);
        let b_1 = new Builder();
        b_1.store(storeData(src.data));
        b_1.storeCoins(src.required);
        b_1.storeDict(src.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_1.storeAddress(src.owner);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployProject(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 11469140) { throw Error('Invalid prefix'); }
    let sc_1 = sc_0.loadRef().beginParse();
    let _data = loadData(sc_1);
    let _required = sc_1.loadCoins();
    let _percents = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_1);
    let _owner = sc_1.loadAddress();
    return { $$type: 'DeployProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function loadTupleDeployProject(source: TupleReader) {
    const _data = loadTupleData(source);
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _owner = source.readAddress();
    return { $$type: 'DeployProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function loadGetterTupleDeployProject(source: TupleReader) {
    const _data = loadGetterTupleData(source);
    let _required = source.readBigNumber();
    let _percents = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _owner = source.readAddress();
    return { $$type: 'DeployProject' as const, data: _data, required: _required, percents: _percents, owner: _owner };
}

function storeTupleDeployProject(source: DeployProject) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleData(source.data));
    builder.writeNumber(source.required);
    builder.writeCell(source.percents.size > 0 ? beginCell().storeDictDirect(source.percents, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserDeployProject(): DictionaryValue<DeployProject> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployProject(src)).endCell());
        },
        parse: (src) => {
            return loadDeployProject(src.loadRef().beginParse());
        }
    }
}

export type StageChanged = {
    $$type: 'StageChanged';
    stage: bigint;
}

export function storeStageChanged(src: StageChanged) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2731741061, 32);
        b_0.storeUint(src.stage, 8);
    };
}

export function loadStageChanged(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2731741061) { throw Error('Invalid prefix'); }
    let _stage = sc_0.loadUintBig(8);
    return { $$type: 'StageChanged' as const, stage: _stage };
}

function loadTupleStageChanged(source: TupleReader) {
    let _stage = source.readBigNumber();
    return { $$type: 'StageChanged' as const, stage: _stage };
}

function loadGetterTupleStageChanged(source: TupleReader) {
    let _stage = source.readBigNumber();
    return { $$type: 'StageChanged' as const, stage: _stage };
}

function storeTupleStageChanged(source: StageChanged) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.stage);
    return builder.build();
}

function dictValueParserStageChanged(): DictionaryValue<StageChanged> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStageChanged(src)).endCell());
        },
        parse: (src) => {
            return loadStageChanged(src.loadRef().beginParse());
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

export type ChangeStage = {
    $$type: 'ChangeStage';
    stage: bigint;
}

export function storeChangeStage(src: ChangeStage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(581252563, 32);
        b_0.storeUint(src.stage, 8);
    };
}

export function loadChangeStage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 581252563) { throw Error('Invalid prefix'); }
    let _stage = sc_0.loadUintBig(8);
    return { $$type: 'ChangeStage' as const, stage: _stage };
}

function loadTupleChangeStage(source: TupleReader) {
    let _stage = source.readBigNumber();
    return { $$type: 'ChangeStage' as const, stage: _stage };
}

function loadGetterTupleChangeStage(source: TupleReader) {
    let _stage = source.readBigNumber();
    return { $$type: 'ChangeStage' as const, stage: _stage };
}

function storeTupleChangeStage(source: ChangeStage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.stage);
    return builder.build();
}

function dictValueParserChangeStage(): DictionaryValue<ChangeStage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeStage(src)).endCell());
        },
        parse: (src) => {
            return loadChangeStage(src.loadRef().beginParse());
        }
    }
}

export type OwnerWithdraw = {
    $$type: 'OwnerWithdraw';
    amount: bigint;
}

export function storeOwnerWithdraw(src: OwnerWithdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4050357351, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadOwnerWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4050357351) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'OwnerWithdraw' as const, amount: _amount };
}

function loadTupleOwnerWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'OwnerWithdraw' as const, amount: _amount };
}

function loadGetterTupleOwnerWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'OwnerWithdraw' as const, amount: _amount };
}

function storeTupleOwnerWithdraw(source: OwnerWithdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserOwnerWithdraw(): DictionaryValue<OwnerWithdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdraw(src.loadRef().beginParse());
        }
    }
}

export type AddIncome = {
    $$type: 'AddIncome';
    ownerPie: boolean;
    amount: bigint;
}

export function storeAddIncome(src: AddIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(940962217, 32);
        b_0.storeBit(src.ownerPie);
        b_0.storeCoins(src.amount);
    };
}

export function loadAddIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 940962217) { throw Error('Invalid prefix'); }
    let _ownerPie = sc_0.loadBit();
    let _amount = sc_0.loadCoins();
    return { $$type: 'AddIncome' as const, ownerPie: _ownerPie, amount: _amount };
}

function loadTupleAddIncome(source: TupleReader) {
    let _ownerPie = source.readBoolean();
    let _amount = source.readBigNumber();
    return { $$type: 'AddIncome' as const, ownerPie: _ownerPie, amount: _amount };
}

function loadGetterTupleAddIncome(source: TupleReader) {
    let _ownerPie = source.readBoolean();
    let _amount = source.readBigNumber();
    return { $$type: 'AddIncome' as const, ownerPie: _ownerPie, amount: _amount };
}

function storeTupleAddIncome(source: AddIncome) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.ownerPie);
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

export type Validate = {
    $$type: 'Validate';
    sender: Address;
    amount: bigint;
    wallet: Address;
}

export function storeValidate(src: Validate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1488651829, 32);
        b_0.storeAddress(src.sender);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.wallet);
    };
}

export function loadValidate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1488651829) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _wallet = sc_0.loadAddress();
    return { $$type: 'Validate' as const, sender: _sender, amount: _amount, wallet: _wallet };
}

function loadTupleValidate(source: TupleReader) {
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    let _wallet = source.readAddress();
    return { $$type: 'Validate' as const, sender: _sender, amount: _amount, wallet: _wallet };
}

function loadGetterTupleValidate(source: TupleReader) {
    let _sender = source.readAddress();
    let _amount = source.readBigNumber();
    let _wallet = source.readAddress();
    return { $$type: 'Validate' as const, sender: _sender, amount: _amount, wallet: _wallet };
}

function storeTupleValidate(source: Validate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.wallet);
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

export type Invest = {
    $$type: 'Invest';
    amount: bigint;
}

export function storeInvest(src: Invest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3962699447, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadInvest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3962699447) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Invest' as const, amount: _amount };
}

function loadTupleInvest(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Invest' as const, amount: _amount };
}

function loadGetterTupleInvest(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Invest' as const, amount: _amount };
}

function storeTupleInvest(source: Invest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserInvest(): DictionaryValue<Invest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInvest(src)).endCell());
        },
        parse: (src) => {
            return loadInvest(src.loadRef().beginParse());
        }
    }
}

export type ProjectData = {
    $$type: 'ProjectData';
    voted: bigint;
    invested: bigint;
    required: bigint;
    withdrawn: bigint;
    income: bigint;
    owner: Address;
    id: bigint;
    stage: bigint;
    data: Data;
}

export function storeProjectData(src: ProjectData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.voted);
        b_0.storeCoins(src.invested);
        b_0.storeCoins(src.required);
        b_0.storeCoins(src.withdrawn);
        b_0.storeCoins(src.income);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.id, 64);
        b_0.storeUint(src.stage, 8);
        b_0.store(storeData(src.data));
    };
}

export function loadProjectData(slice: Slice) {
    let sc_0 = slice;
    let _voted = sc_0.loadCoins();
    let _invested = sc_0.loadCoins();
    let _required = sc_0.loadCoins();
    let _withdrawn = sc_0.loadCoins();
    let _income = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(64);
    let _stage = sc_0.loadUintBig(8);
    let _data = loadData(sc_0);
    return { $$type: 'ProjectData' as const, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, owner: _owner, id: _id, stage: _stage, data: _data };
}

function loadTupleProjectData(source: TupleReader) {
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _required = source.readBigNumber();
    let _withdrawn = source.readBigNumber();
    let _income = source.readBigNumber();
    let _owner = source.readAddress();
    let _id = source.readBigNumber();
    let _stage = source.readBigNumber();
    const _data = loadTupleData(source);
    return { $$type: 'ProjectData' as const, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, owner: _owner, id: _id, stage: _stage, data: _data };
}

function loadGetterTupleProjectData(source: TupleReader) {
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _required = source.readBigNumber();
    let _withdrawn = source.readBigNumber();
    let _income = source.readBigNumber();
    let _owner = source.readAddress();
    let _id = source.readBigNumber();
    let _stage = source.readBigNumber();
    const _data = loadGetterTupleData(source);
    return { $$type: 'ProjectData' as const, voted: _voted, invested: _invested, required: _required, withdrawn: _withdrawn, income: _income, owner: _owner, id: _id, stage: _stage, data: _data };
}

function storeTupleProjectData(source: ProjectData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.voted);
    builder.writeNumber(source.invested);
    builder.writeNumber(source.required);
    builder.writeNumber(source.withdrawn);
    builder.writeNumber(source.income);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.id);
    builder.writeNumber(source.stage);
    builder.writeTuple(storeTupleData(source.data));
    return builder.build();
}

function dictValueParserProjectData(): DictionaryValue<ProjectData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProjectData(src)).endCell());
        },
        parse: (src) => {
            return loadProjectData(src.loadRef().beginParse());
        }
    }
}

export type Invested = {
    $$type: 'Invested';
    amount: bigint;
    from: Address;
}

export function storeInvested(src: Invested) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2469875973, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
    };
}

export function loadInvested(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2469875973) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'Invested' as const, amount: _amount, from: _from };
}

function loadTupleInvested(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Invested' as const, amount: _amount, from: _from };
}

function loadGetterTupleInvested(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Invested' as const, amount: _amount, from: _from };
}

function storeTupleInvested(source: Invested) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserInvested(): DictionaryValue<Invested> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInvested(src)).endCell());
        },
        parse: (src) => {
            return loadInvested(src.loadRef().beginParse());
        }
    }
}

export type Voted = {
    $$type: 'Voted';
    amount: bigint;
    from: Address;
}

export function storeVoted(src: Voted) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(870400834, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
    };
}

export function loadVoted(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 870400834) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'Voted' as const, amount: _amount, from: _from };
}

function loadTupleVoted(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Voted' as const, amount: _amount, from: _from };
}

function loadGetterTupleVoted(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Voted' as const, amount: _amount, from: _from };
}

function storeTupleVoted(source: Voted) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserVoted(): DictionaryValue<Voted> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVoted(src)).endCell());
        },
        parse: (src) => {
            return loadVoted(src.loadRef().beginParse());
        }
    }
}

export type Withdrawn = {
    $$type: 'Withdrawn';
    amount: bigint;
    from: Address;
}

export function storeWithdrawn(src: Withdrawn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1165006918, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
    };
}

export function loadWithdrawn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1165006918) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'Withdrawn' as const, amount: _amount, from: _from };
}

function loadTupleWithdrawn(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Withdrawn' as const, amount: _amount, from: _from };
}

function loadGetterTupleWithdrawn(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'Withdrawn' as const, amount: _amount, from: _from };
}

function storeTupleWithdrawn(source: Withdrawn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserWithdrawn(): DictionaryValue<Withdrawn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawn(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawn(src.loadRef().beginParse());
        }
    }
}

export type AddInvest = {
    $$type: 'AddInvest';
    invested: bigint;
    voted: bigint;
}

export function storeAddInvest(src: AddInvest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3481252563, 32);
        b_0.storeCoins(src.invested);
        b_0.storeCoins(src.voted);
    };
}

export function loadAddInvest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3481252563) { throw Error('Invalid prefix'); }
    let _invested = sc_0.loadCoins();
    let _voted = sc_0.loadCoins();
    return { $$type: 'AddInvest' as const, invested: _invested, voted: _voted };
}

function loadTupleAddInvest(source: TupleReader) {
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    return { $$type: 'AddInvest' as const, invested: _invested, voted: _voted };
}

function loadGetterTupleAddInvest(source: TupleReader) {
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    return { $$type: 'AddInvest' as const, invested: _invested, voted: _voted };
}

function storeTupleAddInvest(source: AddInvest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.invested);
    builder.writeNumber(source.voted);
    return builder.build();
}

function dictValueParserAddInvest(): DictionaryValue<AddInvest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddInvest(src)).endCell());
        },
        parse: (src) => {
            return loadAddInvest(src.loadRef().beginParse());
        }
    }
}

export type IncomeAdded = {
    $$type: 'IncomeAdded';
    amount: bigint;
    from: Address;
}

export function storeIncomeAdded(src: IncomeAdded) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(666248598, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
    };
}

export function loadIncomeAdded(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 666248598) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    return { $$type: 'IncomeAdded' as const, amount: _amount, from: _from };
}

function loadTupleIncomeAdded(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'IncomeAdded' as const, amount: _amount, from: _from };
}

function loadGetterTupleIncomeAdded(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    return { $$type: 'IncomeAdded' as const, amount: _amount, from: _from };
}

function storeTupleIncomeAdded(source: IncomeAdded) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserIncomeAdded(): DictionaryValue<IncomeAdded> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIncomeAdded(src)).endCell());
        },
        parse: (src) => {
            return loadIncomeAdded(src.loadRef().beginParse());
        }
    }
}

export type UserWithdraw = {
    $$type: 'UserWithdraw';
    from: Address;
    withdrawnAt: bigint;
    voted: bigint;
    invested: bigint;
}

export function storeUserWithdraw(src: UserWithdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(927497335, 32);
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.withdrawnAt);
        b_0.storeCoins(src.voted);
        b_0.storeCoins(src.invested);
    };
}

export function loadUserWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 927497335) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _withdrawnAt = sc_0.loadCoins();
    let _voted = sc_0.loadCoins();
    let _invested = sc_0.loadCoins();
    return { $$type: 'UserWithdraw' as const, from: _from, withdrawnAt: _withdrawnAt, voted: _voted, invested: _invested };
}

function loadTupleUserWithdraw(source: TupleReader) {
    let _from = source.readAddress();
    let _withdrawnAt = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    return { $$type: 'UserWithdraw' as const, from: _from, withdrawnAt: _withdrawnAt, voted: _voted, invested: _invested };
}

function loadGetterTupleUserWithdraw(source: TupleReader) {
    let _from = source.readAddress();
    let _withdrawnAt = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _invested = source.readBigNumber();
    return { $$type: 'UserWithdraw' as const, from: _from, withdrawnAt: _withdrawnAt, voted: _voted, invested: _invested };
}

function storeTupleUserWithdraw(source: UserWithdraw) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.withdrawnAt);
    builder.writeNumber(source.voted);
    builder.writeNumber(source.invested);
    return builder.build();
}

function dictValueParserUserWithdraw(): DictionaryValue<UserWithdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadUserWithdraw(src.loadRef().beginParse());
        }
    }
}

export type GetIncome = {
    $$type: 'GetIncome';
    income: bigint;
    withdrawnAt: bigint;
}

export function storeGetIncome(src: GetIncome) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(98224296, 32);
        b_0.storeCoins(src.income);
        b_0.storeCoins(src.withdrawnAt);
    };
}

export function loadGetIncome(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 98224296) { throw Error('Invalid prefix'); }
    let _income = sc_0.loadCoins();
    let _withdrawnAt = sc_0.loadCoins();
    return { $$type: 'GetIncome' as const, income: _income, withdrawnAt: _withdrawnAt };
}

function loadTupleGetIncome(source: TupleReader) {
    let _income = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    return { $$type: 'GetIncome' as const, income: _income, withdrawnAt: _withdrawnAt };
}

function loadGetterTupleGetIncome(source: TupleReader) {
    let _income = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    return { $$type: 'GetIncome' as const, income: _income, withdrawnAt: _withdrawnAt };
}

function storeTupleGetIncome(source: GetIncome) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.income);
    builder.writeNumber(source.withdrawnAt);
    return builder.build();
}

function dictValueParserGetIncome(): DictionaryValue<GetIncome> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetIncome(src)).endCell());
        },
        parse: (src) => {
            return loadGetIncome(src.loadRef().beginParse());
        }
    }
}

export type UserInfo = {
    $$type: 'UserInfo';
    totalIncome: bigint;
    invested: bigint;
    voted: bigint;
    withdrawnAt: bigint;
    owner: Address;
    projectId: bigint;
}

export function storeUserInfo(src: UserInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.totalIncome);
        b_0.storeCoins(src.invested);
        b_0.storeCoins(src.voted);
        b_0.storeCoins(src.withdrawnAt);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.projectId, 64);
    };
}

export function loadUserInfo(slice: Slice) {
    let sc_0 = slice;
    let _totalIncome = sc_0.loadCoins();
    let _invested = sc_0.loadCoins();
    let _voted = sc_0.loadCoins();
    let _withdrawnAt = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _projectId = sc_0.loadUintBig(64);
    return { $$type: 'UserInfo' as const, totalIncome: _totalIncome, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, owner: _owner, projectId: _projectId };
}

function loadTupleUserInfo(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    return { $$type: 'UserInfo' as const, totalIncome: _totalIncome, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, owner: _owner, projectId: _projectId };
}

function loadGetterTupleUserInfo(source: TupleReader) {
    let _totalIncome = source.readBigNumber();
    let _invested = source.readBigNumber();
    let _voted = source.readBigNumber();
    let _withdrawnAt = source.readBigNumber();
    let _owner = source.readAddress();
    let _projectId = source.readBigNumber();
    return { $$type: 'UserInfo' as const, totalIncome: _totalIncome, invested: _invested, voted: _voted, withdrawnAt: _withdrawnAt, owner: _owner, projectId: _projectId };
}

function storeTupleUserInfo(source: UserInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalIncome);
    builder.writeNumber(source.invested);
    builder.writeNumber(source.voted);
    builder.writeNumber(source.withdrawnAt);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.projectId);
    return builder.build();
}

function dictValueParserUserInfo(): DictionaryValue<UserInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserInfo(src)).endCell());
        },
        parse: (src) => {
            return loadUserInfo(src.loadRef().beginParse());
        }
    }
}

export type ProjectsDeployer$Data = {
    $$type: 'ProjectsDeployer$Data';
    projectId: bigint;
    donationId: bigint;
    owner: Address;
    active: boolean;
    projectPrice: bigint;
}

export function storeProjectsDeployer$Data(src: ProjectsDeployer$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.projectId, 64);
        b_0.storeUint(src.donationId, 64);
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.active);
        b_0.storeCoins(src.projectPrice);
    };
}

export function loadProjectsDeployer$Data(slice: Slice) {
    let sc_0 = slice;
    let _projectId = sc_0.loadUintBig(64);
    let _donationId = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _active = sc_0.loadBit();
    let _projectPrice = sc_0.loadCoins();
    return { $$type: 'ProjectsDeployer$Data' as const, projectId: _projectId, donationId: _donationId, owner: _owner, active: _active, projectPrice: _projectPrice };
}

function loadTupleProjectsDeployer$Data(source: TupleReader) {
    let _projectId = source.readBigNumber();
    let _donationId = source.readBigNumber();
    let _owner = source.readAddress();
    let _active = source.readBoolean();
    let _projectPrice = source.readBigNumber();
    return { $$type: 'ProjectsDeployer$Data' as const, projectId: _projectId, donationId: _donationId, owner: _owner, active: _active, projectPrice: _projectPrice };
}

function loadGetterTupleProjectsDeployer$Data(source: TupleReader) {
    let _projectId = source.readBigNumber();
    let _donationId = source.readBigNumber();
    let _owner = source.readAddress();
    let _active = source.readBoolean();
    let _projectPrice = source.readBigNumber();
    return { $$type: 'ProjectsDeployer$Data' as const, projectId: _projectId, donationId: _donationId, owner: _owner, active: _active, projectPrice: _projectPrice };
}

function storeTupleProjectsDeployer$Data(source: ProjectsDeployer$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.projectId);
    builder.writeNumber(source.donationId);
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.active);
    builder.writeNumber(source.projectPrice);
    return builder.build();
}

function dictValueParserProjectsDeployer$Data(): DictionaryValue<ProjectsDeployer$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProjectsDeployer$Data(src)).endCell());
        },
        parse: (src) => {
            return loadProjectsDeployer$Data(src.loadRef().beginParse());
        }
    }
}

 type Project_init_args = {
    $$type: 'Project_init_args';
    deployer: Address;
    id: bigint;
}

function initProject_init_args(src: Project_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.deployer);
        b_0.storeInt(src.id, 257);
    };
}

async function Project_init(deployer: Address, id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProject_init_args({ $$type: 'Project_init_args', deployer, id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Project_errors: { [key: number]: { message: string } } = {
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
    6959: { message: `Not enough income` },
    18451: { message: `Wrong amount` },
    44024: { message: `Invalid percents` },
    44871: { message: `Wrong stage` },
    48540: { message: `Not enough tons` },
    56837: { message: `Not an owner` },
    57005: { message: `Not a deployer` },
    61530: { message: `Not active` },
    61739: { message: `Wrong sender` },
}

const Project_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Project$Data","header":null,"fields":[{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"required","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"income","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"percents","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"DonationData","header":null,"fields":[{"name":"donated","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}}]},
    {"name":"DeployDonation","header":4017052970,"fields":[{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Donate","header":1091855686,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DonationEvent","header":310130085,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Donation$Data","header":null,"fields":[{"name":"donated","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"UserData$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"projectId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"totalIncome","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DeployerData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"projectId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"donationId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"projectPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Data","header":null,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"link","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewProject","header":1463093253,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"required","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percents","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"NewDonation","header":3359593827,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}}]},
    {"name":"ChangeOwner","header":2242002949,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeActive","header":1103353291,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangePrice","header":3582265868,"fields":[{"name":"projectPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Withdraw","header":1239257369,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"StageManage","header":1504448527,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ActiveManage","header":1639986858,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateProject","header":1719684186,"fields":[{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"required","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percents","type":{"kind":"dict","key":"int","value":"int"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateDonation","header":3989847898,"fields":[{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployProject","header":11469140,"fields":[{"name":"data","type":{"kind":"simple","type":"Data","optional":false}},{"name":"required","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percents","type":{"kind":"dict","key":"int","value":"int"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StageChanged","header":2731741061,"fields":[{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"CheckWallet","header":2217665637,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeStage","header":581252563,"fields":[{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"OwnerWithdraw","header":4050357351,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AddIncome","header":940962217,"fields":[{"name":"ownerPie","type":{"kind":"simple","type":"bool","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Validate","header":1488651829,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddVots","header":3970053455,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MintVots","header":2849257298,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Invest","header":3962699447,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ProjectData","header":null,"fields":[{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"required","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawn","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"income","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"data","type":{"kind":"simple","type":"Data","optional":false}}]},
    {"name":"Invested","header":2469875973,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Voted","header":870400834,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdrawn","header":1165006918,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddInvest","header":3481252563,"fields":[{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"IncomeAdded","header":666248598,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserWithdraw","header":927497335,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"withdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GetIncome","header":98224296,"fields":[{"name":"income","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UserInfo","header":null,"fields":[{"name":"totalIncome","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"invested","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"voted","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdrawnAt","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"projectId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ProjectsDeployer$Data","header":null,"fields":[{"name":"projectId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"donationId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"projectPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const Project_getters: ABIGetter[] = [
    {"name":"projectData","arguments":[],"returnType":{"kind":"simple","type":"ProjectData","optional":false}},
    {"name":"userData","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Project_getterMapping: { [key: string]: string } = {
    'projectData': 'getProjectData',
    'userData': 'getUserData',
}

const Project_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployProject"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeStage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnerWithdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddIncome"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Validate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Invest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UserWithdraw"}},
]

export class Project implements Contract {
    
    static async init(deployer: Address, id: bigint) {
        return await Project_init(deployer, id);
    }
    
    static async fromInit(deployer: Address, id: bigint) {
        const init = await Project_init(deployer, id);
        const address = contractAddress(0, init);
        return new Project(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Project(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Project_types,
        getters: Project_getters,
        receivers: Project_receivers,
        errors: Project_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | DeployProject | ChangeStage | OwnerWithdraw | AddIncome | TransferNotification | Validate | Invest | UserWithdraw) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployProject') {
            body = beginCell().store(storeDeployProject(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeStage') {
            body = beginCell().store(storeChangeStage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnerWithdraw') {
            body = beginCell().store(storeOwnerWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddIncome') {
            body = beginCell().store(storeAddIncome(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferNotification') {
            body = beginCell().store(storeTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Validate') {
            body = beginCell().store(storeValidate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Invest') {
            body = beginCell().store(storeInvest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UserWithdraw') {
            body = beginCell().store(storeUserWithdraw(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getProjectData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('projectData', builder.build())).stack;
        const result = loadGetterTupleProjectData(source);
        return result;
    }
    
    async getUserData(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('userData', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}