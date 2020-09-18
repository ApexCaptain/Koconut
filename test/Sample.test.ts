// ↑

import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry, KoconutEquatable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const numberKoconutSet = KoconutSet.of(1,1,2,2,3,3)

    const distinctNumbers = await numberKoconutSet
                                    .distinct()
                                    .yield()
    console.log(distinctNumbers)
    // ↑ Set { 1, 2, 3 }

    class SomeInfo {
        info : string
        constructor(info : string) {
            this.info = info
        }
    }
    const someInfoKoconutSet = KoconutSet.of(
        new SomeInfo("A"),
        new SomeInfo("A"),
        new SomeInfo("B"),
        new SomeInfo("B"),
        new SomeInfo("C"),
        new SomeInfo("C"),
    )
    const distinctSomeInfos = await someInfoKoconutSet
                                .distinct()
                                .yield()
    console.log(distinctSomeInfos)
    // ↑ Set {
    //        SomeInfo { info: 'A' },
    //        SomeInfo { info: 'A' },
    //        SomeInfo { info: 'B' },
    //        SomeInfo { info: 'B' },
    //        SomeInfo { info: 'C' },
    //        SomeInfo { info: 'C' }
    //       }

    class SomeEquatableInfo implements KoconutEquatable {
        info : string
        constructor(info : string) {
            this.info = info
        }
        equalsTo(other : SomeEquatableInfo) : boolean {
            return this.info == other.info
        }
    }
    const someEquatableInfoKoconutSet = KoconutSet.of(
        new SomeEquatableInfo("A"),
        new SomeEquatableInfo("A"),
        new SomeEquatableInfo("B"),
        new SomeEquatableInfo("B"),
        new SomeEquatableInfo("C"),
        new SomeEquatableInfo("C")
    )
    const distinctSomeEquatableInfos = await someEquatableInfoKoconutSet
                                        .distinct()
                                        .yield()
    console.log(distinctSomeEquatableInfos)
    // ↑ Set {
    //        SomeEquatableInfo { info: 'A' },
    //        SomeEquatableInfo { info: 'B' },
    //        SomeEquatableInfo { info: 'C' }
    //       }


}
sampleProcess()
