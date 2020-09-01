import { expect } from 'chai' 
import {
    /* Bases */
    KoconutPrimitive,

    /* Containers*/
    KoconutArray
} from "../internal"

describe(`${KoconutArray.name}`, () => {

    it(`'${KoconutArray.prototype.size.name} function testing...`, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconutArray
                        .size()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.equals(5)

    })

    it(`'${KoconutArray.prototype.indices.name}' function testing...`, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconutArray
                        .indices()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).to.eql([0,1,2,3,4])

    })

    it(`'${KoconutArray.prototype.all.name}' function testing...`, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutArray
                        .all(element => element > 2)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(false)

        /* Case 2 */
        const yieldableCase2 = 
                        koconutArray
                        .all(element => element < 10)

        
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(true)

    })

    it(`'${KoconutArray.prototype.any.name}' function testing...`, async () => {
        
        const koconutArray = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutArray
                        .any(element => element >= 4)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconutArray
                        .any(element => element > 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })

    it(`'${KoconutArray.prototype.asIterable.name}' function testing...`, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                    koconutArray
                    .asIterable()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.eql([1,2,3,4,5])

    })

})