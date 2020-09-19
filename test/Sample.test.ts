// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const koconutArray = KoconutArray.of(
        1,2,3,4,5,6,7,8,9,10
    )

    const last3ElementsOfArray = await koconutArray
                                    .takeLast(3)
                                    .yield()
    console.log(last3ElementsOfArray)
    // ↑ [ 8, 9, 10 ]



    
}
sampleProcess()