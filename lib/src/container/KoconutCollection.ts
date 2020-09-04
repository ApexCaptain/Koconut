`use strict`

import {
    /* Bases */
    KoconutPrimitive, KoconutOpener, KoconutPair, Pair, KoconutTypeChecker,

    /* Container */
    KoconutArray, KoconutSet, KoconutMap,

    /* Exception */
    KoconutInvalidArgumentException, KoconutIndexOutOfBoundsException, KoconutNoSuchElementException,

    /* Interface */
    KoconutEquatable
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
                for(let eachDatum of this.data) {
                    if((KoconutTypeChecker.checkIsEquatable(eachDatum) && eachDatum.equalsTo(element as any as KoconutEquatable))
                     || (!KoconutTypeChecker.checkIsEquatable(eachDatum) && element == eachDatum)) return true
                }
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
                for(const eachElementToCheck of elements) {
                    if(KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
                        let isIncluded = false
                        for(const eachDatum of dataArray) {
                            if(eachElementToCheck.equalsTo(eachDatum as any as KoconutEquatable)) {
                                isIncluded = true
                                break
                            }
                        }
                        if(!isIncluded) return false
                    } else if(!dataArray.includes(eachElementToCheck)) return false
                }
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
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        if(KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                            let isConflict = false
                            for(const eachPrevEquatableDatum of processedArray) {
                                if((eachPrevEquatableDatum as any as KoconutEquatable).equalsTo(eachDatum)) {
                                    isConflict = true
                                    break
                                }
                            }
                            if(!isConflict) processedArray.push(eachDatum)
                        } else  {
                            processedArray = Array.from(new Set(this.data))
                            break
                        }
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    distinctBy<KeyType, EuqatableKeyType extends KoconutEquatable>(
        selector : (element : DataType) => KeyType | EuqatableKeyType | Promise<KeyType | EuqatableKeyType>,
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
                    const equatableKeyArray = new Array<EuqatableKeyType>()
                    for(const eachDatum of this.data) {
                        const eachKey = await selector(eachDatum)
                        if(KoconutTypeChecker.checkIsEquatable(eachKey)) {
                            let isConflict = false
                            for(const eachPrevEquatableKey of equatableKeyArray) {
                                if(eachPrevEquatableKey.equalsTo(eachKey)) {
                                    isConflict = true
                                    break
                                }
                            }
                            if(!isConflict) {
                                equatableKeyArray.push(eachKey)
                                processedArray.push(eachDatum)
                            }
                        } else {
                            if(!keyArray.includes(eachKey)) {
                                keyArray.push(eachKey)
                                processedArray.push(eachDatum)
                            }
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


    dropLast(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        if(n < 0) throw new KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) processedArray = Array.from(this.data).slice(0, -n)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // 추후 문제 발생 가능성 있음
    dropLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let indexNumber = 0
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--) {
                        if(!await predicate(dataArray[eachIndex])) {
                            indexNumber = eachIndex
                            break
                        }
                    }
                    processedArray = dataArray.slice(0, indexNumber + 1)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    dropWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let indexNumber = dataArray.length
                    for(let eachIndex in dataArray) {
                        if(!await predicate(dataArray[eachIndex])) {
                            indexNumber = parseInt(eachIndex)
                            break
                        }
                    }
                    processedArray = dataArray.slice(indexNumber)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    elementAt(
        index : number
    ) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const foundData = Array.from(this.data!)[index]
                if(foundData == undefined) throw new KoconutIndexOutOfBoundsException(`Cannot search for data at index of ${index}`)
                return foundData
            })
        return koconutToReturn

    }


    elementAtOrElse(
        index : number,
        defaultValue : (index : number) => DataType
    ) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return defaultValue(index)
                const foundData = Array.from(this.data)[index]
                return foundData ? foundData : defaultValue(index)
            })
        return koconutToReturn

    }


    elementAtOrNull(
        index : number
    ) : KoconutPrimitive<DataType | null> {

        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                const foundData = Array.from(this.data)[index]
                return foundData ? foundData : null
            })
        return koconutToReturn

    }


    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) 
                        if(await predicate(eachIndex as number, eachDatum)) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        if(await predicate(eachIndex as number, eachDatum))
                            if(destination instanceof Array) destination.push(eachDatum)
                            else destination.add(eachDatum)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // filterIsInstance
    // filterIsInstanceTo


    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(!await predicate(eachDatum)) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    filterNotNull() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(eachDatum != null) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(let eachDatum of this.data)
                        if(eachDatum != null)
                            if(destination instanceof Array) destination.push(eachDatum)
                            else destination.add(eachDatum)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(!await predicate(eachDatum))
                            if(destination instanceof Array) destination.push(eachDatum)
                            else destination.add(eachDatum)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum))
                            if(destination instanceof Array) destination.push(eachDatum)
                            else destination.add(eachDatum)
                }
                return this.data!
            })
        return koconutToReturn

    }


    find(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                for(const eachDatum of this.data)
                    if(await predicate(eachDatum)) return eachDatum
                return null
            })
        return koconutToReturn

    }


    findLast(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                const dataArray = Array.from(this.data)
                for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--) {
                    if(await predicate(dataArray[eachIndex])) return dataArray[eachIndex]
                }
                return null
            })
        return koconutToReturn

    }


    first(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return eachDatum
                    throw new KoconutNoSuchElementException(`No such element is found`)
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }

    firstOrNull(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return eachDatum
                    return null
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    flatMap<ResultDataType>(
        transform : (element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        for(let eachSubElement of await transform(eachDatum))
                            processedArray.push(eachSubElement)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    flatMapIndexed<ResultDataType>(
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        for(let eachSubElement of await transform(eachIndex as number, eachDatum))
                            processedArray.push(eachSubElement)
                }
                return processedArray
            })
        return koconutToReturn

    }


    flatMapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        for(let eachSubElement of await transform(eachIndex as number, eachDatum))
                            if(destination instanceof Array) destination.push(eachSubElement)
                            else destination.add(eachSubElement)
                }
                return this.data!
            })
        return koconutToReturn

    }

    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        for(let eachSubElement of await transform(eachDatum))
                            if(destination instanceof Array) destination.push(eachSubElement)
                            else destination.add(eachSubElement)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // flatten


    fold<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let dataToReturn = initial
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        dataToReturn = await operation(dataToReturn, eachDatum)
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    foldIndexed<ResultDataType>(
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let dataToReturn = initial
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        dataToReturn = await operation(eachIndex as number, dataToReturn, eachDatum)
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    forEach(
        action : (element : DataType) => boolean | void | Promise<boolean | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) 
                        if(await action(eachDatum) == false) break
                }
            })
        return koconutToReturn

    }
    

    forEachIndexed(
        action : (index : number, element : DataType) => boolean | void | Promise<boolean | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        if(await action(eachIndex as number, eachDatum) == false) break
                }
            })
        return koconutToReturn

    }


    groupBy<KeyType, ValueType = DataType>(
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutMap<KeyType, Array<ValueType>> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, Array<ValueType>>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, Array<ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, Array<ValueType>>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        if(!processedMap.has(eachKey)) processedMap.set(eachKey, new Array())
                        processedMap.get(eachKey)?.push(eachValue as ValueType)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
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
                        if(!destination.has(eachKey)) destination.set(eachKey, new Array())
                        destination.get(eachKey)?.push(eachValue as ValueType)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // groupingBy


    indexOf(
        elementToFind : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) {
                        if((KoconutTypeChecker.checkIsEquatable(element) && element.equalsTo(elementToFind as any as KoconutEquatable))
                        || (!KoconutTypeChecker.checkIsEquatable(element) && element == elementToFind))
                            return index as number
                    }
                }
                return -1
            })
        return koconutToReturn

    }


    indexOfFirst(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) 
                        if(await predicate(element)) return index as number
                }
                return -1
            })
        return koconutToReturn

    }


    indexOfLast(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--)
                        if(await predicate(dataArray[eachIndex])) return eachIndex
                }
                return -1
            })
        return koconutToReturn

    }


    intersect(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set<DataType>()
                if(this.data) {
                    const otherArray = KoconutArray.from(other)
                    for(const eachDatum of this.data) {
                        if(await otherArray.contains(eachDatum).yield())
                            processedSet.add(eachDatum)
                    }
                }
                return processedSet
            })
        return koconutToReturn

    }


    isNotEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => Array.from(this.data!).length != 0)
        return koconutToReturn

    }


    isNullOrEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data == null || Array.from(this.data).length == 0)
        return koconutToReturn

    }


    // joinTo
    // joinToString
    join(
        separator : string = ", ",
        prefix : string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType) => any | Promise<any>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<string> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<string>();
        (koconutToReturn as any as KoconutOpener<string>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let resultString = prefix
                if(this.data != null) {
                    let currentCount = 0
                    const length = Array.from(this.data).length
                    for(const eachDatum of this.data) {
                        if(currentCount == limit) {
                            resultString += truncated
                            break
                        }
                        resultString += transform ? await transform(eachDatum) : eachDatum
                        currentCount++
                        if(currentCount != length && currentCount != limit) resultString += separator
                    }
                }
                resultString += postfix
                return resultString
            })
        return koconutToReturn

    }

}