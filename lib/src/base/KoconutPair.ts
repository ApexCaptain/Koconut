import { Entry, KoconutPrimitive } from "../../internal"

export class Pair<FirstType, SecondType> {
    private firstElement : FirstType
    private secondElement : SecondType
    constructor(firstElement : FirstType, secondElement : SecondType) {
        this.firstElement = firstElement
        this.secondElement = secondElement
    }
    get first() : FirstType { return this.firstElement }
    get second() : SecondType { return this.secondElement }
    toString() : string { return JSON.stringify({first : this.first, second : this.second}) }
    toArray() : Array<FirstType | SecondType> { return [this.first, this.second] }
    toEntry() : Entry<FirstType, SecondType> { return new Entry(this.first, this.second)}
}

export class KoconutPair<FirstType, SecondType> extends KoconutPrimitive<Pair<FirstType, SecondType>> {
    constructor(frist : FirstType | null = null, second : SecondType | null = null) {
        if(frist != null && second != null) super(new Pair(frist, second))
        else super()
    }
}