import { equal } from "assert"
import { 
    /* Base */
    Entry, 

    /* Tool */
    KoconutPrimitive, KoconutTypeChecker, KoconutOpener,

    /* Protol */
    KoconutEquatable
} from "../../../module.internal"
import { KoconutBoolean } from "./KoconutBoolean"

/**
 * Represents a generic pair of two Values. There is no meaning attached to values
 * in this class. It can be used for any purpose. Pair exhibits values semantics,
 * i.e. two pairs are equal if both components are equal. However, if any of those
 * two values are instance of class, you'd better make the class explicitly distinguishable
 * by inheriting {@link KoconutEquatable}. Please, check the {@link Pair.equalsTo example of 'equalsTo' method}
 * @see
 * <pre>
 * -- Base --
 * {@link KoconutPair}, {@link Entry}, {@link KoconutEntry}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param FirstType The type of the first value.
 * @param SecondType The type of the second value.
 */
export class Pair<FirstType, SecondType> implements KoconutEquatable {

    private firstElement : FirstType
    private secondElement : SecondType

    /**
     * Create a {@link Pair} instance by iterable two values pair.
     * 
     * @param pair Values pair of first/second as iterable.
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair)
     * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
     * ```
     */
    static from<FirstType, SecondType>(pair : [FirstType, SecondType]) : Pair<FirstType, SecondType> {
        return new Pair(pair[0], pair[1])
    }

    /**
     * Constructor of {@link Pair}.
     * 
     * @param firstElement FirstType element.
     * @param secondElement SecondType element.
     */
    constructor(firstElement : FirstType, secondElement : SecondType) {
        this.firstElement = firstElement
        this.secondElement = secondElement
    }
    /**
     * Returns the first value of this first/second pair.
     * @returns The first value of this first/second pair.
     */
    get first() : FirstType { return this.firstElement }

    /**
     * Returns the second value of this first/second pair.
     * @returns The second value of this first/second pair.
     */
    get second() : SecondType { return this.secondElement }

    /**
     * Turns this {@link Pair} instance into a simple JSON object string.
     * 
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toString()) // Or, you can use console.log(`${myPair}`)
     * // ↑ {"first":"Apex","second":"Captain"}
     * ```
     */
    toString() : string { return JSON.stringify({first : this.first, second : this.second}) }

    /**
     * Turns this {@link Pair} instance into a simple array.
     * 
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toArray())
     * // ↑ [ 'Apex', 'Captain' ]
     * ```
     */
    toArray() : Array<FirstType | SecondType> { return [this.first, this.second] }

    /**
     * Turns this {@link Pair} instance into a simple {@link Entry}
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toEntry())
     * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
     * ```
     */
    toEntry() : Entry<FirstType, SecondType> { return new Entry(this.first, this.second)}

    /**
     * Class {@link Pair} implments {@link KoconutEquatable}. The '{@link KoconutEquatable.equalsTo equalsTo}' method of
     * this is basically check each individual element (first/second) are same or not. When the type of each element
     * is child of {@link KoconutEquatable}, it'd be done by using its '{@link KoconutEquatable.equalsTo equalsTo}' method.
     * Otherwise, it'd be done simply by '==' operator.
     * @param other 
     * 
     * @example
     * ```typescript
     *   // Case 1 -- All values are simply number or string 
     *   const myPairCase1_01 = Pair.from([10, 20])
     *   const myPairCase1_02 = Pair.from([10, 20])
     *   console.log(`${myPairCase1_01.equalsTo(myPairCase1_02)}`)
     *   // ↑ true
     *
     *   const myPairCase1_03 = Pair.from(["Apex", "Captain"])
     *   const myPairCase1_04 = Pair.from(["Apex", "Captain"])
     *   console.log(`${myPairCase1_03 == myPairCase1_04}`)
     *   // ↑ false
     *   console.log(`${myPairCase1_03.equalsTo(myPairCase1_04)}`)
     *   // ↑ true
     *
     *   // Case 2 -- First Type is indistinguishable class
     *   class MyClass {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *   }
     *   const myPairCase2_01 = Pair.from([new MyClass("Apex"), "Captain"])
     *   const myPairCase2_02 = Pair.from([new MyClass("Apex"), "Captain"])
     *   console.log(`${myPairCase2_01.equalsTo(myPairCase2_02)}`)
     *   // ↑ false
     *
     *   // Case 3 -- First Type is distinguishable class 
     *   class MyDistinguishableClass implements KoconutEquatable {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *       equalsTo(other : MyDistinguishableClass) : boolean {
     *           return this.value == other.value
     *       }
     *   }
     *   const myPairCase3_01 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   const myPairCase3_02 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   console.log(`${myPairCase3_01.equalsTo(myPairCase3_02)}`)
     *   // ↑ true
     * ```
     */
    equalsTo(other : Pair<FirstType, SecondType>) : boolean | KoconutBoolean {

        if(KoconutTypeChecker.checkIsEquatable(this.firstElement) && KoconutTypeChecker.checkIsEquatable(other.firstElement)) {
            const firstCompareResult = this.firstElement.equalsTo(other.firstElement)
            if(firstCompareResult instanceof KoconutPrimitive) {
                const koconutToReturn = new KoconutBoolean();
                (koconutToReturn as any as KoconutOpener<boolean>)
                    .setProcessor(async () => {
                        var thisValue = koconutToReturn['data']!
                        if(!thisValue) return false
                        if(KoconutTypeChecker.checkIsEquatable(this.secondElement) && KoconutTypeChecker.checkIsEquatable(other.secondElement)) {
                            const compareResult = this.secondElement.equalsTo(other.secondElement)
                            if(compareResult instanceof KoconutPrimitive) return await compareResult.yield()
                            else return compareResult
                        } else return this.secondElement == other.secondElement
                    })
                return koconutToReturn
            } else {
                if(!firstCompareResult) return false
                if(KoconutTypeChecker.checkIsEquatable(this.secondElement) && KoconutTypeChecker.checkIsEquatable(other.secondElement)) {
                    const secondCompareResult = this.secondElement.equalsTo(other.secondElement)
                    if(secondCompareResult instanceof KoconutPrimitive) return KoconutBoolean['fromPrimitive'](secondCompareResult)
                    else return secondCompareResult
                } else return this.secondElement == other.secondElement
            }
        } else {
            if(this.firstElement != other.firstElement) return false;
            if(KoconutTypeChecker.checkIsEquatable(this.secondElement) && KoconutTypeChecker.checkIsEquatable(other.secondElement)) {
                const compareResult = this.secondElement.equalsTo(other.secondElement)
                if(compareResult instanceof KoconutPrimitive) return KoconutBoolean['fromPrimitive'](compareResult)
                else return compareResult
            } else return this.secondElement == other.secondElement
        }

    }
}

/**
 * Koconut Wrapper class for {@link Pair}
 * 
 * @see
 * <pre>
 * -- Base --
 * {@link Pair}, {@link Entry}, {@link KoconutPair}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param FirstType Check for {@link Pair}
 * @param SecondType Check for {@link Pair}
 */
export class KoconutPair<FirstType, SecondType> extends KoconutPrimitive<Pair<FirstType, SecondType>> implements KoconutEquatable {
    
    /**
     * Constructor of {@link KoconutPair}
     * 
     * @param first FirstType element of inner {@link Pair} instance.
     * @param second SecondType element of inner {@link Pair} instance.
     */
    constructor(first : FirstType | null = null, second : SecondType | null = null) {
        if(first != null && second != null) super(new Pair(first, second))
        else super()
    }


    /**
     * Processes all the chained object and returns original {@link KoconutPair} instance.
     * 
     * @category Processor
     * 
     * @since 1.0.15
     * 
     * @example
     * ```typescript
     * const koconutPair = await new KoconutPair(0, 1)
     *                                     .retrieve()
     *                                     
     * console.log(koconutPair)
     * // ↑ KoconutPair {
     * //   isValidated: true,
     * //   data: Pair { firstElement: 0, secondElement: 1 }
     * // }
     * ```
     */
    async retrieve() : Promise<KoconutPair<FirstType, SecondType>> {
        await super.retrieve()
        return this
    }

    /**
     * Class {@link KoconutPair} implements {@link KoconutEquatable}. The equality check process
     * is done by using '{@link Pair.equalsTo equalsTo method of Pair}'
     * @param other 
     */
    equalsTo(other : KoconutPair<FirstType, SecondType>) {
        if(this.data != null && other.data != null) return this.data.equalsTo(other.data)
        return false
    }
}