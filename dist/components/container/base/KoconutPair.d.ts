import {
  Entry,
  KoconutBoolean,
  KoconutPrimitive,
  KoconutEquatable,
} from '../../../module';
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
 * @param {FirstType} FirstType The type of the first value.
 * @param {SecondType} SecondType The type of the second value.
 */
export declare class Pair<FirstType, SecondType> implements KoconutEquatable {
  private firstElement;
  private secondElement;
  /**
   * Create a {@link Pair} instance by iterable two values pair.
   *
   * @param {[FirstType, SecondType]} pair Values pair of first/second as iterable.
   *
   * @return {Pair<FirstType, SecondType>}
   * ```typescript
   * const myPair = Pair.from(["Apex","Captain"])
   * console.log(myPair)
   * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
   * ```
   */
  static from<FirstType, SecondType>(
    pair: [FirstType, SecondType],
  ): Pair<FirstType, SecondType>;
  /**
   * Constructor of {@link Pair}.
   *
   * @param {FirstType} firstElement FirstType element.
   * @param {SecondType} secondElement SecondType element.
   */
  constructor(firstElement: FirstType, secondElement: SecondType);
  /**
   * Returns the first value of this first/second pair.
   *
   * @return {FirstType} The first value of this first/second pair.
   */
  get first(): FirstType;
  /**
   * Returns the second value of this first/second pair.
   *
   * @return {SecondType} The second value of this first/second pair.
   */
  get second(): SecondType;
  /**
   * Turns this {@link Pair} instance into a simple JSON object string.
   *
   * @return {string}
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
   * @return {[FirstType, SecondType]}
   *
   * @example
   * ```typescript
   * const myPair = Pair.from(["Apex","Captain"])
   * console.log(myPair.toArray())
   * // ↑ [ 'Apex', 'Captain' ]
   * ```
   */
  toArray(): [FirstType, SecondType];
  /**
   * Turns this {@link Pair} instance into a simple {@link Entry}
   *
   * @return {Entry<FirstType, SecondType>}
   *
   * @example
   * ```typescript
   * const myPair = Pair.from(["Apex","Captain"])
   * console.log(myPair.toEntry())
   * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
   * ```
   */
  toEntry(): Entry<FirstType, SecondType>;
  /**
   * Class {@link Pair} implements {@link KoconutEquatable}. The '{@link KoconutEquatable.equalsTo equalsTo}' method of
   * this basically check whether each individual element (first/second) is same or not. When the type of each element
   * is child of {@link KoconutEquatable}, it'd be done by using its '{@link KoconutEquatable.equalsTo equalsTo}' method.
   * Otherwise, it'd be done simply by '==' operator.
   * @param {Pair<FirstType, SecondType>} other
   *
   * @return {boolean | KoconutBoolean}
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
  equalsTo(other: Pair<FirstType, SecondType>): boolean | KoconutBoolean;
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
 * @param {FirstType} FirstType Check for {@link Pair}
 * @param {SecondType} SecondType Check for {@link Pair}
 */
export declare class KoconutPair<FirstType, SecondType>
  extends KoconutPrimitive<Pair<FirstType, SecondType>>
  implements KoconutEquatable
{
  /**
   * Constructor of {@link KoconutPair}
   *
   * @param {FirstType | null} first FirstType element of inner {@link Pair} instance.
   * @param {SecondType | null} second SecondType element of inner {@link Pair} instance.
   */
  constructor(first?: FirstType | null, second?: SecondType | null);
  /**
   * Processes all the chained object and returns original {@link KoconutPair} instance.
   *
   * @return {Promise<KoconutPair<FirstType, SecondType>>}
   *
   * @category Processor
   *
   * @since 1.0.15
   *
   * @example
   * ```typescript
   * const koconutPair = await new KoconutPair(0, 1)
   *                                     .retrieve()
   *
   * console.log(koconutPair)
   * // ↑ KoconutPair {
   * //   isValidated: true,
   * //   data: Pair { firstElement: 0, secondElement: 1 }
   * // }
   * ```
   */
  retrieve(): Promise<KoconutPair<FirstType, SecondType>>;
  /**
   * Class {@link KoconutPair} implements {@link KoconutEquatable}. The equality check process
   * is done by using '{@link Pair.equalsTo equalsTo method of Pair}'
   *
   * @param {KoconutPair<FirstType, SecondType>} other
   *
   * @return {boolean | KoconutBoolean}
   */
  equalsTo(other: KoconutPair<FirstType, SecondType>): boolean | KoconutBoolean;
}
