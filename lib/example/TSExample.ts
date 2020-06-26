
import { Koconut } from "../index"


export async function runTsExample() {

    await Koconut.Array([1,2,3,4,5,6,7])
                            .zip(['a','b','c','d','e'], (origin, other) => {
                                return `${origin}${other}`
                            })
                            .let(e => console.log(e))
}
