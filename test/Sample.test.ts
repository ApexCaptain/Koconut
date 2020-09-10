import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

// Case 1 -- KoconutArray
const koconutArray = KoconutArray.of(1,7,9)

const largestRemainderNumberDividedBy5OfArray = await koconutArray
                                              .maxOfOrNull(eachNumber => eachNumber % 5)
                                              .yield()
console.log(largestRemainderNumberDividedBy5OfArray)
// ↑ 4

const largestRemainderNumberDividedBy5OfEmptyArray = await koconutArray
                                      .filter(eachNumber => eachNumber > 10)
                                      .maxOfOrNull(eachNumber => eachNumber % 5)
                                      .yield()
console.log(largestRemainderNumberDividedBy5OfEmptyArray)
// ↑ null

// Case 2 -- KoconutSet
const koconutSet = KoconutSet.of("a", "ab", "abc")

const longestStringLengthOfSet = await koconutSet
                              .maxOfOrNull(eachString => eachString.length)
                              .yield()
console.log(longestStringLengthOfSet)
// ↑ 3

class ComparableString implements KoconutComparable{
  str : string
  constructor(str : string) {
      this.str = str
  }
  // Override
  compareTo(other : ComparableString) : number {
      return this.str.length - other.str.length
  }
}
const maxComparableString = await koconutSet
                          .maxOfOrNull(eachString => new ComparableString(eachString))
                          .yield()
console.log(maxComparableString)
// ↑ ComparableString { str: 'abc' }

// Case 3 -- KoconutMap
const koconutMap = KoconutArray.of("a", "ab", "abc")
                  .associate(eachString => [eachString.length, eachString])

const longestStringLengthOfMap = await koconutMap
                                  .maxOfOrNull(eachEntry => eachEntry.key)
                                  .yield()
console.log(longestStringLengthOfMap)
// ↑ 3

// Case 4 -- You can also do it asynchronously
const koconutArray2 = KoconutArray.of(12,51,32,45,50)

const largestNumberOfArray2 = await koconutArray2
                          .maxOfOrNull(async eachNumber => eachNumber)
                          .yield()
console.log(largestNumberOfArray2)
// ↑ 51

const largest1sDigitOfArray2 = await koconutArray2
                          .maxOfOrNull(eachNumber => new Promise(resolve => {
                              resolve(eachNumber % 10)
                          }))
                          .yield()
console.log(largest1sDigitOfArray2)
// ↑ 5

}
sampleProcess()

/*

// Case 2 -- KoconutSet
const koconutSet = KoconutSet.of("a", "ab", "abc")

const lognestStringOfSet = await koconutSet
                              .maxBy(eachString => eachString.length)
                              .yield()
console.log(lognestStringOfSet)
// ↑ abc

// Case 3 -- KoconutMap
const koconutMap = KoconutArray.of(1, 12, 123)
                  .associateWith(eachNumber => eachNumber.toString())

const longestDigitsEntryOfMap = await koconutMap
                                      .maxBy(eachEntry => eachEntry.value.length)
                                      .yield()
console.log(longestDigitsEntryOfMap)
// ↑ Entry { keyElement: 123, valueElement: '123' }

// Case 4 -- You can also do it asynchronously
const koconutArray2 = KoconutArray.of(19,27,32)

const largestNumberOfArray2 = await koconutArray2
                                  .maxBy(async eachNumber => eachNumber)
                                  .yield()
console.log(largestNumberOfArray2)
// ↑ 32

const largest1sDigitNumberOfArray2 = await koconutArray2
                                      .maxBy(eachNumber => new Promise(resolve => {
                                          resolve(eachNumber % 10)
                                      }))
                                      .yield()
console.log(largest1sDigitNumberOfArray2)
// ↑ 19
*/