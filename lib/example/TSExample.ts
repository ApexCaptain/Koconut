
import { Koconut, KoconutInterfaces, KoconutBases} from "../index"

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
        Koconut.Array([1,2,3,4,5])
            .onEach(e => {
            }).process()
    } catch(error) {
        console.log(error)
    }
}
 