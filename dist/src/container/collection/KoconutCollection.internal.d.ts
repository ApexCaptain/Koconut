import { KoconutPrimitive, KoconutPair, Pair, Entry, KoconutIterable, KoconutArray, KoconutSet, KoconutMap, KoconutLoopSignal, KoconutEquatable, KoconutComparable } from "../../../module.internal";
/** @internal */
export declare class KoconutCollection<DataType, WrapperType extends Array<DataType> | Set<DataType>> extends KoconutIterable<DataType, DataType, WrapperType, WrapperType> {
    validate(data: WrapperType | null): Promise<void>;
    protected mSize: number;
    size(): KoconutPrimitive<number>;
    protected mIndices: number[];
    indices(): KoconutArray<number>;
    associate<KeyType, ValueType>(transform: (element: DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Promise<[KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType>>, thisArg?: any): KoconutMap<KeyType, ValueType>;
    associateBy<KeyType, ValueType = DataType>(keySelector: (element: DataType) => KeyType | Promise<KeyType>, valueTransform?: ((element: DataType) => ValueType | Promise<ValueType>) | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutMap<KeyType, ValueType>;
    associateByTo<KeyType, ValueType = DataType>(destination: Map<KeyType, ValueType>, keySelector: (element: DataType) => KeyType | Promise<KeyType>, valueTransform?: ((element: DataType) => ValueType | Promise<ValueType>) | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutCollection<DataType, WrapperType>;
    associateTo<KeyType, ValueType>(destination: Map<KeyType, ValueType>, transform: (element: DataType) => [KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType> | Promise<[KeyType, ValueType] | Pair<KeyType, ValueType> | KoconutPair<KeyType, ValueType>>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    associateWith<ValueType>(valueSelector: (element: DataType) => ValueType | Promise<ValueType>, thisArg?: any): KoconutMap<DataType, ValueType>;
    associateWithTo<ValueType>(destination: Map<DataType, ValueType>, valueSelector: (element: DataType) => ValueType | Promise<ValueType>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    chunked(size: number): KoconutArray<Array<DataType>>;
    chunked<ResultDataType>(size: number, transform: (elements: Array<DataType>) => ResultDataType | Promise<ResultDataType>): KoconutArray<ResultDataType>;
    chunked<ResultDataType>(size: number, transform: (elements: Array<DataType>) => ResultDataType | Promise<ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    contains(element: DataType): KoconutPrimitive<boolean>;
    containsAll(elements: Iterable<DataType>): KoconutPrimitive<boolean>;
    distinct(): KoconutCollection<DataType, WrapperType>;
    distinctBy<KeyType, EuqatableKeyType extends KoconutEquatable>(selector: (element: DataType) => KeyType | EuqatableKeyType | Promise<KeyType | EuqatableKeyType>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    drop(n: number): KoconutCollection<DataType, WrapperType>;
    dropLast(n: number): KoconutCollection<DataType, WrapperType>;
    dropLastWhile(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    dropWhile(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    elementAt(index: number): KoconutPrimitive<DataType>;
    elementAtOrElse(index: number, defaultValue: (index: number) => DataType): KoconutPrimitive<DataType>;
    elementAtOrNull(index: number): KoconutPrimitive<DataType | null>;
    filter(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    filterIndexed(predicate: (index: number, element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    filterIndexedTo(destination: Array<DataType> | Set<DataType>, predicate: (index: number, element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    filterNot(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    filterNotNull(): KoconutCollection<DataType, WrapperType>;
    filterNotNullTo(destination: Array<DataType> | Set<DataType>): KoconutCollection<DataType, WrapperType>;
    filterNotTo(destination: Array<DataType> | Set<DataType>, predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    filterTo(destination: Array<DataType> | Set<DataType>, predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    find(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<DataType | null>;
    findLast(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<DataType | null>;
    first(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType>;
    firstOrNull(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    flatMapIndexed<ResultDataType>(transform: (index: number, element: DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>, thisArg?: any): KoconutArray<ResultDataType>;
    flatMapIndexedTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (index: number, element: DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    flatMapTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (element: DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    fold<ResultDataType>(initial: ResultDataType, operation: (acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutPrimitive<ResultDataType>;
    foldIndexed<ResultDataType>(initial: ResultDataType, operation: (index: number, acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutPrimitive<ResultDataType>;
    groupBy<KeyType, ValueType = DataType>(keySelector: (element: DataType) => KeyType | Promise<KeyType>, valueTransform?: ((element: DataType) => ValueType | Promise<ValueType>) | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutMap<KeyType, Array<ValueType>>;
    groupByTo<KeyType, ValueType = DataType>(destination: Map<KeyType, Array<ValueType>>, keySelector: (element: DataType) => KeyType | Promise<KeyType>, valueTransform?: ((element: DataType) => ValueType | Promise<ValueType>) | null, keySelectorThisArg?: any, valueTransformThisArg?: any): KoconutCollection<DataType, WrapperType>;
    indexOf(elementToFind: DataType): KoconutPrimitive<number>;
    indexOfFirst(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<number>;
    indexOfLast(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<number>;
    intersect(other: Iterable<DataType>): KoconutSet<DataType>;
    isNotEmpty(): KoconutPrimitive<boolean>;
    isNullOrEmpty(): KoconutPrimitive<boolean>;
    join(separator?: string, prefix?: string, postfix?: string, limit?: number, truncated?: string, transform?: ((element: DataType) => any | Promise<any>) | null, thisArg?: any): KoconutPrimitive<string>;
    last(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType>;
    lastIndexOf(element: DataType): KoconutPrimitive<number>;
    lastOrNull(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    map<ResultDataType>(transform: (element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    mapIndexed<ResultDataType>(transform: (index: number, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    mapIndexedNotNull<ResultDataType>(transform: (index: number, element: DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>, thisArg?: any): KoconutArray<ResultDataType>;
    mapIndexedNotNullTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (index: number, element: DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    mapIndexedTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (index: number, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    mapNotNull<ResultDataType>(transform: (element: DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>, thisArg?: any): KoconutArray<ResultDataType>;
    mapNotNullTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (element: DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    mapTo<ResultDataType>(destination: Array<ResultDataType> | Set<ResultDataType>, transform: (element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    maxOfWith<ResultDataType>(selector: (element: DataType) => ResultDataType | Promise<ResultDataType>, comparator: (front: ResultDataType, rear: ResultDataType) => number | Promise<number>, selectorThisArg?: any, comparatorThisArg?: any): KoconutPrimitive<ResultDataType>;
    maxOfWithOrNull<ResultDataType>(selector: (element: DataType) => ResultDataType | Promise<ResultDataType>, comparator: (front: ResultDataType, rear: ResultDataType) => number | Promise<number>, selectorThisArg?: any, comparatorThisArg?: any): KoconutPrimitive<ResultDataType | null>;
    maxWithOrNull(comparator: (front: DataType, rear: DataType) => number | Promise<number>, thisArg?: any): KoconutPrimitive<DataType | null>;
    minByOrNull(selector: (element: DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>, thisArg?: any): KoconutPrimitive<DataType | null>;
    minOf(selector: (element: DataType) => number | Promise<number>): KoconutPrimitive<number>;
    minOf(selector: (element: DataType) => number | Promise<number>, thisArg: any): KoconutPrimitive<number>;
    minOf(selector: (element: DataType) => string | Promise<string>): KoconutPrimitive<string>;
    minOf(selector: (element: DataType) => string | Promise<string>, thisArg: any): KoconutPrimitive<string>;
    minOf<ComparableType extends KoconutComparable>(selector: (element: DataType) => ComparableType | Promise<ComparableType>): KoconutPrimitive<ComparableType>;
    minOf<ComparableType extends KoconutComparable>(selector: (element: DataType) => ComparableType | Promise<ComparableType>, thisArg: any): KoconutPrimitive<ComparableType>;
    minOfOrNull(selector: (element: DataType) => number | Promise<number>): KoconutPrimitive<number | null>;
    minOfOrNull(selector: (element: DataType) => number | Promise<number>, thisArg: any): KoconutPrimitive<number | null>;
    minOfOrNull(selector: (element: DataType) => string | Promise<string>): KoconutPrimitive<string | null>;
    minOfOrNull(selector: (element: DataType) => string | Promise<string>, thisArg: any): KoconutPrimitive<string | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(selector: (element: DataType) => ComparableType | Promise<ComparableType>): KoconutPrimitive<ComparableType | null>;
    minOfOrNull<ComparableType extends KoconutComparable>(selector: (element: DataType) => ComparableType | Promise<ComparableType>, thisArg: any): KoconutPrimitive<ComparableType | null>;
    minOfWith<ResultDataType>(selector: (element: DataType) => ResultDataType | Promise<ResultDataType>, comparator: (front: ResultDataType, rear: ResultDataType) => number | Promise<number>, selectorThisArg?: any, comparatorThisArg?: any): KoconutPrimitive<ResultDataType>;
    minOfWithOrNull<ResultDataType>(selector: (element: DataType) => ResultDataType | Promise<ResultDataType>, comparator: (front: ResultDataType, rear: ResultDataType) => number | Promise<number>, selectorThisArg?: any, comparatorThisArg?: any): KoconutPrimitive<ResultDataType | null>;
    minus(elements: DataType | Iterable<DataType>): KoconutCollection<DataType, WrapperType>;
    minusElement(element: DataType): KoconutCollection<DataType, WrapperType>;
    minWithOrNull(comparator: (front: DataType, rear: DataType) => number | Promise<number>, thisArg?: any): KoconutPrimitive<DataType | null>;
    none(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<boolean>;
    onEach(action: (element: DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    onEachIndexed(action: (index: number, element: DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    partition(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPair<WrapperType, WrapperType>;
    plus(elements: DataType | Iterable<DataType>): KoconutCollection<DataType, WrapperType>;
    plusElement(element: DataType): KoconutCollection<DataType, WrapperType>;
    random(): KoconutPrimitive<DataType>;
    randomOrNull(): KoconutPrimitive<DataType | null>;
    reduce(operation: (acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutPrimitive<DataType>;
    reduceIndexed(operation: (index: number, acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutPrimitive<DataType>;
    reduceIndexedOrNull(operation: (index: number, acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    reduceOrNull(operation: (acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutPrimitive<DataType | null>;
    reversed(): KoconutCollection<DataType, WrapperType>;
    runningFold<ResultDataType>(initial: ResultDataType, operation: (acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    runningFoldindexed<ResultDataType>(initial: ResultDataType, operation: (index: number, acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    runningReduce(operation: (acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutArray<DataType>;
    runningReduceIndexed(operation: (index: number, acc: DataType, element: DataType) => DataType | Promise<DataType>, thisArg?: any): KoconutArray<DataType>;
    scan<ResultDataType>(initial: ResultDataType, operation: (acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    scanIndexed<ResultDataType>(initial: ResultDataType, operation: (index: number, acc: ResultDataType, element: DataType) => ResultDataType | Promise<ResultDataType>, thisArg?: any): KoconutArray<ResultDataType>;
    shuffled(): KoconutCollection<DataType, WrapperType>;
    single(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType>;
    singleOrNull(predicate?: ((element: DataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<DataType | null>;
    sortedBy(selector: (element: DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    sortedByDescending(selector: (element: DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    sortedWith(comparator: (front: DataType, rear: DataType) => number | Promise<number>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    substarct(other: Iterable<DataType>): KoconutSet<DataType>;
    sumBy(selector: (element: DataType) => number | Promise<number>, thisArg?: any): KoconutPrimitive<number>;
    take(n: number): KoconutCollection<DataType, WrapperType>;
    takeLast(n: number): KoconutCollection<DataType, WrapperType>;
    takeLastWhile(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    takeWhile(predicate: (element: DataType) => boolean | Promise<boolean>, thisArg?: any): KoconutCollection<DataType, WrapperType>;
    toArray(): KoconutArray<DataType>;
    toSet(): KoconutSet<DataType>;
    union(other: Iterable<DataType>): KoconutSet<DataType>;
    windowed(size: number): KoconutArray<Array<DataType>>;
    windowed(size: number, step: number): KoconutArray<Array<DataType>>;
    windowed(size: number, step: number, partialWindows: boolean): KoconutArray<Array<DataType>>;
    windowed<ResultDataType>(size: number, step: number, partialWindows: boolean, transform: (elements: Array<DataType>) => ResultDataType | Promise<ResultDataType>): KoconutArray<ResultDataType>;
    windowed<ResultDataType>(size: number, step: number, partialWindows: boolean, transform: (elements: Array<DataType>) => ResultDataType | Promise<ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    withIndex(): KoconutArray<Entry<number, DataType>>;
    zip<OtherDataType>(other: Iterable<OtherDataType>): KoconutArray<Pair<DataType, OtherDataType>>;
    zip<OtherDataType, ResultDataType>(other: Iterable<OtherDataType>, transform: (originalData: DataType, otherData: OtherDataType) => ResultDataType | Promise<ResultDataType>): KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(other: Iterable<OtherDataType>, transform: (originalData: DataType, otherData: OtherDataType) => ResultDataType | Promise<ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
    zipWithNext(): KoconutArray<Pair<DataType, DataType>>;
    zipWithNext<ResultDataType>(transform: (firstData: DataType, secondData: DataType) => ResultDataType | Promise<ResultDataType>): KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(transform: (firstData: DataType, secondData: DataType) => ResultDataType | Promise<ResultDataType>, thisArg: any): KoconutArray<ResultDataType>;
}
