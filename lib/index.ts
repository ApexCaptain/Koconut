import { KoconutArray } from "./src/KoconutArray"
import { KoconutMap } from "./src/KoconutMap"
import { KoconutSet } from "./src/KoconutSet"
import { KoconutPair } from "./src/KoconutPair"

export const Koconut = {
    Array : function<DataType>(array : Array<DataType>) : KoconutArray<DataType> { return new KoconutArray(array) },
    Pair : function<FirstType, SecondType>(first : FirstType, second : SecondType) : KoconutPair<FirstType, SecondType> { return new KoconutPair(first, second) },
    Map : function<KeyType, DataType>(map : Map<KeyType, DataType>) : KoconutMap<KeyType, DataType> { return new KoconutMap(map) },
    Set : function<DataType>(set : Set<DataType>) : KoconutSet<DataType> { return new KoconutSet(set) }
}