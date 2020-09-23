// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow, KoconutBoolean,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'


const sampleProcess = async () => {


    const kbt = new KoconutBoolean(true)
    const kbf = new KoconutBoolean(false)

    const rst = await kbt.xor(kbf).yield()
    console.log(rst)


}
sampleProcess()
