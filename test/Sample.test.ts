import { EACCES } from "constants"
import { resolve } from "path"
import {
    KoconutArray, KoconutSet, KoconutLoopSignal, KoconutFlow, Flow,
    KoconutLocale, KoconutOption, KoconutDeprecation, KoconutComparable, KoconutMap, Entry, Pair, KoconutPair, KoconutEntry
} from "../lib/module.internal" // Same as -- from 'koconut'

const sampleProcess = async () => {

    const koconutSet = KoconutSet.of(15, 4, 33)

    const sortedNumbers = await koconutSet
                            .sortedWith((front, rear) => front - rear)
                            .yield()
    console.log(sortedNumbers)
    // ↑ Set { 4, 15, 33 }

    const descSortedNumbers = await koconutSet
                                .sortedWith((front, rear) => rear - front)
                                .yield()
    console.log(descSortedNumbers)
    // ↑ Set { 4, 15, 33 }

    const sortedNumbersBy1sDigit = await koconutSet
                            .sortedWith((front, rear) => front % 10 - rear % 10)
                            .yield()
    console.log(sortedNumbersBy1sDigit)
    // ↑ Set { 4, 15, 33 }

}
sampleProcess()

/*
    const stringKoconutSet = KoconutSet.of("abcd", "ab", "a", "abc")

    const descSortedStringByItsLength = await stringKoconutSet
                                        .sortedByDescending(eachString => eachString.length)
                                        .yield()
    console.log(descSortedStringByItsLength)
    // ↑ Set { 'abcd', 'abc', 'ab', 'a' }

    class Person implements KoconutComparable {
        name : string
        age : number
        constructor(name : string, age : number) {
            this.name = name
            this.age = age
        }
        compareTo(other : Person) : number {
            return this.name.length - other.name.length
        }
    }
    const personKoconutSet = KoconutSet.of(
        new Person("Keanu Reeves", 56),
        new Person("Robert Downey Jr.", 55),
        new Person("Christian Bale", 46)
    )

    // You can do it by async function.
    const descSortedPeopleByWhoseAge = await personKoconutSet
                                        .sortedByDescending(async eachPerson => eachPerson.age)
                                        .yield()
    console.log(descSortedPeopleByWhoseAge)
    // ↑ Set {
    //        Person { name: 'Keanu Reeves', age: 56 },
    //        Person { name: 'Robert Downey Jr.', age: 55 },
    //        Person { name: 'Christian Bale', age: 46 }
    //       }

    // And of course, by returning Promise.
    const descSortedPeopleByWhoseName = await personKoconutSet
                                        .sortedByDescending(eachPerson => new Promise(resolve => {
                                            resolve(eachPerson.name)
                                        }))
                                        .yield()
    console.log(descSortedPeopleByWhoseName)
    // ↑ Set {
    //        Person { name: 'Robert Downey Jr.', age: 55 },
    //        Person { name: 'Keanu Reeves', age: 56 },
    //        Person { name: 'Christian Bale', age: 46 }
    //       }
   
    // The class Person itself implements KoconutComparable.
    // So, it is a Comparable Type.
    // If you're using JavaScript you can do something similar as following
    // by extending KoconutComparable or simply adding method 'compareTo' to your custom class.
    const descSortedPeople = await personKoconutSet
                                .sortedByDescending(eachPerson => eachPerson)
                                .yield()
    console.log(descSortedPeople)
    // ↑ Set {
    //        Person { name: 'Robert Downey Jr.', age: 55 },
    //        Person { name: 'Christian Bale', age: 46 },
    //        Person { name: 'Keanu Reeves', age: 56 }
    //       }
*/