import {
    KoconutArray, KoconutSet, KoconutLoopSignal
} from "./dist/index.internal"
// https://typedoc.org/guides/doccomments/

const sampleProcess = async () => {
    const myArray = KoconutArray.of(1,2,3,4,5,6)

    const evenNumbers = await myArray
                        .filter(eachNumber => eachNumber % 2 == 0)
                        .yield()

    console.log(evenNumbers)
    // ↑ [ 2, 4, 6 ]
}
sampleProcess()