import { KoconutArray } from "./src/collection/KoconutArray"
import { KoconutPair } from "./src/KoconutBase"
import { KoconutSet } from "./src/collection/KoconutSet"
import { KoconutString } from "./src/collection/KoconutString"

export const Koconut = {
    Array : function<DataType>(array : Array<DataType>) : KoconutArray<DataType> { return new KoconutArray(array) },
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
    Set : function<DataType>(set : Set<DataType>) : KoconutSet<DataType> { return new KoconutSet(set) },
    String : function(str : string) : KoconutString { return new KoconutString(str.split('')) }
}