'use strict'

import { KoconutPrimitive, KoconutOpener, Pair, KoconutPair, TypeChecker, IComparable, Entry } from "../KoconutBase"
import { KoconutMap } from "../map/KoconutMap";
import { KoconutInvalidArgumentException, KoconutIndexOutOfBoundsException } from "../KoconutException";

export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutPrimitive<WrapperType> implements Iterable<DataType> {

    /* Iterable */
    [Symbol.iterator]() : Iterator<DataType> {
        return (this.data as Iterable<DataType>)[Symbol.iterator]()
    }

    /* Collection */
    all(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(const [index, element] of this.data.entries())
                    if(!await predicate(element, index as number, this.data)) return false
                return true
            })
        return koconutToReturn

    }


    any(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(const [index, element] of this.data.entries())
                    if(await predicate(element, index as number, this.data)) return true
                return false
            })
        return koconutToReturn

    }


    asIterable() : KoconutPrimitive<Iterable<DataType> | null> {

        const koconutToReturn = new KoconutPrimitive<Iterable<DataType> | null>();
        (koconutToReturn as any as KoconutOpener<Iterable<DataType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data as Iterable<DataType>)
        return koconutToReturn

    }


    associate<KeyType, ValueType>(
        transform : (element : DataType, index : number, source : WrapperType) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachPair = await(await transform(element, index as number, this.data)).yield()
                        if(eachPair != null) processedMap.set(eachPair.first, eachPair.second)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateBy<KeyType, ValueType = DataType> (
        keySelector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        const eachKey = await keySelector(element, index as number, this.data)
                        const eachValue = valueTransform ? await valueTransform(element, index as number, this.data) : element
                        processedMap.set(eachKey, eachValue as ValueType)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateByTo<KeyType, ValueType = DataType> (
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        const eachKey = await keySelector(element, index as number, this.data)
                        const eachValue = valueTransform ? await valueTransform(element, index as number, this.data) : element
                        destination.set(eachKey, eachValue as ValueType)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }

    
    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source: WrapperType) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachPair = await(await transform(element, index as number ,this.data)).yield()
                        if(eachPair != null) destination.set(eachPair.first, eachPair.second)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    associateWith<ValueType>(
        valueSelector : (element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutMap<number, ValueType>{

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutMap<number, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<number, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<number, ValueType>()
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachValue = await valueSelector(element, index as number, this.data)
                        processedMap.set(index as number, eachValue)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    associateWithTo<ValueType>(
        destination : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachValue = await valueSelector(element, index as number, this.data)
                        destination.set(index as number, eachValue)
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
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    chunked<ResultDataType>(
        size : number,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    chunked<ResultDataType>(
        size : number,
        transform : ((elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>) | null = null,
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
                        transformedArray.push(await transform(processedArray[eachProcessedIndex], parseInt(eachProcessedIndex), processedArray))
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
                for(let eachDatum of Array.from(this.data)) if(element == eachDatum) return true
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
                const elementsArray = Array.from(elements)
                for(let eachDatum of Array.from(this.data)) if(elementsArray.includes(eachDatum)) return true
                return true
            })
        return koconutToReturn

    }
    

    count(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
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
                    if(await predicate(element, index as number, this.data)) count++
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
        selector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>,
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
                        const eachKey = await selector(element, index as number, this.data)
                        if(!keyArray.includes(eachKey)) {
                            keyArray.push(eachKey)
                            processedArray.push(element)
                        }
                    }
                }
                if(this.distinct instanceof Array) return processedArray as WrapperType
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
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
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
                        if(!await predicate(dataArray[eachIndex], eachIndex, this.data)) {
                            indexNumber = eachIndex
                            break
                        }
                    }
                    processedArray = dataArray.slice(0, indexNumber + 1)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(this.data) as WrapperType
            })
        return koconutToReturn

    }


    dropWhile(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
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
                        if(!await predicate(dataArray[eachIndex], parseInt(eachIndex), this.data)) {
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
        defaultValue : DataType
    ) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return defaultValue
                const foundData = Array.from(this.data)[index]
                return foundData ? foundData : defaultValue
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
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(await predicate(element, index as number, this.data)) processedArray.push(element)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // filterIsInstance
    // filterIsIsntanceTo
    filterNot(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(!await predicate(element, index as number, this.data)) processedArray.push(element)
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
                        if(destination instanceof Array) destination.push(eachDatum)
                        else destination.add(eachDatum)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(!await predicate(element, index as number, this.data))
                            if(destination instanceof Array) destination.push(element)
                            else destination.add(element)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(await predicate(element, index as number, this.data))
                            if(destination instanceof Array) destination.push(element)
                            else destination.add(element)
                }
                return this.data!
            })
        return koconutToReturn

    }


    find(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                for(const [index, element] of this.data.entries())
                    if(await predicate(element, index as number, this.data)) return element
                return null
            })
        return koconutToReturn

    }


    findLast(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                const dataArray = Array.from(this.data)
                for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--)
                    if(await predicate(dataArray[eachIndex], eachIndex, this.data)) return dataArray[eachIndex]
                return null
            })
        return koconutToReturn

    }


    first(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                if(predicate) {
                    for(const [index, element] of this.data.entries())
                        if(await predicate(element, index as number, this.data)) return element
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    firstOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                if(predicate) {
                    for(const [index, element] of this.data.entries())
                        if(await predicate(element, index as number, this.data)) return element
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachSubElements = await transform(element, index as number, this.data)
                        for(let eachSubElement of eachSubElements) processedArray.push(eachSubElement)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : WrapperType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const eachSubelements = await transform(element, index as number, this.data)
                        for(let eachSubElement of eachSubelements)
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
        operation : (acc : ResultDataType, element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let dataToReturn = initial
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        dataToReturn = await operation(dataToReturn, element, index as number, this.data)
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    forEach(
        action : (element : DataType, index : number, source : WrapperType) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const signal = await action(element, index as number, this.data)
                        if(signal == KoconutCollection.LOOP_SIGNAL.BREAK) break
                    }
                }
            })
        return koconutToReturn

    }
    // forEachIndexed


    groupBy<KeyType, ValueType = DataType>(
        keySelector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        const eachKey = await keySelector(element, index as number, this.data)
                        const eachValue = valueTransform ? await valueTransform(element, index as number, this.data) : element
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
        keySelector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        const eachKey = await keySelector(element, index as number, this.data)
                        const eachValue = valueTransform ? await valueTransform(element, index as number, this.data) : element
                        if(!destination.has(eachKey)) destination.set(eachKey, new Array())
                        destination.get(eachKey)?.push(eachValue as ValueType)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    indexOf(
        elementToFind : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(elementToFind == element) return index as number
                }
                return -1
            })
        return koconutToReturn

    }

    
    indexOfFirst(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) 
                        if(await predicate(element, index as number, this.data)) return index as number
                }
                return -1
            })
        return koconutToReturn

    }


    indexOfLast(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
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
                        if(await predicate(dataArray[eachIndex], eachIndex, this.data)) return eachIndex
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
                    const otherArray = Array.from(other)
                    for(const eachDatum of this.data) {
                        if(otherArray.includes(eachDatum))
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
        transform : ((element : DataType, index : number, source : WrapperType) => any | Promise<any>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        if(currentCount == limit) {
                            resultString += truncated
                            break
                        }
                        resultString += transform ? await transform(element, index as number, this.data) : element
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
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`) 
                const dataArray = Array.from(this.data)
                if(predicate) {
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--)
                        if(await predicate(dataArray[eachIndex], eachIndex, this.data)) return dataArray[eachIndex]
                    throw new KoconutIndexOutOfBoundsException("No element exists matching the given predicate")
                } else return dataArray[dataArray.length - 1]
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
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >=0 ; eachIndex--)
                        if(dataArray[eachIndex] == element) return eachIndex
                }
                return -1
            })
        return koconutToReturn

    }


    lastOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
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
                            if(await predicate(dataArray[eachIndex], eachIndex, this.data))
                                return dataArray[eachIndex] != undefined ? dataArray[eachIndex] : null
                    } else return dataArray[length - 1] != undefined ? dataArray[length - 1] : null
                }
                return null
            })
        return koconutToReturn

    }


    map<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        processedArray.push(await transform(element, index as number, this.data))
                }
                return processedArray
            })
        return koconutToReturn

    }
    // mapIndexed
    // mapIndexedNotNull
    // mapIndexedNotNullTo
    // mapIndexedTo


    mapNotNull<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const dataToAdd = await transform(element, index as number, this.data)
                        if(dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const dataToAdd = await transform(element, index as number, this.data)
                        if(dataToAdd != null && dataToAdd != undefined) {
                            if(destination instanceof Array) destination.push(dataToAdd)
                            else destination.add(dataToAdd)
                        }
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries())
                        if(destination instanceof Array) destination.push(await transform(element, index as number, this.data))
                        else destination.add(await transform(element, index as number, this.data))
                }
                return this.data!
            })
        return koconutToReturn

    }


    maxByOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | IComparable | Promise<number | string | IComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                let dataToReturn : DataType | null = null
                let lastComparableDatum : number | string | IComparable | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatum == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatum as any as IComparable) > 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum) {
                            dataToReturn = element
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    maxOf(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>
    ) : KoconutPrimitive<number>;
    maxOf(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    maxOf(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutPrimitive<string>
    maxOf(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>;
    maxOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    maxOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) =>  ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    maxOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`) 
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatumToReturn as any as IComparable) > 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    maxOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutPrimitive<string | null>
    maxOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>
    maxOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatumToReturn as any as IComparable) > 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn
    }


    maxOfWith<SelectedComparableResultType>(
        selector : (element : DataType, index : number, source : WrapperType) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
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
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`) 
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    maxOfWithOrNull<SelectedComparableResultType>(
        selector : (element : DataType, index : number, source : WrapperType) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
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
                if(this.data == null || Array.from(this.data).length == 0) return null
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
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
                if(this.data == null || Array.from(this.data).length == 0) return null
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
        selector : (element : DataType, index : number, source : WrapperType) => number | string | IComparable | Promise<number | string | IComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                let dataToReturn : DataType | null = null
                let lastComparableDatum : number | string | IComparable | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatum == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatum as any as IComparable) < 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum) {
                            dataToReturn = element
                            lastComparableDatum = eachComparableDatum
                    }
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    minOf(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutPrimitive<string>;
    minOf(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>
    minOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatumToReturn as any as IComparable) < 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn

    }


    minOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutPrimitive<string | null>;
    minOfOrNull(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>;
    minOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null
                        || TypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum as any as IComparable).compareTo(lastComparableDatumToReturn as any as IComparable) < 0
                        || !TypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    minOfWith<SelectedComparableResultType>(
        selector : (element : DataType, index : number, source : WrapperType) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
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
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn!
            })
        return koconutToReturn 

    }


    minOfWithOrNull<SelectedComparableResultType>(
        selector : (element : DataType, index : number, source : WrapperType) => SelectedComparableResultType | Promise<SelectedComparableResultType>,
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
                if(this.data == null || Array.from(this.data).length == 0) return null
                let lastComparableDatumToReturn : SelectedComparableResultType | null = null
                for(const [index, element] of this.data.entries()) {
                    const eachComparableDatum = await selector(element, index as number, this.data)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn 

    }


    minus(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType>;
    minus(
        elements : Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType>
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
                    for(let eachDatum of this.data) {
                        if(!dataToExcept.includes(eachDatum)) processedArray.push(eachDatum)
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
                if(this.data == null || Array.from(this.data).length == 0) return null
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
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return true
                if(predicate) {
                    for(const [index, element] of this.data.entries())
                        if(await predicate(element, index as number, this.data)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }


    onEach(
        action : (element : DataType, index : number, source : WrapperType) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        const signal = await action(element, index as number, this.data)
                        if(signal == KoconutCollection.LOOP_SIGNAL.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }
    // onEachIndexed


    // orEmpty
    partition(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
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
                    for(const [index, element] of this.data.entries()) {
                        if(await predicate(element, index as number, this.data)) processedFirstArray.push(element)
                        else processedSecondArray.push(element)
                    }
                }
                if(this.data instanceof Array) return new Pair(processedFirstArray as WrapperType, processedSecondArray as WrapperType)
                else return new Pair(new Set(processedFirstArray) as WrapperType, new Set(processedSecondArray) as WrapperType)
            })
        return koconutToReturn

    }


    plus(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType>;
    plus(
        elements : Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType>;
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
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`) 
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
                if(this.data == null || Array.from(this.data).length == 0) return null
                const dataArray = Array.from(this.data)
                return dataArray[Math.floor(Math.random() * dataArray.length)]
            })
        return koconutToReturn

    }


    reduce(
        operation : (acc : DataType, element : DataType, index : number, source : WrapperType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {
        
        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`) 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex], eachIndex, this.data)
                return acc
            })
        return koconutToReturn

    }


    // reduceIndexed
    reduceOrNull(
        operation : (acc : DataType, element : DataType, index : number, source : WrapperType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex], eachIndex, this.data)
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
        operation : (acc : ResultDataType, element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
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
                    for(const [index, element] of this.data.entries()) {
                        initial = await operation(initial, element, index as number, this.data)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }
    // runningFoldindexed


    runningReduce(
        operation : (acc : DataType, element : DataType, index : number, source : WrapperType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                const processedArray = new Array<DataType>();
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                processedArray.push(acc)
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++) {
                    acc = await operation(acc, dataArray[eachIndex], eachIndex, this.data)
                    processedArray.push(acc)
                }
                return processedArray
            })
        return koconutToReturn

    }
    // runningReduceIndexed


    scan<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
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
                    for(const [index, element] of this.data.entries()) {
                        initial = await operation(initial, element, index as number, this.data)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }
    //scanIndexed


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
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) throw new KoconutIndexOutOfBoundsException(`Source data is null or empty`)
                if(predicate) {
                    let dataToReturn : DataType | null = null
                    for(const [index, element] of this.data.entries()) {
                        if(await predicate(element, index as number, this.data)) {
                            if(dataToReturn == null) dataToReturn = element
                            else throw new KoconutInvalidArgumentException("There are more than 2 elements maching the given predicate")
                        }
                    }
                    if(dataToReturn == null) throw new KoconutIndexOutOfBoundsException("No element exists matching the given predicate")
                    else return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    singleOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
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
                    for(const [index, element] of this.data.entries()) {
                        if(await predicate(element, index as number, this.data))
                            if(dataToReturn == null) dataToReturn = element
                            else return null
                    }
                    return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    sortedBy(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex], parseInt(eachIndex), this.data)
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(dataArray[middleIndex], middleIndex, this.data)
                            if(
                                TypeChecker.checkIsComparable(currentComparable) && (targetComparable as any as IComparable).compareTo(currentComparable) < 0
                                || !TypeChecker.checkIsComparable(currentComparable) && currentComparable >= targetComparable
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
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : WrapperType) => string | Promise<string>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutCollection<DataType, WrapperType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : WrapperType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex], parseInt(eachIndex), this.data)
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(dataArray[middleIndex], middleIndex, this.data)
                            if(
                                TypeChecker.checkIsComparable(currentComparable) && (targetComparable as any as IComparable).compareTo(currentComparable) > 0
                                || !TypeChecker.checkIsComparable(currentComparable) && currentComparable <= targetComparable
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
                            if(await comparator(dataArray[eachIndex], dataArray[middleIndex]) >= 0) startIndex = middleIndex + 1
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


    substract(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set(this.data)
                for(const eachData of other) processedSet.delete(eachData)
                return processedSet
            })
        return koconutToReturn

    }


    sumBy(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let sum = 0
                if(this.data != null) {
                    for(const [index, element] of this.data.entries()) {
                        sum += await selector(element, index as number, this.data)
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


    takeWhile(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                var processedArray = new Array<DataType>();
                if(this.data != null) {
                    let predicateIndex = 0
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        if(!await predicate(dataArray[eachIndex], parseInt(eachIndex), this.data)) break
                        predicateIndex++
                    }
                    processedArray = dataArray.slice(0, predicateIndex)
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
                const processedSet = new Set(this.data)
                for(const eachDatum of other) processedSet.add(eachDatum)
                return processedSet
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
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number = 1,
        partialWindows : boolean = false,
        transform : ((elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ResultDataType | Promise<ResultDataType>) | null = null,
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
                    for(let eachProcessedIndex in processedArray)
                        transformedArray.push(await transform(processedArray[eachProcessedIndex], parseInt(eachProcessedIndex), processedArray))
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
                    for(const [index, element] of this.data.entries()) {
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
                    for(let eachProcesseedData of processedArray)
                        transformedArray.push(await transform(eachProcesseedData.first, eachProcesseedData.second))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


}
export namespace KoconutCollection {
    export enum LOOP_SIGNAL {
        BREAK, CONTINUE
    }
}





export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {

    private static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Array<DataType>>
    ) : KoconutArray<DataType> {

        const koconutToReturn = new KoconutArray<DataType>(collection.data);
        koconutToReturn.processor = collection.processor;
        koconutToReturn.prevYieldable = collection.prevYieldable
        return koconutToReturn;

    }

    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))
        
    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateTo(destination, transform, thisArg))

    }


    associateWithTo<ValueType>(
        destination : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))
        
    }


    distinct() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinct())

    }


    distinctBy<KeyType>(
        selector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinctBy(selector, thisArg))

    }


    drop(
        n : number
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.drop(n))
        
    }


    dropLast(
        n : number
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropLast(n))
        
    }


    dropLastWhile(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropLastWhile(predicate, thisArg))

    }


    dropWhile(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropWhile(predicate, thisArg))

    }


    filter(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filter(predicate, thisArg))

    }


    filterNot(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNot(predicate, thisArg))

    }


    filterNotNull() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNull())

    }


    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNullTo(destination))

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterTo(destination, predicate, thisArg))

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapTo(destination, transform, thisArg))
    }


    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null  
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapTo(destination, transform, thisArg))

    }


    minus(
        element : DataType
    ) : KoconutArray<DataType>;
    minus(
        elements : Iterable<DataType>
    ) : KoconutArray<DataType>;
    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.minus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.minus(elements as DataType))

    }


    minusElement(
        element : DataType
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.minusElement(element))

    }


    onEach(
        action : (element : DataType, index : number, source : Array<DataType>) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEach(action, thisArg))

    }


    plus(
        element : DataType
    ) : KoconutArray<DataType>;
    plus(
        elements : Iterable<DataType>
    ) : KoconutArray<DataType>;
    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.plus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.plus(elements as DataType))

    }


    plusElement(
        element : DataType
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.plusElement(element))

    }


    shuffled() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.shuffled())

    }


    sortedBy(
        selector : (element : DataType, index : number, source : Array<DataType>) => number | Promise<number>
    ) : KoconutArray<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Array<DataType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Array<DataType>) => string | Promise<string>
    ) : KoconutArray<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Array<DataType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedBy<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>
    ) : KoconutArray<DataType>;
    sortedBy<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedBy<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedBy(selector as any, thisArg))

    }


    sortedByDescending(
        selector : (element : DataType, index : number, source : Array<DataType>) => number | Promise<number>
    ) : KoconutArray<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Array<DataType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Array<DataType>) => string | Promise<string>
    ) : KoconutArray<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Array<DataType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedByDescending<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>
    ) : KoconutArray<DataType>;
    sortedByDescending<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutArray<DataType>;
    sortedByDescending<ComparableType extends IComparable> (
        selector : (element : DataType, index : number, source : Array<DataType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedByDescending(selector as any, thisArg))

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedWith(comparator, thisArg))

    }


    take(
        n : number
    ) : KoconutArray<DataType>{

        return KoconutArray.fromCollection(super.take(n))

    }
}


export class KoconutSet<DataType> extends KoconutCollection<DataType, Set<DataType>> {

    private static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Set<DataType>>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>(collection.data)
        koconutToReturn.prevYieldable = collection.prevYieldable
        koconutToReturn.processor = collection.processor
        return koconutToReturn

    }


    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType, index : number, source : Set<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Set<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source : Set<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateTo(destination, transform, thisArg))

    }


    associateWithTo<ValueType>(
        destination : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : Set<DataType>) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))

    }


    distinct() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.distinct())

    }


    distinctBy<KeyType>(
        selector : (element : DataType, index : number, source : Set<DataType>) => KeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.distinctBy(selector, thisArg))

    }


    drop(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.drop(n))

    }


    dropLast(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropLast(n))

    }


    dropLastWhile(
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropLastWhile(predicate, thisArg))

    }


    dropWhile(
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropWhile(predicate, thisArg))

    }


    filter(
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filter(predicate, thisArg))

    }


    filterNot(
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNot(predicate, thisArg))

    }


    filterNotNull() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNull())

    }


    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNullTo(destination))

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType, index : number, source : Set<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterTo(destination, predicate, thisArg))

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Set<DataType>) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.flatMapTo(destination, transform, thisArg))

    }


    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType, index : number, source : Set<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Set<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Set<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    mapTo<ResultDataType>(
        destiantion : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType, index : number, source : Set<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapTo(destiantion, transform, thisArg))

    }


    minus(
        element : DataType
    ) : KoconutSet<DataType>;
    minus(
        elements : Iterable<DataType>
    ) : KoconutSet<DataType>;
    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutSet<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutSet.fromCollection(super.minus(elements as Iterable<DataType>))
        else return KoconutSet.fromCollection(super.minus(elements as DataType))

    }


    minusElement(
        element : DataType
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.minusElement(element))

    }


    onEach(
        action : (element : DataType, index : number, source : Set<DataType>) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.onEach(action, thisArg))

    }


    plus(
        element : DataType
    ) : KoconutSet<DataType>;
    plus(
        elements : Iterable<DataType>
    ) : KoconutSet<DataType>;
    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutSet<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutSet.fromCollection(super.plus(elements as Iterable<DataType>))
        else return KoconutSet.fromCollection(super.plus(elements as DataType))

    }


    plusElement(
        element : DataType
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.plusElement(element))

    }


    shuffled() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.shuffled())

    }


    sortedBy(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | Promise<number>
    ) : KoconutSet<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Set<DataType>) => string | Promise<string>
    ) : KoconutSet<DataType>;
    sortedBy(
        selector : (element : DataType, index : number, source : Set<DataType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => ComparableType | Promise<ComparableType>
    ) : KoconutSet<DataType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedBy<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedBy(selector as any, thisArg))

    }


    sortedByDescending(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | Promise<number>
    ) : KoconutSet<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | Promise<number>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Set<DataType>) => string | Promise<string>
    ) : KoconutSet<DataType>;
    sortedByDescending(
        selector : (element : DataType, index : number, source : Set<DataType>) => string | Promise<string>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => ComparableType | Promise<ComparableType>
    ) : KoconutSet<DataType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutSet<DataType>;
    sortedByDescending<ComparableType extends IComparable>(
        selector : (element : DataType, index : number, source : Set<DataType>) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedByDescending(selector as any, thisArg))

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedWith(comparator, thisArg))

    }


    take(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.take(n))

    }

}