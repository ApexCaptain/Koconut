
import { Koconut } from "../index"
import { KoconutPair } from "../src/KoconutBase";


export async function runTsExample() {

    var rst = await Koconut.Array([1,2,3,3,3,2])
                            .union(new Set([2,2,2,3]))
                            .let(it => {
                                console.log(it)
                            })
                                
}
