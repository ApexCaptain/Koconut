`use strict`

import {
    KoconutPrimitive, KoconutOpener,
    KoconutArray
} from "../../internal"

export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutPrimitive<WrapperType> implements Iterable<DataType>{

    /* Iterable */
    [Symbol.iterator]() : Iterator<DataType> {
        return (this.data as Iterable<DataType>)[Symbol.iterator]()
    }

    /* Properties */
    private mSize = 0
    size() : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }
    private mIndices = new Array<number>()
    indices() : KoconutArray<number> {

        const koconutToReturn = new KoconutArray<number>();
        (koconutToReturn as any as KoconutOpener<Array<number>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mIndices)
        return koconutToReturn

    }
    constructor(data : WrapperType | null = null) {
        super(data)
        if(this.data) {
            this.mSize = Array.from(data as WrapperType).length
            Object
                .keys(Array.from(this.data))
                .map(eachString => parseInt(eachString))
                .forEach(eachIndex => this.mIndices.push(eachIndex))
        }
    }

    /* Funcions */
    all(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(const eachDatum of this.data)
                    if(!await predicate(eachDatum)) return false
                return true
            })
        return koconutToReturn

    }


    any(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<boolean> {

        if(predicate) predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<boolean>();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                if(predicate) {
                    for(const eachDatum of this.data) 
                        if(await predicate(eachDatum)) return true
                    return false
                } else return Array.from(this.data).length != 0
            })
        return koconutToReturn

    }


    asIterable() : KoconutPrimitive<Iterable<DataType> | null> {

        const koconutToReturn = new KoconutPrimitive<Iterable<DataType> | null>();
        (koconutToReturn as any as KoconutOpener<Iterable<DataType> | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.data == null ? null : Array.from(this.data) as Iterable<DataType>)
        return koconutToReturn

    }

}