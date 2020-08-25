'use strict'

import { KoconutPrimitive, KoconutOpener, KoconutPair, Pair } from "../KoconutBase"
import { KoconutMap } from "../map/KoconutMap"


export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutPrimitive<WrapperType> {


    /*
    [Symbol.iterator]() : Iterator<DataType> {
        return (this.data as WrapperType)[Symbol.iterator]()
    }
    */

    /* Collection */
    all(predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>, 
        thisArg : any = null) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return false
            for(const [index, element] of this.data.entries()) 
                if(!await predicate(element, index as number, this.data)) return false    
            return true
        })
        return koconutToReturn

    }


    any(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return false
            for(const [index, element] of this.data.entries()) 
                if(await predicate(element, index as number, this.data)) return true    
            return false
        })
        return koconutToReturn

    }

    
    asIterable() : KoconutPrimitive<WrapperType | null> {

        const koconutToReturn = new KoconutPrimitive<WrapperType | null>();
        (koconutToReturn as any as KoconutOpener<WrapperType | null>).setPrevYieldable(this).setProcessor(() => this.data)
        return koconutToReturn

    }


    associate<KeyType, ValueType>(
        transform : (element : DataType, index : number, source : WrapperType) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>).setPrevYieldable(this).setProcessor(async () => {
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
        valueTransformThisArg : any = null) : KoconutMap<KeyType, ValueType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>).setPrevYieldable(this).setProcessor(async () => {
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
        valueTransform : ((element : DataType, index : number, source :WrapperType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
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
        destinaion : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source : WrapperType) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const eachPair = await(await transform(element, index as number, this.data)).yield()
                    if(eachPair != null) destinaion.set(eachPair.first, eachPair.second)
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    associateWith<ValueType>(
        valueSelector : (element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>,
        thisArg : any = null) : KoconutMap<number, ValueType>{

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutMap<number, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<number, ValueType>>).setPrevYieldable(this).setProcessor(async () => {
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
        destinaion : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const eachValue = await valueSelector(element, index as number, this.data)
                    destinaion.set(index as number, eachValue)
                }
            }
            return this.data!
        })
        return koconutToReturn

    }
    

    contains(
        element : DataType) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachElement of this.data.values()) {
                if(element == eachElement) return true
            }
            return false
        })
        return koconutToReturn

    }


    containsAll(
        elements : Iterable<DataType>) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return false
            const dataArray = Array.from(this.data)
            for(let eachElement of elements) {
                if(!dataArray.includes(eachElement)) return false
            }
            return true
        })
        return koconutToReturn

    }


    count(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null, 
        thisArg : any = null) : KoconutPrimitive<number> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return 0
            if(!predicate) return Array.from(this.data).length
            let count = 0
            for(const [index, element] of this.data.entries()) {
                if(await predicate(element, index as number, this.data)) count++
            }
            return count
        })
        return koconutToReturn

    }

    distinct() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedSet = new Set(this.data)
            if(this.data instanceof Array) return Array.from(processedSet) as WrapperType
            else return processedSet as WrapperType
        })
        return koconutToReturn

    }


    distinctBy<KeyType>(
        selector : (element : DataType, index : number, source : WrapperType) => KeyType | Promise<KeyType>, 
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
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
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    } 


    drop(
        n : number) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            let processedArray = new Array<DataType>();
            if(this.data != null) {
                processedArray = Array.from(this.data).slice(n)
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    dropWhile(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>, 
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            let processedArray = new Array<DataType>();
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
        index : number) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>).setPrevYieldable(this).setProcessor(async () => {
            return Array.from(this.data!)[index]
        })
        return koconutToReturn

    }


    elementAtOrElse(
        index : number, 
        defaultValue : DataType) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return defaultValue
            const foundData = Array.from(this.data)[index]
            return foundData ? foundData : defaultValue
        })
        return koconutToReturn

    }


    elementAtOrNull(
        index : number) : KoconutPrimitive<DataType | null> {
        
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return null
            const foundData = Array.from(this.data)[index]
            return foundData ? foundData : null
        })
        return koconutToReturn

    }


    filter(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>, 
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) processedArray.push(element)
                }
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
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(!await predicate(element, index as number, this.data)) processedArray.push(element)
                }
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    filterNotNull() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                for(let eachData of this.data) {
                    if(eachData != null) processedArray.push(eachData)
                }
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    filterNotNullTo<DestinaionType extends Array<DataType> | Set<DataType>>(
        destinaion : DestinaionType) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(let eachData of this.data) {
                    if(eachData != null) {
                        if(destinaion instanceof Array) destinaion.push(eachData)
                        else if(destinaion instanceof Set) destinaion.add(eachData)
                    }
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    filterNotTo<DestinaionType extends Array<DataType> | Set<DataType>>(
        destination : DestinaionType,
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(!await predicate(element, index as number, this.data)) {
                        if(destination instanceof Array) destination.push(element)
                        else if(destination instanceof Set) destination.add(element)
                    }
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    filterTo<DestinaionType extends Array<DataType> | Set<DataType>>(
        destination : DestinaionType,
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) {
                        if(destination instanceof Array) destination.push(element)
                        else if(destination instanceof Set) destination.add(element)
                    }
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    find(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>, 
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return null
            for(const [index, element] of this.data.entries()) {
                if(await predicate(element, index as number, this.data)) return element
            }
            return null
        })
        return koconutToReturn

    }


    findLast(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>, 
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return null
            let foundElement = null
            for(const [index, element] of this.data.entries()) {
                if(await predicate(element, index as number, this.data)) foundElement = element
            }
            return foundElement
        })
        return koconutToReturn

    }


    first(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null, 
        thisArg : any = null) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) throw new Error(`This Collection is Empty!`)
            if(predicate) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) return element
                }
            }
            return Array.from(this.data)[0]
        })
        return koconutToReturn

    }


    firstOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null, 
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return null
            if(predicate) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) return element
                }
            }
            return Array.from(this.data)[0]
        })
        return koconutToReturn

    }


    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null) : KoconutCollection<ResultDataType, Array<ResultDataType>> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ResultDataType, Array<ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>();
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const eachSubElements = await transform(element, index as number, this.data)
                    for(let eachSubElement of eachSubElements) processedArray.push(eachSubElement)
                }
            }
            return processedArray;
        })
        return koconutToReturn

    }


    flatMapTo<ResultDataType>(
        destinaion : Array<ResultDataType>, 
        transform : (element : DataType, index : number, source : WrapperType) => Array<ResultDataType> | Promise<Array<ResultDataType>>, 
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    for(let eachSubData of await transform(element, index as number, this.data))
                        destinaion.push(eachSubData)
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
        thisArg : any = null) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>).setPrevYieldable(this).setProcessor(async () => {
            let dataToReturn = initial
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    dataToReturn = await operation(dataToReturn, element, index as number, this.data)
                }
            }
            return dataToReturn
        })
        return koconutToReturn

    }


    forEach(
        action : (element : DataType, index : number, source : WrapperType) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
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
        valueTransformThisArg : any = null) : KoconutMap<KeyType, Array<ValueType>> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, Array<ValueType>>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, Array<ValueType>>>).setPrevYieldable(this).setProcessor(async () => {
            const processedMap = new Map<KeyType, Array<ValueType>>();
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
        destinaion : Map<KeyType, Array<ValueType>>,
        keySelecor : (element : DataType, index : number, source :WrapperType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : WrapperType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        keySelecor = keySelecor.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const eachKey = await keySelecor(element, index as number, this.data)
                    const eachValue = valueTransform ? await valueTransform(element, index as number, this.data) : element
                    if(!destinaion.has(eachKey)) destinaion.set(eachKey, new Array())
                    destinaion.get(eachKey)?.push(eachValue as ValueType)
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    indexOf(
        elementToFind : DataType) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(element == elementToFind) return index as number
                }
            }
            return -1
        })
        return koconutToReturn

    }


    indexOfFirst(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) return index as number
                }
            }
            return -1
        })
        return koconutToReturn
        
    }


    indexOfLast(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutPrimitive<number> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                let foundIndex = -1
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) foundIndex = index as number
                }
                return foundIndex
            }
            return -1
        })
        return koconutToReturn

    }

    intersect(
        other : Iterable<DataType>) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                for(let eachData of other) if(dataArray.includes(eachData)) processedArray.push(eachData)
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    isNotEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            return Array.from(this.data!).length != 0
        })
        return koconutToReturn

    }


    isNullOrEmpty() :KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            return this.data == null || Array.from(this.data).length == 0
        })
        return koconutToReturn

    }


    // joinTo
    // joinToString
    join(
        separator : string = ", ",
        prefix :string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType, index : number, source : WrapperType) => string | Promise<string>) | null = null,
        thisArg : any = null
    ) : KoconutCollection<string, Array<string>> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<string, Array<string>>();
        (koconutToReturn as any as KoconutOpener<Array<string>>).setPrevYieldable(this).setProcessor(async () => {
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
            return resultString.split('')
        })
        return koconutToReturn

    }


    last(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null, 
        thisArg : any = null) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>).setPrevYieldable(this).setProcessor(async () => {
            const dataArray = Array.from(this.data!)
            if(predicate) {
                for(let index = dataArray.length - 1 ; index >= 0 ; index--) {
                    if(await predicate(dataArray[index], index, this.data!)) return dataArray[index]
                }
                throw new Error('No element exists matching the given predicate!')
            } else return dataArray[dataArray.length - 1]
        })
        return koconutToReturn

    }


    lastIndexOf(
        element : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                for(let index = dataArray.length - 1 ; index >= 0 ; index--) {
                    if(dataArray[index] == element) return index
                }
            }
            return -1
        })
        return koconutToReturn

    }


    lastOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                const length = dataArray.length
                if(predicate) {
                    for(let index = length - 1 ; index >= 0 ; index--) {
                        if(await predicate(dataArray[index], index, this.data)) return dataArray[index]
                    }
                } else return dataArray[length - 1] ? dataArray[length - 1] : null
            }
            return null
        })
        return koconutToReturn

    }


    map<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutCollection<ResultDataType, Array<ResultDataType>> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ResultDataType, Array<ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>();
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    processedArray.push(await transform(element, index as number, this.data))
                }
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
        thisArg : any = null) : KoconutCollection<ResultDataType, Array<ResultDataType>> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ResultDataType, Array<ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>();
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
        destination : Array<ResultDataType>,
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const dataToAdd = await transform(element, index as number, this.data)
                    if(dataToAdd != null && dataToAdd != undefined) destination.push(dataToAdd)
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType>,
        transform : (element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn  as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    destination.push(await transform(element, index as number, this.data))
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    maxBy<ComparableType>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return null
            let dataToReturn : DataType | null = null
            let lastComparable : ComparableType | null = null
            for(const [index, element] of this.data.entries()) {
                const eachComparable = await selector(element, index as number, this.data)
                if(lastComparable == null || lastComparable < eachComparable) {
                    dataToReturn = element
                    lastComparable = eachComparable
                }
            }
            return dataToReturn
        })
        return koconutToReturn

    }


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


    minBy<ComparableType>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return null
            let dataToReturn : DataType | null = null
            let lastComparable : ComparableType | null = null
            for(const [index, element] of this.data.entries()) {
                const eachComparable = await selector(element, index as number, this.data)
                if(lastComparable == null || lastComparable > eachComparable) {
                    dataToReturn = element
                    lastComparable = eachComparable
                }
            }
            return dataToReturn
        })
        return koconutToReturn

    }


    minus(element : DataType) : KoconutCollection<DataType, WrapperType>;
    minus(elements : Iterable<DataType>) : KoconutCollection<DataType, WrapperType>;
    minus(elements : DataType | Iterable<DataType>) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                let dataToExcept = new Array<DataType>()
                if(typeof (elements as any)[Symbol.iterator] === 'function') dataToExcept = Array.from(elements as Iterable<DataType>)
                else dataToExcept.push(elements as DataType)
                for(let eachData of this.data) {
                    if(!dataToExcept.includes(eachData)) processedArray.push(eachData)
                }
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    minusElement(
        element : DataType) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            let processedArray = Array.from(this.data!)
            const indexToRemove = processedArray.indexOf(element)
            if(indexToRemove > -1) processedArray.splice(indexToRemove, 1)
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    minWith(
        comparator : (front : DataType, rear : DataType, frontIndex : number, rearIndex : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null) : KoconutPrimitive<DataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return null
            let dataToReturn : DataType | null = null
            for(const [index, element] of this.data.entries()) {
                if(dataToReturn == null || await comparator(dataToReturn, element, index as number - 1, index as number, this.data) > 0)
                    dataToReturn = element
            }
            return dataToReturn
        })
        return koconutToReturn

    }


    none(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return true
            if(predicate) {
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) return false
                }
                return true
            }
            return false
        })
        return koconutToReturn

    }


    onEach(
        action : (element : DataType, index : number, source : WrapperType) => void | Promise<void>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg);
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    await action(element, index as number, this.data)
                }
            }
            return this.data!
        })
        return koconutToReturn

    }


    //orEmpty()
    partition(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPair<WrapperType, WrapperType>{

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPair<WrapperType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<Pair<WrapperType, WrapperType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedFirstArray = new Array<DataType>();
            const processedSecondArray = new Array<DataType>();
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
        element : DataType) : KoconutCollection<DataType, WrapperType>;
    plus(
        elements : Iterable<DataType>) : KoconutCollection<DataType, WrapperType>;
    plus(
        elements : DataType | Iterable<DataType>) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = this.data ? Array.from(this.data) : new Array<DataType>()
            if(typeof (elements as any)[Symbol.iterator] == 'function') {
                const elementsArray = Array.from(elements as Iterable<DataType>)
                for(let eachData of elementsArray) processedArray.push(eachData)
            } else processedArray.push(elements as DataType)
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    plusElement(
        element : DataType) : KoconutCollection<DataType, WrapperType> {

        return this.plus(element)

    }


    random() : KoconutPrimitive<DataType> {

        return this.randomOrNull() as KoconutPrimitive<DataType>

    }


    randomOrNull() : KoconutPrimitive<DataType | null> {

        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null) return null;
            const dataArray = Array.from(this.data)
            if(dataArray.length == 0) return null
            return dataArray[Math.floor(Math.random() * dataArray.length)]
        })
        return koconutToReturn

    }


    // reduce
    // reduceIndexed
    // reduceOrNull

    requireNoNulls() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = this.data ? Array.from(this.data) : new Array<DataType>()
            if(this.data != null) {
                for(const eachData of this.data.values()) {
                    if(eachData != null) processedArray.push(eachData)
                }
            }
            if(this.data instanceof Array) return processedArray as WrapperType;
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    reversed() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = this.data ? Array.from(this.data).reverse() : new Array<DataType>();
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    scan<ResultDataType>(
        initial : ResultDataType,
        operaion : (acc : ResultDataType, element : DataType, index : number, source : WrapperType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<ResultDataType, Array<ResultDataType>> {

        operaion = operaion.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ResultDataType, Array<ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>();
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    initial = await operaion(initial, element, index as number, this.data);
                    processedArray.push(initial)
                }
            }
            return processedArray
        })
        return koconutToReturn

    }
    // scanIndexed
    // scanReduce
    // scanReduceIndexed

    shuffled() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                const randomIndexArray = new Array<number>();
                const dataArray = Array.from(this.data)
                while(randomIndexArray.length < dataArray.length) {
                    const eachRandomIndex = Math.floor(Math.random() * dataArray.length)
                    if(!randomIndexArray.includes(eachRandomIndex))  {
                        randomIndexArray.push(eachRandomIndex)
                        processedArray.push(dataArray[eachRandomIndex])
                    }
                }
            }
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    singleOrNull(
        predicate : ((element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>).setPrevYieldable(this).setProcessor(async () => {
            if(this.data == null || Array.from(this.data).length == 0) return null
            if(predicate) {
                let dataToReturn : DataType | null = null
                for(const [index, element] of this.data.entries()) {
                    if(await predicate(element, index as number, this.data)) {
                        if(dataToReturn == null) dataToReturn = element
                        else return null
                    }
                }
                return dataToReturn
            } else return Array.from(this.data)[0]
        })
        return koconutToReturn

    }


    sortedBy<ComparableType>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
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
                        if(currentComparable >= await selector(dataArray[middleIndex], middleIndex, this.data)) startIndex = middleIndex + 1
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


    sortedByDescending<ComparableType>(
        selector : (element : DataType, index : number, source : WrapperType) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
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
                        if(currentComparable <= await selector(dataArray[middleIndex], middleIndex, this.data)) startIndex = middleIndex + 1
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
        comparator : (front : DataType, rear : DataType, frontIndex : number, rearIndex : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                for(let eachIndex in dataArray) {
                    let startIndex = 0
                    let middleIndex : number
                    let endIndex = processedArray.length
                    while(startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2)
                        if(await comparator(dataArray[eachIndex], dataArray[middleIndex], parseInt(eachIndex), middleIndex, this.data) >= 0) startIndex = middleIndex + 1
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
    ) : KoconutCollection<DataType, Set<DataType>> {

        const koconutToReturn = new KoconutCollection<DataType, Set<DataType>>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedSet = new Set(this.data)
            for(const eachData of other) processedSet.delete(eachData)
            return processedSet
        })
        return koconutToReturn

    }


    sumBy(
        selector : (element : DataType, index : number, source : WrapperType) => number | Promise<number>,
        thisArg : any = null) : KoconutPrimitive<number> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>).setPrevYieldable(this).setProcessor(async () => {
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


    taken(
        n : number) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = this.data ? Array.from(this.data).filter((_, index) => index < n) : new Array<DataType>();
            if(this.data instanceof Array) return processedArray as WrapperType
            else return new Set(processedArray) as WrapperType
        })
        return koconutToReturn

    }


    takeWhile(
        predicate : (element : DataType, index : number, source : WrapperType) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>).setPrevYieldable(this).setProcessor(async () => {
            var processedArray = new Array<DataType>();
            if(this.data != null) {
                let predicateIndex = 0
                for(const [index, element] of this.data.entries()) {
                    if(!await predicate(element, index as number, this.data)) break
                    predicateIndex++
                }
                processedArray = Array.from(this.data).filter((_, index) => index < predicateIndex)
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
    toSet() : KoconutCollection<DataType, Set<DataType>> {

        const koconutToReturn = new KoconutCollection<DataType, Set<DataType>>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>).setPrevYieldable(this).setProcessor(async () => {
            return new Set(this.data)
        })
        return koconutToReturn

    }


    // toShortArray
    // toSortedSet
    // toUByteArray
    // toUIntArray
    // toULongArray
    union(
        other : Iterable<DataType>) : KoconutCollection<DataType, Set<DataType>> {

        const koconutToReturn = new KoconutCollection<DataType, Set<DataType>>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedSet = new Set(this.data)
            for(const eachData of other) processedSet.add(eachData)
            return processedSet
        })
        return koconutToReturn

    }

    // unzip
    // waitForMultipleFutures

    windowed(
        size : number) : KoconutCollection<Array<DataType>, Array<Array<DataType>>>;
    windowed(
        size : number,
        step : number) : KoconutCollection<Array<DataType>, Array<Array<DataType>>>;
    windowed(
        size : number,
        step : number,
        partialWindows : boolean) : KoconutCollection<Array<DataType>, Array<Array<DataType>>>;
    windowed<ReturnType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutCollection<ReturnType, Array<ReturnType>>;
    windowed<ReturnType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutCollection<ReturnType, Array<ReturnType>>;
    windowed<ReturnType>(
        size : number,
        step : number = 1,
        partialWindows : boolean = false,
        transform : ((elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) | null = null,
        thisArg : any = null) : KoconutCollection<ReturnType | Array<DataType>, Array<ReturnType | Array<DataType>>> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ReturnType | Array<DataType>, Array<ReturnType | Array<DataType>>>();
        (koconutToReturn as any as KoconutOpener<Array<ReturnType | Array<DataType>>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<Array<DataType>>();
            if(this.data != null) {
                let currentIndex = 0;
                const dataArray = Array.from(this.data)
                while(currentIndex < dataArray.length) {
                    const eachChunkedData = dataArray.slice(currentIndex, currentIndex + size)
                    currentIndex += step
                    if(partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData)
                }
            }
            if(transform) {
                const transformedArray = new Array<ReturnType>();
                for(let eachProcessedIndex in processedArray)
                    transformedArray.push(await transform(processedArray[eachProcessedIndex], parseInt(eachProcessedIndex), processedArray))
                return transformedArray
            }
            return processedArray
        })
        return koconutToReturn

    }


    zip<OtherDataType>(
        other : Iterable<OtherDataType>) : KoconutCollection<Pair<DataType, OtherDataType>, Array<Pair<DataType, OtherDataType>>>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) : KoconutCollection<ResultDataType, Array<ResultDataType>>
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any) : KoconutCollection<ResultDataType, Array<ResultDataType>>
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : ((originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null) : KoconutCollection<Pair<DataType, OtherDataType> | ResultDataType, Array<Pair<DataType, OtherDataType> | ResultDataType>> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<Pair<DataType, OtherDataType> | ResultDataType, Array<Pair<DataType, OtherDataType> | ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, OtherDataType> | ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<Pair<DataType, OtherDataType>>()
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                const otherArray = Array.from(other)
                const minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length
                for(let eachIndex = 0 ; eachIndex < minLength ; eachIndex++)
                    processedArray.push(new Pair(dataArray[eachIndex], otherArray[eachIndex]))
            }
            if(transform) {
                const transformedArray = new Array<ResultDataType>();
                for(let eachProcessedData of processedArray)
                    transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
                return transformedArray
            }
            return processedArray
        })
        return koconutToReturn

    }


    zipWithNext() : KoconutCollection<Pair<DataType, DataType>, Array<Pair<DataType, DataType>>>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) : KoconutCollection<ResultDataType, Array<ResultDataType>>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any) : KoconutCollection<ResultDataType, Array<ResultDataType>>;
    zipWithNext<ResultDataType>(
        transform : ((firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null) : KoconutCollection<Pair<DataType, DataType> | ResultDataType, Array<Pair<DataType, DataType> | ResultDataType>> {
        
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<Pair<DataType, DataType> | ResultDataType, Array<Pair<DataType, DataType> | ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, DataType> | ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<Pair<DataType, DataType>>();
            if(this.data != null) {
                const dataArray = Array.from(this.data)
                for(let eachIndex = 0 ; eachIndex < dataArray.length - 1 ; eachIndex++) 
                    processedArray.push(new Pair(dataArray[eachIndex], dataArray[eachIndex + 1]))
            }
            if(transform) {
                const transformedArray = new Array<ResultDataType>();
                for(let eachProcessedData of processedArray)
                    transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
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
