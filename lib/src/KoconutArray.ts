import { SetterUnlocker } from "./Interface"
import { KoconutPair } from "./KoconutPair"
import { KoconutMap } from "./KoconutMap"
import { KoconutPrimitive } from "./KoconutPrimitive"
import { KoconutSet } from "./KoconutSet"

export class KoconutArray<DataType> extends KoconutPrimitive<Array<DataType>> {

    all(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachIndex in this.data) 
                if(!await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) return false
            return true
        })
        return koconutToReturn
    }

    any(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachIndex in this.data)
                if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) return true
            return false
        })
        return koconutToReturn
    }

    asIterable() : KoconutPrimitive<Iterable<DataType>> {
        const koconutToReturn = new KoconutPrimitive<Iterable<DataType>>();
        (koconutToReturn as any as SetterUnlocker<Iterable<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Iterable<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) return this.data
            else return processedArray
        })
        return koconutToReturn
    } 

    // asSequence

    associate<KeyType, ValueType> (transform : (element : DataType, index : number, sourceArray : Array<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>, thisArg : any = null) : KoconutMap<KeyType, ValueType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, ValueType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, ValueType>>).setProcessor(async () => {
            const processedMap = new Map<KeyType, ValueType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachPair = await transform(this.data[eachIndex], parseInt(eachIndex), this.data)
                    processedMap.set(eachPair.first, eachPair.second)
                }
            }
            return processedMap
        })
        return koconutToReturn
    }

    associateBy<KeyType, ValueType = DataType>(
        keySelector : (element : DataType, index : number, sourceArray : Array<DataType>) => KeyType | Promise<KeyType>, 
        valueTransform : ((element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null, valueTransformThisArg : any = null) : KoconutMap<KeyType, ValueType> {
        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, ValueType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, ValueType>>).setProcessor(async () => {
            const processedMap = new Map<KeyType, ValueType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachKey = await keySelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    processedMap.set(eachKey, valueTransform ? await valueTransform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex] as any as ValueType)
                }
            }
            return processedMap
        })
        return koconutToReturn
    }

    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>, 
        keySelector : (element : DataType, index : number, sourceArray : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null, valueTransformThisArg : any = null) : KoconutArray<DataType> {
        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachKey = await keySelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    destination.set(eachKey, valueTransform ? await valueTransform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex] as any as ValueType)
                }
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    associateTo<KeyType, ValueType> (
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, sourceArray : Array<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null) : KoconutArray<DataType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachPair = await transform(this.data[eachIndex], parseInt(eachIndex), this.data)
                    destination.set(eachPair.first, eachPair.second)
                }
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    associateWith<ValueType> (valueSelector : (element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>, thisArg : any = null) : KoconutMap<number, ValueType> {
        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutMap<number, ValueType>();
        (koconutToReturn as any as SetterUnlocker<Map<number, ValueType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Map<number, ValueType>>).setProcessor(async () => {
            const processedMap = new Map<number, ValueType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachValue = await valueSelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    processedMap.set(parseInt(eachIndex), eachValue)
                }
            }
            return processedMap  
        })
        return koconutToReturn
    }

    associateWithTo<ValueType> (destination : Map<number, ValueType>, valueSelector : (element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>, thisArg : any = null) : KoconutArray<DataType> {
        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachValue = await valueSelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    destination.set(parseInt(eachIndex), eachValue)
                }
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    chunked(size : number) : KoconutArray<Array<DataType>>;
    chunked<ReturnType>(size : number, transform : (elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>;
    chunked<ReturnType>(size : number, transform : (elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>, thisArg : any) : KoconutArray<ReturnType>;
    chunked<ReturnType>(size : number, transform : ((elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) | null = null, thisArg : any = null) : KoconutArray<Array<DataType> | ReturnType> {
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>> | Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>> | Array<ReturnType>>).setProcessor(async () => {
            const processedArray = new Array<Array<DataType>>()
            if(this.data != null) {
                let currentIndex = 0
                while(currentIndex < this.data.length) {
                    const eachChunkedData = this.data.slice(currentIndex, currentIndex + size)
                    currentIndex += size
                    processedArray.push(eachChunkedData)
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
    /*
    chunked(size: number) : KoconutArray<Array<DataType>> {
        const koconutToReturn = new KoconutArray<Array<DataType>>();
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>>>).setProcessor(async () => {
            const processedArray = new Array<Array<DataType>>()
            if(this.data != null) {
                while(this.data.length) {
                    processedArray.push(this.data.slice(0, size))
                    this.data = this.data.slice(size)
                }
            }
            return processedArray
        })
        return koconutToReturn
    }
    */

    contains(element : DataType) : KoconutPrimitive<boolean> {
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachIndex in this.data) 
                if(element == this.data[eachIndex]) return true
            return false
        })
        return koconutToReturn
    }

    containsAll(elements : Array<DataType> | Set<DataType>) : KoconutPrimitive<boolean> {
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false;
            for(let eachElement of elements) 
                if(!this.data.includes(eachElement)) return false
            return true
        })
        return koconutToReturn
    }

    count(predicate : ((element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>) | null = null, thisArg : any = null) : KoconutPrimitive<number> {
        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            if(this.data == null) return 0
            if(!predicate) return this.data.length
            let count = 0
            for(let eachIndex in this.data) {
                if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) count++
            }
            return count
        })
        return koconutToReturn
    }

    distinct() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () =>{
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    if(!processedArray.includes(this.data[eachIndex]))
                        processedArray.push(this.data[eachIndex])
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    distinctBy<KeyType>(selector : (element : DataType, index : number, sourceArray : Array<DataType>) => KeyType | Promise<KeyType>, thisArg : any = null) : KoconutArray<DataType> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                const keyArray = new Array<KeyType>()
                for(let eachIndex in this.data) {
                    const eachKey = await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    if(!keyArray.includes(eachKey)) {
                        keyArray.push(eachKey)
                        processedArray.push(this.data[eachIndex])
                    }
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    drop(n : number) : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data == null) return new Array<DataType>()
            return this.data.slice(n)
        })
        return koconutToReturn
    }
    
    dropWhile(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data == null) return new Array<DataType>()
            let indexNumber = this.data.length
            for(let eachIndex in this.data) {
                if(!await predicate(this.data[eachIndex], parseInt(eachIndex), this.data))  {
                    indexNumber = parseInt(eachIndex)
                    break
                }
            }
            return this.data.slice(indexNumber)
        })
        return koconutToReturn
    }

    elementAt(index : number) : KoconutPrimitive<DataType | null> {
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            const length = this.data.length
            while(index < 0) index += length
            while(index >= length) index -= length
            return this.data[index]
        })
        return koconutToReturn
    }

    elementAtOrElse(index : number, defaultValue : DataType) : KoconutPrimitive<DataType> {
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as SetterUnlocker<DataType>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType>).setProcessor(async () => {
            if(this.data == null) return defaultValue
            const length = this.data.length
            if(index < 0 || index >= length) return defaultValue
            return this.data[index]
        })
        return koconutToReturn
    }

    elementAtOrNull(index : number) : KoconutPrimitive<DataType | null> {
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            const length = this.data.length
            if(index < 0 || index >= length) return null
            return this.data[index]
        })
        return koconutToReturn
    }


    filter(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data)
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) processedArray.push(this.data[eachIndex])
            }
            return processedArray
        })
        
        return koconutToReturn
    }

    // filterIsInstance
    // filterIsInstanceTo

    filterNot(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data)
                    if(!await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) processedArray.push(this.data[eachIndex])
            }
            return processedArray
        })
        
        return koconutToReturn
    }

    filterNotNull() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>();
            if(this.data != null) {
                for(let eachIndex in this.data)
                    if(this.data[eachIndex] != null) processedArray.push(this.data[eachIndex])
            }
            return processedArray
        })
        return koconutToReturn
    }

    filterNotNullTo(destination : Array<DataType>) : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) 
                    if(this.data[eachIndex] != null) destination.push(this.data[eachIndex])
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    filterNotTo(destination : Array<DataType>,
        predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) 
                    if(!await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) destination.push(this.data[eachIndex])
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    filterTo(destination : Array<DataType>,
        predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) 
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) destination.push(this.data[eachIndex])
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    find(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        predicate = predicate.bind(this)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            for(let eachIndex in this.data) 
                if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) 
                    return this.data[eachIndex]
            return null
        })
        return koconutToReturn
    }

    findLast(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        predicate = predicate.bind(this)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            let foundData : DataType | null = null
            for(let eachIndex in this.data) 
                if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) {
                    foundData = this.data[eachIndex]
                }
            return foundData
        })
        return koconutToReturn
    }

    first(predicate : ((element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>) | null = null, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        if(predicate) predicate = predicate.bind(this)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            if(predicate) {
                for(let eachIndex in this.data) {
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data))
                        return this.data[eachIndex]
                }
            } else if(this.data.length > 0) return this.data[0]
            return null
        })
        return koconutToReturn
    }

    // firstOrNull

    flatMap<ResultDataType>(transform : (element : DataType, index : number, sourceArray : Array<DataType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>, thisArg : any = null) : KoconutArray<ResultDataType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as SetterUnlocker<Array<ResultDataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<ResultDataType>>).setProcessor(async () => {
            const processedArray = new Array<ResultDataType>()
            if(this.data != null) {
                for(let eachIdex in this.data) {
                    for(let eachSubData of await transform(this.data[eachIdex], parseInt(eachIdex), this.data))
                        processedArray.push(eachSubData)
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    flatMapTo<ResultDataType>(destination : Array<ResultDataType>, transform : (element : DataType, index : number, sourceArray : Array<DataType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>, thisArg : any = null) : KoconutArray<DataType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIdex in this.data) {
                    for(let eachSubData of await transform(this.data[eachIdex], parseInt(eachIdex), this.data))
                        destination.push(eachSubData)
                }
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    // flatten
    
    fold<ReturnType>(initial : ReturnType, operation : (acc : ReturnType, element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType>, thisArg : any = null) : KoconutPrimitive<ReturnType> {
        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ReturnType>();
        (koconutToReturn as any as SetterUnlocker<ReturnType>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<ReturnType>).setProcessor(async () => {
            let dataToReturn = initial
            if(this.data != null) {
                for(let eachIndex in this.data) 
                    dataToReturn = await operation(dataToReturn, this.data[eachIndex], parseInt(eachIndex), this.data)
            }
            return dataToReturn
        })
        return koconutToReturn
    }

    // foldIndexed
    forEach(action : (element : DataType, index : number, sourceArray : Array<DataType>) => void | Promise<void>, thisArg : any = null) : KoconutArray<DataType> {
        action = action.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data)
                    await action(this.data[eachIndex], parseInt(eachIndex), this.data)
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }
    // forEachIndexed

    groupBy<KeyType, ValueType = DataType>(
        keySelector : (element : DataType, index : number, sourceArray : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null, valueTransformThisArg : any = null
    ) : KoconutMap<KeyType, Array<ValueType>> {
        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, Array<ValueType>>();
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, Array<ValueType>>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, Array<ValueType>>>).setProcessor(async () => {
            const processedMap = new Map<KeyType, Array<ValueType>>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachKey = await keySelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    const eachValue = valueTransform ? await valueTransform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex]
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
        keySelector : (element : DataType, index : number, sourceArray : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, sourceArray : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null, valueTransformThisArg : any = null
    ) : KoconutArray<DataType> {
        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachKey = await keySelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    const eachValue = valueTransform ? await valueTransform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex]
                    if(!destination.has(eachKey)) destination.set(eachKey, new Array())
                    destination.get(eachKey)?.push(eachValue as ValueType)
                }

                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    // groupingBy

    indexOf(element : DataType) : KoconutPrimitive<number> {
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) 
                    if(this.data[eachIndex] == element) return parseInt(eachIndex)
            }
            return -1
        })
        return koconutToReturn
    }

    indexOfFirst(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<number> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data)
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) return parseInt(eachIndex)
            }
            return -1
        })
        return koconutToReturn
    }

    indexOfLast(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<number> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex = this.data.length - 1 ; eachIndex >= 0 ; eachIndex--) 
                    if(await predicate(this.data[eachIndex], eachIndex, this.data)) return eachIndex
            }
            return -1
        })
        return koconutToReturn
    }

    intersect(other : Array<DataType>) : KoconutSet<DataType> {
        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setProcessor(async () => {
            const processedSet = new Set<DataType>()
            if(this.data != null) {
                this.data.forEach(eachSourceItem => processedSet.add(eachSourceItem))
                other.forEach(eachOtherItem => processedSet.add(eachOtherItem))
            }
            return processedSet
        })
        return koconutToReturn
    }

    isNotEmpty() : KoconutPrimitive<boolean> {
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return false
            return true
        })
        return koconutToReturn
    }

    // isNullOrEmpty

    // joinTo
    // joinToString
    join(
        buffer : string,
        separator : string =", ",
        prefix : string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType, index : number, sourceArray : Array<DataType>) => any) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<string> {
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<string>();
        (koconutToReturn as any as SetterUnlocker<string>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<string>).setProcessor(async () => {
            let resultString = buffer + prefix
            if(this.data != null) {
                let currentCount = 0
                for(let eachIndex in this.data) {
                    if(currentCount == limit) {
                        resultString += truncated
                        break
                    }
                    resultString += transform ? await transform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex]
                    currentCount++
                    if(currentCount != this.data.length && currentCount != limit) resultString += separator
                }
            }
            resultString += postfix
            return resultString
        })
        return koconutToReturn
    }

    last() : KoconutPrimitive<DataType | null> {
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            return this.data[this.data.length - 1]
        })
        return koconutToReturn
    }

    lastIndexOf(element : DataType) : KoconutPrimitive<number> {
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            if(this.data != null)
                for(let eachIndex = this.data.length - 1 ; eachIndex >= 0 ; eachIndex--)
                    if(element == this.data[eachIndex]) return eachIndex
            return -1
        })
        return koconutToReturn
    }

    // lastOrNull

    map<ReturnType>(transform : (element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType>, thisArg : any = null) : KoconutArray<ReturnType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setProcessor(async () => {
            const processedArray = new Array<ReturnType>()
            if(this.data != null) {
                for(let eachIndex in this.data)
                    processedArray.push(await transform(this.data[eachIndex], parseInt(eachIndex), this.data))
            }
            return processedArray
        })
        return koconutToReturn
    }

    // mapIndexed
    // mapIndexedNotNull
    // mapIndexedNotNullTo
    // mapIndexedTo
    
    mapNotNull<ReturnType>(transform : (element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType> | null | Promise<null>, thisArg : any = null) : KoconutArray<ReturnType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setProcessor(async () => {
            const processedArray = new Array<ReturnType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachDataToAdd = await transform(this.data[eachIndex], parseInt(eachIndex), this.data)
                    if(eachDataToAdd != null) processedArray.push(eachDataToAdd)
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    mapNotNullTo<ReturnType>(destination : Array<ReturnType>, trasnform : (element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType> | null | Promise<null>, thisArg : any = null) : KoconutArray<DataType> {
        trasnform = trasnform.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                if(this.data != null) {
                    for(let eachIndex in this.data) {
                        const eachDataToAdd = await trasnform(this.data[eachIndex], parseInt(eachIndex), this.data)
                        if(eachDataToAdd != null) destination.push(eachDataToAdd)
                    }
                }
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    mapTo<ReturnType>(destination : Array<ReturnType>, transform : (element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType>, thisArg : any = null) : KoconutArray<DataType> {
        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data)
                    destination.push(await transform(this.data[eachIndex], parseInt(eachIndex), this.data))
                return this.data
            } else return new Array()
        })
        return koconutToReturn
    }

    maxBy<ComparableType>(selector : (element : DataType, index : number, sourceArray : Array<DataType>) => ComparableType | Promise<ComparableType>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            let dataToReturn : DataType | null = null
            let lastComparable : ComparableType | null = null
            for(let eachIndex in this.data) {
                const eachComparable = await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                if(lastComparable == null || lastComparable < eachComparable) {
                    dataToReturn = this.data[eachIndex]
                    lastComparable = eachComparable
                }
            }
            return dataToReturn
        })
        return koconutToReturn
    }

    maxWith(comparator : (front : DataType, rear : DataType) => number | Promise<number>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            let dataToReturn : DataType | null = null
            for(let eachIndex in this.data ) {
                if(dataToReturn == null || await comparator(dataToReturn, this.data[eachIndex]) < 0) 
                    dataToReturn = this.data[eachIndex]
            }
            return dataToReturn
        })
        return koconutToReturn
    }

    minBy<ComparableType>(selector : (element : DataType, index : number , sourceArray : Array<DataType>) => ComparableType | Promise<ComparableType>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            let dataToReturn : DataType | null = null
            let lastComparable : ComparableType | null = null
            for(let eachIndex in this.data) {
                const eachComparable = await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                if(lastComparable == null || lastComparable < eachComparable) {
                    dataToReturn = this.data[eachIndex]
                    lastComparable = eachComparable
                }
            }
            return dataToReturn
        })
        return koconutToReturn
    }

    minus(elements : Array<DataType> | Set<DataType>) : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data == null) return new Array()
            else return Array.from(this.data).filter(eachData => {
                if(elements instanceof Array) return elements.includes(eachData)
                else return elements.has(eachData)
            })
        })
        return koconutToReturn
    }

    // minusElement

    minWith(comparator : (front : DataType, read : DataType) => number | Promise<number>, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            let dataToReturn : DataType | null = null
            for(let eachIndex in this.data) {
                if(dataToReturn == null || await comparator(dataToReturn, this.data[eachIndex]) > 0)
                    dataToReturn = this.data[eachIndex]
            }
            return dataToReturn
        })
        return koconutToReturn
    }

    none(predicate : ((element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>) | null = null, thisArg : any = null) : KoconutPrimitive<boolean> {
        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return true
            if(predicate) {
                for(let eachIdex in this.data) {
                    if(await predicate(this.data[eachIdex], parseInt(eachIdex), this.data)) return false
                }
                return true
            } else return false
        })
        return koconutToReturn
    }

    // onEach
    orEmpty() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) return this.data
            else return new Array()
        })
        return koconutToReturn
    }

    partition(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<KoconutPair<Array<DataType>, Array<DataType>>> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<KoconutPair<Array<DataType>, Array<DataType>>>();
        (koconutToReturn as any as SetterUnlocker<KoconutPair<Array<DataType>, Array<DataType>>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<KoconutPair<Array<DataType>, Array<DataType>>>).setProcessor(async () => {
            const processedFirstArray = new Array<DataType>()
            const processedSecondArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) processedFirstArray.push(this.data[eachIndex])
                    else processedSecondArray.push(this.data[eachIndex])
                }
            }
            return new KoconutPair(processedFirstArray, processedSecondArray)
        })
        return koconutToReturn
    }

    plus(elements : Array<DataType> | Set<DataType>) : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = this.data ? this.data : new Array()
            for(let eachElement of elements) processedArray.push(eachElement)
            return processedArray
        })
        return koconutToReturn
    }

    // plusElement
    randomOrNull() : KoconutPrimitive<DataType | null> {
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            return this.data[Math.floor(Math.random() * this.data.length)]
        })
        return koconutToReturn
    }

    // reduce
    // reduceIndexed
    // reduceOrNull
    
    requireNoNulls() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            return this.data ? this.data?.filter(eachData => eachData != null && eachData != undefined) : new Array()
        })
        return koconutToReturn
    }

    reversed() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            return this.data ? this.data.reverse() : new Array()
        })
        return koconutToReturn
    }

    scan<ReturnType>(initial : ReturnType, operation : (acc : ReturnType, element : DataType, index : number, sourceArray : Array<DataType>) => ReturnType | Promise<ReturnType>, thisArg : any = null) : KoconutArray<ReturnType> {
        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<ReturnType>>).setProcessor(async () => {
            const processedArray = [initial]
            let lastAcc = initial
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    lastAcc = await operation(lastAcc, this.data[eachIndex], parseInt(eachIndex), this.data)
                    processedArray.push(lastAcc)
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    // scanIndexed
    // scanReduce
    // scanReduceIndexed

    shuffled() : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                const randomIndexArray = new Array<number>()
                while(randomIndexArray.length < this.data.length) {
                    const eachRandomIndex = Math.floor(Math.random() * this.data.length)
                    if(!randomIndexArray.includes(eachRandomIndex)) randomIndexArray.push(eachRandomIndex)
                }
                for(let eachRandomIndex of randomIndexArray) processedArray.push(this.data[eachRandomIndex])
            }
            return processedArray
        })
        return koconutToReturn
    }

    // single
    singleOrNull(predicate : ((element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>) | null = null, thisArg : any = null) : KoconutPrimitive<DataType | null> {
        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null || !this.data.length) return null
            if(predicate) {
                let dataToReturn : DataType | null = null
                for(let eachIndex in this.data) {
                    if(await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) {
                        if(dataToReturn == null) dataToReturn = this.data[eachIndex]
                        else return null
                    }
                }
                return dataToReturn
            } else {
                if(this.data.length > 1) return null
                else return this.data[0]
            }
        })
        return koconutToReturn
    }

    sortedBy<ComparableType>(selector : (element : DataType, index : number, sourceArray : Array<DataType>) => ComparableType | Promise<ComparableType>, thisArg : any = null) : KoconutArray<DataType> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const currentComparable = await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    let startIndex = 0
                    let middleIndex : number
                    let endIndex = processedArray.length
                    while(startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2)
                        if(currentComparable >= await selector(this.data[middleIndex], middleIndex, this.data)) startIndex = middleIndex + 1
                        else endIndex = middleIndex
                    }
                    processedArray.splice(endIndex, 0, this.data[eachIndex])
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    sortedByDescending<ComparableType>(selector : (element : DataType, index : number, sourceArray : Array<DataType>) => ComparableType | Promise<ComparableType>, thisArg : any = null) : KoconutArray<DataType> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const currentComparable = await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    let startIndex = 0
                    let middleIndex : number
                    let endIndex = processedArray.length
                    while(startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2)
                        if(currentComparable <= await selector(this.data[middleIndex], middleIndex, this.data)) startIndex = middleIndex + 1
                        else endIndex = middleIndex
                    }
                    processedArray.splice(endIndex, 0, this.data[eachIndex])
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    sortedWith(comparator : (front : DataType, rear : DataType) => number | Promise<number>, thisArg : any = null) : KoconutArray<DataType> {
        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            const processedArray = new Array<DataType>()
            if(this.data != null) {
                for(let eachData of this.data) {
                    let startIndex = 0
                    let middleIndex : number
                    let endIndex = processedArray.length
                    while(startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2)
                        if(await comparator(eachData, this.data[middleIndex]) >= 0) startIndex = middleIndex + 1
                        else endIndex = middleIndex
                    }
                    processedArray.splice(endIndex, 0, eachData)
                }
            }
            return processedArray
        })
        return koconutToReturn
    }

    substract(other : Array<DataType> | Set<DataType>) : KoconutSet<DataType> {
        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setProcessor(async () => {
            const processedSet = new Set(this.data)
            other.forEach((eachOtherElement : DataType) => { processedSet.delete(eachOtherElement) })
            return processedSet
        })
        return koconutToReturn
    }

    sumBy(selector : (element : DataType, index : number, sourceArray : Array<DataType>) => number | Promise<number>, thisArg : any = null) : KoconutPrimitive<number> {
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as SetterUnlocker<number>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<number>).setProcessor(async () => {
            let sum = 0
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    sum += await selector(this.data[eachIndex], parseInt(eachIndex), this.data)
                }
            }
            return sum
        })
        return koconutToReturn
    }

    // subByDouble
    take(n : number) : KoconutArray<DataType> {
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data == null) return new Array()
            else return this.data.filter((_, eachIndex) => eachIndex < n)
        })
        return koconutToReturn
    }

    takeWhile(predicate : (element : DataType, index : number, sourceArray : Array<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutArray<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data == null) return new Array()
            let predicateIndex = 0
            for(let eachIndex in this.data) {
                if(!await predicate(this.data[eachIndex], parseInt(eachIndex), this.data)) break
                predicateIndex++
            }
            return this.data.filter((_, eachIndex) => eachIndex < predicateIndex)
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
    toSet() : KoconutSet<DataType> {
        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setProcessor(async () => new Set(this.data))
        return koconutToReturn
    }

    // toShortArray
    // toSortedSet
    // toUByteArray
    // toUIntArray
    // toULongArray
    union(other : Array<DataType> | Set<DataType>) : KoconutSet<DataType> {
        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setProcessor(async () => {
            const processedSet = new Set(this.data)
            for(let eachOtherElement of other) processedSet.add(eachOtherElement)
            return processedSet
        })
        return koconutToReturn
    }

    // unzip
    // waitForMultipleFutures
    windowed(size : number) : KoconutArray<Array<DataType>>;
    windowed(size : number, step : number) : KoconutArray<Array<DataType>>;
    windowed(size : number, step : number, partialWindows : boolean) : KoconutArray<Array<DataType>>;
    windowed<ReturnType>(size : number, step : number, partialWindows : boolean, 
        transform : (elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>
    windowed<ReturnType>(size : number, step : number, partialWindows : boolean, 
        transform : (elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutArray<ReturnType>
    windowed<ReturnType = DataType>(size : number, step : number = 1, partialWindows : boolean = false,
        transform : ((elements : Array<DataType>, index : number, sourceArray : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) | null = null,
        thisArg : any = null) : KoconutArray<Array<DataType> | ReturnType> {
        if(transform) transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>> | Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<Array<DataType>> | Array<ReturnType>>).setProcessor(async () => {
            const processedArray = Array<Array<DataType>>()
            if(this.data != null) {
                let currentIndex = 0
                while(currentIndex < this.data.length) {
                    const eachChunkedData = this.data.slice(currentIndex, currentIndex + size)
                    currentIndex += step
                    if(partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData)
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

    // withIndex
    zip<OtherDataType>(other : Array<OtherDataType>) : KoconutArray<KoconutPair<DataType, OtherDataType>>;
    zip<OtherDataType, ReturnType>(other : Array<OtherDataType>, transform : (originalData : DataType, otherData : OtherDataType) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>;
    zip<OtherDataType, ReturnType>(other : Array<OtherDataType>, transform : (originalData : DataType, otherData : OtherDataType) => ReturnType | Promise<ReturnType>, thisArg : any) : KoconutArray<ReturnType>;
    zip<OtherDataType, ReturnType>(other : Array<OtherDataType>, transform : ((originalData : DataType, otherData : OtherDataType) => ReturnType | Promise<ReturnType>) | null = null, thisArg : any = null) : KoconutArray<KoconutPair<DataType, OtherDataType> | ReturnType> {
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<KoconutPair<DataType, OtherDataType> | ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<KoconutPair<DataType, OtherDataType>> | Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<KoconutPair<DataType, OtherDataType>> | Array<ReturnType>>).setProcessor(async () => {
            const processedArray = new Array<KoconutPair<DataType, OtherDataType>>()
            if(this.data != null) {
                const minLength = this.data.length < other.length ? this.data.length : other.length
                for(let eachIndex = 0 ; eachIndex < minLength ; eachIndex++) 
                    processedArray.push(new KoconutPair(this.data[eachIndex], other[eachIndex]))
            }
            if(transform) {
                const transformedArray = new Array<ReturnType>()
                for(let eachProcessedData of processedArray)
                    transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
                return transformedArray
            }
            return processedArray
        })
        return koconutToReturn
    }

    zipWithNext() : KoconutArray<KoconutPair<DataType, DataType>>;
    zipWithNext<ReturnType>(transform : (front : DataType, rear : DataType) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>
    zipWithNext<ReturnType>(transform : (front : DataType, rear : DataType) => ReturnType | Promise<ReturnType>, thisArg : any) : KoconutArray<ReturnType>
    zipWithNext<ReturnType>(transform : ((front : DataType, rear : DataType) => ReturnType | Promise<ReturnType>) | null = null, thisArg : any = null) : KoconutArray<KoconutPair<DataType, DataType> | ReturnType> {
        if(transform) transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<KoconutPair<DataType, DataType> | ReturnType>();
        (koconutToReturn as any as SetterUnlocker<Array<KoconutPair<DataType, DataType>> | Array<ReturnType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<KoconutPair<DataType, DataType>> | Array<ReturnType>>).setProcessor(async () => {
            const processedArray = new Array<KoconutPair<DataType, DataType>>()
            if(this.data != null) {
                for(let eachIndex = 0 ; eachIndex < this.data.length - 1 ; eachIndex++) 
                    processedArray.push(new KoconutPair(this.data[eachIndex], this.data[eachIndex + 1]))
            }
            if(transform) {
                const transformedArray = new Array<ReturnType>()
                for(let eachProcessedData of processedArray)
                    transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
                return transformedArray
            }
            return processedArray
        })
        return koconutToReturn
    }

}
