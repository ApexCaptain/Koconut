
import { Koconut } from "../index"
import { KoconutPair } from "../src/KoconutBase";


export async function runTsExample() {
    
    const arr = [
        {name : "SangHun", age : 25},
        {name : "SangHun", age : 26}
    ]

    var rst = await Koconut.Array([1,2,3,4,5])
                        .map(e => e*2)
                        .map(e => e*2)
                        .yield()
    console.log(rst)
}
