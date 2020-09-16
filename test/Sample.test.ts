import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    // Case 1 -- KoconutArray
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    const arrToFlow = await koconutArray
                                .asFlow()
                                .yield()
    console.log(arrToFlow.dataArray)
    // ↑ [ 1, 2, 3, 4, 5 ]

    // Case 2 -- KoconutSet
    const koconutSet = KoconutSet.of(1,1,2,2,3,3,4,4,5,5)

    const setToFlow = await koconutSet
                                .asFlow()
                                .yield()
    console.log(setToFlow.dataArray)
    // ↑ [ 1, 2, 3, 4, 5 ]

    // Case 3 -- KoconutFlow
    const koconutFlow = KoconutFlow.ofSimple(1,2,3,4,5)

    const flowToFlow = await koconutFlow
                                .asFlow()
                                .yield()
    console.log(flowToFlow.dataArray)
    // ↑ 
    // [
    //    Entry { keyElement: 0, valueElement: 1 },
    //    Entry { keyElement: 1, valueElement: 2 },
    //    Entry { keyElement: 2, valueElement: 3 },
    //    Entry { keyElement: 3, valueElement: 4 },
    //    Entry { keyElement: 4, valueElement: 5 }
    // ]

    // Case 4 -- KoconutMap
    const koconutMap = KoconutArray.of(1,2,3,4,5)
                                .associate(eachNumber => [eachNumber, eachNumber])

    const mapToFlow = await koconutMap
                                .asFlow()
                                .yield()
    console.log(mapToFlow.dataArray)
    // ↑ 
    // [
    //    Entry { keyElement: 1, valueElement: 1 },
    //    Entry { keyElement: 2, valueElement: 2 },
    //    Entry { keyElement: 3, valueElement: 3 },
    //    Entry { keyElement: 4, valueElement: 4 },
    //    Entry { keyElement: 5, valueElement: 5 }
    // ]

}
sampleProcess()
