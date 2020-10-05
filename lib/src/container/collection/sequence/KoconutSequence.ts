`use strict`

import {
    KoconutCollection, Entry,
    KoconutOpener
} from "../../../../module.internal"

import { EventEmitter } from "events"
export class Sequence<DataType> extends EventEmitter implements Iterable<DataType> {

    private static newDatumInsertedEvent = "newDatumInserted"
    private static dataScanningCompletedEvent = "dataScanningCompleted"

    private mPentDataSize = 0
    private mChainedSequence : Sequence<DataType> | null = null
    private mDataArray = new Array<DataType>();

    [Symbol.iterator]() : Iterator<DataType> {
        return this.mDataArray[Symbol.iterator]()
    }

    constructor(
        srcSequecne : Iterable<DataType> | null = null
    ) {
        super()
        if(srcSequecne != null) {
            for(const eachDatum of srcSequecne) {
                this.mPentDataSize++
                this.mDataArray.push(eachDatum)
            }
        }
    }

    get dataArray() : Array<DataType> {
        return this.mDataArray
    }

    private setDatum(
        datum : DataType
    ) {
        const index = this.mDataArray.push(datum) - 1
        this.emit(Sequence.newDatumInsertedEvent, index, datum)
    }

    private onNewDatumInserted(
        onNewDatumInsertedListener : (index : number, datum : DataType) => void | Promise<void>,
        targetSequence : Sequence<any> | null = null
    ) {

        let count = 0
        this.mChainedSequence = targetSequence
        const mediatedListener = async (index : number, datum : DataType) => {
            console.log(datum)
            await onNewDatumInsertedListener(index, datum)
            if(this.mPentDataSize - 1 == count ++) {
                console.log("com")
                this.emit(Sequence.dataScanningCompletedEvent)
                if(targetSequence != null) {
                    targetSequence.mPentDataSize = targetSequence.mDataArray.length
                    if(targetSequence.mChainedSequence == null) targetSequence.emit(Sequence.dataScanningCompletedEvent)
                }
            }
        }
        this.on(Sequence.newDatumInsertedEvent, mediatedListener)
        this.once(Sequence.dataScanningCompletedEvent, () => {
            this.removeListener(Sequence.newDatumInsertedEvent, mediatedListener)
        })
        if(this.dataArray.length != 0) this.dataArray.forEach((datum, index) => this.emit(Sequence.newDatumInsertedEvent, index, datum))
        /*
        let count = 0;
        this.mChainedSequence = targetFlow
        const mediatedListener = async (index : number, datum : DataType) => {
            await onNewDatumInsertedListener(index, datum)
            if(this.mPentDataSize - 1 == count++) {
                this.emit(Sequence.dataScanningCompletedEvent)
                if(targetFlow != null) {
                    targetFlow.mPentDataSize = targetFlow.mInnerDataMap.size
                    if(targetFlow.mChainedFlow == null) targetFlow.emit(Flow.dataScanningCompletedEvent)
                }
            }
        }
        this.on(Flow.newDatumInsertedEvent, mediatedListener)
        this.once(Flow.dataScanningCompletedEvent, () => this.removeListener(Flow.newDatumInsertedEvent, mediatedListener))
        if(this.mInnerDataMap.size != 0) this.mInnerDataMap.forEach((datum, id) => this.emit(Flow.newDatumInsertedEvent, id, datum))
        */
        
    }

}

export class KoconutSequence<DataType> extends KoconutCollection<DataType, Sequence<DataType>> {

    private mIsChained = false

    async validate(data : Sequence<DataType> | null) {
        if(data != null) {
            this.combinedDataWrapper = data
        }
    }

    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutSequence<DataType> {

        this.mIsChained = true
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutSequence<DataType>();
        (koconutToReturn as any as KoconutOpener<Sequence<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSequence = new Sequence<DataType>()
                if(this.data != null) {
                    this.data['onNewDatumInserted'](
                        async (_, element) => {
                            if(await predicate(element))
                                processedSequence['setDatum'](element)
                        },
                        processedSequence
                    )
                } else processedSequence.emit(Sequence['dataScanningCompletedEvent'])
                return processedSequence
            })
        return koconutToReturn

    }


    async yield() : Promise<Sequence<DataType>> {
        return new Promise(async resolve => {
            await this.process()
            if(this.mIsChained) resolve(this.data!)
            else {
                if(!this.processor) {
                    console.log("as")
                    resolve(this.data!)
                }
                else this.data!.once(Sequence['dataScanningCompletedEvent'], () => {
                    resolve(this.data!)
                })
            }
        })
    }

}