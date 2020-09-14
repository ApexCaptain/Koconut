import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")

    const smallestNumberedStringOfArray = await koconutArray
                                    .minOfWithOrNull(
                                        parseInt,
                                        (front, rear) => front - rear
                                    )
                                    .yield()
    console.log(smallestNumberedStringOfArray)
    // ↑ 1

    const smallestNumberedStringOfEmptyArray = await koconutArray
                                .filter(eachString => eachString.length > 2)
                                .minOfWithOrNull(
                                    parseInt,
                                    (front, rear) => front - rear
                                )
                                .yield()
    console.log(smallestNumberedStringOfEmptyArray)
    // ↑ null

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of("a", "ab", "abc")

    const shortestStringLengthOfSet = await koconutSet
                                .minOfWithOrNull(
                                    eachString => eachString.length,
                                    (front, rear) => front - rear
                                )
                                .yield()
    console.log(shortestStringLengthOfSet)
    // ↑ 1

    // Case 3 -- KoconutMap
    const koconutMap = KoconutArray.of("a", "ab", "abc")
                    .associate(eachString => [eachString.length, eachString])

    const shortestStringLengthOfMap = await koconutMap
                                    .minOfWithOrNull(
                                        eachEntry => eachEntry.key,
                                        (front, rear) => front - rear
                                    )
                                    .yield()
    console.log(shortestStringLengthOfMap)
    // ↑ 1

    // Case 4 -- You can also do it asynchronously
    const koconutArray2 = KoconutArray.of(12,51,32,45,50)

    const smallestNumberOfArray2 = await koconutArray2
                                .minOfWithOrNull(
                                    async eachNumber => eachNumber,
                                    async (front, rear) => front - rear
                                )
                                .yield()
    console.log(smallestNumberOfArray2)
    // ↑ 12

    const smallest1sDigitOfArray2 = await koconutArray2
                                .minOfWithOrNull(
                                    (eachNumber) => new Promise<number>(resolve => {
                                        resolve(eachNumber % 10)
                                    }),
                                    (front, rear) => new Promise(resolve => {
                                        resolve(front - rear)
                                    })
                                )
                                .yield()
    console.log(smallest1sDigitOfArray2)
    // ↑ 0

}
sampleProcess()