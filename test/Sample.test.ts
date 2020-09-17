import { EACCES } from "constants"
import { resolve } from "path"
import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const doubledValueMap = await koconutArray
                            .associateWith(eachNumber => eachNumber * 2)
                            .yield()
    console.log(doubledValueMap)
    // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(1,2,3,4,5)

    const stringifiedValueMap = await koconutSet
                            .associateWith(eachNumber => eachNumber.toString())
                            .yield()
    console.log(stringifiedValueMap)
    // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }

    // Case 3 -- You can also do it asynchronously
    const koconutArray2 = KoconutArray.of(1,2,3,4,5)

    const squaredValueMap = await koconutArray2
                        .associateWith(async eachNumber => eachNumber * 2)
                        .yield()
    console.log(squaredValueMap)
    // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }

    const trippledValueMap = await koconutArray2
                        .associateWith(eachNumber => new Promise(resolve => {
                            resolve(eachNumber * 3)
                        }))
                        .yield()
    console.log(trippledValueMap)
    // ↑ Map { 1 => 3, 2 => 6, 3 => 9, 4 => 12, 5 => 15 }

}
sampleProcess()