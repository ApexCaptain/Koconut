
import { Koconut, KoconutInterfaces } from "../index"

class TestComparable implements KoconutInterfaces.Comparable {
    name : string
    age : number
    constructor(name : string, age : number) {
        this.name = name
        this.age = age
    }
    compareTo(other : TestComparable) : number {
        return this.age - other.age
    }
}

export async function runTsExample() {
    try {
        const rst = await Koconut.Array(
                        [
                            new TestComparable("A", 100),
                            new TestComparable("B", 120),
                            new TestComparable("Q", 50)
                        ]
                    )
                    .maxOf(e => e)
                    .yield()
        console.log(rst)
    } catch(error) {
        console.log(error)
    }
}
 