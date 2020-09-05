`use strict`

import {
    /* Base */
    Entry, KoconutPrimitive, Pair, KoconutOpener, KoconutTypeChecker,

    /* Container */
    KoconutArray, KoconutSet,

    /* Protocol */
    KoconutEquatable
} from "../../internal"

export class KoconutMap<KeyType, ValueType> extends KoconutPrimitive<Map<KeyType, ValueType>> implements Iterable<Entry<KeyType, ValueType>>{

    static from<KeyType, ValueType>(
        source : Map<KeyType, ValueType>
    ) : KoconutMap<KeyType, ValueType> {

        return new KoconutMap(source)

    }

    static of<KeyType, ValueType>(
        ...data : [KeyType, ValueType][] | Pair<KeyType, ValueType>[] | Entry<KeyType, ValueType>[]
    ) : KoconutMap<KeyType, ValueType> {

        const map = new Map<KeyType, ValueType>()
        for(const eachDatum of data) {
            if(eachDatum instanceof Entry) map.set(eachDatum.key, eachDatum.value)
            else if(eachDatum instanceof Pair) map.set(eachDatum.first, eachDatum.second)
            else map.set(eachDatum[0], eachDatum[1])
        }
        return new KoconutMap(map)

    }


    /* Iterable */
    [Symbol.iterator]() : Iterator<Entry<KeyType, ValueType>> {

        return this.mEntries[Symbol.iterator]()
    
    }


    /* Koconut Primitive */
    async validiate(data : Map<KeyType, ValueType> | null) {
    
        if(data != null) {
            for(const [key, value] of data.entries()) {
                this.mKeys.add(key)
                this.mEntries.add(new Entry(key, value))
                this.mValues.push(value)
            }
            this.mSize = data.size
        }

    }


    /* Properties */
    private mKeys = new Set<KeyType>()
    private mEntries = new Set<Entry<KeyType, ValueType>>()
    private mValues = new Array<ValueType>() 
    private mSize = 0


    /* Properties Getter */
    keys() : KoconutSet<KeyType> {

        const koconutToReturn = new KoconutSet<KeyType>();
        (koconutToReturn as any as KoconutOpener<Set<KeyType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mKeys)
        return koconutToReturn

    }


    entries() : KoconutSet<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutSet<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Set<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mEntries)
        return koconutToReturn

    }


    values() : KoconutArray<ValueType> {

        const koconutToReturn = new KoconutArray<ValueType>();
        (koconutToReturn as any as KoconutOpener<Array<ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mValues)
        return koconutToReturn

    }


    size() : KoconutPrimitive<number>{

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }


    /* Functions */
    all(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(!await predicate(eachEntry)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }


    any(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        if(await predicate(eachEntry)) return true
                    }
                }
                return false
            })
        return koconutToReturn

    }


    asIterable() : KoconutPrimitive<Iterable<Entry<KeyType, ValueType>>> {

        const koconutToReturn = new KoconutPrimitive<Iterable<Entry<KeyType, ValueType>>>();
        (koconutToReturn as any as KoconutOpener<Iterable<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return this.mEntries[Symbol.iterator]()
            })
        return koconutToReturn

    }


    // asSequence
    asArray() : KoconutArray<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutArray<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Array<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return Array.from(this.mEntries)
            })
        return koconutToReturn

    }

    contains(
        key : KeyType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                for(let eachKey of this.mKeys) {
                    if((KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey.equalsTo(key as any as KoconutEquatable))
                    || (!KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey == key)) return true
                }
                return false
            })
        return koconutToReturn

    }


}