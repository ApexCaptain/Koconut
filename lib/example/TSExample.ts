
import { Koconut } from "../index"

export async function runTsExample() {
    var testMap = new Map<number, number>();
    Koconut.Set([1,2,3,4,5])
        .associateByTo(testMap, e => e, e => e*2)
        .let(it => console.log(testMap))

}
 