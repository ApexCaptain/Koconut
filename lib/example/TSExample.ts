
import { Koconut } from "./../index"

export async function runTsExample() {

    const rst = await Koconut.Array([1,2,3,4,5])
                                    .findLast(e => e%2 ==0)
                                    .yield()

    console.log(rst)

} 
