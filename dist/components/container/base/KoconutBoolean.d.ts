import { KoconutComparable, KoconutPrimitive } from "../../../module";
declare type targetBooleanLikeType = boolean | KoconutPrimitive<boolean>;
export declare class KoconutBoolean extends KoconutPrimitive<boolean> implements Boolean, KoconutComparable {
    /**
     * Creates a new instance from ```boolean```.
     * @param boolean A boolean value which is eiter true or false. If it's omitted ```false``` is default value.
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
    compareTo(other: targetBooleanLikeType): KoconutPrimitive<number>;
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
    /** @ignore */
    valueOf(): boolean;
    not(): KoconutBoolean;
    and(other: targetBooleanLikeType): KoconutBoolean;
    nand(other: targetBooleanLikeType): KoconutBoolean;
    or(other: targetBooleanLikeType): KoconutBoolean;
    nor(other: targetBooleanLikeType): KoconutBoolean;
    xor(other: targetBooleanLikeType): KoconutBoolean;
    xnor(other: targetBooleanLikeType): KoconutBoolean;
    eqv(other: targetBooleanLikeType): KoconutBoolean;
}
export {};
