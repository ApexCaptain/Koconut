"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutMap = void 0;

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

var KoconutMap = function (_KoconutIterable) {
  (0, _inherits2["default"])(KoconutMap, _KoconutIterable);

  var _super = _createSuper(KoconutMap);

  function KoconutMap() {
    var _this;

    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, KoconutMap);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mKeys", new Set());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mValues", new Array());
    var mapObject = new Map();

    if (map != null) {
      var _iterator = _createForOfIteratorHelper(map),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var eachEntry = _step.value;
          if (eachEntry instanceof _module.Entry) mapObject.set(eachEntry.key, eachEntry.value);else if (eachEntry instanceof _module.Pair) mapObject.set(eachEntry.first, eachEntry.second);else mapObject.set(eachEntry[0], eachEntry[1]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    _this.data = mapObject;
    return _this;
  }

  (0, _createClass2["default"])(KoconutMap, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data) {
        var _iterator2, _step2, _step2$value, _key, _value, _this$data, isConflict, _iterator3, _step3, eachPrevEquatableKey, equalityResult;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(data != null)) {
                  _context.next = 53;
                  break;
                }

                this.combinedDataWrapper = new Set();
                _iterator2 = _createForOfIteratorHelper(data.entries());
                _context.prev = 3;

                _iterator2.s();

              case 5:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 44;
                  break;
                }

                _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), _key = _step2$value[0], _value = _step2$value[1];

                if (!_module.KoconutTypeChecker.checkIsEquatable(_key)) {
                  _context.next = 39;
                  break;
                }

                isConflict = false;
                _iterator3 = _createForOfIteratorHelper(this.mKeys);
                _context.prev = 10;

                _iterator3.s();

              case 12:
                if ((_step3 = _iterator3.n()).done) {
                  _context.next = 28;
                  break;
                }

                eachPrevEquatableKey = _step3.value;
                equalityResult = _key.equalsTo(eachPrevEquatableKey);
                _context.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context.t1) {
                  _context.next = 20;
                  break;
                }

                _context.next = 19;
                return equalityResult["yield"]();

              case 19:
                _context.t1 = _context.sent;

              case 20:
                _context.t0 = _context.t1;

                if (_context.t0) {
                  _context.next = 23;
                  break;
                }

                _context.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 23:
                if (!_context.t0) {
                  _context.next = 26;
                  break;
                }

                isConflict = true;
                return _context.abrupt("break", 28);

              case 26:
                _context.next = 12;
                break;

              case 28:
                _context.next = 33;
                break;

              case 30:
                _context.prev = 30;
                _context.t2 = _context["catch"](10);

                _iterator3.e(_context.t2);

              case 33:
                _context.prev = 33;

                _iterator3.f();

                return _context.finish(33);

              case 36:
                if (!isConflict) {
                  this.mKeys.add(_key);
                  this.combinedDataWrapper.add(new _module.Entry(_key, _value));
                  this.mValues.push(_value);
                } else (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data["delete"](_key);

                _context.next = 42;
                break;

              case 39:
                this.mKeys.add(_key);
                this.combinedDataWrapper.add(new _module.Entry(_key, _value));
                this.mValues.push(_value);

              case 42:
                _context.next = 5;
                break;

              case 44:
                _context.next = 49;
                break;

              case 46:
                _context.prev = 46;
                _context.t3 = _context["catch"](3);

                _iterator2.e(_context.t3);

              case 49:
                _context.prev = 49;

                _iterator2.f();

                return _context.finish(49);

              case 52:
                this.mSize = data.size;

              case 53:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 46, 49, 52], [10, 30, 33, 36]]);
      }));

      function validate(_x) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "retrieve", this).call(this);

              case 2:
                return _context2.abrupt("return", this);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function retrieve() {
        return _retrieve.apply(this, arguments);
      }

      return retrieve;
    }()
  }, {
    key: "entries",
    get: function get() {
      var _this2 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _this2.combinedDataWrapper);

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
    key: "keys",
    get: function get() {
      var _this3 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _this3.mKeys);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      return koconutToReturn;
    }
  }, {
    key: "size",
    get: function get() {
      var _this4 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this4.mSize);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      return koconutToReturn;
    }
  }, {
    key: "values",
    get: function get() {
      var _this5 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", _this5.mValues);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxBy",
    value: function maxBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxBy", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "maxByOrNull",
    value: function maxByOrNull(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxByOrNull", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "maxWith",
    value: function maxWith(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxWith", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "maxWithOrNull",
    value: function maxWithOrNull(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxWithOrNull", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "minBy",
    value: function minBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "minBy", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "minByOrNull",
    value: function minByOrNull(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "minByOrNull", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "minWith",
    value: function minWith(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "minWith", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "minWithOrNull",
    value: function minWithOrNull(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "minWithOrNull", this).call(this, selector, thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "contains",
    value: function contains(key) {
      var _this6 = this;

      var koconutToReturn = new _module.KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
        var _iterator4, _step4, eachKey, equalityResult;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper(_this6.mKeys);
                _context7.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context7.next = 23;
                  break;
                }

                eachKey = _step4.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachKey)) {
                  _context7.next = 19;
                  break;
                }

                equalityResult = eachKey.equalsTo(key);
                _context7.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context7.t1) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 11;
                return equalityResult["yield"]();

              case 11:
                _context7.t1 = _context7.sent;

              case 12:
                _context7.t0 = _context7.t1;

                if (_context7.t0) {
                  _context7.next = 15;
                  break;
                }

                _context7.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 15:
                if (!_context7.t0) {
                  _context7.next = 17;
                  break;
                }

                return _context7.abrupt("return", true);

              case 17:
                _context7.next = 21;
                break;

              case 19:
                if (!(eachKey == key)) {
                  _context7.next = 21;
                  break;
                }

                return _context7.abrupt("return", true);

              case 21:
                _context7.next = 3;
                break;

              case 23:
                _context7.next = 28;
                break;

              case 25:
                _context7.prev = 25;
                _context7.t2 = _context7["catch"](1);

                _iterator4.e(_context7.t2);

              case 28:
                _context7.prev = 28;

                _iterator4.f();

                return _context7.finish(28);

              case 31:
                return _context7.abrupt("return", false);

              case 32:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 25, 28, 31]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "containsKey",
    value: function containsKey(key) {
      return this.contains(key);
    }
  }, {
    key: "containsValue",
    value: function containsValue(value) {
      var _this7 = this;

      var koconutToReturn = new _module.KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
        var _iterator5, _step5, eachValue, equalityResult;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _iterator5 = _createForOfIteratorHelper(_this7.mValues);
                _context8.prev = 1;

                _iterator5.s();

              case 3:
                if ((_step5 = _iterator5.n()).done) {
                  _context8.next = 23;
                  break;
                }

                eachValue = _step5.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachValue)) {
                  _context8.next = 19;
                  break;
                }

                equalityResult = eachValue.equalsTo(value);
                _context8.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context8.t1) {
                  _context8.next = 12;
                  break;
                }

                _context8.next = 11;
                return equalityResult["yield"]();

              case 11:
                _context8.t1 = _context8.sent;

              case 12:
                _context8.t0 = _context8.t1;

                if (_context8.t0) {
                  _context8.next = 15;
                  break;
                }

                _context8.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 15:
                if (!_context8.t0) {
                  _context8.next = 17;
                  break;
                }

                return _context8.abrupt("return", true);

              case 17:
                _context8.next = 21;
                break;

              case 19:
                if (!(eachValue == value)) {
                  _context8.next = 21;
                  break;
                }

                return _context8.abrupt("return", true);

              case 21:
                _context8.next = 3;
                break;

              case 23:
                _context8.next = 28;
                break;

              case 25:
                _context8.prev = 25;
                _context8.t2 = _context8["catch"](1);

                _iterator5.e(_context8.t2);

              case 28:
                _context8.prev = 28;

                _iterator5.f();

                return _context8.finish(28);

              case 31:
                return _context8.abrupt("return", false);

              case 32:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 25, 28, 31]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "onEach",
    value: function onEach(action) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "onEach", this).call(this, action, thisArg));
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "filter", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterNot",
    value: function filterNot(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "filterNot", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterTo",
    value: function filterTo(destination, predicate) {
      var _this8 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9() {
        var _iterator6, _step6, eachEntry;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(_this8.combinedDataWrapper != null)) {
                  _context9.next = 20;
                  break;
                }

                _iterator6 = _createForOfIteratorHelper(_this8.combinedDataWrapper);
                _context9.prev = 2;

                _iterator6.s();

              case 4:
                if ((_step6 = _iterator6.n()).done) {
                  _context9.next = 12;
                  break;
                }

                eachEntry = _step6.value;
                _context9.next = 8;
                return predicate(eachEntry);

              case 8:
                if (!_context9.sent) {
                  _context9.next = 10;
                  break;
                }

                destination.set(eachEntry.key, eachEntry.value);

              case 10:
                _context9.next = 4;
                break;

              case 12:
                _context9.next = 17;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](2);

                _iterator6.e(_context9.t0);

              case 17:
                _context9.prev = 17;

                _iterator6.f();

                return _context9.finish(17);

              case 20:
                return _context9.abrupt("return", _this8.data);

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterNotTo",
    value: function filterNotTo(destination, predicate) {
      var _this9 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10() {
        var _iterator7, _step7, eachEntry;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(_this9.combinedDataWrapper != null)) {
                  _context10.next = 20;
                  break;
                }

                _iterator7 = _createForOfIteratorHelper(_this9.combinedDataWrapper);
                _context10.prev = 2;

                _iterator7.s();

              case 4:
                if ((_step7 = _iterator7.n()).done) {
                  _context10.next = 12;
                  break;
                }

                eachEntry = _step7.value;
                _context10.next = 8;
                return predicate(eachEntry);

              case 8:
                if (_context10.sent) {
                  _context10.next = 10;
                  break;
                }

                destination.set(eachEntry.key, eachEntry.value);

              case 10:
                _context10.next = 4;
                break;

              case 12:
                _context10.next = 17;
                break;

              case 14:
                _context10.prev = 14;
                _context10.t0 = _context10["catch"](2);

                _iterator7.e(_context10.t0);

              case 17:
                _context10.prev = 17;

                _iterator7.f();

                return _context10.finish(17);

              case 20:
                return _context10.abrupt("return", _this9.data);

              case 21:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterKeys",
    value: function filterKeys(predicate) {
      var _this10 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11() {
        var processedMap, _iterator8, _step8, eachEntry;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                processedMap = new Map();

                if (!(_this10.combinedDataWrapper != null)) {
                  _context11.next = 21;
                  break;
                }

                _iterator8 = _createForOfIteratorHelper(_this10.combinedDataWrapper);
                _context11.prev = 3;

                _iterator8.s();

              case 5:
                if ((_step8 = _iterator8.n()).done) {
                  _context11.next = 13;
                  break;
                }

                eachEntry = _step8.value;
                _context11.next = 9;
                return predicate(eachEntry.key);

              case 9:
                if (!_context11.sent) {
                  _context11.next = 11;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 11:
                _context11.next = 5;
                break;

              case 13:
                _context11.next = 18;
                break;

              case 15:
                _context11.prev = 15;
                _context11.t0 = _context11["catch"](3);

                _iterator8.e(_context11.t0);

              case 18:
                _context11.prev = 18;

                _iterator8.f();

                return _context11.finish(18);

              case 21:
                return _context11.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterValues",
    value: function filterValues(predicate) {
      var _this11 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12() {
        var processedMap, _iterator9, _step9, eachEntry;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                processedMap = new Map();

                if (!(_this11.combinedDataWrapper != null)) {
                  _context12.next = 21;
                  break;
                }

                _iterator9 = _createForOfIteratorHelper(_this11.combinedDataWrapper);
                _context12.prev = 3;

                _iterator9.s();

              case 5:
                if ((_step9 = _iterator9.n()).done) {
                  _context12.next = 13;
                  break;
                }

                eachEntry = _step9.value;
                _context12.next = 9;
                return predicate(eachEntry.value);

              case 9:
                if (!_context12.sent) {
                  _context12.next = 11;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 11:
                _context12.next = 5;
                break;

              case 13:
                _context12.next = 18;
                break;

              case 15:
                _context12.prev = 15;
                _context12.t0 = _context12["catch"](3);

                _iterator9.e(_context12.t0);

              case 18:
                _context12.prev = 18;

                _iterator9.f();

                return _context12.finish(18);

              case 21:
                return _context12.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minus",
    value: function minus() {
      var _this12 = this;

      for (var _len = arguments.length, keys = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13() {
        var processedMap, koconutKeysToExceptArray, _iterator10, _step10, eachEntry;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                processedMap = new Map();

                if (!(_this12.combinedDataWrapper != null)) {
                  _context13.next = 22;
                  break;
                }

                koconutKeysToExceptArray = _module.KoconutArray.from(keys);
                _iterator10 = _createForOfIteratorHelper(_this12.combinedDataWrapper);
                _context13.prev = 4;

                _iterator10.s();

              case 6:
                if ((_step10 = _iterator10.n()).done) {
                  _context13.next = 14;
                  break;
                }

                eachEntry = _step10.value;
                _context13.next = 10;
                return koconutKeysToExceptArray.contains(eachEntry.key)["yield"]();

              case 10:
                if (_context13.sent) {
                  _context13.next = 12;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 12:
                _context13.next = 6;
                break;

              case 14:
                _context13.next = 19;
                break;

              case 16:
                _context13.prev = 16;
                _context13.t0 = _context13["catch"](4);

                _iterator10.e(_context13.t0);

              case 19:
                _context13.prev = 19;

                _iterator10.f();

                return _context13.finish(19);

              case 22:
                return _context13.abrupt("return", processedMap);

              case 23:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "plus",
    value: function plus() {
      var _this13 = this;

      for (var _len2 = arguments.length, entries = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        entries[_key3] = arguments[_key3];
      }

      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14() {
        var processedMap, _iterator11, _step11, eachElement, eachPair, eachEntry;

        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                processedMap = _this13.data == null ? new Map() : new Map(_this13.data);
                _iterator11 = _createForOfIteratorHelper(entries);
                _context14.prev = 2;

                _iterator11.s();

              case 4:
                if ((_step11 = _iterator11.n()).done) {
                  _context14.next = 31;
                  break;
                }

                eachElement = _step11.value;

                if (!(eachElement instanceof _module.Pair)) {
                  _context14.next = 10;
                  break;
                }

                processedMap.set(eachElement.first, eachElement.second);
                _context14.next = 29;
                break;

              case 10:
                if (!(eachElement instanceof _module.KoconutPair)) {
                  _context14.next = 17;
                  break;
                }

                _context14.next = 13;
                return eachElement["yield"]();

              case 13:
                eachPair = _context14.sent;
                if (eachPair != null) processedMap.set(eachPair.first, eachPair.second);
                _context14.next = 29;
                break;

              case 17:
                if (!(eachElement instanceof _module.Entry)) {
                  _context14.next = 21;
                  break;
                }

                processedMap.set(eachElement.key, eachElement.value);
                _context14.next = 29;
                break;

              case 21:
                if (!(eachElement instanceof _module.KoconutEntry)) {
                  _context14.next = 28;
                  break;
                }

                _context14.next = 24;
                return eachElement["yield"]();

              case 24:
                eachEntry = _context14.sent;
                if (eachEntry != null) processedMap.set(eachEntry.key, eachEntry.value);
                _context14.next = 29;
                break;

              case 28:
                processedMap.set(eachElement[0], eachElement[1]);

              case 29:
                _context14.next = 4;
                break;

              case 31:
                _context14.next = 36;
                break;

              case 33:
                _context14.prev = 33;
                _context14.t0 = _context14["catch"](2);

                _iterator11.e(_context14.t0);

              case 36:
                _context14.prev = 36;

                _iterator11.f();

                return _context14.finish(36);

              case 39:
                return _context14.abrupt("return", processedMap);

              case 40:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[2, 33, 36, 39]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this14 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15() {
        var _iterator12, _step12, eachEntry, equalityResult;

        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(_this14.combinedDataWrapper != null)) {
                  _context15.next = 32;
                  break;
                }

                _iterator12 = _createForOfIteratorHelper(_this14.combinedDataWrapper);
                _context15.prev = 2;

                _iterator12.s();

              case 4:
                if ((_step12 = _iterator12.n()).done) {
                  _context15.next = 24;
                  break;
                }

                eachEntry = _step12.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                  _context15.next = 20;
                  break;
                }

                equalityResult = eachEntry.key.equalsTo(key);
                _context15.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context15.t1) {
                  _context15.next = 13;
                  break;
                }

                _context15.next = 12;
                return equalityResult["yield"]();

              case 12:
                _context15.t1 = _context15.sent;

              case 13:
                _context15.t0 = _context15.t1;

                if (_context15.t0) {
                  _context15.next = 16;
                  break;
                }

                _context15.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 16:
                if (!_context15.t0) {
                  _context15.next = 18;
                  break;
                }

                return _context15.abrupt("return", eachEntry.value);

              case 18:
                _context15.next = 22;
                break;

              case 20:
                if (!(eachEntry.key == key)) {
                  _context15.next = 22;
                  break;
                }

                return _context15.abrupt("return", eachEntry.value);

              case 22:
                _context15.next = 4;
                break;

              case 24:
                _context15.next = 29;
                break;

              case 26:
                _context15.prev = 26;
                _context15.t2 = _context15["catch"](2);

                _iterator12.e(_context15.t2);

              case 29:
                _context15.prev = 29;

                _iterator12.f();

                return _context15.finish(29);

              case 32:
                return _context15.abrupt("return", null);

              case 33:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[2, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getOrDefault",
    value: function getOrDefault(key, defaultValue) {
      var _this15 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16() {
        var _iterator13, _step13, eachEntry, equalityResult;

        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(_this15.combinedDataWrapper != null)) {
                  _context16.next = 32;
                  break;
                }

                _iterator13 = _createForOfIteratorHelper(_this15.combinedDataWrapper);
                _context16.prev = 2;

                _iterator13.s();

              case 4:
                if ((_step13 = _iterator13.n()).done) {
                  _context16.next = 24;
                  break;
                }

                eachEntry = _step13.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                  _context16.next = 20;
                  break;
                }

                equalityResult = eachEntry.key.equalsTo(key);
                _context16.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context16.t1) {
                  _context16.next = 13;
                  break;
                }

                _context16.next = 12;
                return equalityResult["yield"]();

              case 12:
                _context16.t1 = _context16.sent;

              case 13:
                _context16.t0 = _context16.t1;

                if (_context16.t0) {
                  _context16.next = 16;
                  break;
                }

                _context16.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 16:
                if (!_context16.t0) {
                  _context16.next = 18;
                  break;
                }

                return _context16.abrupt("return", eachEntry.value);

              case 18:
                _context16.next = 22;
                break;

              case 20:
                if (!(eachEntry.key == key)) {
                  _context16.next = 22;
                  break;
                }

                return _context16.abrupt("return", eachEntry.value);

              case 22:
                _context16.next = 4;
                break;

              case 24:
                _context16.next = 29;
                break;

              case 26:
                _context16.prev = 26;
                _context16.t2 = _context16["catch"](2);

                _iterator13.e(_context16.t2);

              case 29:
                _context16.prev = 29;

                _iterator13.f();

                return _context16.finish(29);

              case 32:
                return _context16.abrupt("return", defaultValue);

              case 33:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[2, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getOrElse",
    value: function getOrElse(key, defaultValue) {
      var _this16 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17() {
        var _iterator14, _step14, eachEntry, equalityResult;

        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(_this16.combinedDataWrapper != null)) {
                  _context17.next = 32;
                  break;
                }

                _iterator14 = _createForOfIteratorHelper(_this16.combinedDataWrapper);
                _context17.prev = 2;

                _iterator14.s();

              case 4:
                if ((_step14 = _iterator14.n()).done) {
                  _context17.next = 24;
                  break;
                }

                eachEntry = _step14.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                  _context17.next = 20;
                  break;
                }

                equalityResult = eachEntry.key.equalsTo(key);
                _context17.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context17.t1) {
                  _context17.next = 13;
                  break;
                }

                _context17.next = 12;
                return equalityResult["yield"]();

              case 12:
                _context17.t1 = _context17.sent;

              case 13:
                _context17.t0 = _context17.t1;

                if (_context17.t0) {
                  _context17.next = 16;
                  break;
                }

                _context17.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 16:
                if (!_context17.t0) {
                  _context17.next = 18;
                  break;
                }

                return _context17.abrupt("return", eachEntry.value);

              case 18:
                _context17.next = 22;
                break;

              case 20:
                if (!(eachEntry.key == key)) {
                  _context17.next = 22;
                  break;
                }

                return _context17.abrupt("return", eachEntry.value);

              case 22:
                _context17.next = 4;
                break;

              case 24:
                _context17.next = 29;
                break;

              case 26:
                _context17.prev = 26;
                _context17.t2 = _context17["catch"](2);

                _iterator14.e(_context17.t2);

              case 29:
                _context17.prev = 29;

                _iterator14.f();

                return _context17.finish(29);

              case 32:
                _context17.next = 34;
                return defaultValue();

              case 34:
                return _context17.abrupt("return", _context17.sent);

              case 35:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[2, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getValue",
    value: function getValue(key) {
      var _this17 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18() {
        var _iterator15, _step15, eachEntry, equalityResult;

        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!(_this17.combinedDataWrapper != null)) {
                  _context18.next = 32;
                  break;
                }

                _iterator15 = _createForOfIteratorHelper(_this17.combinedDataWrapper);
                _context18.prev = 2;

                _iterator15.s();

              case 4:
                if ((_step15 = _iterator15.n()).done) {
                  _context18.next = 24;
                  break;
                }

                eachEntry = _step15.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key)) {
                  _context18.next = 20;
                  break;
                }

                equalityResult = eachEntry.key.equalsTo(key);
                _context18.t1 = equalityResult instanceof _module.KoconutPrimitive;

                if (!_context18.t1) {
                  _context18.next = 13;
                  break;
                }

                _context18.next = 12;
                return equalityResult["yield"]();

              case 12:
                _context18.t1 = _context18.sent;

              case 13:
                _context18.t0 = _context18.t1;

                if (_context18.t0) {
                  _context18.next = 16;
                  break;
                }

                _context18.t0 = !(equalityResult instanceof _module.KoconutPrimitive) && equalityResult;

              case 16:
                if (!_context18.t0) {
                  _context18.next = 18;
                  break;
                }

                return _context18.abrupt("return", eachEntry.value);

              case 18:
                _context18.next = 22;
                break;

              case 20:
                if (!(eachEntry.key == key)) {
                  _context18.next = 22;
                  break;
                }

                return _context18.abrupt("return", eachEntry.value);

              case 22:
                _context18.next = 4;
                break;

              case 24:
                _context18.next = 29;
                break;

              case 26:
                _context18.prev = 26;
                _context18.t2 = _context18["catch"](2);

                _iterator15.e(_context18.t2);

              case 29:
                _context18.prev = 29;

                _iterator15.f();

                return _context18.finish(29);

              case 32:
                throw new _module.KoconutNoSuchElementException("No such element mathces given key ".concat(key, " is found"));

              case 33:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[2, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "flatMapTo",
    value: function flatMapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "flatMapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapTo",
    value: function mapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "mapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapNotNullTo",
    value: function mapNotNullTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutMap.fromIterable((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "mapNotNullTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapKeys",
    value: function mapKeys(transform) {
      var _this18 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19() {
        var processedMap, _iterator16, _step16, eachEntry;

        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                processedMap = new Map();

                if (!(_this18.combinedDataWrapper != null)) {
                  _context19.next = 23;
                  break;
                }

                _iterator16 = _createForOfIteratorHelper(_this18.combinedDataWrapper);
                _context19.prev = 3;

                _iterator16.s();

              case 5:
                if ((_step16 = _iterator16.n()).done) {
                  _context19.next = 15;
                  break;
                }

                eachEntry = _step16.value;
                _context19.t0 = processedMap;
                _context19.next = 10;
                return transform(eachEntry);

              case 10:
                _context19.t1 = _context19.sent;
                _context19.t2 = eachEntry.value;

                _context19.t0.set.call(_context19.t0, _context19.t1, _context19.t2);

              case 13:
                _context19.next = 5;
                break;

              case 15:
                _context19.next = 20;
                break;

              case 17:
                _context19.prev = 17;
                _context19.t3 = _context19["catch"](3);

                _iterator16.e(_context19.t3);

              case 20:
                _context19.prev = 20;

                _iterator16.f();

                return _context19.finish(20);

              case 23:
                return _context19.abrupt("return", processedMap);

              case 24:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapKeysTo",
    value: function mapKeysTo(destination, transform) {
      var _this19 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20() {
        var _iterator17, _step17, eachEntry;

        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (!(_this19.combinedDataWrapper != null)) {
                  _context20.next = 22;
                  break;
                }

                _iterator17 = _createForOfIteratorHelper(_this19.combinedDataWrapper);
                _context20.prev = 2;

                _iterator17.s();

              case 4:
                if ((_step17 = _iterator17.n()).done) {
                  _context20.next = 14;
                  break;
                }

                eachEntry = _step17.value;
                _context20.t0 = destination;
                _context20.next = 9;
                return transform(eachEntry);

              case 9:
                _context20.t1 = _context20.sent;
                _context20.t2 = eachEntry.value;

                _context20.t0.set.call(_context20.t0, _context20.t1, _context20.t2);

              case 12:
                _context20.next = 4;
                break;

              case 14:
                _context20.next = 19;
                break;

              case 16:
                _context20.prev = 16;
                _context20.t3 = _context20["catch"](2);

                _iterator17.e(_context20.t3);

              case 19:
                _context20.prev = 19;

                _iterator17.f();

                return _context20.finish(19);

              case 22:
                return _context20.abrupt("return", _this19.data);

              case 23:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapVaues",
    value: function mapVaues(transform) {
      var _this20 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21() {
        var processedMap, _iterator18, _step18, eachEntry;

        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                processedMap = new Map();

                if (!(_this20.combinedDataWrapper != null)) {
                  _context21.next = 23;
                  break;
                }

                _iterator18 = _createForOfIteratorHelper(_this20.combinedDataWrapper);
                _context21.prev = 3;

                _iterator18.s();

              case 5:
                if ((_step18 = _iterator18.n()).done) {
                  _context21.next = 15;
                  break;
                }

                eachEntry = _step18.value;
                _context21.t0 = processedMap;
                _context21.t1 = eachEntry.key;
                _context21.next = 11;
                return transform(eachEntry);

              case 11:
                _context21.t2 = _context21.sent;

                _context21.t0.set.call(_context21.t0, _context21.t1, _context21.t2);

              case 13:
                _context21.next = 5;
                break;

              case 15:
                _context21.next = 20;
                break;

              case 17:
                _context21.prev = 17;
                _context21.t3 = _context21["catch"](3);

                _iterator18.e(_context21.t3);

              case 20:
                _context21.prev = 20;

                _iterator18.f();

                return _context21.finish(20);

              case 23:
                return _context21.abrupt("return", processedMap);

              case 24:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapValuesTo",
    value: function mapValuesTo(destination, transform) {
      var _this21 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee22() {
        var _iterator19, _step19, eachEntry;

        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!(_this21.combinedDataWrapper != null)) {
                  _context22.next = 22;
                  break;
                }

                _iterator19 = _createForOfIteratorHelper(_this21.combinedDataWrapper);
                _context22.prev = 2;

                _iterator19.s();

              case 4:
                if ((_step19 = _iterator19.n()).done) {
                  _context22.next = 14;
                  break;
                }

                eachEntry = _step19.value;
                _context22.t0 = destination;
                _context22.t1 = eachEntry.key;
                _context22.next = 10;
                return transform(eachEntry);

              case 10:
                _context22.t2 = _context22.sent;

                _context22.t0.set.call(_context22.t0, _context22.t1, _context22.t2);

              case 12:
                _context22.next = 4;
                break;

              case 14:
                _context22.next = 19;
                break;

              case 16:
                _context22.prev = 16;
                _context22.t3 = _context22["catch"](2);

                _iterator19.e(_context22.t3);

              case 19:
                _context22.prev = 19;

                _iterator19.f();

                return _context22.finish(19);

              case 22:
                return _context22.abrupt("return", _this21.data);

              case 23:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }], [{
    key: "fromIterable",
    value: function fromIterable(iterable) {
      var koconutToReturn = new KoconutMap(iterable['data']);
      koconutToReturn.processor = iterable['processor'];
      koconutToReturn.prevYieldable = iterable['prevYieldable'];
      return koconutToReturn;
    }
  }, {
    key: "from",
    value: function from() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new KoconutMap(source);
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len3 = arguments.length, data = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        data[_key4] = arguments[_key4];
      }

      return new KoconutMap(data);
    }
  }, {
    key: "generate",
    value: function generate(count, generator) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (count < 0) throw new _module.KoconutInvalidArgumentException("Count must be larger than 0. Given value : ".concat(count));
      generator = generator.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee23() {
        var processedMap, eachIndex, generatedValue, eachPair, eachEntry;
        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                processedMap = new Map();
                eachIndex = 0;

              case 2:
                if (!(eachIndex < count)) {
                  _context23.next = 32;
                  break;
                }

                _context23.next = 5;
                return generator(eachIndex);

              case 5:
                generatedValue = _context23.sent;

                if (!(generatedValue instanceof _module.Pair)) {
                  _context23.next = 10;
                  break;
                }

                processedMap.set(generatedValue.first, generatedValue.second);
                _context23.next = 29;
                break;

              case 10:
                if (!(generatedValue instanceof _module.KoconutPair)) {
                  _context23.next = 17;
                  break;
                }

                _context23.next = 13;
                return generatedValue["yield"]();

              case 13:
                eachPair = _context23.sent;
                processedMap.set(eachPair.first, eachPair.second);
                _context23.next = 29;
                break;

              case 17:
                if (!(generatedValue instanceof _module.Entry)) {
                  _context23.next = 21;
                  break;
                }

                processedMap.set(generatedValue.key, generatedValue.value);
                _context23.next = 29;
                break;

              case 21:
                if (!(generatedValue instanceof _module.KoconutEntry)) {
                  _context23.next = 28;
                  break;
                }

                _context23.next = 24;
                return generatedValue["yield"]();

              case 24:
                eachEntry = _context23.sent;
                processedMap.set(eachEntry.key, eachEntry.value);
                _context23.next = 29;
                break;

              case 28:
                processedMap.set(generatedValue[0], generatedValue[1]);

              case 29:
                eachIndex++;
                _context23.next = 2;
                break;

              case 32:
                return _context23.abrupt("return", processedMap);

              case 33:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      })));
      return koconutToReturn;
    }
  }]);
  return KoconutMap;
}(_module.KoconutIterable);

exports.KoconutMap = KoconutMap;