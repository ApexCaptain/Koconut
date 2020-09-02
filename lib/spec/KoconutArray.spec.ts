import { expect } from 'chai' 
import {
    /* Bases */
    KoconutPrimitive, Pair, KoconutPair,

    /* Containers*/
    KoconutArray, KoconutMap
} from "../internal"
import {
    Person
} from "./TestDataClasses"

describe(`${KoconutArray.name}`, () => {

    it(KoconutArray.prototype.size.name, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconutArray
                        .size()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.equals(5)

    })

    it(KoconutArray.prototype.indices.name, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconutArray
                        .indices()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).to.eql([0,1,2,3,4])

    })

    it(KoconutArray.prototype.all.name, async () => {

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

    it(KoconutArray.prototype.any.name, async () => {
        
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

    it(KoconutArray.prototype.asIterable.name, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                    koconutArray
                    .asIterable()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.eql([1,2,3,4,5])

    })

    it(KoconutArray.prototype.associate.name, async () =>{

        const koconutArray = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const yieldableCase1 =
                        koconutArray
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return [lastName, firstName]
                        })
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(Array.from(resultCase1!.entries())).to.eql(expectedResultEntryArray)

        /* Case 2 */
        const yieldableCase2 =
                        koconutArray
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new Pair(lastName, firstName)
                        })
        expect(yieldableCase2).to.be.instanceOf(KoconutMap)
        const resultCase2 = await yieldableCase2.yield()
        expect(Array.from(resultCase2!.entries())).to.eql(expectedResultEntryArray)

        /* Case 3 */
        const yieldableCase3 =
                        koconutArray
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new KoconutPair(lastName, firstName)
                        })
        expect(yieldableCase3).to.be.instanceOf(KoconutMap)
        const resultCase3 = await yieldableCase3.yield()
        expect(Array.from(resultCase3!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.associateBy.name, async () => {

        const koconutArray = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        /* Case 1 */
        const yieldableCase1 = 
                        koconutArray
                        .associateBy(eachElement => eachElement.lastName)
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1?.get("Hopper")).to.eql(new Person("Grace", "Hopper"))
        expect(resultCase1?.get("Bernoulli")).to.eql(new Person("Johann", "Bernoulli"))
        expect(resultCase1?.get("Luvya")).to.eql(new Person("Jinyoung", "Luvya"))
        
        /* Case 2 */
        const yieldableCase2 =
                        koconutArray
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

    it(KoconutArray.prototype.associateByTo.name, async () => {

        const koconutArray = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])
        
        /* Case 1 */
        const destinationCase1 = new Map<string, Person>()
        const yieldableCase1 =
                        koconutArray
                        .associateByTo(
                            destinationCase1,
                            eachElement => eachElement.lastName
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        await yieldableCase1.process()
        expect(destinationCase1.get("Hopper")).to.eql(new Person("Grace", "Hopper"))
        expect(destinationCase1.get("Bernoulli")).to.eql(new Person("Johann", "Bernoulli"))
        expect(destinationCase1.get("Luvya")).to.eql(new Person("Jinyoung", "Luvya"))

        /* Case 2 */
        const destinationCase2 = new Map<string, string>()
        const yieldableCase2 = 
                        koconutArray
                        .associateByTo(
                            destinationCase2,
                            eachElement => eachElement.lastName,
                            eachElement => eachElement.firstName
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        await yieldableCase2.process()
        const expectedResultEntryArrayCase2 =[[ 'Hopper', 'Grace' ],
                                            [ 'Bernoulli', 'Johann' ],
                                            [ 'Luvya', 'Jinyoung' ]]
        expect(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArrayCase2)

    })

    it(KoconutArray.prototype.associateTo.name, async () =>{

        const koconutArray = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const destinationCase1 = new Map<string, string>()
        const yieldableCase1 =
                        koconutArray
                        .associateTo(
                            destinationCase1,
                            eachElement => {
                                const [firstName, lastname] = eachElement.split(" ")
                                return [lastname, firstName]
                            }
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        await yieldableCase1.process()
        expect(Array.from(destinationCase1.entries())).to.eql(expectedResultEntryArray)

        /* Case 2 */
        const destinationCase2 = new Map<string, string>()
        const yieldableCase2 =
                        koconutArray
                        .associateTo(
                            destinationCase2,
                            eachElement => {
                                const [firstName, lastName] = eachElement.split(" ")
                                return new Pair(lastName, firstName)
                            }
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        await yieldableCase2.process()
        expect(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArray)

        /* Case 3 */
        const destinationCase3 = new Map<string, string>()
        const yieldableCase3 = 
                        koconutArray
                        .associateTo(
                            destinationCase3,
                            eachElement => {
                                const [firstName, lastName] = eachElement.split(" ")
                                return new KoconutPair(lastName, firstName)
                            }
                        )
        expect(yieldableCase3).to.be.instanceOf(KoconutArray)
        await yieldableCase3.process()
        expect(Array.from(destinationCase3.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.associateWith.name, async () => {

        const koconutArray = KoconutArray.from(["a", "ab", "abc", "abcd"])

        const yieldable =
                        koconutArray
                        .associateWith(eachElement => eachElement.length)
        expect(yieldable).to.be.instanceOf(KoconutMap)
        const result = await yieldable.yield()
        const expectedResultEntryArray = [ [ 'a', 1 ], [ 'ab', 2 ], [ 'abc', 3 ], [ 'abcd', 4 ] ]
        expect(Array.from(result!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.associateWithTo.name, async () => {

        const koconutArray = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])

        const destination = new Map<string, number>()
        const yieldable =
                        koconutArray
                        .associateWithTo(
                            destination,
                            eachElement => eachElement.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        const expectedResultEntryArray = [
                                            [ 'Grace Hopper', 12 ],
                                            [ 'Jacob Bernoulli', 15 ],
                                            [ 'Johann Bernoulli', 16 ],
                                            [ 'Jinyoung Luvya', 14 ]
                                        ]
        expect(Array.from(destination.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.chunked.name, async () => {

        const koconutArray = KoconutArray.from( "one two three four five six seven eight nine ten".split(' '))

        /* Case 1 */
        const yieldableCase1 = 
                        koconutArray
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
                        koconutArray
                        .chunked(
                            3,
                            eachElements => eachElements.join(' ')
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultarrayCase2 = [ 'one two three', 'four five six', 'seven eight nine', 'ten' ]
        expect(resultCase2).to.eql(expectedResultarrayCase2)

    })

    it(KoconutArray.prototype.contains.name, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 = 
                        koconutArray
                        .contains(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 = 
                        koconutArray
                        .contains(6)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })

    it(KoconutArray.prototype.containsAll.name, async () => {

        const koconutArray = KoconutArray.from("abc")

        /* Case 1 */
        const yieldableCase1 = 
                        koconutArray
                        .containsAll("ab")
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconutArray
                        .containsAll("abcd")
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })


    it(KoconutArray.prototype.count.name, async () => {

        const koconutArray = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconutArray
                        .count()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(5)

        /* Case 2 */
        const yieldableCase2 =
                        koconutArray
                        .count(eachElement => eachElement % 2 == 0)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(2)

    })

    it(KoconutArray.prototype.distinct.name, async () => {

        const koconutArray = KoconutArray.from('aAbBcCaA')

        const yieldable =
                        koconutArray
                        .distinct()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("aAbBcC")

    })

    it(KoconutArray.prototype.distinctBy.name, async () => {

        const koconutArray = KoconutArray.from("aAbBcCaA")

        const yieldable =
                        koconutArray
                        .distinctBy(element => element.toUpperCase())
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("abc")

    })

})