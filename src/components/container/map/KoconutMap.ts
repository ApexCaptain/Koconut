`use strict`

import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutTypeChecker, KoconutDeprecation,

    /* Base */
    Entry, Pair, KoconutPair, KoconutEntry,

    /* Container */
    KoconutIterable, KoconutArray, KoconutSet, KoconutBoolean,

    /* Enum */
    KoconutLoopSignal,

    /* Exception */
    KoconutNoSuchElementException, KoconutInvalidArgumentException,

    /* Protocol */
    KoconutEquatable, KoconutComparable 
} from "../../../module"

export class KoconutMap<KeyType, ValueType> extends KoconutIterable<[KeyType, ValueType], Entry<KeyType, ValueType>, Map<KeyType, ValueType>, Set<Entry<KeyType, ValueType>>> {


    protected async validate(data : Map<KeyType, ValueType> | null) {
    
        if(data != null) {
            this.combinedDataWrapper = new Set()
            for(const [key, value] of data.entries()) {
                if(KoconutTypeChecker.checkIsEquatable(key)) {
                    let isConflict = false
                    for(const eachPrevEquatableKey of this.mKeys) {
                        const equalityResult = key.equalsTo(eachPrevEquatableKey)
                        if(
                            (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                            || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                        ) {
                            isConflict = true
                            break
                        }
                    }
                    if(!isConflict) {
                        this.mKeys.add(key)
                        this.combinedDataWrapper.add(new Entry(key, value))
                        this.mValues.push(value)
                    } else this.data?.delete(key)
                } else {
                    this.mKeys.add(key)
                    this.combinedDataWrapper.add(new Entry(key, value))
                    this.mValues.push(value)
                }
            }
            this.mSize = data.size
        }

    }


    private static fromIterable<KeyType, ValueType>(
        iterable : KoconutIterable<[KeyType, ValueType], Entry<KeyType, ValueType>, Map<KeyType, ValueType>, Set<Entry<KeyType, ValueType>>>
    ) : KoconutMap<KeyType, ValueType> {

        const koconutToReturn = new KoconutMap<KeyType, ValueType>(iterable['data'])
        koconutToReturn.processor = iterable['processor']
        koconutToReturn.prevYieldable = iterable['prevYieldable']
        return koconutToReturn

    }


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


    /** 
     * Processes all the chained object and returns original {@link KoconutMap} instance.
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
    async retrieve() : Promise<KoconutMap<KeyType, ValueType>> {
        await super.retrieve()
        return this
    }


    // Properties
    private mKeys = new Set<KeyType>()
    private mValues = new Array<ValueType>()


    // Accessor
    /**
     * Returns a {@link KoconutSet} contains every {@link Entry}.
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
    get entries() : KoconutSet<Entry<KeyType, ValueType>> {

        const koconutToReturn = new KoconutSet<Entry<KeyType, ValueType>>();
        (koconutToReturn as any as KoconutOpener<Set<Entry<KeyType, ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.combinedDataWrapper!)
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutSet} contains all keys.
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
    get keys() : KoconutSet<KeyType> {

        const koconutToReturn = new KoconutSet<KeyType>();
        (koconutToReturn as any as KoconutOpener<Set<KeyType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mKeys)
        return koconutToReturn

    }


    /**
     * Returns the number of {@link Entry} in this {@link KoconutMap}.
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
    get size() : KoconutPrimitive<number>{

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutArray} contains all values in this {@link KoconutMap}.
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
    get values() : KoconutArray<ValueType> {

        const koconutToReturn = new KoconutArray<ValueType>();
        (koconutToReturn as any as KoconutOpener<Array<ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mValues)
        return koconutToReturn

    }

    

















    



    // Creator
    /**
     * Creates a new instance from ```iterable``` object.
     * Inner data type colud be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
     * @param source An map-like ```iterable``` object to conver to a {@link KoconutMap}.
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
        source : Iterable<[KeyType, ValueType] | Entry<KeyType, ValueType> | Pair<KeyType, ValueType>> | null = null
    ) : KoconutMap<KeyType, ValueType> {

        return new KoconutMap(source)

    }


    /**
     * Creates a new instance from variable number of arguments. 
     * Inner data type colud be an ```Array``` of two values([```Key```, ```Value```]), a Pair or an Entry.
     * @param data A set of elements to include in the new {@link KoconutMap} object.
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
        ...data : ([KeyType, ValueType] | Entry<KeyType, ValueType> | Pair<KeyType, ValueType>)[]
    ) : KoconutMap<KeyType, ValueType> {

        return new KoconutMap(data)

    }


    /**
     * Creates a new instance with given ```count``` as number of entries. ```count``` cannot be negative number.
     * Each entry is provided from ```generator``` with given ordered index. 
     * @param count Number of values.
     * @param generator A callback function that accepts an argument. The method calls the ```action``` one time for each ordered index.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```generator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        count : number,
        generator : (index : number) =>     
                                [KeyType, ValueType]
                                | Pair<KeyType, ValueType>
                                | KoconutPair<KeyType, ValueType>
                                | Entry<KeyType, ValueType>
                                | KoconutEntry<KeyType, ValueType>
                                | Promise<
                                    [KeyType, ValueType]
                                    | Pair<KeyType, ValueType>
                                    | KoconutPair<KeyType, ValueType>
                                    | Entry<KeyType, ValueType>
                                    | KoconutEntry<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        if(count < 0) throw new KoconutInvalidArgumentException(`Count must be larger than 0. Given value : ${count}`)
        generator = generator.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                for(let eachIndex = 0 ; eachIndex < count ; eachIndex++) {
                    const generatedValue = await generator(eachIndex)
                    if(generatedValue instanceof Pair) processedMap.set(generatedValue.first, generatedValue.second)
                    else if(generatedValue instanceof KoconutPair) {
                        const eachPair = await generatedValue.yield()
                        processedMap.set(eachPair.first, eachPair.second)
                    }
                    else if(generatedValue instanceof Entry) processedMap.set(generatedValue.key, generatedValue.value)
                    else if(generatedValue instanceof KoconutEntry) {
                        const eachEntry = await generatedValue.yield()
                        processedMap.set(eachEntry.key, eachEntry.value)
                    } else processedMap.set(generatedValue[0], generatedValue[1])
                }
                return processedMap
            })
        return koconutToReturn

    }
    



















    // Calculator
    /**
     * Returns the first entry yielding the largest value of the given function or 
     * throws {@link KoconutNoSuchElementException} if there are no entries.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
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
     * Returns the first entry yielding the largest value of the given function or null if there are no entries.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
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
     * ```
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
     * ```
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
     * Returns the first entry yielding the samllest value of the given function or 
     * throws {@link KoconutNoSuchElementException} if there are no entries.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
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
     * Returns the first entry yielding the samllest value of the given function or ```null``` if there are no entries.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each entry in object.
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
    



















    // Inspector
    /**
     * Checks if this {@link KoconutMap} contains the given ```key```.
     * @param key Key to search for.
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
    contains(
        key : KeyType
    ) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                for(const eachKey of this.mKeys) {
                    if(KoconutTypeChecker.checkIsEquatable(eachKey)) {
                        const equalityResult = eachKey.equalsTo(key)
                        if(
                            (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                            || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                        ) return true
                    } else if(eachKey == key) return true
                }
                return false
            })
        return koconutToReturn

    }


    /**
     * Checks if this {@link KoconutMap} contains the given ```key```.
     * @param key Key to search for.
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
    containsKey(
        key : KeyType
    ) : KoconutBoolean {

        return this.contains(key)

    }


    /**
     * Checks if this {@link KoconutMap} contains given ```value```.
     * @param value Value to search for.
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
    containsValue(
        value : ValueType
    ) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                for(const eachValue of this.mValues) {
                    if(KoconutTypeChecker.checkIsEquatable(eachValue)) {
                        const equalityResult = eachValue.equalsTo(value)
                        if(
                            (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                            || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                        ) return true
                    } else if (eachValue == value) return true
                }
                return false
            })
        return koconutToReturn

    }
    


















    // Iterator
    /**
     * Perfroms the given ```action``` on each entry and returns the original collection itself afterwards.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts an argument. The method calls the ```action``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        action : (entry : Entry<KeyType, ValueType>) => boolean | KoconutLoopSignal | void  | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.onEach(action, thisArg))

    }
    


















    // Manipulator
    /**
     * Returns a map containing only entries matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.filter(predicate, thisArg))

    }


    /**
     * Returns a map containing only entries not matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.filterNot(predicate, thisArg))

    }
    

    /**
     * Appends all entries matching the given ```predicate``` to the given destination.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        if(await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }

    /**
     * Appends all entries not matching the given ```predicate``` to the given destination.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Map<KeyType, ValueType>,
        predicate : (entry : Entry<KeyType, ValueType>) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        if(!await predicate(eachEntry))
                            destination.set(eachEntry.key, eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a map containing all entries with key matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (key : KeyType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>();
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        if(await predicate(eachEntry.key))
                            processedMap.set(eachEntry.key, eachEntry.value)
                } 
                return processedMap
            })
        return koconutToReturn

    }

    
    /**
     * Returns a map containing all entries with value matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (value : ValueType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        if(await predicate(eachEntry.value))
                            processedMap.set(eachEntry.key, eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutMap} containing all entires of the original map except
     * the entries the keys of which are contained in ```keys```. 
     * @param keys Key data to except. It could be plural or singular.
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
     * const key3And4ExcpetedMap = await koconutMap
     *                           .minus(3, 4)
     *                           .yield()
     * console.log(key3And4ExcpetedMap)
     * // ↑ Map { 1 => 2, 2 => 4, 5 => 10 }
     * ```
     */
    minus(
        ...keys : KeyType[]
    ) : KoconutMap<KeyType, ValueType> {
        
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.combinedDataWrapper != null) {
                    const koconutKeysToExceptArray = KoconutArray.from(keys)
                    for(const eachEntry of this.combinedDataWrapper)
                        if(!await koconutKeysToExceptArray.contains(eachEntry.key).yield())
                            processedMap.set(eachEntry.key, eachEntry.value)

                }
                return processedMap
            })
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutMap} by replacing or adding entries from given ```entries```.
     * @param entries Entires to add or replace. It could be plural or singular.
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
        ...entries : (
            [KeyType, ValueType]
            | Pair<KeyType, ValueType>
            | KoconutPair<KeyType, ValueType>
            | Entry<KeyType, ValueType>
            | KoconutEntry<KeyType, ValueType>
            )[]
    ) : KoconutMap<KeyType, ValueType> {

            const koconutToReturn = new KoconutMap<KeyType, ValueType>();
            (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
                .setPrevYieldable(this)
                .setProcessor(async () => {
                    const processedMap = this.data == null ? new Map<KeyType, ValueType>() : new Map(this.data)
                    for(const eachElement of entries) {
                        if(eachElement instanceof Pair) processedMap.set(eachElement.first, eachElement.second)
                        else if(eachElement instanceof KoconutPair) {
                            const eachPair = await eachElement.yield()
                            if(eachPair != null) processedMap.set(eachPair.first, eachPair.second)
                        }
                        else if(eachElement instanceof Entry) processedMap.set(eachElement.key, eachElement.value)
                        else if(eachElement instanceof KoconutEntry) {
                            const eachEntry = await eachElement.yield()
                            if(eachEntry != null) processedMap.set(eachEntry.key, eachEntry.value)
                        }
                        else processedMap.set(eachElement[0], eachElement[1])
                    }
                    return processedMap
                })
            return koconutToReturn

    }
    


















    // Selector
    /**
     * Returns the value corresponding to the given ```key```, or ```null``` if such a key is not
     * present in this {@link KoconutMap}.
     * @param key Key to search for.
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
    get(
        key : KeyType
    ) : KoconutPrimitive<ValueType | null> {

        const koconutToReturn = new KoconutPrimitive<ValueType | null>();
        (koconutToReturn as any as KoconutOpener<ValueType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper) {
                        if(KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                            const equalityResult = eachEntry.key.equalsTo(key)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) return eachEntry.value
                        } else if(eachEntry.key == key) return eachEntry.value
                    }
                }
                return null
            })
        return koconutToReturn

    }


    /**
     * Returns the value to which the specified key is mapped, or ```defaultValue``` if the map contains
     * no mapping for key.
     * @param key Key to search for.
     * @param defaultValue Default value if no entry is found.
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
        key : KeyType,
        defaultValue : ValueType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper) {
                        if(KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                            const equalityResult = eachEntry.key.equalsTo(key)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) return eachEntry.value
                        } else if(eachEntry.key == key) return eachEntry.value
                    }
                }
                return defaultValue
            })
        return koconutToReturn

    }


    /**
     * Returns the value for the given ```key```, or the reuslt of the
     * ```defaultValue``` function if there was no entry from the given key.
     * @param key Key to search for.
     * @param defaultValue Callback function that generates default value. The method will call ```defaultValue``` if no entry is found.
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
        key : KeyType,
        defaultValue : () => ValueType | Promise<ValueType>
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper) {
                        if(KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                            const equalityResult = eachEntry.key.equalsTo(key)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) return eachEntry.value
                        } else if(eachEntry.key == key) return eachEntry.value
                    }
                }
                return await defaultValue()
            })
        return koconutToReturn

    }


    /**
     * Returns the value of the given key. If no entry is found, it throws {@link KoconutNoSuchElementException}.
     * @param key Key to search for.
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
    getValue(
        key : KeyType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
        .setPrevYieldable(this)
        .setProcessor(async () => {
            if(this.combinedDataWrapper != null) {
                for(const eachEntry of this.combinedDataWrapper) {
                    if(KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                        const equalityResult = eachEntry.key.equalsTo(key)
                        if(
                            (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                            || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                        ) return eachEntry.value
                    } else if(eachEntry.key == key) return eachEntry.value
                }
            }
            throw new KoconutNoSuchElementException(`No such element mathces given key ${key} is found`) 
        })
        return koconutToReturn

    }



















    // Transformer
    /**
     * Appends all entries yielded from results of ```transform``` function being invoked
     * on each entry of original collection, to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.flatMapTo(destination, transform, thisArg))

    }


    /**
     * Applies the given ```transform``` function to each entry of the original collection
     * and appends the results to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.mapTo(destination, transform, thisArg))

    }


    /**
     * Applies the given ```transform``` function to each entry of the original collection
     * and appends the results to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        return KoconutMap.fromIterable(super.mapNotNullTo(destination, transform, thisArg))

    }


    /**
     * Returns a new ```Map``` with entries having the keys obatined by applying the
     * ```transform``` function to each entry in this object. The value of each of them would be the same
     * as the original entry.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<ResultDataType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<ResultDataType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<ResultDataType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<ResultDataType, ValueType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        processedMap.set(await transform(eachEntry), eachEntry.value)
                }
                return processedMap
            })
        return koconutToReturn

    }


    /**
     * Populates the given ```destination``` map with entries having keys obtained by applying
     * the ```transform``` function to each entry in this object. The value of each of them would be the same
     * as the original entry.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Map<ResultDataType, ValueType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper)
                        destination.set(await transform(eachEntry), eachEntry.value)
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a new ```Map``` with entries having the keys of this object and the values obtained by applying
     * the ```transform``` function to each entry.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     *                       .mapVaues(eachEntry => eachEntry.value * 2)
     *                       .yield()
     * console.log(doubledValueMap)
     * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
     *
     * const stringifiedValueMap = await koconutMap
     *                       .mapVaues(async eachEntry => eachEntry.value.toString())
     *                       .yield()
     * console.log(stringifiedValueMap)
     * // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }
     *
     * const squaredValueMap = await koconutMap
     *                       .mapVaues(eachEntry => new Promise(resolve => {
     *                           resolve(eachEntry.value * eachEntry.value)
     *                       }))
     *                       .yield()
     * console.log(squaredValueMap)
     * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
     * ```
     */
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
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper) {
                        processedMap.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    /**
     * Populates the given ```destinaion``` ```Map``` with the entires having the keys of this object and
     * the values obtained by applying the ```transform``` function to each entry.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each entry in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        destination : Map<KeyType, ResultDataType>,
        transform : (entry : Entry<KeyType, ValueType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachEntry of this.combinedDataWrapper) {
                        destination.set(eachEntry.key, await transform(eachEntry))
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


}