`use strict`;

import {
  /* Tool */
  KoconutPrimitive,
  KoconutOpener,
  KoconutTypeChecker,

  /* Base */
  KoconutPair,
  Pair,
  Entry,

  /* Container */
  KoconutIterable,
  KoconutArray,
  KoconutSet,
  KoconutMap,
  KoconutBoolean,
  Sequence,

  /* Enum*/
  KoconutLoopSignal,

  /* Exception */
  KoconutInvalidArgumentException,
  KoconutIndexOutOfBoundsException,
  KoconutNoSuchElementException,
  KoconutConflictException,

  /* Protocol */
  KoconutEquatable,
  KoconutComparable,

  /* Callbacks */
  Action,
  Comparator,
  Operator,
  IndexedOperator,
  IndexedAction,
  Selector,
  Predicator,
  IndexedPredicator,
  Transformer,
  IndexedTransformer,
  Zipper,
} from '../../../module';
import { KoconutEntry } from '../base/KoconutEntry';

/** @internal */
export class KoconutCollection<
  DataType,
  WrapperType extends Array<DataType> | Sequence<DataType> | Set<DataType>,
> extends KoconutIterable<DataType, DataType, WrapperType, WrapperType> {
  /* Koconut Primitive */
  async validate(data: WrapperType | null) {
    /* istanbul ignore else */
    if (data != null) {
      const dataArray = Array.from(data);
      this.mSize = dataArray.length;
      Object.keys(dataArray)
        .map((eachString) => parseInt(eachString))
        .forEach((eachIndex) => this.mIndices.push(eachIndex));
      this.combinedDataWrapper = data;
    }
  }

  private static fromIterable<
    DataType,
    WrapperType extends Array<DataType> | Sequence<DataType> | Set<DataType>,
  >(
    iterable: KoconutIterable<DataType, DataType, WrapperType, WrapperType>,
  ): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>(
      iterable['data'],
    );
    koconutToReturn.processor = iterable['processor'];
    koconutToReturn.prevYieldable = iterable['prevYieldable'];
    return koconutToReturn;
  }

  /* Properties */
  size(): KoconutPrimitive<number> {
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => this.mSize);
    return koconutToReturn;
  }
  protected mIndices = new Array<number>();
  indices(): KoconutArray<number> {
    const koconutToReturn = new KoconutArray<number>();
    (koconutToReturn as any as KoconutOpener<Array<number>>)
      .setPrevYieldable(this)
      .setProcessor(async () => this.mIndices);
    return koconutToReturn;
  }

  // Accumulator
  /**
   * Accumulates value starting with ```initial``` value and applying ```operation```
   * from left to right to current accumulator value and each element.
   * @param {ResultDataType} initial A value to use as the first argument to the first call of the ```operation```.
   * @param {Operator<DataType, ResultDataType>} operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value
   * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element in object.
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Accumulator
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const sumOfArray = await koconutArray
   *                 .fold(
   *                     0,
   *                     (acc, eachNumber) => acc + eachNumber
   *                 )
   *                 .yield()
   * console.log(sumOfArray)
   * // ↑ 15
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const multiplesOfSet = await koconutSet
   *                 .fold(
   *                     1,
   *                     async (acc, eachNumber) => acc * eachNumber
   *                 )
   *                 .yield()
   * console.log(multiplesOfSet)
   * // ↑ 120
   * ```
   */
  fold<ResultDataType>(
    initial: ResultDataType,
    operation: Operator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutPrimitive<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<ResultDataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let dataToReturn = initial;
        for (const eachDatum of this.data!)
          dataToReturn = await operation(dataToReturn, eachDatum);
        return dataToReturn;
      });
    return koconutToReturn;
  }

  /**
   * Accumulates value starting with ```initial``` value and applying ```operation```
   * from left to right to current accumulator value and each element.
   *
   * @param {ResultDataType} initial A value to use as the first argument to the first call of the ```operation```.
   *
   * @param {IndexedOperator<DataType, ResultDataType>} operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value
   * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element and index in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Accumulator
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const sumOfNumberAndIndexInArray = await koconutArray
   *                 .foldIndexed(
   *                     0,
   *                     (index, acc, eachNumber) => index + acc + eachNumber
   *                 )
   *                 .yield()
   * console.log(sumOfNumberAndIndexInArray)
   * // ↑ 25
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const multiplesOfNumberAndIndexInSet = await koconutSet
   *                 .foldIndexed(
   *                     1,
   *                     async (index, acc, eachNumber) => index * acc * eachNumber
   *                 )
   *                 .yield()
   * console.log(multiplesOfNumberAndIndexInSet)
   * // ↑ 0
   * ```
   */
  foldIndexed<ResultDataType>(
    initial: ResultDataType,
    operation: IndexedOperator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutPrimitive<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<ResultDataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let dataToReturn = initial;
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries())
          dataToReturn = await operation(
            eachIndex as number,
            dataToReturn,
            eachDatum,
          );

        return dataToReturn;
      });
    return koconutToReturn;
  }

  // Inspector
  /**
   * Checks if the specified element is contained in this collection.
   * @param {DataType} element The element to search for.
   *
   * @return {KoconutBoolean}
   *
   * @since 1.0.10
   *
   * @category Inspector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const doesArrayContain3 = await koconutArray
   *                               .contains(3)
   *                               .yield()
   * console.log(doesArrayContain3)
   * // ↑ true
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const doesSetContains6 = await koconutSet
   *                               .contains(6)
   *                               .yield()
   * console.log(doesSetContains6)
   * // ↑ false
   * ```
   */
  contains(element: DataType): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        for (const eachDatum of this.data!) {
          let isContained = false;
          if (KoconutTypeChecker.checkIsEquatable(eachDatum)) {
            const equalityResult = eachDatum.equalsTo(element);
            if (equalityResult instanceof KoconutPrimitive)
              isContained = await equalityResult.yield();
            else isContained = equalityResult;
          } else isContained = eachDatum == element;
          if (isContained) return true;
        }
        return false;
      });
    return koconutToReturn;
  }

  /**
   * Checks if all the elements are contained in this collection.
   *
   * @param {Iterable<DataType>} elements The elements to search for.
   *
   * @return {KoconutBoolean}
   *
   * @since 1.0.10
   *
   * @category Inspector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const doesArrayContain1to3 = await koconutArray
   *                               .containsAll([1,2,3])
   *                               .yield()
   * console.log(doesArrayContain1to3)
   * // ↑ true
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const doesSetContains5to6 = await koconutSet
   *                               .containsAll([5,6,7])
   *                               .yield()
   * console.log(doesSetContains5to6)
   * // ↑ false
   * ```
   */
  containsAll(elements: Iterable<DataType>): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const dataArray = Array.from(this.data!);
        for (const eachElementToCheck of elements) {
          if (KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
            let isIncluded = false;
            for (const eachDatum of dataArray) {
              const equalityResult = eachElementToCheck.equalsTo(eachDatum);
              if (
                (equalityResult instanceof KoconutPrimitive &&
                  (await equalityResult.yield())) ||
                (!(equalityResult instanceof KoconutPrimitive) &&
                  equalityResult)
              ) {
                isIncluded = true;
                break;
              }
            }
            if (!isIncluded) return false;
          } else if (!dataArray.includes(eachElementToCheck)) return false;
        }
        return true;
      });
    return koconutToReturn;
  }

  // Iterator
  /**
   * Performs the given ```action``` on each element, providing sequential index with the element.
   * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
   *
   * @param {IndexedAction<DataType>} action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<void>}
   *
   * @category Iterator
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5,6,7)
   *
   * await koconutArray
   *       .forEachIndexed(console.log)
   *       // ↑ 0 1
   *       //   1 2
   *       //   2 3
   *       //   3 4
   *       //   4 5
   *       //   5 6
   *       //   6 7
   *       .process()
   *
   * await koconutArray
   *       .forEachIndexed((eachIndex, eachNumber) => {
   *           if(eachIndex == 3) return KoconutLoopSignal.BREAK
   *           console.log(eachNumber)
   *       })
   *       // ↑ 1 2 3 -- i.e. Since when the index is '3', the loop is interrupted.
   *       // The last printed number(element) would be '3'.
   *       .process()
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,1,2,3)
   *
   * await koconutSet
   *       .forEachIndexed(console.log)
   *       // ↑ 0 1
   *       //   1 2
   *       //   2 3
   *       .process()
   *
   * await koconutSet
   *       .forEachIndexed((eachIndex, eachNumber) => {
   *           if(eachIndex != 0 && eachIndex % 2 == 0) return false
   *           console.log(eachNumber)
   *       })
   *       // ↑ 1 2 -- i.e. Since when the index '2', it's an even number.
   *       // So the loop is interrupted.
   *       // The last printed number(element) would be '2'
   *       .process()
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3)
   *
   * await koconutArray2
   *       .forEachIndexed(async (eachIndex, eachNumber) =>
   *                       console.log(eachIndex, eachNumber))
   *       // ↑ 0 1
   *       //   1 2
   *       //   2 3
   *       .process()
   *
   * await koconutArray2
   *       .forEachIndexed(async (eachIndex, eachNumber) => new Promise(resolve => {
   *           resolve(console.log(eachIndex, eachNumber))
   *       }))
   *       // ↑ 0 1
   *       //   1 2
   *       //   2 3
   *       .process()
   * ```
   */
  forEachIndexed(
    action: IndexedAction<DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<void> {
    action = action.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<void>();
    (koconutToReturn as any as KoconutOpener<void>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let eachIndex = 0;
        for (const eachCombinedDatum of this.data!) {
          const signal = await action(eachIndex++, eachCombinedDatum);
          if (signal == false || signal == KoconutLoopSignal.BREAK) break;
        }
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  onEach(
    action: Action<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(super.onEach(action, thisArg));
  }

  // No Comment - KoconutArray/KoconutSet
  onEachIndexed(
    action: IndexedAction<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    action = action.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let eachIndex = 0;
        for (const eachDatum of this.data!) {
          const signal = await action(eachIndex++, eachDatum);
          if (signal == false || signal == KoconutLoopSignal.BREAK) break;
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // Manipulator
  // No Comment - KoconutArray/KoconutSet
  distinct(): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let processedArray = new Array<DataType>();
        for (const eachDatum of this.data!) {
          if (KoconutTypeChecker.checkIsEquatable(eachDatum)) {
            let isConflict = false;
            for (const eachPrevEquatableDatum of processedArray) {
              const equalityResult = eachDatum.equalsTo(eachPrevEquatableDatum);
              if (
                (equalityResult instanceof KoconutPrimitive &&
                  (await equalityResult.yield())) ||
                (!(equalityResult instanceof KoconutPrimitive) &&
                  equalityResult)
              ) {
                isConflict = true;
                break;
              }
            }
            if (!isConflict) processedArray.push(eachDatum);
          } else {
            processedArray = Array.from(new Set(this.data));
            break;
          }
        }

        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  distinctBy<KeyType, EquatableKeyType extends KoconutEquatable>(
    selector: Selector<DataType, KeyType | EquatableKeyType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    selector = selector.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        const keyArray = new Array<KeyType>();
        const equatableKeyArray = new Array<EquatableKeyType>();
        for (const eachDatum of this.data!) {
          const eachKey = await selector(eachDatum);
          if (KoconutTypeChecker.checkIsEquatable(eachKey)) {
            let isConflict = false;
            for (const eachPrevEquatableKey of equatableKeyArray) {
              const equalityResult = eachPrevEquatableKey.equalsTo(eachKey);
              if (
                (equalityResult instanceof KoconutPrimitive &&
                  (await equalityResult.yield())) ||
                (!(equalityResult instanceof KoconutPrimitive) &&
                  equalityResult)
              ) {
                isConflict = true;
                break;
              }
            }
            if (!isConflict) {
              equatableKeyArray.push(eachKey);
              processedArray.push(eachDatum);
            }
          } else {
            if (!keyArray.includes(eachKey)) {
              keyArray.push(eachKey);
              processedArray.push(eachDatum);
            }
          }
        }

        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  drop(n: number): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (n < 0)
          throw new KoconutInvalidArgumentException(
            `Given argument ${n} is invalid, 'n' must be larger than 0.`,
          );
        let processedArray = new Array<DataType>();
        processedArray = Array.from(this.data!).slice(n);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  dropLast(n: number): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (n < 0)
          throw new KoconutInvalidArgumentException(
            `Given argument ${n} is invalid, 'n' must be larger than 0.`,
          );
        let processedArray = new Array<DataType>();
        processedArray = Array.from(this.data!).slice(0, -n);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  dropLastWhile(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        let indexNumber = 0;
        for (
          let eachIndex = dataArray.length - 1;
          eachIndex >= 0;
          eachIndex--
        ) {
          if (!(await predicate(dataArray[eachIndex]))) {
            indexNumber = eachIndex;
            break;
          }
        }
        processedArray = dataArray.slice(0, indexNumber + 1);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  dropWhile(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        let indexNumber = dataArray.length;
        for (const eachIndex in dataArray) {
          if (!(await predicate(dataArray[eachIndex]))) {
            indexNumber = parseInt(eachIndex);
            break;
          }
        }
        processedArray = dataArray.slice(indexNumber);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  filter(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(super.filter(predicate, thisArg));
  }

  // No Comment - KoconutArray/KoconutSet
  filterNot(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(super.filterNot(predicate, thisArg));
  }

  // No Comment - KoconutArray/KoconutSet
  filterTo(
    destination: Array<DataType> | Set<DataType>,
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const filteredCollection = this.filter(predicate, thisArg);
        if (destination instanceof Array) {
          await filteredCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await filteredCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  filterNotTo(
    destination: Array<DataType> | Set<DataType>,
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const filteredCollection = this.filterNot(predicate, thisArg);
        if (destination instanceof Array) {
          await filteredCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await filteredCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  filterIndexed(
    predicate: IndexedPredicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries())
          if (await predicate(eachIndex as number, eachDatum))
            processedArray.push(eachDatum);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  filterIndexedTo(
    destination: Array<DataType> | Set<DataType>,
    predicate: IndexedPredicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const filteredCollection = this.filterIndexed(predicate, thisArg);
        if (destination instanceof Array) {
          await filteredCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await filteredCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // filterIsInstance
  // filterIsInstanceTo

  // No Comment - KoconutArray/KoconutSet
  filterNotNull(): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        for (const eachDatum of this.data!)
          if (eachDatum != null) processedArray.push(eachDatum);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  filterNotNullTo(
    destination: Array<DataType> | Set<DataType>,
  ): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const filteredCollection = this.filterNotNull();
        if (destination instanceof Array) {
          await filteredCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await filteredCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  sortedBy(
    selector: Selector<DataType, number | string | KoconutComparable>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    selector = selector.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        for (const eachIndex in dataArray) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
            const currentComparable = await selector(dataArray[eachIndex]);
            let startIndex = 0;
            let middleIndex: number;
            let endIndex = processedArray.length;
            while (startIndex < endIndex) {
              middleIndex = Math.floor((startIndex + endIndex) / 2);
              const targetComparable = await selector(
                processedArray[middleIndex],
              );
              let isCurrentGreater = false;
              if (KoconutTypeChecker.checkIsComparable(currentComparable)) {
                const eachCompareResult =
                  currentComparable.compareTo(targetComparable);
                let numberResult = 0;
                if (eachCompareResult instanceof KoconutPrimitive)
                  numberResult = await eachCompareResult.yield();
                else numberResult = eachCompareResult;
                if (numberResult > 0) isCurrentGreater = true;
              } else isCurrentGreater = targetComparable < currentComparable;
              if (isCurrentGreater) startIndex = middleIndex + 1;
              else endIndex = middleIndex;
            }
            processedArray.splice(endIndex, 0, dataArray[eachIndex]);
          }
        }

        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  sortedByDescending(
    selector: Selector<DataType, number | string | KoconutComparable>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    selector = selector.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        for (const eachIndex in dataArray) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
            const currentComparable = await selector(dataArray[eachIndex]);
            let startIndex = 0;
            let middleIndex: number;
            let endIndex = processedArray.length;
            while (startIndex < endIndex) {
              middleIndex = Math.floor((startIndex + endIndex) / 2);
              const targetComparable = await selector(
                processedArray[middleIndex],
              );
              let isCurrentLesser = false;
              if (KoconutTypeChecker.checkIsComparable(currentComparable)) {
                const eachCompareResult =
                  currentComparable.compareTo(targetComparable);
                let numberResult = 0;
                if (eachCompareResult instanceof KoconutPrimitive)
                  numberResult = await eachCompareResult.yield();
                else numberResult = eachCompareResult;
                if (numberResult < 0) isCurrentLesser = true;
              } else isCurrentLesser = targetComparable > currentComparable;
              if (isCurrentLesser) startIndex = middleIndex + 1;
              else endIndex = middleIndex;
            }
            processedArray.splice(endIndex, 0, dataArray[eachIndex]);
          }
        }
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  sortedWith(
    comparator: Comparator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    comparator = comparator.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        for (const eachIndex in dataArray) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
            let startIndex = 0;
            let middleIndex: number;
            let endIndex = processedArray.length;
            while (startIndex < endIndex) {
              middleIndex = Math.floor((startIndex + endIndex) / 2);
              if (
                (await comparator(
                  dataArray[eachIndex],
                  processedArray[middleIndex],
                )) >= 0
              )
                startIndex = middleIndex + 1;
              else endIndex = middleIndex;
            }
            processedArray.splice(endIndex, 0, dataArray[eachIndex]);
          }
        }

        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  take(n: number): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = Array.from(this.data!).slice(0, n);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  takeLast(n: number): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = Array.from(this.data!).slice(
          this.mSize - n,
          this.mSize,
        );
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  takeLastWhile(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        let targetIndex = this.mSize - 1;
        for (; targetIndex >= 0; targetIndex--) {
          if (!(await predicate(dataArray[targetIndex]))) break;
        }
        processedArray = dataArray.slice(targetIndex + 1, this.mSize);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  takeWhile(
    predicate: Predicator<DataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let processedArray = new Array<DataType>();
        let predicateIndex = 0;
        for (const eachDatum of this.data!) {
          if (!(await predicate(eachDatum))) break;
          predicateIndex++;
        }
        processedArray = Array.from(this.data!).slice(0, predicateIndex);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  // Selector
  /**
   * Returns an element at the given ```index``` or throws an {@link KoconutIndexOutOfBoundsException} if the ```index``` is out of bounds of this collection.
   *
   * @param {number} index The index of element to search for.
   *
   * @return {KoconutPrimitive<DataType>}
   *
   * @throws {@link KoconutIndexOutOfBoundsException}
   * -- When ```index``` is less than 0 or greater than lenth.
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Caes 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const elementAtIndex3OfArray = await koconutArray
   *                                     .elementAt(3)
   *                                     .yield()
   * console.log(elementAtIndex3OfArray)
   * // ↑ 4
   *
   * try {
   *     await koconutArray
   *             .elementAt(10)
   *             .yield()
   * } catch(error) {
   *     console.log(error.name)
   *     // ↑ Koconut Index Out Of Bounds Exception
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const elementAtIndex2OfSet = await koconutSet
   *                                     .elementAt(2)
   *                                     .yield()
   * console.log(elementAtIndex2OfSet)
   * // ↑ 3
   *
   * try {
   *     await koconutSet
   *             .elementAt(-2)
   *             .yield()
   * } catch(error) {
   *     console.log(error.name)
   *     // ↑ Koconut Index Out Of Bounds Exception
   * }
   * ```
   */
  elementAt(index: number): KoconutPrimitive<DataType> {
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (index < 0 || index >= this.mSize)
          throw new KoconutIndexOutOfBoundsException(
            `Cannot search for data at index of ${index}`,
          );
        return Array.from(this.data!)[index];
      });
    return koconutToReturn;
  }

  /**
   * Returns an element at the given ```index``` or the result of calling the ```defaultValue``` function
   * if the ```index``` is out of bounds of this collection.
   * @param {number} index The index of element to search for.
   * @param {Selector<number, DataType>} defaultValue A callback function that accepts an argument. The method calls the ```defaultValue``` function when ```index``` is out of bounds.
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```defaultValue```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<DataType>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const elementAtIndex3OfArray = await koconutArray
   *                                 .elementAtOrElse(3, index => 0)
   *                                 .yield()
   * console.log(elementAtIndex3OfArray)
   * // ↑ 4
   *
   * const elementAtIndex10OfArray = await koconutArray
   *                                 .elementAtOrElse(10, index => 0)
   *                                 .yield()
   * console.log(elementAtIndex10OfArray)
   * // ↑ 0
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const elementAtIndex2OfSet = await koconutSet
   *                                 .elementAtOrElse(2, index => 0)
   *                                 .yield()
   * console.log(elementAtIndex2OfSet)
   * // ↑ 3
   *
   * const elementAtIndexNegative2OfSet = await koconutSet
   *                                 .elementAtOrElse(-2, index => 0)
   *                                 .yield()
   * console.log(elementAtIndexNegative2OfSet)
   * // ↑ 0
   * ```
   */
  elementAtOrElse(
    index: number,
    defaultValue: Selector<number, DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    defaultValue = defaultValue.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (index < 0 || index >= this.mSize) return await defaultValue(index);
        else return Array.from(this.data!)[index];
      });
    return koconutToReturn;
  }

  /**
   * Returns an element at the given ```index``` or ```null``` if the index is out of bounds of this collection.
   * @param {number} index The index of element to search for.
   *
   * @return {KoconutPrimitive<DataType | null>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const elementAtIndex3OfArray = await koconutArray
   *                                 .elementAtOrNull(3)
   *                                 .yield()
   * console.log(elementAtIndex3OfArray)
   * // ↑ 4
   *
   * const elementAtIndex10OfArray = await koconutArray
   *                                 .elementAtOrNull(10)
   *                                 .yield()
   * console.log(elementAtIndex10OfArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const elementAtIndex2OfSet = await koconutSet
   *                                 .elementAtOrNull(2)
   *                                 .yield()
   * console.log(elementAtIndex2OfSet)
   * // ↑ 3
   *
   * const elementAtIndexNegative2OfSet = await koconutSet
   *                                 .elementAtOrNull(-2)
   *                                 .yield()
   * console.log(elementAtIndexNegative2OfSet)
   * // ↑ null
   * ```
   */
  elementAtOrNull(index: number): KoconutPrimitive<DataType | null> {
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (index < 0 || index >= this.mSize) return null;
        return Array.from(this.data!)[index];
      });
    return koconutToReturn;
  }

  /**
   * Returns the first element matching the given ```predicate```, or ```null``` if no such element was found.
   *
   * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<DataType | null>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const foundEventNumberOfArray = await koconutArray
   *                                 .find(eachNumber => eachNumber % 2 == 0)
   *                                 .yield()
   * console.log(foundEventNumberOfArray)
   * // ↑ 2
   *
   * const foundMultiplesOf10Array = await koconutArray
   *                                 .find(eachNumber => eachNumber % 10 == 0)
   *                                 .yield()
   * console.log(foundMultiplesOf10Array)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const foundOddNumberOfSet = await koconutSet
   *                                 .find(eachNumber => eachNumber % 2 == 1)
   *                                 .yield()
   * console.log(foundOddNumberOfSet)
   * // ↑ 1
   *
   * const foundMultiplesOf10OfSet = await koconutSet
   *                                 .find(eachNumber => eachNumber % 10 == 0)
   *                                 .yield()
   * console.log(foundMultiplesOf10OfSet)
   * // ↑ null
   * ```
   */
  find(
    predicate: Predicator<DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        for (const eachDatum of this.data!)
          if (await predicate(eachDatum)) return eachDatum;
        return null;
      });
    return koconutToReturn;
  }

  /**
   * Returns the last element matching the given ```predicate```, or ```null``` if no such element was found.
   *
   * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<DataType | null>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const lastEventNumberOfArray = await koconutArray
   *                                 .findLast(eachNumber => eachNumber % 2 == 0)
   *                                 .yield()
   * console.log(lastEventNumberOfArray)
   * // ↑ 4
   *
   * const lastMultiplesOf10Array = await koconutArray
   *                                 .findLast(eachNumber => eachNumber % 10 == 0)
   *                                 .yield()
   * console.log(lastMultiplesOf10Array)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const lastOddNumberOfSet = await koconutSet
   *                                 .findLast(eachNumber => eachNumber % 2 == 1)
   *                                 .yield()
   * console.log(lastOddNumberOfSet)
   * // ↑ 5
   *
   * const lastMultiplesOf10OfSet = await koconutSet
   *                                 .findLast(eachNumber => eachNumber % 10 == 0)
   *                                 .yield()
   * console.log(lastMultiplesOf10OfSet)
   * // ↑ null
   * ```
   */
  findLast(
    predicate: Predicator<DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const dataArray = Array.from(this.data!);
        for (
          let eachIndex = dataArray.length - 1;
          eachIndex >= 0;
          eachIndex--
        ) {
          if (await predicate(dataArray[eachIndex]))
            return dataArray[eachIndex];
        }
        return null;
      });
    return koconutToReturn;
  }

  /**
   * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
   * method will just return the very first element of this collection. If source data is null or no element
   * matching given ```predicate``` is found, it throws {@link KoconutNoSuchElementException}.
   *
   * @param {Predicator<DataType> | null } predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<DataType>}
   *
   * @throws {@link KoconutNoSuchElementException}
   * -- When source data is empty or no element matching given ```predicate``` is found.
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const firstNumberOfArray = await koconutArray
   *                                     .first()
   *                                     .yield()
   * console.log(firstNumberOfArray)
   * // ↑ 1
   *
   * const firstEventNumberOfArray = await koconutArray
   *                             .first(eachNumber => eachNumber % 2 == 0)
   *                             .yield()
   * console.log(firstEventNumberOfArray)
   * // ↑ 2
   *
   * try {
   *     await koconutArray
   *             .filter(eachNumber => eachNumber > 10)
   *             .first()
   *             .yield()
   * } catch(error) {
   *     console.log(error.name)
   *     // ↑ Koconut No Such Element Exception
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const firstNumberOfSet = await koconutSet
   *                                 .first()
   *                                 .yield()
   * console.log(firstNumberOfSet)
   * // ↑ 1
   *
   * const firstOddNumberOfSet = await koconutSet
   *                             .first(eachNumber => eachNumber % 2 == 1)
   *                             .yield()
   * console.log(firstOddNumberOfSet)
   * // ↑ 1
   * ```
   */
  first(
    predicate: Predicator<DataType> | null = null,
    /*
    predicate:
      | ((element: DataType) => boolean | Promise<boolean>)
      | null = null,
      */
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        if (predicate) {
          for (const eachDatum of this.data)
            if (await predicate(eachDatum)) return eachDatum;
          throw new KoconutNoSuchElementException(`No such element is found`);
        }
        return Array.from(this.data)[0];
      });
    return koconutToReturn;
  }

  /**
   * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
   * method will just return the very first element of this collection. If source data is null or no element
   * matching given ```predicate``` is found, it returns ```null```.
   * @param {Predicator<DataType> | null} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<DataType | null>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const firstNumberOfArray = await koconutArray
   *                                     .firstOrNull()
   *                                     .yield()
   * console.log(firstNumberOfArray)
   * // ↑ 1
   *
   * const firstEventNumberOfArray = await koconutArray
   *                             .firstOrNull(eachNumber => eachNumber % 2 == 0)
   *                             .yield()
   * console.log(firstEventNumberOfArray)
   * // ↑ 2
   *
   * const firstNumberOfEmptyArray = await koconutArray
   *                                 .filter(eachNumber => eachNumber > 10)
   *                                 .firstOrNull()
   *                                 .yield()
   * console.log(firstNumberOfEmptyArray)
   * // ↑ null
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const firstNumberOfSet = await koconutSet
   *                                 .firstOrNull()
   *                                 .yield()
   * console.log(firstNumberOfSet)
   * // ↑ 1
   *
   * const firstOddNumberOfSet = await koconutSet
   *                             .firstOrNull(eachNumber => eachNumber % 2 == 1)
   *                             .yield()
   * console.log(firstOddNumberOfSet)
   * // ↑ 1
   * ```
   */
  firstOrNull(
    predicate: Predicator<DataType> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0) return null;
        if (predicate) {
          for (const eachDatum of this.data)
            if (await predicate(eachDatum)) return eachDatum;
          return null;
        }
        return Array.from(this.data)[0];
      });
    return koconutToReturn;
  }

  /**
   * Returns first index of element. or -1 if the collection does not contains element.
   * @param {DataType} elementToFind The element to search for.
   *
   * @return {KoconutPrimitive<number>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const indexOf3 = await koconutArray
   *                         .indexOf(3)
   *                         .yield()
   * console.log(indexOf3)
   * // ↑ 2
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const indexOf10 = await koconutSet
   *                         .indexOf(10)
   *                         .yield()
   * console.log(indexOf10)
   * // ↑ -1
   * ```
   */
  indexOf(elementToFind: DataType): KoconutPrimitive<number> {
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        for (const [index, element] of Array.from(this.data!).entries()) {
          if (KoconutTypeChecker.checkIsEquatable(element)) {
            const equalityResult = element.equalsTo(elementToFind);
            if (
              (equalityResult instanceof KoconutPrimitive &&
                (await equalityResult.yield())) ||
              (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
            )
              return index as number;
          } else if (element == elementToFind) return index as number;
        }

        return -1;
      });
    return koconutToReturn;
  }

  /**
   * Returns index of the first element matching the given ```predicate```, or -1 if the
   * collection does not contain such element.
   *
   * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<number>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const indexOfFirstEven = await koconutArray
   *                         .indexOfFirst(eachNumber => eachNumber % 2 == 0)
   *                         .yield()
   * console.log(indexOfFirstEven)
   * // ↑ 1
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const indexOfFirstOdd = await koconutSet
   *                         .indexOfFirst(eachNumber => eachNumber % 2 == 1)
   *                         .yield()
   * console.log(indexOfFirstOdd)
   * // ↑ 0
   * ```
   */
  indexOfFirst(
    predicate: Predicator<DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<number> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        for (const [index, element] of Array.from(this.data!).entries())
          if (await predicate(element)) return index as number;
        return -1;
      });
    return koconutToReturn;
  }

  /**
   * Returns index of the last element matching the given ```predicate```, or -1 if the
   * collection does not contain such element.
   *
   * @param {Predicator<DataType>} predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutPrimitive<number>}
   *
   * @since 1.0.10
   *
   * @category Selector
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const indexOfLastEven = await koconutArray
   *                         .indexOfLast(eachNumber => eachNumber % 2 == 0)
   *                         .yield()
   * console.log(indexOfLastEven)
   * // ↑ 3
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const indexOfLastOdd = await koconutSet
   *                         .indexOfLast(eachNumber => eachNumber % 2 == 1)
   *                         .yield()
   * console.log(indexOfLastOdd)
   * // ↑ 4
   * ```
   */
  indexOfLast(
    predicate: Predicator<DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<number> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const dataArray = Array.from(this.data!);
        for (let eachIndex = dataArray.length - 1; eachIndex >= 0; eachIndex--)
          if (await predicate(dataArray[eachIndex])) return eachIndex;
        return -1;
      });
    return koconutToReturn;
  }

  // Transformer
  /**
   * Returns a {@link KoconutMap} containing key-value paired {@link Entry} provided by ```transform```
   * function applied to elements of the given collection.
   * @param {Transformer<DataType,[KeyType, ValueType]| Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Entry<KeyType, ValueType>| KoconutEntry<KeyType, ValueType>>} transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const doubledValueMap = await koconutArray
   *                       .associate(eachNumber =>
   *                           [eachNumber, eachNumber * 2]
   *                           // ↑ Also can be
   *                           //   new Pair(eachNumber, eachNumber * 2)
   *                           //   Pair.from([eachNumber, eachNumber * 2])
   *                           //   new KoconutPair(eachNumber, eachNumber * 2)
   *                           //   new Entry(eachNumber, eachNumber * 2)
   *                           //   Entry.from([eachNumber, eachNumber * 2])
   *                           //   new KoconutEntry(eachNumber, eachNumber * 2)
   *                       )
   *                       .yield()
   * console.log(doubledValueMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const doubledKeyMap = await koconutSet
   *                   .associate(eachNumber => [eachNumber * 2, eachNumber])
   *                   .yield()
   * console.log(doubledKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const squaredValueMap = await koconutArray2
   *               .associate(async eachNumber => [eachNumber, eachNumber * eachNumber])
   *               .yield()
   * console.log(squaredValueMap)
   * // ↑ Map { 1 => 1, 2 => 4, 3 => 9, 4 => 16, 5 => 25 }
   *
   * const squaredKeyMap = await koconutArray2
   *               .associate(async eachNumber => new Promise<[number, number]>(resolve => {
   *                   resolve([eachNumber * eachNumber, eachNumber])
   *               }))
   *               .yield()
   * console.log(squaredKeyMap)
   * // ↑ Map { 1 => 1, 4 => 2, 9 => 3, 16 => 4, 25 => 5 }
   * ```
   */
  associate<KeyType, ValueType>(
    transform: Transformer<
      DataType,
      | [KeyType, ValueType]
      | Pair<KeyType, ValueType>
      | KoconutPair<KeyType, ValueType>
      | Entry<KeyType, ValueType>
      | KoconutEntry<KeyType, ValueType>
    >,
    thisArg: any = null,
  ): KoconutMap<KeyType, ValueType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutMap<KeyType, ValueType>();
    (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedMap = new Map<KeyType, ValueType>();
        for (const eachDatum of this.data!) {
          const eachTransformResult = await transform(eachDatum);
          if (eachTransformResult instanceof KoconutPair) {
            const eachPair = await eachTransformResult.yield();
            /* istanbul ignore else*/
            if (eachPair != null)
              processedMap.set(eachPair.first, eachPair.second);
          } else if (eachTransformResult instanceof Pair)
            processedMap.set(
              eachTransformResult.first,
              eachTransformResult.second,
            );
          else if (eachTransformResult instanceof KoconutEntry) {
            const eachEntry = await eachTransformResult.yield();
            /* istanbul ignore else*/
            if (eachEntry != null)
              processedMap.set(eachEntry.key, eachEntry.value);
          } else if (eachTransformResult instanceof Entry)
            processedMap.set(
              eachTransformResult.key,
              eachTransformResult.value,
            );
          else processedMap.set(eachTransformResult[0], eachTransformResult[1]);
        }
        return processedMap;
      });
    return koconutToReturn;
  }

  /**
   * Returns a {@link KoconutMap} containing the elements from the given collection indexed by the key
   * returned from ```keySelector``` function applied to each element.
   * ```valueTransform``` callback function is optional. If it's not omitted the method returns
   * a {@link KoconutMap} instance containing the values provide by the function and indexed by ```keySelector```
   * applied to elements of the given collection.
   *
   * @param {Selector<DataType, KeyType>} keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
   *
   * @param {Transformer<DataType, ValueType> | null} valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
   *
   * @param {any} keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @param {any} valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const doubledKeyMap = await koconutArray
   *                       .associateBy(eachNumber => eachNumber * 2)
   *                       .yield()
   * console.log(doubledKeyMap)
   * // ↑ Map { 2 => 1, 4 => 2, 6 => 3, 8 => 4, 10 => 5 }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const doubledKeyValueMap = await koconutSet
   *                           .associateBy(
   *                               eachNumber => eachNumber * 2,
   *                               eachNumber => eachNumber * 2
   *                           )
   *                           .yield()
   * console.log(doubledKeyValueMap)
   * // ↑ Map { 2 => 2, 4 => 4, 6 => 6, 8 => 8, 10 => 10 }
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const doubledKeySquaredValueMap = await koconutArray2
   *                   .associateBy(
   *                       async eachNumber => eachNumber * 2,
   *                       eachNumber => new Promise(resolve => {
   *                           resolve(eachNumber * eachNumber)
   *                       })
   *                   )
   *                   .yield()
   * console.log(doubledKeySquaredValueMap)
   * // ↑ Map { 2 => 1, 4 => 4, 6 => 9, 8 => 16, 10 => 25 }
   * ```
   */
  associateBy<KeyType, ValueType = DataType>(
    keySelector: Selector<DataType, KeyType>,
    valueTransform: Transformer<DataType, ValueType> | null = null,
    keySelectorThisArg: any = null,
    valueTransformThisArg: any = null,
  ): KoconutMap<KeyType, ValueType> {
    keySelector = keySelector.bind(keySelectorThisArg);
    if (valueTransform)
      valueTransform = valueTransform.bind(valueTransformThisArg);
    const koconutToReturn = new KoconutMap<KeyType, ValueType>();
    (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedMap = new Map<KeyType, ValueType>();
        for (const eachDatum of this.data!) {
          const eachKey = await keySelector(eachDatum);
          const eachValue = valueTransform
            ? await valueTransform(eachDatum)
            : eachDatum;
          processedMap.set(eachKey, eachValue as ValueType);
        }
        return processedMap;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  associateByTo<KeyType, ValueType = DataType>(
    destination: Map<KeyType, ValueType>,
    keySelector: Selector<DataType, KeyType>,
    valueTransform: Transformer<DataType, ValueType> | null,
    keySelectorThisArg: any,
    valueTransformThisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    keySelector = keySelector.bind(keySelectorThisArg);
    if (valueTransform)
      valueTransform = valueTransform.bind(valueTransformThisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        await this.associateBy(
          keySelector,
          valueTransform,
          keySelectorThisArg,
          valueTransformThisArg,
        )
          .forEach((eachEntry) => {
            destination.set(eachEntry.key, eachEntry.value);
          })
          .process();
        return this.data!;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  associateTo<KeyType, ValueType>(
    destination: Map<KeyType, ValueType>,
    transform: Transformer<
      DataType,
      | [KeyType, ValueType]
      | Pair<KeyType, ValueType>
      | KoconutPair<KeyType, ValueType>
      | Entry<KeyType, ValueType>
      | KoconutEntry<KeyType, ValueType>
    >,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        await this.associate(transform, thisArg)
          .forEach((eachEntry) => {
            destination.set(eachEntry.key, eachEntry.value);
          })
          .process();
        return this.data!;
      });
    return koconutToReturn;
  }

  /**
   * Returns a {@link KoconutMap} where keys are original elements of the current object and values
   * are produced by the ```valueSelector``` function applied to each element.
   *
   * @param {Selector<DataType, ValueType>} valueSelector A callback function that accepts an argument. The method calls the ```valueSelector``` one time for each element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```valueSelector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<DataType, ValueType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const doubledValueMap = await koconutArray
   *                       .associateWith(eachNumber => eachNumber * 2)
   *                       .yield()
   * console.log(doubledValueMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const stringifiedValueMap = await koconutSet
   *                       .associateWith(eachNumber => eachNumber.toString())
   *                       .yield()
   * console.log(stringifiedValueMap)
   * // ↑ Map { 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5' }
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const squaredValueMap = await koconutArray2
   *                   .associateWith(async eachNumber => eachNumber * 2)
   *                   .yield()
   * console.log(squaredValueMap)
   * // ↑ Map { 1 => 2, 2 => 4, 3 => 6, 4 => 8, 5 => 10 }
   *
   * const tripledValueMap = await koconutArray2
   *                   .associateWith(eachNumber => new Promise(resolve => {
   *                       resolve(eachNumber * 3)
   *                   }))
   *                   .yield()
   * console.log(tripledValueMap)
   * // ↑ Map { 1 => 3, 2 => 6, 3 => 9, 4 => 12, 5 => 15 }
   * ```
   */
  associateWith<ValueType>(
    valueSelector: Selector<DataType, ValueType>,
    thisArg: any = null,
  ): KoconutMap<DataType, ValueType> {
    valueSelector = valueSelector.bind(thisArg);
    const koconutToReturn = new KoconutMap<DataType, ValueType>();
    (koconutToReturn as any as KoconutOpener<Map<DataType, ValueType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedMap = new Map<DataType, ValueType>();
        for (const eachDatum of this.data!) {
          const eachValue = await valueSelector(eachDatum);
          processedMap.set(eachDatum, eachValue);
        }
        return processedMap;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  associateWithTo<ValueType>(
    destination: Map<DataType, ValueType>,
    valueSelector: Selector<DataType, ValueType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    valueSelector = valueSelector.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        await this.associateWith(valueSelector, thisArg)
          .forEach((eachEntry) => {
            destination.set(eachEntry.key, eachEntry.value);
          })
          .process();
        return this.data!;
      });
    return koconutToReturn;
  }

  /**
   * Splits this collection into a {@link KoconutArray} of ```Arrays```
   * each not exceeding the given ```size```.
   * @param {number} size The number of elements to take in each ```Array```, must be positive and can be greater than the number of elements in this collection.
   * @param {Transformer<Array<DataType>, ResultDataType> | null} transform A callback function that accepts an argument. The method calls the ```transform``` with chunked data ```array``` when it's not omitted.
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @returns {KoconutArray<Array<DataType> | ResultDataType>}
   *
   * @throws {@link KoconutInvalidArgumentException}
   * -- When ```size``` is not greater than 0.
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const chunkedArray = await koconutArray
   *                       .chunked(3)
   *                       .yield()
   * console.log(chunkedArray)
   * // ↑ [ [ 1, 2, 3 ], [ 4, 5 ] ]
   *
   * try {
   *   await koconutArray
   *       .chunked(0)
   *       .yield()
   * } catch(error) {
   *   console.log(error.name)
   *   // ↑ Koconut Invalid Argument Exception
   * }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const chunkedSum = await koconutSet
   *       .chunked(
   *           3,
   *           numbers => numbers
   *                       .reduce(
   *                           (acc, eachNumber) => acc + eachNumber, 0
   *                       )
   *       )
   *       .yield()
   * console.log(chunkedSum)
   * // ↑ [ 6, 9 ]
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const chunkedMax = await koconutArray2
   *       .chunked(
   *           2,
   *           async numbers => await KoconutArray
   *                                   .from(numbers)
   *                                   .maxByOrNull(
   *                                       eachNumber => eachNumber
   *                                   )
   *                                   .yield()
   *       )
   *       .yield()
   * console.log(chunkedMax)
   * // ↑ [ 2, 4, 5 ]
   *
   * const chunkedMin = await koconutArray2
   *       .chunked(
   *           2,
   *           numbers => KoconutArray
   *                       .from(numbers)
   *                       .minByOrNull(
   *                           eachNumber => eachNumber
   *                       )
   *                       .yield()
   *       )
   *       .yield()
   * console.log(chunkedMin)
   * // ↑ [ 1, 3, 5 ]
   * ```
   */
  chunked<ResultDataType>(
    size: number,
    transform: Transformer<Array<DataType>, ResultDataType> | null,
    thisArg: any,
  ): KoconutArray<Array<DataType> | ResultDataType>;
  /** @ignore */
  chunked(size: number): KoconutArray<Array<DataType>>;
  /** @ignore */
  chunked<ResultDataType>(
    size: number,
    transform: Transformer<Array<DataType>, ResultDataType>,
  ): KoconutArray<ResultDataType>;
  /** @ignore */
  chunked<ResultDataType>(
    size: number,
    transform: Transformer<Array<DataType>, ResultDataType>,
    thisArg: any,
  ): KoconutArray<ResultDataType>;
  chunked<ResultDataType>(
    size: number,
    transform: Transformer<Array<DataType>, ResultDataType> | null = null,
    thisArg: any = null,
  ): KoconutArray<Array<DataType> | ResultDataType> {
    if (transform) transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<
      Array<DataType> | ResultDataType
    >();
    (
      koconutToReturn as any as KoconutOpener<
        Array<Array<DataType>> | Array<ResultDataType>
      >
    )
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (size <= 0)
          throw new KoconutInvalidArgumentException(
            `Size must be greater than 0. Given size : ${size}.`,
          );
        const processedArray = new Array<Array<DataType>>();
        let currentIndex = 0;
        const dataArray = Array.from(this.data!);
        while (currentIndex < dataArray.length) {
          processedArray.push(
            dataArray.slice(currentIndex, currentIndex + size),
          );
          currentIndex += size;
        }
        if (transform) {
          const transformedArray = new Array<ResultDataType>();
          for (const eachProcessedIndex in processedArray) {
            /* istanbul ignore else*/
            if (
              Object.prototype.hasOwnProperty.call(
                processedArray,
                eachProcessedIndex,
              )
            )
              transformedArray.push(
                await transform(processedArray[eachProcessedIndex]),
              );
          }
          return transformedArray;
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  /**
   * Returns a {@link KoconutArray} of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
   *
   * @param {IndexedTransformer<DataType, Iterable<ResultDataType>>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutArray<ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(100, 101, 102)
   *
   * const allNumbersAndIndexOfArray = await koconutArray
   *                           .flatMapIndexed((eachIndex, eachNumber) =>
   *                               [eachIndex, eachNumber]
   *                           )
   *                           .yield()
   * console.log(allNumbersAndIndexOfArray)
   * // ↑ [ 0, 100, 1, 101, 2, 102 ]
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(100, 101, 102)
   *
   * const allNumbersAndIndexOfSet = await koconutSet
   *                           .flatMapIndexed((eachIndex, eachNumber) =>
   *                               [eachIndex, eachNumber]
   *                           )
   *                           .yield()
   * console.log(allNumbersAndIndexOfSet)
   * // ↑ [ 0, 100, 1, 101, 2, 102 ]
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(123, 987)
   *
   * const allDigitsAndIndexInArray = await koconutArray2
   *                       .flatMapIndexed(async (eachIndex, eachNumber) => {
   *                           const digits = new Array<number>()
   *                           while(eachNumber != 0) {
   *                               digits.unshift(eachNumber % 10)
   *                               eachNumber = Math.floor(eachNumber / 10)
   *                           }
   *                           return [eachIndex, ...digits]
   *                       })
   *                       .yield()
   * console.log(allDigitsAndIndexInArray)
   * // ↑ [
   * //     0, 1, 2, 3,
   * //     1, 9, 8, 7
   * //   ]
   *
   * const allNumberAndIndexCharactersInArray = await koconutArray2
   *           .flatMapIndexed((eachInex, eachNumber) => new Promise<string>(resolve => {
   *               resolve(`${eachInex}${eachNumber}`)
   *           }))
   *           .yield()
   * console.log(allNumberAndIndexCharactersInArray)
   * // ↑ [
   * //     '0', '1', '2',
   * //     '3', '1', '9',
   * //     '8', '7'
   * //   ]
   * ```
   */
  flatMapIndexed<ResultDataType>(
    transform: IndexedTransformer<DataType, Iterable<ResultDataType>>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        let eachIndex = 0;
        for (const eachDatum of this.data!)
          for (const eachSubElement of await transform(eachIndex++, eachDatum))
            processedArray.push(eachSubElement);
        return processedArray;
      });
    return koconutToReturn;
  }

  // No Comment - KoconutArray/KoconutSet
  flatMapTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<DataType, Iterable<ResultDataType>>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(
      super.flatMapTo(destination, transform, thisArg),
    );
  }

  // No Comment - KoconutArray/KoconutSet
  flatMapIndexedTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: IndexedTransformer<DataType, Iterable<ResultDataType>>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const flattenCollection = this.flatMapIndexed(transform, thisArg);
        if (destination instanceof Array) {
          await flattenCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await flattenCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  /**
   * Groups values returned by the ```valueTransform``` function applied to each element of the original collection
   * by the key returned by the given ```keySelector``` function applied to the element and returns a map where each
   * group key is associated with a list of corresponding values. If ```valueTransform``` is omitted, the ```value``` of
   * each entry would be original element.
   *
   * @param {Selector<DataType, KeyType>} keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
   *
   * @param {Transformer<DataType, ValueType> | null} valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
   *
   * @param {any} keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @param {any} valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutMap<KeyType, Array<ValueType>>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const groupedByOddParity = await koconutArray
   *                             .groupBy(eachNumber => eachNumber % 2 == 1)
   *                             .yield()
   * console.log(groupedByOddParity)
   * // ↑ Map { true => [ 1, 3, 5 ], false => [ 2, 4 ] }
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const groupedByEvenParityToString = await koconutSet
   *                             .groupBy(
   *                                 eachNumber => eachNumber % 2 == 0,
   *                                 eachNumber => eachNumber.toString()
   *                             )
   *                             .yield()
   * console.log(groupedByEvenParityToString)
   * // ↑ Map { false => [ '1', '3', '5' ], true => [ '2', '4' ] }
   * ```
   */
  groupBy<KeyType, ValueType = DataType>(
    keySelector: Selector<DataType, KeyType>,
    valueTransform: Transformer<DataType, ValueType> | null = null,
    keySelectorThisArg: any = null,
    valueTransformThisArg: any = null,
  ): KoconutMap<KeyType, Array<ValueType>> {
    keySelector = keySelector.bind(keySelectorThisArg);
    if (valueTransform)
      valueTransform = valueTransform.bind(valueTransformThisArg);
    const koconutToReturn = new KoconutMap<KeyType, Array<ValueType>>();
    (koconutToReturn as any as KoconutOpener<Map<KeyType, Array<ValueType>>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedMap = new Map<KeyType, Array<ValueType>>();
        for (const eachDatum of this.data!) {
          const eachKey = await keySelector(eachDatum);
          const eachValue = valueTransform
            ? await valueTransform(eachDatum)
            : eachDatum;
          if (!processedMap.has(eachKey))
            processedMap.set(eachKey, new Array());
          processedMap.get(eachKey)?.push(eachValue as ValueType);
        }
        return processedMap;
      });
    return koconutToReturn;
  }

  // No Comment -- KoconutArray/KoconutSet
  groupByTo<KeyType, ValueType = DataType>(
    destination: Map<KeyType, Array<ValueType>>,
    keySelector: Selector<DataType, KeyType>,
    valueTransform: Transformer<DataType, ValueType> | null,
    keySelectorThisArg: any,
    valueTransformThisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    keySelector = keySelector.bind(keySelectorThisArg);
    if (valueTransform)
      valueTransform = valueTransform.bind(valueTransformThisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        for (const eachDatum of this.data!) {
          const eachKey = await keySelector(eachDatum);
          const eachValue = valueTransform
            ? await valueTransform(eachDatum)
            : eachDatum;
          if (!destination.has(eachKey)) destination.set(eachKey, new Array());
          destination.get(eachKey)?.push(eachValue as ValueType);
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  // No Comment -- KoconutArray/KoconutSet
  mapTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<DataType, ResultDataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(
      super.mapTo(destination, transform, thisArg),
    );
  }

  // No Comment -- KoconutArray/KoconutSet
  mapNotNullTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: Transformer<DataType, ResultDataType | void | null | undefined>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    return KoconutCollection.fromIterable(
      super.mapNotNullTo(destination, transform, thisArg),
    );
  }

  /**
   * Returns a list of all elements yielded from results of ```transform``` function being invoked
   * on each element and its index in the original collection.
   *
   * @param {IndexedTransformer<DataType, ResultDataType>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutArray<ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const sumsOfIndexesAndNumbers = await koconutArray
   *                   .mapIndexed((eachIndex, eachNumber) => eachIndex + eachNumber)
   *                   .yield()
   * console.log(sumsOfIndexesAndNumbers)
   * // ↑ [ 1, 3, 5, 7, 9 ]
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const productsOfIndexesAndNumbers = await koconutSet
   *                   .mapIndexed((eachIndex, eachNumber) => eachIndex * eachNumber)
   *                   .yield()
   * console.log(productsOfIndexesAndNumbers)
   * // ↑ [ 0, 2, 6, 12, 20 ]
   *
   * // Case 3 -- You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const averagesOfIndexesAndNumbers = await koconutArray2
   *                   .mapIndexed(async (eachIndex, eachNumber) => (eachIndex + eachNumber)/2)
   *                   .yield()
   * console.log(averagesOfIndexesAndNumbers)
   * // ↑ [ 0.5, 1.5, 2.5, 3.5, 4.5 ]
   *
   * const indexesMinusNumbers = await koconutArray2
   *               .mapIndexed((eachIndex, eachNumber) => new Promise(resolve => {
   *                   resolve(eachIndex - eachNumber)
   *               }))
   *               .yield()
   * console.log(indexesMinusNumbers)
   * // ↑ [ -1, -1, -1, -1, -1 ]
   * ```
   */
  mapIndexed<ResultDataType>(
    transform: IndexedTransformer<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries())
          processedArray.push(await transform(eachIndex as number, eachDatum));
        return processedArray;
      });
    return koconutToReturn;
  }

  // No Comment -- KoconutArray/KoconutSet
  mapIndexedTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: IndexedTransformer<DataType, ResultDataType>,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const mappedCollection = this.mapIndexed(transform, thisArg);
        if (destination instanceof Array) {
          await mappedCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await mappedCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  /**
   * Returns a {@link KoconutArray} containing only the results that are not ```null``` nor ```undefined``` of applying
   * the given ```transform``` function to each element and its index in the original collection.
   *
   * @param {IndexedTransformer< DataType,ResultDataType | void | null | undefined>} transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
   *
   * @param {any} thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
   *
   * @return {KoconutArray<ResultDataType>}
   *
   * @since 1.0.10
   *
   * @category Transformer
   *
   * @example
   * ```typescript
   * // Case 1 -- KoconutArray
   * const koconutArray = KoconutArray.of(1,2,3,4,5)
   *
   * const sumsOfIndexesAndNumbersWhereNumberIsEven = await koconutArray
   *                   .mapIndexedNotNull((eachIndex, eachNumber) => {
   *                       if(eachNumber % 2 == 0)
   *                           return eachIndex + eachNumber
   *                       // return
   *                       // return null
   *                       // return undefined
   *                       // ↑ You can use any one of
   *                       //   them or just omit it.
   *                   })
   *                   .yield()
   * console.log(sumsOfIndexesAndNumbersWhereNumberIsEven)
   * // ↑ [ 3, 7 ]
   *
   * // Case 2 -- KoconutSet
   * const koconutSet = KoconutSet.of(1,2,3,4,5)
   *
   * const productsOfIndexesAndNumbersWhereIndexLessThan2 = await koconutSet
   *                   .mapIndexedNotNull((eachIndex, eachNumber) => {
   *                       if(eachIndex <= 2)
   *                           return eachIndex * eachNumber
   *                   })
   *                   .yield()
   * console.log(productsOfIndexesAndNumbersWhereIndexLessThan2)
   * // ↑ [ 0, 2, 6 ]
   *
   * // Case 3 - You can also do it asynchronously
   * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
   *
   * const sumsOfIndexesAndNumbersWhereNumberIsOdd = await koconutArray2
   *                   .mapIndexedNotNull(async (eachIndex, eachNumber) => {
   *                       if(eachNumber % 2 == 1)
   *                           return eachIndex + eachNumber
   *                   })
   *                   .yield()
   * console.log(sumsOfIndexesAndNumbersWhereNumberIsOdd)
   * // ↑ [ 1, 5, 9 ]
   *
   * const squaredNumbersWhereIndexIsEven = await koconutArray2
   *           .mapIndexedNotNull((eachIndex, eachNumber) => new Promise<number | null>(resolve => {
   *               if(eachIndex % 2 == 0)
   *                   resolve(eachNumber * eachNumber)
   *               else resolve(null)
   *           }))
   *           .yield()
   * console.log(squaredNumbersWhereIndexIsEven)
   * // ↑ [ 1, 9, 25 ]
   * ```
   */
  mapIndexedNotNull<ResultDataType>(
    transform: IndexedTransformer<
      DataType,
      ResultDataType | void | null | undefined
    >,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries()) {
          const eachResultData = await transform(
            eachIndex as number,
            eachDatum,
          );
          if (eachResultData != null && eachResultData != undefined)
            processedArray.push(eachResultData);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  // No Comment -- KoconutArray/KoconutSet
  mapIndexedNotNullTo<ResultDataType>(
    destination: Array<ResultDataType> | Set<ResultDataType>,
    transform: IndexedTransformer<
      DataType,
      ResultDataType | void | null | undefined
    >,
    thisArg: any,
  ): KoconutCollection<DataType, WrapperType> {
    transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const mappedCollection = this.mapIndexedNotNull(transform, thisArg);
        if (destination instanceof Array) {
          await mappedCollection
            .forEach((eachElement) => {
              destination.push(eachElement);
            })
            .process();
        } else {
          await mappedCollection
            .asSet()
            .forEach((eachElement) => {
              destination.add(eachElement);
            })
            .process();
        }
        return this.data!;
      });
    return koconutToReturn;
  }

  /* Functions */
  intersect(other: Iterable<DataType>): KoconutSet<DataType> {
    const koconutToReturn = new KoconutSet<DataType>();
    (koconutToReturn as any as KoconutOpener<Set<DataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedSet = new Set<DataType>();
        const otherArray = KoconutArray.from(other);
        for (const eachDatum of this.data!) {
          if (await otherArray.contains(eachDatum).yield())
            processedSet.add(eachDatum);
        }
        return processedSet;
      });
    return koconutToReturn;
  }

  // joinTo
  // joinToString
  join(
    separator: string = ', ',
    prefix: string = '',
    postfix: string = '',
    limit: number = -1,
    truncated: string = '...',
    transform: Transformer<DataType, any> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<string> {
    if (transform) transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<string>();
    (koconutToReturn as any as KoconutOpener<string>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let resultString = prefix;
        let currentCount = 0;
        const length = this.mSize;
        for (const eachDatum of this.data!) {
          if (currentCount == limit) {
            resultString += truncated;
            break;
          }
          resultString += transform ? await transform(eachDatum) : eachDatum;
          currentCount++;
          if (currentCount != length && currentCount != limit)
            resultString += separator;
        }
        resultString += postfix;
        return resultString;
      });
    return koconutToReturn;
  }

  last(
    predicate: Predicator<DataType> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const dataArray = Array.from(this.data);
        if (predicate) {
          for (let eachIndex = dataArray.length; eachIndex >= 0; eachIndex--)
            if (await predicate(dataArray[eachIndex]))
              return dataArray[eachIndex];
          throw new KoconutNoSuchElementException(`No such element is found`);
        }
        return dataArray[dataArray.length - 1];
      });
    return koconutToReturn;
  }

  lastIndexOf(element: DataType): KoconutPrimitive<number> {
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const dataArray = Array.from(this.data!);
        for (
          let eachIndex = dataArray.length - 1;
          eachIndex >= 0;
          eachIndex--
        ) {
          const eachElement = dataArray[eachIndex];
          if (KoconutTypeChecker.checkIsEquatable(eachElement)) {
            const equalityResult = eachElement.equalsTo(element);
            if (
              (equalityResult instanceof KoconutPrimitive &&
                (await equalityResult.yield())) ||
              (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
            )
              return eachIndex;
          } else if (eachElement == element) return eachIndex;
        }

        return -1;
      });
    return koconutToReturn;
  }

  lastOrNull(
    predicate: Predicator<DataType> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const dataArray = Array.from(this.data!);
        const length = dataArray.length;
        if (length == 0) return null;
        if (predicate) {
          for (let eachIndex = length - 1; eachIndex >= 0; eachIndex--)
            if (await predicate(dataArray[eachIndex]))
              return dataArray[eachIndex];
          return null;
        } else return dataArray[length - 1];
      });
    return koconutToReturn;
  }

  minus(
    elements: DataType | Iterable<DataType>,
  ): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        let dataToExcept = new Array<DataType>();
        if (typeof (elements as any)[Symbol.iterator] === 'function')
          dataToExcept = Array.from(elements as Iterable<DataType>);
        else dataToExcept.push(elements as DataType);
        const koconutDataToExceptArray = KoconutArray.from(dataToExcept);
        for (const eachDatum of this.data!) {
          if (!(await koconutDataToExceptArray.contains(eachDatum).yield()))
            processedArray.push(eachDatum);
        }
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  minusElement(element: DataType): KoconutCollection<DataType, WrapperType> {
    return this.minus(element);
  }

  // orEmpty
  partition(
    predicate: Predicator<DataType>,
    thisArg: any = null,
  ): KoconutPair<WrapperType, WrapperType> {
    predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPair<WrapperType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<Pair<WrapperType, WrapperType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedFirstArray = new Array<DataType>();
        const processedSecondArray = new Array<DataType>();
        for (const eachDatum of this.data!) {
          if (await predicate(eachDatum)) processedFirstArray.push(eachDatum);
          else processedSecondArray.push(eachDatum);
        }
        if (this.data instanceof Array)
          return new Pair(
            processedFirstArray as WrapperType,
            processedSecondArray as WrapperType,
          );
        else
          return new Pair(
            new Set(processedFirstArray) as WrapperType,
            new Set(processedSecondArray) as WrapperType,
          );
      });
    return koconutToReturn;
  }

  plus(
    elements: DataType | Iterable<DataType>,
  ): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = Array.from(this.data!);
        if (typeof (elements as any)[Symbol.iterator] === 'function') {
          const elementsArray = Array.from(elements as Iterable<DataType>);
          for (const eachDatum of elementsArray) processedArray.push(eachDatum);
        } else processedArray.push(elements as DataType);
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  plusElement(element: DataType): KoconutCollection<DataType, WrapperType> {
    return this.plus(element);
  }

  random(): KoconutPrimitive<DataType> {
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const dataArray = Array.from(this.data);
        return dataArray[Math.floor(Math.random() * dataArray.length)];
      });
    return koconutToReturn;
  }

  randomOrNull(): KoconutPrimitive<DataType | null> {
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0) return null;
        const dataArray = Array.from(this.data);
        return dataArray[Math.floor(Math.random() * dataArray.length)];
      });
    return koconutToReturn;
  }

  reduce(
    operation: Operator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
          acc = await operation(acc, dataArray[eachIndex]);
        return acc;
      });
    return koconutToReturn;
  }

  reduceIndexed(
    operation: IndexedOperator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
          acc = await operation(eachIndex, acc, dataArray[eachIndex]);
        return acc;
      });
    return koconutToReturn;
  }

  reduceIndexedOrNull(
    operation: IndexedOperator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0) return null;
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
          acc = await operation(eachIndex, acc, dataArray[eachIndex]);
        return acc;
      });
    return koconutToReturn;
  }

  reduceOrNull(
    operation: Operator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0) return null;
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
          acc = await operation(acc, dataArray[eachIndex]);
        return acc;
      });
    return koconutToReturn;
  }

  // requireNoNulls
  reversed(): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = Array.from(this.data!).reverse();
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  runningFold<ResultDataType>(
    initial: ResultDataType,
    operation: Operator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        processedArray.push(initial);
        for (const eachDatum of this.data!) {
          initial = await operation(initial, eachDatum);
          processedArray.push(initial);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  runningFoldIndexed<ResultDataType>(
    initial: ResultDataType,
    operation: IndexedOperator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        processedArray.push(initial);
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries()) {
          initial = await operation(eachIndex as number, initial, eachDatum);
          processedArray.push(initial);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  runningReduce(
    operation: Operator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutArray<DataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<DataType>();
    (koconutToReturn as any as KoconutOpener<Array<DataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        processedArray.push(acc);
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++) {
          acc = await operation(acc, dataArray[eachIndex]);
          processedArray.push(acc);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  runningReduceIndexed(
    operation: IndexedOperator<DataType, DataType>,
    thisArg: any = null,
  ): KoconutArray<DataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<DataType>();
    (koconutToReturn as any as KoconutOpener<Array<DataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data);
        let acc = dataArray[0];
        processedArray.push(acc);
        for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++) {
          acc = await operation(eachIndex, acc, dataArray[eachIndex]);
          processedArray.push(acc);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  scan<ResultDataType>(
    initial: ResultDataType,
    operation: Operator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        processedArray.push(initial);
        for (const eachDatum of this.data!) {
          initial = await operation(initial, eachDatum);
          processedArray.push(initial);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  scanIndexed<ResultDataType>(
    initial: ResultDataType,
    operation: IndexedOperator<DataType, ResultDataType>,
    thisArg: any = null,
  ): KoconutArray<ResultDataType> {
    operation = operation.bind(thisArg);
    const koconutToReturn = new KoconutArray<ResultDataType>();
    (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<ResultDataType>();
        processedArray.push(initial);
        for (const [eachIndex, eachDatum] of Array.from(this.data!).entries()) {
          initial = await operation(eachIndex as number, initial, eachDatum);
          processedArray.push(initial);
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  shuffled(): KoconutCollection<DataType, WrapperType> {
    const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
    (koconutToReturn as any as KoconutOpener<WrapperType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<DataType>();
        const dataArray = Array.from(this.data!);
        const indexes = Object.keys(dataArray).map((eachIndex) =>
          parseInt(eachIndex),
        );
        while (indexes.length > 0)
          processedArray.push(
            dataArray[
              indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]
            ],
          );
        if (this.data instanceof Array) return processedArray as WrapperType;
        else return new Set(processedArray) as WrapperType;
      });
    return koconutToReturn;
  }

  single(
    predicate: Predicator<DataType> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<DataType> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType>();
    (koconutToReturn as any as KoconutOpener<DataType>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || this.mSize == 0)
          throw new KoconutNoSuchElementException(
            `Source data is null or empty`,
          );
        if (predicate) {
          let dataToReturn: DataType | null = null;
          for (const eachDatum of this.data) {
            if (await predicate(eachDatum)) {
              if (dataToReturn == null) dataToReturn = eachDatum;
              else
                throw new KoconutConflictException(
                  'There are more than 2 elements maching the given predicate',
                );
            }
          }
          if (dataToReturn == null)
            throw new KoconutNoSuchElementException(
              'No element exists matching the given predicate',
            );
          else return dataToReturn;
        } else return Array.from(this.data)[0];
      });
    return koconutToReturn;
  }

  singleOrNull(
    predicate: Predicator<DataType> | null = null,
    thisArg: any = null,
  ): KoconutPrimitive<DataType | null> {
    if (predicate) predicate = predicate.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<DataType | null>();
    (koconutToReturn as any as KoconutOpener<DataType | null>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        if (this.data == null || Array.from(this.data).length == 0) return null;
        if (predicate) {
          let dataToReturn: DataType | null = null;
          for (const eachDatum of this.data) {
            if (await predicate(eachDatum))
              if (dataToReturn == null) dataToReturn = eachDatum;
              else return null;
          }
          return dataToReturn;
        } else return Array.from(this.data)[0];
      });
    return koconutToReturn;
  }

  subtract(other: Iterable<DataType>): KoconutSet<DataType> {
    const koconutToReturn = new KoconutSet<DataType>();
    (koconutToReturn as any as KoconutOpener<Set<DataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedSet = new Set<DataType>();
        const koconutDataToExceptArray = KoconutArray.from(other);
        for (const eachDatum of this.data!) {
          if (!(await koconutDataToExceptArray.contains(eachDatum).yield()))
            processedSet.add(eachDatum);
        }
        return processedSet;
      });
    return koconutToReturn;
  }

  sumBy(
    selector: Selector<DataType, number>,
    thisArg: any = null,
  ): KoconutPrimitive<number> {
    selector = selector.bind(thisArg);
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let sum = 0;
        for (const eachDatum of this.data!) {
          sum += await selector(eachDatum);
        }
        return sum;
      });
    return koconutToReturn;
  }

  // sumByDouble
  // sumOf

  union(other: Iterable<DataType>): KoconutSet<DataType> {
    const koconutToReturn = new KoconutSet<DataType>();
    (koconutToReturn as any as KoconutOpener<Set<DataType>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedSet = new Set(this.data);
        for (const eachDatum of other) processedSet.add(eachDatum);
        return (await KoconutSet.from(processedSet)
          .distinct()
          .yield()) as Set<DataType>;
      });
    return koconutToReturn;
  }

  // unzip
  windowed<ResultDataType>(
    size: number,
    step: number,
    partialWindows: boolean,
    transform: Transformer<Array<DataType>, ResultDataType> | null,
    thisArg: any,
  ): KoconutArray<Array<DataType> | ResultDataType>;
  /** @ignore */
  windowed(size: number): KoconutArray<Array<DataType>>;
  /** @ignore */
  windowed(size: number, step: number): KoconutArray<Array<DataType>>;
  /** @ignore */
  windowed(
    size: number,
    step: number,
    partialWindows: boolean,
  ): KoconutArray<Array<DataType>>;
  /** @ignore */
  windowed<ResultDataType>(
    size: number,
    step: number,
    partialWindows: boolean,
    transform: Transformer<Array<DataType>, ResultDataType>,
  ): KoconutArray<ResultDataType>;
  /** @ignore */
  windowed<ResultDataType>(
    size: number,
    step: number,
    partialWindows: boolean,
    transform: Transformer<Array<DataType>, ResultDataType>,
    thisArg: any,
  ): KoconutArray<ResultDataType>;
  windowed<ResultDataType>(
    size: number,
    step: number = 1,
    partialWindows: boolean = false,
    transform: Transformer<Array<DataType>, ResultDataType> | null = null,
    thisArg: any = null,
  ): KoconutArray<Array<DataType> | ResultDataType> {
    if (size < 0) size = -size;
    if (step < 0) step = -step;
    if (transform) transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<
      Array<DataType> | ResultDataType
    >();
    (
      koconutToReturn as any as KoconutOpener<
        Array<Array<DataType>> | Array<ResultDataType>
      >
    )
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<Array<DataType>>();
        let currentIndex = 0;
        const dataArray = Array.from(this.data!);
        while (currentIndex < dataArray.length) {
          const eachChunkedData = dataArray.slice(
            currentIndex,
            currentIndex + size,
          );
          currentIndex += step;
          if (partialWindows || eachChunkedData.length == size)
            processedArray.push(eachChunkedData);
        }
        if (transform) {
          const transformedArray = new Array<ResultDataType>();
          for (const eachProcessedDatum of processedArray)
            transformedArray.push(await transform(eachProcessedDatum));
          return transformedArray;
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  withIndex(): KoconutArray<Entry<number, DataType>> {
    const koconutToReturn = new KoconutArray<Entry<number, DataType>>();
    (koconutToReturn as any as KoconutOpener<Array<Entry<number, DataType>>>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<Entry<number, DataType>>();
        for (const [index, element] of Array.from(this.data!).entries()) {
          processedArray.push(new Entry(index as number, element));
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  zip<OtherDataType, ResultDataType>(
    other: Iterable<OtherDataType>,
    transform: Zipper<DataType, OtherDataType, ResultDataType> | null,
    thisArg: any,
  ): KoconutArray<Pair<DataType, OtherDataType> | ResultDataType>;
  zip<OtherDataType>(
    other: Iterable<OtherDataType>,
  ): KoconutArray<Pair<DataType, OtherDataType>>;
  zip<OtherDataType, ResultDataType>(
    other: Iterable<OtherDataType>,
    transform: Zipper<DataType, OtherDataType, ResultDataType>,
  ): KoconutArray<ResultDataType>;
  zip<OtherDataType, ResultDataType>(
    other: Iterable<OtherDataType>,
    transform: Zipper<DataType, OtherDataType, ResultDataType>,
    thisArg: any,
  ): KoconutArray<ResultDataType>;
  zip<OtherDataType, ResultDataType>(
    other: Iterable<OtherDataType>,
    transform: Zipper<DataType, OtherDataType, ResultDataType> | null = null,
    thisArg: any = null,
  ): KoconutArray<Pair<DataType, OtherDataType> | ResultDataType> {
    if (transform) transform = transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<
      Pair<DataType, OtherDataType> | ResultDataType
    >();
    (
      koconutToReturn as any as KoconutOpener<
        Array<Pair<DataType, OtherDataType>> | Array<ResultDataType>
      >
    )
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<Pair<DataType, OtherDataType>>();
        const dataArray = Array.from(this.data!);
        const otherArray = Array.from(other);
        const minLength =
          dataArray.length < otherArray.length
            ? dataArray.length
            : otherArray.length;
        for (let eachIndex = 0; eachIndex < minLength; eachIndex++)
          processedArray.push(
            new Pair(dataArray[eachIndex], otherArray[eachIndex]),
          );
        if (transform) {
          const transformedArray = new Array<ResultDataType>();
          for (const eachProcessedData of processedArray)
            transformedArray.push(
              await transform(
                eachProcessedData.first,
                eachProcessedData.second,
              ),
            );
          return transformedArray;
        }
        return processedArray;
      });
    return koconutToReturn;
  }

  zipWithNext<ResultDataType>(
    transform: Zipper<DataType, DataType, ResultDataType> | null,
    thisArg: any,
  ): KoconutArray<Pair<DataType, DataType> | ResultDataType>;
  zipWithNext(): KoconutArray<Pair<DataType, DataType>>;
  zipWithNext<ResultDataType>(
    transform: Zipper<DataType, DataType, ResultDataType>,
  ): KoconutArray<ResultDataType>;
  zipWithNext<ResultDataType>(
    transform: Zipper<DataType, DataType, ResultDataType>,
    thisArg: any,
  ): KoconutArray<ResultDataType>;
  zipWithNext<ResultDataType>(
    transform: Zipper<DataType, DataType, ResultDataType> | null = null,
    thisArg: any = null,
  ): KoconutArray<Pair<DataType, DataType> | ResultDataType> {
    if (transform) transform.bind(thisArg);
    const koconutToReturn = new KoconutArray<
      Pair<DataType, DataType> | ResultDataType
    >();
    (
      koconutToReturn as any as KoconutOpener<
        Array<Pair<DataType, DataType>> | Array<ResultDataType>
      >
    )
      .setPrevYieldable(this)
      .setProcessor(async () => {
        const processedArray = new Array<Pair<DataType, DataType>>();
        const dataArray = Array.from(this.data!);
        /* istanbul ignore else */
        if (dataArray.length >= 2) {
          for (let eachIndex = 0; eachIndex < dataArray.length - 1; eachIndex++)
            processedArray.push(
              new Pair(dataArray[eachIndex], dataArray[eachIndex + 1]),
            );
        }
        if (transform) {
          const transformedArray = new Array<ResultDataType>();
          for (const eachProcessedDatum of processedArray)
            transformedArray.push(
              await transform(
                eachProcessedDatum.first,
                eachProcessedDatum.second,
              ),
            );
          return transformedArray;
        }
        return processedArray;
      });
    return koconutToReturn;
  }
}
