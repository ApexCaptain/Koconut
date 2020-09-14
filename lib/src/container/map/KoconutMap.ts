`use strict`

import { Key } from "readline"
import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutTypeChecker, 

    /* Base */
    Entry, Pair, KoconutPair, KoconutEntry,

    /* Container */
    KoconutIterable, KoconutArray, KoconutSet,

    /* Enum */
    KoconutLoopSignal,

    /* Exception */
    KoconutNoSuchElementException,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../module.internal"

export class KoconutMap<KeyType, ValueType> extends KoconutIterable<[KeyType, ValueType], Entry<KeyType, ValueType>, Map<KeyType, ValueType>, Set<Entry<KeyType, ValueType>>> {

    // Koconut Primitive
    /**
     * Creates a new instance from ```iterable``` object.
     * Inner data type colud be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
     * @param map An map-like ```iterable``` object to conver to a {@link KoconutMap}.
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
    constructor(map : Iterable<[KeyType, ValueType] | Entry<KeyType, ValueType> | Pair<KeyType, ValueType>> |  null = null) {
        
        super()
        const mapObject = new Map<KeyType, ValueType>()
        if(map != null) {
            for(const eachEntry of map) {
                if(eachEntry instanceof Entry) mapObject.set(eachEntry.key, eachEntry.value)
                else if(eachEntry instanceof Pair) mapObject.set(eachEntry.first, eachEntry.second)
                else mapObject.set(eachEntry[0], eachEntry[1])
            }
        }
        this.data = mapObject
        
    }


    async validate(data : Map<KeyType, ValueType> | null) {
    
        if(data != null) {
            this.combinedDataWrapper = new Set()
            for(const [key, value] of data.entries()) {
                if(KoconutTypeChecker.checkIsEquatable(key)) {
                    let isConflict = false
                    for(const eachPrevEquatableKey of this.mKeys) {
                        if(key.equalsTo(eachPrevEquatableKey as any as KoconutEquatable)) {
                            isConflict = true
                            break
                        }
                    }
                    if(!isConflict) {
                        this.mKeys.add(key)
                        this.combinedDataWrapper.add(new Entry(key, value))
                        this.mEntries.add(new Entry(key, value))
                        this.mValues.push(value)
                    } else this.data?.delete(key)
                } else {
                    this.mKeys.add(key)
                    this.combinedDataWrapper.add(new Entry(key, value))
                    this.mEntries.add(new Entry(key, value))
                    this.mValues.push(value)
                }
            }
            this.mSize = data.size
        }

    }
    

















    



    // Creator
    /**
     * Creates a new instance from ```iterable``` object.
     * Inner data type colud be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
     * @param source An map-like ```iterable``` object to conver to a {@link KoconutMap}.
     * 
     * @since 1.0.11
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
        source : Iterable<[KeyType, ValueType] | Entry<KeyType, ValueType> | Pair<KeyType, ValueType>> | null = null
    ) : KoconutMap<KeyType, ValueType> {

        return new KoconutMap(source)

    }


    /**
     * Creates a new instance from variable number of arguments. 
     * Inner data type colud be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
     * @param data A set of elements to include in the new {@link KoconutMap} object.
     * 
     * @category Creator
     * 
     * @since 1.0.11
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
        ...data : ([KeyType, ValueType] | Entry<KeyType, ValueType> | Pair<KeyType, ValueType>)[]
    ) : KoconutMap<KeyType, ValueType> {

        return new KoconutMap(data)

    }


    /* Properties */
    private mKeys = new Set<KeyType>()
    private mEntries = new Set<Entry<KeyType, ValueType>>()
    private mValues = new Array<ValueType>() 
    private mSize = 0


    /* Properties Getter */
    keys() : KoconutSet<KeyType> {

        const koconutToReturn = new KoconutSet<KeyType>();
        (koconutToReturn as any as KoconutOpener<Set<KeyType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mKeys)
        return koconutToReturn

    }


    entries() : KoconutSet<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutSet<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Set<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mEntries)
        return koconutToReturn

    }


    values() : KoconutArray<ValueType> {

        const koconutToReturn = new KoconutArray<ValueType>();
        (koconutToReturn as any as KoconutOpener<Array<ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mValues)
        return koconutToReturn

    }


    size() : KoconutPrimitive<number>{

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }


    /* Functions */
    // Calculator
    /**
     * Returns the first element yielding the largest value of the given function or 
     * throws {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const lognestStringOfSet = await koconutSet
     *                               .maxBy(eachString => eachString.length)
     *                               .yield()
     * console.log(lognestStringOfSet)
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
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {
        
        const fromSuper = super.maxBy(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType>>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }

    /**
     * Returns the first element yielding the largest value of the given function or null if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const lognestStringOfSet = await koconutSet
     *                               .maxByOrNull(eachString => eachString.length)
     *                               .yield()
     * console.log(lognestStringOfSet)
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
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.maxByOrNull(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


    /**
     * Returns the first element having the largest value according to the provided ```comparator``` or throws {@link KoconutNoSuchElementException}
     * if elements are empty.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     */
    maxWith(
        selector : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.maxWith(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType>>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }

    /**
     * Returns the first element having the largest value according to the provided ```comparator``` or null
     * if elements are empty.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     */
    maxWithOrNull(
        selector : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.maxWithOrNull(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


    /**
     * Returns the first element yielding the samllest value of the given function or 
     * throws {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @throws {@link KoconutNoSuchElementException}
     * 
     * @category Calculator
     * 
     * @since 1.0.10
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
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.minBy(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType>>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


    /**
     * Returns the first element yielding the samllest value of the given function or ```null``` if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const samllestNumberOfArray2 = await koconutArray2
     *                               .minByOrNull(async eachNumber => eachNumber)
     *                               .yield()
     * console.log(samllestNumberOfArray2)
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
        selector : (entry : Entry<KeyType, ValueType>) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.minByOrNull(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


    /**
     * Returns the first element having the smallest value according to the provided ```comparator``` or throws {@link KoconutNoSuchElementException}
     * if elements are empty.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        selector : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.minWith(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType>>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


    /**
     * Returns the first element having the smallest value according to the provided ```comparator``` or ```null```
     * if elements are empty.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        selector : (front : Entry<KeyType, ValueType>, rear : Entry<KeyType, ValueType>) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutEntry<KeyType, ValueType> {

        const fromSuper = super.minWithOrNull(selector, thisArg)
        const koconutToReturn = new KoconutEntry<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Entry<KeyType, ValueType> | null>)
            .setPrevYieldable(fromSuper['prevYieldable']!)
            .setProcessor(fromSuper['processor']!)
        return koconutToReturn

    }


















    asArray() : KoconutArray<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutArray<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Array<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return Array.from(this.mEntries)
            })
        return koconutToReturn

    }

    contains(
        key : KeyType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                for(const eachKey of this.mKeys) {
                    if((KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey.equalsTo(key as any as KoconutEquatable))
                    || (!KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey == key)) return true
                }
                return false
            })
        return koconutToReturn

    }


    containsKey(
        key : KeyType
    ) : KoconutPrimitive<boolean> {

        return this.contains(key)

    }


    containsValue(
        value : ValueType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                for(const eachValue of this.mValues) {
                    if((KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue.equalsTo(value as any as KoconutEquatable))
                    || (!KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue == value)) return true
                }
                return false
            })
        return koconutToReturn

    }


    filter(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    filterKeys(
        predicate : (key : KeyType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>();
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry.key))
                            processedMap.set(eachEntry.key, eachEntry.value)
                } 
                return processedMap
            })
        return koconutToReturn

    }


    filterNot(
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(!await predicate(eachEntry))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    filterNotTo(
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(!await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterTo(
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    filterValues(
        predicate : (value : ValueType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry.value))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        for(const eachResultData of await transform(eachEntry)) 
                            if(destination instanceof Array) destination.push(eachResultData)
                            else destination.add(eachResultData)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    get(
        key : KeyType
    ) : KoconutPrimitive<ValueType | null> {

        const koconutToReturn = new KoconutPrimitive<ValueType | null>();
        (koconutToReturn as any as KoconutOpener<ValueType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        if((KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key as any as KoconutEquatable))
                        || (!KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) return eachEntry.value
                    }
                }
                return null
            })
        return koconutToReturn

    }


    getOrDefault(
        key : KeyType,
        defaultValue : ValueType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        if((KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key as any as KoconutEquatable))
                        || (!KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) return eachEntry.value
                    }
                }
                return defaultValue
            })
        return koconutToReturn

    }


    getOrElse(
        key : KeyType,
        defaultValue : () => ValueType | Promise<ValueType>
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        if((KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key as any as KoconutEquatable))
                        || (!KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) return eachEntry.value
                    }
                }
                return await defaultValue()
            })
        return koconutToReturn

    }


    getValue(
        key : KeyType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
        .setPrevYieldable(this)
        .setProcessor(async () => {
            if(this.data != null) {
                for(const eachEntry of this.mEntries) {
                    if((KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key as any as KoconutEquatable))
                    || (!KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) return eachEntry.value
                }
            }
            throw new KoconutNoSuchElementException(`No such element mathces given key ${key} is found`) 
        })
        return koconutToReturn

    }


    /*
    isEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize == 0)
        return koconutToReturn

    }


    isNotEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize != 0)
        return koconutToReturn

    }


    isNullOrEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data == null || this.mSize == 0)
        return koconutToReturn

    }
    */


    map<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedArray.push(await transform(eachEntry))
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapKeys<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<ResultDataType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<ResultDataType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<ResultDataType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<ResultDataType, ValueType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedMap.set(await transform(eachEntry), eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    mapKeysTo<ResultDataType>(
        destination : Map<ResultDataType, ValueType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        destination.set(await transform(eachEntry), eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapNotNull<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(dataToAdd != null)
                            if(destination instanceof Array) destination.push(dataToAdd)
                            else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const dataToAdd = await transform(eachEntry)
                        if(destination instanceof Array) destination.push(dataToAdd)
                        else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    mapVaues<ResultDataType>(
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn= new KoconutMap<KeyType, ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ResultDataType>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        processedMap.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    mapValuesTo<ResultDataType>(
        destination : Map<KeyType, ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        destination.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }





    minus(
        keys : KeyType | Iterable<KeyType>
    ) : KoconutMap<KeyType, ValueType> {

        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>();
                if(this.data != null) {
                    let dataToExcept = new Array<KeyType>()
                    if(typeof (keys as any)[Symbol.iterator] === 'function') dataToExcept = Array.from(keys as Iterable<KeyType>)
                    else dataToExcept.push(keys as KeyType)
                    const koconutKeysToExceptArray = KoconutArray.from(dataToExcept)
                    for(const eachEntry of this.mEntries)
                        if(!await koconutKeysToExceptArray.contains(eachEntry.key).yield()) processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }





    none(
        predicate : ((entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return true
                if(predicate) {
                    for(const eachEntry of this.mEntries)
                        if(await predicate(eachEntry)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }


    onEach(
        action : (entry : Entry<KeyType, ValueType>) => boolean | KoconutLoopSignal | void  | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachEntry of this.mEntries) {
                        const signal = await action(eachEntry)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    onEachIndexed(
        action : (index : number, entry : Entry<KeyType, ValueType>) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachEntry of this.mEntries) {
                        const signal = await action(eachIndex++, eachEntry)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // orEmpty


    plus(
        element : 
            | Pair<KeyType, ValueType> 
            | KoconutPair<KeyType, ValueType> 
            | Entry<KeyType, ValueType> 
            | KoconutEntry<KeyType, ValueType> 
            | Iterable<
                | Pair<KeyType, ValueType>
                | KoconutPair<KeyType, ValueType>
                | Entry<KeyType, ValueType> 
                | KoconutEntry<KeyType, ValueType>>
    ) : KoconutMap<KeyType, ValueType> {

        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = this.data == null ? new Map<KeyType, ValueType>() : new Map(this.data)
                let dataToAdd = new Array<any>()
                if(typeof (element as any)[Symbol.iterator] == 'function') dataToAdd = Array.from(element as Iterable<any>)
                else dataToAdd.push(element as any)
                for(const eachDatum of dataToAdd) {
                    if(eachDatum instanceof KoconutEntry) {
                        const entry = await eachDatum.yield()
                        if(entry != null) processedMap.set(entry.key, entry.value)
                    } else if(eachDatum instanceof Entry) processedMap.set(eachDatum.key, eachDatum.value)
                    else if(eachDatum instanceof KoconutPair) {
                        const pair = await eachDatum.yield()
                        if(pair != null) processedMap.set(pair.first, pair.second)
                    } else if(eachDatum instanceof Pair) processedMap.set(eachDatum.first, eachDatum.second)
                }
                return processedMap
            })
        return koconutToReturn

    }


    toArray() : KoconutArray<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutArray<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Array<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Entry<KeyType, ValueType>>()
                if(this.data != null) {
                    for(const eachEntry of this.mEntries)
                        processedArray.push(new Entry(eachEntry.key, eachEntry.value))
                }
                return processedArray
            })
        return koconutToReturn

    }

}