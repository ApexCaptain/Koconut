`use strict`

import {
    /* Base */
    Pair, KoconutPair,

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




















    





    // Transformer
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






































    





    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))
        
    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Pair<KeyType, ValueType> | Promise<[KeyType, ValueType] | KoconutPair<KeyType, ValueType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateTo(destination, transform, thisArg))

    }


    associateWithTo<ValueType>(
        destination : Map<DataType, ValueType>,
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))
        
    }


    distinct() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinct())

    }


    distinctBy<KeyType, EquatableKeyType extends KoconutEquatable>(
        selector : (element : DataType) => KeyType | EquatableKeyType | Promise<KeyType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinctBy(selector, thisArg))

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


    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filter(predicate, thisArg))

    }


    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterIndexed(predicate, thisArg))

    }


    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterIndexedTo(destination, predicate, thisArg))

    }


    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNot(predicate, thisArg))

    }


    filterNotNull() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNull())

    }


    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNullTo(destination))

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterTo(destination, predicate, thisArg))

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


    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg))

    }


    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapIndexedTo(destination, transform, thisArg))

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapTo(destination, transform, thisArg))

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


    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEach(action, thisArg))

    }


    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEachIndexed(action, thisArg))

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


    sortedBy(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedBy(selector, thisArg))

    }


    sortedByDescending(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedByDescending(selector, thisArg))

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedWith(comparator, thisArg))

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