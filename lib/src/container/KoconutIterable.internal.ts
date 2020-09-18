import { sign } from "crypto";
import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutDeprecation, KoconutTypeChecker,

    /* Container */
    KoconutArray, KoconutSet, KoconutFlow, Flow, KoconutMap, Entry,

    /* Enum */
    KoconutLoopSignal,

    /* Exception */
    KoconutNoSuchElementException,

    /* Protocol */
    KoconutComparable
} from "../../module.internal"

export class KoconutIterable<DataType, CombinedDataType, WrapperType extends Iterable<DataType>, CombinedWrapperType extends Iterable<CombinedDataType>> extends KoconutPrimitive<WrapperType> {

    protected combinedDataWrapper : CombinedWrapperType | null = null
    protected mSize : number = 0
    



















    
    // Calculator
    /**
     * Returns the number of the elements matching the given ```predicate```. If the ```predicate``` is ommitted it'll returns the whole number of elements. 
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Calculator
     * 
     * @example
     * ``` typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const numberOfAllArrayElements = await koconutArray
     *                                       .count()
     *                                       .yield()
     * console.log(numberOfAllArrayElements)
     * // ↑ 5
     *
     * const numberOfArrayElementsHigherThan2 = await koconutArray
     *                                           .count(eachNumber => eachNumber > 2)
     *                                           .yield()
     * console.log(numberOfArrayElementsHigherThan2)
     * // ↑ 3 -- i.e. [3, 4, 5]
     * 
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const numberOfAllSetElements = await koconutSet
     *                                       .count()
     *                                       .yield()
     * console.log(numberOfAllSetElements)
     * // ↑ 5
     *
     * const numberOfOddSetElements = await koconutSet
     *                                       .count(eachNumber => eachNumber % 2 == 1)
     *                                       .yield()
     * console.log(numberOfOddSetElements)
     * // ↑ 3 -- i.e. [1, 3, 5]
     * 
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachNumber => eachNumber * 2)
     *                   // ↑ Map { 1 => 2, 
     *                   //         2 => 4, 
     *                   //         3 => 6 }
     *
     * const numberOfAllMapEntries = await koconutMap
     *                                   .count()
     *                                   .yield()
     * console.log(numberOfAllMapEntries)
     * // ↑ 3
     *
     * const numberOfMapEntriesValueHigherThan5 = await koconutMap
     *                                               .count(eachEntry => eachEntry.value > 5)
     *                                               .yield()
     * console.log(numberOfMapEntriesValueHigherThan5)
     * // ↑ 1 -- i.e. Entry { 3, 6 }
     * 
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const numberOfArrayElementsLessThan3 = await koconutArray2
     *                                       .count(async eachNumber => eachNumber < 3)
     *                                       .yield()
     * console.log(numberOfArrayElementsLessThan3)
     * // ↑ 2 -- i.e. [1, 2]
     *
     * const numberOfEvenArrayElements = await koconutArray2
     *                                   .count(eachNumber => new Promise(resolve => {
     *                                       resolve(eachNumber % 2 == 0)
     *                                   }))
     *                                   .yield()
     * console.log(numberOfEvenArrayElements)
     * // ↑ 2 -- i.e. [2, 4]
     * ```
     */
    count(
        predicate : ((element : CombinedDataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        if(predicate) predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return 0
                let count = 0
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    if(!predicate) count ++
                    else if(await predicate(eachCombinedDatum)) count++
                }
                return count
            })
        return koconutToReturn

    }


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
        selector : (element : CombinedDataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType> {

        KoconutDeprecation.showDeprecationWarning("1.2.0", this.maxByOrNull)
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let dataToReturn : CombinedDataType | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatum == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum as any as KoconutComparable) > 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum)) {
                            dataToReturn = eachCombinedDatum
                            lastComparableDatum = eachComparableDatum
                        }
                }
                if(dataToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return dataToReturn
            })
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
        selector : (element : CombinedDataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType | null>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let dataToReturn : CombinedDataType | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatum == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum as any as KoconutComparable) > 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum)) {
                            dataToReturn = eachCombinedDatum
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn

    }
    

    /**
     * Returns the largest value among all values produced by ```selector``` function applied to each element in the collection or 
     * throws {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const largestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                               .maxOf(eachNumber => eachNumber % 5)
     *                                               .yield()
     * console.log(largestRemainderNumberDividedBy5OfArray)
     * // ↑ 4
     *
     * try {
     *   await koconutArray
     *           .filter(eachNumber => eachNumber > 10)
     *           .maxOf(eachNumber => eachNumber % 5)
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
     * const longestStringLengthOfSet = await koconutSet
     *                               .maxOf(eachString => eachString.length)
     *                               .yield()
     * console.log(longestStringLengthOfSet)
     * // ↑ 3
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const maxComparableString = await koconutSet
     *                           .maxOf(eachString => new ComparableString(eachString))
     *                           .yield()
     * console.log(maxComparableString)
     * // ↑ ComparableString { str: 'abc' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOf(eachEntry => eachEntry.key)
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                           .maxOf(async eachNumber => eachNumber)
     *                           .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                           .maxOf(eachNumber => new Promise(resolve => {
     *                               resolve(eachNumber % 10)
     *                           }))
     *                           .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */
    maxOf(
        selector : (element : CombinedDataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    /** @ignore */
    maxOf(
        selector : (element : CombinedDataType) => number | Promise<number>
    ) : KoconutPrimitive<number>;
    maxOf(
        selector : (element : CombinedDataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>;
    /** @ignore */
    maxOf(
        selector : (element : CombinedDataType) => string | Promise<string>
    ) : KoconutPrimitive<string>
    maxOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) =>  ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    /** @ignore */
    maxOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    maxOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) > 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                if(lastComparableDatumToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }

    /**
     * Returns the largest value among all values produced by ```selector``` function applied to each element in the collection or 
     * null if there are no elements.
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
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const largestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                               .maxOfOrNull(eachNumber => eachNumber % 5)
     *                                               .yield()
     * console.log(largestRemainderNumberDividedBy5OfArray)
     * // ↑ 4
     * 
     * const largestRemainderNumberDividedBy5OfEmptyArray = await koconutArray
     *                                       .filter(eachNumber => eachNumber > 10)
     *                                       .maxOfOrNull(eachNumber => eachNumber % 5)
     *                                       .yield()
     * console.log(largestRemainderNumberDividedBy5OfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const longestStringLengthOfSet = await koconutSet
     *                               .maxOfOrNull(eachString => eachString.length)
     *                               .yield()
     * console.log(longestStringLengthOfSet)
     * // ↑ 3
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const maxComparableString = await koconutSet
     *                           .maxOfOrNull(eachString => new ComparableString(eachString))
     *                           .yield()
     * console.log(maxComparableString)
     * // ↑ ComparableString { str: 'abc' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOfOrNull(eachEntry => eachEntry.key)
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                           .maxOfOrNull(async eachNumber => eachNumber)
     *                           .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                           .maxOfOrNull(eachNumber => new Promise(resolve => {
     *                               resolve(eachNumber % 10)
     *                           }))
     *                           .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */
    maxOfOrNull(
        selector : (element : CombinedDataType) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (element : CombinedDataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    maxOfOrNull(
        selector : (element : CombinedDataType) => string | Promise<string>
    ) : KoconutPrimitive<string | null>
    maxOfOrNull(
        selector : (element : CombinedDataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    maxOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) > 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn
    }


    /**
     * Returns the largest value according to the provided ```comparator``` among all values
     * produced by ```selector``` function applied to each element in the collection all throws {@link KoconutNoSuchElementException}
     * if elements are empty.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param selectorThisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param comparatorThisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")
     *
     * const largestNumberedStringOfArray = await koconutArray
     *                                   .maxOfWith(
     *                                       parseInt,
     *                                       (front, rear) => front - rear
     *                                   )
     *                                   .yield()
     * console.log(largestNumberedStringOfArray)
     * // ↑ 5
     *
     * try {
     *   await koconutArray
     *           .filter(eachString => eachString.length > 2)
     *           .maxOfWith(
     *               parseInt,
     *               (front, rear) => front - rear
     *           )
     *           .yield()
     * } catch(error) {
     *   console.log(error.name)
     *   // ↑ Koconut No Such Element Exception
     *   // i.e. -- Array is filtered.
     *   // No string in "1" to "5" is logner than 2. 
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const lognestStringLengthOfSet = await koconutSet
     *                               .maxOfWith(
     *                                   eachString => eachString.length,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(lognestStringLengthOfSet)
     * // ↑ 3
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOfWith(
     *                                       eachEntry => eachEntry.key,
     *                                       (front, rear) => front - rear
     *                                   )
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                               .maxOfWith(
     *                                   async eachNumber => eachNumber,
     *                                   async (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                               .maxOfWith(
     *                                   (eachNumber) => new Promise<number>(resolve => {
     *                                       resolve(eachNumber % 10)
     *                                   }),
     *                                   (front, rear) => new Promise(resolve => {
     *                                       resolve(front - rear)
     *                                   })
     *                               )
     *                               .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */
    maxOfWith<ResultDataType>(
        selector : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                if(lastComparableDatumToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    /**
     * Returns the largest value according to the provided ```comparator``` among all values
     * produced by ```selector``` function applied to each element in the collection or ```null```
     * if elements are empty.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param selectorThisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param comparatorThisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")
     *
     * const largestNumberedStringOfArray = await koconutArray
     *                                   .maxOfWithOrNull(
     *                                       parseInt,
     *                                       (front, rear) => front - rear
     *                                   )
     *                                   .yield()
     * console.log(largestNumberedStringOfArray)
     * // ↑ 5
     *
     * const largestNumberedStringOfEmptyArray = await koconutArray
     *                           .filter(eachString => eachString.length > 2)
     *                           .maxOfWithOrNull(
     *                               parseInt,
     *                               (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(largestNumberedStringOfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const lognestStringLengthOfSet = await koconutSet
     *                               .maxOfWithOrNull(
     *                                   eachString => eachString.length,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(lognestStringLengthOfSet)
     * // ↑ 3
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOfWithOrNull(
     *                                       eachEntry => eachEntry.key,
     *                                       (front, rear) => front - rear
     *                                   )
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                               .maxOfWithOrNull(
     *                                   async eachNumber => eachNumber,
     *                                   async (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                               .maxOfWithOrNull(
     *                                   (eachNumber) => new Promise<number>(resolve => {
     *                                       resolve(eachNumber % 10)
     *                                   }),
     *                                   (front, rear) => new Promise(resolve => {
     *                                       resolve(front - rear)
     *                                   })
     *                               )
     *                               .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */
    maxOfWithOrNull<ResultDataType>(
        selector : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType | null>();
        (koconutToReturn as any as KoconutOpener<ResultDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) < 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
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
        comparator : (front : CombinedDataType, rear : CombinedDataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null ) throw new KoconutNoSuchElementException(`Source data is null`)
                let dataToReturn : CombinedDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachCombinedDatum) < 0)
                        dataToReturn = eachCombinedDatum
                }
                if(dataToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return dataToReturn
            })
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
        comparator : (front : CombinedDataType, rear : CombinedDataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType | null>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null ) return null
                let dataToReturn : CombinedDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachCombinedDatum) < 0)
                        dataToReturn = eachCombinedDatum
                }
                return dataToReturn
            })
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
        selector : (element : CombinedDataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType> {

        KoconutDeprecation.showDeprecationWarning("1.2.0", this.minByOrNull)
        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let dataToReturn : CombinedDataType | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatum == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum)) {
                            dataToReturn = eachCombinedDatum
                            lastComparableDatum = eachComparableDatum
                        }
                }
                if(dataToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return dataToReturn
            })
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
        selector : (element : CombinedDataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType | null>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let dataToReturn : CombinedDataType | null = null
                let lastComparableDatum : number | string | KoconutComparable | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatum == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum)) {
                            dataToReturn = eachCombinedDatum
                            lastComparableDatum = eachComparableDatum
                        }
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    /**
     * Returns the smallest value among all values produced by ```selector``` function applied to each element in the collection or 
     * throws {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const smallestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                           .minOf(eachNumber => eachNumber % 5)
     *                                           .yield()
     * console.log(smallestRemainderNumberDividedBy5OfArray)
     * // ↑ 1
     *
     * try {
     *   await koconutArray
     *           .filter(eachNumber => eachNumber > 10)
     *           .minOf(eachNumber => eachNumber % 5)
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
     * const shortestStringLengthOfSet = await koconutSet
     *                           .minOf(eachString => eachString.length)
     *                           .yield()
     * console.log(shortestStringLengthOfSet)
     * // ↑ 1
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const minComparableString = await koconutSet
     *                       .minOf(eachString => new ComparableString(eachString))
     *                       .yield()
     * console.log(minComparableString)
     * // ↑ ComparableString { str: 'a' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *               .associate(eachString => [eachString.length, eachString])
     *
     * const shortestStringLengthOfMap = await koconutMap
     *                               .minOf(eachEntry => eachEntry.key)
     *                               .yield()
     * console.log(shortestStringLengthOfMap)
     * // ↑ 1
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const smallestNumberOfArray2 = await koconutArray2
     *                       .minOf(async eachNumber => eachNumber)
     *                       .yield()
     * console.log(smallestNumberOfArray2)
     * // ↑ 12
     *
     * const smallest1sDigitOfArray2 = await koconutArray2
     *                       .minOf(eachNumber => new Promise(resolve => {
     *                           resolve(eachNumber % 10)
     *                       }))
     *                       .yield()
     * console.log(smallest1sDigitOfArray2)
     * // ↑ 0
     * ```
     */
    minOf(
        selector : (element : CombinedDataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number>;
    /** @ignore */
    minOf(
        selector : (element : CombinedDataType) => number | Promise<number>
    ) : KoconutPrimitive<number>;
    minOf(
        selector : (element : CombinedDataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string>;
    /** @ignore */
    minOf(
        selector : (element : CombinedDataType) => string | Promise<string>
    ) : KoconutPrimitive<string>
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) =>  ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType>;
    /** @ignore */
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                if(lastComparableDatumToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    /**
     * Returns the smallest value among all values produced by ```selector``` function applied to each element in the collection or 
     * ```null``` if there are no elements.
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
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const smallestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                           .minOfOrNull(eachNumber => eachNumber % 5)
     *                                           .yield()
     * console.log(smallestRemainderNumberDividedBy5OfArray)
     * // ↑ 1
     *
     * const smallestRemainderNumberDividedBy5OfEmptyArray = await koconutArray
     *                                       .filter(eachNumber => eachNumber > 10)
     *                                       .minOfOrNull(eachNumber => eachNumber % 5)
     *                                       .yield()
     * console.log(smallestRemainderNumberDividedBy5OfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const shortestStringLengthOfSet = await koconutSet
     *                           .minOfOrNull(eachString => eachString.length)
     *                           .yield()
     * console.log(shortestStringLengthOfSet)
     * // ↑ 1
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const minComparableString = await koconutSet
     *                       .minOfOrNull(eachString => new ComparableString(eachString))
     *                       .yield()
     * console.log(minComparableString)
     * // ↑ ComparableString { str: 'a' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *               .associate(eachString => [eachString.length, eachString])
     *
     * const shortestStringLengthOfMap = await koconutMap
     *                               .minOfOrNull(eachEntry => eachEntry.key)
     *                               .yield()
     * console.log(shortestStringLengthOfMap)
     * // ↑ 1
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const smallestNumberOfArray2 = await koconutArray2
     *                       .minOfOrNull(async eachNumber => eachNumber)
     *                       .yield()
     * console.log(smallestNumberOfArray2)
     * // ↑ 12
     *
     * const smallest1sDigitOfArray2 = await koconutArray2
     *                       .minOfOrNull(eachNumber => new Promise(resolve => {
     *                           resolve(eachNumber % 10)
     *                       }))
     *                       .yield()
     * console.log(smallest1sDigitOfArray2)
     * // ↑ 0
     * ```
     */
    minOfOrNull(
        selector : (element : CombinedDataType) => number | Promise<number>,
        thisArg : any
    ) : KoconutPrimitive<number | null>;
    /** @ignore */
    minOfOrNull(
        selector : (element : CombinedDataType) => number | Promise<number>
    ) : KoconutPrimitive<number | null>;
    minOfOrNull(
        selector : (element : CombinedDataType) => string | Promise<string>,
        thisArg : any
    ) : KoconutPrimitive<string | null>;
    /** @ignore */
    minOfOrNull(
        selector : (element : CombinedDataType) => string | Promise<string>
    ) : KoconutPrimitive<string | null>
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) =>  ComparableType | Promise<ComparableType>,
        thisArg : any
    ) : KoconutPrimitive<ComparableType | null>;
    /** @ignore */
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => ComparableType | Promise<ComparableType>
    ) : KoconutPrimitive<ComparableType>;
    minOfOrNull<ComparableType extends KoconutComparable>(
        selector : (element : CombinedDataType) => number | string | ComparableType | Promise<number | string | ComparableType>,
        thisArg : any = null
    ) : KoconutPrimitive<number | string | ComparableType | null> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number | string | ComparableType | null>();
        (koconutToReturn as any as KoconutOpener<number | string | ComparableType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let lastComparableDatumToReturn : number | string | ComparableType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null
                        || (KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn as any as KoconutComparable) < 0)
                        || (!KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                            lastComparableDatumToReturn = eachComparableDatum
                        }
                }
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    /**
     * Returns the smallest value according to the provided ```comparator``` among all values
     * produced by ```selector``` function applied to each element in the collection all throws {@link KoconutNoSuchElementException}
     * if elements are empty.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param selectorThisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param comparatorThisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")
     *
     * const smallestNumberedStringOfArray = await koconutArray
     *                               .minOfWith(
     *                                   parseInt,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(smallestNumberedStringOfArray)
     * // ↑ 1
     *
     * try {
     *   await koconutArray
     *           .filter(eachString => eachString.length > 2)
     *           .minOfWith(
     *               parseInt,
     *               (front, rear) => front - rear
     *           )
     *           .yield()
     * } catch(error) {
     *   console.log(error.name)
     *   // ↑ Koconut No Such Element Exception
     *   // i.e. -- Array is filtered.
     *   // No string in "1" to "5" is logner than 2.
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const shortestStringLengthOfSet = await koconutSet
     *                           .minOfWith(
     *                               eachString => eachString.length,
     *                               (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(shortestStringLengthOfSet)
     * // ↑ 1
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *               .associate(eachString => [eachString.length, eachString])
     *
     * const shortestStringLengthOfMap = await koconutMap
     *                               .minOfWith(
     *                                   eachEntry => eachEntry.key,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(shortestStringLengthOfMap)
     * // ↑ 1
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const smallestNumberOfArray2 = await koconutArray2
     *                           .minOfWith(
     *                               async eachNumber => eachNumber,
     *                               async (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(smallestNumberOfArray2)
     * // ↑ 12
     *
     * const smallest1sDigitOfArray2 = await koconutArray2
     *                           .minOfWith(
     *                               (eachNumber) => new Promise<number>(resolve => {
     *                                   resolve(eachNumber % 10)
     *                               }),
     *                               (front, rear) => new Promise(resolve => {
     *                                   resolve(front - rear)
     *                               })
     *                           )
     *                           .yield()
     * console.log(smallest1sDigitOfArray2)
     * // ↑ 0
     * ```
     */
    minOfWith<ResultDataType>(
        selector : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) throw new KoconutNoSuchElementException(`Source data is null`)
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                if(lastComparableDatumToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return lastComparableDatumToReturn
            })
        return koconutToReturn

    }


    /**
     * Returns the smallest value according to the provided ```comparator``` among all values
     * produced by ```selector``` function applied to each element in the collection all ```null```
     * if elements are empty.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param selectorThisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param comparatorThisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")
     *
     * const smallestNumberedStringOfArray = await koconutArray
     *                               .minOfWithOrNull(
     *                                   parseInt,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(smallestNumberedStringOfArray)
     * // ↑ 1
     *
     * const smallestNumberedStringOfEmptyArray = await koconutArray
     *                           .filter(eachString => eachString.length > 2)
     *                           .minOfWithOrNull(
     *                               parseInt,
     *                               (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(smallestNumberedStringOfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const shortestStringLengthOfSet = await koconutSet
     *                           .minOfWithOrNull(
     *                               eachString => eachString.length,
     *                               (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(shortestStringLengthOfSet)
     * // ↑ 1
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *               .associate(eachString => [eachString.length, eachString])
     *
     * const shortestStringLengthOfMap = await koconutMap
     *                               .minOfWithOrNull(
     *                                   eachEntry => eachEntry.key,
     *                                   (front, rear) => front - rear
     *                               )
     *                               .yield()
     * console.log(shortestStringLengthOfMap)
     * // ↑ 1
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const smallestNumberOfArray2 = await koconutArray2
     *                           .minOfWithOrNull(
     *                               async eachNumber => eachNumber,
     *                               async (front, rear) => front - rear
     *                           )
     *                           .yield()
     * console.log(smallestNumberOfArray2)
     * // ↑ 12
     *
     * const smallest1sDigitOfArray2 = await koconutArray2
     *                           .minOfWithOrNull(
     *                               (eachNumber) => new Promise<number>(resolve => {
     *                                   resolve(eachNumber % 10)
     *                               }),
     *                               (front, rear) => new Promise(resolve => {
     *                                   resolve(front - rear)
     *                               })
     *                           )
     *                           .yield()
     * console.log(smallest1sDigitOfArray2)
     * // ↑ 0
     * ```
     */
    minOfWithOrNull<ResultDataType>(
        selector : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        comparator : (front : ResultDataType, rear : ResultDataType) => number | Promise<number>,
        selectorThisArg : any = null,
        comparatorThisArg : any = null
    ) : KoconutPrimitive<ResultDataType | null> {

        selector = selector.bind(selectorThisArg)
        comparator = comparator.bind(comparatorThisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType | null>();
        (koconutToReturn as any as KoconutOpener<ResultDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return null
                let lastComparableDatumToReturn : ResultDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    const eachComparableDatum = await selector(eachCombinedDatum)
                    if(lastComparableDatumToReturn == null || await comparator(lastComparableDatumToReturn, eachComparableDatum) > 0)
                        lastComparableDatumToReturn = eachComparableDatum
                }
                return lastComparableDatumToReturn
            })
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
        comparator : (front : CombinedDataType, rear : CombinedDataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null ) throw new KoconutNoSuchElementException(`Source data is null`)
                let dataToReturn : CombinedDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachCombinedDatum) > 0)
                        dataToReturn = eachCombinedDatum
                }
                if(dataToReturn == null) throw new KoconutNoSuchElementException(`Source data is empty`)
                return dataToReturn
            })
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
        comparator : (front : CombinedDataType, rear : CombinedDataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<CombinedDataType | null> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<CombinedDataType | null>();
        (koconutToReturn as any as KoconutOpener<CombinedDataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null ) return null
                let dataToReturn : CombinedDataType | null = null
                for(const eachCombinedDatum of this.combinedDataWrapper) {
                    if(dataToReturn == null || await comparator(dataToReturn, eachCombinedDatum) > 0)
                        dataToReturn = eachCombinedDatum
                }
                return dataToReturn
            })
        return koconutToReturn

    }
    



















    // Caster
    /**
     * Creates an {@link KoconutArray} instance that wraps original data.
     * 
     * @since 1.0.13
     * 
     * @category Caster
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const arrToArr = await koconutArray
     *                           .asArray()
     *                           .yield()
     * console.log(arrToArr)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,1,2,2,3,3,4,4,5,5)
     *
     * const setToArr = await koconutSet
     *                           .asArray()
     *                           .yield()
     * console.log(setToArr)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 3 -- KoconutFlow
     * const koconutFlow = KoconutFlow.ofSimple(1,2,3,4,5)
     *
     * const flowToArr = await koconutFlow
     *                           .asArray()
     *                           .yield()
     * console.log(flowToArr)
     * // ↑ 
     * // [
     * //    Entry { keyElement: 0, valueElement: 1 },
     * //    Entry { keyElement: 1, valueElement: 2 },
     * //    Entry { keyElement: 2, valueElement: 3 },
     * //    Entry { keyElement: 3, valueElement: 4 },
     * //    Entry { keyElement: 4, valueElement: 5 }
     * //  ]
     *
     * // Case 4 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                           .associate(eachNumber => [eachNumber, eachNumber])
     *
     * const mapToArr = await koconutMap
     *                           .asArray()
     *                           .yield()
     * console.log(mapToArr)
     * // ↑ 
     * // [
     * //    Entry { keyElement: 1, valueElement: 1 },
     * //    Entry { keyElement: 2, valueElement: 2 },
     * //    Entry { keyElement: 3, valueElement: 3 },
     * //    Entry { keyElement: 4, valueElement: 4 },
     * //    Entry { keyElement: 5, valueElement: 5 }
     * //  ]
     * ```
     */
    asArray() : KoconutArray<CombinedDataType> {

        const koconutToReturn = new KoconutArray<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<Array<CombinedDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return Array.from(this.combinedDataWrapper!)
            })
        return koconutToReturn

    }
    
    
    /**
     * Creates an {@link KoconutArray} instance that wraps original data.
     * 
     * @since 1.0.10
     * @deprecated Use {@link asArray} instead. 
     * @until 1.0.15
     * 
     * @category Caster 
     */
    toArray() : KoconutArray<CombinedDataType> {

        KoconutDeprecation.showDeprecationWarning("1.0.15", this.asArray)
        const koconutToReturn = new KoconutArray<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<Array<CombinedDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return Array.from(this.combinedDataWrapper!)
            })
        return koconutToReturn

    }


    /**
     * Creates an {@link KoconutSet} instance that wraps original data.
     * 
     * @since 1.0.13
     * 
     * @category Caster
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const arrToSet = await koconutArray
     *                           .asSet()
     *                           .yield()
     * console.log(arrToSet)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,1,2,2,3,3,4,4,5,5)
     *
     * const setToSet = await koconutSet
     *                           .asSet()
     *                           .yield()
     * console.log(setToSet)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     *
     * // Case 3 -- KoconutFlow
     * const koconutFlow = KoconutFlow.ofSimple(1,2,3,4,5)
     *
     * const flowToSet = await koconutFlow
     *                           .asSet()
     *                           .yield()
     * console.log(flowToSet)
     * // ↑ 
     * // Set {
     * //    Entry { keyElement: 0, valueElement: 1 },
     * //    Entry { keyElement: 1, valueElement: 2 },
     * //    Entry { keyElement: 2, valueElement: 3 },
     * //    Entry { keyElement: 3, valueElement: 4 },
     * //    Entry { keyElement: 4, valueElement: 5 }
     * //  }
     *
     * // Case 4 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                           .associate(eachNumber => [eachNumber, eachNumber])
     *
     * const mapToSet = await koconutMap
     *                           .asSet()
     *                           .yield()
     * console.log(mapToSet)
     * // ↑ 
     * // Set {
     * //    Entry { keyElement: 1, valueElement: 1 },
     * //    Entry { keyElement: 2, valueElement: 2 },
     * //    Entry { keyElement: 3, valueElement: 3 },
     * //    Entry { keyElement: 4, valueElement: 4 },
     * //    Entry { keyElement: 5, valueElement: 5 }
     * //  }
     * ```
     */
    asSet() : KoconutSet<CombinedDataType> {

        const koconutToReturn = new KoconutSet<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<Set<CombinedDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return new Set(this.combinedDataWrapper)
            })
        return koconutToReturn

    }


    /**
     * Creates an {@link KoconutSet} instance that wraps original data.
     * 
     * @since 1.0.10
     * @deprecated Use {@link toSet} instead. 
     * @until 1.0.15
     */
    toSet() : KoconutSet<CombinedDataType> {

        KoconutDeprecation.showDeprecationWarning("1.0.15", this.toSet)
        const koconutToReturn = new KoconutSet<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<Set<CombinedDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return new Set(this.combinedDataWrapper)
            })
        return koconutToReturn

    }


    /**
     * Creats an {@link KoconutFlow} instance that wraps original data.
     * 
     * @since 1.0.13
     * 
     * @category Caster
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const arrToFlow = await koconutArray
     *                           .asFlow()
     *                           .yield()
     * console.log(arrToFlow.dataArray)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,1,2,2,3,3,4,4,5,5)
     *
     * const setToFlow = await koconutSet
     *                           .asFlow()
     *                           .yield()
     * console.log(setToFlow.dataArray)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 3 -- KoconutFlow
     * const koconutFlow = KoconutFlow.ofSimple(1,2,3,4,5)
     *
     * const flowToFlow = await koconutFlow
     *                           .asFlow()
     *                           .yield()
     * console.log(flowToFlow.dataArray)
     * // ↑ 
     * // [
     * //    Entry { keyElement: 0, valueElement: 1 },
     * //    Entry { keyElement: 1, valueElement: 2 },
     * //    Entry { keyElement: 2, valueElement: 3 },
     * //    Entry { keyElement: 3, valueElement: 4 },
     * //    Entry { keyElement: 4, valueElement: 5 }
     * // ]
     *
     * // Case 4 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                           .associate(eachNumber => [eachNumber, eachNumber])
     *
     * const mapToFlow = await koconutMap
     *                           .asFlow()
     *                           .yield()
     * console.log(mapToFlow.dataArray)
     * // ↑ 
     * // [
     * //    Entry { keyElement: 1, valueElement: 1 },
     * //    Entry { keyElement: 2, valueElement: 2 },
     * //    Entry { keyElement: 3, valueElement: 3 },
     * //    Entry { keyElement: 4, valueElement: 4 },
     * //    Entry { keyElement: 5, valueElement: 5 }
     * // ]
     * ```
     */
    /*
     asFlow() : KoconutFlow<CombinedDataType> {

        const koconutToReturn = new KoconutFlow<CombinedDataType>();
        (koconutToReturn as any as KoconutOpener<Flow<CombinedDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return Flow.fromSimple(this.combinedDataWrapper)
            })
        return koconutToReturn

    }
    */



















    // Inspector
    /**
     * Return ```true``` if all elements match te given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Inspector
     * 
     * @example
     * ``` typescript
     *   // Case 1 -- KoconutArray
     *   const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     *   const areAllArrayElementsGreaterThan0 = await koconutArray
     *                                           .all(eachNumber => eachNumber > 0)
     *                                           .yield()
     *   console.log(areAllArrayElementsGreaterThan0)
     *   // ↑ true
     *
     *   const areAllArrayElementsEven = await koconutArray
     *                                   .all(eachNumber => eachNumber % 2 == 0)
     *                                   .yield()
     *   console.log(areAllArrayElementsEven)
     *   // ↑ false -- i.e. '1' is not an even number.
     *
     *
     *   // Case 2 -- KoconutSet
     *   const koconutSet = KoconutSet.of(1,2,3,4,5)
     *   
     *   const areAllSetElementsGreaterThan0 = await koconutSet
     *                                           .all(eachNumber => eachNumber > 0)
     *                                           .yield()
     *   console.log(areAllSetElementsGreaterThan0)
     *   // ↑ true
     *
     *   const areAllSetElementsOdd = await koconutSet
     *                                   .all(eachNumber => eachNumber % 2 == 1)
     *                                   .yield()
     *   console.log(areAllSetElementsOdd)
     *   // ↑ false -- i.e. '2' is not an odd number.
     *
     *
     *   // Case 3 -- KoconutMap
     *   const koconutMap = KoconutMap.of(
     *       [0, 0],
     *       [1, 1],
     *       [2, 2]
     *   )
     *
     *   const areAllMapEntriesKeyEqualsToValue = await koconutMap
     *                                          .all(eachEntry => eachEntry.key == eachEntry.value)
     *                                          .yield()
     *   console.log(areAllMapEntriesKeyEqualsToValue)
     *   // ↑ true
     *
     *   const areAllMapEntriesSumGreaterThan3 = await koconutMap
     *                                         .all(eachEntry => eachEntry.key + eachEntry.value > 3)
     *                                         .yield()
     *   console.log(areAllMapEntriesSumGreaterThan3)
     *   // ↑ false -- i.e. Sum of key and value of first Entry { 0, 0 } is 0. 
     *   // It's definetly less than 3
     * 
     *   // Case 4 -- You can also do it asynchronously
     *   const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     *   const areAllArrayElementsLessThan10 = await koconutArray2
     *                                       .all(async eachNumber => eachNumber < 10)
     *                                       .yield()
     *   console.log(areAllArrayElementsLessThan10)
     *   // ↑ true
     *
     *   const areAllArrayElementsOdd = await koconutArray2
     *                                   .all(eachNumber => new Promise(resolve => {
     *                                       resolve(eachNumber % 2 == 1)
     *                                   }))
     *                                   .yield()
     *   console.log(areAllArrayElementsOdd)
     *   // ↑ false -- i.e. '2' is not an odd number.
     * ```
     */
    all(
        predicate : (element : CombinedDataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return false
                for(const eachCombinedDatum of this.combinedDataWrapper)
                    if(!await predicate(eachCombinedDatum)) return false
                return true
            })
        return koconutToReturn

    }


    /**
     * Returns ```true``` if the collection has at least one element matches the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Inspector
     * 
     * @example
     * ``` typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const isAnyArrayElementGreaterThan4 = await koconutArray
     *                                           .any(eachNumber => eachNumber > 4)
     *                                           .yield()
     * console.log(isAnyArrayElementGreaterThan4)
     * // ↑ true -- i.e. '5' is greater than 4.
     *
     * const isAnyArrayElementMultipleOf6 = await koconutArray
     *                                           .any(eachNumber => eachNumber % 6 == 0)
     *                                           .yield()
     * console.log(isAnyArrayElementMultipleOf6)
     * // ↑ false
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isAnySetElementGreaterThan3 = await koconutSet
     *                                           .any(eachNumber => eachNumber > 3)
     *                                           .yield()
     * console.log(isAnySetElementGreaterThan3)
     * // ↑ true -- i.e. '4' is greater than 3.
     *
     * const isAnySetElementLessThan0 = await koconutSet
     *                                       .any(eachNumber => eachNumber < 0)
     *                                       .yield()
     * console.log(isAnySetElementLessThan0)
     * // ↑ false
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutMap.of(
     *   [0, 0],
     *   [1, 1],
     *   [2, 2]
     * )
     *
     * const isAnyMapEntrySumGreaterThan3 = await koconutMap
     *                                        .any(eachEntry => eachEntry.key + eachEntry.value > 3)
     *                                        .yield()
     * console.log(isAnyMapEntrySumGreaterThan3)
     * // ↑ true -- i.e. Sum of key and value of third Entry { 2, 2 } is 4.
     * // It's grater than 4.
     * 
     * const isAnyMapEntryKeyMultipleOf4 = await koconutMap
     *                                  .any(eachEntry => eachEntry.key > 0 && eachEntry.key % 4 == 0)
     *                                  .yield()
     * console.log(isAnyMapEntryKeyMultipleOf4)
     * // ↑ false
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     * 
     * const isAnyArrayElementLessThan2 = await koconutArray2
     *                                   .any(async eachNumber => eachNumber < 2)
     *                                   .yield()
     * console.log(isAnyArrayElementLessThan2)
     * // ↑ true -- i.e. '1' is less than 2.
     *
     * const isAnyArrayElementGreaterThan7 = await koconutArray2
     *                                       .any(eachNumber => new Promise(resolve => {
     *                                           resolve(eachNumber > 7)
     *                                       }))
     *                                       .yield()
     * console.log(isAnyArrayElementGreaterThan7)
     * // ↑ false
     * ```
     */
    any(
        predicate : (element : CombinedDataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null) return false
                for(const eachCombinedDatum of this.combinedDataWrapper)
                    if(await predicate(eachCombinedDatum)) return true
                return false
            })
        return koconutToReturn

    }


    /**
     * Returns ```true``` if the collection is empty (contains no elements), ```false``` otherwise.
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
     * const isNumberArrayEmpty = await koconutArray
     *                           .isEmpty()
     *                           .yield()
     * console.log(isNumberArrayEmpty)
     * // ↑ false
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isFilteredNumberSetEmpty = await koconutSet
     *                           .filter(eachNumber => eachNumber > 10)
     *                           .isEmpty()
     *                           .yield()
     * console.log(isFilteredNumberSetEmpty)
     * // ↑ true
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = new KoconutMap<number, number>()
     *
     * const isNumberPairedMapEmpty = await koconutMap
     *                                   .isEmpty()
     *                                   .yield()
     * console.log(isNumberPairedMapEmpty)
     * // ↑ true
     * ```
     */
    isEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return this.combinedDataWrapper != null && this.mSize == 0
            })
        return koconutToReturn

    }


    /**
     * Returns ```true``` if the collection is not empty.
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
     * const isNumberArrayEmpty = await koconutArray
     *                           .isNotEmpty()
     *                           .yield()
     * console.log(isNumberArrayEmpty)
     * // ↑ true
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isFilteredNumberSetEmpty = await koconutSet
     *                           .filter(eachNumber => eachNumber > 10)
     *                           .isNotEmpty()
     *                           .yield()
     * console.log(isFilteredNumberSetEmpty)
     * // ↑ false
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = new KoconutMap<number, number>()
     *
     * const isNumberPairedMapEmpty = await koconutMap
     *                                   .isNotEmpty()
     *                                   .yield()
     * console.log(isNumberPairedMapEmpty)
     * // ↑ false
     * ```
     */
    isNotEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return this.mSize != 0
            })
        return koconutToReturn

    }


    /**
     * Returns ```true``` if this nullable collection is either null or empty.
     * 
     * @since 1.0.10
     * @deprecated Use {@link isEmpty} instead. 
     * @until 1.3.0
     * 
     * @category Inspector
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const isNumberArrayEmpty = await koconutArray
     *                           .isNullOrEmpty()
     *                           .yield()
     * console.log(isNumberArrayEmpty)
     * // ↑ false
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isFilteredNumberSetEmpty = await koconutSet
     *                           .filter(eachNumber => eachNumber > 10)
     *                           .isNullOrEmpty()
     *                           .yield()
     * console.log(isFilteredNumberSetEmpty)
     * // ↑ true
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = new KoconutMap<number, number>()
     *
     * const isNumberPairedMapEmpty = await koconutMap
     *                                   .isNullOrEmpty()
     *                                   .yield()
     * console.log(isNumberPairedMapEmpty)
     * // ↑ true
     * ``` 
     */
    isNullOrEmpty() : KoconutPrimitive<boolean> {

        KoconutDeprecation.showDeprecationWarning("1.3.0", this.isEmpty)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return this.combinedDataWrapper == null || this.mSize == 0
            })
        return koconutToReturn

    }


    /**
     * ```predicate``` callback function is optional. If it's omitted the method returns ```true``` if the collection has no elements.
     * Otherwise, returns ```true``` if no elements match the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Inspector
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = new KoconutArray<number>()
     *
     * const isNoneOfAnEmptyArray = await koconutArray
     *                                   .none()
     *                                   .yield()
     * console.log(isNoneOfAnEmptyArray)
     * // ↑ true
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isNoneOfSetElementGreaterThan10 = await koconutSet
     *                                       .none(eachNumber => eachNumber >= 10)
     *                                       .yield()
     * console.log(isNoneOfSetElementGreaterThan10)
     * // ↑ true
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                   .associateWith(eachNumber => eachNumber * 2)
     *
     * const isNoneOfEntryOfMapHasLessThan3DifferenceBetweenKeyAndValue
     *                       = await koconutMap
     *                           .none(eachEntry => eachEntry.value - eachEntry.key <= 3)
     *                           .yield()
     * console.log(isNoneOfEntryOfMapHasLessThan3DifferenceBetweenKeyAndValue)
     * // ↑ false
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const isNoneOfArrayElementGreaterThan3 = await koconutArray2
     *                                   .none(async eachNumber => eachNumber >= 3)
     *                                   .yield()
     * console.log(isNoneOfArrayElementGreaterThan3)
     * // ↑ false
     *
     * const isNoneOfArrayelementLessThan0 = await koconutArray2
     *                   .none(eachNumber => new Promise(resolve => {
     *                       resolve(eachNumber <= 0)
     *                   }))
     *                   .yield()
     * console.log(isNoneOfArrayelementLessThan0)
     * // ↑ true
     * ```
     */
    none(
        predicate : ((element : CombinedDataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper == null || this.mSize == 0) return true
                if(predicate) {
                    for(const eachCombinedDatum of this.combinedDataWrapper)
                        if(await predicate(eachCombinedDatum)) return false
                    return true
                }
                return false
            })
        return koconutToReturn

    }
    
    



















    
    // Iterator
    /**
     * Performs the given ```action``` on each element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts an argument. The method calls the ```action``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Iterator
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5,6,7)
     * await koconutArray
     *   .forEach(console.log)
     *   // ↑ 1 2 3 4 5 6 7  -- i.e. This will print out each number
     *   .process()
     *
     * await koconutArray
     *   .forEach(eachNumber => {
     *       if(eachNumber > 4) return KoconutLoopSignal.BREAK
     *       console.log(eachNumber)
     *   })
     *   // ↑ 1 2 3 4  -- i.e. Since '5', it is greater than 4, so the loop is broken.
     *   .process()
     *
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,1,2,3)
     *
     * await koconutSet
     *   .forEach(console.log)
     *   // ↑ 1 2 3 -- i.e. All conflicted numbers will be ignored.
     *   .process()
     *
     * await koconutSet
     *   .forEach(eachNumber => {
     *       if(eachNumber % 2 == 0) return false
     *       console.log(eachNumber)
     *   })
     *   // ↑ 1 -- i.e. Since '2', it is an even number, so the loop is broken.
     *   .process()
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachElement => eachElement)
     *
     * await koconutMap
     *   .forEach(console.log)
     *   // ↑ 
     *   // Entry { keyElement: 1, valueElement: 1 }
     *   // Entry { keyElement: 2, valueElement: 2 }
     *   // Entry { keyElement: 3, valueElement: 3 }
     *   .process()
     *   
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3)
     *    
     * await koconutArray2
     *   .forEach(async eachNumber => console.log(eachNumber))
     *   // ↑ 1 2 3
     *   .process()
     *
     * await koconutArray2
     *   .forEach(eachNumber => new Promise(resolve => resolve(console.log(eachNumber))))
     *   // ↑ 1 2 3
     *   .process()
     * ```
     */
    forEach(
        action : (element : CombinedDataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const signal = await action(eachCombinedDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet/KoconutMap
    onEach(
        action : (element : CombinedDataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const signal = await action(eachCombinedDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }
    



















    // Manipulator
    // No Comment - KoconutArray/KoconutSet/KoconutMap
    filter(
        predicate : (element : CombinedDataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<CombinedDataType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) 
                        if(await predicate(eachCombinedDatum)) processedArray.push(eachCombinedDatum)
                }
                if(this.data instanceof Array) return processedArray as any as WrapperType
                else if(this.data instanceof Set) return new Set(processedArray) as any as WrapperType
                else {
                    const processedMap = new Map()
                    processedArray.forEach(eachProcessedDatum => {
                        const eachEntry =  eachProcessedDatum as any as Entry<any, any>
                        processedMap.set(eachEntry.key, eachEntry.value)
                    })
                    return processedMap as any as WrapperType
                }
            })
        return koconutToReturn

    }

    
    // No Comment - KoconutArray/KoconutSet/KoconutMap
    filterNot(
        predicate : (element : CombinedDataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<CombinedDataType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) 
                        if(!await predicate(eachCombinedDatum)) processedArray.push(eachCombinedDatum)
                }
                if(this.data instanceof Array) return processedArray as any as WrapperType
                else if(this.data instanceof Set) return new Set(processedArray) as any as WrapperType
                else {
                    const processedMap = new Map()
                    processedArray.forEach(eachProcessedDatum => {
                        const eachEntry =  eachProcessedDatum as any as Entry<any, any>
                        processedMap.set(eachEntry.key, eachEntry.value)
                    })
                    return processedMap as any as WrapperType
                }
            })
        return koconutToReturn

    }



















    
    // Transformer
    /**
     * Returns a single list of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of("123", "45")
     *
     * const allNumberInArray = await koconutArray
     *                           .flatMap(eachString => eachString)
     *                           // ↑ The string itself can be used as Iterable<string>.
     *                           // If you want to make it clear, also possible to type
     *                           // as eachString => eachString.split('')
     *                           .map(parseInt)
     *                           .yield()
     * console.log(allNumberInArray)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 2 - KoconutSet
     * const koconutSet = KoconutSet.of("abc", "de")
     *
     * const allCharactersInSet = await koconutSet
     *                           .flatMap(eachString => eachString)
     *                           .yield()
     * console.log(allCharactersInSet)
     * // ↑ [ 'a', 'b', 'c', 'd', 'e' ]
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                   .associateWith(eachNumber => eachNumber * 2)
     *
     * const allKeysAndValuesInMap = await koconutMap
     *                               .flatMap(eachEntry => [eachEntry.key, eachEntry.value])
     *                               .yield()
     * console.log(allKeysAndValuesInMap)
     * // ↑ [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
     *
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(123, 987)
     *
     * const allDigitsInArray = await koconutArray2
     *                               .flatMap(async eachNumber => {
     *                                   const digits = new Array<number>()
     *                                   while(eachNumber != 0) {
     *                                       digits.unshift(eachNumber % 10)
     *                                       eachNumber = Math.floor(eachNumber / 10)
     *                                   }
     *                                   return digits
     *                               })
     *                               .yield()
     * console.log(allDigitsInArray)
     * // ↑ [ 1, 2, 3, 9, 8, 7 ]
     *
     * const allNumberCharactersInArray = await koconutArray2
     *                                       .flatMap(eachNumber => new Promise<string>(resolve => {
     *                                           resolve(eachNumber.toString())
     *                                       }))
     *                                       .yield()
     * console.log(allNumberCharactersInArray)
     * // ↑ [ '1', '2', '3', '9', '8', '7' ]
     * ```
     */
    flatMap<ResultDataType>(
        transform : (element : CombinedDataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper)
                        for(let eachSubElement of await transform(eachCombinedDatum))
                            processedArray.push(eachSubElement)
                }
                return processedArray
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet/KoconutMap
    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : CombinedDataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper)
                        for(let eachSubElement of await transform(eachCombinedDatum))
                            if(destination instanceof Array) destination.push(eachSubElement)
                            else destination.add(eachSubElement)
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a list containing the results of applying the given ```transform``` function
     * to each element in the original collection.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const doubledNumbersInArray = await koconutArray
     *                           .map(eachNumber => eachNumber * 2)
     *                           .yield()
     * console.log(doubledNumbersInArray)
     * // ↑ [ 2, 4, 6, 8, 10 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doubledNumbersInSet = await koconutSet
     *                           .map(eachNumber => eachNumber * 2)
     *                           .yield()
     * console.log(doubledNumbersInSet)
     * // ↑ [ 2, 4, 6, 8, 10 ]
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                   .associate(eachNumber => [eachNumber, eachNumber * 2])
     *
     * const keyValueSumOfMap = await koconutMap
     *                       .map(eachEntry => eachEntry.key + eachEntry.value)
     *                       .yield()
     * console.log(keyValueSumOfMap)
     * // ↑ [ 3, 6, 9, 12, 15 ]
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const squaredNumberInArray = await koconutArray2
     *                           .map(async eachNumber => eachNumber * eachNumber)
     *                           .yield()
     * console.log(squaredNumberInArray)
     * // ↑ [ 1, 4, 9, 16, 25 ]
     *
     * const trippledNumbersInArray = await koconutArray2
     *                               .map(eachNumber => new Promise(resolve => {
     *                                   resolve(eachNumber * 3)
     *                               }))
     *                               .yield()
     * console.log(trippledNumbersInArray)
     * // ↑ [ 3, 6, 9, 12, 15 ]
     * ```
     */
    map<ResultDataType>(
        transform : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        processedArray.push(await transform(eachCombinedDatum))
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    // No Comment -- KoconutArray/KoconutSet/KoconutMap
    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : CombinedDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const dataToAdd = await transform(eachCombinedDatum)
                        if(destination instanceof Array) destination.push(dataToAdd)
                        else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a list containing results that are not ```null``` nor ```undefined``` of applying
     * the given ```transfrom``` function to each element in the original collection. You can use this method as ```filter``` then ```map```.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const squaredOddNumbersInArray = await koconutArray
     *                       .mapNotNull(eachNumber => {
     *                           if(eachNumber % 2 == 1)
     *                               return eachNumber * eachNumber
     *                           // return
     *                           // return null
     *                           // return undefined
     *                           // ↑ You can use any one of
     *                           //   them or just omit it.
     *                       })
     *                       .yield()
     * console.log(squaredOddNumbersInArray)
     * // ↑ [ 1, 9, 25 ]
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("1", "54", "26", "5")
     *
     * const twoDigitsNumbersInSet = await koconutSet
     *                       .mapNotNull(eachString => {
     *                           if(eachString.length == 2)
     *                               return parseInt(eachString)
     *                       })
     *                       .yield()
     * console.log(twoDigitsNumbersInSet)
     * // ↑ [ 54, 26 ]
     *
     * // Case 3 -- KoconutMap
     * const KoconutMap = KoconutArray.of(1,2,3,4,5)
     *               .associate(eachNumber => [eachNumber, eachNumber * 2])
     *
     * const oddKeyKeyValueSumInMap = await KoconutMap
     *                       .mapNotNull(eachEntry => {
     *                           if(eachEntry.key % 2 == 1)
     *                               return eachEntry.key + eachEntry.value
     *                       })
     *                       .yield()
     * console.log(oddKeyKeyValueSumInMap)
     * // ↑ [ 3, 9, 15 ]
     *
     * // Case 4 -- You can also do it asynchronously
     * const koocnutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const squaredEvenNumbersInArray = await koocnutArray2
     *                           .mapNotNull(async eachNumber => {
     *                               if(eachNumber % 2 == 0)
     *                                   return eachNumber * eachNumber
     *                           })
     *                           .yield()
     * console.log(squaredEvenNumbersInArray)
     * // ↑ [ 4, 16 ]
     *
     * const doubledOddNumbersInArray = await koocnutArray2
     *                       .mapNotNull(eachNumber => new Promise<number | null>(resolve => {
     *                           if(eachNumber % 2 == 1)
     *                               resolve(eachNumber * 2)
     *                           else resolve(null)
     *                       }))
     *                       .yield()
     * console.log(doubledOddNumbersInArray)
     * // ↑ [ 2, 6, 10 ]
     * ```
     */
    mapNotNull<ResultDataType>(
        transform : (element : CombinedDataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null 
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const dataToAdd = await transform(eachCombinedDatum)
                        if(dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    // No Comment -- KoconutArray/KoconutSet/KoconutMap
    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : CombinedDataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const dataToAdd = await transform(eachCombinedDatum)
                        if(dataToAdd != null && dataToAdd != undefined)
                            if(destination instanceof Array) destination.push(dataToAdd)
                            else destination.add(dataToAdd)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }





    



    

}