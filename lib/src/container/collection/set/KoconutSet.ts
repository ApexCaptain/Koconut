`use strict`

import {
    /* Base */
    Pair, KoconutPair, KoconutTypeChecker,

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



















    

















    



    associateByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Pair<KeyType, ValueType> | Promise<[KeyType, ValueType] | KoconutPair<KeyType, ValueType>>,
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


    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filter(predicate, thisArg))

    }


    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterIndexed(predicate, thisArg))

    }

    
    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterIndexedTo(destination, predicate, thisArg))

    }


    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNot(predicate, thisArg))

    }


    filterNotNull() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNull())

    }


    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotNullTo(destination))

    }


    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterNotTo(destination, predicate, thisArg))

    }


    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.filterTo(destination, predicate, thisArg))

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


    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg))

    }
    

    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapIndexedTo(destination, transform, thisArg))

    }


    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.mapTo(destination, transform, thisArg))

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


    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.onEach(action, thisArg))

    }


    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.onEachIndexed(action, thisArg))

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