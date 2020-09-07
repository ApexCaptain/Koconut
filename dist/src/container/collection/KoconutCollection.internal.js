"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoconutCollection = void 0;
`use strict`;
const module_internal_1 = require("../../../module.internal");
/** @internal */
class KoconutCollection extends module_internal_1.KoconutIterable {
    constructor() {
        super(...arguments);
        /* Properties */
        this.mSize = 0;
        this.mIndices = new Array();
    }
    /* Koconut Primitive */
    validiate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data != null) {
                const dataArray = Array.from(data);
                this.mSize = dataArray.length;
                Object
                    .keys(dataArray)
                    .map(eachString => parseInt(eachString))
                    .forEach(eachIndex => this.mIndices.push(eachIndex));
                this.combinedDataWrapper = data;
            }
        });
    }
    size() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mSize; }));
        return koconutToReturn;
    }
    indices() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mIndices; }));
        return koconutToReturn;
    }
    /* Funcions */
    associate(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachTransformResult = yield transform(eachDatum);
                    if (eachTransformResult instanceof module_internal_1.KoconutPair) {
                        const eachPair = yield eachTransformResult.yield();
                        if (eachPair != null)
                            processedMap.set(eachPair.first, eachPair.second);
                    }
                    else if (eachTransformResult instanceof module_internal_1.Pair)
                        processedMap.set(eachTransformResult.first, eachTransformResult.second);
                    else
                        processedMap.set(eachTransformResult[0], eachTransformResult[1]);
                }
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    associateBy(keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        keySelector = keySelector.bind(keySelectorThisArg);
        if (valueTransform)
            valueTransform = valueTransform.bind(valueTransformThisArg);
        const koconutToReturn = new module_internal_1.KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachKey = yield keySelector(eachDatum);
                    const eachValue = valueTransform ? yield valueTransform(eachDatum) : eachDatum;
                    processedMap.set(eachKey, eachValue);
                }
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    associateByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        keySelector = keySelector.bind(keySelectorThisArg);
        if (valueTransform)
            valueTransform = valueTransform.bind(valueTransformThisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachKey = yield keySelector(eachDatum);
                    const eachValue = valueTransform ? yield valueTransform(eachDatum) : eachDatum;
                    destination.set(eachKey, eachValue);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    associateTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachTransformResult = yield transform(eachDatum);
                    if (eachTransformResult instanceof module_internal_1.KoconutPair) {
                        const eachPair = yield eachTransformResult.yield();
                        if (eachPair != null)
                            destination.set(eachPair.first, eachPair.second);
                    }
                    else if (eachTransformResult instanceof module_internal_1.Pair)
                        destination.set(eachTransformResult.first, eachTransformResult.second);
                    else
                        destination.set(eachTransformResult[0], eachTransformResult[1]);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    associateWith(valueSelector, thisArg = null) {
        valueSelector = valueSelector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachValue = yield valueSelector(eachDatum);
                    processedMap.set(eachDatum, eachValue);
                }
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    associateWithTo(destination, valueSelector, thisArg = null) {
        valueSelector = valueSelector.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachValue = yield valueSelector(eachDatum);
                    destination.set(eachDatum, eachValue);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    chunked(size, transform = null, thisArg = null) {
        if (transform)
            transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                let currentIndex = 0;
                let dataArray = Array.from(this.data);
                while (currentIndex < dataArray.length) {
                    processedArray.push(dataArray.slice(currentIndex, currentIndex + size));
                    currentIndex += size;
                }
            }
            if (transform) {
                const transformedArray = new Array();
                for (let eachProcessedIndex in processedArray)
                    transformedArray.push(yield transform(processedArray[eachProcessedIndex]));
                return transformedArray;
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    contains(element) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return false;
            for (let eachDatum of this.data) {
                if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachDatum) && eachDatum.equalsTo(element))
                    || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachDatum) && element == eachDatum))
                    return true;
            }
            return false;
        }));
        return koconutToReturn;
    }
    containsAll(elements) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return false;
            const dataArray = Array.from(this.data);
            for (const eachElementToCheck of elements) {
                if (module_internal_1.KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
                    let isIncluded = false;
                    for (const eachDatum of dataArray) {
                        if (eachElementToCheck.equalsTo(eachDatum)) {
                            isIncluded = true;
                            break;
                        }
                    }
                    if (!isIncluded)
                        return false;
                }
                else if (!dataArray.includes(eachElementToCheck))
                    return false;
            }
            return true;
        }));
        return koconutToReturn;
    }
    distinct() {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    if (module_internal_1.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                        let isConflict = false;
                        for (const eachPrevEquatableDatum of processedArray) {
                            if (eachPrevEquatableDatum.equalsTo(eachDatum)) {
                                isConflict = true;
                                break;
                            }
                        }
                        if (!isConflict)
                            processedArray.push(eachDatum);
                    }
                    else {
                        processedArray = Array.from(new Set(this.data));
                        break;
                    }
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    distinctBy(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const keyArray = new Array();
                const equatableKeyArray = new Array();
                for (const eachDatum of this.data) {
                    const eachKey = yield selector(eachDatum);
                    if (module_internal_1.KoconutTypeChecker.checkIsEquatable(eachKey)) {
                        let isConflict = false;
                        for (const eachPrevEquatableKey of equatableKeyArray) {
                            if (eachPrevEquatableKey.equalsTo(eachKey)) {
                                isConflict = true;
                                break;
                            }
                        }
                        if (!isConflict) {
                            equatableKeyArray.push(eachKey);
                            processedArray.push(eachDatum);
                        }
                    }
                    else {
                        if (!keyArray.includes(eachKey)) {
                            keyArray.push(eachKey);
                            processedArray.push(eachDatum);
                        }
                    }
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    drop(n) {
        if (n < 0)
            throw new module_internal_1.KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null)
                processedArray = Array.from(this.data).slice(n);
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    dropLast(n) {
        if (n < 0)
            throw new module_internal_1.KoconutInvalidArgumentException(`Given argument ${n} is invalid, 'n' must be larger than 0.`);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null)
                processedArray = Array.from(this.data).slice(0, -n);
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    // 추후 문제 발생 가능성 있음
    dropLastWhile(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                let indexNumber = 0;
                for (let eachIndex = dataArray.length - 1; eachIndex >= 0; eachIndex--) {
                    if (!(yield predicate(dataArray[eachIndex]))) {
                        indexNumber = eachIndex;
                        break;
                    }
                }
                processedArray = dataArray.slice(0, indexNumber + 1);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    dropWhile(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                let indexNumber = dataArray.length;
                for (let eachIndex in dataArray) {
                    if (!(yield predicate(dataArray[eachIndex]))) {
                        indexNumber = parseInt(eachIndex);
                        break;
                    }
                }
                processedArray = dataArray.slice(indexNumber);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    elementAt(index) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const foundData = Array.from(this.data)[index];
            if (foundData == undefined)
                throw new module_internal_1.KoconutIndexOutOfBoundsException(`Cannot search for data at index of ${index}`);
            return foundData;
        }));
        return koconutToReturn;
    }
    elementAtOrElse(index, defaultValue) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return defaultValue(index);
            const foundData = Array.from(this.data)[index];
            return foundData ? foundData : defaultValue(index);
        }));
        return koconutToReturn;
    }
    elementAtOrNull(index) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return null;
            const foundData = Array.from(this.data)[index];
            return foundData ? foundData : null;
        }));
        return koconutToReturn;
    }
    filter(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if (yield predicate(eachDatum))
                        processedArray.push(eachDatum);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    filterIndexed(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    if (yield predicate(eachIndex, eachDatum))
                        processedArray.push(eachDatum);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    filterIndexedTo(destination, predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    if (yield predicate(eachIndex, eachDatum))
                        if (destination instanceof Array)
                            destination.push(eachDatum);
                        else
                            destination.add(eachDatum);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // filterIsInstance
    // filterIsInstanceTo
    filterNot(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if (!(yield predicate(eachDatum)))
                        processedArray.push(eachDatum);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    filterNotNull() {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if (eachDatum != null)
                        processedArray.push(eachDatum);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    filterNotNullTo(destination) {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (let eachDatum of this.data)
                    if (eachDatum != null)
                        if (destination instanceof Array)
                            destination.push(eachDatum);
                        else
                            destination.add(eachDatum);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    filterNotTo(destination, predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if (!(yield predicate(eachDatum)))
                        if (destination instanceof Array)
                            destination.push(eachDatum);
                        else
                            destination.add(eachDatum);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    filterTo(destination, predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if (yield predicate(eachDatum))
                        if (destination instanceof Array)
                            destination.push(eachDatum);
                        else
                            destination.add(eachDatum);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    find(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return null;
            for (const eachDatum of this.data)
                if (yield predicate(eachDatum))
                    return eachDatum;
            return null;
        }));
        return koconutToReturn;
    }
    findLast(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null)
                return null;
            const dataArray = Array.from(this.data);
            for (let eachIndex = dataArray.length - 1; eachIndex >= 0; eachIndex--) {
                if (yield predicate(dataArray[eachIndex]))
                    return dataArray[eachIndex];
            }
            return null;
        }));
        return koconutToReturn;
    }
    first(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            if (predicate) {
                for (const eachDatum of this.data)
                    if (yield predicate(eachDatum))
                        return eachDatum;
                throw new module_internal_1.KoconutNoSuchElementException(`No such element is found`);
            }
            return Array.from(this.data)[0];
        }));
        return koconutToReturn;
    }
    firstOrNull(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            if (predicate) {
                for (const eachDatum of this.data)
                    if (yield predicate(eachDatum))
                        return eachDatum;
                return null;
            }
            return Array.from(this.data)[0];
        }));
        return koconutToReturn;
    }
    flatMap(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    for (let eachSubElement of yield transform(eachDatum))
                        processedArray.push(eachSubElement);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    flatMapIndexed(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    for (let eachSubElement of yield transform(eachIndex, eachDatum))
                        processedArray.push(eachSubElement);
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    flatMapIndexedTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    for (let eachSubElement of yield transform(eachIndex, eachDatum))
                        if (destination instanceof Array)
                            destination.push(eachSubElement);
                        else
                            destination.add(eachSubElement);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    flatMapTo(destination, transform, thisArg = null) {
        if (transform)
            transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    for (let eachSubElement of yield transform(eachDatum))
                        if (destination instanceof Array)
                            destination.push(eachSubElement);
                        else
                            destination.add(eachSubElement);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // flatten
    fold(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let dataToReturn = initial;
            if (this.data != null) {
                for (const eachDatum of this.data)
                    dataToReturn = yield operation(dataToReturn, eachDatum);
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    foldIndexed(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let dataToReturn = initial;
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    dataToReturn = yield operation(eachIndex, dataToReturn, eachDatum);
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    forEach(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data)
                    if ((yield action(eachDatum)) == false)
                        break;
            }
        }));
        return koconutToReturn;
    }
    forEachIndexed(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    if ((yield action(eachIndex, eachDatum)) == false)
                        break;
            }
        }));
        return koconutToReturn;
    }
    groupBy(keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        keySelector = keySelector.bind(keySelectorThisArg);
        if (valueTransform)
            valueTransform = valueTransform.bind(valueTransformThisArg);
        const koconutToReturn = new module_internal_1.KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachKey = yield keySelector(eachDatum);
                    const eachValue = valueTransform ? yield valueTransform(eachDatum) : eachDatum;
                    if (!processedMap.has(eachKey))
                        processedMap.set(eachKey, new Array());
                    (_a = processedMap.get(eachKey)) === null || _a === void 0 ? void 0 : _a.push(eachValue);
                }
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    groupByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        keySelector = keySelector.bind(keySelectorThisArg);
        if (valueTransform)
            valueTransform = valueTransform.bind(valueTransformThisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const eachKey = yield keySelector(eachDatum);
                    const eachValue = valueTransform ? yield valueTransform(eachDatum) : eachDatum;
                    if (!destination.has(eachKey))
                        destination.set(eachKey, new Array());
                    (_a = destination.get(eachKey)) === null || _a === void 0 ? void 0 : _a.push(eachValue);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // groupingBy
    indexOf(elementToFind) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [index, element] of Array.from(this.data).entries()) {
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(element) && element.equalsTo(elementToFind))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(element) && element == elementToFind))
                        return index;
                }
            }
            return -1;
        }));
        return koconutToReturn;
    }
    indexOfFirst(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [index, element] of Array.from(this.data).entries())
                    if (yield predicate(element))
                        return index;
            }
            return -1;
        }));
        return koconutToReturn;
    }
    indexOfLast(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                for (let eachIndex = dataArray.length - 1; eachIndex >= 0; eachIndex--)
                    if (yield predicate(dataArray[eachIndex]))
                        return eachIndex;
            }
            return -1;
        }));
        return koconutToReturn;
    }
    intersect(other) {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedSet = new Set();
            if (this.data) {
                const otherArray = module_internal_1.KoconutArray.from(other);
                for (const eachDatum of this.data) {
                    if (yield otherArray.contains(eachDatum).yield())
                        processedSet.add(eachDatum);
                }
            }
            return processedSet;
        }));
        return koconutToReturn;
    }
    isNotEmpty() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return Array.from(this.data).length != 0; }));
        return koconutToReturn;
    }
    isNullOrEmpty() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.data == null || this.mSize == 0; }));
        return koconutToReturn;
    }
    // joinTo
    // joinToString
    join(separator = ", ", prefix = "", postfix = "", limit = -1, truncated = "...", transform = null, thisArg = null) {
        if (transform)
            transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let resultString = prefix;
            if (this.data != null) {
                let currentCount = 0;
                const length = this.mSize;
                for (const eachDatum of this.data) {
                    if (currentCount == limit) {
                        resultString += truncated;
                        break;
                    }
                    resultString += transform ? yield transform(eachDatum) : eachDatum;
                    currentCount++;
                    if (currentCount != length && currentCount != limit)
                        resultString += separator;
                }
            }
            resultString += postfix;
            return resultString;
        }));
        return koconutToReturn;
    }
    last(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const dataArray = Array.from(this.data);
            if (predicate) {
                for (let eachIndex = dataArray.length; eachIndex >= 0; eachIndex--)
                    if (yield predicate(dataArray[eachIndex]))
                        return dataArray[eachIndex];
                throw new module_internal_1.KoconutNoSuchElementException(`No such element is found`);
            }
            return dataArray[dataArray.length - 1];
        }));
        return koconutToReturn;
    }
    lastIndexOf(element) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                for (let eachIndex = dataArray.length - 1; eachIndex >= 0; eachIndex--) {
                    const eachElement = dataArray[eachIndex];
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement.equalsTo(element))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement == element))
                        return eachIndex;
                }
            }
            return -1;
        }));
        return koconutToReturn;
    }
    lastOrNull(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                const length = dataArray.length;
                if (length == 0)
                    return null;
                if (predicate) {
                    for (let eachIndex = length - 1; eachIndex >= 0; eachIndex--)
                        if (yield predicate(dataArray[eachIndex]))
                            return dataArray[eachIndex] != undefined ? dataArray[eachIndex] : null;
                }
                else
                    return dataArray[length - 1] != undefined ? dataArray[length - 1] : null;
            }
            return null;
        }));
        return koconutToReturn;
    }
    map(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data)
                    processedArray.push(yield transform(eachDatum));
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    mapIndexed(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries())
                    processedArray.push(yield transform(eachIndex, eachDatum));
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    mapIndexedNotNull(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    const eachResultData = yield transform(eachIndex, eachDatum);
                    if (eachResultData != null && eachResultData != undefined)
                        processedArray.push(eachResultData);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    mapIndexedNotNullTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    const eachResultData = yield transform(eachIndex, eachDatum);
                    if (eachResultData != null && eachResultData != undefined)
                        if (destination instanceof Array)
                            destination.push(eachResultData);
                        else
                            destination.add(eachResultData);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    mapIndexedTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    const eachResultData = yield transform(eachIndex, eachDatum);
                    if (destination instanceof Array)
                        destination.push(eachResultData);
                    else
                        destination.add(eachResultData);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    mapNotNull(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const dataToAdd = yield transform(eachDatum);
                    if (dataToAdd != null && dataToAdd != undefined)
                        processedArray.push(dataToAdd);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    mapNotNullTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const dataToAdd = yield transform(eachDatum);
                    if (dataToAdd != null && dataToAdd != undefined)
                        if (destination instanceof Array)
                            destination.push(dataToAdd);
                        else
                            destination.add(dataToAdd);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    mapTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    const dataToAdd = yield transform(eachDatum);
                    if (destination instanceof Array)
                        destination.push(dataToAdd);
                    else
                        destination.add(dataToAdd);
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // maxBy -- Deprecated
    maxByOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            let lastComparableDatum = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatum == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) > 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum)) {
                    dataToReturn = eachDatum;
                    lastComparableDatum = eachComparableDatum;
                }
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    maxOf(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn) > 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum)) {
                    lastComparableDatumToReturn = eachComparableDatum;
                }
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    maxOfOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn) > 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum)) {
                    lastComparableDatumToReturn = eachComparableDatum;
                }
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    maxOfWith(selector, comparator, selectorThisArg = null, comparatorThisArg = null) {
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null || (yield comparator(lastComparableDatumToReturn, eachComparableDatum)) < 0)
                    lastComparableDatumToReturn = eachComparableDatum;
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    maxOfWithOrNull(selector, comparator, selectorThisArg = null, comparatorThisArg = null) {
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null || (yield comparator(lastComparableDatumToReturn, eachComparableDatum)) < 0)
                    lastComparableDatumToReturn = eachComparableDatum;
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    maxWithOrNull(comparator, thisArg = null) {
        comparator = comparator.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            for (const eachDatum of Array.from(this.data)) {
                if (dataToReturn == null || (yield comparator(dataToReturn, eachDatum)) < 0)
                    dataToReturn = eachDatum;
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    minByOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            let lastComparableDatum = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatum == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) < 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum)) {
                    dataToReturn = eachDatum;
                    lastComparableDatum = eachComparableDatum;
                }
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    minOf(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn) < 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                    lastComparableDatumToReturn = eachComparableDatum;
                }
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    minOfOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatumToReturn) < 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum)) {
                    lastComparableDatumToReturn = eachComparableDatum;
                }
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    minOfWith(selector, comparator, selectorThisArg = null, comparatorThisArg = null) {
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null || (yield comparator(lastComparableDatumToReturn, eachComparableDatum)) > 0)
                    lastComparableDatumToReturn = eachComparableDatum;
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    minOfWithOrNull(selector, comparator, selectorThisArg = null, comparatorThisArg = null) {
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let lastComparableDatumToReturn = null;
            for (const eachDatum of this.data) {
                const eachComparableDatum = yield selector(eachDatum);
                if (lastComparableDatumToReturn == null || (yield comparator(lastComparableDatumToReturn, eachComparableDatum)) > 0)
                    lastComparableDatumToReturn = eachComparableDatum;
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    minus(elements) {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                let dataToExcept = new Array();
                if (typeof elements[Symbol.iterator] === 'function')
                    dataToExcept = Array.from(elements);
                else
                    dataToExcept.push(elements);
                const koconutDataToExceptArray = module_internal_1.KoconutArray.from(dataToExcept);
                for (let eachDatum of this.data) {
                    if (!(yield koconutDataToExceptArray.contains(eachDatum).yield()))
                        processedArray.push(eachDatum);
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    minusElement(element) {
        return this.minus(element);
    }
    minWithOrNull(comparator, thisArg = null) {
        comparator = comparator.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            for (const eachDatum of Array.from(this.data)) {
                if (dataToReturn == null || (yield comparator(dataToReturn, eachDatum)) > 0)
                    dataToReturn = eachDatum;
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    none(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return true;
            if (predicate) {
                for (const eachDatum of this.data)
                    if (yield predicate(eachDatum))
                        return false;
                return true;
            }
            return false;
        }));
        return koconutToReturn;
    }
    onEach(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    if ((yield action(eachDatum)) == false)
                        break;
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    onEachIndexed(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    if ((yield action(eachIndex, eachDatum)) == false)
                        break;
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // orEmpty
    partition(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPair();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedFirstArray = new Array();
            const processedSecondArray = new Array();
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    if (yield predicate(eachDatum))
                        processedFirstArray.push(eachDatum);
                    else
                        processedSecondArray.push(eachDatum);
                }
            }
            if (this.data instanceof Array)
                return new module_internal_1.Pair(processedFirstArray, processedSecondArray);
            else
                return new module_internal_1.Pair(new Set(processedFirstArray), new Set(processedSecondArray));
        }));
        return koconutToReturn;
    }
    plus(elements) {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = this.data ? Array.from(this.data) : new Array();
            if (typeof elements[Symbol.iterator] === 'function') {
                const elementsArray = Array.from(elements);
                for (let eachDatum of elementsArray)
                    processedArray.push(eachDatum);
            }
            else
                processedArray.push(elements);
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    plusElement(element) {
        return this.plus(element);
    }
    random() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const dataArray = Array.from(this.data);
            return dataArray[Math.floor(Math.random() * dataArray.length)];
        }));
        return koconutToReturn;
    }
    randomOrNull() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            const dataArray = Array.from(this.data);
            return dataArray[Math.floor(Math.random() * dataArray.length)];
        }));
        return koconutToReturn;
    }
    reduce(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
                acc = yield operation(acc, dataArray[eachIndex]);
            return acc;
        }));
        return koconutToReturn;
    }
    reduceIndexed(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
                acc = yield operation(eachIndex, acc, dataArray[eachIndex]);
            return acc;
        }));
        return koconutToReturn;
    }
    reduceIndexedOrNull(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
                acc = yield operation(eachIndex, acc, dataArray[eachIndex]);
            return acc;
        }));
        return koconutToReturn;
    }
    reduceOrNull(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++)
                acc = yield operation(acc, dataArray[eachIndex]);
            return acc;
        }));
        return koconutToReturn;
    }
    // requireNoNulls
    reversed() {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = this.data ? Array.from(this.data).reverse() : new Array();
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    runningFold(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            processedArray.push(initial);
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    initial = yield operation(initial, eachDatum);
                    processedArray.push(initial);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    runningFoldindexed(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            processedArray.push(initial);
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    initial = yield operation(eachIndex, initial, eachDatum);
                    processedArray.push(initial);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    runningReduce(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const processedArray = new Array();
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            processedArray.push(acc);
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++) {
                acc = yield operation(acc, dataArray[eachIndex]);
                processedArray.push(acc);
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    runningReduceIndexed(operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            const processedArray = new Array();
            const dataArray = Array.from(this.data);
            let acc = dataArray[0];
            processedArray.push(acc);
            for (let eachIndex = 1; eachIndex < dataArray.length; eachIndex++) {
                acc = yield operation(eachIndex, acc, dataArray[eachIndex]);
                processedArray.push(acc);
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    scan(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            processedArray.push(initial);
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    initial = yield operation(initial, eachDatum);
                    processedArray.push(initial);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    scanIndexed(initial, operation, thisArg = null) {
        operation = operation.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            processedArray.push(initial);
            if (this.data != null) {
                for (const [eachIndex, eachDatum] of Array.from(this.data).entries()) {
                    initial = yield operation(eachIndex, initial, eachDatum);
                    processedArray.push(initial);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    shuffled() {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                const indexes = Object.keys(dataArray).map(eachIndex => parseInt(eachIndex));
                while (indexes.length > 0)
                    processedArray.push(dataArray[indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]]);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    single(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                throw new module_internal_1.KoconutNoSuchElementException(`Source data is null or empty`);
            if (predicate) {
                let dataToReturn = null;
                for (const eachDatum of this.data) {
                    if (yield predicate(eachDatum)) {
                        if (dataToReturn == null)
                            dataToReturn = eachDatum;
                        else
                            throw new module_internal_1.KoconutConflictException("There are more than 2 elements maching the given predicate");
                    }
                }
                if (dataToReturn == null)
                    throw new module_internal_1.KoconutNoSuchElementException("No element exists matching the given predicate");
                else
                    return dataToReturn;
            }
            else
                return Array.from(this.data)[0];
        }));
        return koconutToReturn;
    }
    singleOrNull(predicate = null, thisArg = null) {
        if (predicate)
            predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || Array.from(this.data).length == 0)
                return null;
            if (predicate) {
                let dataToReturn = null;
                for (const eachDatum of this.data) {
                    if (yield predicate(eachDatum))
                        if (dataToReturn == null)
                            dataToReturn = eachDatum;
                        else
                            return null;
                }
                return dataToReturn;
            }
            else
                return Array.from(this.data)[0];
        }));
        return koconutToReturn;
    }
    sortedBy(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                for (let eachIndex in dataArray) {
                    const currentComparable = yield selector(dataArray[eachIndex]);
                    let startIndex = 0;
                    let middleIndex;
                    let endIndex = processedArray.length;
                    while (startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2);
                        const targetComparable = yield selector(processedArray[middleIndex]);
                        if ((module_internal_1.KoconutTypeChecker.checkIsComparable(currentComparable) && (currentComparable).compareTo(targetComparable) >= 0)
                            || (!module_internal_1.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable >= targetComparable))
                            startIndex = middleIndex + 1;
                        else
                            endIndex = middleIndex;
                    }
                    processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    sortedByDescending(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                for (let eachIndex in dataArray) {
                    const currentComparable = yield selector(dataArray[eachIndex]);
                    let startIndex = 0;
                    let middleIndex;
                    let endIndex = processedArray.length;
                    while (startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2);
                        const targetComparable = yield selector(processedArray[middleIndex]);
                        if ((module_internal_1.KoconutTypeChecker.checkIsComparable(currentComparable) && (currentComparable).compareTo(targetComparable) <= 0)
                            || (!module_internal_1.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable <= targetComparable))
                            startIndex = middleIndex + 1;
                        else
                            endIndex = middleIndex;
                    }
                    processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    sortedWith(comparator, thisArg = null) {
        comparator = comparator.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                for (let eachIndex in dataArray) {
                    let startIndex = 0;
                    let middleIndex;
                    let endIndex = processedArray.length;
                    while (startIndex < endIndex) {
                        middleIndex = Math.floor((startIndex + endIndex) / 2);
                        if ((yield comparator(dataArray[eachIndex], processedArray[middleIndex])) >= 0)
                            startIndex = middleIndex + 1;
                        else
                            endIndex = middleIndex;
                    }
                    processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                }
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    substarct(other) {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedSet = new Set();
            if (this.data != null) {
                const koconutDataToExceptArray = module_internal_1.KoconutArray.from(other);
                for (let eachDatum of this.data) {
                    if (!(yield koconutDataToExceptArray.contains(eachDatum).yield()))
                        processedSet.add(eachDatum);
                }
            }
            return processedSet;
        }));
        return koconutToReturn;
    }
    sumBy(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            if (this.data != null) {
                for (const eachDatum of this.data) {
                    sum += yield selector(eachDatum);
                }
            }
            return sum;
        }));
        return koconutToReturn;
    }
    // sumByDouble
    // sumOf
    take(n) {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = this.data ? Array.from(this.data).slice(0, n) : new Array();
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    takeLast(n) {
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = this.data ? Array.from(this.data).slice(this.mSize - n, this.mSize) : new Array();
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    takeLastWhile(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                let targetIndex = this.mSize - 1;
                for (; targetIndex >= 0; targetIndex--) {
                    if (!(yield predicate(dataArray[targetIndex])))
                        break;
                }
                processedArray = dataArray.slice(targetIndex + 1, this.mSize);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    takeWhile(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutCollection();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            let processedArray = new Array();
            if (this.data != null) {
                let predicateIndex = 0;
                for (const eachDatum of this.data) {
                    if (!(yield predicate(eachDatum)))
                        break;
                    predicateIndex++;
                }
                processedArray = Array.from(this.data).slice(0, predicateIndex);
            }
            if (this.data instanceof Array)
                return processedArray;
            else
                return new Set(processedArray);
        }));
        return koconutToReturn;
    }
    // toBooleanArray
    // toByteArray
    // toCharArray
    // toCollection
    // toDoubleArray
    // toFloatArray
    // toHashSet
    // toIntArray
    // toList
    // toLongArray
    // toMap
    // toMutableList
    // toMutableSet
    toArray() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            return this.data ? Array.from(this.data) : new Array();
        }));
        return koconutToReturn;
    }
    toSet() {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            return new Set(this.data);
        }));
        return koconutToReturn;
    }
    // toShortArray
    // toSortedSet
    // toUByteArray
    // toUIntArray
    // toULongArray
    // toUShortArray
    union(other) {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedSet = this.data == null ? new Set() : new Set(this.data);
            for (const eachDatum of other)
                processedSet.add(eachDatum);
            return yield module_internal_1.KoconutSet.from(processedSet).distinct().yield();
        }));
        return koconutToReturn;
    }
    windowed(size, step = 1, partialWindows = false, transform = null, thisArg = null) {
        if (size < 0)
            size = -size;
        if (step < 0)
            step = -step;
        if (transform)
            transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                let currentIndex = 0;
                const dataArray = Array.from(this.data);
                while (currentIndex < dataArray.length) {
                    const eachChunkedData = dataArray.slice(currentIndex, currentIndex + size);
                    currentIndex += step;
                    if (partialWindows || eachChunkedData.length == size)
                        processedArray.push(eachChunkedData);
                }
            }
            if (transform) {
                const transformedArray = new Array();
                for (const eachProcessedDatum of processedArray)
                    transformedArray.push(yield transform(eachProcessedDatum));
                return transformedArray;
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    withIndex() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const [index, element] of Array.from(this.data).entries()) {
                    processedArray.push(new module_internal_1.Entry(index, element));
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    zip(other, transform = null, thisArg = null) {
        if (transform)
            transform = transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                const otherArray = Array.from(other);
                const minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length;
                for (let eachIndex = 0; eachIndex < minLength; eachIndex++)
                    processedArray.push(new module_internal_1.Pair(dataArray[eachIndex], otherArray[eachIndex]));
            }
            if (transform) {
                const transformedArray = new Array();
                for (let eachProcessedData of processedArray)
                    transformedArray.push(yield transform(eachProcessedData.first, eachProcessedData.second));
                return transformedArray;
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    zipWithNext(transform = null, thisArg = null) {
        if (transform)
            transform.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                const dataArray = Array.from(this.data);
                if (dataArray.length >= 2) {
                    for (let eachIndex = 0; eachIndex < dataArray.length - 1; eachIndex++)
                        processedArray.push(new module_internal_1.Pair(dataArray[eachIndex], dataArray[eachIndex + 1]));
                }
            }
            if (transform) {
                const transformedArray = new Array();
                for (let eachProcessedDatum of processedArray)
                    transformedArray.push(yield transform(eachProcessedDatum.first, eachProcessedDatum.second));
                return transformedArray;
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
}
exports.KoconutCollection = KoconutCollection;
