`use strict`

import {
    KoconutPrimitive, KoconutOpener, KoconutPair, Pair,
    KoconutArray, KoconutSet, KoconutMap,
    KoconutInvalidArgumentException
} from "../../internal"

export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutPrimitive<WrapperType> implements Iterable<DataType>{

    /* Iterable */
    [Symbol.iterator]() : Iterator<DataType> {
        return (this.data as Iterable<DataType>)[Symbol.iterator]()
    }

    /* Properties */
    private mSize = 0
    size() : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }
    private mIndices = new Array<number>()
    indices() : KoconutArray<number> {

        const koconutToReturn = new KoconutArray<number>();
        (koconutToReturn as any as KoconutOpener<Array<number>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mIndices)
        return koconutToReturn

    }
    constructor(data : WrapperType | null = null) {
        super(data)
        if(this.data) {
            this.mSize = Array.from(data as WrapperType).length
            Object
                .keys(Array.from(this.data))
                .map(eachString => parseInt(eachString))
                .forEach(eachIndex => this.mIndices.push(eachIndex))
        }
    }

    /* Funcions */
    all(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(const eachDatum of this.data)
                    if(!await predicate(eachDatum)) return false
                return true
            })
        return koconutToReturn

    }


    any(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                if(predicate) {
                    for(const eachDatum of this.data) 
                        if(await predicate(eachDatum)) return true
                    return false
                } else return Array.from(this.data).length != 0
            })
        return koconutToReturn

    }


    asIterable() : KoconutPrimitive<Iterable<DataType> | null> {

        const koconutToReturn = new KoconutPrimitive<Iterable<DataType> | null>();
        (koconutToReturn as any as KoconutOpener<Iterable<DataType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data == null ? null : Array.from(this.data) as Iterable<DataType>)
        return koconutToReturn

    }


    // asSequence


    associate<KeyType, ValueType>(
        transform : (element : DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Promise<[KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachTransformResult = await transform(eachDatum)
                        if(eachTransformResult instanceof KoconutPair) {
                            const eachPair = await eachTransformResult.yield()
                            if(eachPair != null) processedMap.set(eachPair.first, eachPair.second)
                        } else if(eachTransformResult instanceof Pair) processedMap.set(eachTransformResult.first, eachTransformResult.second)
                        else processedMap.set(eachTransformResult[0], eachTransformResult[1])
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateBy<KeyType, ValueType = DataType> (
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        processedMap.set(eachKey, eachValue as ValueType)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateByTo<KeyType, ValueType = DataType> (
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        destination.set(eachKey, eachValue as ValueType)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Promise<[KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachTransformResult = await transform(eachDatum)
                        if(eachTransformResult instanceof KoconutPair) {
                            const eachPair = await eachTransformResult.yield()
                            if(eachPair != null) destination.set(eachPair.first, eachPair.second)
                        } else if(eachTransformResult instanceof Pair) destination.set(eachTransformResult.first, eachTransformResult.second) 
                        else destination.set(eachTransformResult[0], eachTransformResult[1])
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    associateWith<ValueType>(
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutMap<DataType, ValueType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutMap<DataType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<DataType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<DataType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachValue = await valueSelector(eachDatum)
                        processedMap.set(eachDatum, eachValue)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateWithTo<ValueType>(
        destination : Map<DataType, ValueType>,
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachValue = await valueSelector(eachDatum)
                        destination.set(eachDatum, eachValue)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    chunked(
        size : number
    ) : KoconutArray<Array<DataType>>;
    chunked<ResultDataType>(
        size : number,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    chunked<ResultDataType>(
        size : number,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    chunked<ResultDataType>(
        size : number,
        transform : ((elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Array<DataType> | ResultDataType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Array<DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Array<DataType>>()
                if(this.data != null) {
                    let currentIndex = 0
                    let dataArray = Array.from(this.data)
                    while(currentIndex < dataArray.length) {
                        processedArray.push(dataArray.slice(currentIndex, currentIndex + size))
                        currentIndex += size
                    }
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedIndex in processedArray)
                        transformedArray.push(await transform(processedArray[eachProcessedIndex]))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


    contains(
        element : DataType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(let eachDatum of this.data) if(element == eachDatum) return true
                return false
            })
        return koconutToReturn

    }

    containsAll(
        elements : Iterable<DataType>
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                const dataArray = Array.from(this.data)
                for(const eachElement of elements)
                    if(!dataArray.includes(eachElement))
                        return false
                return true
            })
        return koconutToReturn

    }


    count(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return 0
                const dataArray = Array.from(this.data)
                if(!predicate) return dataArray.length
                let count = 0
                for(const [index, element] of dataArray.entries())
                    if(await predicate(element)) count++
                return count
            })
        return koconutToReturn

    }


    distinct() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set(this.data)
                if(this.data instanceof Array) return Array.from(processedSet) as WrapperType
                else return processedSet as WrapperType
            })
        return koconutToReturn

    }


    distinctBy<KeyType>(
        selector : (element : DataType) => KeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    const keyArray = new Array<KeyType>()
                    for(const [index, element] of this.data.entries()) {
                        const eachKey = await selector(element)
                        if(!keyArray.includes(eachKey)) {
                            keyArray.push(eachKey)
                            processedArray.push(element)
                        }
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    drop(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {
        if(n < 0) throw new KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) processedArray = Array.from(this.data).slice(n)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


}