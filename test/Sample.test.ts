// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    const koconutSet = KoconutSet.of(
        1,2,3,4,5,6,7,8,9,10
    )

    const lastNumbersWhileGreaterThan7 = await koconutSet
                        .takeLastWhile(eachNumber => eachNumber >7)
                        .yield()
    console.log(lastNumbersWhileGreaterThan7)
    // ↑ Set { 8, 9, 10 }

}
sampleProcess()

/*
val chars = ('a'..'z').toList()
println(chars.take(3)) // [a, b, c]
println(chars.takeWhile { it < 'f' }) // [a, b, c, d, e]
println(chars.takeLast(2)) // [y, z]
println(chars.takeLastWhile { it > 'w' }) // [x, y, z]
*/