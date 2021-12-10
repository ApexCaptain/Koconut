// / <reference types="node" />
import { Entry, Pair, KoconutIterable } from '../../../module';
import { EventEmitter } from 'events';
export declare class Flow<DataType>
  extends EventEmitter
  implements Iterable<Entry<number, DataType>>
{
  private static newDatumInsertedEvent;
  private static dataScanningCompletedEvent;
  private mPentDataSize;
  private mChainedFlow;
  private mInnerDataMap;
  [Symbol.iterator](): Iterator<Entry<number, DataType>>;
  constructor(
    srcSequence?: Iterable<
      [number, DataType] | Entry<number, DataType> | Pair<number, DataType>
    > | null,
  );
  static of<DataType>(
    ...srcSequence: (
      | [number, DataType]
      | Entry<number, DataType>
      | Pair<number, DataType>
    )[]
  ): Flow<DataType>;
  static from<DataType>(
    srcSequence?: Iterable<
      [number, DataType] | Entry<number, DataType> | Pair<number, DataType>
    > | null,
  ): Flow<DataType>;
  static ofSimple<DataType>(...srcSequence: DataType[]): Flow<DataType>;
  static fromSimple<DataType>(
    srcSequence?: Iterable<DataType> | null,
  ): Flow<DataType>;
  private sort;
  get dataArray(): Array<DataType>;
  get dataEntries(): Array<Entry<number, DataType>>;
  private setDatum;
  private onNewDatumInserted;
}
export declare class KoconutFlow<DataType> extends KoconutIterable<
  Entry<number, DataType>,
  Entry<number, DataType>,
  Flow<DataType>,
  Flow<DataType>
> {
  private mIsChained;
  validate(data: Flow<DataType> | null): Promise<void>;
  constructor(
    srcSequence?: Iterable<
      [number, DataType] | Entry<number, DataType> | Pair<number, DataType>
    > | null,
  );
  static from<DataType>(
    srcSequence?: Iterable<
      [number, DataType] | Entry<number, DataType> | Pair<number, DataType>
    > | null,
  ): KoconutFlow<DataType>;
  static of<DataType>(
    ...srcSequence: (
      | [number, DataType]
      | Entry<number, DataType>
      | Pair<number, DataType>
    )[]
  ): KoconutFlow<DataType>;
  static fromSimple<DataType>(
    srcSequence?: Iterable<DataType> | null,
  ): KoconutFlow<DataType>;
  static ofSimple<DataType>(...srcSequence: DataType[]): KoconutFlow<DataType>;
  mapFlow<ResultDataType>(
    transform: (element: DataType) => ResultDataType | Promise<ResultDataType>,
    thisArg?: any,
  ): KoconutFlow<ResultDataType>;
  yield(): Promise<Flow<DataType>>;
}
