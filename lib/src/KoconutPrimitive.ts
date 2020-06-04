import { Yieldable } from "./Interface"
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
}