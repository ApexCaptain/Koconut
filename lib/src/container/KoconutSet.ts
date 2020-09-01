`use strict`

import {
    KoconutCollection
} from "../../internal"

export class KoconutSet<DataType> extends KoconutCollection<DataType, Set<DataType>> {
 
    static from<DataType>(
        source : Iterable<DataType>
    ) : KoconutSet<DataType> {

        return new KoconutSet(new Set(source))

    }
    
}