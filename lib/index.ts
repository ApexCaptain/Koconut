'use strict'

import { KoconutArray, KoconutString, KoconutSet } from "./src/collection/KoconutCollection" 
import { KoconutPair } from "./src/KoconutBase"


export const Koconut = {
    Array : function<DataType>(elements : Iterable<DataType>) : KoconutArray<DataType> { return new KoconutArray(Array.from(elements))},
    String : function(str : string) : KoconutString { return new KoconutString(str.split(''))},
    Set : function<DataType>(elements : Iterable<DataType>) : KoconutSet<DataType> { return new KoconutSet(new Set(elements))},
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
    //Set : function<DataType>(set : Set<DataType>) : KoconutSet<DataType> { return new KoconutSet(set) },
    //String : function(str : string) : KoconutString { return new KoconutString(str.split('')) }
}