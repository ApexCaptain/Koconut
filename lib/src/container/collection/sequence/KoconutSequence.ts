`use strict`

import {
    /* Container */
    KoconutCollection,

    /* Enum */
    KoconutLoopSignal,

    /* Tool */
    KoconutOpener
} from "../../../../module.internal"

export class Sequence<DataType> implements Iterable<DataType> {

    private isFinished = false
    private mLastPrevIndex = 0
    private mParentSequence : Sequence<any> | null = null
    private mTransformer : ((index : number, srcDatum : any) => void | DataType | Promise<void | DataType>) | null = null
    private mInnerDataArray = new Array<DataType>();
    [Symbol.iterator]() : Iterator<DataType> {
        return this.mInnerDataArray[Symbol.iterator]()
    }

    constructor(
        srcSequence : Iterable<DataType> | null = null
    ) {
        if(srcSequence != null) {
            for(const eachDatum of srcSequence) {
                this.mInnerDataArray.push(eachDatum)
            }
        }
    }

    static of<DataType>(
        ...srcSequence : DataType[]
    ) : Sequence<DataType> {
        return new Sequence(srcSequence)
    }

    static from<DataType>(
        srcSequence : Iterable<DataType> | null = null
    ) : Sequence<DataType> {
        return new Sequence(srcSequence)
    }

    async done() : Promise<Sequence<DataType>> {
        let index = 0
        if(this.mParentSequence) this.mParentSequence.isFinished = false
        while(!this.isFinished) {
            await this.getDatum(index++)
        }
        
        this.mParentSequence = null
        this.mTransformer = null
        this.mLastPrevIndex = 0
        return this
    }

    private async getDatum(index : number) : Promise<void | DataType> {
        if(this.mParentSequence == null) {
            if(index == this.mInnerDataArray.length - 1) this.isFinished = true
            return this.mInnerDataArray[index]
        }
        else {
            const fetchedResult = await this.mParentSequence.getDatum(index)
            if(fetchedResult) {
                const result = await this.mTransformer!(this.mLastPrevIndex++, fetchedResult)
                if(this.mParentSequence.isFinished) this.isFinished = true
                if(result) this.mInnerDataArray.push(result)
                return result
            }
        }
    }

    private chainSequence<ParentType>(
        prevSequence : Sequence<ParentType>,
        transformer : (index : number, srcDatum : ParentType) => void | DataType | Promise<void | DataType>
    ) : Sequence<DataType> {
        this.mParentSequence = prevSequence
        this.mTransformer = transformer
        return this
    }

}

export class KoconutSequence<DataType> extends KoconutCollection<DataType, Sequence<DataType>> {


    constructor(srcSequence : Iterable<DataType> | null = null) {
        super()
        this.data = new Sequence(srcSequence)
    }


    static of<DataType>(
        ...srcSequence : DataType[]
    ) : KoconutSequence<DataType> {
        return new KoconutSequence(srcSequence)
    }

    
    static from<DataType>(
        srcSequence : Iterable<DataType> | null = null
    ) : KoconutSequence<DataType> {
        return new KoconutSequence(srcSequence)
    }

















    
    // Iterator
    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSequence<DataType> {

        action.bind(thisArg)
        const koconutToReturn = new KoconutSequence<DataType>();
        (koconutToReturn as any as KoconutOpener<Sequence<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let continueProcess = true
                return new Sequence<DataType>()['chainSequence'](
                    this.data!,
                    async (_, srcDatum) => {
                        if(continueProcess) {
                            const signal = await action(srcDatum)
                            if(signal == false || signal == KoconutLoopSignal.BREAK)
                                continueProcess = false
                        }
                        return srcDatum
                    }
                )
            })
        return koconutToReturn

    }


    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutSequence<DataType> {

        action.bind(thisArg)
        const koconutToReturn = new KoconutSequence<DataType>();
        (koconutToReturn as any as KoconutOpener<Sequence<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let continueProcess = true
                return new Sequence<DataType>()['chainSequence'](
                    this.data!,
                    async (index, srcDatum) => {
                        if(continueProcess) {
                            const signal = await action(index, srcDatum)
                            if(signal == false || signal == KoconutLoopSignal.BREAK)
                                continueProcess = false
                        }
                        return srcDatum
                    }
                )
            })
        return koconutToReturn

    }




    


















    
    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSequence<DataType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutSequence<DataType>();
        (koconutToReturn as any as KoconutOpener<Sequence<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return new Sequence<DataType>()['chainSequence'](
                    this.data!,
                    async (_, srcDatum) => {
                        if(await predicate(srcDatum)) return srcDatum
                    }
                )
            })
        return koconutToReturn

    }


    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSequence<DataType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutSequence<DataType>();
        (koconutToReturn as any as KoconutOpener<Sequence<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                return new Sequence<DataType>()['chainSequence'](
                    this.data!,
                    async (index, srcDatum) => {
                        if(await predicate(index, srcDatum)) return srcDatum
                    }
                )
            })
        return koconutToReturn

    }




}
