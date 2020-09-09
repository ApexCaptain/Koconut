import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutDeprecation, KoconutTypeChecker,

    /* Container */
    KoconutArray,

    /* Enum */
    KoconutLoopSignal,

    /* Exception */
    KoconutNoSuchElementException,

    /* Protocol */
    KoconutComparable
} from "../../module.internal"

export class KoconutIterable<DataType, CombinedDataType, WrapperType extends Iterable<DataType>, CombinedWrapperType extends Iterable<CombinedDataType>> extends KoconutPrimitive<WrapperType> {

    protected combinedDataWrapper : CombinedWrapperType | null = null

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

    // Transformer


    // asIterable


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


    // asSequence

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
     * throw {@link KoconutNoSuchElementException} if there are no elements.
     * 
     * @throws {@link KoconutNoSuchElementException}
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * @deprecated Use {@link maxByOrNull} instead.
     * 
     * @param selector 
     * @param thisArg 
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
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * 
     * @param selector 
     * @param thisArg 
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
     * 
     * @since 1.0.10
     * 
     * @category Calculator
     * 
     * @param selector zxc
     * @param thisArg asd
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

    /**
     * Performs the given ```action``` on each element, providing sequential index with the element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachElement => eachElement)
     *
     * await koconutMap
     *       .forEachIndexed(console.log)
     *       // ↑
     *       // 0 Entry { keyElement: 1, valueElement: 1 }
     *       // 1 Entry { keyElement: 2, valueElement: 2 }
     *       // 2 Entry { keyElement: 3, valueElement: 3 }
     *       .process()
     *
     * // Case 4 -- You can also do it asynchronously
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
    forEachIndexed(
        action : (index : number, element : CombinedDataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.combinedDataWrapper != null) {
                    let eachIndex = 0
                    for(const eachCombinedDatum of this.combinedDataWrapper) {
                        const signal = await action(eachIndex++, eachCombinedDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
            })
        return koconutToReturn

    }

    



    

}