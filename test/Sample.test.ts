// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {

    const tr = new KoconutBoolean(true)
    const fl = new KoconutBoolean(true)

    console.log(await tr.compareTo(fl).yield())
    

}
sampleProcess()
