// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const sumOfNumberAndIndexInArray = await koconutArray
                    .foldIndexed(
                        0,
                        (index, acc, eachNumber) => index + acc + eachNumber
                    )
                    .yield()
    console.log(sumOfNumberAndIndexInArray)
    // ↑ 25

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(1,2,3,4,5)

    const multiplesOfNumberAndIndexInSet = await koconutSet
                    .foldIndexed(
                        1,
                        async (index, acc, eachNumber) => index * acc * eachNumber
                    )
                    .yield()
    console.log(multiplesOfNumberAndIndexInSet)
    // ↑ 0



}
sampleProcess()
