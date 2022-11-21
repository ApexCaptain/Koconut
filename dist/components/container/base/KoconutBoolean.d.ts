import { KoconutComparable, KoconutPrimitive } from '../../../module';
export declare class KoconutBoolean extends KoconutPrimitive<boolean> implements Boolean, KoconutComparable {
    /**
     * Creates a new instance from ```boolean```.
     * @param {boolean} boolean A boolean value which is either true or false. If it's omitted ```false``` is default value.
     *
     * @since 1.0.15
     *
     * @example
     * ```typescript
     * const koconutBoolean = await new KoconutBoolean(true)
     * // ↑ This is a KoconutBoolean instance, of which value is true.
     *
     * const koconutBoolean = await new KoconutBoolean()
     * // ↑ This is a KoconutBoolean instance, of which value is false.
     * ```
     */
    constructor(boolean?: boolean | null);
    private static fromPrimitive;
    compareTo(other: boolean | KoconutPrimitive<boolean>): KoconutPrimitive<number>;
    /**
     * Processed all the chained object and returns original {@link KoconutBoolean} instance.
     *
     * @category Processor
     *
     * @since 1.0.15
     *
     * @example
     * ```typescript
     * const koconutBoolean = await new KoconutBoolean(true)
     *                                     .retrieve()
     * console.log(koconutBoolean)
     * // ↑ KoconutBoolean { isValidated: true, data: true }
     * ```
     */
    retrieve(): Promise<KoconutBoolean>;
    valueOf(): boolean;
    not(): KoconutBoolean;
    and(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    nand(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    or(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    nor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    xor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    xnor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
    eqv(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean;
}
