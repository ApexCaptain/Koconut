import { SetterUnlocker } from "./Interface"
import { KoconutPair } from "./KoconutPair"
import { KoconutMap } from "./KoconutMap"
import { KoconutPrimitive } from "./KoconutPrimitive"

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
        keySelectorThisArgs : any = null, valueTransformThisArgs : any = null) : KoconutMap<KeyType, ValueType> {
        keySelector = keySelector.bind(keySelectorThisArgs)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArgs)
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
        keySelectorThisArgs : any = null, valueTransformThisArgs : any = null) : KoconutArray<DataType> {
        keySelector = keySelector.bind(keySelectorThisArgs)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArgs)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Array<DataType>>).setProcessor(async () => {
            if(this.data != null) {
                for(let eachIndex in this.data) {
                    const eachKey = await keySelector(this.data[eachIndex], parseInt(eachIndex), this.data)
                    destination.set(eachKey, valueTransform ? await valueTransform(this.data[eachIndex], parseInt(eachIndex), this.data) : this.data[eachIndex] as any as ValueType)
                }
                return this.data as Array<DataType>
            } else return new Array<DataType>()
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
                return this.data as Array<DataType>
            } else return new Array<DataType>()
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
                return this.data as Array<DataType>
            } else return new Array<DataType>()
        })
        return koconutToReturn
    }

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

    containsAll(elements : Array<DataType>) : KoconutPrimitive<boolean> {
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false;
            for(let eachElementindex in elements)
                if(!this.data.includes(elements[eachElementindex])) return false
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
                return this.data as Array<DataType>
            } else return new Array<DataType>()
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
                return this.data as Array<DataType>
            } else return new Array<DataType>()
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
                return this.data as Array<DataType>
            } else return new Array<DataType>()
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

    

}