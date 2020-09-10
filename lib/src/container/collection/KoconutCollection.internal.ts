`use strict`

import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutTypeChecker,

    /* Base */
    KoconutPair, Pair, Entry, 

    /* Container */
    KoconutIterable, KoconutArray, KoconutSet, KoconutMap,

    /* Enum*/
    KoconutLoopSignal,

    /* Exception */
    KoconutInvalidArgumentException, KoconutIndexOutOfBoundsException, KoconutNoSuchElementException, KoconutConflictException,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../module.internal"

/** @internal */
export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutIterable<DataType, DataType, WrapperType, WrapperType> {

    /* Koconut Primitive */
    async validate(data : WrapperType | null) {
        if(data != null) {
            const dataArray = Array.from(data)
            this.mSize = dataArray.length
            Object
                .keys(dataArray)
                .map(eachString => parseInt(eachString))
                .forEach(eachIndex => this.mIndices.push(eachIndex))
            this.combinedDataWrapper = data
        }   
        
    }


    /* Properties */
    protected mSize = 0
    size() : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }
    protected mIndices = new Array<number>()
    indices() : KoconutArray<number> {

        const koconutToReturn = new KoconutArray<number>();
        (koconutToReturn as any as KoconutOpener<Array<number>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mIndices)
        return koconutToReturn

    }


    /* Funcions */
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
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
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
                if(this.data == null || this.mSize == 0) return null
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return eachDatum
                    return null
                }
                return Array.from(this.data)[0]
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
            .setProcessor(async () => this.data == null || this.mSize == 0)
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
                    const length = this.mSize
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


    last(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                if(predicate) {
                    for(let eachIndex = dataArray.length ; eachIndex >= 0 ; eachIndex--) 
                        if(await predicate(dataArray[eachIndex])) return dataArray[eachIndex]
                    throw new KoconutNoSuchElementException(`No such element is found`)
                }
                return dataArray[dataArray.length - 1]
            })
        return koconutToReturn

    }

    lastIndexOf(
        element : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >=0 ; eachIndex--) {
                        const eachElement = dataArray[eachIndex]
                        if((KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement.equalsTo(element as any as KoconutEquatable))
                        || (!KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement == element)) return eachIndex
                    }
                }
                return -1
            })
        return koconutToReturn

    }

    lastOrNull(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const length = dataArray.length
                    if(length == 0) return null
                    if(predicate) {
                        for(let eachIndex = length - 1 ; eachIndex >= 0 ; eachIndex--)
                            if(await predicate(dataArray[eachIndex]))
                                return dataArray[eachIndex] != undefined ? dataArray[eachIndex] : null
                    } else return dataArray[length - 1] != undefined ? dataArray[length - 1] : null
                }
                return null
            })
        return koconutToReturn

    }


    map<ResultDataType>(
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        processedArray.push(await transform(eachDatum))
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapIndexed<ResultDataType>(
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
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
                        processedArray.push(await transform(eachIndex as number, eachDatum))
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapIndexedNotNull<ResultDataType>(
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        const eachResultData = await transform(eachIndex as number, eachDatum)
                        if(eachResultData != null && eachResultData != undefined) processedArray.push(eachResultData)
                    }
                }
                return processedArray
            })    
        return koconutToReturn
        
    }


    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        const eachResultData = await transform(eachIndex as number, eachDatum)
                        if(eachResultData != null && eachResultData != undefined) 
                            if(destination instanceof Array) destination.push(eachResultData)
                            else destination.add(eachResultData)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        const eachResultData = await transform(eachIndex as number, eachDatum)
                        if(destination instanceof Array) destination.push(eachResultData)
                        else destination.add(eachResultData)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapNotNull<ResultDataType>(
        transform : (element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
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
                        const dataToAdd = await transform(eachDatum)
                        if(dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const dataToAdd = await transform(eachDatum)
                        if(dataToAdd != null && dataToAdd != undefined) 
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
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const dataToAdd = await transform(eachDatum)
                        if(destination instanceof Array) destination.push(dataToAdd)
                        else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    maxOfWith<ResultDataType>(
        selector : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    maxOfWithOrNull<ResultDataType>(
        selector : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType | null>();
        (koconutToReturn as any as KoconutOpener<ResultDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    maxWithOrNull(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : DataType | null = null
                for(const eachDatum of Array.from(this.data)) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachDatum) < 0)
                        dataToReturn = eachDatum
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    minByOrNull(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : DataType | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatum == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum)) {
                            dataToReturn = eachDatum
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    minOf(
        selector : (element : DataType) => number | Promise<number>,
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (element : DataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (element : DataType) => string | Promise<string>
    ) : KoconutPrimitive<string>;
    minOf(
        selector : (element : DataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    minOfOrNull(
        selector : (element : DataType) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (element : DataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (element : DataType) => string | Promise<string>
    ) : KoconutPrimitive<string | null>;
    minOfOrNull(
        selector : (element : DataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : DataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    minOfWith<ResultDataType>(
        selector : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn 

    }


    minOfWithOrNull<ResultDataType>(
        selector : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType | null>();
        (koconutToReturn as any as KoconutOpener<ResultDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachDatum of this.data) {
                    const eachComparableDatum = await selector(eachDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn 

    }


    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    let dataToExcept = new Array<DataType>();
                    if(typeof (elements as any)[Symbol.iterator] === 'function')dataToExcept = Array.from(elements as Iterable<DataType>)
                    else dataToExcept.push(elements as DataType)
                    const koconutDataToExceptArray = KoconutArray.from(dataToExcept)
                    for(let eachDatum of this.data) {
                        if(!await koconutDataToExceptArray.contains(eachDatum).yield()) processedArray.push(eachDatum)
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType  
            })
        return koconutToReturn

    }


    minusElement(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType> {

        return this.minus(element)

    }


    minWithOrNull(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                let dataToReturn : DataType | null = null
                for(const eachDatum of Array.from(this.data)) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachDatum) > 0)
                        dataToReturn = eachDatum
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    none(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return true
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }


    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const signal = await action(eachDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachDatum of this.data) {
                        const signal = await action(eachIndex++, eachDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // orEmpty
    partition(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPair<WrapperType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPair<WrapperType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<Pair<WrapperType, WrapperType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedFirstArray = new Array<DataType>()
                const processedSecondArray = new Array<DataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum)) processedFirstArray.push(eachDatum)
                        else processedSecondArray.push(eachDatum)
                    }
                }
                if(this.data instanceof Array) return new Pair(processedFirstArray as WrapperType, processedSecondArray as WrapperType)
                else return new Pair(new Set(processedFirstArray) as WrapperType, new Set(processedSecondArray) as WrapperType)
            })
        return koconutToReturn

    }


    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data) : new Array<DataType>()
                if(typeof (elements as any)[Symbol.iterator] === 'function') {
                    const elementsArray = Array.from(elements as Iterable<DataType>)
                    for(let eachDatum of elementsArray) processedArray.push(eachDatum)
                } else processedArray.push(elements as DataType)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    plusElement(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType> {

        return this.plus(element)

    }


    
    random() : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                return dataArray[Math.floor(Math.random() * dataArray.length)]
            })
        return koconutToReturn

    }


    randomOrNull() : KoconutPrimitive<DataType | null> {

        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                const dataArray = Array.from(this.data)
                return dataArray[Math.floor(Math.random() * dataArray.length)]
            })
        return koconutToReturn

    }


    reduce(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {
        
        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`) 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceIndexed(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceIndexedOrNull(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceOrNull(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    // requireNoNulls
    reversed() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).reverse() : new Array<DataType>()
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    runningFold<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                processedArray.push(initial)
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        initial = await operation(initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningFoldindexed<ResultDataType>(
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                processedArray.push(initial)
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        initial = await operation(eachIndex as number, initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningReduce(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const processedArray = new Array<DataType>();
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                processedArray.push(acc)
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++) {
                    acc = await operation(acc, dataArray[eachIndex])
                    processedArray.push(acc)
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningReduceIndexed(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const processedArray = new Array<DataType>();
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                processedArray.push(acc)
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++) {
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                    processedArray.push(acc)
                }
                return processedArray
            })
        return koconutToReturn

    }


    scan<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>();
                processedArray.push(initial)
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        initial = await operation(initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    scanIndexed<ResultDataType>(
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>();
                processedArray.push(initial)
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        initial = await operation(eachIndex as number, initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    shuffled() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const indexes = Object.keys(dataArray).map(eachIndex => parseInt(eachIndex))
                    while(indexes.length > 0) processedArray.push(dataArray[indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]])
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    single(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                if(predicate) {
                    let dataToReturn : DataType | null = null
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum)) {
                            if(dataToReturn == null) dataToReturn = eachDatum
                            else throw new KoconutConflictException("There are more than 2 elements maching the given predicate")
                        }
                    }
                    if(dataToReturn == null) throw new KoconutNoSuchElementException("No element exists matching the given predicate")
                    else return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    singleOrNull(
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
                    let dataToReturn : DataType | null = null
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum))
                            if(dataToReturn == null) dataToReturn = eachDatum
                            else return null
                    }
                    return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    sortedBy(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex])
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(processedArray[middleIndex])
                            if(
                                (KoconutTypeChecker.checkIsComparable(currentComparable) && (currentComparable).compareTo(targetComparable as any as KoconutComparable) >= 0)
                                || (!KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable >= targetComparable)
                            ) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                        
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    sortedByDescending(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex])
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(processedArray[middleIndex])
                            if(
                                (KoconutTypeChecker.checkIsComparable(currentComparable) && (currentComparable).compareTo(targetComparable as any as KoconutComparable) <= 0)
                                || (!KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable <= targetComparable)
                            ) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                        
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            if(await comparator(dataArray[eachIndex], processedArray[middleIndex]) >= 0) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    substarct(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set<DataType>()
                if(this.data != null) {
                    const koconutDataToExceptArray = KoconutArray.from(other)
                    for(let eachDatum of this.data) {
                        if(!await koconutDataToExceptArray.contains(eachDatum).yield())
                            processedSet.add(eachDatum)
                    }
                }
                return processedSet
            })
        return koconutToReturn

    }


    sumBy(
        selector : (element : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let sum = 0
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        sum += await selector(eachDatum)
                    }
                }
                return sum
            })
        return koconutToReturn

    }

    // sumByDouble
    // sumOf


    take(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).slice(0, n) : new Array<DataType>();
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }

    takeLast(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).slice(this.mSize - n, this.mSize) : new Array<DataType>()
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }
    
    takeLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>();
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let targetIndex = this.mSize - 1
                    for(; targetIndex >= 0 ; targetIndex--) {
                        if(!await predicate(dataArray[targetIndex])) break
                    }
                    processedArray = dataArray.slice(targetIndex + 1, this.mSize)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }

    takeWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>();
                if(this.data != null) {
                    let predicateIndex = 0
                    for(const eachDatum of this.data) {
                        if(!await predicate(eachDatum)) break
                        predicateIndex++
                    }
                    processedArray = Array.from(this.data).slice(0, predicateIndex)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }

    // toBooleanArray
    // toByteArray
    // toCharArray
    // toCollection
    // toDoubleArray
    // toFloatArray
    // toHashSet
    // toIntArray
    // toList
    // toLongArray
    // toMap
    // toMutableList
    // toMutableSet

    toArray() : KoconutArray<DataType> {

        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return this.data ? Array.from(this.data) : new Array()
            })
        return koconutToReturn

    }
    
    
    toSet() : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return new Set(this.data)
            })
        return koconutToReturn

    }

    // toShortArray
    // toSortedSet
    // toUByteArray
    // toUIntArray
    // toULongArray
    // toUShortArray


    union(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = this.data == null ? new Set<DataType>() : new Set(this.data)
                for(const eachDatum of other) processedSet.add(eachDatum)
                return await KoconutSet.from(processedSet).distinct().yield() as Set<DataType>
            })
        return koconutToReturn

    }


    // unzip
    windowed(
        size : number
    ) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number
    ) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number,
        partialWindows : boolean
    ) : KoconutArray<Array<DataType>>;
    windowed<ResultDataType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number = 1,
        partialWindows : boolean = false,
        transform : ((elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Array<DataType> | ResultDataType> {

        if(size < 0) size = -size
        if(step < 0) step = -step
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Array<DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Array<DataType>>()
                if(this.data != null) {
                    let currentIndex = 0
                    const dataArray = Array.from(this.data)
                    while(currentIndex < dataArray.length) {
                        const eachChunkedData = dataArray.slice(currentIndex, currentIndex + size)
                        currentIndex += step
                        if(partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData)
                    }
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(const eachProcessedDatum of processedArray)
                        transformedArray.push(await transform(eachProcessedDatum))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


    withIndex() : KoconutArray<Entry<number, DataType>> {

        const koconutToReturn = new KoconutArray<Entry<number, DataType>>();
        (koconutToReturn as any as KoconutOpener<Array<Entry<number, DataType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Entry<number, DataType>>()
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) {
                        processedArray.push(new Entry(index as number, element))
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }

    zip<OtherDataType>(
        other : Iterable<OtherDataType>
    ) : KoconutArray<Pair<DataType, OtherDataType>>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : ((originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Pair<DataType, OtherDataType> | ResultDataType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Pair<DataType, OtherDataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, OtherDataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Pair<DataType, OtherDataType>>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const otherArray= Array.from(other)
                    const minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length
                    for(let eachIndex = 0 ; eachIndex < minLength ; eachIndex++)
                        processedArray.push(new Pair(dataArray[eachIndex], otherArray[eachIndex]))
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedData of processedArray)
                        transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


    zipWithNext() : KoconutArray<Pair<DataType, DataType>>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : ((firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Pair<DataType, DataType> | ResultDataType> {

        if(transform) transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Pair<DataType, DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Pair<DataType, DataType>>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    if(dataArray.length >= 2) {
                        for(let eachIndex = 0 ; eachIndex < dataArray.length - 1 ; eachIndex++)
                            processedArray.push(new Pair(dataArray[eachIndex], dataArray[eachIndex + 1]))
                    }
                    
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedDatum of processedArray)
                        transformedArray.push(await transform(eachProcessedDatum.first, eachProcessedDatum.second))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


}