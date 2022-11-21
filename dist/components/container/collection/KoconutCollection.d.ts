import { KoconutPrimitive, KoconutPair, Pair, Entry, KoconutIterable, KoconutArray, KoconutSet, KoconutMap, KoconutBoolean, Sequence, KoconutEquatable, KoconutComparable, Action, Comparator, Operator, IndexedOperator, IndexedAction, Selector, Predicator, IndexedPredicator, Transformer, IndexedTransformer, Zipper } from '../../../module';
import { KoconutEntry } from '../base/KoconutEntry';
/** @internal */
export declare class KoconutCollection<DataType, WrapperType extends Array<DataType> | Sequence<DataType> | Set<DataType>> extends KoconutIterable<DataType, DataType, WrapperType, WrapperType> {
    validate(data: WrapperType | null): Promise<void>;
    private static fromIterable;
    size(): KoconutPrimitive<number>;
    protected mIndices: number[];
    indices(): KoconutArray<number>;
    /**
     * Accumulates value starting with ```initial``` value and applying ```operation```
     * from left to right to current accumulator value and each element.
     * @param {ResultDataType} initial A value to use as the first argument to the first call of the ```operation```.
     * @param {Operator<DataType, ResultDataType>} operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value
     * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element in object.
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<ResultDataType>}
     *
     * @since 1.0.10
     *
     * @category Accumulator
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumOfArray = await koconutArray
     *                 .fold(
     *                     0,
     *                     (acc, eachNumber) => acc + eachNumber
     *                 )
     *                 .yield()
     * console.log(sumOfArray)
     * // ↑ 15
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const multiplesOfSet = await koconutSet
     *                 .fold(
     *                     1,
     *                     async (acc, eachNumber) => acc * eachNumber
     *                 )
     *                 .yield()
     * console.log(multiplesOfSet)
     * // ↑ 120
     * ```
     */
    fold<ResultDataType>(initial: ResultDataType, operation: Operator<DataType, ResultDataType>, thisArg?: any): KoconutPrimitive<ResultDataType>;
    /**
     * Accumulates value starting with ```initial``` value and applying ```operation```
     * from left to right to current accumulator value and each element.
     *
     * @param {ResultDataType} initial A value to use as the first argument to the first call of the ```operation```.
     *
     * @param {IndexedOperator<DataType, ResultDataType>} operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value
     * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element and index in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<ResultDataType>}
     *
     * @since 1.0.10
     *
     * @category Accumulator
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumOfNumberAndIndexInArray = await koconutArray
     *                 .foldIndexed(
     *                     0,
     *                     (index, acc, eachNumber) => index + acc + eachNumber
     *                 )
     *                 .yield()
     * console.log(sumOfNumberAndIndexInArray)
     * // ↑ 25
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const multiplesOfNumberAndIndexInSet = await koconutSet
     *                 .foldIndexed(
     *                     1,
     *                     async (index, acc, eachNumber) => index * acc * eachNumber
     *                 )
     *                 .yield()
     * console.log(multiplesOfNumberAndIndexInSet)
     * // ↑ 0
     * ```
     */
    foldIndexed<ResultDataType>(initial: ResultDataType, operation: IndexedOperator<DataType, ResultDataType>, thisArg?: any): KoconutPrimitive<ResultDataType>;
    /**
     * Checks if the specified element is contained in this collection.
     * @param {DataType} element The element to search for.
     *
     * @return {KoconutBoolean}
     *
     * @since 1.0.10
     *
     * @category Inspector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doesArrayContain3 = await koconutArray
     *                               .contains(3)
     *                               .yield()
     * console.log(doesArrayContain3)
     * // ↑ true
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doesSetContains6 = await koconutSet
     *                               .contains(6)
     *                               .yield()
     * console.log(doesSetContains6)
     * // ↑ false
     * ```
     */
    contains(element: DataType): KoconutBoolean;
    /**
     * Checks if all the elements are contained in this collection.
     *
     * @param {Iterable<DataType>} elements The elements to search for.
     *
     * @return {KoconutBoolean}
     *
     * @since 1.0.10
     *
     * @category Inspector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doesArrayContain1to3 = await koconutArray
     *                               .containsAll([1,2,3])
     *                               .yield()
     * console.log(doesArrayContain1to3)
     * // ↑ true
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doesSetContains5to6 = await koconutSet
     *                               .containsAll([5,6,7])
     *                               .yield()
     * console.log(doesSetContains5to6)
     * // ↑ false
     * ```
     */
    containsAll(elements: Iterable<DataType>): KoconutBoolean;
    /**
     * Performs the given ```action``` on each element, providing sequential index with the element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     *
     * @param {IndexedAction<DataType>} action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<void>}
     *
     * @category Iterator
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5,6,7)
     *
     * await koconutArray
     *       .forEachIndexed(console.log)
     *       // ↑ 0 1
     *       //   1 2
     *       //   2 3
     *       //   3 4
     *       //   4 5
     *       //   5 6
     *       //   6 7
     *       .process()
     *
     * await koconutArray
     *       .forEachIndexed((eachIndex, eachNumber) => {
     *           if(eachIndex == 3) return KoconutLoopSignal.BREAK
     *           console.log(eachNumber)
     *       })
     *       // ↑ 1 2 3 -- i.e. Since when the index is '3', the loop is interrupted.
     *       // The last printed number(element) would be '3'.
     *       .process()
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,1,2,3)
     *
     * await koconutSet
     *       .forEachIndexed(console.log)
     *       // ↑ 0 1
     *       //   1 2
     *       //   2 3
     *       .process()
     *
     * await koconutSet
     *       .forEachIndexed((eachIndex, eachNumber) => {
     *           if(eachIndex != 0 && eachIndex % 2 == 0) return false
     *           console.log(eachNumber)
     *       })
     *       // ↑ 1 2 -- i.e. Since when the index '2', it's an even number.
     *       // So the loop is interrupted.
     *       // The last printed number(element) would be '2'
     *       .process()
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3)
     *
     * await koconutArray2
     *       .forEachIndexed(async (eachIndex, eachNumber) =>
     *                       console.log(eachIndex, eachNumber))
     *       // ↑ 0 1
     *       //   1 2
     *       //   2 3
     *       .process()
     *
     * await koconutArray2
     *       .forEachIndexed(async (eachIndex, eachNumber) => new Promise(resolve => {
     *           resolve(console.log(eachIndex, eachNumber))
     *       }))
     *       // ↑ 0 1
     *       //   1 2
     *       //   2 3
     *       .process()
     * ```
     */
    forEachIndexed(action: IndexedAction<DataType>, thisArg?: any): KoconutPrimitive<void>;
    onEach(action: Action<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    onEachIndexed(action: IndexedAction<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    distinct(): KoconutCollection<DataType, WrapperType>;
    distinctBy<KeyType, EquatableKeyType extends KoconutEquatable>(selector: Selector<DataType, KeyType | EquatableKeyType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    drop(n: number): KoconutCollection<DataType, WrapperType>;
    dropLast(n: number): KoconutCollection<DataType, WrapperType>;
    dropLastWhile(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    dropWhile(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filter(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterNot(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterTo(destination: Array<DataType> | Set<DataType>, predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterNotTo(destination: Array<DataType> | Set<DataType>, predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterIndexed(predicate: IndexedPredicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterIndexedTo(destination: Array<DataType> | Set<DataType>, predicate: IndexedPredicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    filterNotNull(): KoconutCollection<DataType, WrapperType>;
    filterNotNullTo(destination: Array<DataType> | Set<DataType>): KoconutCollection<DataType, WrapperType>;
    sortedBy(selector: Selector<DataType, number | string | KoconutComparable>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    sortedByDescending(selector: Selector<DataType, number | string | KoconutComparable>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    sortedWith(comparator: Comparator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    take(n: number): KoconutCollection<DataType, WrapperType>;
    takeLast(n: number): KoconutCollection<DataType, WrapperType>;
    takeLastWhile(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    takeWhile(predicate: Predicator<DataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Returns an element at the given ```index``` or throws an {@link KoconutIndexOutOfBoundsException} if the ```index``` is out of bounds of this collection.
     *
     * @param {number} index The index of element to search for.
     *
     * @return {KoconutPrimitive<DataType>}
     *
     * @throws {@link KoconutIndexOutOfBoundsException}
     * -- When ```index``` is less than 0 or greater than lenth.
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Caes 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const elementAtIndex3OfArray = await koconutArray
     *                                     .elementAt(3)
     *                                     .yield()
     * console.log(elementAtIndex3OfArray)
     * // ↑ 4
     *
     * try {
     *     await koconutArray
     *             .elementAt(10)
     *             .yield()
     * } catch(error) {
     *     console.log(error.name)
     *     // ↑ Koconut Index Out Of Bounds Exception
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const elementAtIndex2OfSet = await koconutSet
     *                                     .elementAt(2)
     *                                     .yield()
     * console.log(elementAtIndex2OfSet)
     * // ↑ 3
     *
     * try {
     *     await koconutSet
     *             .elementAt(-2)
     *             .yield()
     * } catch(error) {
     *     console.log(error.name)
     *     // ↑ Koconut Index Out Of Bounds Exception
     * }
     * ```
     */
    elementAt(index: number): KoconutPrimitive<DataType>;
    /**
     * Returns an element at the given ```index``` or the result of calling the ```defaultValue``` function
     * if the ```index``` is out of bounds of this collection.
     * @param {number} index The index of element to search for.
     * @param {Selector<number, DataType>} defaultValue A callback function that accepts an argument. The method calls the ```defaultValue``` function when ```index``` is out of bounds.
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```defaultValue```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<DataType>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const elementAtIndex3OfArray = await koconutArray
     *                                 .elementAtOrElse(3, index => 0)
     *                                 .yield()
     * console.log(elementAtIndex3OfArray)
     * // ↑ 4
     *
     * const elementAtIndex10OfArray = await koconutArray
     *                                 .elementAtOrElse(10, index => 0)
     *                                 .yield()
     * console.log(elementAtIndex10OfArray)
     * // ↑ 0
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const elementAtIndex2OfSet = await koconutSet
     *                                 .elementAtOrElse(2, index => 0)
     *                                 .yield()
     * console.log(elementAtIndex2OfSet)
     * // ↑ 3
     *
     * const elementAtIndexNegative2OfSet = await koconutSet
     *                                 .elementAtOrElse(-2, index => 0)
     *                                 .yield()
     * console.log(elementAtIndexNegative2OfSet)
     * // ↑ 0
     * ```
     */
    elementAtOrElse(index: number, defaultValue: Selector<number, DataType>, thisArg?: any): KoconutPrimitive<DataType>;
    /**
     * Returns an element at the given ```index``` or ```null``` if the index is out of bounds of this collection.
     * @param {number} index The index of element to search for.
     *
     * @return {KoconutPrimitive<DataType | null>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const elementAtIndex3OfArray = await koconutArray
     *                                 .elementAtOrNull(3)
     *                                 .yield()
     * console.log(elementAtIndex3OfArray)
     * // ↑ 4
     *
     * const elementAtIndex10OfArray = await koconutArray
     *                                 .elementAtOrNull(10)
     *                                 .yield()
     * console.log(elementAtIndex10OfArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const elementAtIndex2OfSet = await koconutSet
     *                                 .elementAtOrNull(2)
     *                                 .yield()
     * console.log(elementAtIndex2OfSet)
     * // ↑ 3
     *
     * const elementAtIndexNegative2OfSet = await koconutSet
     *                                 .elementAtOrNull(-2)
     *                                 .yield()
     * console.log(elementAtIndexNegative2OfSet)
     * // ↑ null
     * ```
     */
    elementAtOrNull(index: number): KoconutPrimitive<DataType | null>;
    /**
     * Returns the first element matching the given ```predicate```, or ```null``` if no such element was found.
     *
     * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<DataType | null>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const foundEventNumberOfArray = await koconutArray
     *                                 .find(eachNumber => eachNumber % 2 == 0)
     *                                 .yield()
     * console.log(foundEventNumberOfArray)
     * // ↑ 2
     *
     * const foundMultiplesOf10Array = await koconutArray
     *                                 .find(eachNumber => eachNumber % 10 == 0)
     *                                 .yield()
     * console.log(foundMultiplesOf10Array)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const foundOddNumberOfSet = await koconutSet
     *                                 .find(eachNumber => eachNumber % 2 == 1)
     *                                 .yield()
     * console.log(foundOddNumberOfSet)
     * // ↑ 1
     *
     * const foundMultiplesOf10OfSet = await koconutSet
     *                                 .find(eachNumber => eachNumber % 10 == 0)
     *                                 .yield()
     * console.log(foundMultiplesOf10OfSet)
     * // ↑ null
     * ```
     */
    find(predicate: Predicator<DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    /**
     * Returns the last element matching the given ```predicate```, or ```null``` if no such element was found.
     *
     * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<DataType | null>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const lastEventNumberOfArray = await koconutArray
     *                                 .findLast(eachNumber => eachNumber % 2 == 0)
     *                                 .yield()
     * console.log(lastEventNumberOfArray)
     * // ↑ 4
     *
     * const lastMultiplesOf10Array = await koconutArray
     *                                 .findLast(eachNumber => eachNumber % 10 == 0)
     *                                 .yield()
     * console.log(lastMultiplesOf10Array)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const lastOddNumberOfSet = await koconutSet
     *                                 .findLast(eachNumber => eachNumber % 2 == 1)
     *                                 .yield()
     * console.log(lastOddNumberOfSet)
     * // ↑ 5
     *
     * const lastMultiplesOf10OfSet = await koconutSet
     *                                 .findLast(eachNumber => eachNumber % 10 == 0)
     *                                 .yield()
     * console.log(lastMultiplesOf10OfSet)
     * // ↑ null
     * ```
     */
    findLast(predicate: Predicator<DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    /**
     * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
     * method will just return the very first element of this collection. If source data is null or no element
     * matching given ```predicate``` is found, it throws {@link KoconutNoSuchElementException}.
     *
     * @param {Predicator<DataType> | null } predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<DataType>}
     *
     * @throws {@link KoconutNoSuchElementException}
     * -- When source data is empty or no element matching given ```predicate``` is found.
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const firstNumberOfArray = await koconutArray
     *                                     .first()
     *                                     .yield()
     * console.log(firstNumberOfArray)
     * // ↑ 1
     *
     * const firstEventNumberOfArray = await koconutArray
     *                             .first(eachNumber => eachNumber % 2 == 0)
     *                             .yield()
     * console.log(firstEventNumberOfArray)
     * // ↑ 2
     *
     * try {
     *     await koconutArray
     *             .filter(eachNumber => eachNumber > 10)
     *             .first()
     *             .yield()
     * } catch(error) {
     *     console.log(error.name)
     *     // ↑ Koconut No Such Element Exception
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const firstNumberOfSet = await koconutSet
     *                                 .first()
     *                                 .yield()
     * console.log(firstNumberOfSet)
     * // ↑ 1
     *
     * const firstOddNumberOfSet = await koconutSet
     *                             .first(eachNumber => eachNumber % 2 == 1)
     *                             .yield()
     * console.log(firstOddNumberOfSet)
     * // ↑ 1
     * ```
     */
    first(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType>;
    /**
     * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
     * method will just return the very first element of this collection. If source data is null or no element
     * matching given ```predicate``` is found, it returns ```null```.
     * @param {Predicator<DataType> | null} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<DataType | null>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const firstNumberOfArray = await koconutArray
     *                                     .firstOrNull()
     *                                     .yield()
     * console.log(firstNumberOfArray)
     * // ↑ 1
     *
     * const firstEventNumberOfArray = await koconutArray
     *                             .firstOrNull(eachNumber => eachNumber % 2 == 0)
     *                             .yield()
     * console.log(firstEventNumberOfArray)
     * // ↑ 2
     *
     * const firstNumberOfEmptyArray = await koconutArray
     *                                 .filter(eachNumber => eachNumber > 10)
     *                                 .firstOrNull()
     *                                 .yield()
     * console.log(firstNumberOfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const firstNumberOfSet = await koconutSet
     *                                 .firstOrNull()
     *                                 .yield()
     * console.log(firstNumberOfSet)
     * // ↑ 1
     *
     * const firstOddNumberOfSet = await koconutSet
     *                             .firstOrNull(eachNumber => eachNumber % 2 == 1)
     *                             .yield()
     * console.log(firstOddNumberOfSet)
     * // ↑ 1
     * ```
     */
    firstOrNull(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    /**
     * Returns first index of element. or -1 if the collection does not contains element.
     * @param {DataType} elementToFind The element to search for.
     *
     * @return {KoconutPrimitive<number>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const indexOf3 = await koconutArray
     *                         .indexOf(3)
     *                         .yield()
     * console.log(indexOf3)
     * // ↑ 2
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const indexOf10 = await koconutSet
     *                         .indexOf(10)
     *                         .yield()
     * console.log(indexOf10)
     * // ↑ -1
     * ```
     */
    indexOf(elementToFind: DataType): KoconutPrimitive<number>;
    /**
     * Returns index of the first element matching the given ```predicate```, or -1 if the
     * collection does not contain such element.
     *
     * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<number>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const indexOfFirstEven = await koconutArray
     *                         .indexOfFirst(eachNumber => eachNumber % 2 == 0)
     *                         .yield()
     * console.log(indexOfFirstEven)
     * // ↑ 1
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const indexOfFirstOdd = await koconutSet
     *                         .indexOfFirst(eachNumber => eachNumber % 2 == 1)
     *                         .yield()
     * console.log(indexOfFirstOdd)
     * // ↑ 0
     * ```
     */
    indexOfFirst(predicate: Predicator<DataType>, thisArg?: any): KoconutPrimitive<number>;
    /**
     * Returns index of the last element matching the given ```predicate```, or -1 if the
     * collection does not contain such element.
     *
     * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutPrimitive<number>}
     *
     * @since 1.0.10
     *
     * @category Selector
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const indexOfLastEven = await koconutArray
     *                         .indexOfLast(eachNumber => eachNumber % 2 == 0)
     *                         .yield()
     * console.log(indexOfLastEven)
     * // ↑ 3
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const indexOfLastOdd = await koconutSet
     *                         .indexOfLast(eachNumber => eachNumber % 2 == 1)
     *                         .yield()
     * console.log(indexOfLastOdd)
     * // ↑ 4
     * ```
     */
    indexOfLast(predicate: Predicator<DataType>, thisArg?: any): KoconutPrimitive<number>;
    /**
     * Returns a {@link KoconutMap} containing key-value paired {@link Entry} provided by ```transform```
     * function applied to elements of the given collection.
     * @param {Transformer<DataType,[KeyType, ValueType]| Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Entry<KeyType, ValueType>| KoconutEntry<KeyType, ValueType>>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
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
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledValueMap = await koconutArray
     *                       .associate(eachNumber =>
     *                           [eachNumber, eachNumber * 2]
     *                           // ↑ Also can be
     *                           //   new Pair(eachNumber, eachNumber * 2)
     *                           //   Pair.from([eachNumber, eachNumber * 2])
     *                           //   new KoconutPair(eachNumber, eachNumber * 2)
     *                           //   new Entry(eachNumber, eachNumber * 2)
     *                           //   Entry.from([eachNumber, eachNumber * 2])
     *                           //   new KoconutEntry(eachNumber, eachNumber * 2)
     *                       )
     *                       .yield()
     * console.log(doubledValueMap)
     * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doubledKeyMap = await koconutSet
     *                   .associate(eachNumber => [eachNumber * 2, eachNumber])
     *                   .yield()
     * console.log(doubledKeyMap)
     * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const squaredValueMap = await koconutArray2
     *               .associate(async eachNumber => [eachNumber, eachNumber * eachNumber])
     *               .yield()
     * console.log(squaredValueMap)
     * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
     *
     * const squaredKeyMap = await koconutArray2
     *               .associate(async eachNumber => new Promise<[number, number]>(resolve => {
     *                   resolve([eachNumber * eachNumber, eachNumber])
     *               }))
     *               .yield()
     * console.log(squaredKeyMap)
     * // ↑ Map { 1 => 1, 4 => 2, 9 => 3, 16 => 4, 25 => 5 }
     * ```
     */
    associate<KeyType, ValueType>(transform: Transformer<DataType, [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Entry<KeyType, ValueType> | KoconutEntry<KeyType, ValueType>>, thisArg?: any): KoconutMap<KeyType, ValueType>;
    /**
     * Returns a {@link KoconutMap} containing the elements from the given collection indexed by the key
     * returned from ```keySelector``` function applied to each element.
     * ```valueTransform``` callback function is optional. If it's not omitted the method returns
     * a {@link KoconutMap} instance containing the values provide by the function and indexed by ```keySelector```
     * applied to elements of the given collection.
     *
     * @param {Selector<DataType, KeyType>} keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
     *
     * @param {Transformer<DataType, ValueType> | null} valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
     *
     * @param {any} keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @param {any} valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutMap<KeyType, ValueType>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledKeyMap = await koconutArray
     *                       .associateBy(eachNumber => eachNumber * 2)
     *                       .yield()
     * console.log(doubledKeyMap)
     * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doubledKeyValueMap = await koconutSet
     *                           .associateBy(
     *                               eachNumber => eachNumber * 2,
     *                               eachNumber => eachNumber * 2
     *                           )
     *                           .yield()
     * console.log(doubledKeyValueMap)
     * // ↑ Map { 2 => 2, 4 => 4, 6 => 6, 8 => 8, 10 => 10 }
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledKeySquaredValueMap = await koconutArray2
     *                   .associateBy(
     *                       async eachNumber => eachNumber * 2,
     *                       eachNumber => new Promise(resolve => {
     *                           resolve(eachNumber * eachNumber)
     *                       })
     *                   )
     *                   .yield()
     * console.log(doubledKeySquaredValueMap)
     * // ↑ Map { 2 => 1, 4 => 4, 6 => 9, 8 => 16, 10 => 25 }
     * ```
     */
    associateBy<KeyType, ValueType = DataType>(keySelector: Selector<DataType, KeyType>, valueTransform?: Transformer<DataType, ValueType> | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutMap<KeyType, ValueType>;
    associateByTo<KeyType, ValueType = DataType>(destination: Map<KeyType, ValueType>, keySelector: Selector<DataType, KeyType>, valueTransform: Transformer<DataType, ValueType> | null, keySelectorThisArg: any, valueTransformThisArg: any): KoconutCollection<DataType, WrapperType>;
    associateTo<KeyType, ValueType>(destination: Map<KeyType, ValueType>, transform: Transformer<DataType, [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Entry<KeyType, ValueType> | KoconutEntry<KeyType, ValueType>>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Returns a {@link KoconutMap} where keys are original elements of the current object and values
     * are produced by the ```valueSelector``` function applied to each element.
     *
     * @param {Selector<DataType, ValueType>} valueSelector A callback function that accepts an argument. The method calls the ```valueSelector``` one time for each element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```valueSelector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutMap<DataType, ValueType>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledValueMap = await koconutArray
     *                       .associateWith(eachNumber => eachNumber * 2)
     *                       .yield()
     * console.log(doubledValueMap)
     * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const stringifiedValueMap = await koconutSet
     *                       .associateWith(eachNumber => eachNumber.toString())
     *                       .yield()
     * console.log(stringifiedValueMap)
     * // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const squaredValueMap = await koconutArray2
     *                   .associateWith(async eachNumber => eachNumber * 2)
     *                   .yield()
     * console.log(squaredValueMap)
     * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
     *
     * const tripledValueMap = await koconutArray2
     *                   .associateWith(eachNumber => new Promise(resolve => {
     *                       resolve(eachNumber * 3)
     *                   }))
     *                   .yield()
     * console.log(tripledValueMap)
     * // ↑ Map { 1 => 3, 2 => 6, 3 => 9, 4 => 12, 5 => 15 }
     * ```
     */
    associateWith<ValueType>(valueSelector: Selector<DataType, ValueType>, thisArg?: any): KoconutMap<DataType, ValueType>;
    associateWithTo<ValueType>(destination: Map<DataType, ValueType>, valueSelector: Selector<DataType, ValueType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Splits this collection into a {@link KoconutArray} of ```Arrays```
     * each not exceeding the given ```size```.
     * @param {number} size The number of elements to take in each ```Array```, must be positive and can be greater than the number of elements in this collection.
     * @param {Transformer<Array<DataType>, ResultDataType> | null} transform A callback function that accepts an argument. The method calls the ```transform``` with chunked data ```array``` when it's not omitted.
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @returns {KoconutArray<Array<DataType> | ResultDataType>}
     *
     * @throws {@link KoconutInvalidArgumentException}
     * -- When ```size``` is not greater than 0.
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const chunkedArray = await koconutArray
     *                       .chunked(3)
     *                       .yield()
     * console.log(chunkedArray)
     * // ↑ [ [ 1, 2, 3 ], [ 4, 5 ] ]
     *
     * try {
     *   await koconutArray
     *       .chunked(0)
     *       .yield()
     * } catch(error) {
     *   console.log(error.name)
     *   // ↑ Koconut Invalid Argument Exception
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const chunkedSum = await koconutSet
     *       .chunked(
     *           3,
     *           numbers => numbers
     *                       .reduce(
     *                           (acc, eachNumber) => acc + eachNumber, 0
     *                       )
     *       )
     *       .yield()
     * console.log(chunkedSum)
     * // ↑ [ 6, 9 ]
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const chunkedMax = await koconutArray2
     *       .chunked(
     *           2,
     *           async numbers => await KoconutArray
     *                                   .from(numbers)
     *                                   .maxByOrNull(
     *                                       eachNumber => eachNumber
     *                                   )
     *                                   .yield()
     *       )
     *       .yield()
     * console.log(chunkedMax)
     * // ↑ [ 2, 4, 5 ]
     *
     * const chunkedMin = await koconutArray2
     *       .chunked(
     *           2,
     *           numbers => KoconutArray
     *                       .from(numbers)
     *                       .minByOrNull(
     *                           eachNumber => eachNumber
     *                       )
     *                       .yield()
     *       )
     *       .yield()
     * console.log(chunkedMin)
     * // ↑ [ 1, 3, 5 ]
     * ```
     */
    chunked<ResultDataType>(size: number, transform: Transformer<Array<DataType>, ResultDataType> | null, thisArg: any): KoconutArray<Array<DataType> | ResultDataType>;
    /** @ignore */
    chunked(size: number): KoconutArray<Array<DataType>>;
    /** @ignore */
    chunked<ResultDataType>(size: number, transform: Transformer<Array<DataType>, ResultDataType>): KoconutArray<ResultDataType>;
    /** @ignore */
    chunked<ResultDataType>(size: number, transform: Transformer<Array<DataType>, ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    /**
     * Returns a {@link KoconutArray} of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
     *
     * @param {IndexedTransformer<DataType, Iterable<ResultDataType>>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutArray<ResultDataType>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(100, 101, 102)
     *
     * const allNumbersAndIndexOfArray = await koconutArray
     *                           .flatMapIndexed((eachIndex, eachNumber) =>
     *                               [eachIndex, eachNumber]
     *                           )
     *                           .yield()
     * console.log(allNumbersAndIndexOfArray)
     * // ↑ [ 0, 100, 1, 101, 2, 102 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(100, 101, 102)
     *
     * const allNumbersAndIndexOfSet = await koconutSet
     *                           .flatMapIndexed((eachIndex, eachNumber) =>
     *                               [eachIndex, eachNumber]
     *                           )
     *                           .yield()
     * console.log(allNumbersAndIndexOfSet)
     * // ↑ [ 0, 100, 1, 101, 2, 102 ]
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(123, 987)
     *
     * const allDigitsAndIndexInArray = await koconutArray2
     *                       .flatMapIndexed(async (eachIndex, eachNumber) => {
     *                           const digits = new Array<number>()
     *                           while(eachNumber != 0) {
     *                               digits.unshift(eachNumber % 10)
     *                               eachNumber = Math.floor(eachNumber / 10)
     *                           }
     *                           return [eachIndex, ...digits]
     *                       })
     *                       .yield()
     * console.log(allDigitsAndIndexInArray)
     * // ↑ [
     * //     0, 1, 2, 3,
     * //     1, 9, 8, 7
     * //   ]
     *
     * const allNumberAndIndexCharactersInArray = await koconutArray2
     *           .flatMapIndexed((eachInex, eachNumber) => new Promise<string>(resolve => {
     *               resolve(`${eachInex}${eachNumber}`)
     *           }))
     *           .yield()
     * console.log(allNumberAndIndexCharactersInArray)
     * // ↑ [
     * //     '0', '1', '2',
     * //     '3', '1', '9',
     * //     '8', '7'
     * //   ]
     * ```
     */
    flatMapIndexed<ResultDataType>(transform: IndexedTransformer<DataType, Iterable<ResultDataType>>, thisArg?: any): KoconutArray<ResultDataType>;
    flatMapTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: Transformer<DataType, Iterable<ResultDataType>>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    flatMapIndexedTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: IndexedTransformer<DataType, Iterable<ResultDataType>>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Groups values returned by the ```valueTransform``` function applied to each element of the original collection
     * by the key returned by the given ```keySelector``` function applied to the element and returns a map where each
     * group key is associated with a list of corresponding values. If ```valueTransform``` is omitted, the ```value``` of
     * each entry would be original element.
     *
     * @param {Selector<DataType, KeyType>} keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
     *
     * @param {Transformer<DataType, ValueType> | null} valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
     *
     * @param {any} keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @param {any} valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutMap<KeyType, Array<ValueType>>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const groupedByOddParity = await koconutArray
     *                             .groupBy(eachNumber => eachNumber % 2 == 1)
     *                             .yield()
     * console.log(groupedByOddParity)
     * // ↑ Map { true => [ 1, 3, 5 ], false => [ 2, 4 ] }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const groupedByEvenParityToString = await koconutSet
     *                             .groupBy(
     *                                 eachNumber => eachNumber % 2 == 0,
     *                                 eachNumber => eachNumber.toString()
     *                             )
     *                             .yield()
     * console.log(groupedByEvenParityToString)
     * // ↑ Map { false => [ '1', '3', '5' ], true => [ '2', '4' ] }
     * ```
     */
    groupBy<KeyType, ValueType = DataType>(keySelector: Selector<DataType, KeyType>, valueTransform?: Transformer<DataType, ValueType> | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutMap<KeyType, Array<ValueType>>;
    groupByTo<KeyType, ValueType = DataType>(destination: Map<KeyType, Array<ValueType>>, keySelector: Selector<DataType, KeyType>, valueTransform: Transformer<DataType, ValueType> | null, keySelectorThisArg: any, valueTransformThisArg: any): KoconutCollection<DataType, WrapperType>;
    mapTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: Transformer<DataType, ResultDataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    mapNotNullTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: Transformer<DataType, ResultDataType | void | null | undefined>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Returns a list of all elements yielded from results of ```transform``` function being invoked
     * on each element and its index in the original collection.
     *
     * @param {IndexedTransformer<DataType, ResultDataType>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutArray<ResultDataType>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbers = await koconutArray
     *                   .mapIndexed((eachIndex, eachNumber) => eachIndex + eachNumber)
     *                   .yield()
     * console.log(sumsOfIndexesAndNumbers)
     * // ↑ [ 1, 3, 5, 7, 9 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const productsOfIndexesAndNumbers = await koconutSet
     *                   .mapIndexed((eachIndex, eachNumber) => eachIndex * eachNumber)
     *                   .yield()
     * console.log(productsOfIndexesAndNumbers)
     * // ↑ [ 0, 2, 6, 12, 20 ]
     *
     * // Case 3 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const averagesOfIndexesAndNumbers = await koconutArray2
     *                   .mapIndexed(async (eachIndex, eachNumber) => (eachIndex + eachNumber)/2)
     *                   .yield()
     * console.log(averagesOfIndexesAndNumbers)
     * // ↑ [ 0.5, 1.5, 2.5, 3.5, 4.5 ]
     *
     * const indexesMinusNumbers = await koconutArray2
     *               .mapIndexed((eachIndex, eachNumber) => new Promise(resolve => {
     *                   resolve(eachIndex - eachNumber)
     *               }))
     *               .yield()
     * console.log(indexesMinusNumbers)
     * // ↑ [ -1, -1, -1, -1, -1 ]
     * ```
     */
    mapIndexed<ResultDataType>(transform: IndexedTransformer<DataType, ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    mapIndexedTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: IndexedTransformer<DataType, ResultDataType>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    /**
     * Returns a {@link KoconutArray} containing only the results that are not ```null``` nor ```undefined``` of applying
     * the given ```transform``` function to each element and its index in the original collection.
     *
     * @param {IndexedTransformer< DataType,ResultDataType | void | null | undefined>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     *
     * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     *
     * @return {KoconutArray<ResultDataType>}
     *
     * @since 1.0.10
     *
     * @category Transformer
     *
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbersWhereNumberIsEven = await koconutArray
     *                   .mapIndexedNotNull((eachIndex, eachNumber) => {
     *                       if(eachNumber % 2 == 0)
     *                           return eachIndex + eachNumber
     *                       // return
     *                       // return null
     *                       // return undefined
     *                       // ↑ You can use any one of
     *                       //   them or just omit it.
     *                   })
     *                   .yield()
     * console.log(sumsOfIndexesAndNumbersWhereNumberIsEven)
     * // ↑ [ 3, 7 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const productsOfIndexesAndNumbersWhereIndexLessThan2 = await koconutSet
     *                   .mapIndexedNotNull((eachIndex, eachNumber) => {
     *                       if(eachIndex <= 2)
     *                           return eachIndex * eachNumber
     *                   })
     *                   .yield()
     * console.log(productsOfIndexesAndNumbersWhereIndexLessThan2)
     * // ↑ [ 0, 2, 6 ]
     *
     * // Case 3 - You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbersWhereNumberIsOdd = await koconutArray2
     *                   .mapIndexedNotNull(async (eachIndex, eachNumber) => {
     *                       if(eachNumber % 2 == 1)
     *                           return eachIndex + eachNumber
     *                   })
     *                   .yield()
     * console.log(sumsOfIndexesAndNumbersWhereNumberIsOdd)
     * // ↑ [ 1, 5, 9 ]
     *
     * const squaredNumbersWhereIndexIsEven = await koconutArray2
     *           .mapIndexedNotNull((eachIndex, eachNumber) => new Promise<number | null>(resolve => {
     *               if(eachIndex % 2 == 0)
     *                   resolve(eachNumber * eachNumber)
     *               else resolve(null)
     *           }))
     *           .yield()
     * console.log(squaredNumbersWhereIndexIsEven)
     * // ↑ [ 1, 9, 25 ]
     * ```
     */
    mapIndexedNotNull<ResultDataType>(transform: IndexedTransformer<DataType, ResultDataType | void | null | undefined>, thisArg?: any): KoconutArray<ResultDataType>;
    mapIndexedNotNullTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: IndexedTransformer<DataType, ResultDataType | void | null | undefined>, thisArg: any): KoconutCollection<DataType, WrapperType>;
    intersect(other: Iterable<DataType>): KoconutSet<DataType>;
    join(separator?: string, prefix?: string, postfix?: string, limit?: number, truncated?: string, transform?: Transformer<DataType, any> | null, thisArg?: any): KoconutPrimitive<string>;
    last(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType>;
    lastIndexOf(element: DataType): KoconutPrimitive<number>;
    lastOrNull(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    minus(elements: DataType | Iterable<DataType>): KoconutCollection<DataType, WrapperType>;
    minusElement(element: DataType): KoconutCollection<DataType, WrapperType>;
    partition(predicate: Predicator<DataType>, thisArg?: any): KoconutPair<WrapperType, WrapperType>;
    plus(elements: DataType | Iterable<DataType>): KoconutCollection<DataType, WrapperType>;
    plusElement(element: DataType): KoconutCollection<DataType, WrapperType>;
    random(): KoconutPrimitive<DataType>;
    randomOrNull(): KoconutPrimitive<DataType | null>;
    reduce(operation: Operator<DataType, DataType>, thisArg?: any): KoconutPrimitive<DataType>;
    reduceIndexed(operation: IndexedOperator<DataType, DataType>, thisArg?: any): KoconutPrimitive<DataType>;
    reduceIndexedOrNull(operation: IndexedOperator<DataType, DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    reduceOrNull(operation: Operator<DataType, DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    reversed(): KoconutCollection<DataType, WrapperType>;
    runningFold<ResultDataType>(initial: ResultDataType, operation: Operator<DataType, ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    runningFoldIndexed<ResultDataType>(initial: ResultDataType, operation: IndexedOperator<DataType, ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    runningReduce(operation: Operator<DataType, DataType>, thisArg?: any): KoconutArray<DataType>;
    runningReduceIndexed(operation: IndexedOperator<DataType, DataType>, thisArg?: any): KoconutArray<DataType>;
    scan<ResultDataType>(initial: ResultDataType, operation: Operator<DataType, ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    scanIndexed<ResultDataType>(initial: ResultDataType, operation: IndexedOperator<DataType, ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    shuffled(): KoconutCollection<DataType, WrapperType>;
    single(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType>;
    singleOrNull(predicate?: Predicator<DataType> | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    subtract(other: Iterable<DataType>): KoconutSet<DataType>;
    sumBy(selector: Selector<DataType, number>, thisArg?: any): KoconutPrimitive<number>;
    union(other: Iterable<DataType>): KoconutSet<DataType>;
    windowed<ResultDataType>(size: number, step: number, partialWindows: boolean, transform: Transformer<Array<DataType>, ResultDataType> | null, thisArg: any): KoconutArray<Array<DataType> | ResultDataType>;
    /** @ignore */
    windowed(size: number): KoconutArray<Array<DataType>>;
    /** @ignore */
    windowed(size: number, step: number): KoconutArray<Array<DataType>>;
    /** @ignore */
    windowed(size: number, step: number, partialWindows: boolean): KoconutArray<Array<DataType>>;
    /** @ignore */
    windowed<ResultDataType>(size: number, step: number, partialWindows: boolean, transform: Transformer<Array<DataType>, ResultDataType>): KoconutArray<ResultDataType>;
    /** @ignore */
    windowed<ResultDataType>(size: number, step: number, partialWindows: boolean, transform: Transformer<Array<DataType>, ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    withIndex(): KoconutArray<Entry<number, DataType>>;
    zip<OtherDataType, ResultDataType>(other: Iterable<OtherDataType>, transform: Zipper<DataType, OtherDataType, ResultDataType> | null, thisArg: any): KoconutArray<Pair<DataType, OtherDataType> | ResultDataType>;
    zip<OtherDataType>(other: Iterable<OtherDataType>): KoconutArray<Pair<DataType, OtherDataType>>;
    zip<OtherDataType, ResultDataType>(other: Iterable<OtherDataType>, transform: Zipper<DataType, OtherDataType, ResultDataType>): KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(other: Iterable<OtherDataType>, transform: Zipper<DataType, OtherDataType, ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(transform: Zipper<DataType, DataType, ResultDataType> | null, thisArg: any): KoconutArray<Pair<DataType, DataType> | ResultDataType>;
    zipWithNext(): KoconutArray<Pair<DataType, DataType>>;
    zipWithNext<ResultDataType>(transform: Zipper<DataType, DataType, ResultDataType>): KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(transform: Zipper<DataType, DataType, ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
}
