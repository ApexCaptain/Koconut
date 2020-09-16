import { resolve } from "path"
import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(100, 101, 102)

    const allNumbersAndIndexOfArray = await koconutArray
                                .flatMapIndexed((eachIndex, eachNumber) => 
                                    [eachIndex, eachNumber]
                                )
                                .yield()
    console.log(allNumbersAndIndexOfArray)
    // ↑ [ 0, 100, 1, 101, 2, 102 ]

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(100, 101, 102)

    const allNumbersAndIndexOfSet = await koconutSet
                                .flatMapIndexed((eachIndex, eachNumber) => 
                                    [eachIndex, eachNumber]
                                )
                                .yield()
    console.log(allNumbersAndIndexOfSet)
    // ↑ [ 0, 100, 1, 101, 2, 102 ]

    // Case 3 -- KoconutMap
    const kocountMap = KoconutSet.of(1,2,3,4,5)
                        .associate(eachNumber => 
                            [eachNumber, eachNumber * 2]    
                        )

    const allKeyValueAndIndexOfMap = await kocountMap
                                .flatMapIndexed((eachIndex, eachElement) =>
                                    [eachIndex, eachElement.key, eachElement.value]
                                )
                                .yield()
    console.log(allKeyValueAndIndexOfMap)
    // ↑ [
    //     0, 1, 2, 1, 2, 4,
    //     2, 3, 6, 3, 4, 8,
    //     4, 5, 10
    //   ]

    // Case 4 -- You can also do it asynchronously
    const koconutArray2 = KoconutArray.of(123, 987)

    const allDigitsAndIndexInArray = await koconutArray2
                            .flatMapIndexed(async (eachIndex, eachNumber) => {
                                const digits = new Array<number>()
                                while(eachNumber != 0) {
                                    digits.unshift(eachNumber % 10)
                                    eachNumber = Math.floor(eachNumber / 10)
                                }
                                return [eachIndex, ...digits]
                            })
                            .yield()
    console.log(allDigitsAndIndexInArray)
    // ↑ [
    //     0, 1, 2, 3,
    //     1, 9, 8, 7
    //   ]

    const allNumberAndIndexCharactersInArray = await koconutArray2
                .flatMapIndexed((eachInex, eachNumber) => new Promise<string>(resolve => {
                    resolve(`${eachInex}${eachNumber}`)
                }))
                .yield()
    console.log(allNumberAndIndexCharactersInArray)
    // ↑ [
    //     '0', '1', '2',
    //     '3', '1', '9',
    //     '8', '7'
    //   ]

}
sampleProcess()