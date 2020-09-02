import { expect } from 'chai'
import {
    /* Bases */
    KoconutPrimitive, Pair, KoconutPair,

    /* Containers*/
    KoconutArray, KoconutSet, KoconutMap
} from "../internal"
import {
    Person
} from "./TestDataClasses"

describe(`${KoconutSet.name}`, () => {

    it(KoconutSet.prototype.size.name, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                        koconutSet
                        .size()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.equals(5)

    })

    it(KoconutSet.prototype.indices.name, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                        koconutSet
                        .indices()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).to.eql([0,1,2,3,4])

    })

    it(KoconutSet.prototype.all.name, async () => {
        
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

    it(KoconutSet.prototype.any.name, async () => {
        
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

    it(KoconutSet.prototype.asIterable.name, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        const yieldable =
                    koconutSet
                    .asIterable()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.eql([1,2,3,4,5])

    })

    it(KoconutSet.prototype.associate.name, async () =>{

        const koconutSet = KoconutSet.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const yieldableCase1 =
                        koconutSet
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return [lastName, firstName]
                        })
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(Array.from(resultCase1!.entries())).to.eql(expectedResultEntryArray)

        /* Case 2 */
        const yieldableCase2 =
                        koconutSet
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new Pair(lastName, firstName)
                        })
        expect(yieldableCase2).to.be.instanceOf(KoconutMap)
        const resultCase2 = await yieldableCase2.yield()
        expect(Array.from(resultCase2!.entries())).to.eql(expectedResultEntryArray)

        /* Case 3 */
        const yieldableCase3 =
                        koconutSet
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new KoconutPair(lastName, firstName)
                        })
        expect(yieldableCase3).to.be.instanceOf(KoconutMap)
        const resultCase3 = await yieldableCase3.yield()
        expect(Array.from(resultCase3!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutSet.prototype.associateBy.name, async () => {

        const koconutSet = KoconutSet.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        /* Case 1 */
        const yieldableCase1 = 
                        koconutSet
                        .associateBy(eachElement => eachElement.lastName)
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1?.get("Hopper")).to.eql(new Person("Grace", "Hopper"))
        expect(resultCase1?.get("Bernoulli")).to.eql(new Person("Johann", "Bernoulli"))
        expect(resultCase1?.get("Luvya")).to.eql(new Person("Jinyoung", "Luvya"))
        
        /* Case 2 */
        const yieldableCase2 =
                        koconutSet
                        .associateBy(
                            eachElement => eachElement.lastName,
                            eachElement => eachElement.firstName
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutMap)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultEntryArrayCase2 =[[ 'Hopper', 'Grace' ],
                                            [ 'Bernoulli', 'Johann' ],
                                            [ 'Luvya', 'Jinyoung' ]]
        expect(Array.from(resultCase2!.entries())).to.eql(expectedResultEntryArrayCase2)

    })

    it(KoconutSet.prototype.associateByTo.name, async () => {

        const koconutSet = KoconutSet.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])
        
        /* Case 1 */
        const destinationCase1 = new Map<string, Person>()
        const yieldableCase1 =
                        koconutSet
                        .associateByTo(
                            destinationCase1,
                            eachElement => eachElement.lastName
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutSet)
        await yieldableCase1.process()
        expect(destinationCase1.get("Hopper")).to.eql(new Person("Grace", "Hopper"))
        expect(destinationCase1.get("Bernoulli")).to.eql(new Person("Johann", "Bernoulli"))
        expect(destinationCase1.get("Luvya")).to.eql(new Person("Jinyoung", "Luvya"))

        /* Case 2 */
        const destinationCase2 = new Map<string, string>()
        const yieldableCase2 = 
                        koconutSet
                        .associateByTo(
                            destinationCase2,
                            eachElement => eachElement.lastName,
                            eachElement => eachElement.firstName
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutSet)
        await yieldableCase2.process()
        const expectedResultEntryArrayCase2 =[[ 'Hopper', 'Grace' ],
                                            [ 'Bernoulli', 'Johann' ],
                                            [ 'Luvya', 'Jinyoung' ]]
        expect(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArrayCase2)

    })

    it(KoconutSet.prototype.associateTo.name, async () =>{

        const koconutSet = KoconutSet.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const destinationCase1 = new Map<string, string>()
        const yieldableCase1 =
                        koconutSet
                        .associateTo(
                            destinationCase1,
                            eachElement => {
                                const [firstName, lastname] = eachElement.split(" ")
                                return [lastname, firstName]
                            }
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutSet)
        await yieldableCase1.process()
        expect(Array.from(destinationCase1.entries())).to.eql(expectedResultEntryArray)

        /* Case 2 */
        const destinationCase2 = new Map<string, string>()
        const yieldableCase2 =
                        koconutSet
                        .associateTo(
                            destinationCase2,
                            eachElement => {
                                const [firstName, lastName] = eachElement.split(" ")
                                return new Pair(lastName, firstName)
                            }
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutSet)
        await yieldableCase2.process()
        expect(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArray)

        /* Case 3 */
        const destinationCase3 = new Map<string, string>()
        const yieldableCase3 = 
                        koconutSet
                        .associateTo(
                            destinationCase3,
                            eachElement => {
                                const [firstName, lastName] = eachElement.split(" ")
                                return new KoconutPair(lastName, firstName)
                            }
                        )
        expect(yieldableCase3).to.be.instanceOf(KoconutSet)
        await yieldableCase3.process()
        expect(Array.from(destinationCase3.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutSet.prototype.associateWith.name, async () => {

        const koconutSet = KoconutSet.from(["a", "ab", "abc", "abcd"])

        const yieldable =
                        koconutSet
                        .associateWith(eachElement => eachElement.length)
        expect(yieldable).to.be.instanceOf(KoconutMap)
        const result = await yieldable.yield()
        const expectedResultEntryArray = [ [ 'a', 1 ], [ 'ab', 2 ], [ 'abc', 3 ], [ 'abcd', 4 ] ]
        expect(Array.from(result!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutSet.prototype.associateWithTo.name, async () => {

        const koconutSet = KoconutSet.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])

        const destination = new Map<string, number>()
        const yieldable =
                        koconutSet
                        .associateWithTo(
                            destination,
                            eachElement => eachElement.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutSet)
        await yieldable.process()
        const expectedResultEntryArray = [
                                            [ 'Grace Hopper', 12 ],
                                            [ 'Jacob Bernoulli', 15 ],
                                            [ 'Johann Bernoulli', 16 ],
                                            [ 'Jinyoung Luvya', 14 ]
                                        ]
        expect(Array.from(destination.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutSet.prototype.chunked.name, async () => {

        const koconutSet = KoconutSet.from( "one two three four five six seven eight nine ten".split(' '))

        /* Case 1 */
        const yieldableCase1 = 
                        koconutSet
                        .chunked(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        const expectedResultArrayCase1 = [
                                            [ 'one', 'two', 'three' ],
                                            [ 'four', 'five', 'six' ],
                                            [ 'seven', 'eight', 'nine' ],
                                            [ 'ten' ]
                                        ]
        expect(resultCase1).to.eql(expectedResultArrayCase1)

        /* Case 2 */
        const yieldableCase2 = 
                        koconutSet
                        .chunked(
                            3,
                            eachElements => eachElements.join(' ')
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultarrayCase2 = [ 'one two three', 'four five six', 'seven eight nine', 'ten' ]
        expect(resultCase2).to.eql(expectedResultarrayCase2)

    })

    it(KoconutSet.prototype.contains.name, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 = 
                        koconutSet
                        .contains(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 = 
                        koconutSet
                        .contains(6)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const reusltCase2 = await yieldableCase2.yield()
        expect(reusltCase2).to.equals(false)

    })

    it(KoconutSet.prototype.containsAll.name, async () => {

        const koconutSet = KoconutSet.from("abc")

        /* Case 1 */
        const yieldableCase1 = 
                        koconutSet
                        .containsAll("ab")
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconutSet
                        .containsAll("abcd")
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })

    it(KoconutSet.prototype.count.name, async () => {

        const koconutSet = KoconutSet.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutSet
                        .count()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(5)

        /* Case 2 */
        const yieldableCase2 =
                        koconutSet
                        .count(eachElement => eachElement % 2 == 0)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(2)

    })

})