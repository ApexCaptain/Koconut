'use strict'

import { KoconutPrimitive, KoconutOpener, Entry } from "../KoconutBase"

export class KoconutMap<KeyType, ValueType> extends KoconutPrimitive<Map<KeyType, ValueType>> {
    
    /* Map */
    keys = new Set<KeyType>()
    entries = new Set<Entry<KeyType, ValueType>>()
    values = new Array<ValueType>() 
    size = 0
    constructor(data : Map<KeyType, ValueType> | null = null) { 
        super(data)
        if(data != null) {
            for(const [key, value] of data.entries()) {
                this.keys.add(key)
                this.entries.add(new Entry(key, value))
                this.values.push(value)
            }
            this.size = data.size
        }
    }

    containsKey(
        key : KeyType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.keys.has(key))
        return koconutToReturn

    }


    containsValue(
        value : ValueType
    ) : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.values.includes(value))
        return koconutToReturn

    }


    get(
        key : KeyType
    ) : KoconutPrimitive<ValueType | null> {

        const koconutToReturn = new KoconutPrimitive<ValueType | null>();
        (koconutToReturn as any as KoconutOpener<ValueType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || !this.data.has(key)) return null
                else return this.data.get(key)!
            })
        return koconutToReturn

    }


    getOrDefault(
        key : KeyType,
        defaultValue : ValueType
    ) : KoconutPrimitive<ValueType> {

        const koconutToReturn = new KoconutPrimitive<ValueType>();
        (koconutToReturn as any as KoconutOpener<ValueType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || !this.data.has(key)) return defaultValue
                else return this.data.get(key)!
            })
        return koconutToReturn

    }


    isEmpty() : KoconutPrimitive<boolean> {

        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.size == 0)
        return koconutToReturn

    }
}