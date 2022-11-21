"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutCollection = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _module = require("../../../module");
var _KoconutEntry = require("../base/KoconutEntry");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
"use strict";
var KoconutCollection = function (_KoconutIterable) {
  (0, _inherits2["default"])(KoconutCollection, _KoconutIterable);
  var _super = _createSuper(KoconutCollection);
  function KoconutCollection() {
    var _this;
    (0, _classCallCheck2["default"])(this, KoconutCollection);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mIndices", new Array());
    return _this;
  }
  (0, _createClass2["default"])(KoconutCollection, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data) {
        var _this2 = this;
        var dataArray;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (data != null) {
                  dataArray = Array.from(data);
                  this.mSize = dataArray.length;
                  Object.keys(dataArray).map(function (eachString) {
                    return parseInt(eachString);
                  }).forEach(function (eachIndex) {
                    return _this2.mIndices.push(eachIndex);
                  });
                  this.combinedDataWrapper = data;
                }
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function validate(_x) {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
  }, {
    key: "size",
    value:
    function size() {
      var _this3 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _this3.mSize);
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      return koconutToReturn;
    }
  }, {
    key: "indices",
    value: function indices() {
      var _this4 = this;
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _this4.mIndices);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
      return koconutToReturn;
    }

  }, {
    key: "fold",
    value:
    function fold(initial, operation) {
      var _this5 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
        var dataToReturn, _iterator, _step, eachDatum;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dataToReturn = initial;
                _iterator = _createForOfIteratorHelper(_this5.data);
                _context4.prev = 2;
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context4.next = 11;
                  break;
                }
                eachDatum = _step.value;
                _context4.next = 8;
                return operation(dataToReturn, eachDatum);
              case 8:
                dataToReturn = _context4.sent;
              case 9:
                _context4.next = 4;
                break;
              case 11:
                _context4.next = 16;
                break;
              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](2);
                _iterator.e(_context4.t0);
              case 16:
                _context4.prev = 16;
                _iterator.f();
                return _context4.finish(16);
              case 19:
                return _context4.abrupt("return", dataToReturn);
              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 13, 16, 19]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "foldIndexed",
    value:
    function foldIndexed(initial, operation) {
      var _this6 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
        var dataToReturn, _iterator2, _step2, _step2$value, eachIndex, eachDatum;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dataToReturn = initial;
                _iterator2 = _createForOfIteratorHelper(Array.from(_this6.data).entries());
                _context5.prev = 2;
                _iterator2.s();
              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context5.next = 11;
                  break;
                }
                _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), eachIndex = _step2$value[0], eachDatum = _step2$value[1];
                _context5.next = 8;
                return operation(eachIndex, dataToReturn, eachDatum);
              case 8:
                dataToReturn = _context5.sent;
              case 9:
                _context5.next = 4;
                break;
              case 11:
                _context5.next = 16;
                break;
              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](2);
                _iterator2.e(_context5.t0);
              case 16:
                _context5.prev = 16;
                _iterator2.f();
                return _context5.finish(16);
              case 19:
                return _context5.abrupt("return", dataToReturn);
              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 13, 16, 19]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "contains",
    value:
    function contains(element) {
      var _this7 = this;
      var koconutToReturn = new _module.KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
        var _iterator3, _step3, eachDatum, isContained, equalityResult;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelper(_this7.data);
                _context6.prev = 1;
                _iterator3.s();
              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context6.next = 22;
                  break;
                }
                eachDatum = _step3.value;
                isContained = false;
                if (!_module.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                  _context6.next = 17;
                  break;
                }
                equalityResult = eachDatum.equalsTo(element);
                if (!(equalityResult instanceof _module.KoconutPrimitive)) {
                  _context6.next = 14;
                  break;
                }
                _context6.next = 11;
                return equalityResult["yield"]();
              case 11:
                isContained = _context6.sent;
                _context6.next = 15;
                break;
              case 14:
                isContained = equalityResult;
              case 15:
                _context6.next = 18;
                break;
              case 17:
                isContained = eachDatum == element;
              case 18:
                if (!isContained) {
                  _context6.next = 20;
                  break;
                }
                return _context6.abrupt("return", true);
              case 20:
                _context6.next = 3;
                break;
              case 22:
                _context6.next = 27;
                break;
              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6["catch"](1);
                _iterator3.e(_context6.t0);
              case 27:
                _context6.prev = 27;
                _iterator3.f();
                return _context6.finish(27);
              case 30:
                return _context6.abrupt("return", false);
              case 31:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 24, 27, 30]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "containsAll",
    value:
    function containsAll(elements) {
      var _this8 = this;
      var koconutToReturn = new _module.KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
        var dataArray, _iterator4, _step4, eachElementToCheck, isIncluded, _iterator5, _step5, eachDatum, equalityResult;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dataArray = Array.from(_this8.data);
                _iterator4 = _createForOfIteratorHelper(elements);
                _context7.prev = 2;
                _iterator4.s();
              case 4:
                if ((_step4 = _iterator4.n()).done) {
                  _context7.next = 43;
                  break;
                }
                eachElementToCheck = _step4.value;
                if (!_module.KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
                  _context7.next = 39;
                  break;
                }
                isIncluded = false;
                _iterator5 = _createForOfIteratorHelper(dataArray);
                _context7.prev = 9;
                _iterator5.s();
              case 11:
                if ((_step5 = _iterator5.n()).done) {
                  _context7.next = 27;
                  break;
                }
                eachDatum = _step5.value;
                equalityResult = eachElementToCheck.equalsTo(eachDatum);
                _context7.t1 = equalityResult instanceof _module.KoconutPrimitive;
                if (!_context7.t1) {
                  _context7.next = 19;
                  break;
                }
                _context7.next = 18;
                return equalityResult["yield"]();
              case 18:
                _context7.t1 = _context7.sent;
              case 19:
                _context7.t0 = _context7.t1;
                if (_context7.t0) {
                  _context7.next = 22;
                  break;
                }
                _context7.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;
              case 22:
                if (!_context7.t0) {
                  _context7.next = 25;
                  break;
                }
                isIncluded = true;
                return _context7.abrupt("break", 27);
              case 25:
                _context7.next = 11;
                break;
              case 27:
                _context7.next = 32;
                break;
              case 29:
                _context7.prev = 29;
                _context7.t2 = _context7["catch"](9);
                _iterator5.e(_context7.t2);
              case 32:
                _context7.prev = 32;
                _iterator5.f();
                return _context7.finish(32);
              case 35:
                if (isIncluded) {
                  _context7.next = 37;
                  break;
                }
                return _context7.abrupt("return", false);
              case 37:
                _context7.next = 41;
                break;
              case 39:
                if (dataArray.includes(eachElementToCheck)) {
                  _context7.next = 41;
                  break;
                }
                return _context7.abrupt("return", false);
              case 41:
                _context7.next = 4;
                break;
              case 43:
                _context7.next = 48;
                break;
              case 45:
                _context7.prev = 45;
                _context7.t3 = _context7["catch"](2);
                _iterator4.e(_context7.t3);
              case 48:
                _context7.prev = 48;
                _iterator4.f();
                return _context7.finish(48);
              case 51:
                return _context7.abrupt("return", true);
              case 52:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 45, 48, 51], [9, 29, 32, 35]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "forEachIndexed",
    value:
    function forEachIndexed(action) {
      var _this9 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
        var eachIndex, _iterator6, _step6, eachCombinedDatum, signal;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                eachIndex = 0;
                _iterator6 = _createForOfIteratorHelper(_this9.data);
                _context8.prev = 2;
                _iterator6.s();
              case 4:
                if ((_step6 = _iterator6.n()).done) {
                  _context8.next = 13;
                  break;
                }
                eachCombinedDatum = _step6.value;
                _context8.next = 8;
                return action(eachIndex++, eachCombinedDatum);
              case 8:
                signal = _context8.sent;
                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context8.next = 11;
                  break;
                }
                return _context8.abrupt("break", 13);
              case 11:
                _context8.next = 4;
                break;
              case 13:
                _context8.next = 18;
                break;
              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](2);
                _iterator6.e(_context8.t0);
              case 18:
                _context8.prev = 18;
                _iterator6.f();
                return _context8.finish(18);
              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "onEach",
    value:
    function onEach(action, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "onEach", this).call(this, action, thisArg));
    }

  }, {
    key: "onEachIndexed",
    value:
    function onEachIndexed(action, thisArg) {
      var _this10 = this;
      action = action.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9() {
        var eachIndex, _iterator7, _step7, eachDatum, signal;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                eachIndex = 0;
                _iterator7 = _createForOfIteratorHelper(_this10.data);
                _context9.prev = 2;
                _iterator7.s();
              case 4:
                if ((_step7 = _iterator7.n()).done) {
                  _context9.next = 13;
                  break;
                }
                eachDatum = _step7.value;
                _context9.next = 8;
                return action(eachIndex++, eachDatum);
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
                _iterator7.e(_context9.t0);
              case 18:
                _context9.prev = 18;
                _iterator7.f();
                return _context9.finish(18);
              case 21:
                return _context9.abrupt("return", _this10.data);
              case 22:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "distinct",
    value:
    function distinct() {
      var _this11 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10() {
        var processedArray, _iterator8, _step8, eachDatum, isConflict, _iterator9, _step9, eachPrevEquatableDatum, equalityResult;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                processedArray = new Array();
                _iterator8 = _createForOfIteratorHelper(_this11.data);
                _context10.prev = 2;
                _iterator8.s();
              case 4:
                if ((_step8 = _iterator8.n()).done) {
                  _context10.next = 42;
                  break;
                }
                eachDatum = _step8.value;
                if (!_module.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                  _context10.next = 38;
                  break;
                }
                isConflict = false;
                _iterator9 = _createForOfIteratorHelper(processedArray);
                _context10.prev = 9;
                _iterator9.s();
              case 11:
                if ((_step9 = _iterator9.n()).done) {
                  _context10.next = 27;
                  break;
                }
                eachPrevEquatableDatum = _step9.value;
                equalityResult = eachDatum.equalsTo(eachPrevEquatableDatum);
                _context10.t1 = equalityResult instanceof _module.KoconutPrimitive;
                if (!_context10.t1) {
                  _context10.next = 19;
                  break;
                }
                _context10.next = 18;
                return equalityResult["yield"]();
              case 18:
                _context10.t1 = _context10.sent;
              case 19:
                _context10.t0 = _context10.t1;
                if (_context10.t0) {
                  _context10.next = 22;
                  break;
                }
                _context10.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;
              case 22:
                if (!_context10.t0) {
                  _context10.next = 25;
                  break;
                }
                isConflict = true;
                return _context10.abrupt("break", 27);
              case 25:
                _context10.next = 11;
                break;
              case 27:
                _context10.next = 32;
                break;
              case 29:
                _context10.prev = 29;
                _context10.t2 = _context10["catch"](9);
                _iterator9.e(_context10.t2);
              case 32:
                _context10.prev = 32;
                _iterator9.f();
                return _context10.finish(32);
              case 35:
                if (!isConflict) processedArray.push(eachDatum);
                _context10.next = 40;
                break;
              case 38:
                processedArray = Array.from(new Set(_this11.data));
                return _context10.abrupt("break", 42);
              case 40:
                _context10.next = 4;
                break;
              case 42:
                _context10.next = 47;
                break;
              case 44:
                _context10.prev = 44;
                _context10.t3 = _context10["catch"](2);
                _iterator8.e(_context10.t3);
              case 47:
                _context10.prev = 47;
                _iterator8.f();
                return _context10.finish(47);
              case 50:
                if (!(_this11.data instanceof Array)) {
                  _context10.next = 54;
                  break;
                }
                return _context10.abrupt("return", processedArray);
              case 54:
                return _context10.abrupt("return", new Set(processedArray));
              case 55:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[2, 44, 47, 50], [9, 29, 32, 35]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "distinctBy",
    value:
    function distinctBy(selector, thisArg) {
      var _this12 = this;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11() {
        var processedArray, keyArray, equatableKeyArray, _iterator10, _step10, eachDatum, eachKey, isConflict, _iterator11, _step11, eachPrevEquatableKey, equalityResult;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                processedArray = new Array();
                keyArray = new Array();
                equatableKeyArray = new Array();
                _iterator10 = _createForOfIteratorHelper(_this12.data);
                _context11.prev = 4;
                _iterator10.s();
              case 6:
                if ((_step10 = _iterator10.n()).done) {
                  _context11.next = 46;
                  break;
                }
                eachDatum = _step10.value;
                _context11.next = 10;
                return selector(eachDatum);
              case 10:
                eachKey = _context11.sent;
                if (!_module.KoconutTypeChecker.checkIsEquatable(eachKey)) {
                  _context11.next = 43;
                  break;
                }
                isConflict = false;
                _iterator11 = _createForOfIteratorHelper(equatableKeyArray);
                _context11.prev = 14;
                _iterator11.s();
              case 16:
                if ((_step11 = _iterator11.n()).done) {
                  _context11.next = 32;
                  break;
                }
                eachPrevEquatableKey = _step11.value;
                equalityResult = eachPrevEquatableKey.equalsTo(eachKey);
                _context11.t1 = equalityResult instanceof _module.KoconutPrimitive;
                if (!_context11.t1) {
                  _context11.next = 24;
                  break;
                }
                _context11.next = 23;
                return equalityResult["yield"]();
              case 23:
                _context11.t1 = _context11.sent;
              case 24:
                _context11.t0 = _context11.t1;
                if (_context11.t0) {
                  _context11.next = 27;
                  break;
                }
                _context11.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;
              case 27:
                if (!_context11.t0) {
                  _context11.next = 30;
                  break;
                }
                isConflict = true;
                return _context11.abrupt("break", 32);
              case 30:
                _context11.next = 16;
                break;
              case 32:
                _context11.next = 37;
                break;
              case 34:
                _context11.prev = 34;
                _context11.t2 = _context11["catch"](14);
                _iterator11.e(_context11.t2);
              case 37:
                _context11.prev = 37;
                _iterator11.f();
                return _context11.finish(37);
              case 40:
                if (!isConflict) {
                  equatableKeyArray.push(eachKey);
                  processedArray.push(eachDatum);
                }
                _context11.next = 44;
                break;
              case 43:
                if (!keyArray.includes(eachKey)) {
                  keyArray.push(eachKey);
                  processedArray.push(eachDatum);
                }
              case 44:
                _context11.next = 6;
                break;
              case 46:
                _context11.next = 51;
                break;
              case 48:
                _context11.prev = 48;
                _context11.t3 = _context11["catch"](4);
                _iterator10.e(_context11.t3);
              case 51:
                _context11.prev = 51;
                _iterator10.f();
                return _context11.finish(51);
              case 54:
                if (!(_this12.data instanceof Array)) {
                  _context11.next = 58;
                  break;
                }
                return _context11.abrupt("return", processedArray);
              case 58:
                return _context11.abrupt("return", new Set(processedArray));
              case 59:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[4, 48, 51, 54], [14, 34, 37, 40]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "drop",
    value:
    function drop(n) {
      var _this13 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(n < 0)) {
                  _context12.next = 2;
                  break;
                }
                throw new _module.KoconutInvalidArgumentException("Given argument ".concat(n, " is invalid, 'n' must be larger than 0."));
              case 2:
                processedArray = new Array();
                processedArray = Array.from(_this13.data).slice(n);
                if (!(_this13.data instanceof Array)) {
                  _context12.next = 8;
                  break;
                }
                return _context12.abrupt("return", processedArray);
              case 8:
                return _context12.abrupt("return", new Set(processedArray));
              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      })));
      return koconutToReturn;
    }

  }, {
    key: "dropLast",
    value:
    function dropLast(n) {
      var _this14 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(n < 0)) {
                  _context13.next = 2;
                  break;
                }
                throw new _module.KoconutInvalidArgumentException("Given argument ".concat(n, " is invalid, 'n' must be larger than 0."));
              case 2:
                processedArray = new Array();
                processedArray = Array.from(_this14.data).slice(0, -n);
                if (!(_this14.data instanceof Array)) {
                  _context13.next = 8;
                  break;
                }
                return _context13.abrupt("return", processedArray);
              case 8:
                return _context13.abrupt("return", new Set(processedArray));
              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      })));
      return koconutToReturn;
    }

  }, {
    key: "dropLastWhile",
    value:
    function dropLastWhile(predicate, thisArg) {
      var _this15 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14() {
        var processedArray, dataArray, indexNumber, eachIndex;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this15.data);
                indexNumber = 0;
                eachIndex = dataArray.length - 1;
              case 4:
                if (!(eachIndex >= 0)) {
                  _context14.next = 13;
                  break;
                }
                _context14.next = 7;
                return predicate(dataArray[eachIndex]);
              case 7:
                if (_context14.sent) {
                  _context14.next = 10;
                  break;
                }
                indexNumber = eachIndex;
                return _context14.abrupt("break", 13);
              case 10:
                eachIndex--;
                _context14.next = 4;
                break;
              case 13:
                processedArray = dataArray.slice(0, indexNumber + 1);
                if (!(_this15.data instanceof Array)) {
                  _context14.next = 18;
                  break;
                }
                return _context14.abrupt("return", processedArray);
              case 18:
                return _context14.abrupt("return", new Set(processedArray));
              case 19:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      })));
      return koconutToReturn;
    }

  }, {
    key: "dropWhile",
    value:
    function dropWhile(predicate, thisArg) {
      var _this16 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15() {
        var processedArray, dataArray, indexNumber, eachIndex;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this16.data);
                indexNumber = dataArray.length;
                _context15.t0 = _regenerator["default"].keys(dataArray);
              case 4:
                if ((_context15.t1 = _context15.t0()).done) {
                  _context15.next = 13;
                  break;
                }
                eachIndex = _context15.t1.value;
                _context15.next = 8;
                return predicate(dataArray[eachIndex]);
              case 8:
                if (_context15.sent) {
                  _context15.next = 11;
                  break;
                }
                indexNumber = parseInt(eachIndex);
                return _context15.abrupt("break", 13);
              case 11:
                _context15.next = 4;
                break;
              case 13:
                processedArray = dataArray.slice(indexNumber);
                if (!(_this16.data instanceof Array)) {
                  _context15.next = 18;
                  break;
                }
                return _context15.abrupt("return", processedArray);
              case 18:
                return _context15.abrupt("return", new Set(processedArray));
              case 19:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filter",
    value:
    function filter(predicate, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "filter", this).call(this, predicate, thisArg));
    }

  }, {
    key: "filterNot",
    value:
    function filterNot(predicate, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "filterNot", this).call(this, predicate, thisArg));
    }

  }, {
    key: "filterTo",
    value:
    function filterTo(destination, predicate, thisArg) {
      var _this17 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16() {
        var filteredCollection;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                filteredCollection = _this17.filter(predicate, thisArg);
                if (!(destination instanceof Array)) {
                  _context16.next = 6;
                  break;
                }
                _context16.next = 4;
                return filteredCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context16.next = 8;
                break;
              case 6:
                _context16.next = 8;
                return filteredCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context16.abrupt("return", _this17.data);
              case 9:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filterNotTo",
    value:
    function filterNotTo(destination, predicate, thisArg) {
      var _this18 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17() {
        var filteredCollection;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                filteredCollection = _this18.filterNot(predicate, thisArg);
                if (!(destination instanceof Array)) {
                  _context17.next = 6;
                  break;
                }
                _context17.next = 4;
                return filteredCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context17.next = 8;
                break;
              case 6:
                _context17.next = 8;
                return filteredCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context17.abrupt("return", _this18.data);
              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filterIndexed",
    value:
    function filterIndexed(predicate, thisArg) {
      var _this19 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18() {
        var processedArray, _iterator12, _step12, _step12$value, eachIndex, eachDatum;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                processedArray = new Array();
                _iterator12 = _createForOfIteratorHelper(Array.from(_this19.data).entries());
                _context18.prev = 2;
                _iterator12.s();
              case 4:
                if ((_step12 = _iterator12.n()).done) {
                  _context18.next = 12;
                  break;
                }
                _step12$value = (0, _slicedToArray2["default"])(_step12.value, 2), eachIndex = _step12$value[0], eachDatum = _step12$value[1];
                _context18.next = 8;
                return predicate(eachIndex, eachDatum);
              case 8:
                if (!_context18.sent) {
                  _context18.next = 10;
                  break;
                }
                processedArray.push(eachDatum);
              case 10:
                _context18.next = 4;
                break;
              case 12:
                _context18.next = 17;
                break;
              case 14:
                _context18.prev = 14;
                _context18.t0 = _context18["catch"](2);
                _iterator12.e(_context18.t0);
              case 17:
                _context18.prev = 17;
                _iterator12.f();
                return _context18.finish(17);
              case 20:
                if (!(_this19.data instanceof Array)) {
                  _context18.next = 24;
                  break;
                }
                return _context18.abrupt("return", processedArray);
              case 24:
                return _context18.abrupt("return", new Set(processedArray));
              case 25:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filterIndexedTo",
    value:
    function filterIndexedTo(destination, predicate, thisArg) {
      var _this20 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19() {
        var filteredCollection;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                filteredCollection = _this20.filterIndexed(predicate, thisArg);
                if (!(destination instanceof Array)) {
                  _context19.next = 6;
                  break;
                }
                _context19.next = 4;
                return filteredCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context19.next = 8;
                break;
              case 6:
                _context19.next = 8;
                return filteredCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context19.abrupt("return", _this20.data);
              case 9:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filterNotNull",
    value:

    function filterNotNull() {
      var _this21 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20() {
        var processedArray, _iterator13, _step13, eachDatum;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                processedArray = new Array();
                _iterator13 = _createForOfIteratorHelper(_this21.data);
                try {
                  for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                    eachDatum = _step13.value;
                    if (eachDatum != null) processedArray.push(eachDatum);
                  }
                } catch (err) {
                  _iterator13.e(err);
                } finally {
                  _iterator13.f();
                }
                if (!(_this21.data instanceof Array)) {
                  _context20.next = 7;
                  break;
                }
                return _context20.abrupt("return", processedArray);
              case 7:
                return _context20.abrupt("return", new Set(processedArray));
              case 8:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      })));
      return koconutToReturn;
    }

  }, {
    key: "filterNotNullTo",
    value:
    function filterNotNullTo(destination) {
      var _this22 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21() {
        var filteredCollection;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                filteredCollection = _this22.filterNotNull();
                if (!(destination instanceof Array)) {
                  _context21.next = 6;
                  break;
                }
                _context21.next = 4;
                return filteredCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context21.next = 8;
                break;
              case 6:
                _context21.next = 8;
                return filteredCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context21.abrupt("return", _this22.data);
              case 9:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      })));
      return koconutToReturn;
    }

  }, {
    key: "sortedBy",
    value:
    function sortedBy(selector, thisArg) {
      var _this23 = this;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee22() {
        var processedArray, dataArray, eachIndex, currentComparable, startIndex, middleIndex, endIndex, targetComparable, isCurrentGreater, eachCompareResult, numberResult;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this23.data);
                _context22.t0 = _regenerator["default"].keys(dataArray);
              case 3:
                if ((_context22.t1 = _context22.t0()).done) {
                  _context22.next = 38;
                  break;
                }
                eachIndex = _context22.t1.value;
                if (!Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
                  _context22.next = 36;
                  break;
                }
                _context22.next = 8;
                return selector(dataArray[eachIndex]);
              case 8:
                currentComparable = _context22.sent;
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;
              case 12:
                if (!(startIndex < endIndex)) {
                  _context22.next = 35;
                  break;
                }
                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context22.next = 16;
                return selector(processedArray[middleIndex]);
              case 16:
                targetComparable = _context22.sent;
                isCurrentGreater = false;
                if (!_module.KoconutTypeChecker.checkIsComparable(currentComparable)) {
                  _context22.next = 31;
                  break;
                }
                eachCompareResult = currentComparable.compareTo(targetComparable);
                numberResult = 0;
                if (!(eachCompareResult instanceof _module.KoconutPrimitive)) {
                  _context22.next = 27;
                  break;
                }
                _context22.next = 24;
                return eachCompareResult["yield"]();
              case 24:
                numberResult = _context22.sent;
                _context22.next = 28;
                break;
              case 27:
                numberResult = eachCompareResult;
              case 28:
                if (numberResult > 0) isCurrentGreater = true;
                _context22.next = 32;
                break;
              case 31:
                isCurrentGreater = targetComparable < currentComparable;
              case 32:
                if (isCurrentGreater) startIndex = middleIndex + 1;else endIndex = middleIndex;
                _context22.next = 12;
                break;
              case 35:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
              case 36:
                _context22.next = 3;
                break;
              case 38:
                if (!(_this23.data instanceof Array)) {
                  _context22.next = 42;
                  break;
                }
                return _context22.abrupt("return", processedArray);
              case 42:
                return _context22.abrupt("return", new Set(processedArray));
              case 43:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      })));
      return koconutToReturn;
    }

  }, {
    key: "sortedByDescending",
    value:
    function sortedByDescending(selector, thisArg) {
      var _this24 = this;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee23() {
        var processedArray, dataArray, eachIndex, currentComparable, startIndex, middleIndex, endIndex, targetComparable, isCurrentLesser, eachCompareResult, numberResult;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this24.data);
                _context23.t0 = _regenerator["default"].keys(dataArray);
              case 3:
                if ((_context23.t1 = _context23.t0()).done) {
                  _context23.next = 38;
                  break;
                }
                eachIndex = _context23.t1.value;
                if (!Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
                  _context23.next = 36;
                  break;
                }
                _context23.next = 8;
                return selector(dataArray[eachIndex]);
              case 8:
                currentComparable = _context23.sent;
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;
              case 12:
                if (!(startIndex < endIndex)) {
                  _context23.next = 35;
                  break;
                }
                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context23.next = 16;
                return selector(processedArray[middleIndex]);
              case 16:
                targetComparable = _context23.sent;
                isCurrentLesser = false;
                if (!_module.KoconutTypeChecker.checkIsComparable(currentComparable)) {
                  _context23.next = 31;
                  break;
                }
                eachCompareResult = currentComparable.compareTo(targetComparable);
                numberResult = 0;
                if (!(eachCompareResult instanceof _module.KoconutPrimitive)) {
                  _context23.next = 27;
                  break;
                }
                _context23.next = 24;
                return eachCompareResult["yield"]();
              case 24:
                numberResult = _context23.sent;
                _context23.next = 28;
                break;
              case 27:
                numberResult = eachCompareResult;
              case 28:
                if (numberResult < 0) isCurrentLesser = true;
                _context23.next = 32;
                break;
              case 31:
                isCurrentLesser = targetComparable > currentComparable;
              case 32:
                if (isCurrentLesser) startIndex = middleIndex + 1;else endIndex = middleIndex;
                _context23.next = 12;
                break;
              case 35:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
              case 36:
                _context23.next = 3;
                break;
              case 38:
                if (!(_this24.data instanceof Array)) {
                  _context23.next = 42;
                  break;
                }
                return _context23.abrupt("return", processedArray);
              case 42:
                return _context23.abrupt("return", new Set(processedArray));
              case 43:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      })));
      return koconutToReturn;
    }

  }, {
    key: "sortedWith",
    value:
    function sortedWith(comparator, thisArg) {
      var _this25 = this;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee24() {
        var processedArray, dataArray, eachIndex, startIndex, middleIndex, endIndex;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this25.data);
                _context24.t0 = _regenerator["default"].keys(dataArray);
              case 3:
                if ((_context24.t1 = _context24.t0()).done) {
                  _context24.next = 24;
                  break;
                }
                eachIndex = _context24.t1.value;
                if (!Object.prototype.hasOwnProperty.call(dataArray, eachIndex)) {
                  _context24.next = 22;
                  break;
                }
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;
              case 9:
                if (!(startIndex < endIndex)) {
                  _context24.next = 21;
                  break;
                }
                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context24.next = 13;
                return comparator(dataArray[eachIndex], processedArray[middleIndex]);
              case 13:
                _context24.t2 = _context24.sent;
                if (!(_context24.t2 >= 0)) {
                  _context24.next = 18;
                  break;
                }
                startIndex = middleIndex + 1;
                _context24.next = 19;
                break;
              case 18:
                endIndex = middleIndex;
              case 19:
                _context24.next = 9;
                break;
              case 21:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
              case 22:
                _context24.next = 3;
                break;
              case 24:
                if (!(_this25.data instanceof Array)) {
                  _context24.next = 28;
                  break;
                }
                return _context24.abrupt("return", processedArray);
              case 28:
                return _context24.abrupt("return", new Set(processedArray));
              case 29:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      })));
      return koconutToReturn;
    }

  }, {
    key: "take",
    value:
    function take(n) {
      var _this26 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee25() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                processedArray = Array.from(_this26.data).slice(0, n);
                if (!(_this26.data instanceof Array)) {
                  _context25.next = 5;
                  break;
                }
                return _context25.abrupt("return", processedArray);
              case 5:
                return _context25.abrupt("return", new Set(processedArray));
              case 6:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      })));
      return koconutToReturn;
    }

  }, {
    key: "takeLast",
    value:
    function takeLast(n) {
      var _this27 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee26() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                processedArray = Array.from(_this27.data).slice(_this27.mSize - n, _this27.mSize);
                if (!(_this27.data instanceof Array)) {
                  _context26.next = 5;
                  break;
                }
                return _context26.abrupt("return", processedArray);
              case 5:
                return _context26.abrupt("return", new Set(processedArray));
              case 6:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      })));
      return koconutToReturn;
    }

  }, {
    key: "takeLastWhile",
    value:
    function takeLastWhile(predicate, thisArg) {
      var _this28 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee27() {
        var processedArray, dataArray, targetIndex;
        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this28.data);
                targetIndex = _this28.mSize - 1;
              case 3:
                if (!(targetIndex >= 0)) {
                  _context27.next = 11;
                  break;
                }
                _context27.next = 6;
                return predicate(dataArray[targetIndex]);
              case 6:
                if (_context27.sent) {
                  _context27.next = 8;
                  break;
                }
                return _context27.abrupt("break", 11);
              case 8:
                targetIndex--;
                _context27.next = 3;
                break;
              case 11:
                processedArray = dataArray.slice(targetIndex + 1, _this28.mSize);
                if (!(_this28.data instanceof Array)) {
                  _context27.next = 16;
                  break;
                }
                return _context27.abrupt("return", processedArray);
              case 16:
                return _context27.abrupt("return", new Set(processedArray));
              case 17:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      })));
      return koconutToReturn;
    }

  }, {
    key: "takeWhile",
    value:
    function takeWhile(predicate, thisArg) {
      var _this29 = this;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee28() {
        var processedArray, predicateIndex, _iterator14, _step14, eachDatum;
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                processedArray = new Array();
                predicateIndex = 0;
                _iterator14 = _createForOfIteratorHelper(_this29.data);
                _context28.prev = 3;
                _iterator14.s();
              case 5:
                if ((_step14 = _iterator14.n()).done) {
                  _context28.next = 14;
                  break;
                }
                eachDatum = _step14.value;
                _context28.next = 9;
                return predicate(eachDatum);
              case 9:
                if (_context28.sent) {
                  _context28.next = 11;
                  break;
                }
                return _context28.abrupt("break", 14);
              case 11:
                predicateIndex++;
              case 12:
                _context28.next = 5;
                break;
              case 14:
                _context28.next = 19;
                break;
              case 16:
                _context28.prev = 16;
                _context28.t0 = _context28["catch"](3);
                _iterator14.e(_context28.t0);
              case 19:
                _context28.prev = 19;
                _iterator14.f();
                return _context28.finish(19);
              case 22:
                processedArray = Array.from(_this29.data).slice(0, predicateIndex);
                if (!(_this29.data instanceof Array)) {
                  _context28.next = 27;
                  break;
                }
                return _context28.abrupt("return", processedArray);
              case 27:
                return _context28.abrupt("return", new Set(processedArray));
              case 28:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "elementAt",
    value:
    function elementAt(index) {
      var _this30 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee29() {
        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                if (!(index < 0 || index >= _this30.mSize)) {
                  _context29.next = 2;
                  break;
                }
                throw new _module.KoconutIndexOutOfBoundsException("Cannot search for data at index of ".concat(index));
              case 2:
                return _context29.abrupt("return", Array.from(_this30.data)[index]);
              case 3:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29);
      })));
      return koconutToReturn;
    }

  }, {
    key: "elementAtOrElse",
    value:
    function elementAtOrElse(index, defaultValue) {
      var _this31 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      defaultValue = defaultValue.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee30() {
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (!(index < 0 || index >= _this31.mSize)) {
                  _context30.next = 6;
                  break;
                }
                _context30.next = 3;
                return defaultValue(index);
              case 3:
                return _context30.abrupt("return", _context30.sent);
              case 6:
                return _context30.abrupt("return", Array.from(_this31.data)[index]);
              case 7:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      })));
      return koconutToReturn;
    }

  }, {
    key: "elementAtOrNull",
    value:
    function elementAtOrNull(index) {
      var _this32 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee31() {
        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (!(index < 0 || index >= _this32.mSize)) {
                  _context31.next = 2;
                  break;
                }
                return _context31.abrupt("return", null);
              case 2:
                return _context31.abrupt("return", Array.from(_this32.data)[index]);
              case 3:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      })));
      return koconutToReturn;
    }

  }, {
    key: "find",
    value:
    function find(predicate) {
      var _this33 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee32() {
        var _iterator15, _step15, eachDatum;
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _iterator15 = _createForOfIteratorHelper(_this33.data);
                _context32.prev = 1;
                _iterator15.s();
              case 3:
                if ((_step15 = _iterator15.n()).done) {
                  _context32.next = 11;
                  break;
                }
                eachDatum = _step15.value;
                _context32.next = 7;
                return predicate(eachDatum);
              case 7:
                if (!_context32.sent) {
                  _context32.next = 9;
                  break;
                }
                return _context32.abrupt("return", eachDatum);
              case 9:
                _context32.next = 3;
                break;
              case 11:
                _context32.next = 16;
                break;
              case 13:
                _context32.prev = 13;
                _context32.t0 = _context32["catch"](1);
                _iterator15.e(_context32.t0);
              case 16:
                _context32.prev = 16;
                _iterator15.f();
                return _context32.finish(16);
              case 19:
                return _context32.abrupt("return", null);
              case 20:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, null, [[1, 13, 16, 19]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "findLast",
    value:
    function findLast(predicate) {
      var _this34 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee33() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                dataArray = Array.from(_this34.data);
                eachIndex = dataArray.length - 1;
              case 2:
                if (!(eachIndex >= 0)) {
                  _context33.next = 10;
                  break;
                }
                _context33.next = 5;
                return predicate(dataArray[eachIndex]);
              case 5:
                if (!_context33.sent) {
                  _context33.next = 7;
                  break;
                }
                return _context33.abrupt("return", dataArray[eachIndex]);
              case 7:
                eachIndex--;
                _context33.next = 2;
                break;
              case 10:
                return _context33.abrupt("return", null);
              case 11:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33);
      })));
      return koconutToReturn;
    }

  }, {
    key: "first",
    value:
    function first() {
      var _this35 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee34() {
        var _iterator16, _step16, eachDatum;
        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (!(_this35.data == null || _this35.mSize == 0)) {
                  _context34.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                if (!predicate) {
                  _context34.next = 23;
                  break;
                }
                _iterator16 = _createForOfIteratorHelper(_this35.data);
                _context34.prev = 4;
                _iterator16.s();
              case 6:
                if ((_step16 = _iterator16.n()).done) {
                  _context34.next = 14;
                  break;
                }
                eachDatum = _step16.value;
                _context34.next = 10;
                return predicate(eachDatum);
              case 10:
                if (!_context34.sent) {
                  _context34.next = 12;
                  break;
                }
                return _context34.abrupt("return", eachDatum);
              case 12:
                _context34.next = 6;
                break;
              case 14:
                _context34.next = 19;
                break;
              case 16:
                _context34.prev = 16;
                _context34.t0 = _context34["catch"](4);
                _iterator16.e(_context34.t0);
              case 19:
                _context34.prev = 19;
                _iterator16.f();
                return _context34.finish(19);
              case 22:
                throw new _module.KoconutNoSuchElementException("No such element is found");
              case 23:
                return _context34.abrupt("return", Array.from(_this35.data)[0]);
              case 24:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "firstOrNull",
    value:
    function firstOrNull() {
      var _this36 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee35() {
        var _iterator17, _step17, eachDatum;
        return _regenerator["default"].wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!(_this36.data == null || _this36.mSize == 0)) {
                  _context35.next = 2;
                  break;
                }
                return _context35.abrupt("return", null);
              case 2:
                if (!predicate) {
                  _context35.next = 23;
                  break;
                }
                _iterator17 = _createForOfIteratorHelper(_this36.data);
                _context35.prev = 4;
                _iterator17.s();
              case 6:
                if ((_step17 = _iterator17.n()).done) {
                  _context35.next = 14;
                  break;
                }
                eachDatum = _step17.value;
                _context35.next = 10;
                return predicate(eachDatum);
              case 10:
                if (!_context35.sent) {
                  _context35.next = 12;
                  break;
                }
                return _context35.abrupt("return", eachDatum);
              case 12:
                _context35.next = 6;
                break;
              case 14:
                _context35.next = 19;
                break;
              case 16:
                _context35.prev = 16;
                _context35.t0 = _context35["catch"](4);
                _iterator17.e(_context35.t0);
              case 19:
                _context35.prev = 19;
                _iterator17.f();
                return _context35.finish(19);
              case 22:
                return _context35.abrupt("return", null);
              case 23:
                return _context35.abrupt("return", Array.from(_this36.data)[0]);
              case 24:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "indexOf",
    value:
    function indexOf(elementToFind) {
      var _this37 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee36() {
        var _iterator18, _step18, _step18$value, index, element, equalityResult;
        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _iterator18 = _createForOfIteratorHelper(Array.from(_this37.data).entries());
                _context36.prev = 1;
                _iterator18.s();
              case 3:
                if ((_step18 = _iterator18.n()).done) {
                  _context36.next = 23;
                  break;
                }
                _step18$value = (0, _slicedToArray2["default"])(_step18.value, 2), index = _step18$value[0], element = _step18$value[1];
                if (!_module.KoconutTypeChecker.checkIsEquatable(element)) {
                  _context36.next = 19;
                  break;
                }
                equalityResult = element.equalsTo(elementToFind);
                _context36.t1 = equalityResult instanceof _module.KoconutPrimitive;
                if (!_context36.t1) {
                  _context36.next = 12;
                  break;
                }
                _context36.next = 11;
                return equalityResult["yield"]();
              case 11:
                _context36.t1 = _context36.sent;
              case 12:
                _context36.t0 = _context36.t1;
                if (_context36.t0) {
                  _context36.next = 15;
                  break;
                }
                _context36.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;
              case 15:
                if (!_context36.t0) {
                  _context36.next = 17;
                  break;
                }
                return _context36.abrupt("return", index);
              case 17:
                _context36.next = 21;
                break;
              case 19:
                if (!(element == elementToFind)) {
                  _context36.next = 21;
                  break;
                }
                return _context36.abrupt("return", index);
              case 21:
                _context36.next = 3;
                break;
              case 23:
                _context36.next = 28;
                break;
              case 25:
                _context36.prev = 25;
                _context36.t2 = _context36["catch"](1);
                _iterator18.e(_context36.t2);
              case 28:
                _context36.prev = 28;
                _iterator18.f();
                return _context36.finish(28);
              case 31:
                return _context36.abrupt("return", -1);
              case 32:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, null, [[1, 25, 28, 31]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "indexOfFirst",
    value:
    function indexOfFirst(predicate) {
      var _this38 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee37() {
        var _iterator19, _step19, _step19$value, index, element;
        return _regenerator["default"].wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                _iterator19 = _createForOfIteratorHelper(Array.from(_this38.data).entries());
                _context37.prev = 1;
                _iterator19.s();
              case 3:
                if ((_step19 = _iterator19.n()).done) {
                  _context37.next = 11;
                  break;
                }
                _step19$value = (0, _slicedToArray2["default"])(_step19.value, 2), index = _step19$value[0], element = _step19$value[1];
                _context37.next = 7;
                return predicate(element);
              case 7:
                if (!_context37.sent) {
                  _context37.next = 9;
                  break;
                }
                return _context37.abrupt("return", index);
              case 9:
                _context37.next = 3;
                break;
              case 11:
                _context37.next = 16;
                break;
              case 13:
                _context37.prev = 13;
                _context37.t0 = _context37["catch"](1);
                _iterator19.e(_context37.t0);
              case 16:
                _context37.prev = 16;
                _iterator19.f();
                return _context37.finish(16);
              case 19:
                return _context37.abrupt("return", -1);
              case 20:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, null, [[1, 13, 16, 19]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "indexOfLast",
    value:
    function indexOfLast(predicate) {
      var _this39 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee38() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                dataArray = Array.from(_this39.data);
                eachIndex = dataArray.length - 1;
              case 2:
                if (!(eachIndex >= 0)) {
                  _context38.next = 10;
                  break;
                }
                _context38.next = 5;
                return predicate(dataArray[eachIndex]);
              case 5:
                if (!_context38.sent) {
                  _context38.next = 7;
                  break;
                }
                return _context38.abrupt("return", eachIndex);
              case 7:
                eachIndex--;
                _context38.next = 2;
                break;
              case 10:
                return _context38.abrupt("return", -1);
              case 11:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associate",
    value:
    function associate(transform) {
      var _this40 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee39() {
        var processedMap, _iterator20, _step20, eachDatum, eachTransformResult, eachPair, eachEntry;
        return _regenerator["default"].wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                processedMap = new Map();
                _iterator20 = _createForOfIteratorHelper(_this40.data);
                _context39.prev = 2;
                _iterator20.s();
              case 4:
                if ((_step20 = _iterator20.n()).done) {
                  _context39.next = 30;
                  break;
                }
                eachDatum = _step20.value;
                _context39.next = 8;
                return transform(eachDatum);
              case 8:
                eachTransformResult = _context39.sent;
                if (!(eachTransformResult instanceof _module.KoconutPair)) {
                  _context39.next = 16;
                  break;
                }
                _context39.next = 12;
                return eachTransformResult["yield"]();
              case 12:
                eachPair = _context39.sent;
                if (eachPair != null) processedMap.set(eachPair.first, eachPair.second);
                _context39.next = 28;
                break;
              case 16:
                if (!(eachTransformResult instanceof _module.Pair)) {
                  _context39.next = 20;
                  break;
                }
                processedMap.set(eachTransformResult.first, eachTransformResult.second);
                _context39.next = 28;
                break;
              case 20:
                if (!(eachTransformResult instanceof _KoconutEntry.KoconutEntry)) {
                  _context39.next = 27;
                  break;
                }
                _context39.next = 23;
                return eachTransformResult["yield"]();
              case 23:
                eachEntry = _context39.sent;
                if (eachEntry != null) processedMap.set(eachEntry.key, eachEntry.value);
                _context39.next = 28;
                break;
              case 27:
                if (eachTransformResult instanceof _module.Entry) processedMap.set(eachTransformResult.key, eachTransformResult.value);else processedMap.set(eachTransformResult[0], eachTransformResult[1]);
              case 28:
                _context39.next = 4;
                break;
              case 30:
                _context39.next = 35;
                break;
              case 32:
                _context39.prev = 32;
                _context39.t0 = _context39["catch"](2);
                _iterator20.e(_context39.t0);
              case 35:
                _context39.prev = 35;
                _iterator20.f();
                return _context39.finish(35);
              case 38:
                return _context39.abrupt("return", processedMap);
              case 39:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, null, [[2, 32, 35, 38]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associateBy",
    value:
    function associateBy(keySelector) {
      var _this41 = this;
      var valueTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var keySelectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var valueTransformThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee40() {
        var processedMap, _iterator21, _step21, eachDatum, eachKey, eachValue;
        return _regenerator["default"].wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                processedMap = new Map();
                _iterator21 = _createForOfIteratorHelper(_this41.data);
                _context40.prev = 2;
                _iterator21.s();
              case 4:
                if ((_step21 = _iterator21.n()).done) {
                  _context40.next = 20;
                  break;
                }
                eachDatum = _step21.value;
                _context40.next = 8;
                return keySelector(eachDatum);
              case 8:
                eachKey = _context40.sent;
                if (!valueTransform) {
                  _context40.next = 15;
                  break;
                }
                _context40.next = 12;
                return valueTransform(eachDatum);
              case 12:
                _context40.t0 = _context40.sent;
                _context40.next = 16;
                break;
              case 15:
                _context40.t0 = eachDatum;
              case 16:
                eachValue = _context40.t0;
                processedMap.set(eachKey, eachValue);
              case 18:
                _context40.next = 4;
                break;
              case 20:
                _context40.next = 25;
                break;
              case 22:
                _context40.prev = 22;
                _context40.t1 = _context40["catch"](2);
                _iterator21.e(_context40.t1);
              case 25:
                _context40.prev = 25;
                _iterator21.f();
                return _context40.finish(25);
              case 28:
                return _context40.abrupt("return", processedMap);
              case 29:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, null, [[2, 22, 25, 28]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associateByTo",
    value:
    function associateByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg) {
      var _this42 = this;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee41() {
        return _regenerator["default"].wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return _this42.associateBy(keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg).forEach(function (eachEntry) {
                  destination.set(eachEntry.key, eachEntry.value);
                }).process();
              case 2:
                return _context41.abrupt("return", _this42.data);
              case 3:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associateTo",
    value:
    function associateTo(destination, transform, thisArg) {
      var _this43 = this;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee42() {
        return _regenerator["default"].wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                _context42.next = 2;
                return _this43.associate(transform, thisArg).forEach(function (eachEntry) {
                  destination.set(eachEntry.key, eachEntry.value);
                }).process();
              case 2:
                return _context42.abrupt("return", _this43.data);
              case 3:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associateWith",
    value:
    function associateWith(valueSelector) {
      var _this44 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      valueSelector = valueSelector.bind(thisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee43() {
        var processedMap, _iterator22, _step22, eachDatum, eachValue;
        return _regenerator["default"].wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                processedMap = new Map();
                _iterator22 = _createForOfIteratorHelper(_this44.data);
                _context43.prev = 2;
                _iterator22.s();
              case 4:
                if ((_step22 = _iterator22.n()).done) {
                  _context43.next = 12;
                  break;
                }
                eachDatum = _step22.value;
                _context43.next = 8;
                return valueSelector(eachDatum);
              case 8:
                eachValue = _context43.sent;
                processedMap.set(eachDatum, eachValue);
              case 10:
                _context43.next = 4;
                break;
              case 12:
                _context43.next = 17;
                break;
              case 14:
                _context43.prev = 14;
                _context43.t0 = _context43["catch"](2);
                _iterator22.e(_context43.t0);
              case 17:
                _context43.prev = 17;
                _iterator22.f();
                return _context43.finish(17);
              case 20:
                return _context43.abrupt("return", processedMap);
              case 21:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "associateWithTo",
    value:
    function associateWithTo(destination, valueSelector, thisArg) {
      var _this45 = this;
      valueSelector = valueSelector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee44() {
        return _regenerator["default"].wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                _context44.next = 2;
                return _this45.associateWith(valueSelector, thisArg).forEach(function (eachEntry) {
                  destination.set(eachEntry.key, eachEntry.value);
                }).process();
              case 2:
                return _context44.abrupt("return", _this45.data);
              case 3:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44);
      })));
      return koconutToReturn;
    }

  }, {
    key: "chunked",
    value: function chunked(size) {
      var _this46 = this;
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee45() {
        var processedArray, currentIndex, dataArray, transformedArray, eachProcessedIndex;
        return _regenerator["default"].wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                if (!(size <= 0)) {
                  _context45.next = 2;
                  break;
                }
                throw new _module.KoconutInvalidArgumentException("Size must be greater than 0. Given size : ".concat(size, "."));
              case 2:
                processedArray = new Array();
                currentIndex = 0;
                dataArray = Array.from(_this46.data);
                while (currentIndex < dataArray.length) {
                  processedArray.push(dataArray.slice(currentIndex, currentIndex + size));
                  currentIndex += size;
                }
                if (!transform) {
                  _context45.next = 20;
                  break;
                }
                transformedArray = new Array();
                _context45.t0 = _regenerator["default"].keys(processedArray);
              case 9:
                if ((_context45.t1 = _context45.t0()).done) {
                  _context45.next = 19;
                  break;
                }
                eachProcessedIndex = _context45.t1.value;
                if (!Object.prototype.hasOwnProperty.call(processedArray, eachProcessedIndex)) {
                  _context45.next = 17;
                  break;
                }
                _context45.t2 = transformedArray;
                _context45.next = 15;
                return transform(processedArray[eachProcessedIndex]);
              case 15:
                _context45.t3 = _context45.sent;
                _context45.t2.push.call(_context45.t2, _context45.t3);
              case 17:
                _context45.next = 9;
                break;
              case 19:
                return _context45.abrupt("return", transformedArray);
              case 20:
                return _context45.abrupt("return", processedArray);
              case 21:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45);
      })));
      return koconutToReturn;
    }

  }, {
    key: "flatMapIndexed",
    value:
    function flatMapIndexed(transform) {
      var _this47 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee46() {
        var processedArray, eachIndex, _iterator23, _step23, eachDatum, _iterator24, _step24, eachSubElement;
        return _regenerator["default"].wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                processedArray = new Array();
                eachIndex = 0;
                _iterator23 = _createForOfIteratorHelper(_this47.data);
                _context46.prev = 3;
                _iterator23.s();
              case 5:
                if ((_step23 = _iterator23.n()).done) {
                  _context46.next = 15;
                  break;
                }
                eachDatum = _step23.value;
                _context46.t0 = _createForOfIteratorHelper;
                _context46.next = 10;
                return transform(eachIndex++, eachDatum);
              case 10:
                _context46.t1 = _context46.sent;
                _iterator24 = (0, _context46.t0)(_context46.t1);
                try {
                  for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                    eachSubElement = _step24.value;
                    processedArray.push(eachSubElement);
                  }
                } catch (err) {
                  _iterator24.e(err);
                } finally {
                  _iterator24.f();
                }
              case 13:
                _context46.next = 5;
                break;
              case 15:
                _context46.next = 20;
                break;
              case 17:
                _context46.prev = 17;
                _context46.t2 = _context46["catch"](3);
                _iterator23.e(_context46.t2);
              case 20:
                _context46.prev = 20;
                _iterator23.f();
                return _context46.finish(20);
              case 23:
                return _context46.abrupt("return", processedArray);
              case 24:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "flatMapTo",
    value:
    function flatMapTo(destination, transform, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "flatMapTo", this).call(this, destination, transform, thisArg));
    }

  }, {
    key: "flatMapIndexedTo",
    value:
    function flatMapIndexedTo(destination, transform, thisArg) {
      var _this48 = this;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee47() {
        var flattenCollection;
        return _regenerator["default"].wrap(function _callee47$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                flattenCollection = _this48.flatMapIndexed(transform, thisArg);
                if (!(destination instanceof Array)) {
                  _context47.next = 6;
                  break;
                }
                _context47.next = 4;
                return flattenCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context47.next = 8;
                break;
              case 6:
                _context47.next = 8;
                return flattenCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context47.abrupt("return", _this48.data);
              case 9:
              case "end":
                return _context47.stop();
            }
          }
        }, _callee47);
      })));
      return koconutToReturn;
    }

  }, {
    key: "groupBy",
    value:
    function groupBy(keySelector) {
      var _this49 = this;
      var valueTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var keySelectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var valueTransformThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee48() {
        var processedMap, _iterator25, _step25, _processedMap$get, eachDatum, eachKey, eachValue;
        return _regenerator["default"].wrap(function _callee48$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                processedMap = new Map();
                _iterator25 = _createForOfIteratorHelper(_this49.data);
                _context48.prev = 2;
                _iterator25.s();
              case 4:
                if ((_step25 = _iterator25.n()).done) {
                  _context48.next = 21;
                  break;
                }
                eachDatum = _step25.value;
                _context48.next = 8;
                return keySelector(eachDatum);
              case 8:
                eachKey = _context48.sent;
                if (!valueTransform) {
                  _context48.next = 15;
                  break;
                }
                _context48.next = 12;
                return valueTransform(eachDatum);
              case 12:
                _context48.t0 = _context48.sent;
                _context48.next = 16;
                break;
              case 15:
                _context48.t0 = eachDatum;
              case 16:
                eachValue = _context48.t0;
                if (!processedMap.has(eachKey)) processedMap.set(eachKey, new Array());
                (_processedMap$get = processedMap.get(eachKey)) === null || _processedMap$get === void 0 ? void 0 : _processedMap$get.push(eachValue);
              case 19:
                _context48.next = 4;
                break;
              case 21:
                _context48.next = 26;
                break;
              case 23:
                _context48.prev = 23;
                _context48.t1 = _context48["catch"](2);
                _iterator25.e(_context48.t1);
              case 26:
                _context48.prev = 26;
                _iterator25.f();
                return _context48.finish(26);
              case 29:
                return _context48.abrupt("return", processedMap);
              case 30:
              case "end":
                return _context48.stop();
            }
          }
        }, _callee48, null, [[2, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "groupByTo",
    value:
    function groupByTo(destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg) {
      var _this50 = this;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee49() {
        var _iterator26, _step26, _destination$get, eachDatum, eachKey, eachValue;
        return _regenerator["default"].wrap(function _callee49$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                _iterator26 = _createForOfIteratorHelper(_this50.data);
                _context49.prev = 1;
                _iterator26.s();
              case 3:
                if ((_step26 = _iterator26.n()).done) {
                  _context49.next = 20;
                  break;
                }
                eachDatum = _step26.value;
                _context49.next = 7;
                return keySelector(eachDatum);
              case 7:
                eachKey = _context49.sent;
                if (!valueTransform) {
                  _context49.next = 14;
                  break;
                }
                _context49.next = 11;
                return valueTransform(eachDatum);
              case 11:
                _context49.t0 = _context49.sent;
                _context49.next = 15;
                break;
              case 14:
                _context49.t0 = eachDatum;
              case 15:
                eachValue = _context49.t0;
                if (!destination.has(eachKey)) destination.set(eachKey, new Array());
                (_destination$get = destination.get(eachKey)) === null || _destination$get === void 0 ? void 0 : _destination$get.push(eachValue);
              case 18:
                _context49.next = 3;
                break;
              case 20:
                _context49.next = 25;
                break;
              case 22:
                _context49.prev = 22;
                _context49.t1 = _context49["catch"](1);
                _iterator26.e(_context49.t1);
              case 25:
                _context49.prev = 25;
                _iterator26.f();
                return _context49.finish(25);
              case 28:
                return _context49.abrupt("return", _this50.data);
              case 29:
              case "end":
                return _context49.stop();
            }
          }
        }, _callee49, null, [[1, 22, 25, 28]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "mapTo",
    value:
    function mapTo(destination, transform, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "mapTo", this).call(this, destination, transform, thisArg));
    }

  }, {
    key: "mapNotNullTo",
    value:
    function mapNotNullTo(destination, transform, thisArg) {
      return KoconutCollection.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutCollection.prototype), "mapNotNullTo", this).call(this, destination, transform, thisArg));
    }

  }, {
    key: "mapIndexed",
    value:
    function mapIndexed(transform) {
      var _this51 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee50() {
        var processedArray, _iterator27, _step27, _step27$value, eachIndex, eachDatum;
        return _regenerator["default"].wrap(function _callee50$(_context50) {
          while (1) {
            switch (_context50.prev = _context50.next) {
              case 0:
                processedArray = new Array();
                _iterator27 = _createForOfIteratorHelper(Array.from(_this51.data).entries());
                _context50.prev = 2;
                _iterator27.s();
              case 4:
                if ((_step27 = _iterator27.n()).done) {
                  _context50.next = 13;
                  break;
                }
                _step27$value = (0, _slicedToArray2["default"])(_step27.value, 2), eachIndex = _step27$value[0], eachDatum = _step27$value[1];
                _context50.t0 = processedArray;
                _context50.next = 9;
                return transform(eachIndex, eachDatum);
              case 9:
                _context50.t1 = _context50.sent;
                _context50.t0.push.call(_context50.t0, _context50.t1);
              case 11:
                _context50.next = 4;
                break;
              case 13:
                _context50.next = 18;
                break;
              case 15:
                _context50.prev = 15;
                _context50.t2 = _context50["catch"](2);
                _iterator27.e(_context50.t2);
              case 18:
                _context50.prev = 18;
                _iterator27.f();
                return _context50.finish(18);
              case 21:
                return _context50.abrupt("return", processedArray);
              case 22:
              case "end":
                return _context50.stop();
            }
          }
        }, _callee50, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "mapIndexedTo",
    value:
    function mapIndexedTo(destination, transform, thisArg) {
      var _this52 = this;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee51() {
        var mappedCollection;
        return _regenerator["default"].wrap(function _callee51$(_context51) {
          while (1) {
            switch (_context51.prev = _context51.next) {
              case 0:
                mappedCollection = _this52.mapIndexed(transform, thisArg);
                if (!(destination instanceof Array)) {
                  _context51.next = 6;
                  break;
                }
                _context51.next = 4;
                return mappedCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context51.next = 8;
                break;
              case 6:
                _context51.next = 8;
                return mappedCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context51.abrupt("return", _this52.data);
              case 9:
              case "end":
                return _context51.stop();
            }
          }
        }, _callee51);
      })));
      return koconutToReturn;
    }

  }, {
    key: "mapIndexedNotNull",
    value:
    function mapIndexedNotNull(transform) {
      var _this53 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee52() {
        var processedArray, _iterator28, _step28, _step28$value, eachIndex, eachDatum, eachResultData;
        return _regenerator["default"].wrap(function _callee52$(_context52) {
          while (1) {
            switch (_context52.prev = _context52.next) {
              case 0:
                processedArray = new Array();
                _iterator28 = _createForOfIteratorHelper(Array.from(_this53.data).entries());
                _context52.prev = 2;
                _iterator28.s();
              case 4:
                if ((_step28 = _iterator28.n()).done) {
                  _context52.next = 12;
                  break;
                }
                _step28$value = (0, _slicedToArray2["default"])(_step28.value, 2), eachIndex = _step28$value[0], eachDatum = _step28$value[1];
                _context52.next = 8;
                return transform(eachIndex, eachDatum);
              case 8:
                eachResultData = _context52.sent;
                if (eachResultData != null && eachResultData != undefined) processedArray.push(eachResultData);
              case 10:
                _context52.next = 4;
                break;
              case 12:
                _context52.next = 17;
                break;
              case 14:
                _context52.prev = 14;
                _context52.t0 = _context52["catch"](2);
                _iterator28.e(_context52.t0);
              case 17:
                _context52.prev = 17;
                _iterator28.f();
                return _context52.finish(17);
              case 20:
                return _context52.abrupt("return", processedArray);
              case 21:
              case "end":
                return _context52.stop();
            }
          }
        }, _callee52, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "mapIndexedNotNullTo",
    value:
    function mapIndexedNotNullTo(destination, transform, thisArg) {
      var _this54 = this;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee53() {
        var mappedCollection;
        return _regenerator["default"].wrap(function _callee53$(_context53) {
          while (1) {
            switch (_context53.prev = _context53.next) {
              case 0:
                mappedCollection = _this54.mapIndexedNotNull(transform, thisArg);
                if (!(destination instanceof Array)) {
                  _context53.next = 6;
                  break;
                }
                _context53.next = 4;
                return mappedCollection.forEach(function (eachElement) {
                  destination.push(eachElement);
                }).process();
              case 4:
                _context53.next = 8;
                break;
              case 6:
                _context53.next = 8;
                return mappedCollection.asSet().forEach(function (eachElement) {
                  destination.add(eachElement);
                }).process();
              case 8:
                return _context53.abrupt("return", _this54.data);
              case 9:
              case "end":
                return _context53.stop();
            }
          }
        }, _callee53);
      })));
      return koconutToReturn;
    }

  }, {
    key: "intersect",
    value:
    function intersect(other) {
      var _this55 = this;
      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee54() {
        var processedSet, otherArray, _iterator29, _step29, eachDatum;
        return _regenerator["default"].wrap(function _callee54$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                processedSet = new Set();
                otherArray = _module.KoconutArray.from(other);
                _iterator29 = _createForOfIteratorHelper(_this55.data);
                _context54.prev = 3;
                _iterator29.s();
              case 5:
                if ((_step29 = _iterator29.n()).done) {
                  _context54.next = 13;
                  break;
                }
                eachDatum = _step29.value;
                _context54.next = 9;
                return otherArray.contains(eachDatum)["yield"]();
              case 9:
                if (!_context54.sent) {
                  _context54.next = 11;
                  break;
                }
                processedSet.add(eachDatum);
              case 11:
                _context54.next = 5;
                break;
              case 13:
                _context54.next = 18;
                break;
              case 15:
                _context54.prev = 15;
                _context54.t0 = _context54["catch"](3);
                _iterator29.e(_context54.t0);
              case 18:
                _context54.prev = 18;
                _iterator29.f();
                return _context54.finish(18);
              case 21:
                return _context54.abrupt("return", processedSet);
              case 22:
              case "end":
                return _context54.stop();
            }
          }
        }, _callee54, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "join",
    value:
    function join() {
      var _this56 = this;
      var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ', ';
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
      var truncated = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '...';
      var transform = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var thisArg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee55() {
        var resultString, currentCount, length, _iterator30, _step30, eachDatum;
        return _regenerator["default"].wrap(function _callee55$(_context55) {
          while (1) {
            switch (_context55.prev = _context55.next) {
              case 0:
                resultString = prefix;
                currentCount = 0;
                length = _this56.mSize;
                _iterator30 = _createForOfIteratorHelper(_this56.data);
                _context55.prev = 4;
                _iterator30.s();
              case 6:
                if ((_step30 = _iterator30.n()).done) {
                  _context55.next = 24;
                  break;
                }
                eachDatum = _step30.value;
                if (!(currentCount == limit)) {
                  _context55.next = 11;
                  break;
                }
                resultString += truncated;
                return _context55.abrupt("break", 24);
              case 11:
                _context55.t0 = resultString;
                if (!transform) {
                  _context55.next = 18;
                  break;
                }
                _context55.next = 15;
                return transform(eachDatum);
              case 15:
                _context55.t1 = _context55.sent;
                _context55.next = 19;
                break;
              case 18:
                _context55.t1 = eachDatum;
              case 19:
                resultString = _context55.t0 += _context55.t1;
                currentCount++;
                if (currentCount != length && currentCount != limit) resultString += separator;
              case 22:
                _context55.next = 6;
                break;
              case 24:
                _context55.next = 29;
                break;
              case 26:
                _context55.prev = 26;
                _context55.t2 = _context55["catch"](4);
                _iterator30.e(_context55.t2);
              case 29:
                _context55.prev = 29;
                _iterator30.f();
                return _context55.finish(29);
              case 32:
                resultString += postfix;
                return _context55.abrupt("return", resultString);
              case 34:
              case "end":
                return _context55.stop();
            }
          }
        }, _callee55, null, [[4, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "last",
    value: function last() {
      var _this57 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee56() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee56$(_context56) {
          while (1) {
            switch (_context56.prev = _context56.next) {
              case 0:
                if (!(_this57.data == null || _this57.mSize == 0)) {
                  _context56.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                dataArray = Array.from(_this57.data);
                if (!predicate) {
                  _context56.next = 14;
                  break;
                }
                eachIndex = dataArray.length;
              case 5:
                if (!(eachIndex >= 0)) {
                  _context56.next = 13;
                  break;
                }
                _context56.next = 8;
                return predicate(dataArray[eachIndex]);
              case 8:
                if (!_context56.sent) {
                  _context56.next = 10;
                  break;
                }
                return _context56.abrupt("return", dataArray[eachIndex]);
              case 10:
                eachIndex--;
                _context56.next = 5;
                break;
              case 13:
                throw new _module.KoconutNoSuchElementException("No such element is found");
              case 14:
                return _context56.abrupt("return", dataArray[dataArray.length - 1]);
              case 15:
              case "end":
                return _context56.stop();
            }
          }
        }, _callee56);
      })));
      return koconutToReturn;
    }
  }, {
    key: "lastIndexOf",
    value: function lastIndexOf(element) {
      var _this58 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee57() {
        var dataArray, eachIndex, eachElement, equalityResult;
        return _regenerator["default"].wrap(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                dataArray = Array.from(_this58.data);
                eachIndex = dataArray.length - 1;
              case 2:
                if (!(eachIndex >= 0)) {
                  _context57.next = 23;
                  break;
                }
                eachElement = dataArray[eachIndex];
                if (!_module.KoconutTypeChecker.checkIsEquatable(eachElement)) {
                  _context57.next = 18;
                  break;
                }
                equalityResult = eachElement.equalsTo(element);
                _context57.t1 = equalityResult instanceof _module.KoconutPrimitive;
                if (!_context57.t1) {
                  _context57.next = 11;
                  break;
                }
                _context57.next = 10;
                return equalityResult["yield"]();
              case 10:
                _context57.t1 = _context57.sent;
              case 11:
                _context57.t0 = _context57.t1;
                if (_context57.t0) {
                  _context57.next = 14;
                  break;
                }
                _context57.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;
              case 14:
                if (!_context57.t0) {
                  _context57.next = 16;
                  break;
                }
                return _context57.abrupt("return", eachIndex);
              case 16:
                _context57.next = 20;
                break;
              case 18:
                if (!(eachElement == element)) {
                  _context57.next = 20;
                  break;
                }
                return _context57.abrupt("return", eachIndex);
              case 20:
                eachIndex--;
                _context57.next = 2;
                break;
              case 23:
                return _context57.abrupt("return", -1);
              case 24:
              case "end":
                return _context57.stop();
            }
          }
        }, _callee57);
      })));
      return koconutToReturn;
    }
  }, {
    key: "lastOrNull",
    value: function lastOrNull() {
      var _this59 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee58() {
        var dataArray, length, eachIndex;
        return _regenerator["default"].wrap(function _callee58$(_context58) {
          while (1) {
            switch (_context58.prev = _context58.next) {
              case 0:
                dataArray = Array.from(_this59.data);
                length = dataArray.length;
                if (!(length == 0)) {
                  _context58.next = 4;
                  break;
                }
                return _context58.abrupt("return", null);
              case 4:
                if (!predicate) {
                  _context58.next = 17;
                  break;
                }
                eachIndex = length - 1;
              case 6:
                if (!(eachIndex >= 0)) {
                  _context58.next = 14;
                  break;
                }
                _context58.next = 9;
                return predicate(dataArray[eachIndex]);
              case 9:
                if (!_context58.sent) {
                  _context58.next = 11;
                  break;
                }
                return _context58.abrupt("return", dataArray[eachIndex]);
              case 11:
                eachIndex--;
                _context58.next = 6;
                break;
              case 14:
                return _context58.abrupt("return", null);
              case 17:
                return _context58.abrupt("return", dataArray[length - 1]);
              case 18:
              case "end":
                return _context58.stop();
            }
          }
        }, _callee58);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minus",
    value: function minus(elements) {
      var _this60 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee59() {
        var processedArray, dataToExcept, koconutDataToExceptArray, _iterator31, _step31, eachDatum;
        return _regenerator["default"].wrap(function _callee59$(_context59) {
          while (1) {
            switch (_context59.prev = _context59.next) {
              case 0:
                processedArray = new Array();
                dataToExcept = new Array();
                if (typeof elements[Symbol.iterator] === 'function') dataToExcept = Array.from(elements);else dataToExcept.push(elements);
                koconutDataToExceptArray = _module.KoconutArray.from(dataToExcept);
                _iterator31 = _createForOfIteratorHelper(_this60.data);
                _context59.prev = 5;
                _iterator31.s();
              case 7:
                if ((_step31 = _iterator31.n()).done) {
                  _context59.next = 15;
                  break;
                }
                eachDatum = _step31.value;
                _context59.next = 11;
                return koconutDataToExceptArray.contains(eachDatum)["yield"]();
              case 11:
                if (_context59.sent) {
                  _context59.next = 13;
                  break;
                }
                processedArray.push(eachDatum);
              case 13:
                _context59.next = 7;
                break;
              case 15:
                _context59.next = 20;
                break;
              case 17:
                _context59.prev = 17;
                _context59.t0 = _context59["catch"](5);
                _iterator31.e(_context59.t0);
              case 20:
                _context59.prev = 20;
                _iterator31.f();
                return _context59.finish(20);
              case 23:
                if (!(_this60.data instanceof Array)) {
                  _context59.next = 27;
                  break;
                }
                return _context59.abrupt("return", processedArray);
              case 27:
                return _context59.abrupt("return", new Set(processedArray));
              case 28:
              case "end":
                return _context59.stop();
            }
          }
        }, _callee59, null, [[5, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minusElement",
    value: function minusElement(element) {
      return this.minus(element);
    }

  }, {
    key: "partition",
    value:
    function partition(predicate) {
      var _this61 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPair();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee60() {
        var processedFirstArray, processedSecondArray, _iterator32, _step32, eachDatum;
        return _regenerator["default"].wrap(function _callee60$(_context60) {
          while (1) {
            switch (_context60.prev = _context60.next) {
              case 0:
                processedFirstArray = new Array();
                processedSecondArray = new Array();
                _iterator32 = _createForOfIteratorHelper(_this61.data);
                _context60.prev = 3;
                _iterator32.s();
              case 5:
                if ((_step32 = _iterator32.n()).done) {
                  _context60.next = 16;
                  break;
                }
                eachDatum = _step32.value;
                _context60.next = 9;
                return predicate(eachDatum);
              case 9:
                if (!_context60.sent) {
                  _context60.next = 13;
                  break;
                }
                processedFirstArray.push(eachDatum);
                _context60.next = 14;
                break;
              case 13:
                processedSecondArray.push(eachDatum);
              case 14:
                _context60.next = 5;
                break;
              case 16:
                _context60.next = 21;
                break;
              case 18:
                _context60.prev = 18;
                _context60.t0 = _context60["catch"](3);
                _iterator32.e(_context60.t0);
              case 21:
                _context60.prev = 21;
                _iterator32.f();
                return _context60.finish(21);
              case 24:
                if (!(_this61.data instanceof Array)) {
                  _context60.next = 28;
                  break;
                }
                return _context60.abrupt("return", new _module.Pair(processedFirstArray, processedSecondArray));
              case 28:
                return _context60.abrupt("return", new _module.Pair(new Set(processedFirstArray), new Set(processedSecondArray)));
              case 29:
              case "end":
                return _context60.stop();
            }
          }
        }, _callee60, null, [[3, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "plus",
    value: function plus(elements) {
      var _this62 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee61() {
        var processedArray, elementsArray, _i, _elementsArray, eachDatum;
        return _regenerator["default"].wrap(function _callee61$(_context61) {
          while (1) {
            switch (_context61.prev = _context61.next) {
              case 0:
                processedArray = Array.from(_this62.data);
                if (typeof elements[Symbol.iterator] === 'function') {
                  elementsArray = Array.from(elements);
                  for (_i = 0, _elementsArray = elementsArray; _i < _elementsArray.length; _i++) {
                    eachDatum = _elementsArray[_i];
                    processedArray.push(eachDatum);
                  }
                } else processedArray.push(elements);
                if (!(_this62.data instanceof Array)) {
                  _context61.next = 6;
                  break;
                }
                return _context61.abrupt("return", processedArray);
              case 6:
                return _context61.abrupt("return", new Set(processedArray));
              case 7:
              case "end":
                return _context61.stop();
            }
          }
        }, _callee61);
      })));
      return koconutToReturn;
    }
  }, {
    key: "plusElement",
    value: function plusElement(element) {
      return this.plus(element);
    }
  }, {
    key: "random",
    value: function random() {
      var _this63 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee62() {
        var dataArray;
        return _regenerator["default"].wrap(function _callee62$(_context62) {
          while (1) {
            switch (_context62.prev = _context62.next) {
              case 0:
                if (!(_this63.data == null || _this63.mSize == 0)) {
                  _context62.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                dataArray = Array.from(_this63.data);
                return _context62.abrupt("return", dataArray[Math.floor(Math.random() * dataArray.length)]);
              case 4:
              case "end":
                return _context62.stop();
            }
          }
        }, _callee62);
      })));
      return koconutToReturn;
    }
  }, {
    key: "randomOrNull",
    value: function randomOrNull() {
      var _this64 = this;
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee63() {
        var dataArray;
        return _regenerator["default"].wrap(function _callee63$(_context63) {
          while (1) {
            switch (_context63.prev = _context63.next) {
              case 0:
                if (!(_this64.data == null || _this64.mSize == 0)) {
                  _context63.next = 2;
                  break;
                }
                return _context63.abrupt("return", null);
              case 2:
                dataArray = Array.from(_this64.data);
                return _context63.abrupt("return", dataArray[Math.floor(Math.random() * dataArray.length)]);
              case 4:
              case "end":
                return _context63.stop();
            }
          }
        }, _callee63);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduce",
    value: function reduce(operation) {
      var _this65 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee64() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee64$(_context64) {
          while (1) {
            switch (_context64.prev = _context64.next) {
              case 0:
                if (!(_this65.data == null || _this65.mSize == 0)) {
                  _context64.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                dataArray = Array.from(_this65.data);
                acc = dataArray[0];
                eachIndex = 1;
              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context64.next = 12;
                  break;
                }
                _context64.next = 8;
                return operation(acc, dataArray[eachIndex]);
              case 8:
                acc = _context64.sent;
              case 9:
                eachIndex++;
                _context64.next = 5;
                break;
              case 12:
                return _context64.abrupt("return", acc);
              case 13:
              case "end":
                return _context64.stop();
            }
          }
        }, _callee64);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceIndexed",
    value: function reduceIndexed(operation) {
      var _this66 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee65() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee65$(_context65) {
          while (1) {
            switch (_context65.prev = _context65.next) {
              case 0:
                if (!(_this66.data == null || _this66.mSize == 0)) {
                  _context65.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                dataArray = Array.from(_this66.data);
                acc = dataArray[0];
                eachIndex = 1;
              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context65.next = 12;
                  break;
                }
                _context65.next = 8;
                return operation(eachIndex, acc, dataArray[eachIndex]);
              case 8:
                acc = _context65.sent;
              case 9:
                eachIndex++;
                _context65.next = 5;
                break;
              case 12:
                return _context65.abrupt("return", acc);
              case 13:
              case "end":
                return _context65.stop();
            }
          }
        }, _callee65);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceIndexedOrNull",
    value: function reduceIndexedOrNull(operation) {
      var _this67 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee66() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee66$(_context66) {
          while (1) {
            switch (_context66.prev = _context66.next) {
              case 0:
                if (!(_this67.data == null || _this67.mSize == 0)) {
                  _context66.next = 2;
                  break;
                }
                return _context66.abrupt("return", null);
              case 2:
                dataArray = Array.from(_this67.data);
                acc = dataArray[0];
                eachIndex = 1;
              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context66.next = 12;
                  break;
                }
                _context66.next = 8;
                return operation(eachIndex, acc, dataArray[eachIndex]);
              case 8:
                acc = _context66.sent;
              case 9:
                eachIndex++;
                _context66.next = 5;
                break;
              case 12:
                return _context66.abrupt("return", acc);
              case 13:
              case "end":
                return _context66.stop();
            }
          }
        }, _callee66);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceOrNull",
    value: function reduceOrNull(operation) {
      var _this68 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee67() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee67$(_context67) {
          while (1) {
            switch (_context67.prev = _context67.next) {
              case 0:
                if (!(_this68.data == null || _this68.mSize == 0)) {
                  _context67.next = 2;
                  break;
                }
                return _context67.abrupt("return", null);
              case 2:
                dataArray = Array.from(_this68.data);
                acc = dataArray[0];
                eachIndex = 1;
              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context67.next = 12;
                  break;
                }
                _context67.next = 8;
                return operation(acc, dataArray[eachIndex]);
              case 8:
                acc = _context67.sent;
              case 9:
                eachIndex++;
                _context67.next = 5;
                break;
              case 12:
                return _context67.abrupt("return", acc);
              case 13:
              case "end":
                return _context67.stop();
            }
          }
        }, _callee67);
      })));
      return koconutToReturn;
    }

  }, {
    key: "reversed",
    value:
    function reversed() {
      var _this69 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee68() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee68$(_context68) {
          while (1) {
            switch (_context68.prev = _context68.next) {
              case 0:
                processedArray = Array.from(_this69.data).reverse();
                if (!(_this69.data instanceof Array)) {
                  _context68.next = 5;
                  break;
                }
                return _context68.abrupt("return", processedArray);
              case 5:
                return _context68.abrupt("return", new Set(processedArray));
              case 6:
              case "end":
                return _context68.stop();
            }
          }
        }, _callee68);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningFold",
    value: function runningFold(initial, operation) {
      var _this70 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee69() {
        var processedArray, _iterator33, _step33, eachDatum;
        return _regenerator["default"].wrap(function _callee69$(_context69) {
          while (1) {
            switch (_context69.prev = _context69.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);
                _iterator33 = _createForOfIteratorHelper(_this70.data);
                _context69.prev = 3;
                _iterator33.s();
              case 5:
                if ((_step33 = _iterator33.n()).done) {
                  _context69.next = 13;
                  break;
                }
                eachDatum = _step33.value;
                _context69.next = 9;
                return operation(initial, eachDatum);
              case 9:
                initial = _context69.sent;
                processedArray.push(initial);
              case 11:
                _context69.next = 5;
                break;
              case 13:
                _context69.next = 18;
                break;
              case 15:
                _context69.prev = 15;
                _context69.t0 = _context69["catch"](3);
                _iterator33.e(_context69.t0);
              case 18:
                _context69.prev = 18;
                _iterator33.f();
                return _context69.finish(18);
              case 21:
                return _context69.abrupt("return", processedArray);
              case 22:
              case "end":
                return _context69.stop();
            }
          }
        }, _callee69, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningFoldIndexed",
    value: function runningFoldIndexed(initial, operation) {
      var _this71 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee70() {
        var processedArray, _iterator34, _step34, _step34$value, eachIndex, eachDatum;
        return _regenerator["default"].wrap(function _callee70$(_context70) {
          while (1) {
            switch (_context70.prev = _context70.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);
                _iterator34 = _createForOfIteratorHelper(Array.from(_this71.data).entries());
                _context70.prev = 3;
                _iterator34.s();
              case 5:
                if ((_step34 = _iterator34.n()).done) {
                  _context70.next = 13;
                  break;
                }
                _step34$value = (0, _slicedToArray2["default"])(_step34.value, 2), eachIndex = _step34$value[0], eachDatum = _step34$value[1];
                _context70.next = 9;
                return operation(eachIndex, initial, eachDatum);
              case 9:
                initial = _context70.sent;
                processedArray.push(initial);
              case 11:
                _context70.next = 5;
                break;
              case 13:
                _context70.next = 18;
                break;
              case 15:
                _context70.prev = 15;
                _context70.t0 = _context70["catch"](3);
                _iterator34.e(_context70.t0);
              case 18:
                _context70.prev = 18;
                _iterator34.f();
                return _context70.finish(18);
              case 21:
                return _context70.abrupt("return", processedArray);
              case 22:
              case "end":
                return _context70.stop();
            }
          }
        }, _callee70, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningReduce",
    value: function runningReduce(operation) {
      var _this72 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee71() {
        var processedArray, dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee71$(_context71) {
          while (1) {
            switch (_context71.prev = _context71.next) {
              case 0:
                if (!(_this72.data == null || _this72.mSize == 0)) {
                  _context71.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                processedArray = new Array();
                dataArray = Array.from(_this72.data);
                acc = dataArray[0];
                processedArray.push(acc);
                eachIndex = 1;
              case 7:
                if (!(eachIndex < dataArray.length)) {
                  _context71.next = 15;
                  break;
                }
                _context71.next = 10;
                return operation(acc, dataArray[eachIndex]);
              case 10:
                acc = _context71.sent;
                processedArray.push(acc);
              case 12:
                eachIndex++;
                _context71.next = 7;
                break;
              case 15:
                return _context71.abrupt("return", processedArray);
              case 16:
              case "end":
                return _context71.stop();
            }
          }
        }, _callee71);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningReduceIndexed",
    value: function runningReduceIndexed(operation) {
      var _this73 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee72() {
        var processedArray, dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee72$(_context72) {
          while (1) {
            switch (_context72.prev = _context72.next) {
              case 0:
                if (!(_this73.data == null || _this73.mSize == 0)) {
                  _context72.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                processedArray = new Array();
                dataArray = Array.from(_this73.data);
                acc = dataArray[0];
                processedArray.push(acc);
                eachIndex = 1;
              case 7:
                if (!(eachIndex < dataArray.length)) {
                  _context72.next = 15;
                  break;
                }
                _context72.next = 10;
                return operation(eachIndex, acc, dataArray[eachIndex]);
              case 10:
                acc = _context72.sent;
                processedArray.push(acc);
              case 12:
                eachIndex++;
                _context72.next = 7;
                break;
              case 15:
                return _context72.abrupt("return", processedArray);
              case 16:
              case "end":
                return _context72.stop();
            }
          }
        }, _callee72);
      })));
      return koconutToReturn;
    }
  }, {
    key: "scan",
    value: function scan(initial, operation) {
      var _this74 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee73() {
        var processedArray, _iterator35, _step35, eachDatum;
        return _regenerator["default"].wrap(function _callee73$(_context73) {
          while (1) {
            switch (_context73.prev = _context73.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);
                _iterator35 = _createForOfIteratorHelper(_this74.data);
                _context73.prev = 3;
                _iterator35.s();
              case 5:
                if ((_step35 = _iterator35.n()).done) {
                  _context73.next = 13;
                  break;
                }
                eachDatum = _step35.value;
                _context73.next = 9;
                return operation(initial, eachDatum);
              case 9:
                initial = _context73.sent;
                processedArray.push(initial);
              case 11:
                _context73.next = 5;
                break;
              case 13:
                _context73.next = 18;
                break;
              case 15:
                _context73.prev = 15;
                _context73.t0 = _context73["catch"](3);
                _iterator35.e(_context73.t0);
              case 18:
                _context73.prev = 18;
                _iterator35.f();
                return _context73.finish(18);
              case 21:
                return _context73.abrupt("return", processedArray);
              case 22:
              case "end":
                return _context73.stop();
            }
          }
        }, _callee73, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "scanIndexed",
    value: function scanIndexed(initial, operation) {
      var _this75 = this;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee74() {
        var processedArray, _iterator36, _step36, _step36$value, eachIndex, eachDatum;
        return _regenerator["default"].wrap(function _callee74$(_context74) {
          while (1) {
            switch (_context74.prev = _context74.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);
                _iterator36 = _createForOfIteratorHelper(Array.from(_this75.data).entries());
                _context74.prev = 3;
                _iterator36.s();
              case 5:
                if ((_step36 = _iterator36.n()).done) {
                  _context74.next = 13;
                  break;
                }
                _step36$value = (0, _slicedToArray2["default"])(_step36.value, 2), eachIndex = _step36$value[0], eachDatum = _step36$value[1];
                _context74.next = 9;
                return operation(eachIndex, initial, eachDatum);
              case 9:
                initial = _context74.sent;
                processedArray.push(initial);
              case 11:
                _context74.next = 5;
                break;
              case 13:
                _context74.next = 18;
                break;
              case 15:
                _context74.prev = 15;
                _context74.t0 = _context74["catch"](3);
                _iterator36.e(_context74.t0);
              case 18:
                _context74.prev = 18;
                _iterator36.f();
                return _context74.finish(18);
              case 21:
                return _context74.abrupt("return", processedArray);
              case 22:
              case "end":
                return _context74.stop();
            }
          }
        }, _callee74, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "shuffled",
    value: function shuffled() {
      var _this76 = this;
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee75() {
        var processedArray, dataArray, indexes;
        return _regenerator["default"].wrap(function _callee75$(_context75) {
          while (1) {
            switch (_context75.prev = _context75.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this76.data);
                indexes = Object.keys(dataArray).map(function (eachIndex) {
                  return parseInt(eachIndex);
                });
                while (indexes.length > 0) {
                  processedArray.push(dataArray[indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]]);
                }
                if (!(_this76.data instanceof Array)) {
                  _context75.next = 8;
                  break;
                }
                return _context75.abrupt("return", processedArray);
              case 8:
                return _context75.abrupt("return", new Set(processedArray));
              case 9:
              case "end":
                return _context75.stop();
            }
          }
        }, _callee75);
      })));
      return koconutToReturn;
    }
  }, {
    key: "single",
    value: function single() {
      var _this77 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee76() {
        var dataToReturn, _iterator37, _step37, eachDatum;
        return _regenerator["default"].wrap(function _callee76$(_context76) {
          while (1) {
            switch (_context76.prev = _context76.next) {
              case 0:
                if (!(_this77.data == null || _this77.mSize == 0)) {
                  _context76.next = 2;
                  break;
                }
                throw new _module.KoconutNoSuchElementException("Source data is null or empty");
              case 2:
                if (!predicate) {
                  _context76.next = 34;
                  break;
                }
                dataToReturn = null;
                _iterator37 = _createForOfIteratorHelper(_this77.data);
                _context76.prev = 5;
                _iterator37.s();
              case 7:
                if ((_step37 = _iterator37.n()).done) {
                  _context76.next = 19;
                  break;
                }
                eachDatum = _step37.value;
                _context76.next = 11;
                return predicate(eachDatum);
              case 11:
                if (!_context76.sent) {
                  _context76.next = 17;
                  break;
                }
                if (!(dataToReturn == null)) {
                  _context76.next = 16;
                  break;
                }
                dataToReturn = eachDatum;
                _context76.next = 17;
                break;
              case 16:
                throw new _module.KoconutConflictException('There are more than 2 elements maching the given predicate');
              case 17:
                _context76.next = 7;
                break;
              case 19:
                _context76.next = 24;
                break;
              case 21:
                _context76.prev = 21;
                _context76.t0 = _context76["catch"](5);
                _iterator37.e(_context76.t0);
              case 24:
                _context76.prev = 24;
                _iterator37.f();
                return _context76.finish(24);
              case 27:
                if (!(dataToReturn == null)) {
                  _context76.next = 31;
                  break;
                }
                throw new _module.KoconutNoSuchElementException('No element exists matching the given predicate');
              case 31:
                return _context76.abrupt("return", dataToReturn);
              case 32:
                _context76.next = 35;
                break;
              case 34:
                return _context76.abrupt("return", Array.from(_this77.data)[0]);
              case 35:
              case "end":
                return _context76.stop();
            }
          }
        }, _callee76, null, [[5, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "singleOrNull",
    value: function singleOrNull() {
      var _this78 = this;
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee77() {
        var dataToReturn, _iterator38, _step38, eachDatum;
        return _regenerator["default"].wrap(function _callee77$(_context77) {
          while (1) {
            switch (_context77.prev = _context77.next) {
              case 0:
                if (!(_this78.data == null || Array.from(_this78.data).length == 0)) {
                  _context77.next = 2;
                  break;
                }
                return _context77.abrupt("return", null);
              case 2:
                if (!predicate) {
                  _context77.next = 30;
                  break;
                }
                dataToReturn = null;
                _iterator38 = _createForOfIteratorHelper(_this78.data);
                _context77.prev = 5;
                _iterator38.s();
              case 7:
                if ((_step38 = _iterator38.n()).done) {
                  _context77.next = 19;
                  break;
                }
                eachDatum = _step38.value;
                _context77.next = 11;
                return predicate(eachDatum);
              case 11:
                if (!_context77.sent) {
                  _context77.next = 17;
                  break;
                }
                if (!(dataToReturn == null)) {
                  _context77.next = 16;
                  break;
                }
                dataToReturn = eachDatum;
                _context77.next = 17;
                break;
              case 16:
                return _context77.abrupt("return", null);
              case 17:
                _context77.next = 7;
                break;
              case 19:
                _context77.next = 24;
                break;
              case 21:
                _context77.prev = 21;
                _context77.t0 = _context77["catch"](5);
                _iterator38.e(_context77.t0);
              case 24:
                _context77.prev = 24;
                _iterator38.f();
                return _context77.finish(24);
              case 27:
                return _context77.abrupt("return", dataToReturn);
              case 30:
                return _context77.abrupt("return", Array.from(_this78.data)[0]);
              case 31:
              case "end":
                return _context77.stop();
            }
          }
        }, _callee77, null, [[5, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "subtract",
    value: function subtract(other) {
      var _this79 = this;
      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee78() {
        var processedSet, koconutDataToExceptArray, _iterator39, _step39, eachDatum;
        return _regenerator["default"].wrap(function _callee78$(_context78) {
          while (1) {
            switch (_context78.prev = _context78.next) {
              case 0:
                processedSet = new Set();
                koconutDataToExceptArray = _module.KoconutArray.from(other);
                _iterator39 = _createForOfIteratorHelper(_this79.data);
                _context78.prev = 3;
                _iterator39.s();
              case 5:
                if ((_step39 = _iterator39.n()).done) {
                  _context78.next = 13;
                  break;
                }
                eachDatum = _step39.value;
                _context78.next = 9;
                return koconutDataToExceptArray.contains(eachDatum)["yield"]();
              case 9:
                if (_context78.sent) {
                  _context78.next = 11;
                  break;
                }
                processedSet.add(eachDatum);
              case 11:
                _context78.next = 5;
                break;
              case 13:
                _context78.next = 18;
                break;
              case 15:
                _context78.prev = 15;
                _context78.t0 = _context78["catch"](3);
                _iterator39.e(_context78.t0);
              case 18:
                _context78.prev = 18;
                _iterator39.f();
                return _context78.finish(18);
              case 21:
                return _context78.abrupt("return", processedSet);
              case 22:
              case "end":
                return _context78.stop();
            }
          }
        }, _callee78, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "sumBy",
    value: function sumBy(selector) {
      var _this80 = this;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee79() {
        var sum, _iterator40, _step40, eachDatum;
        return _regenerator["default"].wrap(function _callee79$(_context79) {
          while (1) {
            switch (_context79.prev = _context79.next) {
              case 0:
                sum = 0;
                _iterator40 = _createForOfIteratorHelper(_this80.data);
                _context79.prev = 2;
                _iterator40.s();
              case 4:
                if ((_step40 = _iterator40.n()).done) {
                  _context79.next = 12;
                  break;
                }
                eachDatum = _step40.value;
                _context79.t0 = sum;
                _context79.next = 9;
                return selector(eachDatum);
              case 9:
                sum = _context79.t0 += _context79.sent;
              case 10:
                _context79.next = 4;
                break;
              case 12:
                _context79.next = 17;
                break;
              case 14:
                _context79.prev = 14;
                _context79.t1 = _context79["catch"](2);
                _iterator40.e(_context79.t1);
              case 17:
                _context79.prev = 17;
                _iterator40.f();
                return _context79.finish(17);
              case 20:
                return _context79.abrupt("return", sum);
              case 21:
              case "end":
                return _context79.stop();
            }
          }
        }, _callee79, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }

  }, {
    key: "union",
    value:

    function union(other) {
      var _this81 = this;
      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee80() {
        var processedSet, _iterator41, _step41, eachDatum;
        return _regenerator["default"].wrap(function _callee80$(_context80) {
          while (1) {
            switch (_context80.prev = _context80.next) {
              case 0:
                processedSet = new Set(_this81.data);
                _iterator41 = _createForOfIteratorHelper(other);
                try {
                  for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
                    eachDatum = _step41.value;
                    processedSet.add(eachDatum);
                  }
                } catch (err) {
                  _iterator41.e(err);
                } finally {
                  _iterator41.f();
                }
                _context80.next = 5;
                return _module.KoconutSet.from(processedSet).distinct()["yield"]();
              case 5:
                return _context80.abrupt("return", _context80.sent);
              case 6:
              case "end":
                return _context80.stop();
            }
          }
        }, _callee80);
      })));
      return koconutToReturn;
    }

  }, {
    key: "windowed",
    value: function windowed(size) {
      var _this82 = this;
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var partialWindows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var transform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var thisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      if (size < 0) size = -size;
      if (step < 0) step = -step;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee81() {
        var processedArray, currentIndex, dataArray, eachChunkedData, transformedArray, _iterator42, _step42, eachProcessedDatum;
        return _regenerator["default"].wrap(function _callee81$(_context81) {
          while (1) {
            switch (_context81.prev = _context81.next) {
              case 0:
                processedArray = new Array();
                currentIndex = 0;
                dataArray = Array.from(_this82.data);
                while (currentIndex < dataArray.length) {
                  eachChunkedData = dataArray.slice(currentIndex, currentIndex + size);
                  currentIndex += step;
                  if (partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData);
                }
                if (!transform) {
                  _context81.next = 27;
                  break;
                }
                transformedArray = new Array();
                _iterator42 = _createForOfIteratorHelper(processedArray);
                _context81.prev = 7;
                _iterator42.s();
              case 9:
                if ((_step42 = _iterator42.n()).done) {
                  _context81.next = 18;
                  break;
                }
                eachProcessedDatum = _step42.value;
                _context81.t0 = transformedArray;
                _context81.next = 14;
                return transform(eachProcessedDatum);
              case 14:
                _context81.t1 = _context81.sent;
                _context81.t0.push.call(_context81.t0, _context81.t1);
              case 16:
                _context81.next = 9;
                break;
              case 18:
                _context81.next = 23;
                break;
              case 20:
                _context81.prev = 20;
                _context81.t2 = _context81["catch"](7);
                _iterator42.e(_context81.t2);
              case 23:
                _context81.prev = 23;
                _iterator42.f();
                return _context81.finish(23);
              case 26:
                return _context81.abrupt("return", transformedArray);
              case 27:
                return _context81.abrupt("return", processedArray);
              case 28:
              case "end":
                return _context81.stop();
            }
          }
        }, _callee81, null, [[7, 20, 23, 26]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "withIndex",
    value: function withIndex() {
      var _this83 = this;
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee82() {
        var processedArray, _iterator43, _step43, _step43$value, index, element;
        return _regenerator["default"].wrap(function _callee82$(_context82) {
          while (1) {
            switch (_context82.prev = _context82.next) {
              case 0:
                processedArray = new Array();
                _iterator43 = _createForOfIteratorHelper(Array.from(_this83.data).entries());
                try {
                  for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
                    _step43$value = (0, _slicedToArray2["default"])(_step43.value, 2), index = _step43$value[0], element = _step43$value[1];
                    processedArray.push(new _module.Entry(index, element));
                  }
                } catch (err) {
                  _iterator43.e(err);
                } finally {
                  _iterator43.f();
                }
                return _context82.abrupt("return", processedArray);
              case 4:
              case "end":
                return _context82.stop();
            }
          }
        }, _callee82);
      })));
      return koconutToReturn;
    }
  }, {
    key: "zip",
    value: function zip(other) {
      var _this84 = this;
      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee83() {
        var processedArray, dataArray, otherArray, minLength, eachIndex, transformedArray, _iterator44, _step44, eachProcessedData;
        return _regenerator["default"].wrap(function _callee83$(_context83) {
          while (1) {
            switch (_context83.prev = _context83.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this84.data);
                otherArray = Array.from(other);
                minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length;
                for (eachIndex = 0; eachIndex < minLength; eachIndex++) {
                  processedArray.push(new _module.Pair(dataArray[eachIndex], otherArray[eachIndex]));
                }
                if (!transform) {
                  _context83.next = 28;
                  break;
                }
                transformedArray = new Array();
                _iterator44 = _createForOfIteratorHelper(processedArray);
                _context83.prev = 8;
                _iterator44.s();
              case 10:
                if ((_step44 = _iterator44.n()).done) {
                  _context83.next = 19;
                  break;
                }
                eachProcessedData = _step44.value;
                _context83.t0 = transformedArray;
                _context83.next = 15;
                return transform(eachProcessedData.first, eachProcessedData.second);
              case 15:
                _context83.t1 = _context83.sent;
                _context83.t0.push.call(_context83.t0, _context83.t1);
              case 17:
                _context83.next = 10;
                break;
              case 19:
                _context83.next = 24;
                break;
              case 21:
                _context83.prev = 21;
                _context83.t2 = _context83["catch"](8);
                _iterator44.e(_context83.t2);
              case 24:
                _context83.prev = 24;
                _iterator44.f();
                return _context83.finish(24);
              case 27:
                return _context83.abrupt("return", transformedArray);
              case 28:
                return _context83.abrupt("return", processedArray);
              case 29:
              case "end":
                return _context83.stop();
            }
          }
        }, _callee83, null, [[8, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "zipWithNext",
    value: function zipWithNext() {
      var _this85 = this;
      var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (transform) transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee84() {
        var processedArray, dataArray, eachIndex, transformedArray, _iterator45, _step45, eachProcessedDatum;
        return _regenerator["default"].wrap(function _callee84$(_context84) {
          while (1) {
            switch (_context84.prev = _context84.next) {
              case 0:
                processedArray = new Array();
                dataArray = Array.from(_this85.data);
                if (dataArray.length >= 2) {
                  for (eachIndex = 0; eachIndex < dataArray.length - 1; eachIndex++) {
                    processedArray.push(new _module.Pair(dataArray[eachIndex], dataArray[eachIndex + 1]));
                  }
                }
                if (!transform) {
                  _context84.next = 26;
                  break;
                }
                transformedArray = new Array();
                _iterator45 = _createForOfIteratorHelper(processedArray);
                _context84.prev = 6;
                _iterator45.s();
              case 8:
                if ((_step45 = _iterator45.n()).done) {
                  _context84.next = 17;
                  break;
                }
                eachProcessedDatum = _step45.value;
                _context84.t0 = transformedArray;
                _context84.next = 13;
                return transform(eachProcessedDatum.first, eachProcessedDatum.second);
              case 13:
                _context84.t1 = _context84.sent;
                _context84.t0.push.call(_context84.t0, _context84.t1);
              case 15:
                _context84.next = 8;
                break;
              case 17:
                _context84.next = 22;
                break;
              case 19:
                _context84.prev = 19;
                _context84.t2 = _context84["catch"](6);
                _iterator45.e(_context84.t2);
              case 22:
                _context84.prev = 22;
                _iterator45.f();
                return _context84.finish(22);
              case 25:
                return _context84.abrupt("return", transformedArray);
              case 26:
                return _context84.abrupt("return", processedArray);
              case 27:
              case "end":
                return _context84.stop();
            }
          }
        }, _callee84, null, [[6, 19, 22, 25]]);
      })));
      return koconutToReturn;
    }
  }], [{
    key: "fromIterable",
    value: function fromIterable(iterable) {
      var koconutToReturn = new KoconutCollection(iterable['data']);
      koconutToReturn.processor = iterable['processor'];
      koconutToReturn.prevYieldable = iterable['prevYieldable'];
      return koconutToReturn;
    }

  }]);
  return KoconutCollection;
}(_module.KoconutIterable);
exports.KoconutCollection = KoconutCollection;