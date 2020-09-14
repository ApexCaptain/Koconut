import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const isNumberArrayEmpty = await koconutArray
                                .isNullOrEmpty()
                                .yield()
    console.log(isNumberArrayEmpty)
    // ↑ false

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(1,2,3,4,5)

    const isFilteredNumberSetEmpty = await koconutSet
                                .filter(eachNumber => eachNumber > 10)
                                .isNullOrEmpty()
                                .yield()
    console.log(isFilteredNumberSetEmpty)
    // ↑ true

    // Case 3 -- KoconutMap
    const koconutMap = new KoconutMap<number, number>()

    const isNumberPairedMapEmpty = await koconutMap
                                        .isNullOrEmpty()
                                        .yield()
    console.log(isNumberPairedMapEmpty)
    // ↑ true

}
sampleProcess()

/*
// Case 1 -- KoconutArray
const koconutArray = KoconutArray.of("1", "2", "3", "4", "5")

const largestNumberedStringOfArray = await koconutArray
                                  .maxOfWithOrNull(
                                      parseInt,
                                      (front, rear) => front - rear
                                  )
                                  .yield()
console.log(largestNumberedStringOfArray)
// ↑ 5

const largestNumberedStringOfEmptyArray = await koconutArray
                          .filter(eachString => eachString.length > 2)
                          .maxOfWithOrNull(
                              parseInt,
                              (front, rear) => front - rear
                          )
                          .yield()
console.log(largestNumberedStringOfEmptyArray)
// ↑ null

// Case 2 -- KoconutSet
const koconutSet = KoconutSet.of("a", "ab", "abc")

const lognestStringLengthOfSet = await koconutSet
                              .maxOfWithOrNull(
                                  eachString => eachString.length,
                                  (front, rear) => front - rear
                              )
                              .yield()
console.log(lognestStringLengthOfSet)
// ↑ 3

// Case 3 -- KoconutMap
const koconutMap = KoconutArray.of("a", "ab", "abc")
                  .associate(eachString => [eachString.length, eachString])

const longestStringLengthOfMap = await koconutMap
                                  .maxOfWithOrNull(
                                      eachEntry => eachEntry.key,
                                      (front, rear) => front - rear
                                  )
                                  .yield()
console.log(longestStringLengthOfMap)
// ↑ 3

// Case 4 -- You can also do it asynchronously
const koconutArray2 = KoconutArray.of(12,51,32,45,50)

const largestNumberOfArray2 = await koconutArray2
                              .maxOfWithOrNull(
                                  async eachNumber => eachNumber,
                                  async (front, rear) => front - rear
                              )
                              .yield()
console.log(largestNumberOfArray2)
// ↑ 51

const largest1sDigitOfArray2 = await koconutArray2
                              .maxOfWithOrNull(
                                  (eachNumber) => new Promise<number>(resolve => {
                                      resolve(eachNumber % 10)
                                  }),
                                  (front, rear) => new Promise(resolve => {
                                      resolve(front - rear)
                                  })
                              )
                              .yield()
console.log(largest1sDigitOfArray2)
// ↑ 5
*/