'use strict'

export interface KoconutYieldable<DataType> {
    yield() : Promise<DataType | null>
}

export interface KoconutOpener<DataType> {
    setPrevYieldable(prevYieldable : KoconutYieldable<any>) : KoconutOpener<DataType>
    setProcessor(processor : () => Promise<DataType> | DataType) : KoconutOpener<DataType>
}

export class KoconutPrimitive<DataType> implements KoconutYieldable<DataType> {
    
    data : DataType | null
    prevYieldable? : KoconutYieldable<any>
    processor? : () => Promise<DataType>

    protected setPrevYieldable(prevYieldable : KoconutYieldable<any>) : KoconutOpener<DataType> {
        this.prevYieldable = prevYieldable
        return this as any as KoconutOpener<DataType>
    }
    protected setProcessor(processor : () => Promise<DataType>) : KoconutOpener<DataType> { 
        this.processor = processor
        return this as any as KoconutOpener<DataType>
    }

    constructor(data : DataType | null = null) { this.data = data }

    async process() : Promise<void> {
        if(this.prevYieldable != null) this.data = await this.prevYieldable.yield()
        if(this.processor != null) this.data = await this.processor()
        this.prevYieldable = undefined
        this.processor = undefined
    }

    async yield() : Promise<DataType | null> {
        await this.process()
        return this.data
    }

    async let<ReturnType>(block : (data : DataType | null) => ReturnType | Promise<ReturnType>) : Promise<ReturnType>{
        return await block(await this.yield())
    }
    
    async apply(block : (this : DataType | null) => void | Promise<void>) : Promise<DataType | null> {
        await block.call(await this.yield())
        return this.data
    }

    async run<ReturnType>(block : (this : DataType | null) => ReturnType | Promise<ReturnType>) : Promise<ReturnType> {
        return await block.call(await this.yield())
    }

    async also(block : (data : DataType | null) => void | Promise<void>) : Promise<DataType | null> {
        await block(await this.yield())
        return this.data
    }

}

export class Pair<FirstType, SecondType> {
    private firstElement : FirstType
    private secondElement : SecondType
    constructor(firstElement : FirstType, secondElement : SecondType) {
        this.firstElement = firstElement
        this.secondElement = secondElement
    }
    get first() : FirstType { return this.firstElement }
    get second() : SecondType { return this.secondElement }
    toString() : string { return JSON.stringify({first : this.first, second : this.second}) }
    toArray() : Array<FirstType | SecondType> { return [this.first, this.second] }
    toEntry() : Entry<FirstType, SecondType> { return new Entry(this.first, this.second)}
}

export class KoconutPair<FirstType, SecondType> extends KoconutPrimitive<Pair<FirstType, SecondType>> {
    constructor(frist : FirstType | null = null, second : SecondType | null = null) {
        if(frist != null && second != null) super(new Pair(frist, second))
        else super()
    }
}

export class Entry<KeyType, ValueType> {
    protected keyElement : KeyType
    protected valueElement : ValueType
    constructor(keyElement : KeyType, valueElement : ValueType) {
        this.keyElement = keyElement
        this.valueElement = valueElement
    }
    get key() : KeyType { return this.keyElement }
    get value() : ValueType { return this.valueElement }
    toString() : string { return this.toPair().toString() }
    toArray() : Array<KeyType | ValueType> { return this.toPair().toArray() }
    toPair() : Pair<KeyType, ValueType> { return new Pair(this.key, this.value) }
}

export class KoconutEntry<KeyType, ValueType> extends KoconutPrimitive<Entry<KeyType, ValueType>> {

}

export class MutableEntry<KeyType, ValueType> extends Entry<KeyType, ValueType> {
    set key(key : KeyType) { this.keyElement = key }
    set value(value : ValueType) { this.valueElement = value}
}

export class KoconutMutableEntry<KeyType, ValueType> extends KoconutPrimitive<MutableEntry<KeyType, ValueType>> {

}

// 이 부분 나중에 추가로 처리해야함...
export const TypeChecker = {
    checkIsComparable : function(target : any) : target is Comparable {
        if(target && target.compareTo && typeof(target.compareTo) === 'function') return true
        else return false
    }
} 

export interface Comparable {
    compareTo(other : Comparable) : number
}

export const enum LoopSignal {
    CONTINUE, BREAK
}