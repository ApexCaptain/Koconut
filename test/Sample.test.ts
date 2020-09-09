import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation
} from "../lib/module.internal" // Same as -- from 'koconut'
import { resolve } from "path"

const sampleProcess = async () => {

  // Case 1 -- KoconutArray
const koconutArray = KoconutArray.of(1,2,3,4,5)

const largestNumberOfArray = await koconutArray
                              .maxByOrNull(eachNumber => eachNumber)
                              .yield()
console.log(largestNumberOfArray)
// ↑ 5


const largestNumberOfEmptyArray = await koconutArray
                                .filter(eachNumber => eachNumber > 10)
                                .maxByOrNull(eachNumber => eachNumber)
                                .yield()
console.log(largestNumberOfEmptyArray)
// ↑ null

// Case 2 -- KoconutSet
const koconutSet = KoconutSet.of("a", "ab", "abc")

const lognestStringOfSet = await koconutSet
                              .maxByOrNull(eachString => eachString.length)
                              .yield()
console.log(lognestStringOfSet)
// ↑ abc

// Case 3 -- KoconutMap
const koconutMap = KoconutArray.of(1, 12, 123)
                  .associateWith(eachNumber => eachNumber.toString())

const longestDigitsEntryOfMap = await koconutMap
                                      .maxByOrNull(eachEntry => eachEntry.value.length)
                                      .yield()
console.log(longestDigitsEntryOfMap)
// ↑ Entry { keyElement: 123, valueElement: '123' }

// Case 4 -- You can also do it asynchronously
const koconutArray2 = KoconutArray.of(19,27,32)

const largestNumberOfArray2 = await koconutArray2
                                  .maxByOrNull(async eachNumber => eachNumber)
                                  .yield()
console.log(largestNumberOfArray2)
// ↑ 32

const largest1sDigitNumberOfArray2 = await koconutArray2
                                      .maxByOrNull(eachNumber => new Promise(resolve => {
                                          resolve(eachNumber % 10)
                                      }))
                                      .yield()
console.log(largest1sDigitNumberOfArray2)
// ↑ 19

}
sampleProcess()
/*
// Case 1 -- KoconutArray
const koconutArray = KoconutArray.of(1,2,3,4,5)

const numberOfAllArrayElements = await koconutArray
                                      .count()
                                      .yield()
console.log(numberOfAllArrayElements)
// ↑ 5

const numberOfArrayElementsHigherThan2 = await koconutArray
                                          .count(eachNumber => eachNumber > 2)
                                          .yield()
console.log(numberOfArrayElementsHigherThan2)
// ↑ 3 -- i.e. [3, 4, 5]

// Case 2 -- KoconutSet
const koconutSet = KoconutSet.of(1,2,3,4,5)

const numberOfAllSetElements = await koconutSet
                                      .count()
                                      .yield()
console.log(numberOfAllSetElements)
// ↑ 5

const numberOfOddSetElements = await koconutSet
                                      .count(eachNumber => eachNumber % 2 == 1)
                                      .yield()
console.log(numberOfOddSetElements)
// ↑ 3 -- i.e. [1, 3, 5]

// Case 3 -- KoconutMap
const koconutMap = KoconutArray.of(1,2,3)
                  .associateWith(eachNumber => eachNumber * 2)
                  // ↑ Map { 1 => 2,
                  //         2 => 4,
                  //         3 => 6 }

const numberOfAllMapEntries = await koconutMap
                                  .count()
                                  .yield()
console.log(numberOfAllMapEntries)
// ↑ 3

const numberOfMapEntriesValueHigherThan5 = await koconutMap
                                              .count(eachEntry => eachEntry.value > 5)
                                              .yield()
console.log(numberOfMapEntriesValueHigherThan5)
// ↑ 1 -- i.e. Entry { 3, 6 }

// Case 4 -- You can also do it asynchronously
const koconutArray2 = KoconutArray.of(1,2,3,4,5)

const numberOfArrayElementsLessThan3 = await koconutArray2
                                      .count(async eachNumber => eachNumber < 3)
                                      .yield()
console.log(numberOfArrayElementsLessThan3)
// ↑ 2 -- i.e. [1, 2]

const numberOfEvenArrayElements = await koconutArray2
                                  .count(eachNumber => new Promise(resolve => {
                                      resolve(eachNumber % 2 == 0)
                                  }))
                                  .yield()
console.log(numberOfEvenArrayElements)
// ↑ 2 -- i.e. [2, 4]
*/