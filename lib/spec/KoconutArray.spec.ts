import { expect } from 'chai' 
import {
    /* Bases */
    KoconutPrimitive, Pair, KoconutPair,

    /* Containers*/
    KoconutArray, KoconutMap, KoconutSet,

    /* Exception */
    KoconutNoSuchElementException, KoconutConflicException
} from "../internal"
import {
    Person, ProductInfo
} from "./TestDataClasses"

describe(`${KoconutArray.name} -- Property Getter`, () => {

    it(KoconutArray.prototype.size.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .size()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.equals(5)

    })

    it(KoconutArray.prototype.indices.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .indices()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).to.eql([0,1,2,3,4])

    })

})

describe(`${KoconutArray.name} -- Function`, () => {

    it(KoconutArray.prototype.all.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .all(element => element > 2)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(false)

        /* Case 2 */
        const yieldableCase2 = 
                        koconut
                        .all(element => element < 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(true)

    })

    it(KoconutArray.prototype.any.name, async () => {
        
        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .any(element => element >= 4)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .any(element => element > 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

    })

    it(KoconutArray.prototype.asIterable.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                    koconut
                    .asIterable()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).to.eql([1,2,3,4,5])

    })

    it(KoconutArray.prototype.associate.name, async () =>{

        const koconut = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return [lastName, firstName]
                        })
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(Array.from(resultCase1!.entries())).to.eql(expectedResultEntryArray)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new Pair(lastName, firstName)
                        })
        expect(yieldableCase2).to.be.instanceOf(KoconutMap)
        const resultCase2 = await yieldableCase2.yield()
        expect(Array.from(resultCase2!.entries())).to.eql(expectedResultEntryArray)

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .associate(eachElement => {
                            const [firstName, lastName] = eachElement.split(" ")
                            return new KoconutPair(lastName, firstName)
                        })
        expect(yieldableCase3).to.be.instanceOf(KoconutMap)
        const resultCase3 = await yieldableCase3.yield()
        expect(Array.from(resultCase3!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.associateBy.name, async () => {

        const koconut = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .associateBy(eachElement => eachElement.lastName)
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1?.get("Hopper")).to.eql(new Person("Grace", "Hopper"))
        expect(resultCase1?.get("Bernoulli")).to.eql(new Person("Johann", "Bernoulli"))
        expect(resultCase1?.get("Luvya")).to.eql(new Person("Jinyoung", "Luvya"))
        
        /* Case 2 */
        const yieldableCase2 =
                        koconut
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

        const koconut = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])
        
        /* Case 1 */
        const destinationCase1 = new Map<string, Person>()
        const yieldableCase1 =
                        koconut
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
                        koconut
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

        const koconut = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])
        const expectedResultEntryArray =[[ 'Hopper', 'Grace' ],
                                        [ 'Bernoulli', 'Johann' ],
                                        [ 'Luvya', 'Jinyoung' ]]

        /* Case 1 */
        const destinationCase1 = new Map<string, string>()
        const yieldableCase1 =
                        koconut
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
                        koconut
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
                        koconut
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

        const koconut = KoconutArray.from(["a", "ab", "abc", "abcd"])

        const yieldable =
                        koconut
                        .associateWith(eachElement => eachElement.length)
        expect(yieldable).to.be.instanceOf(KoconutMap)
        const result = await yieldable.yield()
        const expectedResultEntryArray = [ [ 'a', 1 ], [ 'ab', 2 ], [ 'abc', 3 ], [ 'abcd', 4 ] ]
        expect(Array.from(result!.entries())).to.eql(expectedResultEntryArray)

    })

    it(KoconutArray.prototype.associateWithTo.name, async () => {

        const koconut = KoconutArray.from(["Grace Hopper", "Jacob Bernoulli", "Johann Bernoulli", "Jinyoung Luvya"])

        const destination = new Map<string, number>()
        const yieldable =
                        koconut
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

        const koconut = KoconutArray.from( "one two three four five six seven eight nine ten".split(' '))

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
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
                        koconut
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

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .contains(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 = 
                        koconut
                        .contains(6)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase3 =
                            koconutCase3
                            .contains(new Person("Jinyoung", "Luvya"))
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).to.equal(true)
        

    })

    it(KoconutArray.prototype.containsAll.name, async () => {

        const koconut = KoconutArray.from("abc")

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .containsAll("ab")
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).to.equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .containsAll("abcd")
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).to.equals(false)

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase3 =
                        koconutCase3
                        .containsAll([
                            new Person("Jacob", "Bernoulli"), 
                            new Person("Johann", "Bernoulli"), 
                        ])
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).to.equals(true)

        /* Case 4 */
        const koconutCase4 = KoconutArray.from([
            new Person("Grace", "Hopper"), 
            new Person("Jacob", "Bernoulli"), 
            new Person("Johann", "Bernoulli"), 
            new Person("Jinyoung", "Luvya")])

        const yieldableCase4 =
                    koconutCase4
                    .containsAll([
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Steve", "Jobs"), 
                    ])
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).to.equals(false)

    })


    it(KoconutArray.prototype.count.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

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

    it(KoconutArray.prototype.distinct.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from('aAbBcCaA')

        const yieldableCase1 =
                        koconutCase1
                        .distinct()
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1!.join("")).equals("aAbBcC")

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase2 =
                        koconutCase2
                        .distinct()
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultArrayCase2 = [
                                            new Person("Grace", "Hopper"),
                                            new Person("Jacob", "Bernoulli"),
                                            new Person("Jinyoung", "Luvya")
                                        ]
        expect(resultCase2!).to.eql(expectedResultArrayCase2)

    })

    it(KoconutArray.prototype.distinctBy.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from("aAbBcCaA")

        const yieldableCase1 =
                        koconutCase1
                        .distinctBy(element => element.toUpperCase())
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1!.join("")).equals("abc")
        

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase2 =
                        koconutCase2
                        .distinctBy(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultArrayCase2 = [
                                            new Person("Grace", "Hopper"),
                                            new Person("Jacob", "Bernoulli"),
                                            new Person("Jinyoung", "Luvya")
                                        ]  
        expect(resultCase2!).to.eql(expectedResultArrayCase2)

    })

    it(KoconutArray.prototype.drop.name, async () => {

        const koconut = KoconutArray.from("ABCDEFG")

        const yieldable =
                        koconut
                        .drop(3)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("DEFG")

    })

    it(KoconutArray.prototype.dropLast.name, async () => {

        const koconut = KoconutArray.from("ABCDEFG")

        const yieldable =
                        koconut
                        .dropLast(3)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("ABCD")

    })

    it(KoconutArray.prototype.dropLastWhile.name, async () => {

        const koconut = KoconutArray.from("ABCDEFG")

        const yieldable =
                        koconut
                        .dropLastWhile(eachElement => eachElement > 'C')
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("ABC")

    })

    it(KoconutArray.prototype.dropWhile.name, async () =>{

        const koconut = KoconutArray.from("ABCDEFG")

        const yieldable =
                        koconut
                        .dropWhile(eachElement => eachElement < 'D')
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result!.join("")).equals("DEFG")

    })

    it(KoconutArray.prototype.elementAt.name, async () => {

        const koconut = KoconutArray.from([1,2,3])

        const yieldable =
                        koconut
                        .elementAt(0)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals(1)

    })

    it(KoconutArray.prototype.elementAtOrElse.name, async () => {

        const koconut = KoconutArray.from([1,2,3,])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .elementAtOrElse(0, index => index + 1)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(1)

        /* Case 1 */
        const yieldableCase2 =
                        koconut
                        .elementAtOrElse(3, index => index + 1)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(4)

    })

    it(KoconutArray.prototype.elementAtOrNull.name, async() => {

        const koconut = KoconutArray.from([1,2,3])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .elementAtOrNull(0)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(1)

        /* Case 1 */
        const yieldableCase2 =
                        koconut
                        .elementAtOrNull(3)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

    it(KoconutArray.prototype.filter.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldable =
                        koconut
                        .filter(eachElement => eachElement % 2 == 0)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([2,4,6])

    })

    it(KoconutArray.prototype.filterIndexed.name, async () => {

        const koconut = KoconutArray.from([0,1,2,3,4,8,6])

        const yieldable =
                        koconut
                        .filterIndexed((eachIndex, eachElement) => eachIndex == eachElement)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([0,1,2,3,4,6])

    })

    it(KoconutArray.prototype.filterIndexedTo.name, async () => {

        const koconut = KoconutArray.from([0,1,2,3,4,8,6])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .filterIndexedTo(destination, (eachIndex, eachElement) => eachIndex == eachElement)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([0,1,2,3,4,6])

    })

    it(KoconutArray.prototype.filterNot.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldable =
                        koconut
                        .filterNot(eachElement => eachElement % 3 == 0)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,2,4,5,7])

    })

    it(KoconutArray.prototype.filterNotNull.name, async () => {

        const koconut = KoconutArray.from([1,2,null,4])
        
        const yieldable = 
                        koconut
                        .filterNotNull()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,2,4])

    })

    it(KoconutArray.prototype.filterNotNullTo.name, async () => {

        const koconut = KoconutArray.from([1,2,null,4])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .filterNotNullTo(destination)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([1,2,4])

    })

    it(KoconutArray.prototype.filterNotTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .filterNotTo(destination, eachElement => eachElement % 3 == 0)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([1,2,4,5,7])

    })

    it(KoconutArray.prototype.filterTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .filterTo(destination, eachElement => eachElement % 2 == 0)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([2,4,6])

    })

    it(KoconutArray.prototype.find.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldable =
                        koconut
                        .find(eachElement => eachElement % 2 == 0)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals(2)

    })

    it(KoconutArray.prototype.findLast.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldable =
                        koconut
                        .findLast(eachElement => eachElement % 2 == 1)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals(7)

    })

    it(KoconutArray.prototype.first.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase1 =
                            koconutCase1
                            .filter(eachElement => eachElement > 10)
                            .first()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase1.process() } 
        catch(error) { expect(error).instanceOf(KoconutNoSuchElementException) }

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abc")

        const yieldableCase2 =
                            koconutCase2
                            .first(eachElement => eachElement > 'd')
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase2.process() }
        catch(error) { expect(error).instanceOf(KoconutNoSuchElementException) }


        /* Case 3 */
        const koconutCase3 = KoconutArray.from([1,2,3])

        const yieldableCase3 =
                            koconutCase3
                            .first()
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(1)

        /* Case 4 */
        const koconutCase4 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase4 =
                            koconutCase4
                            .first(eachElement => eachElement % 3 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(3)

    })

    it(KoconutArray.prototype.firstOrNull.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase1 =
                            koconutCase1
                            .filter(eachElement => eachElement > 10)
                            .firstOrNull()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(null)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abc")

        const yieldableCase2 =
                            koconutCase2
                            .firstOrNull(eachElement => eachElement > 'd')
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([1,2,3])

        const yieldableCase3 =  
                            koconutCase3
                            .firstOrNull()
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(1)

        /* Case 4 */
        const koconutCase4 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase4 =
                            koconutCase4
                            .first(eachElement => eachElement % 3 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(3)

    })

    it(KoconutArray.prototype.flatMap.name, async () => {

        const koconut = KoconutArray.from(["abc", "de"])

        const yieldable = 
                        koconut
                        .flatMap(eachElement => eachElement.split(''))
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['a','b','c','d','e'])

    })

    it(KoconutArray.prototype.flatMapIndexed.name, async () => {

        const kocout = KoconutArray.from(["abc", "def", "ghi", "jkl"])

        const yieldable =
                        kocout
                        .flatMapIndexed((eachIndex, eachElement) => {
                            if(eachIndex % 2 == 0) return eachElement.split('')
                            else return []
                        })
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['a','b','c','g','h','i'])

    })

    it(KoconutArray.prototype.flatMapIndexedTo.name, async () => {

        const kocout = KoconutArray.from(["abc", "def", "ghi", "jkl"])

        const destination = new Array<string>()
        const yieldable =
                        kocout
                        .flatMapIndexedTo(
                            destination,
                            (eachIndex, eachElement) => {
                                if(eachIndex % 2 == 0) return eachElement.split('')
                                else return []
                            }
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls(['a','b','c','g','h','i'])
    })

    it(KoconutArray.prototype.flatMapTo.name, async () => {

        const koconut = KoconutArray.from(["abc", "de"])

        const destination = new Array<string>()
        const yieldable =
                        koconut
                        .flatMapTo(
                            destination,
                            eachElement => eachElement.split('')
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls(['a','b','c','d','e'])

    })

    it(KoconutArray.prototype.fold.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .fold(1, (acc, eachElement) => acc * eachElement)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals(120)

    })

    it(KoconutArray.prototype.foldIndexed.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .foldIndexed(0, (eachIndex, acc, eachElement) => acc + eachIndex + eachElement)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals(25)

    })

    it(KoconutArray.prototype.forEach.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .forEach(eachElement => {
                            expect(eachElement).to.be.a("number")
                        })
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        await yieldable.process()

    })

    it(KoconutArray.prototype.forEachIndexed.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .forEachIndexed((eachIndex, eachElement) => {
                            expect(eachElement - eachIndex).equals(1)
                        })
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        await yieldable.process()

    })

    it(KoconutArray.prototype.groupBy.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from(["a", "abc", "ab", "def", "abcd"])

        const yieldableCase1 = 
                        koconutCase1
                        .groupBy(eachElement => eachElement.length)
        expect(yieldableCase1).to.be.instanceOf(KoconutMap)
        const resultCase1 = await yieldableCase1.yield()
        const expectedResultEntryArrayCase1 = [
                                            [ 1, [ 'a' ] ],
                                            [ 3, [ 'abc', 'def' ] ],
                                            [ 2, [ 'ab' ] ],
                                            [ 4, [ 'abcd' ] ]
                                        ]
        expect(Array.from(resultCase1!.entries())).eqls(expectedResultEntryArrayCase1)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase2 =
                        koconutCase2
                        .groupBy(
                            eachElement => eachElement.lastName,
                            eachElement => eachElement.firstName
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutMap)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultEntryArrayCase2 = [
                                                [ 'Hopper', [ 'Grace' ] ],
                                                [ 'Bernoulli', [ 'Jacob', 'Johann' ] ],
                                                [ 'Luvya', [ 'Jinyoung' ] ]
                                            ]
        expect(Array.from(resultCase2!.entries())).eqls(expectedResultEntryArrayCase2)

    })

    it(KoconutArray.prototype.groupByTo.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from(["a", "abc", "ab", "def", "abcd"])

        const destinationCase1 = new Map<number, Array<string>>()
        const yieldableCase1 =
                        koconutCase1
                        .groupByTo(
                            destinationCase1,
                            eachElement => eachElement.length
                        )
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        await yieldableCase1.process()
        const expectedResultEntryArrayCase1 = [
                                                [ 1, [ 'a' ] ],
                                                [ 3, [ 'abc', 'def' ] ],
                                                [ 2, [ 'ab' ] ],
                                                [ 4, [ 'abcd' ] ]
                                            ]
        expect(Array.from(destinationCase1.entries())).eqls(expectedResultEntryArrayCase1)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const destinationCase2 = new Map<string, Array<string>>()
        const yieldableCase2 =
                        koconutCase2
                        .groupByTo(
                            destinationCase2,
                            eachElement => eachElement.lastName,
                            eachElement => eachElement.firstName
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        await yieldableCase2.process()
        const expectedResultEntryArrayCase2 = [
                                            [ 'Hopper', [ 'Grace' ] ],
                                            [ 'Bernoulli', [ 'Jacob', 'Johann' ] ],
                                            [ 'Luvya', [ 'Jinyoung' ] ]
                                        ]
        expect(Array.from(destinationCase2.entries())).eqls(expectedResultEntryArrayCase2)

    })

    it(KoconutArray.prototype.indexOf.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 =
                        koconutCase1
                        .indexOf(2)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(1)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abc")

        const yieldableCase2 =
                        koconutCase2
                        .indexOf('d')
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(-1)

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])
        
        const yieldableCase3 =
                        koconutCase3
                        .indexOf(new Person("Grace", "Hopper"))
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(0)

    })

    it(KoconutArray.prototype.indexOfFirst.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .indexOfFirst(eachElement => eachElement % 3 == 0)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(2)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .indexOfFirst(eachElement => eachElement > 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(-1)

    })

    it(KoconutArray.prototype.indexOfLast.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5,6,7])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .indexOfLast(eachElement => eachElement % 3 == 0)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(5)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .indexOfLast(eachElement => eachElement > 10)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield();
        expect(resultCase2).equals(-1)

    })

    it(KoconutArray.prototype.intersect.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase1 =
                        koconutCase1
                        .intersect([5,6,7,8,9])
        expect(yieldableCase1).to.be.instanceOf(KoconutSet)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new Set([5,6,7]))

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
        
        const yieldableCase2 =
                        koconutCase2
                        .intersect([
                            new ProductInfo("A-1", "Mac Book Pro -- April", 2000),
                            new ProductInfo("A-3", "iPhone -- July", 1500)
                        ])
        expect(yieldableCase2).to.be.instanceOf(KoconutSet)
        const resultCase2 = await yieldableCase2.yield()
        expect(Array.from(resultCase2!)).eqls([
                                                new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                                                new ProductInfo("A-3", "iPhone -- June", 1500)
                                            ])

    })

    it(KoconutArray.prototype.isNotEmpty.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .isNotEmpty()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement >= 10)
                        .isNotEmpty()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(false)

    })

    it(KoconutArray.prototype.isNullOrEmpty.name, async () => {

        /* Case 1 */
        const koconutCase1 = new KoconutArray()
        
        const yieldableCase1 =
                        koconutCase1
                        .isNullOrEmpty()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(true)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase2 =
                        koconutCase2
                        .filter(eachElement => eachElement > 10)
                        .isNullOrEmpty()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(true)

    })

    it(KoconutArray.prototype.join.name, async () => {

        const koconut = KoconutArray.from("abcdefg")

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .join()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("a, b, c, d, e, f, g")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .join(
                            "•",
                            "<",
                            ">"
                        )
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals("<a•b•c•d•e•f•g>")

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .join(
                            " - ",
                            "< ",
                            " >",
                            5,
                            " ~",
                            eachElement => eachElement.toUpperCase()
                        )
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals("< A - B - C - D - E ~ >")

    })

    it(KoconutArray.prototype.last.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase1 =
                        koconutCase1
                        .filter(eachElement => eachElement > 10)
                        .last()
        expect(koconutCase1).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase1.process() }
        catch(error) { expect(error).instanceOf(KoconutNoSuchElementException) }

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abc")

        const yieldableCase2 =
                        koconutCase2
                        .last(eachElement => eachElement > 'd')
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase2.process() }
        catch(error) { expect(error).instanceOf(KoconutNoSuchElementException) }

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([1,2,3])

        const yieldableCase3 =
                        koconutCase3
                        .last()
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(3)

        /* Case 4 */
        const koconutCase4 = KoconutArray.from([1,2,3,4,5,6,7])

        const yieldableCase4 =
                            koconutCase4
                            .last(eachElement => eachElement % 3 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(6)

    })
    
    it(KoconutArray.prototype.lastIndexOf.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,1,2,1,2])
        
        const yieldableCase1 =
                        koconutCase1
                        .lastIndexOf(1)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(4)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])

        const yieldableCase2 =
                        koconutCase2
                        .lastIndexOf(new Person("Johann", "Bernoulli"))
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(2)

    })

    it(KoconutArray.prototype.lastOrNull.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .filter(eachElement => eachElement > 10)
                        .lastOrNull()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(null)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .lastOrNull()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(5)

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .lastOrNull(eachElement => eachElement > 10)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(null)

        /* Case 4 */
        const yieldableCase4 =
                        koconut
                        .lastOrNull(eachElement => eachElement % 3 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(3)

    })

    it(KoconutArray.prototype.map.name, async () => {

        const koconut = KoconutArray.from([1,2,3])

        const yieldable =
                        koconut
                        .map(eachElement => eachElement * eachElement)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,4,9])

    })

    it(KoconutArray.prototype.mapIndexed.name, async () => {

        const koconut = KoconutArray.from([1,2,3])

        const yieldable =
                        koconut
                        .mapIndexed((eachIndex, eachElement) => eachIndex + eachElement)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,3,5])

    })

    it(KoconutArray.prototype.mapIndexedNotNull.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .mapIndexedNotNull(
                            (eachIndex, eachElement) => {
                                if(eachIndex % 2 == 0) return eachElement * eachElement
                            }
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,9,25])

    })

    it(KoconutArray.prototype.mapIndexedNotNullTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .mapIndexedNotNullTo(
                            destination,
                            (eachIndex, eachElement) => {
                                if(eachIndex % 2 == 0) return eachElement * eachElement
                            }
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([1,9,25])

    })

    it(KoconutArray.prototype.mapIndexedTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3])

        const destination = new Array<number>()
        const yieldable = 
                        koconut
                        .mapIndexedTo(
                            destination,
                            (eachIndex, eachElement) => eachIndex + eachElement
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([1,3,5])

    })

    it(KoconutArray.prototype.mapNotNull.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .mapNotNull(eachElement => {
                            if(eachElement % 2 == 0) return eachElement * eachElement
                        })
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([4, 16])

    })

    it(KoconutArray.prototype.mapNotNullTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const destination = new Array()
        const yieldable =
                        koconut
                        .mapNotNullTo(
                            destination,
                            eachElement => {
                                if(eachElement % 2 == 0) return eachElement * eachElement
                            }
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([4, 16])

    })

    it(KoconutArray.prototype.mapTo.name, async () => {

        const koconut = KoconutArray.from([1,2,3])

        const destination = new Array<number>()
        const yieldable =
                        koconut
                        .mapTo(
                            destination,
                            eachElement => eachElement * eachElement
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()
        expect(destination).eqls([1,4,9])

    })

    it(KoconutArray.prototype.maxByOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    })

    it(KoconutArray.prototype.maxOf.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.maxOfOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.maxOfWith.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.maxOfWithOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.maxWithOrNull.name, async () => {

        const koconut = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        const yieldable =   
                        koconut
                        .maxWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).eqls(new ProductInfo("A-2", "Mac Book Air -- September", 1200))

    })

    it(KoconutArray.prototype.minByOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    })

    it(KoconutArray.prototype.minOf.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.minOfOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.minOfWith.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.minOfWithOrNull.name, async () => {

        const koconut = KoconutArray.from([
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

    it(KoconutArray.prototype.minus.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 =
                            koconutCase1
                            .minus(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls([1,2,4,5])

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abcde")

        const yieldableCase2 =
                            koconutCase2
                            .minus("abc")
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls("de".split(''))

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                            new Person("Grace", "Hopper"), 
                            new Person("Jacob", "Bernoulli"), 
                            new Person("Johann", "Bernoulli"), 
                            new Person("Jinyoung", "Luvya")])
        
        const yieldableCase3 =
                            koconutCase3
                            .minus(new Person("Grace", "Hopper"))
        expect(yieldableCase3).to.be.instanceOf(KoconutArray)
        const resultCase3 = await yieldableCase3.yield()
        const expectedResultArrayCase3 = [
                                            new Person("Jacob", "Bernoulli"),
                                            new Person("Johann", "Bernoulli"), 
                                            new Person("Jinyoung", "Luvya")
                                        ]
        expect(resultCase3).eql(expectedResultArrayCase3)

        /* Case 4 */
        const koconutCase4 = KoconutArray.from([
                            new Person("Grace", "Hopper"), 
                            new Person("Jacob", "Bernoulli"), 
                            new Person("Johann", "Bernoulli"), 
                            new Person("Jinyoung", "Luvya")])
        
        const yieldableCase4 =
                            koconutCase4
                            .minus([
                                new Person("Jacob", "Bernoulli"), 
                                new Person("Johann", "Bernoulli")
                            ])
        expect(yieldableCase4).to.be.instanceOf(KoconutArray)
        const resultCase4 = await yieldableCase4.yield()
        const expectedResultArrayCase4 = [
                                            new Person("Grace", "Hopper"), 
                                            new Person("Jinyoung", "Luvya")
                                        ]
        expect(resultCase4).eql(expectedResultArrayCase4)

    })

    it(KoconutArray.prototype.minusElement.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 =
                            koconutCase1
                            .minusElement(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls([1,2,4,5])

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                            new Person("Grace", "Hopper"), 
                            new Person("Jacob", "Bernoulli"), 
                            new Person("Johann", "Bernoulli"), 
                            new Person("Jinyoung", "Luvya")])
        
        const yieldableCase2 =
                            koconutCase2
                            .minusElement(new Person("Grace", "Hopper"))
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultArrayCase2 = [
                                            new Person("Jacob", "Bernoulli"),
                                            new Person("Johann", "Bernoulli"), 
                                            new Person("Jinyoung", "Luvya")
                                        ]
        expect(resultCase2).eql(expectedResultArrayCase2)

    })
    
    it(KoconutArray.prototype.minWithOrNull.name, async () => {

        const koconut = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])

        const yieldable =   
                        koconut
                        .minWithOrNull(
                            (front, rear) => front.name.length - rear.name.length
                        )
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).eqls(new ProductInfo("A-3", "iPhone -- June", 1500))

    })

    it(KoconutArray.prototype.none.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .none()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(false)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > 10)
                        .none()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(true)

        /* Case 3 */
        const yieldableCase3 =
                        koconut
                        .none(eachElement => eachElement % 2 == 0)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(false)

        /* Case 4 */
        const yieldableCase4 =
                        koconut
                        .none(eachElement => eachElement % 10 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(true)

    })

    it(KoconutArray.prototype.onEach.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable = 
                        koconut
                        .onEach(eachElement => {
                            expect(eachElement).to.be.a("number")
                        })
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()

    })

    it(KoconutArray.prototype.onEachIndexed.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .onEachIndexed((eachIndex, eachElement) => {
                            expect(eachElement - eachIndex).equals(1)
                        })
        expect(yieldable).to.be.instanceOf(KoconutArray)
        await yieldable.process()

    })

    it(KoconutArray.prototype.partition.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .partition(eachElement => eachElement % 2 == 0)
        expect(yieldable).to.be.instanceOf(KoconutPair)
        const result = await yieldable.yield()
        expect(result).eqls(new Pair([2,4], [1,3,5]))

    })

    it(KoconutArray.prototype.plus.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 =
                            koconutCase1
                            .plus(3)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls([1,2,3,4,5,3])

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("abcde")

        const yieldableCase2 =
                            koconutCase2
                            .plus("abc")
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls("abcdeabc".split(''))

    })

    it(KoconutArray.prototype.plusElement.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .plusElement(3)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([1,2,3,4,5,3])

    })

    it(KoconutArray.prototype.random.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .random()
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect((await koconut.yield())!.includes(result!)).equals(true)

    })

    it(KoconutArray.prototype.randomOrNull.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .randomOrNull()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect((await koconut.yield())!.includes(resultCase1!)).equals(true)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > 10)
                        .randomOrNull()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

    it(KoconutArray.prototype.reduce.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable = 
                        koconut
                        .reduce((acc, eachElement) => acc + eachElement)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("abcd")

    })

    it(KoconutArray.prototype.reduceIndexed.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable = 
                        koconut
                        .reduceIndexed((eachIndex, acc, eachElement) => acc + eachElement + eachIndex)
        expect(yieldable).to.be.instanceOf(KoconutPrimitive)
        const result = await yieldable.yield()
        expect(result).equals("ab1c2d3")

    })

    it(KoconutArray.prototype.reduceIndexedOrNull.name, async () => {

        const koconut = KoconutArray.from("abcd")

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .reduceIndexedOrNull((eachIndex, acc, eachElement) => acc + eachElement + eachIndex)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("ab1c2d3")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > "e")
                        .reduceIndexedOrNull((eachIndex, acc, eachElement) => acc + eachElement + eachIndex)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

    it(KoconutArray.prototype.reduceOrNull.name, async () => {

        const koconut = KoconutArray.from("abcd")

        /* Case 1 */
        const yieldableCase1 = 
                        koconut
                        .reduceOrNull((acc, eachElement) => acc + eachElement)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals("abcd")

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > "e")
                        .reduceOrNull((acc, eachElement) => acc + eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

    })

    it(KoconutArray.prototype.reversed.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        const yieldable =
                        koconut
                        .reversed()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls([5,4,3,2,1])

    })

    it(KoconutArray.prototype.runningFold.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .runningFold(
                            "W",
                            (acc, eachElement) => acc + eachElement
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["W", "Wa", "Wab", "Wabc", "Wabcd"])

    })

    it(KoconutArray.prototype.runningFoldindexed.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .runningFoldindexed(
                            "W",
                            (eachIndex, acc, eachElement) => acc + eachElement + eachIndex
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["W", "Wa0", "Wa0b1", "Wa0b1c2", "Wa0b1c2d3"])

    })

    it(KoconutArray.prototype.runningReduce.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .runningReduce((acc, eachElement) => acc + eachElement)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["a", "ab", "abc", "abcd"])

    })

    it(KoconutArray.prototype.runningReduceIndexed.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .runningReduceIndexed((eachIndex, acc, eachElement) => acc + eachElement + eachIndex)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["a", "ab1", "ab1c2", "ab1c2d3"])

    })

    it(KoconutArray.prototype.scan.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .scan(
                            "W",
                            (acc, eachElement) => acc + eachElement
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["W", "Wa", "Wab", "Wabc", "Wabcd"])

    })

    it(KoconutArray.prototype.scanIndexed.name, async () => {

        const koconut = KoconutArray.from("abcd")

        const yieldable =
                        koconut
                        .scanIndexed(
                            "W",
                            (eachIndex, acc, eachElement) => acc + eachElement + eachIndex
                        )
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(["W", "Wa0", "Wa0b1", "Wa0b1c2", "Wa0b1c2d3"])

    })

    it(KoconutArray.prototype.shuffled.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4])

        const yieldable =
                        koconut
                        .shuffled()
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        for(const eachShuffledElement of result!) {
            expect((await koconut.yield())!.includes(eachShuffledElement)).equals(true)
        }

    })

    it(KoconutArray.prototype.single.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .single()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(1)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > 10)
                        .single()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase2.process() }
        catch(error) { expect(error).instanceOf(KoconutNoSuchElementException) }

        /* Case 3 */
        const yieldableCase3 =  
                        koconut
                        .single(eachElement => eachElement % 5 == 0)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(5)

        /* Case 4 */
        const yieldableCase4 =
                        koconut
                        .single(eachElement => eachElement % 2 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase4.process() }
        catch(error) { expect(error).to.be.instanceOf(KoconutConflicException) }

        /* Case 5 */
        const yieldableCase5 =
                        koconut
                        .single(eachElement => eachElement % 10 == 0)
        expect(yieldableCase5).to.be.instanceOf(KoconutPrimitive)
        try { await yieldableCase5.process() }
        catch(error) { expect(error).to.be.instanceOf(KoconutNoSuchElementException) }

    })

    it(KoconutArray.prototype.singleOrNull.name, async () => {

        const koconut = KoconutArray.from([1,2,3,4,5])

        /* Case 1 */
        const yieldableCase1 =
                        koconut
                        .singleOrNull()
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(1)

        /* Case 2 */
        const yieldableCase2 =
                        koconut
                        .filter(eachElement => eachElement > 10)
                        .singleOrNull()
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(null)

        /* Case 3 */
        const yieldableCase3 =  
                        koconut
                        .singleOrNull(eachElement => eachElement % 5 == 0)
        expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive)
        const resultCase3 = await yieldableCase3.yield()
        expect(resultCase3).equals(5)

        /* Case 4 */
        const yieldableCase4 =
                        koconut
                        .singleOrNull(eachElement => eachElement % 2 == 0)
        expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive)
        const resultCase4 = await yieldableCase4.yield()
        expect(resultCase4).equals(null)

        /* Case 5 */
        const yieldableCase5 =
                        koconut
                        .singleOrNull(eachElement => eachElement % 10 == 0)
        expect(yieldableCase5).to.be.instanceOf(KoconutPrimitive)
        const resultCase5 = await yieldableCase5.yield()
        expect(resultCase5).equals(null)

    })

    it(KoconutArray.prototype.sortedBy.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from(["aaa", "cc", "bbbb"])

        const yieldableCase1 =
                        koconutCase1
                        .sortedBy(eachElement => eachElement.length)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(["cc", "aaa", "bbbb"])
        

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("dcba")

        const yieldableCase2 =
                        koconutCase2
                        .sortedBy(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(["a", "b", "c", "d"])
        

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
        const yieldableCase3 =
                        koconutCase3
                        .sortedBy(eachElement => eachElement)
        expect(yieldableCase3).to.be.instanceOf(KoconutArray)
        const resultCase3 = await yieldableCase3.yield()
        const expectedResultArrayCase3 = [
                                            new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                                            new ProductInfo("A-3", "iPhone -- June", 1500),
                                            new ProductInfo("A-1", "Mac Book Pro -- May", 2000)
                                        ]
        expect(resultCase3).eqls(expectedResultArrayCase3)

    })

    it(KoconutArray.prototype.sortedByDescending.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from(["aaa", "cc", "bbbb"])

        const yieldableCase1 =
                        koconutCase1
                        .sortedByDescending(eachElement => eachElement.length)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(["bbbb", "aaa", "cc"])
        

        /* Case 2 */
        const koconutCase2 = KoconutArray.from("dcba")

        const yieldableCase2 =
                        koconutCase2
                        .sortedByDescending(eachElement => eachElement)
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(["d", "c", "b", "a"])
        

        /* Case 3 */
        const koconutCase3 = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
        const yieldableCase3 =
                        koconutCase3
                        .sortedByDescending(eachElement => eachElement)
        expect(yieldableCase3).to.be.instanceOf(KoconutArray)
        const resultCase3 = await yieldableCase3.yield()
        const expectedResultArrayCase3 = [
                                            new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                                            new ProductInfo("A-3", "iPhone -- June", 1500),
                                            new ProductInfo("A-2", "Mac Book Air -- September", 1200)
                                        ]
        expect(resultCase3).eqls(expectedResultArrayCase3)
        
    })

    it(KoconutArray.prototype.sortedWith.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from(["aaa", "cc", "bbbb"])

        const yieldableCase1 =
                        koconutCase1
                        .sortedWith((front, rear) => front.length - rear.length)
        expect(yieldableCase1).to.be.instanceOf(KoconutArray)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(["cc", "aaa", "bbbb"])
        
        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                        new ProductInfo("A-2", "Mac Book Air -- September", 1200),
                        new ProductInfo("A-3", "iPhone -- June", 1500)])
        const yieldableCase2 =
                        koconutCase2
                        .sortedWith((front, rear) => front.name.length - rear.name.length)
        expect(yieldableCase2).to.be.instanceOf(KoconutArray)
        const resultCase2 = await yieldableCase2.yield()
        const expectedResultArrayCase2 = [
                                            new ProductInfo("A-3", "iPhone -- June", 1500),
                                            new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
                                            new ProductInfo("A-2", "Mac Book Air -- September", 1200)
                                        ]
        expect(resultCase2).eqls(expectedResultArrayCase2)

    })

    it(KoconutArray.prototype.substarct.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 = 
                        koconutCase1
                        .substarct([1,3,5])
        expect(yieldableCase1).to.be.instanceOf(KoconutSet)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).eqls(new Set([2,4]))

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
                        new Person("Grace", "Hopper"), 
                        new Person("Jacob", "Bernoulli"), 
                        new Person("Johann", "Bernoulli"), 
                        new Person("Jinyoung", "Luvya")])
        
        const yieldableCase2 =
                        koconutCase2
                        .substarct([
                            new Person("Grace", "Hopper"), 
                            new Person("Jacob", "Bernoulli")
                        ])
        expect(yieldableCase2).to.be.instanceOf(KoconutSet)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).eqls(new Set([
                                            new Person("Jinyoung", "Luvya")
                                        ]))

    })

    it(KoconutArray.prototype.sumBy.name, async () => {

        /* Case 1 */
        const koconutCase1 = KoconutArray.from([1,2,3,4,5])

        const yieldableCase1 =
                            koconutCase1
                            .sumBy(eachElement => eachElement)
        expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive)
        const resultCase1 = await yieldableCase1.yield()
        expect(resultCase1).equals(15)

        /* Case 2 */
        const koconutCase2 = KoconutArray.from([
            new ProductInfo("A-1", "Mac Book Pro -- May", 2000),
            new ProductInfo("A-2", "Mac Book Air -- September", 1200),
            new ProductInfo("A-3", "iPhone -- June", 1500)])

        const yieldableCase2 =
                            koconutCase2
                            .sumBy(eachElement => eachElement.price)
        expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive)
        const resultCase2 = await yieldableCase2.yield()
        expect(resultCase2).equals(4700)

    })

    it(KoconutArray.prototype.take.name, async () => {

        const koconut = KoconutArray.from("abcdefg")

        const yieldable =
                        koconut
                        .take(3)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['a','b','c'])

    })

    it(KoconutArray.prototype.takeLast.name, async () => {

        const koconut = KoconutArray.from("abcdefg")

        const yieldable =
                        koconut
                        .takeLast(3)
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['e','f','g'])

    })

    it(KoconutArray.prototype.takeLastWhile.name, async () => {

        const koconut = KoconutArray.from("abcdefg")

        const yieldable =
                        koconut
                        .takeLastWhile(eachElement => eachElement > 'c')
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['d','e','f','g'])

    })

    it(KoconutArray.prototype.takeWhile.name, async () => {

        const koconut = KoconutArray.from("abcdefg")

        const yieldable =
                        koconut
                        .takeWhile(eachElement => eachElement < 'f')
        expect(yieldable).to.be.instanceOf(KoconutArray)
        const result = await yieldable.yield()
        expect(result).eqls(['a','b','c','d','e'])

    })

})