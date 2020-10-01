// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const firstNumberOfArray = await koconutArray
                                        .firstOrNull()
                                        .yield()
    console.log(firstNumberOfArray)
    // ↑ 1

    const firstEventNumberOfArray = await koconutArray
                                .firstOrNull(eachNumber => eachNumber % 2 == 0)
                                .yield()
    console.log(firstEventNumberOfArray)
    // ↑ 2

    const firstNumberOfEmptyArray = await koconutArray
                                    .filter(eachNumber => eachNumber > 10)
                                    .firstOrNull()
                                    .yield()
    console.log(firstNumberOfEmptyArray)
    // ↑ null

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(1,2,3,4,5)

    const firstNumberOfSet = await koconutSet
                                    .firstOrNull()
                                    .yield()
    console.log(firstNumberOfSet)
    // ↑ 1

    const firstOddNumberOfSet = await koconutSet
                                .firstOrNull(eachNumber => eachNumber % 2 == 1)
                                .yield()
    console.log(firstOddNumberOfSet)
    // ↑ 1



}
sampleProcess()
