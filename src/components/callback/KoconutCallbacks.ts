`use strict`;

export type Selector<InputType, ReturnType> = (
  data: InputType,
) => ReturnType | Promise<ReturnType>;

export type Processor<InputType> = Selector<InputType, void>;

export type Predicator<InputType> = Selector<InputType, boolean>;

export type Comparator<InputType> = (
  front: InputType,
  rear: InputType,
) => number | Promise<number>;
