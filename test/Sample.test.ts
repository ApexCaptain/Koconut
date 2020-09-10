import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const dobuledNumbers = await koconutArray
                                .map(eachNumber => eachNumber * 2)
                                .yield()
    console.log(dobuledNumbers)

    const numberStrings = await koconutArray
                                .map(eachNumber => eachNumber.toString())
                                .yield()
    console.log(numberStrings)

}
sampleProcess()