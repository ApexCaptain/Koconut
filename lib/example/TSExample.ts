
import { Koconut, KoconutInterfaces } from "../index"
import { KoconutArray } from "../src/collection/KoconutCollection"

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
                            new TestComparable("C", 100),
                            new TestComparable("B", 120),
                            new TestComparable("Q", 50)
                        ]
                    )
                    .chunked(2, e => e[0].age)
                    .yield()
        console.log(rst)
    } catch(error) {
        console.log(error)
    }
}
 