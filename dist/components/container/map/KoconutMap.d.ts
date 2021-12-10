import {
  KoconutPrimitive,
  Entry,
  Pair,
  KoconutPair,
  KoconutEntry,
  KoconutIterable,
  KoconutArray,
  KoconutSet,
  KoconutBoolean,
  KoconutComparable,
  Generator,
  Selector,
  Comparator,
  Action,
  Predicator,
  Transformer,
} from '../../../module';
export declare class KoconutMap<KeyType, ValueType> extends KoconutIterable<
  [KeyType, ValueType],
  Entry<KeyType, ValueType>,
  Map<KeyType, ValueType>,
  Set<Entry<KeyType, ValueType>>
> {
  protected validate(data: Map<KeyType, ValueType> | null): Promise<void>;
  private static fromIterable;
  /**
   * Creates a new instance from ```iterable``` object.
   * Inner data type could be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
   *
   * @param {Iterable<[KeyType, ValueType]| Entry<KeyType, ValueType>| Pair<KeyType, ValueType>> | null} map An map-like ```iterable``` object to convert to a {@link KoconutMap}.
   *
   * @since 1.0.11
   *
   * @example
   * ```typescript
   * const stringAndNumberMap = new Map([
   *  ["a", 1], ["b", 2], ["c", 3]
   * ])
   * const stringAndNumber1 = new KoconutMap(stringAndNumberMap)
   * // ↑ This is a Koconut string - number paired map.
   *
   * const stringAndNumber2 = new KoconutMap([
   *  ["a", 1], new Pair("b", 2), new Entry("c", 3)
   * ])
   * // ↑ This is a Koconut string - number paired map, too.
   *
   * const emptyStringAndNumberMap = new KoconutMap<string, number>()
   * // ↑ This is an empty Koconut string - number paired map.
   * ```
   */
  constructor(
    map?: Iterable<
      | [KeyType, ValueType]
      | Entry<KeyType, ValueType>
      | Pair<KeyType, ValueType>
    > | null,
  );
  /**
   * Processes all the chained object and returns original {@link KoconutMap} instance.
   *
   * @return {Promise<KoconutMap<KeyType, ValueType>>}
   *
   * @category Processor
   *
   * @since 1.0.15
   *
   * @example
   * ```typescript
   * const koconutMap = await KoconutArray
   *         .of(1,2,3,4,5)
   *         .associateWith(eachNumber => eachNumber * 2)
   *         .retrieve()
   * console.log(koconutMap)
   * // ↑ KoconutMap {
   * //   isValidated: true,
   * //   data: Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 },
   * //   combinedDataWrapper: Set {
   * //     Entry { keyElement: 1, valueElement: 2 },
   * //     Entry { keyElement: 2, valueElement: 4 },
   * //     Entry { keyElement: 3, valueElement: 6 },
   * //     Entry { keyElement: 4, valueElement: 8 },
   * //     Entry { keyElement: 5, valueElement: 10 }
   * //   },
   * //   mSize: 5,
   * //   mKeys: Set { 1, 2, 3, 4, 5 },
   * //   mValues: [ 2, 4, 6, 8, 10 ]
   * // }
   * ```
   */
  retrieve(): Promise<KoconutMap<KeyType, ValueType>>;
  private mKeys;
  private mValues;
  /**
   * Returns a {@link KoconutSet} contains every {@link Entry}.
   *
   * @return {KoconutSet<Entry<KeyType, ValueType>>}
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const entries = await koconutMap
   *                   .entries
   *                   .yield()
   * console.log(entries)
   * // ↑ Set {
   * //        Entry { keyElement: 1, valueElement: 2 },
   * //        Entry { keyElement: 2, valueElement: 4 },
   * //        Entry { keyElement: 3, valueElement: 6 },
   * //        Entry { keyElement: 4, valueElement: 8 },
   * //        Entry { keyElement: 5, valueElement: 10 }
   * //       }
   * ```
   */
  get entries(): KoconutSet<Entry<KeyType, ValueType>>;
  /**
   * Returns a {@link KoconutSet} contains all keys.
   *
   * @return {KoconutSet<KeyType>}
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const keys = await koconutMap
   *                   .keys
   *                   .yield()
   * console.log(keys)
   * // ↑ Set { 1, 2, 3, 4, 5 }
   * ```
   */
  get keys(): KoconutSet<KeyType>;
  /**
   * Returns the number of {@link Entry} in this {@link KoconutMap}.
   *
   * @return {KoconutPrimitive<number>}
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const size = await koconutMap
   *                   .size
   *                   .yield()
   * console.log(size)
   * // ↑ 5
   * ```
   */
  get size(): KoconutPrimitive<number>;
  /**
   * Returns a {@link KoconutArray} contains all values in this {@link KoconutMap}.
   *
   * @return {KoconutArray<ValueType>}
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const values = await koconutMap
   *                   .values
   *                   .yield()
   * console.log(values)
   * // ↑ [ 2, 4, 6, 8, 10 ]
   * ```
   */
  get values(): KoconutArray<ValueType>;
  /**
   * Creates a new instance from ```iterable``` object.
   * Inner data type could be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
   *
   * @param {Iterable<[KeyType, ValueType]| Entry<KeyType, ValueType>| Pair<KeyType, ValueType>> | null} source An map-like ```iterable``` object to convert to a {@link KoconutMap}.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.11
   *
   * @category Creator
   *
   * @example
   * ```typescript
   * const stringAndNumberMap = new Map([
   *  ["a", 1], ["b", 2], ["c", 3]
   * ])
   * const stringAndNumber1 = KoconutMap.from(stringAndNumberMap)
   * // ↑ This is a Koconut string - number paired map.
   *
   * const stringAndNumber2 = KoconutMap.from([
   *  ["a", 1], new Pair("b", 2), new Entry("c", 3)
   * ])
   * // ↑ This is a Koconut string - number paired map, too.
   *
   * const emptyStringAndNumberMap = KoconutMap.from<string, number>()
   * // ↑ This is an empty Koconut string - number paired map.
   * ```
   */
  static from<KeyType, ValueType>(
    source?: Iterable<
      | [KeyType, ValueType]
      | Entry<KeyType, ValueType>
      | Pair<KeyType, ValueType>
    > | null,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Creates a new instance from variable number of arguments.
   * Inner data type could be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
   *
   * @param {([KeyType, ValueType]| Entry<KeyType, ValueType>| Pair<KeyType, ValueType>)[]} data A set of elements to include in the new {@link KoconutMap} object.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.11
   *
   * @category Creator
   *
   * @example
   * ```typescript
   * const stringAndNumber = KoconutMap.of(
   *  ["a", 1], new Pair("b", 2), new Entry("c", 3)
   * )
   * // ↑ This is a Koconut string - number paired map.
   *
   * const emptyStringAndNumberMap = KoconutMap.of<string, number>()
   * // ↑ This is an empty Koconut string - number paired map.
   * ```
   */
  static of<KeyType, ValueType>(
    ...data: (
      | [KeyType, ValueType]
      | Entry<KeyType, ValueType>
      | Pair<KeyType, ValueType>
    )[]
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Creates a new instance with given ```count``` as number of entries. ```count``` cannot be negative number.
   * Each entry is provided from ```generator``` with given ordered index.
   *
   * @param {number} count Number of values.
   *
   * @param {Generator<[KeyType, ValueType]| Pair<KeyType, ValueType>| KoconutPair<KeyType, ValueType>| Entry<KeyType, ValueType>| KoconutEntry<KeyType, ValueType>>} generator A callback function that accepts an argument. The method calls the ```action``` one time for each ordered index.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```generator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @throws {@link KoconutInvalidArgumentException}
   * -- When ```count``` is less than 0.
   *
   * @since 1.0.14
   *
   * @category Creator
   *
   * @example
   * ```typescript
   * const numberKeyStringValueMap = await KoconutMap.generate(
   *                                         5, i => [i, i.toString()]
   *                                                 // ↑ Also can be
   *                                                 //   new Pair(i, i.toString())
   *                                                 //   Pair.from([i, i.toString()])
   *                                                 //   new KoconutPair(i, i.toString())
   *                                                 //   new Entry(i, i.toString())
   *                                                 //   Entry.from([i, i.toString()])
   *                                                 //   new KoconutEntry(i, i.toString())
   *                                     )
   *                                     .yield()
   * console.log(numberKeyStringValueMap)
   * // ↑ Map { 0 => '0', 1 => '1', 2 => '2', 3 => '3', 4 => '4' }
   * ```
   */
  static generate<KeyType, ValueType>(
    count: number,
    generator: Generator<
      | [KeyType, ValueType]
      | Pair<KeyType, ValueType>
      | KoconutPair<KeyType, ValueType>
      | Entry<KeyType, ValueType>
      | KoconutEntry<KeyType, ValueType>
    >,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns the first entry yielding the largest value of the given function or
   * throws {@link KoconutNoSuchElementException} if there are no entries.
   *
   * @param {Selector<Entry<KeyType, ValueType>,number | string | KoconutComparable>} selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   *
   * @category Calculator
   *
   * @since 1.0.10
   * @deprecated Use {@link maxByOrNull} instead.
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const largestNumberOfArray = await koconutArray
   *                               .maxBy(eachNumber => eachNumber)
   *                               .yield()
   * console.log(largestNumberOfArray)
   * // ↑ 5
   *
   * try {
   *   await koconutArray
   *           .filter(eachNumber => eachNumber > 10)
   *           .maxBy(eachNumber => eachNumber)
   *           .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut No Such Element Exception
   *   // i.e. -- Array is filtered.
   *   // No element in 1 to 5 is greater than 10.
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc")
   *
   * const longestStringOfSet = await koconutSet
   *                               .maxBy(eachString => eachString.length)
   *                               .yield()
   * console.log(longestStringOfSet)
   * // ↑ abc
   *
   * // Case 3 -- KoconutMap
   * const koconutMap = KoconutArray.of(1, 12, 123)
   *                   .associateWith(eachNumber => eachNumber.toString())
   *
   * const longestDigitsEntryOfMap = await koconutMap
   *                                       .maxBy(eachEntry => eachEntry.value.length)
   *                                       .yield()
   * console.log(longestDigitsEntryOfMap)
   * // ↑ Entry { keyElement: 123, valueElement: '123' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(19,27,32)
   *
   * const largestNumberOfArray2 = await koconutArray2
   *                                   .maxBy(async eachNumber => eachNumber)
   *                                   .yield()
   * console.log(largestNumberOfArray2)
   * // ↑ 32
   *
   * const largest1sDigitNumberOfArray2 = await koconutArray2
   *                                       .maxBy(eachNumber => new Promise(resolve => {
   *                                           resolve(eachNumber % 10)
   *                                       }))
   *                                       .yield()
   * console.log(largest1sDigitNumberOfArray2)
   * // ↑ 19
   * ```
   */
  maxBy(
    selector: Selector<
      Entry<KeyType, ValueType>,
      number | string | KoconutComparable
    >,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first entry yielding the largest value of the given function or null if there are no entries.
   *
   * @param {Selector<Entry<KeyType, ValueType>, number | string | KoconutComparable>} selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const largestNumberOfArray = await koconutArray
   *                               .maxByOrNull(eachNumber => eachNumber)
   *                               .yield()
   * console.log(largestNumberOfArray)
   * // ↑ 5
   *
   *
   * const largestNumberOfEmptyArray = await koconutArray
   *                                 .filter(eachNumber => eachNumber > 10)
   *                                 .maxByOrNull(eachNumber => eachNumber)
   *                                 .yield()
   * console.log(largestNumberOfEmptyArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc")
   *
   * const longestStringOfSet = await koconutSet
   *                               .maxByOrNull(eachString => eachString.length)
   *                               .yield()
   * console.log(longestStringOfSet)
   * // ↑ abc
   *
   * // Case 3 -- KoconutMap
   * const koconutMap = KoconutArray.of(1, 12, 123)
   *                   .associateWith(eachNumber => eachNumber.toString())
   *
   * const longestDigitsEntryOfMap = await koconutMap
   *                                       .maxByOrNull(eachEntry => eachEntry.value.length)
   *                                       .yield()
   * console.log(longestDigitsEntryOfMap)
   * // ↑ Entry { keyElement: 123, valueElement: '123' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(19,27,32)
   *
   * const largestNumberOfArray2 = await koconutArray2
   *                                   .maxByOrNull(async eachNumber => eachNumber)
   *                                   .yield()
   * console.log(largestNumberOfArray2)
   * // ↑ 32
   *
   * const largest1sDigitNumberOfArray2 = await koconutArray2
   *                                       .maxByOrNull(eachNumber => new Promise(resolve => {
   *                                           resolve(eachNumber % 10)
   *                                       }))
   *                                       .yield()
   * console.log(largest1sDigitNumberOfArray2)
   * // ↑ 19
   * ```
   */
  maxByOrNull(
    selector: Selector<
      Entry<KeyType, ValueType>,
      number | string | KoconutComparable
    >,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first element having the largest value according to the provided ```comparator``` or throws {@link KoconutNoSuchElementException}
   * if elements are empty.
   *
   * @param {Comparator<Entry<KeyType, ValueType>>} comparator A callback function that accepts two arguments. The method calls the ```comparator``` to compare two selected values.
   * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const largestNumberOfArray = await koconutArray
   *                                   .maxWith((front, rear) => front - rear)
   *                                   .yield()
   * console.log(largestNumberOfArray)
   * // ↑ 5
   *
   * try {
   *   await koconutArray
   *           .filter(eachNumber => eachNumber > 10)
   *           .maxWith((front, rear) => front - rear)
   *           .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut No Such Element Exception
   *   // i.e. -- Array is filtered.
   *   // No element in 1 to 5 is greater than 10.
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc", "abcd")
   *
   * const longestStringLengthOfSet = await koconutSet
   *                                       .maxWith((front, rear) => front.length - rear.length)
   *                                       .yield()
   * console.log(longestStringLengthOfSet)
   * // ↑ abcd
   *
   * // Case 3
   * const koconutMap = KoconutArray.of("a", "ab", "abc")
   *                   .associate(eachString => [eachString.length, eachString])
   *
   * const longestStringLengthEntryOfMap = await koconutMap
   *                                   .maxWith((front, rear) => front.key - rear.key)
   *                                   .yield()
   * console.log(longestStringLengthEntryOfMap)
   * // ↑ Entry { keyElement: 3, valueElement: 'abc' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
   *
   * const largestNumberOfArray2 = await koconutArray2
   *                     .maxWith(async (front, rear) => front - rear)
   *                     .yield()
   * console.log(largestNumberOfArray2)
   * // ↑ 51
   *
   * const largest1sDigitNumberOfArray2 = await koconutArray2
   *                       .maxWith((front, rear) => new Promise(resolve => {
   *                           resolve(front % 10 - rear % 10)
   *                       }))
   *                       .yield()
   * console.log(largest1sDigitNumberOfArray2)
   * // ↑ 45
   * ```
   */
  maxWith(
    comparator: Comparator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first element having the largest value according to the provided ```comparator``` or null
   * if elements are empty.
   *
   * @param {Comparator<Entry<KeyType, ValueType>>} comparator A callback function that accepts two arguments. The method calls the ```comparator``` to compare two selected values.
   * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const largestNumberOfArray = await koconutArray
   *                                   .maxWithOrNull((front, rear) => front - rear)
   *                                   .yield()
   * console.log(largestNumberOfArray)
   * // ↑ 5
   *
   * const largestNumberOfEmptyArray = await koconutArray
   *                                  .filter(eachNumber => eachNumber > 10)
   *                                  .maxWithOrNull((front, rear) => front - rear)
   *                                  .yield()
   * console.log(largestNumberOfEmptyArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc", "abcd")
   *
   * const longestStringLengthOfSet = await koconutSet
   *                                       .maxWithOrNull((front, rear) => front.length - rear.length)
   *                                       .yield()
   * console.log(longestStringLengthOfSet)
   * // ↑ abcd
   *
   * // Case 3
   * const koconutMap = KoconutArray.of("a", "ab", "abc")
   *                   .associate(eachString => [eachString.length, eachString])
   *
   * const longestStringLengthEntryOfMap = await koconutMap
   *                                   .maxWithOrNull((front, rear) => front.key - rear.key)
   *                                   .yield()
   * console.log(longestStringLengthEntryOfMap)
   * // ↑ Entry { keyElement: 3, valueElement: 'abc' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
   *
   * const largestNumberOfArray2 = await koconutArray2
   *                     .maxWithOrNull(async (front, rear) => front - rear)
   *                     .yield()
   * console.log(largestNumberOfArray2)
   * // ↑ 51
   *
   * const largest1sDigitNumberOfArray2 = await koconutArray2
   *                       .maxWithOrNull((front, rear) => new Promise(resolve => {
   *                           resolve(front % 10 - rear % 10)
   *                       }))
   *                       .yield()
   * console.log(largest1sDigitNumberOfArray2)
   * // ↑ 45
   * ```
   */
  maxWithOrNull(
    comparator: Comparator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first entry yielding the smallest value of the given function or
   * throws {@link KoconutNoSuchElementException} if there are no entries.
   *
   * @param {Selector<Entry<KeyType, ValueType>,number | string | KoconutComparable>} selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @deprecated Use {@link minByOrNull} instead.
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const smallestNumberOfArray = await koconutArray
   *                           .minBy(eachNumber => eachNumber)
   *                           .yield()
   * console.log(smallestNumberOfArray)
   * // ↑ 1
   *
   * try {
   * await koconutArray
   *       .filter(eachNumber => eachNumber > 10)
   *       .minBy(eachNumber => eachNumber)
   *       .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut No Such Element Exception
   *   // i.e. -- Array is filtered.
   *   // No element in 1 to 5 is greater than 10.
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc")
   *
   * const shortestStringOfSet = await koconutSet
   *                           .minBy(eachString => eachString.length)
   *                           .yield()
   * console.log(shortestStringOfSet)
   * // ↑ a
   *
   * // Case 3 -- KoconutMap
   * const koconutMap = KoconutArray.of(1, 12, 123)
   *               .associateWith(eachNumber => eachNumber.toString())
   *
   * const shortestDigitsEntryOfMap = await koconutMap
   *                                   .minBy(eachEntry => eachEntry.value.length)
   *                                   .yield()
   * console.log(shortestDigitsEntryOfMap)
   * // ↑ Entry { keyElement: 1, valueElement: '1' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(19,27,32)
   *
   * const smallestNumberOfArray2 = await koconutArray2
   *                               .minBy(async eachNumber => eachNumber)
   *                               .yield()
   * console.log(smallestNumberOfArray2)
   * // ↑ 19
   *
   * const smallest1sDigitNumberOfArray2 = await koconutArray2
   *                                   .minBy(eachNumber => new Promise(resolve => {
   *                                       resolve(eachNumber % 10)
   *                                   }))
   *                                   .yield()
   * console.log(smallest1sDigitNumberOfArray2)
   * // ↑ 32
   * ```
   */
  minBy(
    selector: Selector<
      Entry<KeyType, ValueType>,
      number | string | KoconutComparable
    >,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first entry yielding the smallest value of the given function or ```null``` if there are no entries.
   *
   * @param {Selector<Entry<KeyType, ValueType>,number | string | KoconutComparable>} selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const smallestNumberOfArray = await koconutArray
   *                           .minByOrNull(eachNumber => eachNumber)
   *                           .yield()
   * console.log(smallestNumberOfArray)
   * // ↑ 1
   *
   * const smallestNumberOfEmptyArray = await koconutArray
   *                       .filter(eachNumber => eachNumber > 10)
   *                       .minByOrNull(eachNumber => eachNumber)
   *                       .yield()
   * console.log(smallestNumberOfEmptyArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc")
   *
   * const shortestStringOfSet = await koconutSet
   *                           .minByOrNull(eachString => eachString.length)
   *                           .yield()
   * console.log(shortestStringOfSet)
   * // ↑ a
   *
   * // Case 3 -- KoconutMap
   * const koconutMap = KoconutArray.of(1, 12, 123)
   *               .associateWith(eachNumber => eachNumber.toString())
   *
   * const shortestDigitsEntryOfMap = await koconutMap
   *                                   .minByOrNull(eachEntry => eachEntry.value.length)
   *                                   .yield()
   * console.log(shortestDigitsEntryOfMap)
   * // ↑ Entry { keyElement: 1, valueElement: '1' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(19,27,32)
   *
   * const smallestNumberOfArray2 = await koconutArray2
   *                               .minByOrNull(async eachNumber => eachNumber)
   *                               .yield()
   * console.log(smallestNumberOfArray2)
   * // ↑ 19
   *
   * const smallest1sDigitNumberOfArray2 = await koconutArray2
   *                                   .minByOrNull(eachNumber => new Promise(resolve => {
   *                                       resolve(eachNumber % 10)
   *                                   }))
   *                                   .yield()
   * console.log(smallest1sDigitNumberOfArray2)
   * // ↑ 32
   * ```
   */
  minByOrNull(
    selector: Selector<
      Entry<KeyType, ValueType>,
      number | string | KoconutComparable
    >,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first element having the smallest value according to the provided ```comparator``` or throws {@link KoconutNoSuchElementException}
   * if elements are empty.
   *
   * @param {Comparator<Entry<KeyType, ValueType>>} comparator A callback function that accepts two arguments. The method calls the ```comparator``` to compare two selected values.
   * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const smallestNumberOfArray = await koconutArray
   *                               .minWith((front, rear) => front - rear)
   *                               .yield()
   * console.log(smallestNumberOfArray)
   * // ↑ 1
   *
   * try {
   *   await koconutArray
   *           .filter(eachNumber => eachNumber > 10)
   *           .minWith((front, rear) => front - rear)
   *           .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut No Such Element Exception
   *   // i.e. -- Array is filtered.
   *   // No element in 1 to 5 is greater than 10.
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc", "abcd")
   *
   * const shortestStringLengthOfSet = await koconutSet
   *                                   .minWith((front, rear) => front.length - rear.length)
   *                                   .yield()
   * console.log(shortestStringLengthOfSet)
   * // ↑ a
   *
   * // Case 3
   * const koconutMap = KoconutArray.of("a", "ab", "abc")
   *               .associate(eachString => [eachString.length, eachString])
   *
   * const shortestStringLengthEntryOfMap = await koconutMap
   *                               .minWith((front, rear) => front.key - rear.key)
   *                               .yield()
   * console.log(shortestStringLengthEntryOfMap)
   * // ↑ Entry { keyElement: 1, valueElement: 'a' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
   *
   * const smallestNumberOfArray2 = await koconutArray2
   *                   .minWith(async (front, rear) => front - rear)
   *                   .yield()
   * console.log(smallestNumberOfArray2)
   * // ↑ 12
   *
   * const smallest1sDigitNumberOfArray2 = await koconutArray2
   *                   .minWith((front, rear) => new Promise(resolve => {
   *                       resolve(front % 10 - rear % 10)
   *                   }))
   *                   .yield()
   * console.log(smallest1sDigitNumberOfArray2)
   * // ↑ 50
   * ```
   */
  minWith(
    comparator: Comparator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Returns the first element having the smallest value according to the provided ```comparator``` or ```null```
   * if elements are empty.
   *
   * @param {Comparator<Entry<KeyType, ValueType>>} comparator A callback function that accepts two arguments. The method calls the ```comparator``` to compare two selected values.
   * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutEntry<KeyType, ValueType>}
   *
   * @category Calculator
   *
   * @since 1.0.10
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const smallestNumberOfArray = await koconutArray
   *                               .minWithOrNull((front, rear) => front - rear)
   *                               .yield()
   * console.log(smallestNumberOfArray)
   * // ↑ 1
   *
   * const smallestNumberOfEmptyArray = await koconutArray
   *                           .filter(eachNumber => eachNumber > 10)
   *                           .minWithOrNull((front, rear) => front - rear)
   *                           .yield()
   * console.log(smallestNumberOfEmptyArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of("a", "ab", "abc", "abcd")
   *
   * const shortestStringLengthOfSet = await koconutSet
   *                                   .minWithOrNull((front, rear) => front.length - rear.length)
   *                                   .yield()
   * console.log(shortestStringLengthOfSet)
   * // ↑ a
   *
   * // Case 3
   * const koconutMap = KoconutArray.of("a", "ab", "abc")
   *                .associate(eachString => [eachString.length, eachString])
   *
   * const shortestStringLengthEntryOfMap = await koconutMap
   *                               .minWithOrNull((front, rear) => front.key - rear.key)
   *                               .yield()
   * console.log(shortestStringLengthEntryOfMap)
   * // ↑ Entry { keyElement: 1, valueElement: 'a' }
   *
   * // Case 4 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
   *
   * const smallestNumberOfArray2 = await koconutArray2
   *                   .minWithOrNull(async (front, rear) => front - rear)
   *                   .yield()
   * console.log(smallestNumberOfArray2)
   * // ↑ 12
   *
   * const smallest1sDigitNumberOfArray2 = await koconutArray2
   *                   .minWithOrNull((front, rear) => new Promise(resolve => {
   *                       resolve(front % 10 - rear % 10)
   *                   }))
   *                   .yield()
   * console.log(smallest1sDigitNumberOfArray2)
   * // ↑ 50
   * ```
   */
  minWithOrNull(
    comparator: Comparator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutEntry<KeyType, ValueType>;
  /**
   * Checks if this {@link KoconutMap} contains the given ```key```.
   *
   * @param {KeyType} key Key to search for.
   *
   * @return {KoconutBoolean}
   *
   * @since 1.0.10
   *
   * @category Inspector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const doesKoconutMapContainsKey4 = await koconutMap
   *                                           .contains(4)
   *                                           .yield()
   * console.log(doesKoconutMapContainsKey4)
   * // ↑ true
   *
   * const doesKoconutMapContainsKey7 = await koconutMap
   *                                           .contains(7)
   *                                           .yield()
   * console.log(doesKoconutMapContainsKey7)
   * // ↑ false
   * ```
   */
  contains(key: KeyType): KoconutBoolean;
  /**
   * Checks if this {@link KoconutMap} contains the given ```key```.
   * @param {KeyType} key Key to search for.
   *
   * @return {KoconutBoolean}
   *
   * @since 1.0.10
   *
   * @category Inspector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const doesKoconutMapContainsKey4 = await koconutMap
   *                                           .containsKey(4)
   *                                           .yield()
   * console.log(doesKoconutMapContainsKey4)
   * // ↑ true
   *
   * const doesKoconutMapContainsKey7 = await koconutMap
   *                                           .containsKey(7)
   *                                           .yield()
   * console.log(doesKoconutMapContainsKey7)
   * // ↑ false
   * ```
   */
  containsKey(key: KeyType): KoconutBoolean;
  /**
   * Checks if this {@link KoconutMap} contains given ```value```.
   * @param {ValueType} value Value to search for.
   *
   * @return {KoconutBoolean}
   *
   * @since 1.0.10
   *
   * @category Inspector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const doesKoconutMapContainsValue2 = await koconutMap
   *                                           .containsValue(2)
   *                                           .yield()
   * console.log(doesKoconutMapContainsValue2)
   * // ↑ true
   *
   * const doesKoconutMapContainsValue12 = await koconutMap
   *                                           .containsValue(12)
   *                                           .yield()
   * console.log(doesKoconutMapContainsValue12)
   * // ↑ false
   * ```
   */
  containsValue(value: ValueType): KoconutBoolean;
  /**
   * Performs the given ```action``` on each entry and returns the original collection itself afterwards.
   * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
   *
   * @param {Action<Entry<KeyType, ValueType>>} action A callback function that accepts an argument. The method calls the ```action``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Iterator
   *
   * @example
   * ```typescript
   * const KoconutMap = KoconutArray.of(1,2,3,4,5)
   *                   .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const map = await KoconutMap
   *                   .onEach(console.log)
   *                   // ↑ Entry { keyElement: 1, valueElement: 2 }
   *                   //   Entry { keyElement: 2, valueElement: 4 }
   *                   //   Entry { keyElement: 3, valueElement: 6 }
   *                   //   Entry { keyElement: 4, valueElement: 8 }
   *                   //   Entry { keyElement: 5, valueElement: 10 }
   *                   .onEach(async eachEntry => {
   *                       if(eachEntry.key >= 3) return KoconutLoopSignal.BREAK
   *                       console.log(eachEntry.value)
   *                   })
   *                   // ↑ 2
   *                   //   4
   *                   .onEach(eachEntry => new Promise(resolve => {
   *                       if(eachEntry.value == 8) resolve(false)
   *                       else {
   *                           console.log(eachEntry.value)
   *                           resolve()
   *                       }
   *                   }))
   *                   // ↑ 2
   *                   //   4
   *                   //   6
   *                   .yield()
   * console.log(map)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  onEach(
    action: Action<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a map containing only entries matching the given ```predicate```.
   *
   * @param {Predicator<Entry<KeyType, ValueType>>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const evenKeyEntries = await koconutMap
   *                       .filter(eachEntry => eachEntry.key % 2 == 0)
   *                       .yield()
   * console.log(evenKeyEntries)
   * // ↑ Map { 2 => 4, 4 => 8 }
   * ```
   */
  filter(
    predicate: Predicator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a map containing only entries not matching the given ```predicate```.
   *
   * @param {Predicator<Entry<KeyType, ValueType>>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const oddKeyEntries = await koconutMap
   *                       .filterNot(eachEntry => eachEntry.key % 2 == 0)
   *                       .yield()
   * console.log(oddKeyEntries)
   * // ↑ Map { 1 => 2, 3 => 6, 5 => 10 }
   * ```
   */
  filterNot(
    predicate: Predicator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Appends all entries matching the given ```predicate``` to the given destination.
   *
   * @param {Map<KeyType, ValueType>} destination Iterable destination. ```Map``` to be exact.
   *
   * @param {Predicator<Entry<KeyType, ValueType>>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const evenKeyMap = new Map<number, number>()
   * const originalMap = await koconutMap
   *                       .filterTo(
   *                           evenKeyMap,
   *                           eachEntry => eachEntry.key % 2 == 0
   *                       )
   *                       .yield()
   * console.log(evenKeyMap)
   * // ↑ Map { 2 => 4, 4 => 8 }
   * console.log(originalMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  filterTo(
    destination: Map<KeyType, ValueType>,
    predicate: Predicator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Appends all entries not matching the given ```predicate``` to the given destination.
   *
   * @param {Map<KeyType, ValueType>} destination Iterable destination. ```Map``` to be exact.
   *
   * @param {Predicator<Entry<KeyType, ValueType>>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const oddKeyMap = new Map<number, number>()
   * const originalMap = await koconutMap
   *                       .filterNotTo(
   *                           oddKeyMap,
   *                           eachEntry => eachEntry.key % 2 == 0
   *                       )
   *                       .yield()
   * console.log(oddKeyMap)
   * // ↑ Map { 1 => 2, 3 => 6, 5 => 10 }
   * console.log(originalMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  filterNotTo(
    destination: Map<KeyType, ValueType>,
    predicate: Predicator<Entry<KeyType, ValueType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a map containing all entries with key matching the given ```predicate```.
   *
   * @param {Predicator<KeyType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const evenKeyMap = await koconutMap
   *                   .filterKeys(eachKey => eachKey % 2 == 0)
   *                   .yield()
   * console.log(evenKeyMap)
   * // ↑ Map { 2 => 4, 4 => 8 }
   * ```
   */
  filterKeys(
    predicate: Predicator<KeyType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a map containing all entries with value matching the given ```predicate```.
   *
   * @param {Predicator<ValueType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *           .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const valueGreaterThan5Map = await koconutMap
   *                   .filterValues(eachValue => eachValue > 5)
   *                   .yield()
   * console.log(valueGreaterThan5Map)
   * // ↑ Map { 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  filterValues(
    predicate: Predicator<ValueType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a {@link KoconutMap} containing all entries of the original map except
   * the entries the keys of which are contained in ```keys```.
   *
   * @param {KeyType[]} keys Key data to except. It could be plural or singular.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const key1ExceptedMap = await koconutMap
   *                       .minus(1)
   *                       .yield()
   * console.log(key1ExceptedMap)
   * // ↑ Map { 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   *
   * const key3And4ExpectedMap = await koconutMap
   *                           .minus(3, 4)
   *                           .yield()
   * console.log(key3And4ExpectedMap)
   * // ↑ Map { 1 => 2, 2 => 4, 5 => 10 }
   * ```
   */
  minus(...keys: KeyType[]): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a {@link KoconutMap} by replacing or adding entries from given ```entries```.
   *
   * @param {([KeyType, ValueType]| Pair<KeyType, ValueType>| KoconutPair<KeyType, ValueType>| Entry<KeyType, ValueType>| KoconutEntry<KeyType, ValueType>)[]} entries Entries to add or replace. It could be plural or singular.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Manipulator
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const key5ReplacedWith20Map = await koconutMap
   *                           .plus(
   *                               [5, 20]
   *                               // ↑ Also can be
   *                               //   new Pair(5, 20)
   *                               //   Pair.from([5, 20])
   *                               //   new KoconutPair(5, 20)
   *                               //   new Entry(5, 20)
   *                               //   Entry.from([5, 20])
   *                               //   new KoconutEntry(5, 20)
   *                           )
   *                           .yield()
   * console.log(key5ReplacedWith20Map)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 20 }
   *
   * const key6And7AddedMap = await koconutMap
   *                           .plus(
   *                               [6, 12],
   *                               [7, 14]
   *                           )
   *                           .yield()
   * console.log(key6And7AddedMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10, 6 => 12, 7 => 14 }
   * ```
   */
  plus(
    ...entries: (
      | [KeyType, ValueType]
      | Pair<KeyType, ValueType>
      | KoconutPair<KeyType, ValueType>
      | Entry<KeyType, ValueType>
      | KoconutEntry<KeyType, ValueType>
    )[]
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns the value corresponding to the given ```key```, or ```null``` if such a key is not
   * present in this {@link KoconutMap}.
   *
   * @param {KeyType} key Key to search for.
   *
   * @return {KoconutPrimitive<ValueType | null>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const valueOfKey3 = await koconutMap
   *                       .get(3)
   *                       .yield()
   * console.log(valueOfKey3)
   * // ↑ 6
   *
   * const valueOfKey6 = await koconutMap
   *                       .get(6)
   *                       .yield()
   * console.log(valueOfKey6)
   * // ↑ null
   * ```
   */
  get(key: KeyType): KoconutPrimitive<ValueType | null>;
  /**
   * Returns the value to which the specified key is mapped, or ```defaultValue``` if the map contains
   * no mapping for key.
   *
   * @param {KeyType} key Key to search for.
   *
   * @param {ValueType} defaultValue Default value if no entry is found.
   *
   * @return {KoconutPrimitive<ValueType>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const valueOfKey3 = await koconutMap
   *                       .getOrDefault(3, 100)
   *                       .yield()
   * console.log(valueOfKey3)
   * // ↑ 6
   *
   * const valueOfKey6 = await koconutMap
   *                       .getOrDefault(6, 100)
   *                       .yield()
   * console.log(valueOfKey6)
   * // ↑ 100
   * ```
   */
  getOrDefault(
    key: KeyType,
    defaultValue: ValueType,
  ): KoconutPrimitive<ValueType>;
  /**
   * Returns the value for the given ```key```, or the reuslt of the
   * ```defaultValue``` function if there was no entry from the given key.
   *
   * @param {KeyType} key Key to search for.
   *
   * @param {Selector<void, ValueType>} defaultValue Callback function that generates default value. The method will call ```defaultValue``` if no entry is found.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```defaultValue```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<ValueType>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const valueOfKey3 = await koconutMap
   *                       .getOrElse(3, () => 100)
   *                       .yield()
   * console.log(valueOfKey3)
   * // ↑ 6
   *
   * const valueOfKey6 = await koconutMap
   *                       .getOrElse(6, async () => 100)
   *                       .yield()
   * console.log(valueOfKey6)
   * // ↑ 100
   *
   * const valueOfKey7 = await koconutMap
   *                       .getOrElse(7, () => new Promise(resolve => {
   *                           resolve(100)
   *                       }))
   *                       .yield()
   * console.log(valueOfKey7)
   * // ↑ 100
   * ```
   */
  getOrElse(
    key: KeyType,
    defaultValue: Selector<void, ValueType>,
    thisArg?: any,
  ): KoconutPrimitive<ValueType>;
  /**
   * Returns the value of the given key. If no entry is found, it throws {@link KoconutNoSuchElementException}.
   *
   * @param {KeyType} key Key to search for.
   *
   * @return {KoconutPrimitive<ValueType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const valueOfKey3 = await koconutMap
   *                       .getValue(3)
   *                       .yield()
   * console.log(valueOfKey3)
   * // ↑ 6
   *
   * try {
   *   await koconutMap
   *       .getValue(6)
   *       .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut No Such Element Exception
   * }
   * ```
   */
  getValue(key: KeyType): KoconutPrimitive<ValueType>;
  /**
   * Appends all entries yielded from results of ```transform``` function being invoked
   * on each entry of original collection, to the given ```destination```.
   *
   * @param {Array<ResultDataType> | Set<ResultDataType>} destination Iterable destination. ```Array``` or ```Set``` to be exact.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, Iterable<ResultDataType>>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutSet = KoconutSet.of("123", "456")
   *
   * const allNumbersInSet = new Array<number>()
   * await koconutSet
   *       .flatMapTo(
   *           allNumbersInSet,
   *           (eachString) => eachString
   *                   .split('')
   *                   .map(eachCharacter => parseInt(eachCharacter))
   *       )
   *       .process()
   * console.log(allNumbersInSet)
   * // ↑ [ 1, 2, 3, 4, 5, 6 ]
   * ```
   */
  flatMapTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<Entry<KeyType, ValueType>, Iterable<ResultDataType>>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Applies the given ```transform``` function to each entry of the original collection
   * and appends the results to the given ```destination```.
   *
   * @param {Array<ResultDataType> | Set<ResultDataType>} destination Iterable destination. ```Array``` or ```Set``` to be exact.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associate(eachNumber => [eachNumber, eachNumber * 2])
   *
   * const sumsOfKeyValue = new Array<number>()
   * const originalData = await koconutMap
   *                       .mapTo(
   *                           sumsOfKeyValue,
   *                           eachEntry => eachEntry.key + eachEntry.value
   *                       )
   *                       .yield()
   * console.log(sumsOfKeyValue)
   * // ↑ [ 3, 6, 9, 12, 15 ]
   * console.log(originalData)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  mapTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Applies the given ```transform``` function to each entry of the original collection
   * and appends the results to the given ```destination```.
   *
   * @param {Array<ResultDataType> | Set<ResultDataType>} destination Iterable destination. ```Array``` or ```Set``` to be exact.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType | null>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *               .associateWith(eachNumber => eachNumber * 2)
   *
   * const oddKeyKeyValueSum = new Array<number>()
   * const originalData = await koconutMap
   *                       .mapNotNullTo(
   *                           oddKeyKeyValueSum,
   *                           eachEntry => {
   *                               if(eachEntry.key % 2 == 1)
   *                                   return eachEntry.key + eachEntry.value
   *                               // return
   *                               // return null
   *                               // return undefined
   *                               // ↑ You can use any one of
   *                               //   them or just omit it.
   *                           }
   *                       )
   *                       .yield()
   * console.log(oddKeyKeyValueSum)
   * // ↑ [ 3, 9, 15 ]
   * console.log(originalData)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * ```
   */
  mapNotNullTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType | null>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a new ```Map``` with entries having the keys obtained by applying the
   * ```transform``` function to each entry in this object. The value of each of them would be the same
   * as the original entry.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<ResultDataType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *                   .associateWith(eachNumber => eachNumber)
   *
   * const stringifiedKeyMap = await koconutMap
   *                       .mapKeys(eachEntry => eachEntry.key.toString())
   *                       .yield()
   * console.log(stringifiedKeyMap)
   * // ↑ Map { '1' => 1, '2' => 2, '3' => 3, '4' => 4, '5' => 5 }
   *
   * const doubledKeyMap = await koconutMap
   *                   .mapKeys(async eachEntry => eachEntry.key * 2)
   *                   .yield()
   * console.log(doubledKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   *
   * const sumOfKeyValueKeyMap = await koconutMap
   *                   .mapKeys(eachEntry => new Promise(resolve => {
   *                       resolve(eachEntry.key + eachEntry.value)
   *                   }))
   *                   .yield()
   * console.log(sumOfKeyValueKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   * ```
   */
  mapKeys<ResultDataType>(
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType>,
    thisArg?: any,
  ): KoconutMap<ResultDataType, ValueType>;
  /**
   * Populates the given ```destination``` map with entries having keys obtained by applying
   * the ```transform``` function to each entry in this object. The value of each of them would be the same
   * as the original entry.
   *
   * @param {Map<ResultDataType, ValueType>} destination Iterable destination. ```Map``` to be exact.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *                   .associateWith(eachNumber => eachNumber)
   *
   * const stringifiedKeyMap = new Map<string, number>()
   * const doubledKeyMap = new Map<number, number>()
   * const sumOfKeyValueKeyMap = new Map<number, number>()
   * const originalData = await koconutMap
   *                   .mapKeysTo(
   *                       stringifiedKeyMap,
   *                       eachEntry => eachEntry.key.toString()
   *                   )
   *                   .mapKeysTo(
   *                       doubledKeyMap,
   *                       async eachEntry => eachEntry.key * 2
   *                   )
   *                   .mapKeysTo(
   *                       sumOfKeyValueKeyMap,
   *                       eachEntry => new Promise(resolve => {
   *                           resolve(eachEntry.key + eachEntry.value)
   *                       })
   *                   )
   *                   .yield()
   * console.log(stringifiedKeyMap)
   * // ↑ Map { '1' => 1, '2' => 2, '3' => 3, '4' => 4, '5' => 5 }
   * console.log(doubledKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   * console.log(sumOfKeyValueKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   * console.log(originalData)
   * // ↑ Map { 1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5 }
   * ```
   */
  mapKeysTo<ResultDataType>(
    destination: Map<ResultDataType, ValueType>,
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
  /**
   * Returns a new ```Map``` with entries having the keys of this object and the values obtained by applying
   * the ```transform``` function to each entry.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *                   .associateWith(eachNumber => eachNumber)
   *
   * const doubledValueMap = await koconutMap
   *                       .mapValues(eachEntry => eachEntry.value * 2)
   *                       .yield()
   * console.log(doubledValueMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   *
   * const stringifiedValueMap = await koconutMap
   *                       .mapValues(async eachEntry => eachEntry.value.toString())
   *                       .yield()
   * console.log(stringifiedValueMap)
   * // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }
   *
   * const squaredValueMap = await koconutMap
   *                       .mapValues(eachEntry => new Promise(resolve => {
   *                           resolve(eachEntry.value * eachEntry.value)
   *                       }))
   *                       .yield()
   * console.log(squaredValueMap)
   * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
   * ```
   */
  mapValues<ResultDataType>(
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ResultDataType>;
  /**
   * Populates the given ```destination``` ```Map``` with the entries having the keys of this object and
   * the values obtained by applying the ```transform``` function to each entry.
   *
   * @param {Map<KeyType, ResultDataType>} destination Iterable destination. ```Map``` to be exact.
   *
   * @param {Transformer<Entry<KeyType, ValueType>, ResultDataType>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * const koconutMap = KoconutArray.of(1,2,3,4,5)
   *                   .associateWith(eachNumber => eachNumber)
   *
   * const doubledValueMap = new Map<number, number>()
   * const stringifiedValueMap = new Map<number, string>()
   * const squaredValueMap = new Map<number, number>()
   * const originalData = await koconutMap
   *                   .mapValuesTo(
   *                       doubledValueMap,
   *                       eachEntry => eachEntry.value * 2
   *                   )
   *                   .mapValuesTo(
   *                       stringifiedValueMap,
   *                       async eachEntry => eachEntry.value.toString()
   *                   )
   *                   .mapValuesTo(
   *                       squaredValueMap,
   *                       eachEntry => new Promise(resolve => {
   *                           resolve(eachEntry.value * eachEntry.value)
   *                       })
   *                   )
   *                   .yield()
   * console.log(doubledValueMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   * console.log(stringifiedValueMap)
   * // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }
   * console.log(squaredValueMap)
   * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
   * console.log(originalData)
   * // ↑ Map { 1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5 }
   * ```
   */
  mapValuesTo<ResultDataType>(
    destination: Map<KeyType, ResultDataType>,
    transform: Transformer<Entry<KeyType, ValueType>, ResultDataType>,
    thisArg?: any,
  ): KoconutMap<KeyType, ValueType>;
}
