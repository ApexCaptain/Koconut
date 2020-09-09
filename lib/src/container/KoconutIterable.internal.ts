import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutDeprecation,

    /* Container */
    KoconutArray,

    /* Enum */
    KoconutLoopSignal
} from "../../module.internal"

export class KoconutIterable<DataType, CombinedDataType, WrapperType extends Iterable<DataType>, CombinedWrapperType extends Iterable<CombinedDataType>> extends KoconutPrimitive<WrapperType> {

    protected combinedDataWrapper : CombinedWrapperType | null = null

    /**
     * Return ```true``` if all elements match te given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * Returns this collection as an KoconutIterable
     */
    asIterable() : KoconutIterable<DataType, CombinedDataType, WrapperType, CombinedWrapperType> {
        
        KoconutDeprecation.showDeprecationWarning("1.0.11")
        return this

    }


    // asSequence


    /**
     * Returns the number of the elements matching the given ```predicate```. If the ```predicate``` is ommitted it'll returns the whole number of elements. 
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * Returns a single list of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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


    /**
     * Performs the given ```action``` on each element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts an argument. The method calls the ```action``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
