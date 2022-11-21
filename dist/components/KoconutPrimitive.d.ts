import { KoconutYieldable, KoconutOpener, Selector, Processor } from '../module';
export declare class KoconutPrimitive<DataType> implements KoconutYieldable<DataType> {
    protected data: DataType | null;
    protected prevYieldable?: KoconutYieldable<any>;
    protected processor?: () => Promise<DataType>;
    protected setPrevYieldable(prevYieldable: KoconutYieldable<any>): KoconutOpener<DataType>;
    protected setProcessor(processor: () => Promise<DataType>): KoconutOpener<DataType>;
    protected validate(data: DataType | null): Promise<void>;
    constructor(data?: DataType | null);
    protected isValidated: boolean;
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
    process(): Promise<void>;
    retrieve(): Promise<KoconutPrimitive<DataType>>;
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
    yield(): Promise<DataType>;
    /**
     * Processes all the chained objects and calls the specified function
     * ```block``` with the result value as its argument and returns the final result
     * of the ```block```.
     *
     * @param {SingleInputSingleOutCallback} block A callback function that accepts an argument. The method calls the `block` and returns its result.
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
    let<ReturnType>(block: Selector<DataType, ReturnType>): Promise<ReturnType>;
    /**
     * Processes all the chained objects and calls the specified function
     * ```block``` with the result value as its argument and returns the original result.
     * @param {Processor} block A callback function that accepts an argument.
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
    also(block: Processor<DataType>): Promise<DataType | null>;
}
