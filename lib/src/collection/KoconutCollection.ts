'use strict'

import { KoconutPrimitive, KoconutOpener, KoconutPair, TypeChecker, IComparable } from "../KoconutBase"
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


    // https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/drop.html
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


    // ToDo :: maxOfOrNull 메소드 만들어야 함
    /*
    maxWith(
        comparator : (front : DataType, rear : DataType, frontIndex : number, rearIndex : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {



    }
    */

    /*    
    maxWith(
        comparator : (front : DataType, rear : DataType, frontIndex : number, rearIndex : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () =>{
            if(this.data == null || Array.from(this.data).length == 0) return null
            let dataToReturn : DataType | null = null
            for(const [index, element] of this.data.entries()) {
                if(dataToReturn == null || await comparator(dataToReturn, element, index as number - 1, index as number, this.data) < 0)
                    dataToReturn = element
            }
            return dataToReturn
        })
        return koconutToReturn

    }
    */

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
        prediacte : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNot(prediacte, thisArg))

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


    forEach(
        action : (element : DataType, index : number, source : Array<DataType>) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.forEach(action, thisArg))

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


    forEach(
        action : (element : DataType, index : number, source : Set<DataType>) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.forEach(action, thisArg))

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
}