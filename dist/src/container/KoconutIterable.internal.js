"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutIterable = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _module = require("../../module.internal");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var KoconutIterable = /*#__PURE__*/function (_KoconutPrimitive) {
  (0, _inherits2["default"])(KoconutIterable, _KoconutPrimitive);

  var _super = _createSuper(KoconutIterable);

  function KoconutIterable() {
    var _this;

    (0, _classCallCheck2["default"])(this, KoconutIterable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "combinedDataWrapper", null);
    return _this;
  }

  (0, _createClass2["default"])(KoconutIterable, [{
    key: "all",
    // Inspector

    /**
     * Return ```true``` if all elements match te given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Inspector
     * 
     * @example
     * ``` typescript
     *   // Case 1 -- KoconutArray
     *   const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     *   const areAllArrayElementsGreaterThan0 = await koconutArray
     *                                           .all(eachNumber => eachNumber > 0)
     *                                           .yield()
     *   console.log(areAllArrayElementsGreaterThan0)
     *   // ↑ true
     *
     *   const areAllArrayElementsEven = await koconutArray
     *                                   .all(eachNumber => eachNumber % 2 == 0)
     *                                   .yield()
     *   console.log(areAllArrayElementsEven)
     *   // ↑ false -- i.e. '1' is not an even number.
     *
     *
     *   // Case 2 -- KoconutSet
     *   const koconutSet = KoconutSet.of(1,2,3,4,5)
     *   
     *   const areAllSetElementsGreaterThan0 = await koconutSet
     *                                           .all(eachNumber => eachNumber > 0)
     *                                           .yield()
     *   console.log(areAllSetElementsGreaterThan0)
     *   // ↑ true
     *
     *   const areAllSetElementsOdd = await koconutSet
     *                                   .all(eachNumber => eachNumber % 2 == 1)
     *                                   .yield()
     *   console.log(areAllSetElementsOdd)
     *   // ↑ false -- i.e. '2' is not an odd number.
     *
     *
     *   // Case 3 -- KoconutMap
     *   const koconutMap = KoconutMap.of(
     *       [0, 0],
     *       [1, 1],
     *       [2, 2]
     *   )
     *
     *   const areAllMapEntriesKeyEqualsToValue = await koconutMap
     *                                          .all(eachEntry => eachEntry.key == eachEntry.value)
     *                                          .yield()
     *   console.log(areAllMapEntriesKeyEqualsToValue)
     *   // ↑ true
     *
     *   const areAllMapEntriesSumGreaterThan3 = await koconutMap
     *                                         .all(eachEntry => eachEntry.key + eachEntry.value > 3)
     *                                         .yield()
     *   console.log(areAllMapEntriesSumGreaterThan3)
     *   // ↑ false -- i.e. Sum of key and value of first Entry { 0, 0 } is 0. 
     *   // It's definetly less than 3
     * 
     *   // Case 4 -- You can also do it asynchronously
     *   const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     *   const areAllArrayElementsLessThan10 = await koconutArray2
     *                                       .all(async eachNumber => eachNumber < 10)
     *                                       .yield()
     *   console.log(areAllArrayElementsLessThan10)
     *   // ↑ true
     *
     *   const areAllArrayElementsOdd = await koconutArray2
     *                                   .all(eachNumber => new Promise(resolve => {
     *                                       resolve(eachNumber % 2 == 1)
     *                                   }))
     *                                   .yield()
     *   console.log(areAllArrayElementsOdd)
     *   // ↑ false -- i.e. '2' is not an odd number.
     * ```
     */
    value: function all(predicate) {
      var _this2 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _iterator, _step, eachCombinedDatum;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2.combinedDataWrapper == null)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", false);

              case 2:
                _iterator = _createForOfIteratorHelper(_this2.combinedDataWrapper);
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 13;
                  break;
                }

                eachCombinedDatum = _step.value;
                _context.next = 9;
                return predicate(eachCombinedDatum);

              case 9:
                if (_context.sent) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", false);

              case 11:
                _context.next = 5;
                break;

              case 13:
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);

                _iterator.e(_context.t0);

              case 18:
                _context.prev = 18;

                _iterator.f();

                return _context.finish(18);

              case 21:
                return _context.abrupt("return", true);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
    /**
     * Returns ```true``` if the collection has at least one element matches the given ```predicate```.
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Inspector
     * 
     * @example
     * ``` typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const isAnyArrayElementGreaterThan4 = await koconutArray
     *                                           .any(eachNumber => eachNumber > 4)
     *                                           .yield()
     * console.log(isAnyArrayElementGreaterThan4)
     * // ↑ true -- i.e. '5' is greater than 4.
     *
     * const isAnyArrayElementMultipleOf6 = await koconutArray
     *                                           .any(eachNumber => eachNumber % 6 == 0)
     *                                           .yield()
     * console.log(isAnyArrayElementMultipleOf6)
     * // ↑ false
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const isAnySetElementGreaterThan3 = await koconutSet
     *                                           .any(eachNumber => eachNumber > 3)
     *                                           .yield()
     * console.log(isAnySetElementGreaterThan3)
     * // ↑ true -- i.e. '4' is greater than 3.
     *
     * const isAnySetElementLessThan0 = await koconutSet
     *                                       .any(eachNumber => eachNumber < 0)
     *                                       .yield()
     * console.log(isAnySetElementLessThan0)
     * // ↑ false
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutMap.of(
     *   [0, 0],
     *   [1, 1],
     *   [2, 2]
     * )
     *
     * const isAnyMapEntrySumGreaterThan3 = await koconutMap
     *                                        .any(eachEntry => eachEntry.key + eachEntry.value > 3)
     *                                        .yield()
     * console.log(isAnyMapEntrySumGreaterThan3)
     * // ↑ true -- i.e. Sum of key and value of third Entry { 2, 2 } is 4.
     * // It's grater than 4.
     * 
     * const isAnyMapEntryKeyMultipleOf4 = await koconutMap
     *                                  .any(eachEntry => eachEntry.key > 0 && eachEntry.key % 4 == 0)
     *                                  .yield()
     * console.log(isAnyMapEntryKeyMultipleOf4)
     * // ↑ false
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     * 
     * const isAnyArrayElementLessThan2 = await koconutArray2
     *                                   .any(async eachNumber => eachNumber < 2)
     *                                   .yield()
     * console.log(isAnyArrayElementLessThan2)
     * // ↑ true -- i.e. '1' is less than 2.
     *
     * const isAnyArrayElementGreaterThan7 = await koconutArray2
     *                                       .any(eachNumber => new Promise(resolve => {
     *                                           resolve(eachNumber > 7)
     *                                       }))
     *                                       .yield()
     * console.log(isAnyArrayElementGreaterThan7)
     * // ↑ false
     * ```
     */

  }, {
    key: "any",
    value: function any(predicate) {
      var _this3 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _iterator2, _step2, eachCombinedDatum;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this3.combinedDataWrapper == null)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                _iterator2 = _createForOfIteratorHelper(_this3.combinedDataWrapper);
                _context2.prev = 3;

                _iterator2.s();

              case 5:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 13;
                  break;
                }

                eachCombinedDatum = _step2.value;
                _context2.next = 9;
                return predicate(eachCombinedDatum);

              case 9:
                if (!_context2.sent) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", true);

              case 11:
                _context2.next = 5;
                break;

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](3);

                _iterator2.e(_context2.t0);

              case 18:
                _context2.prev = 18;

                _iterator2.f();

                return _context2.finish(18);

              case 21:
                return _context2.abrupt("return", false);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    } // Transformer
    // asIterable

    /**
     * Returns a single list of all elements yielded from results of ```transform``` function being invoked on each element of original collection.
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
     * const koconutArray = KoconutArray.of("123", "45")
     *
     * const allNumberInArray = await koconutArray
     *                           .flatMap(eachString => eachString)
     *                           // ↑ The string itself can be used as Iterable<string>.
     *                           // If you want to make it clear, also possible to type
     *                           // as eachString => eachString.split('')
     *                           .map(parseInt)
     *                           .yield()
     * console.log(allNumberInArray)
     * // ↑ [ 1, 2, 3, 4, 5 ]
     *
     * // Case 2 - KoconutSet
     * const koconutSet = KoconutSet.of("abc", "de")
     *
     * const allCharactersInSet = await koconutSet
     *                           .flatMap(eachString => eachString)
     *                           .yield()
     * console.log(allCharactersInSet)
     * // ↑ [ 'a', 'b', 'c', 'd', 'e' ]
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3,4,5)
     *                   .associateWith(eachNumber => eachNumber * 2)
     *
     * const allKeysAndValuesInMap = await koconutMap
     *                               .flatMap(eachEntry => [eachEntry.key, eachEntry.value])
     *                               .yield()
     * console.log(allKeysAndValuesInMap)
     * // ↑ [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
     *
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(123, 987)
     *
     * const allDigitsInArray = await koconutArray2
     *                               .flatMap(async eachNumber => {
     *                                   const digits = new Array<number>()
     *                                   while(eachNumber != 0) {
     *                                       digits.unshift(eachNumber % 10)
     *                                       eachNumber = Math.floor(eachNumber / 10)
     *                                   }
     *                                   return digits
     *                               })
     *                               .yield()
     * console.log(allDigitsInArray)
     * // ↑ [ 1, 2, 3, 9, 8, 7 ]
     *
     * const allNumberCharactersInArray = await koconutArray2
     *                                       .flatMap(eachNumber => new Promise<string>(resolve => {
     *                                           resolve(eachNumber.toString())
     *                                       }))
     *                                       .yield()
     * console.log(allNumberCharactersInArray)
     * // ↑ [ '1', '2', '3', '9', '8', '7' ]
     * ```
     */

  }, {
    key: "flatMap",
    value: function flatMap(transform) {
      var _this4 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var processedArray, _iterator3, _step3, eachCombinedDatum, _iterator4, _step4, eachSubElement;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                processedArray = new Array();

                if (!(_this4.combinedDataWrapper != null)) {
                  _context3.next = 23;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(_this4.combinedDataWrapper);
                _context3.prev = 3;

                _iterator3.s();

              case 5:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 15;
                  break;
                }

                eachCombinedDatum = _step3.value;
                _context3.t0 = _createForOfIteratorHelper;
                _context3.next = 10;
                return transform(eachCombinedDatum);

              case 10:
                _context3.t1 = _context3.sent;
                _iterator4 = (0, _context3.t0)(_context3.t1);

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    eachSubElement = _step4.value;
                    processedArray.push(eachSubElement);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

              case 13:
                _context3.next = 5;
                break;

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t2 = _context3["catch"](3);

                _iterator3.e(_context3.t2);

              case 20:
                _context3.prev = 20;

                _iterator3.f();

                return _context3.finish(20);

              case 23:
                return _context3.abrupt("return", processedArray);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    } // asSequence
    // Calculator

    /**
     * Returns the number of the elements matching the given ```predicate```. If the ```predicate``` is ommitted it'll returns the whole number of elements. 
     * @param predicate A callback function that accepts an argument. The method calls the ```predicate``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```predicate```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Calculator
     * 
     * @example
     * ``` typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const numberOfAllArrayElements = await koconutArray
     *                                       .count()
     *                                       .yield()
     * console.log(numberOfAllArrayElements)
     * // ↑ 5
     *
     * const numberOfArrayElementsHigherThan2 = await koconutArray
     *                                           .count(eachNumber => eachNumber > 2)
     *                                           .yield()
     * console.log(numberOfArrayElementsHigherThan2)
     * // ↑ 3 -- i.e. [3, 4, 5]
     * 
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,4,5)
     *
     * const numberOfAllSetElements = await koconutSet
     *                                       .count()
     *                                       .yield()
     * console.log(numberOfAllSetElements)
     * // ↑ 5
     *
     * const numberOfOddSetElements = await koconutSet
     *                                       .count(eachNumber => eachNumber % 2 == 1)
     *                                       .yield()
     * console.log(numberOfOddSetElements)
     * // ↑ 3 -- i.e. [1, 3, 5]
     * 
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachNumber => eachNumber * 2)
     *                   // ↑ Map { 1 => 2, 
     *                   //         2 => 4, 
     *                   //         3 => 6 }
     *
     * const numberOfAllMapEntries = await koconutMap
     *                                   .count()
     *                                   .yield()
     * console.log(numberOfAllMapEntries)
     * // ↑ 3
     *
     * const numberOfMapEntriesValueHigherThan5 = await koconutMap
     *                                               .count(eachEntry => eachEntry.value > 5)
     *                                               .yield()
     * console.log(numberOfMapEntriesValueHigherThan5)
     * // ↑ 1 -- i.e. Entry { 3, 6 }
     * 
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3,4,5)
     *
     * const numberOfArrayElementsLessThan3 = await koconutArray2
     *                                       .count(async eachNumber => eachNumber < 3)
     *                                       .yield()
     * console.log(numberOfArrayElementsLessThan3)
     * // ↑ 2 -- i.e. [1, 2]
     *
     * const numberOfEvenArrayElements = await koconutArray2
     *                                   .count(eachNumber => new Promise(resolve => {
     *                                       resolve(eachNumber % 2 == 0)
     *                                   }))
     *                                   .yield()
     * console.log(numberOfEvenArrayElements)
     * // ↑ 2 -- i.e. [2, 4]
     * ```
     */

  }, {
    key: "count",
    value: function count() {
      var _this5 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var count, _iterator5, _step5, eachCombinedDatum;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this5.combinedDataWrapper == null)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", 0);

              case 2:
                count = 0;
                _iterator5 = _createForOfIteratorHelper(_this5.combinedDataWrapper);
                _context4.prev = 4;

                _iterator5.s();

              case 6:
                if ((_step5 = _iterator5.n()).done) {
                  _context4.next = 18;
                  break;
                }

                eachCombinedDatum = _step5.value;

                if (predicate) {
                  _context4.next = 12;
                  break;
                }

                count++;
                _context4.next = 16;
                break;

              case 12:
                _context4.next = 14;
                return predicate(eachCombinedDatum);

              case 14:
                if (!_context4.sent) {
                  _context4.next = 16;
                  break;
                }

                count++;

              case 16:
                _context4.next = 6;
                break;

              case 18:
                _context4.next = 23;
                break;

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](4);

                _iterator5.e(_context4.t0);

              case 23:
                _context4.prev = 23;

                _iterator5.f();

                return _context4.finish(23);

              case 26:
                return _context4.abrupt("return", count);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 20, 23, 26]]);
      })));
      return koconutToReturn;
    }
    /**
     * Returns the first element yielding the largest value of the given function or 
     * throw {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @throws {@link KoconutNoSuchElementException}
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * @deprecated Use {@link maxByOrNull} instead.
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const largestNumberOfArray = await koconutArray
     *                               .maxBy(eachNumber => eachNumber)
     *                               .yield()
     * console.log(largestNumberOfArray)
     * // ↑ 5
     *
     * try {
     *   await koconutArray
     *           .filter(eachNumber => eachNumber > 10)
     *           .maxBy(eachNumber => eachNumber)
     *           .yield()
     * } catch(error) {
     *   console.log(error.name)
     *   // ↑ Koconut No Such Element Exception
     *   // i.e. -- Array is filtered.
     *   // No element in 1 to 5 is greater than 10.
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const lognestStringOfSet = await koconutSet
     *                               .maxBy(eachString => eachString.length)
     *                               .yield()
     * console.log(lognestStringOfSet)
     * // ↑ abc
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1, 12, 123)
     *                   .associateWith(eachNumber => eachNumber.toString())
     *
     * const longestDigitsEntryOfMap = await koconutMap
     *                                       .maxBy(eachEntry => eachEntry.value.length)
     *                                       .yield()
     * console.log(longestDigitsEntryOfMap)
     * // ↑ Entry { keyElement: 123, valueElement: '123' }
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(19,27,32)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                                   .maxBy(async eachNumber => eachNumber)
     *                                   .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 32
     *
     * const largest1sDigitNumberOfArray2 = await koconutArray2
     *                                       .maxBy(eachNumber => new Promise(resolve => {
     *                                           resolve(eachNumber % 10)
     *                                       }))
     *                                       .yield()
     * console.log(largest1sDigitNumberOfArray2)
     * // ↑ 19
     * ```
     */

  }, {
    key: "maxBy",
    value: function maxBy(selector) {
      var _this6 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _module.KoconutDeprecation.showDeprecationWarning("1.2.0", this.maxByOrNull);

      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var dataToReturn, lastComparableDatum, _iterator6, _step6, eachCombinedDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this6.combinedDataWrapper == null)) {
                  _context5.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null");

              case 2:
                dataToReturn = null;
                lastComparableDatum = null;
                _iterator6 = _createForOfIteratorHelper(_this6.combinedDataWrapper);
                _context5.prev = 5;

                _iterator6.s();

              case 7:
                if ((_step6 = _iterator6.n()).done) {
                  _context5.next = 15;
                  break;
                }

                eachCombinedDatum = _step6.value;
                _context5.next = 11;
                return selector(eachCombinedDatum);

              case 11:
                eachComparableDatum = _context5.sent;

                if (lastComparableDatum == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) > 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum) {
                  dataToReturn = eachCombinedDatum;
                  lastComparableDatum = eachComparableDatum;
                }

              case 13:
                _context5.next = 7;
                break;

              case 15:
                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](5);

                _iterator6.e(_context5.t0);

              case 20:
                _context5.prev = 20;

                _iterator6.f();

                return _context5.finish(20);

              case 23:
                if (!(dataToReturn == null)) {
                  _context5.next = 25;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is empty");

              case 25:
                return _context5.abrupt("return", dataToReturn);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
    /**
     * Returns the first element yielding the largest value of the given function or null if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5)
     *
     * const largestNumberOfArray = await koconutArray
     *                               .maxByOrNull(eachNumber => eachNumber)
     *                               .yield()
     * console.log(largestNumberOfArray)
     * // ↑ 5
     *
     * 
     * const largestNumberOfEmptyArray = await koconutArray
     *                                 .filter(eachNumber => eachNumber > 10)
     *                                 .maxByOrNull(eachNumber => eachNumber)
     *                                 .yield()
     * console.log(largestNumberOfEmptyArray)
     * // ↑ null
     * 
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const lognestStringOfSet = await koconutSet
     *                               .maxByOrNull(eachString => eachString.length)
     *                               .yield()
     * console.log(lognestStringOfSet)
     * // ↑ abc
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1, 12, 123)
     *                   .associateWith(eachNumber => eachNumber.toString())
     *
     * const longestDigitsEntryOfMap = await koconutMap
     *                                       .maxByOrNull(eachEntry => eachEntry.value.length)
     *                                       .yield()
     * console.log(longestDigitsEntryOfMap)
     * // ↑ Entry { keyElement: 123, valueElement: '123' }
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(19,27,32)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                                   .maxByOrNull(async eachNumber => eachNumber)
     *                                   .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 32
     *
     * const largest1sDigitNumberOfArray2 = await koconutArray2
     *                                       .maxByOrNull(eachNumber => new Promise(resolve => {
     *                                           resolve(eachNumber % 10)
     *                                       }))
     *                                       .yield()
     * console.log(largest1sDigitNumberOfArray2)
     * // ↑ 19
     * ```
     */

  }, {
    key: "maxByOrNull",
    value: function maxByOrNull(selector) {
      var _this7 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var dataToReturn, lastComparableDatum, _iterator7, _step7, eachCombinedDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(_this7.combinedDataWrapper == null)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", null);

              case 2:
                dataToReturn = null;
                lastComparableDatum = null;
                _iterator7 = _createForOfIteratorHelper(_this7.combinedDataWrapper);
                _context6.prev = 5;

                _iterator7.s();

              case 7:
                if ((_step7 = _iterator7.n()).done) {
                  _context6.next = 15;
                  break;
                }

                eachCombinedDatum = _step7.value;
                _context6.next = 11;
                return selector(eachCombinedDatum);

              case 11:
                eachComparableDatum = _context6.sent;

                if (lastComparableDatum == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) > 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum < eachComparableDatum) {
                  dataToReturn = eachCombinedDatum;
                  lastComparableDatum = eachComparableDatum;
                }

              case 13:
                _context6.next = 7;
                break;

              case 15:
                _context6.next = 20;
                break;

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6["catch"](5);

                _iterator7.e(_context6.t0);

              case 20:
                _context6.prev = 20;

                _iterator7.f();

                return _context6.finish(20);

              case 23:
                return _context6.abrupt("return", dataToReturn);

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[5, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
    /**
     * Returns the largest value among all values produced by ```selector``` function applied to each element in the collection or 
     * throw {@link KoconutNoSuchElementException} if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @throws {@link KoconutNoSuchElementException}
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const largestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                               .maxOf(eachNumber => eachNumber % 5)
     *                                               .yield()
     * console.log(largestRemainderNumberDividedBy5OfArray)
     * // ↑ 4
     *
     * try {
     *   await koconutArray
     *           .filter(eachNumber => eachNumber > 10)
     *           .maxOf(eachNumber => eachNumber % 5)
     *           .yield()
     * } catch(error) {
     *   console.log(error.name)
     *   // ↑ Koconut No Such Element Exception
     *   // i.e. -- Array is filtered.
     *   // No element in 1 to 5 is greater than 10.
     * }
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const longestStringLengthOfSet = await koconutSet
     *                               .maxOf(eachString => eachString.length)
     *                               .yield()
     * console.log(longestStringLengthOfSet)
     * // ↑ 3
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const maxComparableString = await koconutSet
     *                           .maxOf(eachString => new ComparableString(eachString))
     *                           .yield()
     * console.log(maxComparableString)
     * // ↑ ComparableString { str: 'abc' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOf(eachEntry => eachEntry.key)
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                           .maxOf(async eachNumber => eachNumber)
     *                           .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                           .maxOf(eachNumber => new Promise(resolve => {
     *                               resolve(eachNumber % 10)
     *                           }))
     *                           .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */

  }, {
    key: "maxOf",
    value: function maxOf(selector) {
      var _this8 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var lastComparableDatumToReturn, _iterator8, _step8, eachCombinedDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(_this8.combinedDataWrapper == null)) {
                  _context7.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator8 = _createForOfIteratorHelper(_this8.combinedDataWrapper);
                _context7.prev = 4;

                _iterator8.s();

              case 6:
                if ((_step8 = _iterator8.n()).done) {
                  _context7.next = 14;
                  break;
                }

                eachCombinedDatum = _step8.value;
                _context7.next = 10;
                return selector(eachCombinedDatum);

              case 10:
                eachComparableDatum = _context7.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) > 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context7.next = 6;
                break;

              case 14:
                _context7.next = 19;
                break;

              case 16:
                _context7.prev = 16;
                _context7.t0 = _context7["catch"](4);

                _iterator8.e(_context7.t0);

              case 19:
                _context7.prev = 19;

                _iterator8.f();

                return _context7.finish(19);

              case 22:
                if (!(lastComparableDatumToReturn == null)) {
                  _context7.next = 24;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is empty");

              case 24:
                return _context7.abrupt("return", lastComparableDatumToReturn);

              case 25:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
    /**
     * Returns the largest value among all values produced by ```selector``` function applied to each element in the collection or 
     * null if there are no elements.
     * @param selector A callback function that accepts an argument. The method calls the ```selector``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```selector```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @category Calculator
     * 
     * @since 1.0.10
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,7,9)
     *
     * const largestRemainderNumberDividedBy5OfArray = await koconutArray
     *                                               .maxOfOrNull(eachNumber => eachNumber % 5)
     *                                               .yield()
     * console.log(largestRemainderNumberDividedBy5OfArray)
     * // ↑ 4
     * 
     * const largestRemainderNumberDividedBy5OfEmptyArray = await koconutArray
     *                                       .filter(eachNumber => eachNumber > 10)
     *                                       .maxOfOrNull(eachNumber => eachNumber % 5)
     *                                       .yield()
     * console.log(largestRemainderNumberDividedBy5OfEmptyArray)
     * // ↑ null
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of("a", "ab", "abc")
     *
     * const longestStringLengthOfSet = await koconutSet
     *                               .maxOfOrNull(eachString => eachString.length)
     *                               .yield()
     * console.log(longestStringLengthOfSet)
     * // ↑ 3
     *
     * class ComparableString implements KoconutComparable{
     *   str : string
     *   constructor(str : string) {
     *       this.str = str
     *   }
     *   // Override
     *   compareTo(other : ComparableString) : number {
     *       return this.str.length - other.str.length
     *   }
     * }
     * const maxComparableString = await koconutSet
     *                           .maxOfOrNull(eachString => new ComparableString(eachString))
     *                           .yield()
     * console.log(maxComparableString)
     * // ↑ ComparableString { str: 'abc' }
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of("a", "ab", "abc")
     *                   .associate(eachString => [eachString.length, eachString])
     *
     * const longestStringLengthOfMap = await koconutMap
     *                                   .maxOfOrNull(eachEntry => eachEntry.key)
     *                                   .yield()
     * console.log(longestStringLengthOfMap)
     * // ↑ 3
     *
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(12,51,32,45,50)
     *
     * const largestNumberOfArray2 = await koconutArray2
     *                           .maxOfOrNull(async eachNumber => eachNumber)
     *                           .yield()
     * console.log(largestNumberOfArray2)
     * // ↑ 51
     *
     * const largest1sDigitOfArray2 = await koconutArray2
     *                           .maxOfOrNull(eachNumber => new Promise(resolve => {
     *                               resolve(eachNumber % 10)
     *                           }))
     *                           .yield()
     * console.log(largest1sDigitOfArray2)
     * // ↑ 5
     * ```
     */

  }, {
    key: "maxOfOrNull",
    value: function maxOfOrNull(selector) {
      var _this9 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var lastComparableDatumToReturn, _iterator9, _step9, eachCombinedDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(_this9.combinedDataWrapper == null)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator9 = _createForOfIteratorHelper(_this9.combinedDataWrapper);
                _context8.prev = 4;

                _iterator9.s();

              case 6:
                if ((_step9 = _iterator9.n()).done) {
                  _context8.next = 14;
                  break;
                }

                eachCombinedDatum = _step9.value;
                _context8.next = 10;
                return selector(eachCombinedDatum);

              case 10:
                eachComparableDatum = _context8.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) > 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn < eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context8.next = 6;
                break;

              case 14:
                _context8.next = 19;
                break;

              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8["catch"](4);

                _iterator9.e(_context8.t0);

              case 19:
                _context8.prev = 19;

                _iterator9.f();

                return _context8.finish(19);

              case 22:
                return _context8.abrupt("return", lastComparableDatumToReturn);

              case 23:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    } // Iterator

    /**
     * Performs the given ```action``` on each element.
     * When you want to stop iteration in the meantime ```return``` ```false``` or {@link KoconutLoopSignal.BREAK}.
     * @param action A callback function that accepts an argument. The method calls the ```action``` one time for each element in object.
     * @param thisArg An object to which the ```this``` keyword can refer in the ```action```. If ```thisArg``` is omitted, ```null``` is used as the ```this``` value.
     * 
     * @since 1.0.10
     * 
     * @category Iterator
     * 
     * @example
     * ```typescript
     * // Case 1 -- KoconutArray
     * const koconutArray = KoconutArray.of(1,2,3,4,5,6,7)
     * await koconutArray
     *   .forEach(console.log)
     *   // ↑ 1 2 3 4 5 6 7  -- i.e. This will print out each number
     *   .process()
     *
     * await koconutArray
     *   .forEach(eachNumber => {
     *       if(eachNumber > 4) return KoconutLoopSignal.BREAK
     *       console.log(eachNumber)
     *   })
     *   // ↑ 1 2 3 4  -- i.e. Since '5', it is greater than 4, so the loop is broken.
     *   .process()
     *
     *
     * // Case 2 -- KoconutSet
     * const koconutSet = KoconutSet.of(1,2,3,1,2,3)
     *
     * await koconutSet
     *   .forEach(console.log)
     *   // ↑ 1 2 3 -- i.e. All conflicted numbers will be ignored.
     *   .process()
     *
     * await koconutSet
     *   .forEach(eachNumber => {
     *       if(eachNumber % 2 == 0) return false
     *       console.log(eachNumber)
     *   })
     *   // ↑ 1 -- i.e. Since '2', it is an even number, so the loop is broken.
     *   .process()
     *
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachElement => eachElement)
     *
     * await koconutMap
     *   .forEach(console.log)
     *   // ↑ 
     *   // Entry { keyElement: 1, valueElement: 1 }
     *   // Entry { keyElement: 2, valueElement: 2 }
     *   // Entry { keyElement: 3, valueElement: 3 }
     *   .process()
     *   
     * // Case 4 -- You can also do it asynchronously
     * const koconutArray2 = KoconutArray.of(1,2,3)
     *    
     * await koconutArray2
     *   .forEach(async eachNumber => console.log(eachNumber))
     *   // ↑ 1 2 3
     *   .process()
     *
     * await koconutArray2
     *   .forEach(eachNumber => new Promise(resolve => resolve(console.log(eachNumber))))
     *   // ↑ 1 2 3
     *   .process()
     * ```
     */

  }, {
    key: "forEach",
    value: function forEach(action) {
      var _this10 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var _iterator10, _step10, eachCombinedDatum, signal;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(_this10.combinedDataWrapper != null)) {
                  _context9.next = 21;
                  break;
                }

                _iterator10 = _createForOfIteratorHelper(_this10.combinedDataWrapper);
                _context9.prev = 2;

                _iterator10.s();

              case 4:
                if ((_step10 = _iterator10.n()).done) {
                  _context9.next = 13;
                  break;
                }

                eachCombinedDatum = _step10.value;
                _context9.next = 8;
                return action(eachCombinedDatum);

              case 8:
                signal = _context9.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context9.next = 11;
                  break;
                }

                return _context9.abrupt("break", 13);

              case 11:
                _context9.next = 4;
                break;

              case 13:
                _context9.next = 18;
                break;

              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9["catch"](2);

                _iterator10.e(_context9.t0);

              case 18:
                _context9.prev = 18;

                _iterator10.f();

                return _context9.finish(18);

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
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
     * // Case 3 -- KoconutMap
     * const koconutMap = KoconutArray.of(1,2,3)
     *                   .associateWith(eachElement => eachElement)
     *
     * await koconutMap
     *       .forEachIndexed(console.log)
     *       // ↑
     *       // 0 Entry { keyElement: 1, valueElement: 1 }
     *       // 1 Entry { keyElement: 2, valueElement: 2 }
     *       // 2 Entry { keyElement: 3, valueElement: 3 }
     *       .process()
     *
     * // Case 4 -- You can also do it asynchronously
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

  }, {
    key: "forEachIndexed",
    value: function forEachIndexed(action) {
      var _this11 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var eachIndex, _iterator11, _step11, eachCombinedDatum, signal;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(_this11.combinedDataWrapper != null)) {
                  _context10.next = 22;
                  break;
                }

                eachIndex = 0;
                _iterator11 = _createForOfIteratorHelper(_this11.combinedDataWrapper);
                _context10.prev = 3;

                _iterator11.s();

              case 5:
                if ((_step11 = _iterator11.n()).done) {
                  _context10.next = 14;
                  break;
                }

                eachCombinedDatum = _step11.value;
                _context10.next = 9;
                return action(eachIndex++, eachCombinedDatum);

              case 9:
                signal = _context10.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context10.next = 12;
                  break;
                }

                return _context10.abrupt("break", 14);

              case 12:
                _context10.next = 5;
                break;

              case 14:
                _context10.next = 19;
                break;

              case 16:
                _context10.prev = 16;
                _context10.t0 = _context10["catch"](3);

                _iterator11.e(_context10.t0);

              case 19:
                _context10.prev = 19;

                _iterator11.f();

                return _context10.finish(19);

              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }]);
  return KoconutIterable;
}(_module.KoconutPrimitive);

exports.KoconutIterable = KoconutIterable;