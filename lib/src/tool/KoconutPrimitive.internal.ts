`use strict`

import { KoconutYieldable, KoconutOpener } from "../../module.internal"

export class KoconutPrimitive<DataType> implements KoconutYieldable<DataType> {
    
    protected data : DataType | null
    protected prevYieldable? : KoconutYieldable<any>
    protected processor? : () => Promise<DataType>

    protected setPrevYieldable(prevYieldable : KoconutYieldable<any>) : KoconutOpener<DataType> {
        this.prevYieldable = prevYieldable
        return this as any as KoconutOpener<DataType>
    }
    protected setProcessor(processor : () => Promise<DataType>) : KoconutOpener<DataType> { 
        this.processor = processor
        return this as any as KoconutOpener<DataType>
    }

    protected async validiate(data : DataType | null) {}

    constructor(data : DataType | null = null) { this.data = data }

    protected isValidated = false

    async process() : Promise<void> {
        if(this.prevYieldable != null) this.data = await this.prevYieldable.yield()
        if(this.processor != null) this.data = await this.processor()
        if(!this.isValidated) {
            await this.validiate(this.data)
            this.isValidated = true
        }   
        this.prevYieldable = undefined
        this.processor = undefined
    }

    async yield() : Promise<DataType | null> {
        await this.process()
        return this.data
    }

    async let<ReturnType>(block : (data : DataType | null) => ReturnType | Promise<ReturnType>) : Promise<ReturnType>{
        return await block(await this.yield())
    }
    
    async apply(block : (this : DataType | null) => void | Promise<void>) : Promise<DataType | null> {
        await block.call(await this.yield())
        return this.data
    }

    async run<ReturnType>(block : (this : DataType | null) => ReturnType | Promise<ReturnType>) : Promise<ReturnType> {
        return await block.call(await this.yield())
    }

    async also(block : (data : DataType | null) => void | Promise<void>) : Promise<DataType | null> {
        await block(await this.yield())
        return this.data
    }

}
