import { KoconutPrimitive } from "./KoconutPrimitive"
import { SetterUnlocker } from "./Interface"
export class KoconutSet<DataType> extends KoconutPrimitive<Set<DataType>> {
    all(predicate : (element : DataType, index : number, sourceSet : Set<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            const spreadedData = Array.from(this.data)
            for(let eachIndex in spreadedData)
                if(!await predicate(spreadedData[eachIndex], parseInt(eachIndex), this.data)) return false
            return true
        })
        return koconutToReturn
    }

    any(predicate : (element : DataType, index : number, sourceSet : Set<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutPrimitive<boolean> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as SetterUnlocker<boolean>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<boolean>).setProcessor(async () => {
            if(this.data == null) return false
            const spreadedData = Array.from(this.data)
            for(let eachIndex in spreadedData)
                if(await predicate(spreadedData[eachIndex], parseInt(eachIndex), this.data)) return true
            return false
        })
        return koconutToReturn
    }

    filter(predicate : (element : DataType, index : number, sourceSet : Set<DataType>) => boolean | Promise<boolean>, thisArg : any = null) : KoconutSet<DataType> {
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<Set<DataType>>).setProcessor(async () => {
            const processedSet = new Set<DataType>()
            if(this.data != null) {
                const spreadedData = Array.from(this.data)
                for(let eachIndex in spreadedData)
                    if(await predicate(spreadedData[eachIndex], parseInt(eachIndex), this.data)) processedSet.add(spreadedData[eachIndex])
            }
            return processedSet
        })
        return koconutToReturn
    }
}