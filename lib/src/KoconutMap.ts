import { KoconutPrimitive } from "./KoconutPrimitive"
import { SetterUnlocker } from "./Interface"
import { KoconutPair } from "./KoconutPair"
class Entry<KeyType, ValueType> {
    protected _key : KeyType
    protected _data : ValueType
    constructor(key : KeyType, data : ValueType) {
        this._key = key
        this._data = data
    }
    get key() : KeyType { return this._key }
    get data() : ValueType { return this._data }
    toPair() : KoconutPair<KeyType, ValueType> { return new KoconutPair(this._key, this._data) }
}
class MutableEntry<KeyType, DataType> extends Entry<KeyType, DataType> {
    set key(key : KeyType) { this._key = key }
    set data(data : DataType) { this._data = data }
}
export class KoconutMap<KeyType, DataType> extends KoconutPrimitive<Map<KeyType, DataType>> {
    all(predicate : (entry : Entry<KeyType, DataType>, sourceMap : Map<KeyType, DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachKey of Array.from(this.data.keys())) {
                const eachEntry = new Entry(eachKey, this.data.get(eachKey)!)
                if(!await predicate(eachEntry, this.data)) return false
            }
            return true
        })
        return koconutToReturn
    }

    any(predicate : (entry : Entry<KeyType, DataType>, sourceMap : Map<KeyType, DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            for(let eachKey of Array.from(this.data.keys())) {
                const eachEntry = new Entry(eachKey, this.data.get(eachKey)!)
                if(await predicate(eachEntry, this.data)) return true
            }
            return false
        })
        return koconutToReturn
    }

    filter(predicate : (entry : Entry<KeyType, DataType>, sourceMap : Map<KeyType, DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutMap<KeyType, DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, DataType>();
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Map<KeyType, DataType>>).setProcessor(async () => {
            const processedMap = new Map<KeyType, DataType>()
            if(this.data != null) {
                for(let eachKey of Array.from(this.data.keys())) {
                    const eachDatum = this.data.get(eachKey)!
                    const eachEntry = new Entry(eachKey, eachDatum)
                    if(await predicate(eachEntry, this.data)) processedMap.set(eachKey, eachDatum)
                }
            }
            return processedMap
        })
        return koconutToReturn
    }
}
