import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const koconutNumbers = KoconutArray.of(1,2,3,4,5)

    const moreNumbers = await koconutNumbers
                            .also(result => {
                                result.push(6)
                                result.push(7)
                                result.push(8)
                            })
    console.log(moreNumbers)
    // ↑ [1, 2, 3, 4, 5, 6, 7, 8]

}
sampleProcess()