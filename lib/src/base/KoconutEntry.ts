`use strict`

import { 
    /* Base */
    Pair, KoconutPrimitive,

    /* Protocol */
    KoconutEquatable
} from "../../internal"

export class Entry<KeyType, ValueType> implements KoconutEquatable {
    protected keyElement : KeyType
    protected valueElement : ValueType
    constructor(keyElement : KeyType, valueElement : ValueType) {
        this.keyElement = keyElement
        this.valueElement = valueElement
    }
    get key() : KeyType { return this.keyElement }
    get value() : ValueType { return this.valueElement }
    toString() : string { return this.toPair().toString() }
    toArray() : Array<KeyType | ValueType> { return this.toPair().toArray() }
    toPair() : Pair<KeyType, ValueType> { return new Pair(this.key, this.value) }
    equalsTo(other : Entry<KeyType, ValueType>) : boolean {
        return this.key == other.key
    }
}

export class KoconutEntry<KeyType, ValueType> extends KoconutPrimitive<Entry<KeyType, ValueType>> {
    constructor(key : KeyType | null = null, value : ValueType | null = null) {
        if(key != null && value != null) super(new Entry(key, value))
        else super()
    }
}

export class MutableEntry<KeyType, ValueType> extends Entry<KeyType, ValueType> {
    set key(key : KeyType) { this.keyElement = key }
    set value(value : ValueType) { this.valueElement = value}
}

export class KoconutMutableEntry<KeyType, ValueType> extends KoconutPrimitive<MutableEntry<KeyType, ValueType>> {

}