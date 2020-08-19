'use strict'

import { KoconutCollection } from "./KoconutCollection"
import { KoconutString } from "./KoconutString";
import { KoconutPair, Pair } from "../KoconutBase";
import { KoconutSet } from "./KoconutSet";

export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {

    
    // Koconut Array
    static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Array<DataType>>) : KoconutArray<DataType> {

        const koconutToReturn = new KoconutArray<DataType>(collection.data);
        koconutToReturn.processor = collection.processor;
        koconutToReturn.prevYieldable = collection.prevYieldable
        return koconutToReturn;

    }
    

    associateByTo<KeyType, ValueType = DataType> (
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
        
    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.associateTo(destination, transform, thisArg))
    
    }


    associateWithTo<ValueType>(
        destination : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>,
        thisArg : any = null) : KoconutArray<DataType>{

        return KoconutArray.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))

    }

    
    chunked(
        size : number) : KoconutArray<Array<DataType>>;
    chunked<ReturnType>(
        size : number,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>;
    chunked<ReturnType>(
        size : number,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutArray<ReturnType>;
    chunked<ReturnType>(
        size : number,
        transform : ((elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) | null = null,
        thisArg : any = null) : KoconutArray<Array<DataType> | ReturnType> {

        if(transform) return KoconutArray.fromCollection(super.chunked(size, transform, thisArg))
        else return KoconutArray.fromCollection(super.chunked(size))
        
    }


    distinct() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinct())

    }


    distinctBy<KeyType>(
        selector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.distinctBy(selector, thisArg))

    }


    drop(
        n : number) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.drop(n))

    }


    dropWhile(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.dropWhile(predicate, thisArg))

    }


    filter(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filter(predicate, thisArg))

    }


    filterNot(
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNot(predicate, thisArg))

    }


    filterNotNull() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNull())

    }


    filterNotNullTo<DestinationType extends Array<DataType> | Set<DataType>>(
        destination : DestinationType) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotNullTo(destination))

    }


    filterNotTo<DestinationType extends Array<DataType> | Set<DataType>>(
        destincation : DestinationType,
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterNotTo(destincation, predicate, thisArg))

    }


    filterTo<DestinationType extends Array<DataType> | Set<DataType>>(
        destination : DestinationType,
        predicate : (element : DataType, index : number, source : Array<DataType>) => boolean | Promise<boolean>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.filterTo(destination, predicate, thisArg))

    }


    flatMap<ResultDataType>(
        transform : (element : DataType, index : number, source : Array<DataType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null) : KoconutArray<ResultDataType> {

        return KoconutArray.fromCollection(super.flatMap(transform, thisArg))

    }


    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => Array<ResultDataType> | Promise<Array<ResultDataType>>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.flatMapTo(destination, transform, thisArg))

    }
    

    forEach(
        action : (element : DataType, index : number, source : Array<DataType>) => KoconutCollection.LOOP_SIGNAL | void | Promise<KoconutCollection.LOOP_SIGNAL | void>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.forEach(action, thisArg))

    }


    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType, index : number, source : Array<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Array<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    intersect(
        other : Iterable<DataType>) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.intersect(other))

    }


    join(
        separator : string = ", ",
        prefix :string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType, index : number, source : Array<DataType>) => string | Promise<string>) | null = null,
        thisArg : any = null
    ) : KoconutString {
    
        return KoconutString.fromCollection(super.join(separator, prefix, postfix, limit, truncated, transform, thisArg))

    }

    
    map<ResultDataType>(
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutArray<ResultDataType> {
        return KoconutArray.fromCollection(super.map(transform, thisArg))

    }


    mapNotNull<ResultDataType>(
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | null | Promise<ResultDataType | null>,
        thisArg : any = null) : KoconutArray<ResultDataType> {

        return KoconutArray.fromCollection(super.mapNotNull(transform, thisArg))

    }
    

    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapNotNullTo(destination, transform, thisArg))

    }


    mapTo<ResultDataType>(
        destination : Array<ResultDataType>,
        transform : (element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.mapTo(destination, transform, thisArg))

    }


    minus(
        element : DataType) : KoconutArray<DataType>;
    minus(
        elements : Iterable<DataType>) : KoconutArray<DataType>;
    minus(
        elements : DataType | Iterable<DataType>) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.minus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.minus(elements as DataType))

    }


    minusElement(
        element : DataType) : KoconutArray<DataType> {
     
        return KoconutArray.fromCollection(super.minusElement(element))
            
    }


    onEach(
        action : (element : DataType, index : number, source : Array<DataType>) => void | Promise<void>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.onEach(action, thisArg))

    }


    plus(
        element : DataType) : KoconutArray<DataType>;
    plus(
        elements : Iterable<DataType>) : KoconutArray<DataType>;
    plus(
        elements : DataType | Iterable<DataType>) : KoconutArray<DataType> {

        if(typeof (elements as any)[Symbol.iterator] === 'function') return KoconutArray.fromCollection(super.plus(elements as Iterable<DataType>))
        else return KoconutArray.fromCollection(super.plus(elements as DataType))

    }


    plusElement(
        element : DataType) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.plusElement(element))

    }


    requireNoNulls() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.requireNoNulls())

    }


    reversed() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.reversed())

    }


    scan<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType, index : number, source : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null) : KoconutArray<ResultDataType> {

        return KoconutArray.fromCollection(super.scan(initial, operation, thisArg))

    }


    shuffled() : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.shuffled())

    }


    sortedBy<ComparableType>(
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedBy(selector, thisArg))

    }


    sortedByDescending<ComparableType>(
        selector : (element : DataType, index : number, source : Array<DataType>) => ComparableType | Promise<ComparableType>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedByDescending(selector, thisArg))

    }


    sortedWith(
        comparator : (front : DataType, rear : DataType, frontIndex : number, rearIndex : number, source : Array<DataType>) => number | Promise<number>,
        thisArg : any = null) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.sortedWith(comparator, thisArg))
            
    }


    substract(
        other : Iterable<DataType>) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.substract(other))

    }


    taken(
        n : number) : KoconutArray<DataType> {

        return KoconutArray.fromCollection(super.taken(n))

    }


    toSet() : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.toSet())

    }


    union(
        other : Iterable<DataType>) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.union(other))

    }


    windowed(
        size : number) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number,
        partialWindows : boolean) : KoconutArray<Array<DataType>>;
    windowed<ReturnType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>;
    windowed<ReturnType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutArray<ReturnType>;
    windowed<ReturnType>(
        size : number,
        step : number = 1,
        partialWindows : boolean = false,
        transform : ((elements : Array<DataType>, index : number, source : Array<Array<DataType>>) => ReturnType | Promise<ReturnType>) | null = null,
        thisArg : any = null) : KoconutArray<Array<DataType> | ReturnType> {

        if(transform == null) return KoconutArray.fromCollection(super.windowed(size, step, partialWindows))
        else return KoconutArray.fromCollection(super.windowed(size, step, partialWindows, transform, thisArg))

    }


    zip<OtherDataType>(
        other : Iterable<OtherDataType>) : KoconutArray<Pair<DataType, OtherDataType>>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : ((originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null) : KoconutArray<Pair<DataType, OtherDataType> | ResultDataType> {

        if(transform == null) return KoconutArray.fromCollection(super.zip(other))
        else return KoconutArray.fromCollection(super.zip(other, transform, thisArg))

    }


    zipWithNext() : KoconutArray<Pair<DataType, DataType>>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : ((firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null) : KoconutArray<Pair<DataType, DataType> | ResultDataType> {

        if(transform == null) return KoconutArray.fromCollection(super.zipWithNext())
        else return KoconutArray.fromCollection(super.zipWithNext(transform, thisArg))

    }
    



}