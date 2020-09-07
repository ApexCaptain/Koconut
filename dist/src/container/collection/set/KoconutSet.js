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
exports.KoconutSet = void 0;
`use strict`;
const module_internal_1 = require("../../../../module.internal");
class KoconutSet extends module_internal_1.KoconutCollection {
    static from(source) {
        return new KoconutSet(new Set(source));
    }
    static of(...data) {
        return new KoconutSet(new Set(data));
    }
    /* Koconut Primitive */
    validiate(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (data != null) {
                let index = 0;
                const keys = new Array();
                for (const eachDatum of data) {
                    if (module_internal_1.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                        let isConflict = false;
                        for (const eachPrevEquatablekDatum of keys) {
                            if (eachDatum.equalsTo(eachPrevEquatablekDatum)) {
                                isConflict = true;
                                break;
                            }
                        }
                        if (!isConflict) {
                            this.mSize++;
                            this.mIndices.push(index++);
                            keys.push(eachDatum);
                        }
                        else
                            (_a = this.data) === null || _a === void 0 ? void 0 : _a.delete(eachDatum);
                    }
                    else {
                        this.mSize++;
                        this.mIndices.push(index++);
                    }
                }
                this.combinedDataWrapper = data;
            }
        });
    }
    static fromCollection(collection) {
        const koconutToReturn = new KoconutSet(collection['data']);
        koconutToReturn.processor = collection['processor'];
        koconutToReturn.prevYieldable = collection['prevYieldable'];
        return koconutToReturn;
    }
    associateByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        return KoconutSet.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
    associateTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.associateTo(destination, transform, thisArg));
    }
    associateWithTo(destination, valueSelector, thisArg = null) {
        return KoconutSet.fromCollection(super.associateWithTo(destination, valueSelector, thisArg));
    }
    distinct() {
        return KoconutSet.fromCollection(super.distinct());
    }
    distinctBy(selector, thisArg = null) {
        return KoconutSet.fromCollection(super.distinctBy(selector, thisArg));
    }
    drop(n) {
        return KoconutSet.fromCollection(super.drop(n));
    }
    dropLast(n) {
        return KoconutSet.fromCollection(super.dropLast(n));
    }
    dropLastWhile(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.dropLastWhile(predicate, thisArg));
    }
    dropWhile(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.dropWhile(predicate, thisArg));
    }
    filter(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filter(predicate, thisArg));
    }
    filterIndexed(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filterIndexed(predicate, thisArg));
    }
    filterIndexedTo(destination, predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filterIndexedTo(destination, predicate, thisArg));
    }
    filterNot(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filterNot(predicate, thisArg));
    }
    filterNotNull() {
        return KoconutSet.fromCollection(super.filterNotNull());
    }
    filterNotNullTo(destination) {
        return KoconutSet.fromCollection(super.filterNotNullTo(destination));
    }
    filterNotTo(destination, predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filterNotTo(destination, predicate, thisArg));
    }
    filterTo(destination, predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.filterTo(destination, predicate, thisArg));
    }
    flatMapIndexedTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.flatMapIndexedTo(destination, transform, thisArg));
    }
    flatMapTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.flatMapTo(destination, transform, thisArg));
    }
    groupByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        return KoconutSet.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
    mapIndexedNotNullTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg));
    }
    mapIndexedTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.mapIndexedTo(destination, transform, thisArg));
    }
    mapNotNullTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.mapNotNullTo(destination, transform, thisArg));
    }
    mapTo(destination, transform, thisArg = null) {
        return KoconutSet.fromCollection(super.mapTo(destination, transform, thisArg));
    }
    minus(elements) {
        if (typeof elements[Symbol.iterator] === 'function')
            return KoconutSet.fromCollection(super.minus(elements));
        else
            return KoconutSet.fromCollection(super.minus(elements));
    }
    minusElement(element) {
        return KoconutSet.fromCollection(super.minusElement(element));
    }
    onEach(action, thisArg = null) {
        return KoconutSet.fromCollection(super.onEach(action, thisArg));
    }
    onEachIndexed(action, thisArg = null) {
        return KoconutSet.fromCollection(super.onEachIndexed(action, thisArg));
    }
    plus(elements) {
        if (typeof elements[Symbol.iterator] === 'function')
            return KoconutSet.fromCollection(super.plus(elements));
        else
            return KoconutSet.fromCollection(super.plus(elements));
    }
    plusElement(element) {
        return KoconutSet.fromCollection(super.plusElement(element));
    }
    reversed() {
        return KoconutSet.fromCollection(super.reversed());
    }
    shuffled() {
        return KoconutSet.fromCollection(super.shuffled());
    }
    sortedBy(selector, thisArg = null) {
        return KoconutSet.fromCollection(super.sortedBy(selector, thisArg));
    }
    sortedByDescending(selector, thisArg = null) {
        return KoconutSet.fromCollection(super.sortedByDescending(selector, thisArg));
    }
    sortedWith(comparator, thisArg = null) {
        return KoconutSet.fromCollection(super.sortedWith(comparator, thisArg));
    }
    take(n) {
        return KoconutSet.fromCollection(super.take(n));
    }
    takeLast(n) {
        return KoconutSet.fromCollection(super.takeLast(n));
    }
    takeLastWhile(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.takeLastWhile(predicate, thisArg));
    }
    takeWhile(predicate, thisArg = null) {
        return KoconutSet.fromCollection(super.takeWhile(predicate, thisArg));
    }
}
exports.KoconutSet = KoconutSet;
