`use strict`

import { KoconutYieldable } from "../../internal"

export interface KoconutOpener<DataType> {
    setPrevYieldable(prevYieldable : KoconutYieldable<any>) : KoconutOpener<DataType>
    setProcessor(processor : () => Promise<DataType> | DataType) : KoconutOpener<DataType>
}