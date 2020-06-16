import { Yieldable, SetterUnlocker } from "./Interface"
export class KoconutPrimitive<DataType> implements Yieldable<DataType> {
    protected data : DataType | null
    protected processor? : () => Promise<DataType> | null
    protected prevYieldable? : Yieldable<any> | null

    protected setProcessor(processor : () => Promise<DataType>) { this.processor = processor }
    protected setPrevYieldable(prevYieldable : Yieldable<any>) { this.prevYieldable = prevYieldable }

    constructor(data : DataType | null = null) { this.data = data }
    
    async yield() : Promise<DataType | null> {
        if(this.prevYieldable != null) this.data = await this.prevYieldable.yield()
        if(this.processor != null) this.data = await this.processor()
        this.prevYieldable = null
        this.processor = undefined
        return this.data
    }
    
    run<ReturnType> (callback : () => Exclude<ReturnType, undefined> | null | Promise<ReturnType> | Promise<null>) : KoconutPrimitive<ReturnType | null> {
        callback = callback.bind(this.data)
        const koconutToReturn = new KoconutPrimitive<ReturnType | null>();
        (koconutToReturn as any as SetterUnlocker<ReturnType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<ReturnType | null>).setProcessor(async () => {
            return await callback()
        })
        return koconutToReturn
    }

    let<ReturnType> (callback : (element : DataType) => Exclude<ReturnType, undefined> | null | Promise<ReturnType> | Promise<null>) : KoconutPrimitive<ReturnType | null> {
        const koconutToReturn = new KoconutPrimitive<ReturnType | null>();
        (koconutToReturn as any as SetterUnlocker<ReturnType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<ReturnType | null>).setProcessor(async () => {
            if(this.data == null) return null
            const returnData = await callback(this.data)
            return returnData ? returnData : null
        })
        return koconutToReturn
    }

    apply(callback : () => void | Promise<void> ) : KoconutPrimitive<DataType | null> {
        callback = callback.bind(this.data)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            await callback()
            return this.data
        })
        return koconutToReturn
    }

    also (callback :(element : DataType) => DataType | Promise<DataType>) : KoconutPrimitive<DataType | null> {
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setPrevYieldable(this);
        (koconutToReturn as any as SetterUnlocker<DataType | null>).setProcessor(async () => {
            if(this.data == null) return null
            const returnData = await callback(this.data)
            return returnData ? returnData : null
        })
        return koconutToReturn
    }

    
}