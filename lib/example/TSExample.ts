
import { Koconut } from "./../index"

export async function runTsExample() {

 
    const rst = await Koconut.Array([1,2,3,4,5,6,7,8,9,10])
                                        .chunked(3, async (e) => {
                                            return await Koconut.Array(e)
                                                                .sumBy(q => q)
                                                                .yield()
                                        })
                                        .yield()
    console.log(rst)


} 
