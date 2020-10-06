import { expect } from "chai"
import {
    /* Tool */
    KoconutPrimitive, KoconutDeprecation,

    /* Base */
    Pair, KoconutPair, Entry,

    /* Container */
    KoconutArray, KoconutMap, KoconutSet, KoconutFlow, Flow, Sequence, KoconutSequence,

    /* Exception */
    KoconutNoSuchElementException, KoconutConflictException, KoconutBoolean
} from "../../lib/module.internal"

describe(`${KoconutSequence.name} -- Iterator`, () => {

    it(KoconutSequence.prototype.forEach.name, async () => {

        const koconut = KoconutSequence.of(1,2,3,4,5)

        const yieldable =
                        koconut
                        .forEach(eachElement => {
                            expect(eachElement).to.be.a('number')
                        })
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        await yieldable.process()

    })

    it(KoconutSequence.prototype.forEachIndexed.name, async () => {


        const koconut = KoconutSequence.of(1,2,3,4,5)

        const yieldable =
                        koconut
                        .forEachIndexed((eachIndex, eachElement) => {
                            expect(eachElement - eachIndex).equals(1)
                        })
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        await yieldable.process()

    })

    

})