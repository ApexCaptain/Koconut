'use strict'

import { KoconutCollection } from "./KoconutCollection"
import { KoconutString } from "./KoconutString"
import { KoconutPair, Pair } from "../KoconutBase"
import { KoconutArray } from "./KoconutArray"

export class KoconutSet<DataType> extends KoconutCollection<DataType, Set<DataType>> {

    static fromCollection<DataType>(
        collection : KoconutCollection<DataType, Set<DataType>>) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>(collection.data)
        koconutToReturn.processor = collection.processor
        koconutToReturn.prevYieldable = collection.prevYieldable
        return koconutToReturn

    }


    associateByTo<KeyType, ValueType = DataType> (
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType, index : number, source : Set<DataType>) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType, index : number, source : Set<DataType>) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null ) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg))

    }


    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType, index : number, source : Set<DataType>) => KoconutPair<KeyType, ValueType> | Promise<KoconutPair<KeyType, ValueType>>,
        thisArg : any = null) : KoconutSet<DataType> {
     
        return KoconutSet.fromCollection(super.associateTo(destination, transform, thisArg))
            
    }


    associateWithTo<ValueType>(
        destination : Map<number, ValueType>,
        valueSelector : (element : DataType, index : number, source : Set<DataType>) => ValueType | Promise<ValueType>,
        thisArg : any = null) : KoconutSet<DataType> {

        return KoconutSet.fromCollection(super.associateWithTo(destination, valueSelector, thisArg))

    }


    /*
    chunked(
        size : number) : KoconutArray<Set<DataType>>;
    chunked<ReturnType>(
        size : number,
        transform : (elements : Set<DataType>, index : number, source : Array<Set<DataType>>) => ReturnType | Promise<ReturnType>) : KoconutArray<ReturnType>
    chunked<ReturnType>(
        size : number,
        transform : (elements : Set<DataType>, index : number, source : Array<Set<DataType>>) => ReturnType | Promise<ReturnType>,
        thisArg : any) : KoconutArray<ReturnType>;
    chunked<ReturnType>(
        size : number,
        transform : ((elements : Set<DataType>, index : number, source : Array<Set<DataType>>) => ReturnType | Promise<ReturnType>) | null = null,
        thisArg : any = null) : KoconutArray<Set<DataType> | ReturnType> {

        if(transform) return KoconutArray.fromCollection(super.chunked(size, transform, thisArg))
        else return KoconutArray.fromCollection(super.chunked(size))

    }*/




}