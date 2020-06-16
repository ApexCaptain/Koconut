import { KoconutPrimitive, KoconutOpener, KoconutPair } from "../KoconutBase"
import { KoconutMap } from "../map/KoconutMap"



export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutPrimitive<WrapperType> {

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
    

    chunked(
        size : number) : KoconutCollection<WrapperType, Array<WrapperType>>;
    chunked<ReturnType>(
        size : number,
        transform : (elements : WrapperType, index : number, source : Array<WrapperType>) => ReturnType | Promise<ReturnType>) : KoconutCollection<ReturnType, Array<ReturnType>>;
    chunked<ReturnType>(
        size : number,
        transform : (elements : WrapperType, index : number, source : Array<WrapperType>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutCollection<ReturnType, Array<ReturnType>>;
    chunked<ReturnType>(
        size : number, 
        transform : ((elements : WrapperType, index : number, source : Array<WrapperType>) => ReturnType | Promise<ReturnType>) | null = null, 
        thisArg : any = null) : KoconutCollection<WrapperType | ReturnType, Array<WrapperType> | Array<ReturnType>> {
        
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<WrapperType | ReturnType, Array<WrapperType> | Array<ReturnType>>();
        (koconutToReturn as any as KoconutOpener<Array<WrapperType> | Array<ReturnType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = Array<WrapperType>()
            if(this.data != null) {
                let currentIndex = 0
                let dataArray = Array.from(this.data)
                while(currentIndex < dataArray.length) {
                    const eachChunkedData = dataArray.slice(currentIndex, currentIndex + size)
                    currentIndex += size
                    processedArray.push(eachChunkedData as WrapperType)
                }
            }
            if(transform) {
                const transformedArray = new Array<ReturnType>()
                for(let eachProcessedIndex in processedArray)
                    transformedArray.push(await transform(processedArray[eachProcessedIndex], parseInt(eachProcessedIndex), processedArray))
                return transformedArray
            }
            return processedArray
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
        transform : (element : DataType, index : number, source : WrapperType) => Array<ResultDataType> | Promise<Array<ResultDataType>>) : KoconutCollection<ResultDataType, Array<ResultDataType>>;
    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any) : KoconutCollection<ResultDataType, Array<ResultDataType>>;
    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => Set<ResultDataType> | Promise<Set<ResultDataType>>,) : KoconutCollection<ResultDataType, Set<ResultDataType>>;
    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : WrapperType) => Set<ResultDataType> | Promise<Set<ResultDataType>>,
        thisArg : any) : KoconutCollection<ResultDataType, Set<ResultDataType>>;
    flatMap<ResultDataType> (
        transform : (element : DataType, index : number, source : WrapperType) => Array<ResultDataType> | Set<ResultDataType> | Promise<Array<ResultDataType>> | Promise<Set<ResultDataType>>,
        thisArg : any = null) : KoconutCollection<ResultDataType, Array<ResultDataType> | Set<ResultDataType>>{

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<ResultDataType, Array<ResultDataType> | Set<ResultDataType>>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType> | Set<ResultDataType>>).setPrevYieldable(this).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>();
            let isSet = false
            if(this.data != null) {
                for(const [index, element] of this.data.entries()) {
                    const subElements = await transform(element, index as number, this.data)
                    if(subElements instanceof Set) isSet = true
                    for(let eachSubData of subElements)
                        processedArray.push(eachSubData)
                }
            }
            if(isSet) return new Set(processedArray)
            else return processedArray
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
        other : Array<DataType> | Set<DataType>) : KoconutCollection<DataType, WrapperType> {

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
    // joinToString


}
export namespace KoconutCollection {
    export enum LOOP_SIGNAL {
        BREAK, CONTINUE
    }
}

