`use strict`

import {
    /* Base */
    Pair, KoconutPair, KoconutTypeChecker, Entry, KoconutEntry,

    /* Container */
    KoconutCollection,

    /* Enum */
    KoconutLoopSignal,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../../module.internal"

export class KoconutSet<DataType> extends KoconutCollection<DataType, Set<DataType>> {

    // Private
    private static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Set<DataType>>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>(collection['data'])
        koconutToReturn.processor = collection['processor'];
        koconutToReturn.prevYieldable = collection['prevYieldable']
        return koconutToReturn

    }


















    



    // Koconut Primitive
    /**
     * Creates a new instance from ```iterable``` object.
     * @param set An array-like ```iterable``` object to convert to a {@link KoconutSet}.
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * const numbers = Array.of(1,2,3,4,5)
     * const koconutNumbers = new KoconutSet(numbers)
     * // ↑ This is a Koconut number set consists of 1 to 5.
     * 
     * const emptyNumberSet = new KoconutSet<number>()
     * // ↑ This is an empty Koconut number set.
     * ```
     */
    constructor(set : Iterable<DataType> | null = null) {
        super()
        this.data = set == null ? new Set() : new Set(set)
    }
    

















    



    // Koconut Iterable
    async validate(data : Set<DataType> | null) {
        if(data != null) {
            let index = 0
            const keys = new Array<DataType>()
            for(const eachDatum of data) {
                if(KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                    let isConflict = false
                    for(const eachPrevEquatablekDatum of keys) {
                        if(eachDatum.equalsTo(eachPrevEquatablekDatum as any as KoconutEquatable)) {
                            isConflict = true
                            break;
                        }
                    }
                    if(!isConflict) {
                        this.mSize ++
                        this.mIndices.push(index ++)
                        keys.push(eachDatum)
                    } else this.data?.delete(eachDatum)
                } else {
                    this.mSize ++
                    this.mIndices.push(index ++)
                }
            }
            this.combinedDataWrapper = data
        }
    }
    

















    
    // Creator
    /**
     * Creates a new instance from ```iterable``` object.
     * @param source An array-like ```iterable``` object to convert to a {@link KoconutSet}.
     * 
     * @category Creator
     * 
     * @since 1.0.11
     * 
     * @example
     * ```typescript
     * const numbers = Array.of(1,2,3,4,5)
     * const koconutNumbers = KoconutSet.from(numbers)
     * // ↑ This is a Koconut number set consists of 1 to 5.
     * 
     * const emptyNumberSet = KoconutSet.from<number>()
     * // ↑ This is an empty Koconut number set.
     * ```
     */
    static from<DataType>(
        source : Iterable<DataType> | null = null
    ) : KoconutSet<DataType> {

        return new KoconutSet(new Set(source))

    }


    /**
     * Creates a new instance from variable number of arguments.
     * @param data A set of elements to include in the new {@link KoconutSet} object.
     * 
     * @category Creator
     * 
     * @since 1.0.11
     * 
     * @example
     * ```typescript
     * const koconutNumbers = KoconutSet.of(1,2,3,4,5)
     * // ↑ This is a Koconut number set consists of 1 to 5.
     * 
     * const emptyNumberSet = KoconutSet.of<number>()
     * // ↑ This is an empty Koconut number set.
     * ```
     */
    static of<DataType>(
        ...data : DataType[]
    ) : KoconutSet<DataType> {

        return new KoconutSet(new Set(data))

    }
    

















    



    // Iterator
    /**
     * Perfroms the given ```action``` on each element and returns the original collection itself afterwards.
     * @param action A callback function that accepts an argument. The method calls the ```action``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Iterator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const set = await koconutSet
     *                   .onEach(console.log)
     *                   // ↑ 1
     *                   //   2
     *                   //   3
     *                   //   4
     *                   //   5
     *                   .onEach(async eachNumber => {
     *                       if(eachNumber >= 3) return KoconutLoopSignal.BREAK
     *                       console.log(eachNumber)
     *                   })
     *                   // ↑ 1
     *                   //   2
     *                   .onEach(eachNumber => new Promise(resolve => {
     *                       if(eachNumber == 2) resolve(false)
     *                       else {
     *                           console.log(eachNumber)
     *                           resolve()
     *                       }
     *                   }))
     *                   // ↑ 1
     *                   .yield()
     * console.log(set)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.onEach(action, thisArg))

    }


    /**
     * Performs the given ```action``` on each element, providing sequential index with the element, and returns the collection itself afterwards.
     * @param action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Iterator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const set = await koconutSet
     *                 .onEachIndexed(console.log)
     *                 // ↑ 0 1
     *                 //   1 2
     *                 //   2 3
     *                 //   3 4
     *                 //   4 5
     *                 .onEachIndexed(async (eachIndex, eachNumber) => {
     *                     if(eachIndex >= 2) return KoconutLoopSignal.BREAK
     *                     console.log(eachNumber)
     *                 })
     *                 // ↑ 1
     *                 //   2
     *                 .onEachIndexed((eachIndex, eachNumber) => new Promise(resolve => {
     *                     if(eachIndex == 2) resolve(false)
     *                     else {
     *                         console.log(eachNumber)
     *                         resolve()
     *                     }
     *                 }))
     *                 // ↑ 1
     *                 //   2
     *                 .yield()
     * console.log(set)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.onEachIndexed(action, thisArg))

    }

















    



    // Transformer
    /**
     * Populates the given ```destination``` map with entries, where ```key``` is provided by
     * ```keySelector``` function applied to each element.
     * ```valueTransform``` callback function is optional. If it's omitted, each value of entry
     * is same as the original data. Otherwise, the value is provided by the ```valueTransform``` function
     * applied to elements of the given collcetion.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
     * @param valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
     * @param keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @note This method has different functionality with Kotlin. It'll return the original collection instance.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doubledKeyMap = new Map<number, number>()
     * const stringKeyDoubledValueMap = new Map<string ,number>()
     * const doubledKeySquaredValueMap = new Map<number, number>()
     * const originalData = await koconutSet
     *           .associateByTo(
     *               doubledKeyMap,
     *               eachNumber => eachNumber * 2
     *           )
     *           .associateByTo(
     *               stringKeyDoubledValueMap,
     *               async eachNumber => eachNumber.toString(),
     *               async eachNumber => eachNumber * 2
     *           )
     *           .associateByTo(
     *               doubledKeySquaredValueMap,
     *               eachNumber => new Promise(resolve => {
     *                   resolve(eachNumber * 2)
     *               }),
     *               eachNumber => new Promise(resolve => {
     *                   resolve(eachNumber * eachNumber)
     *               })
     *           )
     *           .yield()
     * console.log(doubledKeyMap)
     * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
     * console.log(stringKeyDoubledValueMap)
     * // ↑ Map { '1' => 2, '2' => 4, '3' => 6, '4' => 8, '5' => 10 }
     * console.log(doubledKeySquaredValueMap)
     * // ↑ Map { 2 => 1, 4 => 4, 6 => 9, 8 => 16, 10 => 25 }
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    /**
     * Populates the given ```destination``` map with entries, provided by ```transform``` function
     * applied to elements of the given collection
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @note This method has different functionality with Kotlin. It'll return the original collection instance.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledValueMap = new Map<number, number>()
     * const doubledKeyMap = new Map<number, number>()
     * const squaredValueMap = new Map<number, number>()
     * const originalData = await koconutSet
     *               .associateTo(
     *                   doubledValueMap,
     *                   eachNumber => [eachNumber, eachNumber * 2]
     *                   // ↑ Also can be
     *                   //   new Pair(eachNumber, eachNumber * 2)
     *                   //   Pair.from([eachNumber, eachNumber * 2])
     *                   //   new KoconutPair(eachNumber, eachNumber * 2)
     *                   //   new Entry(eachNumber, eachNumber * 2)
     *                   //   Entry.from([eachNumber, eachNumber * 2])
     *                   //   new KoconutEntry(eachNumber, eachNumber * 2)
     *               )
     *               .associateTo(
     *                   doubledKeyMap,
     *                   async eachNumber => [eachNumber * 2, eachNumber]
     *               )
     *               .associateTo(
     *                   squaredValueMap,
     *                   eachNumber => new Promise(resolve => {
     *                       resolve([eachNumber, eachNumber * eachNumber])
     *                   })
     *               )
     *               .yield()
     * console.log(doubledValueMap)
     * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
     * console.log(doubledKeyMap)
     * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
     * console.log(squaredValueMap)
     * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType) => 
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
              | KoconutEntry<KeyType, ValueType>
        >,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateTo(destination, transform, thisArg))

    }


    associateWithTo<ValueType>(
        destination : Map<DataType, ValueType>,
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))

    }

    
    /**
     * Appends all elements yielded from results of ```transform``` function being invoked
     * on each element of original collection, to the given ```destination```.
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
        transform : (element : DataType,) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.flatMapTo(destination, transform, thisArg))

    }

    /**
     * Appends all elements yielded from results of ```transform``` function being invoked
     * on each element and its index in the original collection, to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
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
     * const allIndexAndNumbersInSet= new Array<number>()
     * await koconutSet
     *       .flatMapIndexedTo(
     *           allIndexAndNumbersInSet,
     *           (eachIndex, eachElement) => [
     *               eachIndex,
     *               ...eachElement
     *                   .split('')
     *                   .map(eachCharacter => parseInt(eachCharacter))
     *           ]
     *       )
     *       .process()
     * console.log(allIndexAndNumbersInSet)
     * // ↑ [ 0, 1, 2, 3, 1, 4, 5, 6 ]
     * ```
     */
    flatMapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.flatMapIndexedTo(destination, transform, thisArg))

    }


    /**
     * Applies the given ```transform``` function to each element of the original collection
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
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const doubledNumbers = new Array<number>()
     * const originalData = await koconutSet
     *                   .mapTo(
     *                       doubledNumbers,
     *                       eachNumber => eachNumber * 2
     *                   )
     *                   .yield()
     * console.log(doubledNumbers)
     * // ↑ [ 2, 4, 6, 8, 10 ]
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapTo(destination, transform, thisArg))

    }


    
    /**
     * Applies the given ```transform``` function to each element of the original collection
     * and appends only the results that are not ```null``` nor ```undefined```.
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
     * const koconutSet = KoconutSet.of("1", "12", "34", "5")
     *
     * const twoDigitsNumbers = Array<number>()
     * const originalData = await koconutSet
     *                       .mapNotNullTo(
     *                           twoDigitsNumbers,
     *                           eachString => {
     *                               if(eachString.length == 2)
     *                                   return parseInt(eachString)
     *                               // return
     *                               // return null
     *                               // return undefined
     *                               // ↑ You can use any one of
     *                               //   them or just omit it.
     *                           }
     *                       )
     *                       .yield()
     * console.log(twoDigitsNumbers)
    // ↑ [ 12, 34 ]
    console.log(originalData)
    // ↑ Set { '1', '12', '34', '5' }
     * ```
     */
    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    /**
     * Applies the given ```transform``` function to each element and its index in the original
     * collection and appends the results to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbers = new Array<number>()
     * const originalData = await koconutSet
     *                   .mapIndexedTo(
     *                       sumsOfIndexesAndNumbers,
     *                       (eachIndex, eachNumber) => eachIndex + eachNumber
     *                   )
     *                   .yield()
     * console.log(sumsOfIndexesAndNumbers)
     * // ↑ [ 1, 3, 5, 7, 9 ]
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapIndexedTo(destination, transform, thisArg))

    }


    /**
     * Applies the given ```transform``` function to each element and its index in the original
     * collection and appends the results that are not ```null``` nor ```undefined``` to the given ```destination```.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbersWhereNumberIsEvent = new Array<number>()
     * const prodcutsOfIndexesAndNumbersWhereIndexIsOdd = new Set<number>()
     * const squaredNumbersWhereIndexLessThan3 = new Array<number>()
     * const origianlData = await koconutSet
     *       .mapIndexedNotNullTo(
     *           sumsOfIndexesAndNumbersWhereNumberIsEvent,
     *           (eachIndex, eachNumber) => {
     *               if(eachNumber % 2 == 0)
     *                   return eachIndex + eachNumber
     *               // return
     *               // return null
     *               // return undefined
     *               // ↑ You can use any one of
     *               //   them or just omit it.
     *           }
     *       )
     *       .mapIndexedNotNullTo(
     *           prodcutsOfIndexesAndNumbersWhereIndexIsOdd,
     *           async (eachIndex, eachNumber) => {
     *               if(eachIndex % 2 == 1)
     *                   return eachIndex * eachNumber
     *           }
     *       )
     *       .mapIndexedNotNullTo(
     *           squaredNumbersWhereIndexLessThan3,
     *           (eachIndex, eachNumber) => new Promise<number | null>(resolve => {
     *               if(eachIndex <= 3)
     *                   resolve(eachNumber * eachNumber)
     *               else resolve(null)
     *           })
     *       )
     *           .yield()
     * console.log(sumsOfIndexesAndNumbersWhereNumberIsEvent)
     * // ↑ [ 3, 7 ]
     * console.log(prodcutsOfIndexesAndNumbersWhereIndexIsOdd)
     * // ↑ Set { 2, 12 }
     * console.log(squaredNumbersWhereIndexLessThan3)
     * // ↑ [ 1, 4, 9, 16 ]
     * console.log(origianlData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg))

    }
    
    



















    
    // Manipulator
    /**
     * Returns a {@link KoconutSet} containing only elements matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const evenNumbers = await koconutSet
     *                       .filter(eachNumber => eachNumber % 2 == 0)
     *                       .yield()
     * console.log(evenNumbers)
     * // ↑ Set { 2, 4 }
     * ```
     */
    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filter(predicate, thisArg))

    }


    /**
     * Returns a {@link KoconutSet} containing only elements not matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const oddNumbers = await koconutSet
     *                       .filterNot(eachNumber => eachNumber % 2 == 0)
     *                       .yield()
     * console.log(oddNumbers)
     * // ↑ Set { 1, 3, 5 }
     * ```
     */
    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNot(predicate, thisArg))

    }


    /**
     * Appends all elements matching the given ```predicate``` to the given destination.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const evenNumbers = new Array<number>()
     * const originalData = await koconutSet
     *                       .filterTo(
     *                           evenNumbers,
     *                           eachNumber => eachNumber % 2 == 0
     *                       )
     *                       .yield()
     * console.log(evenNumbers)
     * // ↑ [ 2, 4 ]
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterTo(destination, predicate, thisArg))

    }


    /**
     * Appends all elements not matching the given ```predicate``` to the given destination.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const oddNumbers = new Array<number>()
     * const originalData = await koconutSet
     *                       .filterTo(
     *                           oddNumbers,
     *                           eachNumber => eachNumber % 2 == 0
     *                       )
     *                       .yield()
     * console.log(oddNumbers)
     * // ↑ [ 1, 3, 5 ]
     * console.log(originalData)
     * // ↑ Set { 1, 2, 3, 4, 5 }
     * ```
     */
    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    /**
     * Returns a {@link KoconutSet} containing only elements matching the given ```predicate``` with indexes.
     * @param predicate A callback function that accepts two arguments. The method calls the ```predicate``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(0,1,2,5,6,7)
     *
     * const numbersEqualToIndex = await koconutSet
     *       .filterIndexed((eachIndex, eachNumber) => eachIndex == eachNumber)
     *       .yield()
     * console.log(numbersEqualToIndex)
     * // ↑ Set { 0, 1, 2 }
     * ```
     */
    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterIndexed(predicate, thisArg))

    }

    
    /**
     * Appends all elements matching the given ```predicate``` with indexes to the given destination.
     * @param destination Iterable destinaion. ```Array``` or ```Set``` to be exact.
     * @param predicate A callback function that accepts two arguments. The method calls the ```predicate``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(0,1,2,5,6,7)
     *
     * const numbersEqualToIndex = new Array<number>()
     * const origianlData =await koconutSet
     *       .filterIndexedTo(
     *           numbersEqualToIndex,
     *           (eachIndex, eachNumber) => eachIndex == eachNumber
     *       )
     *       .yield()
     * console.log(numbersEqualToIndex)
     * // ↑ [ 0, 1, 2 ]
     * console.log(origianlData)
     * // ↑ Set { 0, 1, 2, 5, 6, 7 }
     * ```
     */
    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterIndexedTo(destination, predicate, thisArg))

    }


    /**
     * Returns a {@link KoconutSet} containing all elements that are not ```null```.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,null,null)
     *
     * const numbers = await koconutSet
     *               .filterNotNull()
     *               .yield()
     * console.log(numbers)
     * // ↑ Set { 1, 2 }
     * ```
     */
    filterNotNull() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNull())

    }


    /**
     * Appends all elements that are not ```null``` to the given destination.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutSet = KoconutSet.of(1,2,null,null)
     *
     * const numbers = Array<number>()
     * const originalData = await koconutSet
     *                   .filterNotNullTo(numbers)
     *                   .yield()
     * console.log(numbers)
     * // ↑ [ 1, 2 ]
     * console.log(originalData)
     * // ↑ Set { 1, 2, null }
     * ```
     */
    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNullTo(destination))

    }

















    

















    






    distinct() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.distinct())

    }

    
    distinctBy<KeyType, EuqatableKeyType extends KoconutEquatable>(
        selector : (element : DataType) => KeyType | EuqatableKeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.distinctBy(selector, thisArg))

    }


    drop(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.drop(n))

    }


    dropLast(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropLast(n))

    }


    dropLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropLastWhile(predicate, thisArg))

    }


    dropWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.dropWhile(predicate, thisArg))

    }


















    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }



    








    

    minus(
        element : DataType
    ) : KoconutSet<DataType>;
    minus(
        elements : Iterable<DataType>
    ) : KoconutSet<DataType>;
    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutSet<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutSet.fromCollection(super.minus(elements as Iterable<DataType>))
        else return KoconutSet.fromCollection(super.minus(elements as DataType))

    }


    minusElement(
        element : DataType
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.minusElement(element))

    }


    plus(
        element : DataType
    ) : KoconutSet<DataType>;
    plus(
        elements : Iterable<DataType>
    ) : KoconutSet<DataType>;
    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutSet<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutSet.fromCollection(super.plus(elements as Iterable<DataType>))
        else return KoconutSet.fromCollection(super.plus(elements as DataType))

    }


    plusElement(
        element : DataType
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.plusElement(element))

    }


    reversed() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.reversed())

    }


    shuffled() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.shuffled())

    }


    sortedBy(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedBy(selector, thisArg))

    }
    

    sortedByDescending(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedByDescending(selector, thisArg))

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.sortedWith(comparator, thisArg))

    }


    take(
        n : number
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.take(n))

    }


    takeLast(
        n : number
    ) : KoconutSet<DataType>{

        return KoconutSet.fromCollection(super.takeLast(n))

    }


    takeLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.takeLastWhile(predicate, thisArg))

    }


    takeWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.takeWhile(predicate, thisArg))

    }
}