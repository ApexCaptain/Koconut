'use strict'

import { KoconutArray, KoconutSet, KoconutMap } from "./src/KoconutDataStructure" 
import { KoconutPair, Comparable as T_Comparable, Entry as T_Entry, Pair as T_Pair } from "./src/KoconutBase"


export const Koconut = {
    Array : function<DataType>(elements : Iterable<DataType>) : KoconutArray<DataType> { return new KoconutArray(Array.from(elements))},
    Set : function<DataType>(elements : Iterable<DataType>) : KoconutSet<DataType> { return new KoconutSet(new Set(elements))},
    Map : function<KeyType, ValueType>(elements : Map<KeyType, ValueType>) : KoconutMap<KeyType, ValueType> { return new KoconutMap(elements) },
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
}

export namespace KoconutInterfaces {
    export type Comparable = T_Comparable
    
}

export namespace KoconutBases {
    export type Pair<FirstType, SecondType> = T_Pair<FirstType, SecondType>
    export type Entry<KeyType, ValueType> = T_Entry<KeyType, ValueType>
}
