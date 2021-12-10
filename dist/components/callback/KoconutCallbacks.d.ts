import { KoconutLoopSignal } from '../../module';
export declare type IndexedSelector<InputType, ReturnType> = (
  index: number,
  data: InputType,
) => ReturnType | Promise<ReturnType>;
export declare type Selector<InputType, ReturnType> = (
  data: InputType,
) => ReturnType | Promise<ReturnType>;
export declare type Transformer<InputType, TransformedType> = Selector<
  InputType,
  TransformedType
>;
export declare type IndexedTransformer<InputType, TransformedType> =
  IndexedSelector<InputType, TransformedType>;
export declare type Zipper<InputType1, InputType2, ResultType> = (
  data1: InputType1,
  data2: InputType2,
) => ResultType | Promise<ResultType>;
export declare type Generator<OutputType> = Transformer<number, OutputType>;
export declare type Processor<InputType> = Selector<InputType, void>;
export declare type Predicator<InputType> = Selector<InputType, boolean>;
export declare type IndexedPredicator<InputType> = IndexedSelector<
  InputType,
  boolean
>;
export declare type Action<InputType> = Selector<
  InputType,
  boolean | KoconutLoopSignal | void
>;
export declare type IndexedAction<InputType> = IndexedSelector<
  InputType,
  boolean | KoconutLoopSignal | void
>;
export declare type Comparator<InputType> = (
  front: InputType,
  rear: InputType,
) => number | Promise<number>;
export declare type Operator<InputType, ResultType> = (
  acc: ResultType,
  element: InputType,
) => ResultType | Promise<ResultType>;
export declare type IndexedOperator<InputType, ResultType> = (
  index: number,
  acc: ResultType,
  element: InputType,
) => ResultType | Promise<ResultType>;
