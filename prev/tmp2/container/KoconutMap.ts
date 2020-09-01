`use strict`

import {
KoconutPrimitive, Entry, KoconutOpener, Pair, KoconutPair, /* KoconutTypeChecker, */
KoconutSet, KoconutArray,
KoconutNoSuchElementException, KoconutIndexOutOfBoundsException,
/* KoconutComparable */} from "../../internal"

export class KoconutMap<KeyType, ValueType> extends KoconutPrimitive<Map<KeyType, ValueType>> implements Iterable<Entry<KeyType, ValueType>>{
    

    /* Iterable */
    [Symbol.iterator]() : Iterator<Entry<KeyType, ValueType>> {
        return this.mEntries[Symbol.iterator]()
    }

    /* Map */

    /* Properties */
    private mKeys = new Set<KeyType>()
    private mEntries = new Set<Entry<KeyType, ValueType>>()
    private mValues = new Array<ValueType>() 
    private mSize = 0
    constructor(data : Map<KeyType, ValueType> | null = null) { 
        super(data)
        if(data != null) {
            for(const [key, value] of data.entries()) {
                this.mKeys.add(key)
                this.mEntries.add(new Entry(key, value))
                this.mValues.push(value)
            }
            this.mSize = data.size
        }
    }

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
        thisArg : any
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
        thisArg : any
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
            .setProcessor(async () => this.mKeys.has(key))
        return koconutToReturn

    }


    containsKey(
        key : KeyType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mKeys.has(key))
        return koconutToReturn

    }


    containsValue(
        value : ValueType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mValues.includes(value))
        return koconutToReturn

    }


    count(
        predicate : ((entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(predicate) {
                    let count = 0
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry)) count++
                    return count
                } else return this.mValues.length
            })
        return koconutToReturn

    }


    filter(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }
    

    filterKeys(
        predicate : (key : KeyType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>();
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry.key))
                            processedMap.set(eachEntry.key, eachEntry.value)
                } 
                return processedMap
            })
        return koconutToReturn

    }


    filterNot(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(!await predicate(eachEntry))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    filterNotTo(
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(!await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterTo(
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterValues(
        predicate : (value : ValueType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry.value))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    flatMap<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        for(const eachResultData of await transform(eachEntry)) 
                            processedArray.push(eachResultData)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(thisArg)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        for(const eachResultData of await transform(eachEntry))
                            if(destination instanceof Array) destination.push(eachResultData)
                            else destination.add(eachResultData)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    forEach(
        action : (entry : Entry<KeyType, ValueType>) => boolean | void | Promise<boolean | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await action(eachEntry) == false) break
                }
            })
        return koconutToReturn

    }


    get(
        key : KeyType
    ) : KoconutPrimitive<ValueType | null> {

        const koconutToReturn = new KoconutPrimitive<ValueType | null>();
        (koconutToReturn as any as KoconutOpener<ValueType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || !this.data.has(key)) return null
                const dataToReturn = this.data.get(key)
                if(dataToReturn == undefined) return null
                return dataToReturn
            })
        return koconutToReturn

    }


    getOrDefault(
        key : KeyType,
        defaultValue : ValueType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || !this.data.has(key)) return defaultValue
                else return this.data.get(key)!
            })
        return koconutToReturn

    }


    // getOrElse


    getValue(
        key : KeyType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || !this.data.has(key)) throw new KoconutNoSuchElementException(`Cannot find element with given key : ${key}`)
                const dataToReturn = this.data.get(key)
                if(dataToReturn == undefined) throw new KoconutNoSuchElementException(`Cannot find element with given key : ${key}`)
                return dataToReturn
            })
        return koconutToReturn

    }


    isEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize == 0)
        return koconutToReturn

    }


    isNotEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize != 0)
        return koconutToReturn

    }


    isNullOrEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data == null || this.mSize == 0)
        return koconutToReturn

    }


    map<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedArray.push(await transform(eachEntry))
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapKeys<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<ResultDataType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<ResultDataType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<ResultDataType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<ResultDataType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedMap.set(await transform(eachEntry), eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    mapKeysTo<ResultDataType>(
        destination : Map<ResultDataType, ValueType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        destination.set(await transform(eachEntry), eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapNotNull<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(dataToAdd != null) processedArray.push(dataToAdd)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }
    

    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(dataToAdd != null)
                            if(destination instanceof Array) destination.push(dataToAdd)
                            else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(destination instanceof Array) destination.push(dataToAdd)
                        else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapVaues<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn= new KoconutMap<KeyType, ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        processedMap.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    mapValuesTo<ResultDataType>(
        destination : Map<KeyType, ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        destination.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    /*
    maxByOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<Entry<KeyType, ValueType> | null>{

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<Entry<KeyType, ValueType> | null>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : Entry<KeyType, ValueType> | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatum == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as KoconutComparable).compareTo(lastComparableDatum as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum) {
                            dataToReturn = eachEntry
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn
  
    }
    */


    /*
    maxOf(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>
    ) : KoconutPrimitive<number>;
    maxOf(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    maxOf(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>
    ) : KoconutPrimitive<string>;
    maxOf(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>;
    maxOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    maxOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    maxOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as KoconutComparable).compareTo(lastComparableDatumToReturn as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }
    */


    /*
    maxOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>
    ) : KoconutPrimitive<string | null>;
    maxOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>;
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as KoconutComparable).compareTo(lastComparableDatumToReturn as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }
    */


    maxOfWith<SelectedComparableResultType>(
        selector : (entry : Entry<KeyType, ValueType>) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
        comparator : (front : SelectedComparableResultType, rear : SelectedComparableResultType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<SelectedComparableResultType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<SelectedComparableResultType>();
        (koconutToReturn as any as KoconutOpener<SelectedComparableResultType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    maxOfWithOrNull<SelectedComparableResultType>(
        selector : (entry : Entry<KeyType, ValueType>) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
        comparator : (front : SelectedComparableResultType, rear : SelectedComparableResultType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<SelectedComparableResultType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<SelectedComparableResultType | null>();
        (koconutToReturn as any as KoconutOpener<SelectedComparableResultType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    maxWithOrNull(
        comparator : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<Entry<KeyType, ValueType> | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<Entry<KeyType, ValueType> | null>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : Entry<KeyType, ValueType> | null = null
                for(const eachEntry of this.mEntries) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachEntry) < 0)
                        dataToReturn = eachEntry
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    /*
    minByOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<Entry<KeyType, ValueType> | null>{

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<Entry<KeyType, ValueType> | null>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : Entry<KeyType, ValueType> | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatum == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (lastComparableDatum as any as KoconutComparable).compareTo(eachComparableDatum as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum) {
                            dataToReturn = eachEntry
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn
  
    }
    */


    /*
    minOf(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>
    ) : KoconutPrimitive<string>;
    minOf(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (lastComparableDatumToReturn as any as KoconutComparable).compareTo(eachComparableDatum as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }
    */


    /*
    minOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>
    ) : KoconutPrimitive<string | null>;
    minOfOrNull(
        selector : (entry : Entry<KeyType, ValueType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (entry : Entry<KeyType, ValueType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null
                        || KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (lastComparableDatumToReturn as any as KoconutComparable).compareTo(eachComparableDatum as any as KoconutComparable) > 0
                        || !KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }
    */


    minOfWith<SelectedComparableResultType>(
        selector : (entry : Entry<KeyType, ValueType>) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
        comparator : (front : SelectedComparableResultType, rear : SelectedComparableResultType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<SelectedComparableResultType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<SelectedComparableResultType>();
        (koconutToReturn as any as KoconutOpener<SelectedComparableResultType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    minOfWithOrNull<SelectedComparableResultType>(
        selector : (entry : Entry<KeyType, ValueType>) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
        comparator : (front : SelectedComparableResultType, rear : SelectedComparableResultType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<SelectedComparableResultType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<SelectedComparableResultType | null>();
        (koconutToReturn as any as KoconutOpener<SelectedComparableResultType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const eachEntry of this.mEntries) {
                    const eachComparableDatum = await selector(eachEntry)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    minus(
        key : KeyType
    ) : KoconutMap<KeyType, ValueType>;
    minus(
        keys : Iterable<KeyType>
    ) : KoconutMap<KeyType, ValueType>;
    minus(
        keys : KeyType | Iterable<KeyType>
    ) : KoconutMap<KeyType, ValueType> {

        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>();
                if(this.data != null) {
                    let dataToExcept = new Array<KeyType>()
                    if(typeof (keys as any)[Symbol.iterator] === 'function') dataToExcept = Array.from(keys as Iterable<KeyType>)
                    else dataToExcept.push(keys as KeyType)
                    for(const eachEntry of this.mEntries)
                        if(!dataToExcept.includes(eachEntry.key)) processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    minWithOrNull(
        comparator : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<Entry<KeyType, ValueType> | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<Entry<KeyType, ValueType> | null>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : Entry<KeyType, ValueType> | null = null
                for(const eachEntry of this.mEntries) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachEntry) > 0)
                        dataToReturn = eachEntry
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    none(
        predicate : ((entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return true
                if(predicate) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }


    onEach(
        action : (entry : Entry<KeyType, ValueType>) => boolean | void | Promise<boolean | void>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await action(eachEntry) == false) break
                }
                return this.data!
            })
        return koconutToReturn

    }


    onEachIndexed(
        action : (index : number, entry : Entry<KeyType, ValueType>) => boolean | void | Promise<boolean | void>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachEntry of this.mEntries)
                        if(await action(eachIndex++, eachEntry) == false) break
                }
                return this.data!
            })
        return koconutToReturn

    }


    // orEmpty


    plus(
        pair : KoconutPair<KeyType, ValueType>
    ) : KoconutMap<KeyType, ValueType>;
    plus(
        pairs : KoconutPair<KeyType, ValueType>
    ) : KoconutMap<KeyType, ValueType>;
    plus(
        pairs : KoconutPair<KeyType, ValueType> | Iterable<KoconutPair<KeyType, ValueType>>
    ) : KoconutMap<KeyType, ValueType> {

        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutMap<KeyType, ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = this.data == null ? new Map<KeyType, ValueType>() : new Map(this.data)
                if(this.data != null) {
                    let dataToOverride = new Array<Pair<KeyType, ValueType>>()
                    if(typeof (pairs as any)[Symbol.iterator] === 'function') {
                        for(const eachKoconutPair of pairs as Iterable<KoconutPair<KeyType, ValueType>> ) {
                            const eachPair = await eachKoconutPair.yield()
                            if(eachPair != null) dataToOverride.push(eachPair)
                        }
                    } else {
                        const eachPair = await (pairs as KoconutPair<KeyType, ValueType>).yield()
                        if(eachPair != null) dataToOverride.push(eachPair)
                    }
                    for(const pairToOverride of dataToOverride) 
                        processedMap.set(pairToOverride.first, pairToOverride.second)
                }
                return processedMap
            })
        return koconutToReturn

    }


    //toList
    toArray() : KoconutArray<Pair<KeyType, ValueType>> {

        const koconutToReturn = new KoconutArray<Pair<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Pair<KeyType, ValueType>>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedArray.push(new Pair(eachEntry.key, eachEntry.value))
                }
                return processedArray
            })
        return koconutToReturn

    }

    // toMutableMap
    // toProperties
    // toSortedMap
    // withDefault

}