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
        onNewDatumInserted : (index : number, datum : DataType) => void | Promise<void>,
        targetSequence : Sequence<any> | null = null
    ) {
        let count = 0
        this.mChainedSequence = targetSequence
        let isRunning = false
        const entryQueue = new Array<Entry<number, DataType>>()
        const mediatedListener = async (index : number, datum : DataType) => {
            await onNewDatumInserted(index, datum)
            if(this.mPentDataSize - 1 == count++) {
                this.emit(Sequence.dataScanningCompletedEvent)
                if(targetSequence != null) {
                    targetSequence.mPentDataSize = targetSequence.mDataArray.length
                    if(targetSequence.mChainedSequence == null) targetSequence.emit(Sequence.dataScanningCompletedEvent)
                }
            }
        }
        const queueController = (index : number, datum : DataType) => {
            if(!isRunning) {
                isRunning = true
                const currentEntry = entryQueue.shift()

                // ToDo 큐 관리 코드
                isRunning = false
            } else entryQueue.push(new Entry(index, datum))
        }
        this.on(Sequence.newDatumInsertedEvent, queueController)
        this.once(Sequence.dataScanningCompletedEvent, () => this.removeListener(
            Sequence.newDatumInsertedEvent,
            queueController
        ))
        if(this.mDataArray.length != 0) {
            for(const [index, element] of this.dataArray.entries())
                this.emit(Sequence.newDatumInsertedEvent, index, element)
        }
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
                if(this.processor == null) resolve(this.data!)
                else this.data!.once(Sequence['dataScanningCompletedEvent'], () => {
                    resolve(this.data!)
                })
            }
        })
    }

}