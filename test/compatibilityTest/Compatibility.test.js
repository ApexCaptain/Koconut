const {
    /* Base */
    Entry, KoconutEntry, Pair, KoconutPair,

    /* Container */
    KoconutArray, KoconutSet, KoconutMap,

    /* Exception */
    KoconutConflictException, KoconutNoSuchElementException, KoconutInvalidArgumentException, KoconutIndexOutOfBoundsException,

    /* Enum */
    KoconutLocale, KoconutLoopSignal,

    /* Tool */
    KoconutOption,

    /* Protocol */
    KoconutComparable, KoconutEquatable,
} = require("../../dist/index.internal")

function runCompatibilityTest() {
    KoconutArray.of(1,2,3,4,5)
                .filter(function(element) {
                    return element % 2 == 0
                })
                .yield()
                .then(function(result){
                    console.log(result)
                })
}
runCompatibilityTest()