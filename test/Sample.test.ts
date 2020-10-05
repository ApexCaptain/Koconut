// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    const seq = new KoconutSequence(new Sequence([1,2,3,4,5,6,7,8,9,10]))

    const rst1 = seq
        .filter(eachNumber => eachNumber % 2 == 0)

    const rst2 = rst1.filter(eachNumber => eachNumber > 6)


    console.log((await rst1.yield()).dataArray)
    console.log((await rst2.yield()).dataArray)

}
sampleProcess()
