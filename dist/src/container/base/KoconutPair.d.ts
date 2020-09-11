import { Entry, KoconutPrimitive, KoconutEquatable } from "../../../module.internal";
/**
 * Represents a generic pair of two Values. There is no meaning attached to values
 * in this class. It can be used for any purpose. Pair exhibits values semantics,
 * i.e. two pairs are equal if both components are equal. However, if any of those
 * two values are instance of class, you'd better make the class explicitly distinguishable
 * by inheriting {@link KoconutEquatable}. Please, check the {@link Pair.equalsTo example of 'equalsTo' method}
 * @see
 * <pre>
 * -- Base --
 * {@link KoconutPair}, {@link Entry}, {@link KoconutEntry}
 *
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 *
 * @param FirstType The type of the first value.
 * @param SecondType The type of the second value.
 */
export declare class Pair<FirstType, SecondType> implements KoconutEquatable {
    private firstElement;
    private secondElement;
    /**
     * Create a {@link Pair} instance by iterable two values pair.
     *
     * @param pair Values pair of first/second as iterable.
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair)
     * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
     * ```
     */
    static from<FirstType, SecondType>(pair: [FirstType, SecondType]): Pair<FirstType, SecondType>;
    /**
     * Constructor of {@link Pair}.
     *
     * @param firstElement FirstType element.
     * @param secondElement SecondType element.
     */
    constructor(firstElement: FirstType, secondElement: SecondType);
    /**
     * Returns the first value of this first/second pair.
     * @returns The first value of this first/second pair.
     */
    get first(): FirstType;
    /**
     * Returns the second value of this first/second pair.
     * @returns The second value of this first/second pair.
     */
    get second(): SecondType;
    /**
     * Turns this {@link Pair} instance into a simple JSON object string.
     *
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toString()) // Or, you can use console.log(`${myPair}`)
     * // ↑ {"first":"Apex","second":"Captain"}
     * ```
     */
    toString(): string;
    /**
     * Turns this {@link Pair} instance into a simple array.
     *
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toArray())
     * // ↑ [ 'Apex', 'Captain' ]
     * ```
     */
    toArray(): Array<FirstType | SecondType>;
    /**
     * Turns this {@link Pair} instance into a simple {@link Entry}
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toEntry())
     * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
     * ```
     */
    toEntry(): Entry<FirstType, SecondType>;
    /**
     * Class {@link Pair} implments {@link KoconutEquatable}. The '{@link KoconutEquatable.equalsTo equalsTo}' method of
     * this is basically check each individual element (first/second) are same or not. When the type of each element
     * is child of {@link KoconutEquatable}, it'd be done by using its '{@link KoconutEquatable.equalsTo equalsTo}' method.
     * Otherwise, it'd be done simply by '==' operator.
     * @param other
     *
     * @example
     * ```typescript
     *   // Case 1 -- All values are simply number or string
     *   const myPairCase1_01 = Pair.from([10, 20])
     *   const myPairCase1_02 = Pair.from([10, 20])
     *   console.log(`${myPairCase1_01.equalsTo(myPairCase1_02)}`)
     *   // ↑ true
     *
     *   const myPairCase1_03 = Pair.from(["Apex", "Captain"])
     *   const myPairCase1_04 = Pair.from(["Apex", "Captain"])
     *   console.log(`${myPairCase1_03 == myPairCase1_04}`)
     *   // ↑ false
     *   console.log(`${myPairCase1_03.equalsTo(myPairCase1_04)}`)
     *   // ↑ true
     *
     *   // Case 2 -- First Type is indistinguishable class
     *   class MyClass {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *   }
     *   const myPairCase2_01 = Pair.from([new MyClass("Apex"), "Captain"])
     *   const myPairCase2_02 = Pair.from([new MyClass("Apex"), "Captain"])
     *   console.log(`${myPairCase2_01.equalsTo(myPairCase2_02)}`)
     *   // ↑ false
     *
     *   // Case 3 -- First Type is distinguishable class
     *   class MyDistinguishableClass implements KoconutEquatable {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *       equalsTo(other : MyDistinguishableClass) : boolean {
     *           return this.value == other.value
     *       }
     *   }
     *   const myPairCase3_01 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   const myPairCase3_02 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   console.log(`${myPairCase3_01.equalsTo(myPairCase3_02)}`)
     *   // ↑ true
     * ```
     */
    equalsTo(other: Pair<FirstType, SecondType>): boolean;
}
/**
 * Koconut Wrapper class for {@link Pair}
 *
 * @see
 * <pre>
 * -- Base --
 * {@link Pair}, {@link Entry}, {@link KoconutPair}
 *
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 *
 * @param FirstType Check for {@link Pair}
 * @param SecondType Check for {@link Pair}
 */
export declare class KoconutPair<FirstType, SecondType> extends KoconutPrimitive<Pair<FirstType, SecondType>> implements KoconutEquatable {
    /**
     * Constructor of {@link KoconutPair}
     *
     * @param first FirstType element of inner {@link Pair} instance.
     * @param second SecondType element of inner {@link Pair} instance.
     */
    constructor(first?: FirstType | null, second?: SecondType | null);
    /**
     * Class {@link KoconutPair} implements {@link KoconutEquatable}. The equality check process
     * is done by using '{@link Pair.equalsTo equalsTo method of Pair}'
     * @param other
     */
    equalsTo(other: KoconutPair<FirstType, SecondType>): boolean;
}