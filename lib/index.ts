'use strict'

import { KoconutArray, KoconutSet, KoconutMap } from "./src/KoconutDataStructure" 
import { KoconutPair, IComparable, Entry } from "./src/KoconutBase"


export const Koconut = {
    Array : function<DataType>(elements : Iterable<DataType>) : KoconutArray<DataType> { return new KoconutArray(Array.from(elements))},
    Set : function<DataType>(elements : Iterable<DataType>) : KoconutSet<DataType> { return new KoconutSet(new Set(elements))},
    Map : function<KeyType, ValueType>(elements : Map<KeyType, ValueType>) : KoconutMap<KeyType, ValueType> { return new KoconutMap(elements) },
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
}

export namespace KoconutInterfaces {
    export interface Comparable extends IComparable {}
}