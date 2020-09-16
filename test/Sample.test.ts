import { resolve } from "path"
import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const koconutSet = KoconutSet.of("123", "456")

    const allIndexAndNumbersInSet= new Array<number>()
    await koconutSet
          .flatMapIndexedTo(
              allIndexAndNumbersInSet,
              (eachIndex, eachElement) => [
                  eachIndex,
                  ...eachElement
                      .split('')
                      .map(eachCharacter => parseInt(eachCharacter))
              ]
          )
          .process()
    console.log(allIndexAndNumbersInSet)
    // ↑ [ 0, 1, 2, 3, 1, 4, 5, 6 ]

}
sampleProcess()