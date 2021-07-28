`use strict`

import { KoconutYieldable, KoconutOpener, KoconutSequence, Sequence } from "../module"

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

    protected async validate(data : DataType | null) {}

    constructor(data : DataType | null = null) { this.data = data }

    protected isValidated = false


    // Processor
    /**
     * Processes all the chained objects ane returns ```Promise<void>```.
     * 
     * @since 1.0.10
     * 
     * @category Processor
     * 
     * @example
     * ```typescript
     * import { KoconutArray } from 'koconut'
     *
     * const mainProcess = async () => {
     *   const koconutNumbers = KoconutArray.of(1,2,3,4,5)
     *
     *   await koconutNumbers
     *               .forEach(console.log)
     *               .process()
     *   // ↑ 1 2 3 4 5
     * }
     * mainProcess()
     * ```
     */
    async process() : Promise<void> {
        if(this.prevYieldable != null) {
            this.data = await this.prevYieldable.yield()
            if(!(this instanceof KoconutSequence) && this.data instanceof Sequence) await this.data.done()
        }
        if(this.processor != null) this.data = await this.processor()
        if(!this.isValidated) {
            await this.validate(this.data)
            this.isValidated = true
        }   
        delete this.prevYieldable
        delete this.processor
    }


    // No Commecnt -- All the classes inheriting this. 
    async retrieve() : Promise<KoconutPrimitive<DataType>> {
        await this.process()
        return this
    }


    /**
     * Processes all the chained objects and return the result.
     * 
     * @since 1.0.10
     * 
     * @category Processor
     * 
     * @example
     * ``` typescript
     * import { KoconutArray } from 'koconut'
     *
     * const mainProcess = async () => {
     *   const koconutNumbers = KoconutArray.of(1,2,3,4,5)
     *
     *   const firstNumber = await koconutNumbers
     *                                       .first()
     *                                       .yield()
     *   console.log(firstNumber)
     *   // ↑ 1
     * }
     * mainProcess()
     * ```
     */
    async yield() : Promise<DataType> {
        await this.process()
        return this.data!
    }

    /**
     * Processes all the chained objects and calls the specified function
     * ```block``` with the result value as its argument and returns the final result
     * of the ```block```.
     * @param block A callback function that accepts an argument. The method calls the `block` and returns its result.
     * 
     * @since 1.0.10
     * 
     * @category Processor
     * 
     * @example
     * ``` typescript
     * import { KoconutArray } from 'koconut'
     *
     * const mainProcess = async () => {
     *   const koconutNumbers = KoconutArray.of(1,2,3,4,5)
     *
     *   const firstNumberPlus2 = await koconutNumbers
     *                           .first()
     *                           .let(result => result + 2)
     *   console.log(firstNumber)
     *   // ↑ 3
     * }
     * mainProcess()
     * ```
     */
    async let<ReturnType>(block : (data : DataType) => ReturnType | Promise<ReturnType>) : Promise<ReturnType>{
        return await block(await this.yield())
    }

    /**
     * Processes all the chained objects and calls the specified function
     * ```block``` with the result value as its argument and returns the original result.
     * @param block A callback function that accepts an argument.
     * 
     * @since 1.0.10
     * 
     * @category Processor
     * 
     * @example
     * ```typescript
     * import { KoconutArray } from 'koconut'
     *
     * const mainProcess = async () => {
     *   const koconutNumbers = KoconutArray.of(1,2,3,4,5)
     *
     *   const moreNumbers = await koconutNumbers
     *                           .also(result => {
     *                               result.push(6)
     *                               result.push(7)
     *                               result.push(8)
     *                           })
     *   console.log(moreNumbers)
     *   // ↑ [1, 2, 3, 4, 5, 6, 7, 8]
     * }
     * mainProcess()
     * ```
     */
    async also(block : (data : DataType) => void | Promise<void>) : Promise<DataType | null> {
        await block(await this.yield())
        return this.data
    }

}
