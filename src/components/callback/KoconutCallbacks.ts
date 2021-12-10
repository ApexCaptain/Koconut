`use strict`;
import { KoconutLoopSignal } from '../../module';

export type IndexedSelector<InputType, ReturnType> = (
  index: number,
  data: InputType,
) => ReturnType | Promise<ReturnType>;

export type Selector<InputType, ReturnType> = (
  data: InputType,
) => ReturnType | Promise<ReturnType>;

export type Transformer<InputType, TransformedType> = Selector<
  InputType,
  TransformedType
>;

export type IndexedTransformer<InputType, TransformedType> = IndexedSelector<
  InputType,
  TransformedType
>;

export type Zipper<InputType1, InputType2, ResultType> = (
  data1: InputType1,
  data2: InputType2,
) => ResultType | Promise<ResultType>;

export type Generator<OutputType> = Transformer<number, OutputType>;

export type Processor<InputType> = Selector<InputType, void>;

export type Predicator<InputType> = Selector<InputType, boolean>;

export type IndexedPredicator<InputType> = IndexedSelector<InputType, boolean>;

export type Action<InputType> = Selector<
  InputType,
  boolean | KoconutLoopSignal | void
>;

export type IndexedAction<InputType> = IndexedSelector<
  InputType,
  boolean | KoconutLoopSignal | void
>;

export type Comparator<InputType> = (
  front: InputType,
  rear: InputType,
) => number | Promise<number>;

export type Operator<InputType, ResultType> = (
  acc: ResultType,
  element: InputType,
) => ResultType | Promise<ResultType>;

export type IndexedOperator<InputType, ResultType> = (
  index: number,
  acc: ResultType,
  element: InputType,
) => ResultType | Promise<ResultType>;
