import { expect } from "chai"
import { count } from "console"
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
import {
    Person, ProductInfo
} from "./TestDataClasses"

describe(`${KoconutSequence.name} -- Calculator`, () => {

    it(KoconutSequence.prototype.count.name, async () => {

        const koconut = KoconutSequence.of(1,2,3,4,5)

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .count()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(5)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .count(eachElement => eachElement % 2 == 0)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(2)

    })

    it(KoconutSequence.prototype.maxBy.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .maxBy(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-3", "iPhone -- June", 1500))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .maxBy(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-1", "Mac Book Pro -- May", 2000))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .maxBy(eachElement => eachElement)
        try { await yieldableCase3.process() }
        catch(error) { expect(error).to.be.instanceOf(KoconutNoSuchElementException) }

    })

    it(KoconutSequence.prototype.maxByOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .maxByOrNull(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-3", "iPhone -- June", 1500))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .maxByOrNull(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-1", "Mac Book Pro -- May", 2000))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .maxByOrNull(eachElement => eachElement)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(null)

    })

    it(KoconutSequence.prototype.maxOf.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .maxOf(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("iPhone -- June")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .maxOf(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-1", "Mac Book Pro -- May", 2000))

    })

    it(KoconutSequence.prototype.maxOfOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .maxOfOrNull(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("iPhone -- June")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .maxOfOrNull(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-1", "Mac Book Pro -- May", 2000))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price < 500)
                        .maxOfOrNull(eachElement => eachElement.price)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(null)

    })

    it(KoconutSequence.prototype.maxOfWith.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
                    
        const yieldable =
                        koconut
                        .maxOfWith(
                            eachElement => eachElement.name,
                            (front, rear) => front.length - rear.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("Mac Book Air -- September")

    })

    it(KoconutSequence.prototype.maxOfWithOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
                    
        const yieldable =
                        koconut
                        .maxOfWithOrNull(
                            eachElement => eachElement.name,
                            (front, rear) => front.length - rear.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("Mac Book Air -- September")

    })

    it(KoconutSequence.prototype.maxWith.name, async () => {

        const koconut = KoconutSequence.from([
            new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
            new ProductInfo("A-2", "Mac Book Air -- September", 1200),
            new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =   
                    koconut
                    .maxWith(
                        (front, rear) => front.name.length - rear.name.length
                    )
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 2 */
        const yieldableCase2 =
                    koconut
                    .filter(eachElement => eachElement.price > 3000)
                    .maxWith(
                        (front, rear) => front.name.length - rear.name.length
                    )
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase2.yield() }
        catch(error) { expect(error).to.be.instanceOf(KoconutNoSuchElementException) }

    })

    it(KoconutSequence.prototype.maxWithOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =   
                        koconut
                        .maxWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .maxWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

    it(KoconutSequence.prototype.minBy.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .minBy(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .minBy(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .minBy(eachElement => eachElement)
        try { await yieldableCase3.yield() }
        catch(error) { expect(error).to.be.instanceOf(KoconutNoSuchElementException) }

    })

    it(KoconutSequence.prototype.minByOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .minByOrNull(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .minByOrNull(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .minByOrNull(eachElement => eachElement)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(null)

    })

    it(KoconutSequence.prototype.minOf.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .minOf(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("Mac Book Air -- September")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .minOf(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

    })

    it(KoconutSequence.prototype.minOfOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .minOfOrNull(eachElement => eachElement.name)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("Mac Book Air -- September")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .minOfOrNull(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .filter(eachElement => eachElement.price < 500)
                        .minOfOrNull(eachElement => eachElement.price)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(null)

    })

    it(KoconutSequence.prototype.minOfWith.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
                    
        const yieldable =
                        koconut
                        .minOfWith(
                            eachElement => eachElement.name,
                            (front, rear) => front.length - rear.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("iPhone -- June")

    })

    it(KoconutSequence.prototype.minOfWithOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
                    
        const yieldable =
                        koconut
                        .minOfWithOrNull(
                            eachElement => eachElement.name,
                            (front, rear) => front.length - rear.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("iPhone -- June")

    })

    it(KoconutSequence.prototype.minWith.name, async () => {

        const koconut = KoconutSequence.from([
            new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
            new ProductInfo("A-2", "Mac Book Air -- September", 1200),
            new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =   
                    koconut
                    .minWith(
                        (front, rear) => front.name.length - rear.name.length
                    )
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-3", "iPhone -- June", 1500))

        /* Case 2 */
        const yieldableCase2 =
                    koconut
                    .filter(eachElement => eachElement.price > 3000)
                    .minWith(
                        (front, rear) => front.name.length - rear.name.length
                    )
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase2.yield() }
        catch(error) { expect(error).to.be.instanceOf(KoconutNoSuchElementException) }

    })

    it(KoconutSequence.prototype.minWithOrNull.name, async () => {

        const koconut = KoconutSequence.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        /* Case 1 */
        const yieldableCase1 =   
                        koconut
                        .minWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new ProductInfo("A-3", "iPhone -- June", 1500))

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement.price > 3000)
                        .minWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

})

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




















describe(`${KoconutSequence.name} -- Caster`, () => {

    it(KoconutSequence.prototype.asArray.name, async () => {

        const koconut = KoconutSequence.of(1,2,3,4,5)

        const yieldable =
                        koconut
                        .asArray()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,2,3,4,5])

    })


    it(KoconutSequence.prototype.asSet.name, async () => {

        const koconut = KoconutSequence.of(1,1,2,2,3,3)

        const yieldable =
                        koconut
                        .asSet()
        expect(yieldable).to.be.instanceOf(KoconutSet)
        const result = await yieldable.yield()
        expect(result).eqls(new Set([1,2,3]))

    })

})