"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoconutArray = void 0;
`use strict`;
const module_internal_1 = require("../../../../module.internal");
class KoconutArray extends module_internal_1.KoconutCollection {
    static from(source) {
        return new KoconutArray(Array.from(source));
    }
    static of(...data) {
        return new KoconutArray(data);
    }
    static fromCollection(collection) {
        const koconutToReturn = new KoconutArray(collection['data']);
        koconutToReturn.processor = collection['processor'];
        koconutToReturn.prevYieldable = collection['prevYieldable'];
        return koconutToReturn;
    }
    associateByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        return KoconutArray.fromCollection(super.associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
    associateTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.associateTo(destination, transform, thisArg));
    }
    associateWithTo(destination, valueSelector, thisArg = null) {
        return KoconutArray.fromCollection(super.associateWithTo(destination, valueSelector, thisArg));
    }
    distinct() {
        return KoconutArray.fromCollection(super.distinct());
    }
    distinctBy(selector, thisArg = null) {
        return KoconutArray.fromCollection(super.distinctBy(selector, thisArg));
    }
    drop(n) {
        return KoconutArray.fromCollection(super.drop(n));
    }
    dropLast(n) {
        return KoconutArray.fromCollection(super.dropLast(n));
    }
    dropLastWhile(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.dropLastWhile(predicate, thisArg));
    }
    dropWhile(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.dropWhile(predicate, thisArg));
    }
    filter(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filter(predicate, thisArg));
    }
    filterIndexed(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filterIndexed(predicate, thisArg));
    }
    filterIndexedTo(destination, predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filterIndexedTo(destination, predicate, thisArg));
    }
    filterNot(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filterNot(predicate, thisArg));
    }
    filterNotNull() {
        return KoconutArray.fromCollection(super.filterNotNull());
    }
    filterNotNullTo(destination) {
        return KoconutArray.fromCollection(super.filterNotNullTo(destination));
    }
    filterNotTo(destination, predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filterNotTo(destination, predicate, thisArg));
    }
    filterTo(destination, predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.filterTo(destination, predicate, thisArg));
    }
    flatMapIndexedTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.flatMapIndexedTo(destination, transform, thisArg));
    }
    flatMapTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.flatMapTo(destination, transform, thisArg));
    }
    groupByTo(destination, keySelector, valueTransform = null, keySelectorThisArg = null, valueTransformThisArg = null) {
        return KoconutArray.fromCollection(super.groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
    mapIndexedNotNullTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.mapIndexedNotNullTo(destination, transform, thisArg));
    }
    mapIndexedTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.mapIndexedTo(destination, transform, thisArg));
    }
    mapNotNullTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.mapNotNullTo(destination, transform, thisArg));
    }
    mapTo(destination, transform, thisArg = null) {
        return KoconutArray.fromCollection(super.mapTo(destination, transform, thisArg));
    }
    minus(elements) {
        if (typeof elements[Symbol.iterator] === 'function')
            return KoconutArray.fromCollection(super.minus(elements));
        else
            return KoconutArray.fromCollection(super.minus(elements));
    }
    minusElement(element) {
        return KoconutArray.fromCollection(super.minusElement(element));
    }
    onEach(action, thisArg = null) {
        return KoconutArray.fromCollection(super.onEach(action, thisArg));
    }
    onEachIndexed(action, thisArg = null) {
        return KoconutArray.fromCollection(super.onEachIndexed(action, thisArg));
    }
    plus(elements) {
        if (typeof elements[Symbol.iterator] === 'function')
            return KoconutArray.fromCollection(super.plus(elements));
        else
            return KoconutArray.fromCollection(super.plus(elements));
    }
    plusElement(element) {
        return KoconutArray.fromCollection(super.plusElement(element));
    }
    reversed() {
        return KoconutArray.fromCollection(super.reversed());
    }
    shuffled() {
        return KoconutArray.fromCollection(super.shuffled());
    }
    sortedBy(selector, thisArg = null) {
        return KoconutArray.fromCollection(super.sortedBy(selector, thisArg));
    }
    sortedByDescending(selector, thisArg = null) {
        return KoconutArray.fromCollection(super.sortedByDescending(selector, thisArg));
    }
    sortedWith(comparator, thisArg = null) {
        return KoconutArray.fromCollection(super.sortedWith(comparator, thisArg));
    }
    take(n) {
        return KoconutArray.fromCollection(super.take(n));
    }
    takeLast(n) {
        return KoconutArray.fromCollection(super.takeLast(n));
    }
    takeLastWhile(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.takeLastWhile(predicate, thisArg));
    }
    takeWhile(predicate, thisArg = null) {
        return KoconutArray.fromCollection(super.takeWhile(predicate, thisArg));
    }
}
exports.KoconutArray = KoconutArray;
