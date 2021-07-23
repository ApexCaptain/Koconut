// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../src/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {
    const sample = KoconutSequence.of(1,2,3,4,5)
    console.log(
        await sample.yield()
    )
}
sampleProcess()
