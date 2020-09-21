// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {
    
    const numberKeyStringValueMap = await KoconutMap.generate(
                                            5, i => [i, i.toString()]
                                                    // ↑ Also can be
                                                    //   new Pair(i, i.toString())
                                                    //   Pair.from([i, i.toString()])
                                                    //   new KoconutPair(i, i.toString())
                                                    //   new Entry(i, i.toString())
                                                    //   Entry.from([i, i.toString()])
                                                    //   new KoconutEntry(i, i.toString())      
                                        )
                                        .yield()
    console.log(numberKeyStringValueMap)
    // ↑ Map { 0 => '0', 1 => '1', 2 => '2', 3 => '3', 4 => '4' }

}