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
exports.KoconutMap = void 0;
`use strict`;
const module_internal_1 = require("../../../module.internal");
class KoconutMap extends module_internal_1.KoconutIterable {
    constructor() {
        super(...arguments);
        /* Properties */
        this.mKeys = new Set();
        this.mEntries = new Set();
        this.mValues = new Array();
        this.mSize = 0;
    }
    static from(source) {
        return new KoconutMap(source);
    }
    static of(...data) {
        const map = new Map();
        for (const eachDatum of data) {
            if (eachDatum instanceof module_internal_1.Entry)
                map.set(eachDatum.key, eachDatum.value);
            else if (eachDatum instanceof module_internal_1.Pair)
                map.set(eachDatum.first, eachDatum.second);
            else
                map.set(eachDatum[0], eachDatum[1]);
        }
        return new KoconutMap(map);
    }
    /* Koconut Primitive */
    validiate(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (data != null) {
                this.combinedDataWrapper = new Set();
                for (const [key, value] of data.entries()) {
                    if (module_internal_1.KoconutTypeChecker.checkIsEquatable(key)) {
                        let isConflict = false;
                        for (const eachPrevEquatableKey of this.mKeys) {
                            if (key.equalsTo(eachPrevEquatableKey)) {
                                isConflict = true;
                                break;
                            }
                        }
                        if (!isConflict) {
                            this.mKeys.add(key);
                            this.combinedDataWrapper.add(new module_internal_1.Entry(key, value));
                            this.mEntries.add(new module_internal_1.Entry(key, value));
                            this.mValues.push(value);
                        }
                        else
                            (_a = this.data) === null || _a === void 0 ? void 0 : _a.delete(key);
                    }
                    else {
                        this.mKeys.add(key);
                        this.combinedDataWrapper.add(new module_internal_1.Entry(key, value));
                        this.mEntries.add(new module_internal_1.Entry(key, value));
                        this.mValues.push(value);
                    }
                }
                this.mSize = data.size;
            }
        });
    }
    /* Properties Getter */
    keys() {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mKeys; }));
        return koconutToReturn;
    }
    entries() {
        const koconutToReturn = new module_internal_1.KoconutSet();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mEntries; }));
        return koconutToReturn;
    }
    values() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mValues; }));
        return koconutToReturn;
    }
    size() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mSize; }));
        return koconutToReturn;
    }
    /* Functions */
    asArray() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.mEntries);
        }));
        return koconutToReturn;
    }
    contains(key) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            for (const eachKey of this.mKeys) {
                if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey.equalsTo(key))
                    || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey == key))
                    return true;
            }
            return false;
        }));
        return koconutToReturn;
    }
    containsKey(key) {
        return this.contains(key);
    }
    containsValue(value) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            for (const eachValue of this.mValues) {
                if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue.equalsTo(value))
                    || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue == value))
                    return true;
            }
            return false;
        }));
        return koconutToReturn;
    }
    filter(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (yield predicate(eachEntry))
                        processedMap.set(eachEntry.key, eachEntry.value);
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    filterKeys(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (yield predicate(eachEntry.key))
                        processedMap.set(eachEntry.key, eachEntry.value);
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    filterNot(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (!(yield predicate(eachEntry)))
                        processedMap.set(eachEntry.key, eachEntry.value);
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    filterNotTo(destination, predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (!(yield predicate(eachEntry)))
                        destination.set(eachEntry.key, eachEntry.value);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    filterTo(destination, predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (yield predicate(eachEntry))
                        destination.set(eachEntry.key, eachEntry.value);
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    filterValues(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if (yield predicate(eachEntry.value))
                        processedMap.set(eachEntry.key, eachEntry.value);
            }
            return processedMap;
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
                for (const eachEntry of this.mEntries) {
                    for (const eachResultData of yield transform(eachEntry))
                        processedArray.push(eachResultData);
                }
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    flatMapTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    for (const eachResultData of yield transform(eachEntry))
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
    forEach(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if ((yield action(eachEntry)) == false)
                        break;
            }
        }));
        return koconutToReturn;
    }
    get(key) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key))
                        return eachEntry.value;
                }
            }
            return null;
        }));
        return koconutToReturn;
    }
    getOrDefault(key, defaultValue) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key))
                        return eachEntry.value;
                }
            }
            return defaultValue;
        }));
        return koconutToReturn;
    }
    getOrElse(key, defaultValue) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key))
                        return eachEntry.value;
                }
            }
            return yield defaultValue();
        }));
        return koconutToReturn;
    }
    getValue(key) {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    if ((module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key))
                        || (!module_internal_1.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key))
                        return eachEntry.value;
                }
            }
            throw new module_internal_1.KoconutNoSuchElementException(`No such element mathces given key ${key} is found`);
        }));
        return koconutToReturn;
    }
    isEmpty() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mSize == 0; }));
        return koconutToReturn;
    }
    isNotEmpty() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.mSize != 0; }));
        return koconutToReturn;
    }
    isNullOrEmpty() {
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () { return this.data == null || this.mSize == 0; }));
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
                for (const eachEntry of this.mEntries)
                    processedArray.push(yield transform(eachEntry));
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
    mapKeys(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    processedMap.set(yield transform(eachEntry), eachEntry.value);
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    mapKeysTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    destination.set(yield transform(eachEntry), eachEntry.value);
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
                for (const eachEntry of this.mEntries) {
                    const dataToAdd = yield transform(eachEntry);
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
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    const dataToAdd = yield transform(eachEntry);
                    if (dataToAdd != null)
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
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    const dataToAdd = yield transform(eachEntry);
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
    mapVaues(transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    processedMap.set(eachEntry.key, yield transform(eachEntry));
                }
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    mapValuesTo(destination, transform, thisArg = null) {
        transform = transform.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries) {
                    destination.set(eachEntry.key, yield transform(eachEntry));
                }
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // maxBy -- Depreacted
    maxByOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutEntry();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            let lastComparableDatum = null;
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
                if (lastComparableDatum == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatum) > 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum)) {
                    dataToReturn = eachEntry;
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                if (dataToReturn == null || (yield comparator(dataToReturn, eachEntry)) < 0)
                    dataToReturn = eachEntry;
            }
            return dataToReturn;
        }));
        return koconutToReturn;
    }
    minByOrNull(selector, thisArg = null) {
        selector = selector.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutEntry();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data == null || this.mSize == 0)
                return null;
            let dataToReturn = null;
            let lastComparableDatum = null;
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
                if (lastComparableDatum == null
                    || (module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && (eachComparableDatum).compareTo(lastComparableDatum) < 0)
                    || (!module_internal_1.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum)) {
                    dataToReturn = eachEntry;
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
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
            for (const eachEntry of this.mEntries) {
                const eachComparableDatum = yield selector(eachEntry);
                if (lastComparableDatumToReturn == null || (yield comparator(lastComparableDatumToReturn, eachComparableDatum)) > 0)
                    lastComparableDatumToReturn = eachComparableDatum;
            }
            return lastComparableDatumToReturn;
        }));
        return koconutToReturn;
    }
    minus(keys) {
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = new Map();
            if (this.data != null) {
                let dataToExcept = new Array();
                if (typeof keys[Symbol.iterator] === 'function')
                    dataToExcept = Array.from(keys);
                else
                    dataToExcept.push(keys);
                const koconutKeysToExceptArray = module_internal_1.KoconutArray.from(dataToExcept);
                for (const eachEntry of this.mEntries)
                    if (!(yield koconutKeysToExceptArray.contains(eachEntry.key).yield()))
                        processedMap.set(eachEntry.key, eachEntry.value);
            }
            return processedMap;
        }));
        return koconutToReturn;
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
            for (const eachEntry of this.mEntries) {
                if (dataToReturn == null || (yield comparator(dataToReturn, eachEntry)) > 0)
                    dataToReturn = eachEntry;
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
                for (const eachEntry of this.mEntries)
                    if (yield predicate(eachEntry))
                        return false;
                return true;
            }
            return false;
        }));
        return koconutToReturn;
    }
    onEach(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    if ((yield action(eachEntry)) == false)
                        break;
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    onEachIndexed(action, thisArg = null) {
        action = action.bind(thisArg);
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.data != null) {
                let eachIndex = 0;
                for (const eachEntry of this.mEntries)
                    if ((yield action(eachIndex++, eachEntry)) == false)
                        break;
            }
            return this.data;
        }));
        return koconutToReturn;
    }
    // orEmpty
    plus(element) {
        const koconutToReturn = new KoconutMap();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedMap = this.data == null ? new Map() : new Map(this.data);
            let dataToAdd = new Array();
            if (typeof element[Symbol.iterator] == 'function')
                dataToAdd = Array.from(element);
            else
                dataToAdd.push(element);
            for (const eachDatum of dataToAdd) {
                if (eachDatum instanceof module_internal_1.KoconutEntry) {
                    const entry = yield eachDatum.yield();
                    if (entry != null)
                        processedMap.set(entry.key, entry.value);
                }
                else if (eachDatum instanceof module_internal_1.Entry)
                    processedMap.set(eachDatum.key, eachDatum.value);
                else if (eachDatum instanceof module_internal_1.KoconutPair) {
                    const pair = yield eachDatum.yield();
                    if (pair != null)
                        processedMap.set(pair.first, pair.second);
                }
                else if (eachDatum instanceof module_internal_1.Pair)
                    processedMap.set(eachDatum.first, eachDatum.second);
            }
            return processedMap;
        }));
        return koconutToReturn;
    }
    toArray() {
        const koconutToReturn = new module_internal_1.KoconutArray();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            const processedArray = new Array();
            if (this.data != null) {
                for (const eachEntry of this.mEntries)
                    processedArray.push(new module_internal_1.Entry(eachEntry.key, eachEntry.value));
            }
            return processedArray;
        }));
        return koconutToReturn;
    }
}
exports.KoconutMap = KoconutMap;
