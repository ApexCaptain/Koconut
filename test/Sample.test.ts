import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutSequence, Sequence,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'
import { EventEmitter } from "events"

const sampleProcess = async () => {
    const rst = await new KoconutSequence(new Sequence([1,2]))
        .onEach(element => new Promise(resolve => {
            setTimeout(() => {
                console.log(`1 -- ${element}`)
                resolve()
            }, element * 1000)
        }))
        .onEach(element => new Promise(resolve => {
            setTimeout(() => {
                console.log(`2 -- ${element}`)
                resolve()
            }, element * 1000)
        }))
        .onEach(element => new Promise(resolve => {
            setTimeout(() => {
                console.log(`3 -- ${element}`)
                resolve()
            }, element * 1000)
        }))
        .yield()
    console.log(rst.dataArray)
}
sampleProcess()
