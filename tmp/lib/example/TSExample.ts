
import { Koconut } from "../index"


export async function runTsExample() {


    var rst = await Koconut.Set(new Set([1,2,3,4,5,6,7,8,9,10]))
                                            .intersect([1,2,3,4,5])
                                            .yield()

                                            
    console.log(rst)
    
} 
