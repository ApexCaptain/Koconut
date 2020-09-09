import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    KoconutArray.of(1,2,3,4,5)
        .onEachIndexed((i, e) => {
            if(e > 2) return KoconutLoopSignal.BREAK
            console.log(e)
        })
        .process()

}
sampleProcess()