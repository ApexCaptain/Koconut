`use strict`

import {
    KoconutCollection
} from "../../internal"

export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {
    
    static from<DataType>(
        source : Iterable<DataType>
    ) : KoconutArray<DataType> {

        return new KoconutArray(Array.from(source))

    }

}