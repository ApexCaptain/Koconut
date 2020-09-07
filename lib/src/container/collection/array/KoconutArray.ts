`use strict`

import {
    /* Base */
    Pair, KoconutPair,

    /* Container */
    KoconutCollection,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../../module.internal"

export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {
    
    static from<DataType>(
        source : Iterable<DataType>
    ) : KoconutArray<DataType> {

        return new KoconutArray(Array.from(source))

    }

    static of<DataType>(
        ...data : DataType[]
    ) : KoconutArray<DataType> {

        return new KoconutArray(data)

    }


    private static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Array<DataType>>
    ) : KoconutArray<DataType> {

        const koconutToReturn = new KoconutArray<DataType>(collection['data']);
        koconutToReturn.processor = collection['processor'];
        koconutToReturn.prevYieldable = collection['prevYieldable']
        return koconutToReturn;

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


    flatMapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapIndexedTo(destination, transform, thisArg))

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapTo(destination, transform, thisArg))
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
        action : (element : DataType) => boolean | void | Promise<boolean| void>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEach(action, thisArg))

    }


    onEachIndexed(
        action : (index : number, element : DataType) => boolean | void | Promise<boolean | void>,
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