`use strict`

import {
    /* Base */
    Pair, KoconutPair, Entry, KoconutEntry,

    /* Container */
    KoconutCollection,

    /* Enum */
    KoconutLoopSignal,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../../module.internal"

export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {
    
    // Private
    private static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Array<DataType>>
    ) : KoconutArray<DataType> {

        const koconutToReturn = new KoconutArray<DataType>(collection['data']);
        koconutToReturn.processor = collection['processor'];
        koconutToReturn.prevYieldable = collection['prevYieldable']
        return koconutToReturn;

    }
    

















    
    // Koconut Primitive
    /**
     * Creates a new instance from ```iterable``` object.
     * @param array An array-like ```iterable``` object to convert to a {@link KoconutArray}.
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * const numbers = Array.of(1,2,3,4,5)
     * const koconutNumbers = new KoconutArray(numbers)
     * // ↑ This is a Koconut number array consists of 1 to 5.
     * 
     * const emptyNumberArray = new KoconutArray<number>()
     * // ↑ This is an empty Koconut number array.
     * ```
     */
    constructor(array : Iterable<DataType> | null = null) {
        super()
        this.data = array == null ? new Array() : Array.from(array)
    }


















    
    // Creator
    /**
     * Creates a new instance from ```iterable``` object.
     * @param source An array-like ```iterable``` object to convert to a {@link KoconutArray}.
     * 
     * @category Creator
     * 
     * @since 1.0.11
     * 
     * @example
     * ```typescript
     * const numbers = Array.of(1,2,3,4,5)
     * const koconutNumbers = KoconutArray.from(numbers)
     * // ↑ This is a Koconut number array consists of 1 to 5.
     * 
     * const emptyNumberArray = KoconutArray.from<number>()
     * // ↑ This is an empty Koconut number array.
     * ```
     */
    static from<DataType>(
        source : Iterable<DataType> | null = null
    ) : KoconutArray<DataType> {

        return new KoconutArray(source == null ? null : Array.from(source))

    }

    /**
     * Creates a new instance from variable number of arguments.
     * @param data A set of elements to include in the new {@link KoconutArray} object.
     * 
     * @category Creator
     * 
     * @since 1.0.11
     * 
     * @example
     * ```typescript
     * const koconutNumbers = KoconutArray.of(1,2,3,4,5)
     * // ↑ This is a Koconut number array consists of 1 to 5.
     * 
     * const emptyNumberArray = KoconutArray.of<number>()
     * // ↑ This is an empty Koconut number array.
     * ```
     */
    static of<DataType>(
        ...data : DataType[]
    ) : KoconutArray<DataType> {

        return new KoconutArray(data)

    }
    



















    





    // Iterator
    /**
     * Perfroms the given ```action``` on each element and returns the original collection itself afterwards.
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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const array = await koconutArray
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
     * console.log(array)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEach(action, thisArg))

    }


    /**
     * Performs the given ```action``` on each element, providing sequential index with the element, and returns the collection itself afterwards.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Iterator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const array = await koconutArray
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
     * console.log(array)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEachIndexed(action, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledKeyMap = new Map<number, number>()
     * const stringKeyDoubledValueMap = new Map<string ,number>()
     * const doubledKeySquaredValueMap = new Map<number, number>()
     * const originalData = await koconutArray
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
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))
        
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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledValueMap = new Map<number, number>()
     * const doubledKeyMap = new Map<number, number>()
     * const squaredValueMap = new Map<number, number>()
     * const originalData = await koconutArray
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
     * // ↑ [ 1, 2, 3, 4, 5 ]
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
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateTo(destination, transform, thisArg))

    }


    /**
     * Populates the given ```destination``` map with entries for each element of the
     * given collection, where key is the element itslef and value is provided by ```valueSelector``` function
     * applied to that key.
     * @param destination Iterable destinaion. ```Map``` to be exact.
     * @param valueSelector A callback function that accepts an argument. The method calls the ```valueSelector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```valueSelector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @note This method has different functionality with Kotlin. It'll return the original collection instance.
     * 
     * @since 1.0.10
     * 
     * @category Transformer
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledValueMap = new Map<number, number>()
     * const stringifiedValueMap = new Map<number, string>()
     * const squaredValueMap = new Map<number, number>()
     * const originalData = await koconutArray
     *                   .associateWithTo(
     *                       doubledValueMap,
     *                       eachNumber => eachNumber * 2
     *                   )
     *                   .associateWithTo(
     *                       stringifiedValueMap,
     *                       async eachNumber => eachNumber.toString()
     *                   )
     *                   .associateWithTo(
     *                       squaredValueMap,
     *                       eachNumber => new Promise(resolve => {
     *                           resolve(eachNumber * eachNumber)
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
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    associateWithTo<ValueType>(
        destination : Map<DataType, ValueType>,
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))
        
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
     * const koconutArray = KoconutArray.of("123", "456")
     *
     * const allNumbersInArray = new Array<number>()
     * await koconutArray
     *       .flatMapTo(
     *           allNumbersInArray,
     *           (eachString) => eachString
     *                   .split('')
     *                   .map(eachCharacter => parseInt(eachCharacter))
     *       )
     *       .process()
     * console.log(allNumbersInArray)
     * // ↑ [ 1, 2, 3, 4, 5, 6 ]
     * ```
     */
    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapTo(destination, transform, thisArg))
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
     * const koconutArray = KoconutArray.of("123", "456")
     *
     * const allIndexAndNumbersInArray = new Array<number>()
     * await koconutArray
     *       .flatMapIndexedTo(
     *           allIndexAndNumbersInArray,
     *           (eachIndex, eachElement) => [
     *               eachIndex,
     *               ...eachElement
     *                   .split('')
     *                   .map(eachCharacter => parseInt(eachCharacter))
     *           ]
     *       )
     *       .process()
     * console.log(allIndexAndNumbersInArray)
     * // ↑ [ 0, 1, 2, 3, 1, 4, 5, 6 ]
     * ```
     */
    flatMapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapIndexedTo(destination, transform, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const doubledNumbers = new Array<number>()
     * const originalData = await koconutArray
     *                   .mapTo(
     *                       doubledNumbers,
     *                       eachNumber => eachNumber * 2
     *                   )
     *                   .yield()
     * console.log(doubledNumbers)
     * // ↑ [ 2, 4, 6, 8, 10 ]
     * console.log(originalData)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapTo(destination, transform, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const squaredOddNumbers = new Array<number>()
     * const origianlData = await koconutArray
     *                   .mapNotNullTo(
     *                       squaredOddNumbers,
     *                       eachNumber => {
     *                           if(eachNumber % 2 == 1)
     *                               return eachNumber * eachNumber
     *                           // return
     *                           // return null
     *                           // return undefined
     *                           // ↑ You can use any one of
     *                           //   them or just omit it.
     *                       }
     *                   )
     *                   .yield()
     * console.log(squaredOddNumbers)
     * // ↑ [ 1, 9, 25 ]
     * console.log(origianlData)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbers = new Array<number>()
     * const originalData = await koconutArray
     *                   .mapIndexedTo(
     *                       sumsOfIndexesAndNumbers,
     *                       (eachIndex, eachNumber) => eachIndex + eachNumber
     *                   )
     *                   .yield()
     * console.log(sumsOfIndexesAndNumbers)
     * // ↑ [ 1, 3, 5, 7, 9 ]
     * console.log(originalData)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapIndexedTo(destination, transform, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const sumsOfIndexesAndNumbersWhereNumberIsEvent = new Array<number>()
     * const prodcutsOfIndexesAndNumbersWhereIndexIsOdd = new Set<number>()
     * const squaredNumbersWhereIndexLessThan3 = new Array<number>()
     * const origianlData = await koconutArray
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
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg))

    }
    
    



















    
    // Manipulator
    /**
     * Returns a {@link KoconutArray} containing only distinct elements from this collection.
     * If the type of data is a simple number or string, the method will check equality by using '==' operator, but if it's not,
     * you'd better make your custom class inherits {@link KoconutEquatable}.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const numberKoconutArray = KoconutArray.of(1,1,2,2,3,3)
     *
     * const distinctNumbers = await numberKoconutArray
     *                               .distinct()
     *                               .yield()
     * console.log(distinctNumbers)
     * // ↑ [ 1, 2, 3 ]
     *
     * class SomeInfo {
     *   info : string
     *   constructor(info : string) {
     *       this.info = info
     *   }
     * }
     * const someInfoKoconutArray = KoconutArray.of(
     *   new SomeInfo("A"),
     *   new SomeInfo("A"),
     *   new SomeInfo("B"),
     *   new SomeInfo("B"),
     *   new SomeInfo("C"),
     *   new SomeInfo("C"),
     * )
     * const distinctSomeInfos = await someInfoKoconutArray
     *                           .distinct()
     *                           .yield()
     * console.log(distinctSomeInfos)
     * // ↑ [
     * //        SomeInfo { info: 'A' },
     * //        SomeInfo { info: 'A' },
     * //        SomeInfo { info: 'B' },
     * //        SomeInfo { info: 'B' },
     * //        SomeInfo { info: 'C' },
     * //        SomeInfo { info: 'C' }
     * //   ]
     *
     * class SomeEquatableInfo implements KoconutEquatable {
     *   info : string
     *   constructor(info : string) {
     *       this.info = info
     *   }
     *   equalsTo(other : SomeEquatableInfo) : boolean {
     *       return this.info == other.info
     *   }
     * }
     * const someEquatableInfoKoconutArray = KoconutArray.of(
     *   new SomeEquatableInfo("A"),
     *   new SomeEquatableInfo("A"),
     *   new SomeEquatableInfo("B"),
     *   new SomeEquatableInfo("B"),
     *   new SomeEquatableInfo("C"),
     *   new SomeEquatableInfo("C")
     * )
     * const distinctSomeEquatableInfos = await someEquatableInfoKoconutArray
     *                                   .distinct()
     *                                   .yield()
     * console.log(distinctSomeEquatableInfos)
     * // ↑ [
     * //        SomeEquatableInfo { info: 'A' },
     * //        SomeEquatableInfo { info: 'B' },
     * //        SomeEquatableInfo { info: 'C' }
     * //   ]
     * ```
     */
    distinct() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinct())

    }


    distinctBy<KeyType, EquatableKeyType extends KoconutEquatable>(
        selector : (element : DataType) => KeyType | EquatableKeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinctBy(selector, thisArg))

    }
    /**
     * Returns a {@link KoconutArray} containing only elements matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const evenNumbers = await koconutArray
     *                       .filter(eachNumber => eachNumber % 2 == 0)
     *                       .yield()
     * console.log(evenNumbers)
     * // ↑ [ 2, 4 ]
     * ```
     */
    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filter(predicate, thisArg))

    }

    /**
     * Returns a {@link KoconutArray} containing only elements not matching the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const oddNumbers = await koconutArray
     *                       .filterNot(eachNumber => eachNumber % 2 == 0)
     *                       .yield()
     * console.log(oddNumbers)
     * // ↑ [ 1, 3, 5 ]
     * ```
     */
    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNot(predicate, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const evenNumbers = new Array<number>()
     * const originalData = await koconutArray
     *                       .filterTo(
     *                           evenNumbers,
     *                           eachNumber => eachNumber % 2 == 0
     *                       )
     *                       .yield()
     * console.log(evenNumbers)
     * // ↑ [ 2, 4 ]
     * console.log(originalData)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterTo(destination, predicate, thisArg))

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
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const oddNumbers = new Array<number>()
     * const originalData = await koconutArray
     *                       .filterNotTo(
     *                           oddNumbers,
     *                           eachNumber => eachNumber % 2 == 0
     *                       )
     *                       .yield()
     * console.log(oddNumbers)
     * // ↑ [ 1, 3, 5 ]
     * console.log(originalData)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     * ```
     */
    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    /**
     * Returns a {@link KoconutArray} containing only elements matching the given ```predicate``` with indexes.
     * @param predicate A callback function that accepts two arguments. The method calls the ```predicate``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(0,1,2,5,6,7)
     *
     * const numbersEqualToIndex = await koconutArray
     *       .filterIndexed((eachIndex, eachNumber) => eachIndex == eachNumber)
     *       .yield()
     * console.log(numbersEqualToIndex)
     * // ↑ [ 0, 1, 2 ]
     * ```
     */
    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterIndexed(predicate, thisArg))

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
     * const koconutArray = KoconutArray.of(0,1,2,5,6,7)
     *
     * const numbersEqualToIndex = new Array<number>()
     * const origianlData =await koconutArray
     *       .filterIndexedTo(
     *           numbersEqualToIndex,
     *           (eachIndex, eachNumber) => eachIndex == eachNumber
     *       )
     *       .yield()
     * console.log(numbersEqualToIndex)
     * // ↑ [ 0, 1, 2 ]
     * console.log(origianlData)
     * // ↑ [ 0, 1, 2, 5, 6, 7 ]
     * ```
     */
    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterIndexedTo(destination, predicate, thisArg))

    }


    /**
     * Returns a {@link KoconutArray} containing all elements that are not ```null```.
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(1,2,null,null)
     *
     * const numbers = await koconutArray
     *               .filterNotNull()
     *               .yield()
     * console.log(numbers)
     * // ↑ [ 1, 2 ]
     * ```
     */
    filterNotNull() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNull())

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
     * const koconutArray = KoconutArray.of(1,2,null,null)
     *
     * const numbers = Array<number>()
     * const originalData = await koconutArray
     *                   .filterNotNullTo(numbers)
     *                   .yield()
     * console.log(numbers)
     * // ↑ [ 1, 2 ]
     * console.log(originalData)
     * // ↑ [ 1, 2, null, null ]
     * ```
     */
    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNullTo(destination))

    }


    /**
     * Returns a {@link KoconutArray} of all elements sorted according to natural sort order
     * of the value returned by specified ```selector``` function. It could be either a ```number```, ```string```, or custom class
     * that inherits {@link KoconutComparable}.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value 
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const stringKoconutArray = KoconutArray.of("abcd", "ab", "a", "abc")
     *
     * const sortedStringByItsLength = await stringKoconutArray
     *                                   .sortedBy(eachString => eachString.length)
     *                                   .yield()
     * console.log(sortedStringByItsLength)
     * // ↑ [ 'a', 'ab', 'abc', 'abcd' ]
     *
     * class Person implements KoconutComparable {
     *   name : string
     *   age : number
     *   constructor(name : string, age : number) {
     *       this.name = name
     *       this.age = age
     *   }
     *   compareTo(other : Person) : number {
     *       return this.name.length - other.name.length
     *   }
     * }
     * const personKoconutArray = KoconutArray.of(
     *   new Person("Keanu Reeves", 56),
     *   new Person("Robert Downey Jr.", 55),
     *   new Person("Christian Bale", 46)
     * )
     *
     * // You can do it by async function.
     * const sortedPeopleByWhoseAge = await personKoconutArray
     *                                   .sortedBy(async eachPerson => eachPerson.age)
     *                                   .yield()
     * console.log(sortedPeopleByWhoseAge)
     * // ↑ [
     * //        Person { name: 'Christian Bale', age: 46 },
     * //        Person { name: 'Robert Downey Jr.', age: 55 },
     * //        Person { name: 'Keanu Reeves', age: 56 }
     * //   ]
     *
     * // And of course, by returning Promise.
     * const sortedPeopleByWhoseName = await personKoconutArray
     *                                   .sortedBy(eachPerson => new Promise(resolve => {
     *                                       resolve(eachPerson.name)
     *                                   }))
     *                                   .yield()
     * console.log(sortedPeopleByWhoseName)
     * // ↑ [
     * //        Person { name: 'Christian Bale', age: 46 },
     * //        Person { name: 'Keanu Reeves', age: 56 },
     * //        Person { name: 'Robert Downey Jr.', age: 55 }
     * //   ]
     *
     * // The class Person itself implements KoconutComparable.
     * // So, it is a Comparable Type.
     * // If you're using JavaScript you can do something similar as following
     * // by extending KoconutComparable or simply adding method 'compareTo' to your custom class.
     * const sortedPeople = await personKoconutArray
     *                           .sortedBy(eachPerson => eachPerson)
     *                           .yield()
     * console.log(sortedPeople)
     * // ↑ [
     * //        Person { name: 'Keanu Reeves', age: 56 },
     * //        Person { name: 'Christian Bale', age: 46 },
     * //        Person { name: 'Robert Downey Jr.', age: 55 }
     * //   ]
     * ```
     */
    sortedBy(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedBy(selector, thisArg))

    }


    /**
     * Returns a {@link KoconutArray} of all elements sorted descending according to natural sort order
     * of the value returned by specified ```selector``` function. It could be either a ```number```, ```string```, or custom class
     * that inherits {@link KoconutComparable}.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value 
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const stringKoconutArray = KoconutArray.of("abcd", "ab", "a", "abc")
     *
     * const descSortedStringByItsLength = await stringKoconutArray
     *                                   .sortedByDescending(eachString => eachString.length)
     *                                   .yield()
     * console.log(descSortedStringByItsLength)
     * // ↑ [ 'abcd', 'abc', 'ab', 'a' ]
     *
     * class Person implements KoconutComparable {
     *   name : string
     *   age : number
     *   constructor(name : string, age : number) {
     *       this.name = name
     *       this.age = age
     *   }
     *   compareTo(other : Person) : number {
     *       return this.name.length - other.name.length
     *   }
     * }
     * const personKoconutArray = KoconutArray.of(
     *   new Person("Keanu Reeves", 56),
     *   new Person("Robert Downey Jr.", 55),
     *   new Person("Christian Bale", 46)
     * )
     *
     * // You can do it by async function.
     * const descSortedPeopleByWhoseAge = await personKoconutArray
     *                                   .sortedByDescending(async eachPerson => eachPerson.age)
     *                                   .yield()
     * console.log(descSortedPeopleByWhoseAge)
     * // ↑ [
     * //        Person { name: 'Keanu Reeves', age: 56 },
     * //        Person { name: 'Robert Downey Jr.', age: 55 },
     * //        Person { name: 'Christian Bale', age: 46 }
     * //   ]
     *
     * // And of course, by returning Promise.
     * const descSortedPeopleByWhoseName = await personKoconutArray
     *                                   .sortedByDescending(eachPerson => new Promise(resolve => {
     *                                       resolve(eachPerson.name)
     *                                   }))
     *                                   .yield()
     * console.log(descSortedPeopleByWhoseName)
     * // ↑ [
     * //        Person { name: 'Robert Downey Jr.', age: 55 },
     * //        Person { name: 'Keanu Reeves', age: 56 },
     * //        Person { name: 'Christian Bale', age: 46 }
     * //   ]
     *
     * // The class Person itself implements KoconutComparable.
     * // So, it is a Comparable Type.
     * // If you're using JavaScript you can do something similar as following
     * // by extending KoconutComparable or simply adding method 'compareTo' to your custom class.
     * const descSortedPeople = await personKoconutArray
     *                           .sortedByDescending(eachPerson => eachPerson)
     *                           .yield()
     * console.log(descSortedPeople)
     * // ↑ [
     * //        Person { name: 'Robert Downey Jr.', age: 55 },
     * //        Person { name: 'Christian Bale', age: 46 },
     * //        Person { name: 'Keanu Reeves', age: 56 }
     * //   ]
     * ```
     */
    sortedByDescending(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedByDescending(selector, thisArg))

    }


    /**
     * Returns a {@link KoconutArray} of all elements sorted according to the
     * specified ```comparator```.
     * @param comparator A callback function that accepts two arguements. The method calls the ```comparator``` to compare two selected values.
     * In case the result is larger than 0, front is bigger than rear, and if it's less than 0 judge vice versa.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```comparator```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value 
     * 
     * @since 1.0.10
     * 
     * @category Manipulator
     * 
     * @example
     * ```typescript
     * const koconutArray = KoconutArray.of(15, 4, 33)
     *
     * const sortedNumbers = await koconutArray
     *                       .sortedWith((front, rear) => front - rear)
     *                       .yield()
     * console.log(sortedNumbers)
     * // ↑ [ 4, 15, 33 ]
     *
     * const descSortedNumbers = await koconutArray
     *                           .sortedWith((front, rear) => rear - front)
     *                           .yield()
     * console.log(descSortedNumbers)
     * // ↑ [ 33, 15, 4 ]
     *
     * const sortedNumbersBy1sDigit = await koconutArray
     *                       .sortedWith((front, rear) => front % 10 - rear % 10)
     *                       .yield()
     * console.log(sortedNumbersBy1sDigit)
     * // ↑ [ 33, 4, 15 ]
     * ```
     */
    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedWith(comparator, thisArg))

    }





































    











    drop(
        n : number
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.drop(n))
        
    }


    dropLast(
        n : number
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropLast(n))
        
    }


    dropLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropLastWhile(predicate, thisArg))

    }


    dropWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropWhile(predicate, thisArg))

    }




















    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null  
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }













    minus(
        element : DataType
    ) : KoconutArray<DataType>;
    minus(
        elements : Iterable<DataType>
    ) : KoconutArray<DataType>;
    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.minus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.minus(elements as DataType))

    }


    minusElement(
        element : DataType
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.minusElement(element))

    }


    plus(
        element : DataType
    ) : KoconutArray<DataType>;
    plus(
        elements : Iterable<DataType>
    ) : KoconutArray<DataType>;
    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.plus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.plus(elements as DataType))

    }


    plusElement(
        element : DataType
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.plusElement(element))

    }


    reversed() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.reversed())

    }


    shuffled() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.shuffled())

    }


    take(
        n : number
    ) : KoconutArray<DataType>{

        return KoconutArray.fromCollection(super.take(n))

    }


    takeLast(
        n : number
    ) : KoconutArray<DataType>{

        return KoconutArray.fromCollection(super.takeLast(n))

    }


    takeLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.takeLastWhile(predicate, thisArg))

    }


    takeWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.takeWhile(predicate, thisArg))

    }

}