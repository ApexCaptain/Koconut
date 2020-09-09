import {
    KoconutArray, KoconutSet, KoconutLoopSignal
} from "./dist/index.internal"
// https://typedoc.org/guides/doccomments/

const isEven = async (each : number) : Promise<boolean> => {
    return each % 2== 0
}

const sampleProcess = async () => {

    const arr = KoconutArray.from([1,2,3,4,5])
    const ft = await arr.filter(isEven).yield()
    console.log(ft)

}
sampleProcess()