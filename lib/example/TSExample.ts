
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
        const myMap = new Map<number, string>()
        myMap.set(10, "10")
        myMap.set(20, "20")
        const rst = await Koconut.Map(myMap)
                                .asArray()
                                .yield()
        console.log(rst)
    } catch(error) {
        console.log(error)
    }
}
 