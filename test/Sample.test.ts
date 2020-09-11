import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {
    const koconutArray = KoconutArray.of(1,2,3,4,5)

    KoconutOption.locale = KoconutLocale.en
    await koconutArray.maxBy(e => e).yield()
    KoconutOption.locale = KoconutLocale.ja
    await koconutArray.maxBy(e => e).yield()
    KoconutOption.locale = KoconutLocale.ko
    await koconutArray.maxBy(e => e).yield()

}
sampleProcess()