import { expect } from 'chai'
import {
    /* Bases */
    KoconutPrimitive,

    /* Containers*/
    KoconutArray, KoconutSet
} from "../internal"

describe(`${KoconutSet.name}`, () => {

    it(`'${KoconutSet.prototype.size.name} function testing...`, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                        koconutSet
                        .size()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.equals(5)

    })

    it(`'${KoconutSet.prototype.indices.name}' function testing...`, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                        koconutSet
                        .indices()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).to.eql([0,1,2,3,4])

    })

    it(`'${KoconutSet.prototype.all.name}' function testing...`, async () => {
        
        const koconutSet = KoconutSet.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutSet
                        .all(element => element > 2)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equal(false)

        /* Case 2 */
        const yieldableCase2 = 
                        koconutSet
                        .all(element => element < 10)


        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(true)

    })

    it(`'${KoconutSet.prototype.any.name}' function testing...`, async () => {
        
        const koconutSet = KoconutSet.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutSet
                        .any(element => element >= 4)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconutSet
                        .any(element => element > 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })

    it(`'${KoconutSet.prototype.asIterable.name}' function testing...`, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                    koconutSet
                    .asIterable()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.eql([1,2,3,4,5])

    })

})