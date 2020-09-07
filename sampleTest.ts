import {
    Entry, KoconutArray, KoconutEquatable, Pair, KoconutMap
} from "./dist/index"
// https://typedoc.org/guides/doccomments/

const ka = KoconutArray.of(1,2,3,4,5)
for(let e of ka) {
    console.log(e)
}
const km = KoconutMap.of(
    [0, 1],
    [1, 2]
)
for(let e of km) {
    console.log(e)
}

