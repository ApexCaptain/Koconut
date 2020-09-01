`use strict`

import { Pair, KoconutPrimitive } from "../../internal"

export class Entry<KeyType, ValueType> {
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
}

export class KoconutEntry<KeyType, ValueType> extends KoconutPrimitive<Entry<KeyType, ValueType>> {

}

export class MutableEntry<KeyType, ValueType> extends Entry<KeyType, ValueType> {
    set key(key : KeyType) { this.keyElement = key }
    set value(value : ValueType) { this.valueElement = value}
}

export class KoconutMutableEntry<KeyType, ValueType> extends KoconutPrimitive<MutableEntry<KeyType, ValueType>> {

}