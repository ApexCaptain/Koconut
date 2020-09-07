import {
    Entry, KoconutArray, KoconutEquatable, Pair
} from "./dist/index"
// https://typedoc.org/guides/doccomments/



// Case 1 -- All values are simply number or string 
const myPairCase1_01 = Pair.from([10, 20])
const myPairCase1_02 = Pair.from([10, 20])
console.log(`${myPairCase1_01.equalsTo(myPairCase1_02)}`)
// ↑ true

const myPairCase1_03 = Pair.from(["Apex", "Captain"])
const myPairCase1_04 = Pair.from(["Apex", "Captain"])
console.log(`${myPairCase1_03 == myPairCase1_04}`)
// ↑ false
console.log(`${myPairCase1_03.equalsTo(myPairCase1_04)}`)
// ↑ true

// Case 2 -- First Type is indistinguishable class
class MyClass {
    private value : string
    constructor(value : string) {
        this.value = value
    }
}
const myPairCase2_01 = Pair.from([new MyClass("Apex"), "Captain"])
const myPairCase2_02 = Pair.from([new MyClass("Apex"), "Captain"])
console.log(`${myPairCase2_01.equalsTo(myPairCase2_02)}`)
// ↑ false

// Case 3 -- First Type is distinguishable class 
class MyDistinguishableClass implements KoconutEquatable {
    private value : string
    constructor(value : string) {
        this.value = value
    }
    equalsTo(other : MyDistinguishableClass) : boolean {
        return this.value == other.value
    }
}
const myPairCase3_01 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
const myPairCase3_02 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
console.log(`${myPairCase3_01.equalsTo(myPairCase3_02)}`)
// ↑ true