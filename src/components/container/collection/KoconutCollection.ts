`use strict`

import {
    /* Tool */
    KoconutPrimitive, KoconutOpener, KoconutTypeChecker,

    /* Base */
    KoconutPair, Pair, Entry, 

    /* Container */
    KoconutIterable, KoconutArray, KoconutSet, KoconutMap, KoconutBoolean, Sequence,

    /* Enum*/
    KoconutLoopSignal,

    /* Exception */
    KoconutInvalidArgumentException, KoconutIndexOutOfBoundsException, KoconutNoSuchElementException, KoconutConflictException,

    /* Protocol */
    KoconutEquatable, KoconutComparable
} from "../../../module"
import { KoconutEntry } from "../base/KoconutEntry"

/** @internal */
export class KoconutCollection<DataType, WrapperType extends Array<DataType> | Sequence<DataType>| Set<DataType>> extends KoconutIterable<DataType, DataType, WrapperType, WrapperType> {

    /* Koconut Primitive */
    async validate(data : WrapperType | null) {
        if(data != null) {
            const dataArray = Array.from(data)
            this.mSize = dataArray.length
            Object
                .keys(dataArray)
                .map(eachString => parseInt(eachString))
                .forEach(eachIndex => this.mIndices.push(eachIndex))
            this.combinedDataWrapper = data
        }   
        
    }


    private static fromIterable<DataType, WrapperType extends Array<DataType> | Sequence<DataType>| Set<DataType>>(
        iterable : KoconutIterable<DataType, DataType, WrapperType, WrapperType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>(iterable['data'])
        koconutToReturn.processor = iterable['processor']
        koconutToReturn.prevYieldable = iterable['prevYieldable']
        return koconutToReturn

    }

    /* Properties */
    size() : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mSize)
        return koconutToReturn

    }
    protected mIndices = new Array<number>()
    indices() : KoconutArray<number> {

        const koconutToReturn = new KoconutArray<number>();
        (koconutToReturn as any as KoconutOpener<Array<number>>)
            .setPrevYieldable(this)
            .setProcessor(async () => this.mIndices)
        return koconutToReturn

    }
    
    



















    
    // Accumulator
    /**
     * Accumulates value starting with ```initial``` value and applying ```operation``` 
     * from left to right to current accumulator value and each element.
     * @param initial A value to use as the first argument to the first call of the ```operation```.
     * @param operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value 
     * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let dataToReturn = initial
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        dataToReturn = await operation(dataToReturn, eachDatum)
                }
                return dataToReturn
            })
        return koconutToReturn

    }


    /**     
     * Accumulates value starting with ```initial``` value and applying ```operation``` 
     * from left to right to current accumulator value and each element.
     * @param initial A value to use as the first argument to the first call of the ```operation```.
     * @param operation A callback function that accepts one argument. The ```operation``` accumulates callback's return value. It's accumulated value 
     * previously returned in the last invocation of the callback or ```initial``` value. The method calls the ```operation``` one time for each element and index in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```operation```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutPrimitive<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<ResultDataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let dataToReturn = initial
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        dataToReturn = await operation(eachIndex as number, dataToReturn, eachDatum)
                }
                return dataToReturn
            })
        return koconutToReturn

    }


















    
    // Inspector
    /**
     * Checks if the specified element is contained in this collection.
     * @param element The element to search for.
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
    contains(
        element : DataType
    ) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                for(let eachDatum of this.data) {
                    var isContained = false
                    if(KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                        const equalityResult = eachDatum.equalsTo(element)
                        if(equalityResult instanceof KoconutPrimitive) isContained = await equalityResult.yield()
                        else isContained = equalityResult
                    } else isContained = eachDatum == element
                    if(isContained) return true
                }
                return false
            })
        return koconutToReturn

    }

    /**
     * Checks if all the elements are contained in this collection.
     * @param elements The elements to search for.
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
    containsAll(
        elements : Iterable<DataType>
    ) : KoconutBoolean {

        const koconutToReturn = new KoconutBoolean();
        (koconutToReturn as any as KoconutOpener<boolean>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return false
                const dataArray = Array.from(this.data)
                for(const eachElementToCheck of elements) {
                    if(KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
                        let isIncluded = false
                        for(const eachDatum of dataArray) {
                            const equalityResult = eachElementToCheck.equalsTo(eachDatum)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) {
                                isIncluded = true
                                break
                            }
                        }
                        if(!isIncluded) return false
                    } else if(!dataArray.includes(eachElementToCheck)) return false
                }
                return true
            })
        return koconutToReturn

    }



















    
    // Iterator
    /**
     * Performs the given ```action``` on each element, providing sequential index with the element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts two arguments. The method calls the ```action``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutPrimitive<void> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<void>();
        (koconutToReturn as any as KoconutOpener<void>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachCombinedDatum of this.data) {
                        const signal = await action(eachIndex++, eachCombinedDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    onEach(
        action : (element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.onEach(action, thisArg))

    }

    // No Comment - KoconutArray/KoconutSet
    onEachIndexed(
        action : (index : number, element : DataType) => boolean | KoconutLoopSignal | void | Promise<boolean | KoconutLoopSignal | void>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        action = action.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachDatum of this.data) {
                        const signal = await action(eachIndex++, eachDatum)
                        if(signal == false || signal == KoconutLoopSignal.BREAK) break
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }



















    
    // Manipulator
    // No Comment - KoconutArray/KoconutSet
    distinct() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        if(KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                            let isConflict = false
                            for(const eachPrevEquatableDatum of processedArray) {
                                const equalityResult = eachDatum.equalsTo(eachPrevEquatableDatum)
                                if(
                                    (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                    || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                                ) {
                                    isConflict = true
                                    break
                                }
                            }
                            if(!isConflict) processedArray.push(eachDatum)
                        } else  {
                            processedArray = Array.from(new Set(this.data))
                            break
                        }
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    distinctBy<KeyType, EuqatableKeyType extends KoconutEquatable>(
        selector : (element : DataType) => KeyType | EuqatableKeyType | Promise<KeyType | EuqatableKeyType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    const keyArray = new Array<KeyType>()
                    const equatableKeyArray = new Array<EuqatableKeyType>()
                    for(const eachDatum of this.data) {
                        const eachKey = await selector(eachDatum)
                        if(KoconutTypeChecker.checkIsEquatable(eachKey)) {
                            let isConflict = false
                            for(const eachPrevEquatableKey of equatableKeyArray) {
                                const equalityResult = eachPrevEquatableKey.equalsTo(eachKey)
                                if(
                                    (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                    || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                                ) {
                                    isConflict = true
                                    break
                                }
                            }
                            if(!isConflict) {
                                equatableKeyArray.push(eachKey)
                                processedArray.push(eachDatum)
                            }
                        } else {
                            if(!keyArray.includes(eachKey)) {
                                keyArray.push(eachKey)
                                processedArray.push(eachDatum)
                            }
                        }
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    drop(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {
        if(n < 0) throw new KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) processedArray = Array.from(this.data).slice(n)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    dropLast(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        if(n < 0) throw new KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) processedArray = Array.from(this.data).slice(0, -n)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    dropLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let indexNumber = 0
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--) {
                        if(!await predicate(dataArray[eachIndex])) {
                            indexNumber = eachIndex
                            break
                        }
                    }
                    processedArray = dataArray.slice(0, indexNumber + 1)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    dropWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let indexNumber = dataArray.length
                    for(let eachIndex in dataArray) {
                        if(!await predicate(dataArray[eachIndex])) {
                            indexNumber = parseInt(eachIndex)
                            break
                        }
                    }
                    processedArray = dataArray.slice(indexNumber)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    filter(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.filter(predicate, thisArg))

    }


    // No Comment - KoconutArray/KoconutSet
    filterNot(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.filterNot(predicate, thisArg))

    }


    // No Comment - KoconutArray/KoconutSet
    filterTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const filteredCollection = this.filter(predicate, thisArg)
                if(destination instanceof Array) {
                    await filteredCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await filteredCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }
    

    // No Comment - KoconutArray/KoconutSet
    filterNotTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const filteredCollection = this.filterNot(predicate, thisArg)
                if(destination instanceof Array) {
                    await filteredCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await filteredCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    filterIndexed(
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) 
                        if(await predicate(eachIndex as number, eachDatum)) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    filterIndexedTo(
        destination : Array<DataType> | Set<DataType>,
        predicate : (index : number, element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const filteredCollection = this.filterIndexed(predicate, thisArg)
                if(destination instanceof Array) {
                    await filteredCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await filteredCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


    // filterIsInstance
    // filterIsInstanceTo


    // No Comment - KoconutArray/KoconutSet
    filterNotNull() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    for(const eachDatum of this.data)
                        if(eachDatum != null) processedArray.push(eachDatum)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    filterNotNullTo(
        destination : Array<DataType> | Set<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const filteredCollection = this.filterNotNull()
                if(destination instanceof Array) {
                    await filteredCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await filteredCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    sortedBy(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex])
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(processedArray[middleIndex])
                            var isCurrentGreater = false
                            if(KoconutTypeChecker.checkIsComparable(currentComparable)) {
                                const eachCompareResult = currentComparable.compareTo(targetComparable)
                                let numberResult = 0
                                if(eachCompareResult instanceof KoconutPrimitive) numberResult = await eachCompareResult.yield()
                                else numberResult = eachCompareResult
                                if(numberResult > 0) isCurrentGreater = true
                            } else isCurrentGreater = targetComparable < currentComparable
                            if(isCurrentGreater) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                        
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    sortedByDescending(
        selector : (element : DataType) => number | string | KoconutComparable | Promise<number | string | KoconutComparable>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        const currentComparable = await selector(dataArray[eachIndex])
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            const targetComparable = await selector(processedArray[middleIndex])
                            var isCurrentLesser = false
                            if(KoconutTypeChecker.checkIsComparable(currentComparable)) {
                                const eachCompareResult = currentComparable.compareTo(targetComparable)
                                let numberResult = 0
                                if(eachCompareResult instanceof KoconutPrimitive) numberResult = await eachCompareResult.yield()
                                else numberResult = eachCompareResult
                                if(numberResult < 0) isCurrentLesser = true
                            } else isCurrentLesser = targetComparable > currentComparable
                            if(isCurrentLesser) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                        
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    sortedWith(
        comparator : (front : DataType, rear : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        comparator = comparator.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex in dataArray) {
                        let startIndex = 0
                        let middleIndex : number
                        let endIndex = processedArray.length
                        while(startIndex < endIndex) {
                            middleIndex = Math.floor((startIndex + endIndex) / 2)
                            if(await comparator(dataArray[eachIndex], processedArray[middleIndex]) >= 0) startIndex = middleIndex + 1
                            else endIndex = middleIndex
                        }
                        processedArray.splice(endIndex, 0, dataArray[eachIndex])
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    take(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).slice(0, n) : new Array<DataType>();
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    takeLast(
        n : number
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).slice(this.mSize - n, this.mSize) : new Array<DataType>()
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }
    

    // No Comment - KoconutArray/KoconutSet
    takeLastWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>();
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    let targetIndex = this.mSize - 1
                    for(; targetIndex >= 0 ; targetIndex--) {
                        if(!await predicate(dataArray[targetIndex])) break
                    }
                    processedArray = dataArray.slice(targetIndex + 1, this.mSize)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    takeWhile(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let processedArray = new Array<DataType>();
                if(this.data != null) {
                    let predicateIndex = 0
                    for(const eachDatum of this.data) {
                        if(!await predicate(eachDatum)) break
                        predicateIndex++
                    }
                    processedArray = Array.from(this.data).slice(0, predicateIndex)
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }



















    
    // Selector
    /**
     * Returns an element at the given ```index``` or throws an {@link KoconutIndexOutOfBoundsException} if the ```index``` is out of bounds of this collection.
     * @param index The index of element to search for.
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
    elementAt(
        index : number
    ) : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(index < 0 || index >= this.mSize) throw new KoconutIndexOutOfBoundsException(`Cannot search for data at index of ${index}`)
                return Array.from(this.data!)[index]
            })
        return koconutToReturn

    }


    /**
     * Returns an element at the given ```index``` or the result of calling the ```defaultValue``` function 
     * if the ```index``` is out of bounds of this collection.
     * @param index The index of element to search for.
     * @param defaultValue A callback function that accepts an argument. The method calls the ```defaultValue``` function when ```index``` is out of bounds.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```defaultValue```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        index : number,
        defaultValue : (index : number) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        defaultValue = defaultValue.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(index < 0 || index >= this.mSize) return await defaultValue(index)
                else return Array.from(this.data!)[index]
            })
        return koconutToReturn

    }


    /**
     * Returns an element at the given ```index``` or ```null``` if the index is out of bounds of this collection.
     * @param index The index of element to search for.
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
    elementAtOrNull(
        index : number
    ) : KoconutPrimitive<DataType | null> {

        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(index < 0 || index >= this.mSize) return null
                return Array.from(this.data!)[index]
            })
        return koconutToReturn

    }


    /**
     * Returns the first element matching the given ```predicate```, or ```null``` if no such element was found.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {
        
        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                for(const eachDatum of this.data)
                    if(await predicate(eachDatum)) return eachDatum
                return null
            })
        return koconutToReturn

    }


    /**
     * Returns the last element matching the given ```predicate```, or ```null``` if no such element was found.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null) return null
                const dataArray = Array.from(this.data)
                for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--) {
                    if(await predicate(dataArray[eachIndex])) return dataArray[eachIndex]
                }
                return null
            })
        return koconutToReturn

    }


    /**
     * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
     * method will just return the very first element of this collection. If source data is null or no element
     * matching given ```predicate``` is found, it throws {@link KoconutNoSuchElementException}.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return eachDatum
                    throw new KoconutNoSuchElementException(`No such element is found`)
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    /**
     * Returns the first element matching the given ```predicate```. Or, if ```predicate``` is omitted
     * method will just return the very first element of this collection. If source data is null or no element
     * matching given ```predicate``` is found, it returns ```null```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                if(predicate) {
                    for(const eachDatum of this.data)
                        if(await predicate(eachDatum)) return eachDatum
                    return null
                }
                return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    /**
     * Returns first index of element. or -1 if the collection does not contains element.
     * @param elementToFind The element to search for.
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
    indexOf(
        elementToFind : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) {
                        if(KoconutTypeChecker.checkIsEquatable(element)) {
                            const equalityResult = element.equalsTo(elementToFind)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) return index as number
                        } else if(element == elementToFind) return index as number
                    }
                }
                return -1
            })
        return koconutToReturn

    }


    /**
     * Returns index of the first element matching the given ```predicate```, or -1 if the
     * collection does not contain such element.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) 
                        if(await predicate(element)) return index as number
                }
                return -1
            })
        return koconutToReturn

    }


    /**
     * Returns index of the last element matching the given ```predicate```, or -1 if the
     * collection does not contain such element.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >= 0 ; eachIndex--)
                        if(await predicate(dataArray[eachIndex])) return eachIndex
                }
                return -1
            })
        return koconutToReturn

    }



















    
    // Transformer
    /**
     * Returns a {@link KoconutMap} containing key-value paired {@link Entry} provided by ```transform```
     * function applied to elements of the given collection.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        transform : (element : DataType) => 
            [KeyType, ValueType] 
            | Pair<KeyType, ValueType> 
            | KoconutPair<KeyType, ValueType> 
            | Entry<KeyType, ValueType> 
            | KoconutEntry<KeyType, ValueType> 
            | Promise<
                [KeyType, ValueType] 
                | Pair<KeyType, ValueType> 
                | KoconutPair<KeyType, ValueType>
                 | Entry<KeyType, ValueType>
                  | KoconutEntry<KeyType, ValueType>
            >,
        thisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachTransformResult = await transform(eachDatum)
                        if(eachTransformResult instanceof KoconutPair) {
                            const eachPair = await eachTransformResult.yield()
                            if(eachPair != null) processedMap.set(eachPair.first, eachPair.second)
                        } else if(eachTransformResult instanceof Pair) processedMap.set(eachTransformResult.first, eachTransformResult.second)
                        else if(eachTransformResult instanceof KoconutEntry) {
                            const eachEntry = await eachTransformResult.yield()
                            if(eachEntry != null) processedMap.set(eachEntry.key, eachEntry.value)
                        }
                        else if(eachTransformResult instanceof Entry) processedMap.set(eachTransformResult.key, eachTransformResult.value)
                        else processedMap.set(eachTransformResult[0], eachTransformResult[1])
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutMap} containing the elements from the given collection indexed by the key
     * returned from ```keySelector``` function applied to each element.
     * ```valueTransform``` callback function is optional. If it's not omitted the method returns
     * a {@link KoconutMap} instance containing the values provied by the funcion and indexed by ```keySelector```
     * applied to elements of the given collection.
     * @param keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
     * @param valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
     * @param keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     *                       async eachNumebr => eachNumebr * 2,
     *                       eachNumber => new Promise(resolve => {
     *                           resolve(eachNumber * eachNumber)
     *                       })
     *                   )
     *                   .yield()
     * console.log(doubledKeySquaredValueMap)
     * // ↑ Map { 2 => 1, 4 => 4, 6 => 9, 8 => 16, 10 => 25 }
     * ```
     */
    associateBy<KeyType, ValueType = DataType> (
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutMap<KeyType, ValueType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        processedMap.set(eachKey, eachValue as ValueType)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    associateByTo<KeyType, ValueType = DataType> (
        destination : Map<KeyType, ValueType>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                await this.associateBy(keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg)
                            .forEach(eachEntry => {destination.set(eachEntry.key, eachEntry.value)})
                            .process()
                return this.data!
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    associateTo<KeyType, ValueType>(
        destination : Map<KeyType, ValueType>,
        transform : (element : DataType) => 
        [KeyType, ValueType] 
        | Pair<KeyType, ValueType> 
        | KoconutPair<KeyType, ValueType> 
        | Entry<KeyType, ValueType> 
        | KoconutEntry<KeyType, ValueType> 
        | Promise<
            [KeyType, ValueType] 
            | Pair<KeyType, ValueType> 
            | KoconutPair<KeyType, ValueType>
             | Entry<KeyType, ValueType>
              | KoconutEntry<KeyType, ValueType>
        >,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                await this.associate(transform, thisArg)
                            .forEach(eachEntry => {destination.set(eachEntry.key, eachEntry.value)})
                            .process()
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutMap} where keys are original elements of the current object and values
     * are produced by the ```valueSelector``` function applied to each element.
     * @param valueSelector A callback function that accepts an argument. The method calls the ```valueSelector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```valueSelector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const trippledValueMap = await koconutArray2
     *                   .associateWith(eachNumber => new Promise(resolve => {
     *                       resolve(eachNumber * 3)
     *                   }))
     *                   .yield()
     * console.log(trippledValueMap)
     * // ↑ Map { 1 => 3, 2 => 6, 3 => 9, 4 => 12, 5 => 15 }
     * ```
     */
    associateWith<ValueType>(
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutMap<DataType, ValueType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutMap<DataType, ValueType>();
        (koconutToReturn as any as KoconutOpener<Map<DataType, ValueType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<DataType, ValueType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachValue = await valueSelector(eachDatum)
                        processedMap.set(eachDatum, eachValue)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    associateWithTo<ValueType>(
        destination : Map<DataType, ValueType>,
        valueSelector : (element : DataType) => ValueType | Promise<ValueType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        valueSelector = valueSelector.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                await this.associateWith(valueSelector, thisArg)
                            .forEach(eachEntry => {destination.set(eachEntry.key, eachEntry.value)})
                            .process()
                return this.data!
            })
        return koconutToReturn

    }


    /** @ignore */
    chunked<ResultDataType>(
        size : number,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    /**
     * Splits this collection into a {@link KoconutArray} of ```Arrays```
     * each not exceeding the given ```size```.
     * @param size The number of elements to take in each ```Array```, must be positive and can be greater than the number of elements in this collection.
     * @param transform A callback function that accepts an argument. The method calls the ```transform``` with chunked data ```array``` when it's not omitted.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * // Case 2 -- Koconutset
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
        size : number,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    chunked(
        size : number
    ) : KoconutArray<Array<DataType>>;
    chunked<ResultDataType>(
        size : number,
        transform : ((elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Array<DataType> | ResultDataType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Array<DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(size <= 0) throw new KoconutInvalidArgumentException(`Size must be greater than 0. Given size : ${size}.`)
                const processedArray = new Array<Array<DataType>>()
                if(this.data != null) {
                    let currentIndex = 0
                    let dataArray = Array.from(this.data)
                    while(currentIndex < dataArray.length) {
                        processedArray.push(dataArray.slice(currentIndex, currentIndex + size))
                        currentIndex += size
                    }
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedIndex in processedArray)
                        transformedArray.push(await transform(processedArray[eachProcessedIndex]))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }



    /**
     * Returns a {@link KoconutArray} of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    let eachIndex = 0
                    for(const eachDatum of this.data) 
                        for(let eachSubElement of await transform(eachIndex++, eachDatum))
                            processedArray.push(eachSubElement)
                }
                return processedArray
            })
        return koconutToReturn

    }


    // No Comment - KoconutArray/KoconutSet
    flatMapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.flatMapTo(destination, transform, thisArg))

    }


    // No Comment - KoconutArray/KoconutSet
    flatMapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => Iterable<ResultDataType> | Promise<Iterable<ResultDataType>>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType>{

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const flattenCollection = this.flatMapIndexed(transform, thisArg)
                if(destination instanceof Array) {
                    await flattenCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await flattenCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Groups values returned by the ```valueTransform``` function applied to each element of the original collection 
     * by the key returned by the given ```keySelector``` function applied to the element and returns a map where each
     * group key is associated with a list of corresponding values. If ```valueTransform``` is omitted, the ```value``` of
     * each entry would be origianl element.
     * @param keySelector A callback function that accepts an argument. The method calls the ```keySelector``` one time for each element in object.
     * @param valueTransform A callback function that accepts an argument. The method calls the ```valueTransform``` one time for each element in object it it's not omitted.
     * @param keySelectorThisArg An object to which the ```this``` keyword can refer in the ```keySelector```. If ```keySelectorThisArg``` is omitted, ```null``` is used as the ```this``` value.
     * @param valueTransformThisArg An object to which the ```this``` keyword can refer in the ```valueTransform```. If ```valueTransformThisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutMap<KeyType, Array<ValueType>> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutMap<KeyType, Array<ValueType>>();
        (koconutToReturn as any as KoconutOpener<Map<KeyType, Array<ValueType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedMap = new Map<KeyType, Array<ValueType>>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        if(!processedMap.has(eachKey)) processedMap.set(eachKey, new Array())
                        processedMap.get(eachKey)?.push(eachValue as ValueType)
                    }
                }
                return processedMap
            })
        return koconutToReturn

    }


    // No Comment -- KoconutArray/KoconutSet
    groupByTo<KeyType, ValueType = DataType>(
        destination : Map<KeyType, Array<ValueType>>,
        keySelector : (element : DataType) => KeyType | Promise<KeyType>,
        valueTransform : ((element : DataType) => ValueType | Promise<ValueType>) | null = null,
        keySelectorThisArg : any = null,
        valueTransformThisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        keySelector = keySelector.bind(keySelectorThisArg)
        if(valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        const eachKey = await keySelector(eachDatum)
                        const eachValue = valueTransform ? await valueTransform(eachDatum) : eachDatum
                        if(!destination.has(eachKey)) destination.set(eachKey, new Array())
                        destination.get(eachKey)?.push(eachValue as ValueType)
                    }
                }
                return this.data!
            })
        return koconutToReturn

    }


    // No Comment -- KoconutArray/KoconutSet
    mapTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.mapTo(destination, transform, thisArg))

    }


    // No Comment -- KoconutArray/KoconutSet
    mapNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        return KoconutCollection.fromIterable(super.mapNotNullTo(destination, transform, thisArg))

    }


    /**
     * Retruns a list of all elements yielded from results of ```transform``` function beging invoked
     * on each element and its index in the original collection.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries())
                        processedArray.push(await transform(eachIndex as number, eachDatum))
                }
                return processedArray
            })
        return koconutToReturn

    }


    // No Comment -- KoconutArray/KoconutSet
    mapIndexedTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const mappedCollection = this.mapIndexed(transform, thisArg)
                if(destination instanceof Array) {
                    await mappedCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await mappedCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


    /**
     * Returns a {@link KoconutArray} containing only the results that are not ```null``` nor ```undefined``` of applying
     * the given ```transform``` function to each element and its index in the original collection.
     * @param transform A callback function that accepts two arguments. The method calls the ```transform``` one time for each index and element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```transform```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
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
     * const squaredNumbersWhereIndesIsEven = await koconutArray2
     *           .mapIndexedNotNull((eachIndex, eachNumber) => new Promise<number | null>(resolve => {
     *               if(eachIndex % 2 == 0)
     *                   resolve(eachNumber * eachNumber)
     *               else resolve(null)
     *           }))
     *           .yield()
     * console.log(squaredNumbersWhereIndesIsEven)
     * // ↑ [ 1, 9, 25 ]
     * ```
     */
    mapIndexedNotNull<ResultDataType>(
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        const eachResultData = await transform(eachIndex as number, eachDatum)
                        if(eachResultData != null && eachResultData != undefined) processedArray.push(eachResultData)
                    }
                }
                return processedArray
            })    
        return koconutToReturn
        
    }


    // No Comment -- KoconutArray/KoconutSet
    mapIndexedNotNullTo<ResultDataType>(
        destination : Array<ResultDataType> | Set<ResultDataType>,
        transform : (index : number, element : DataType) => ResultDataType | void | null | undefined | Promise<ResultDataType | void | null | undefined>,
        thisArg : any = null
    ) : KoconutCollection<DataType, WrapperType> {

        transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const mappedCollection = this.mapIndexedNotNull(transform, thisArg)
                if(destination instanceof Array) {
                    await mappedCollection
                            .forEach(eachElement => {
                                destination.push(eachElement)
                            })
                            .process()
                } else {
                    await mappedCollection
                            .asSet()
                            .forEach(eachElement => {
                                destination.add(eachElement)
                            })
                            .process()
                }
                return this.data!
            })
        return koconutToReturn

    }


























































































































    
    /* Funcions */
    intersect(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set<DataType>()
                if(this.data) {
                    const otherArray = KoconutArray.from(other)
                    for(const eachDatum of this.data) {
                        if(await otherArray.contains(eachDatum).yield())
                            processedSet.add(eachDatum)
                    }
                }
                return processedSet
            })
        return koconutToReturn

    }


    // joinTo
    // joinToString
    join(
        separator : string = ", ",
        prefix : string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType) => any | Promise<any>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<string> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<string>();
        (koconutToReturn as any as KoconutOpener<string>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let resultString = prefix
                if(this.data != null) {
                    let currentCount = 0
                    const length = this.mSize
                    for(const eachDatum of this.data) {
                        if(currentCount == limit) {
                            resultString += truncated
                            break
                        }
                        resultString += transform ? await transform(eachDatum) : eachDatum
                        currentCount++
                        if(currentCount != length && currentCount != limit) resultString += separator
                    }
                }
                resultString += postfix
                return resultString
            })
        return koconutToReturn

    }


    last(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                if(predicate) {
                    for(let eachIndex = dataArray.length ; eachIndex >= 0 ; eachIndex--) 
                        if(await predicate(dataArray[eachIndex])) return dataArray[eachIndex]
                    throw new KoconutNoSuchElementException(`No such element is found`)
                }
                return dataArray[dataArray.length - 1]
            })
        return koconutToReturn

    }

    lastIndexOf(
        element : DataType
    ) : KoconutPrimitive<number> {

        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    for(let eachIndex = dataArray.length - 1 ; eachIndex >=0 ; eachIndex--) {
                        const eachElement = dataArray[eachIndex]
                        if(KoconutTypeChecker.checkIsEquatable(eachElement)) {
                            const equalityResult = eachElement.equalsTo(element)
                            if(
                                (equalityResult instanceof KoconutPrimitive && await equalityResult.yield())
                                || (!(equalityResult instanceof KoconutPrimitive) && equalityResult)
                            ) return eachIndex
                        } else if(eachElement == element) return eachIndex
                    }
                }
                return -1
            })
        return koconutToReturn

    }

    lastOrNull(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const length = dataArray.length
                    if(length == 0) return null
                    if(predicate) {
                        for(let eachIndex = length - 1 ; eachIndex >= 0 ; eachIndex--)
                            if(await predicate(dataArray[eachIndex]))
                                return dataArray[eachIndex] != undefined ? dataArray[eachIndex] : null
                    } else return dataArray[length - 1] != undefined ? dataArray[length - 1] : null
                }
                return null
            })
        return koconutToReturn

    }


    minus(
        elements : DataType | Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>();
                if(this.data != null) {
                    let dataToExcept = new Array<DataType>();
                    if(typeof (elements as any)[Symbol.iterator] === 'function')dataToExcept = Array.from(elements as Iterable<DataType>)
                    else dataToExcept.push(elements as DataType)
                    const koconutDataToExceptArray = KoconutArray.from(dataToExcept)
                    for(let eachDatum of this.data) {
                        if(!await koconutDataToExceptArray.contains(eachDatum).yield()) processedArray.push(eachDatum)
                    }
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType  
            })
        return koconutToReturn

    }


    minusElement(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType> {

        return this.minus(element)

    }

    // orEmpty
    partition(
        predicate : (element : DataType) => boolean | Promise<boolean>,
        thisArg : any = null
    ) : KoconutPair<WrapperType, WrapperType> {

        predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPair<WrapperType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<Pair<WrapperType, WrapperType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedFirstArray = new Array<DataType>()
                const processedSecondArray = new Array<DataType>()
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum)) processedFirstArray.push(eachDatum)
                        else processedSecondArray.push(eachDatum)
                    }
                }
                if(this.data instanceof Array) return new Pair(processedFirstArray as WrapperType, processedSecondArray as WrapperType)
                else return new Pair(new Set(processedFirstArray) as WrapperType, new Set(processedSecondArray) as WrapperType)
            })
        return koconutToReturn

    }


    plus(
        elements : DataType | Iterable<DataType>
    ) : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data) : new Array<DataType>()
                if(typeof (elements as any)[Symbol.iterator] === 'function') {
                    const elementsArray = Array.from(elements as Iterable<DataType>)
                    for(let eachDatum of elementsArray) processedArray.push(eachDatum)
                } else processedArray.push(elements as DataType)
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    plusElement(
        element : DataType
    ) : KoconutCollection<DataType, WrapperType> {

        return this.plus(element)

    }


    
    random() : KoconutPrimitive<DataType> {

        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                return dataArray[Math.floor(Math.random() * dataArray.length)]
            })
        return koconutToReturn

    }


    randomOrNull() : KoconutPrimitive<DataType | null> {

        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                const dataArray = Array.from(this.data)
                return dataArray[Math.floor(Math.random() * dataArray.length)]
            })
        return koconutToReturn

    }


    reduce(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {
        
        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`) 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceIndexed(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceIndexedOrNull(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    reduceOrNull(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) return null 
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++)
                    acc = await operation(acc, dataArray[eachIndex])
                return acc
            })
        return koconutToReturn

    }


    // requireNoNulls
    reversed() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = this.data ? Array.from(this.data).reverse() : new Array<DataType>()
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    runningFold<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                processedArray.push(initial)
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        initial = await operation(initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningFoldindexed<ResultDataType>(
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>()
                processedArray.push(initial)
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        initial = await operation(eachIndex as number, initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningReduce(
        operation : (acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const processedArray = new Array<DataType>();
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                processedArray.push(acc)
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++) {
                    acc = await operation(acc, dataArray[eachIndex])
                    processedArray.push(acc)
                }
                return processedArray
            })
        return koconutToReturn

    }


    runningReduceIndexed(
        operation : (index : number, acc : DataType, element : DataType) => DataType | Promise<DataType>,
        thisArg : any = null
    ) : KoconutArray<DataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<DataType>();
        (koconutToReturn as any as KoconutOpener<Array<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                const processedArray = new Array<DataType>();
                const dataArray = Array.from(this.data)
                let acc = dataArray[0]
                processedArray.push(acc)
                for(let eachIndex = 1 ; eachIndex < dataArray.length ; eachIndex++) {
                    acc = await operation(eachIndex, acc, dataArray[eachIndex])
                    processedArray.push(acc)
                }
                return processedArray
            })
        return koconutToReturn

    }


    scan<ResultDataType>(
        initial : ResultDataType,
        operation : (acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>();
                processedArray.push(initial)
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        initial = await operation(initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    scanIndexed<ResultDataType>(
        initial : ResultDataType,
        operation : (index : number, acc : ResultDataType, element : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any = null
    ) : KoconutArray<ResultDataType> {

        operation = operation.bind(thisArg)
        const koconutToReturn = new KoconutArray<ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<ResultDataType>();
                processedArray.push(initial)
                if(this.data != null) {
                    for(const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                        initial = await operation(eachIndex as number, initial, eachDatum)
                        processedArray.push(initial)
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }


    shuffled() : KoconutCollection<DataType, WrapperType> {

        const koconutToReturn = new KoconutCollection<DataType, WrapperType>();
        (koconutToReturn as any as KoconutOpener<WrapperType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<DataType>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const indexes = Object.keys(dataArray).map(eachIndex => parseInt(eachIndex))
                    while(indexes.length > 0) processedArray.push(dataArray[indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]])
                }
                if(this.data instanceof Array) return processedArray as WrapperType
                else return new Set(processedArray) as WrapperType
            })
        return koconutToReturn

    }


    single(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType>();
        (koconutToReturn as any as KoconutOpener<DataType>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || this.mSize == 0) throw new KoconutNoSuchElementException(`Source data is null or empty`)
                if(predicate) {
                    let dataToReturn : DataType | null = null
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum)) {
                            if(dataToReturn == null) dataToReturn = eachDatum
                            else throw new KoconutConflictException("There are more than 2 elements maching the given predicate")
                        }
                    }
                    if(dataToReturn == null) throw new KoconutNoSuchElementException("No element exists matching the given predicate")
                    else return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    singleOrNull(
        predicate : ((element : DataType) => boolean | Promise<boolean>) | null = null,
        thisArg : any = null
    ) : KoconutPrimitive<DataType | null> {

        if(predicate) predicate = predicate.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<DataType | null>();
        (koconutToReturn as any as KoconutOpener<DataType | null>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                if(this.data == null || Array.from(this.data).length == 0) return null
                if(predicate) {
                    let dataToReturn : DataType | null = null
                    for(const eachDatum of this.data) {
                        if(await predicate(eachDatum))
                            if(dataToReturn == null) dataToReturn = eachDatum
                            else return null
                    }
                    return dataToReturn
                } else return Array.from(this.data)[0]
            })
        return koconutToReturn

    }


    substarct(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = new Set<DataType>()
                if(this.data != null) {
                    const koconutDataToExceptArray = KoconutArray.from(other)
                    for(let eachDatum of this.data) {
                        if(!await koconutDataToExceptArray.contains(eachDatum).yield())
                            processedSet.add(eachDatum)
                    }
                }
                return processedSet
            })
        return koconutToReturn

    }


    sumBy(
        selector : (element : DataType) => number | Promise<number>,
        thisArg : any = null
    ) : KoconutPrimitive<number> {

        selector = selector.bind(thisArg)
        const koconutToReturn = new KoconutPrimitive<number>();
        (koconutToReturn as any as KoconutOpener<number>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                let sum = 0
                if(this.data != null) {
                    for(const eachDatum of this.data) {
                        sum += await selector(eachDatum)
                    }
                }
                return sum
            })
        return koconutToReturn

    }

    // sumByDouble
    // sumOf





    union(
        other : Iterable<DataType>
    ) : KoconutSet<DataType> {

        const koconutToReturn = new KoconutSet<DataType>();
        (koconutToReturn as any as KoconutOpener<Set<DataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedSet = this.data == null ? new Set<DataType>() : new Set(this.data)
                for(const eachDatum of other) processedSet.add(eachDatum)
                return await KoconutSet.from(processedSet).distinct().yield() as Set<DataType>
            })
        return koconutToReturn

    }


    // unzip
    windowed(
        size : number
    ) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number
    ) : KoconutArray<Array<DataType>>;
    windowed(
        size : number,
        step : number,
        partialWindows : boolean
    ) : KoconutArray<Array<DataType>>;
    windowed<ResultDataType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number,
        partialWindows : boolean,
        transform : (elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    windowed<ResultDataType>(
        size : number,
        step : number = 1,
        partialWindows : boolean = false,
        transform : ((elements : Array<DataType>) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Array<DataType> | ResultDataType> {

        if(size < 0) size = -size
        if(step < 0) step = -step
        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Array<DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Array<DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Array<DataType>>()
                if(this.data != null) {
                    let currentIndex = 0
                    const dataArray = Array.from(this.data)
                    while(currentIndex < dataArray.length) {
                        const eachChunkedData = dataArray.slice(currentIndex, currentIndex + size)
                        currentIndex += step
                        if(partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData)
                    }
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(const eachProcessedDatum of processedArray)
                        transformedArray.push(await transform(eachProcessedDatum))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


    withIndex() : KoconutArray<Entry<number, DataType>> {

        const koconutToReturn = new KoconutArray<Entry<number, DataType>>();
        (koconutToReturn as any as KoconutOpener<Array<Entry<number, DataType>>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Entry<number, DataType>>()
                if(this.data != null) {
                    for(const [index, element] of Array.from(this.data).entries()) {
                        processedArray.push(new Entry(index as number, element))
                    }
                }
                return processedArray
            })
        return koconutToReturn

    }

    zip<OtherDataType>(
        other : Iterable<OtherDataType>
    ) : KoconutArray<Pair<DataType, OtherDataType>>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : (originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    zip<OtherDataType, ResultDataType>(
        other : Iterable<OtherDataType>,
        transform : ((originalData : DataType, otherData : OtherDataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Pair<DataType, OtherDataType> | ResultDataType> {

        if(transform) transform = transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Pair<DataType, OtherDataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, OtherDataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Pair<DataType, OtherDataType>>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    const otherArray= Array.from(other)
                    const minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length
                    for(let eachIndex = 0 ; eachIndex < minLength ; eachIndex++)
                        processedArray.push(new Pair(dataArray[eachIndex], otherArray[eachIndex]))
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedData of processedArray)
                        transformedArray.push(await transform(eachProcessedData.first, eachProcessedData.second))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


    zipWithNext() : KoconutArray<Pair<DataType, DataType>>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>
    ) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : (firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>,
        thisArg : any
    ) : KoconutArray<ResultDataType>;
    zipWithNext<ResultDataType>(
        transform : ((firstData : DataType, secondData : DataType) => ResultDataType | Promise<ResultDataType>) | null = null,
        thisArg : any = null
    ) : KoconutArray<Pair<DataType, DataType> | ResultDataType> {

        if(transform) transform.bind(thisArg)
        const koconutToReturn = new KoconutArray<Pair<DataType, DataType> | ResultDataType>();
        (koconutToReturn as any as KoconutOpener<Array<Pair<DataType, DataType>> | Array<ResultDataType>>)
            .setPrevYieldable(this)
            .setProcessor(async () => {
                const processedArray = new Array<Pair<DataType, DataType>>()
                if(this.data != null) {
                    const dataArray = Array.from(this.data)
                    if(dataArray.length >= 2) {
                        for(let eachIndex = 0 ; eachIndex < dataArray.length - 1 ; eachIndex++)
                            processedArray.push(new Pair(dataArray[eachIndex], dataArray[eachIndex + 1]))
                    }
                    
                }
                if(transform) {
                    const transformedArray = new Array<ResultDataType>()
                    for(let eachProcessedDatum of processedArray)
                        transformedArray.push(await transform(eachProcessedDatum.first, eachProcessedDatum.second))
                    return transformedArray
                }
                return processedArray
            })
        return koconutToReturn

    }


}