// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    
    
    const seq = new KoconutSequence(new Sequence([1,2,3,4,5,6,7,8,9,10]))

    const rst1 = seq
        .filter(eachNumber => new Promise(resolve => {
            console.log(1, eachNumber)
            setTimeout(() => {
                resolve(eachNumber % 2 == 0)
            }, 1000)
        }))

    
    const rst2 = rst1.filter(eachNumber => new Promise(resolve => {
        console.log(2, eachNumber)
        setTimeout(() => {
            resolve(eachNumber > 6)
        }, 1000)
    }))
    
    
    console.log((await rst1.yield()).dataArray)
    console.log((await rst2.yield()).dataArray)
    

    
    
    const fl = KoconutFlow.ofSimple(1,2,3,4,5)

    const f1 = fl.mapFlow(eachNumber => eachNumber * 2)
    const f2 = f1.mapFlow(eachNumber => eachNumber.toString())

    console.log((await f1.yield()).dataArray)
    console.log((await f2.yield()).dataArray)
    
    
    

}
sampleProcess()
