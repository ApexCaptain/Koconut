// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {


    const rst =  new KoconutSequence(new Sequence([1,2,3,4,5,6,7,8,9,10]))
                        
    const b = rst.filter(eachNumber => eachNumber % 2 == 0)
                    .filter(eachNumber => eachNumber % 2 == 0)
                    .asArray()

    console.log(b)
    console.log(await rst.asArray().yield())
    console.log(b)
    console.log(await b.yield())
}
sampleProcess()
