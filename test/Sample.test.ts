import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const map = await KoconutMap.from<number, number>(
    ).yield()

    console.log(map)
}
sampleProcess()