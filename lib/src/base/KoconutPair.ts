import { 
    /* Base */
    Entry, 

    /* Tool */
    KoconutPrimitive, KoconutTypeChecker,

    /* Protol */
    KoconutEquatable
} from "../../internal"

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
     * Constructor for {@link Pair}.
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
     * Truns this {@link Pair} instance into a simple JSON object string.
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
     * Truns this {@link Pair} instance into a simple array.
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
     * {@link Pair} class implements {@link KoconutEquatable}. The equality check process
     * of this is done simply by using '==' operator when the FirstType or SecondType is not {@link KoconutEquatable},
     * otherwise, by using method '{@link KoconutEquatable.equalsTo equalsTo}' to the corresponding element.
     * Please, have a check following example.
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
    equalsTo(other : Pair<FirstType, SecondType>) : boolean {
        let doseEquals = false

        if(KoconutTypeChecker.checkIsEquatable(this.firstElement) && KoconutTypeChecker.checkIsEquatable(other.firstElement)) 
            doseEquals = this.firstElement.equalsTo(other.firstElement)
        else doseEquals = this.firstElement == other.firstElement

        if(doseEquals) {
            if(KoconutTypeChecker.checkIsEquatable(this.secondElement) && KoconutTypeChecker.checkIsEquatable(other.secondElement))
                doseEquals = this.secondElement.equalsTo(other.secondElement)
            else doseEquals = this.secondElement == other.secondElement
        }
        
        return doseEquals
    }
}

export class KoconutPair<FirstType, SecondType> extends KoconutPrimitive<Pair<FirstType, SecondType>> implements KoconutEquatable {
    constructor(frist : FirstType | null = null, second : SecondType | null = null) {
        if(frist != null && second != null) super(new Pair(frist, second))
        else super()
    }

    equalsTo(other : KoconutPair<FirstType, SecondType>) {
        if(this.data != null && other.data != null) {
            if(KoconutTypeChecker.checkIsEquatable(this.data) && KoconutTypeChecker.checkIsEquatable(other.data)) return this.data.equalsTo(other.data)
            else return this.data == other.data
        }
        return false
    }
}