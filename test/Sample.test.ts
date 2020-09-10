import {
    KoconutArray, KoconutSet, KoconutLoopSignal,
    KoconutLocale, KoconutOption, KoconutDeprecation
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    KoconutOption.locale = KoconutLocale["en-GB"]
    KoconutArray.of(1,2,3).maxBy(e => e)
    
    KoconutOption.locale = KoconutLocale.ja
    KoconutArray.of(1,2,3).maxBy(e => e)

    KoconutOption.locale = KoconutLocale.ko
    KoconutArray.of(1,2,3).maxBy(e => e)


}
sampleProcess()