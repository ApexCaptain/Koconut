'use strict'

import { KoconutArray, KoconutSet } from "./src/collection/KoconutCollection" 
import { KoconutPair, IComparable } from "./src/KoconutBase"


export const Koconut = {
    Array : function<DataType>(elements : Iterable<DataType>) : KoconutArray<DataType> { return new KoconutArray(Array.from(elements))},
    Set : function<DataType>(elements : Iterable<DataType>) : KoconutSet<DataType> { return new KoconutSet(new Set(elements))},
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
}
/*
export namespace Koconut {
    export function array <DataType> (elements : Iterable<DataType>) : KoconutArray<DataType> { return new KoconutArray(Array.from(elements)) }
    export function set <DataType> (elements : Iterable<DataType>) : KoconutSet<DataType> { return new KoconutSet(new Set(elements))}
    export function pair <FirstType, SecondType> (first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) }
}
*/

export namespace KoconutInterfaces {
    export interface Comparable extends IComparable {}
}