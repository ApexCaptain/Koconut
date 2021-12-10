import { KoconutCollection, KoconutLoopSignal } from '../../../../module';
export declare class Sequence<DataType> implements Iterable<DataType> {
  #private;
  [Symbol.iterator](): Iterator<DataType>;
  constructor(srcSequence?: Iterable<DataType> | null);
  static of<DataType>(...srcSequence: DataType[]): Sequence<DataType>;
  static from<DataType>(
    srcSequence?: Iterable<DataType> | null,
  ): Sequence<DataType>;
  done(): Promise<Sequence<DataType>>;
  private getDatum;
  private chainSequence;
}
export declare class KoconutSequence<DataType> extends KoconutCollection<
  DataType,
  Sequence<DataType>
> {
  constructor(srcSequence?: Iterable<DataType> | null);
  static of<DataType>(...srcSequence: DataType[]): KoconutSequence<DataType>;
  static from<DataType>(
    srcSequence?: Iterable<DataType> | null,
  ): KoconutSequence<DataType>;
  onEach(
    action: (
      element: DataType,
    ) =>
      | boolean
      | KoconutLoopSignal
      | void
      | Promise<boolean | KoconutLoopSignal | void>,
    thisArg?: any,
  ): KoconutSequence<DataType>;
  onEachIndexed(
    action: (
      index: number,
      element: DataType,
    ) =>
      | boolean
      | KoconutLoopSignal
      | void
      | Promise<boolean | KoconutLoopSignal | void>,
    thisArg?: any,
  ): KoconutSequence<DataType>;
  filter(
    predicate: (element: DataType) => boolean | Promise<boolean>,
    thisArg?: any,
  ): KoconutSequence<DataType>;
  filterIndexed(
    predicate: (index: number, element: DataType) => boolean | Promise<boolean>,
    thisArg?: any,
  ): KoconutSequence<DataType>;
}
