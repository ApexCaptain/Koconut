// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {


    const rst =  await new KoconutSequence(new Sequence([1,2,3,4,5,6,7,8,9,10]))
                        .onEachIndexed(console.log)
                        .onEachIndexed(console.log)
                        .onEach(console.log)
                        .onEach(console.log)
                        
                        /*
                        .filter(eachNumber => new Promise(resolve => {
                            setTimeout(() => {
                                resolve(eachNumber % 2 == 0)
                            }, 1000)
                        }))
                        .onEach(e => {
                            if(e > 5) return KoconutLoopSignal.BREAK
                            console.log("qwe", e)
                        })
                        .onEach(console.log)
                        .maxByOrNull(e => e)
                        */
                        .asArray()
                        .yield()

    console.log("-----------------")
    console.log(rst)
    console.log("-----------------")
}
sampleProcess()
