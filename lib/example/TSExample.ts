
import { Koconut } from "../index"

export async function runTsExample() {

    try {
        const rst = await Koconut.Set([1,2,3,4,5,6,7,8])
                                    .map(e => e*2)
                                    .yield()
        console.log(rst)
        
    } catch(error) {
        console.log(error)
    }
}
 