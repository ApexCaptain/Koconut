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

var _module = require("../../../module.internal");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

var KoconutMap = /*#__PURE__*/function (_KoconutIterable) {
  (0, _inherits2["default"])(KoconutMap, _KoconutIterable);

  var _super = _createSuper(KoconutMap);

  function KoconutMap() {
    var _this;

    (0, _classCallCheck2["default"])(this, KoconutMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mKeys", new Set());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mEntries", new Set());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mValues", new Array());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mSize", 0);
    return _this;
  }

  (0, _createClass2["default"])(KoconutMap, [{
    key: "validate",

    /* Koconut Primitive */
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var _iterator, _step, _step$value, _key2, _value, _this$data, isConflict, _iterator2, _step2, eachPrevEquatableKey;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(data != null)) {
                  _context.next = 45;
                  break;
                }

                this.combinedDataWrapper = new Set();
                _iterator = _createForOfIteratorHelper(data.entries());
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 36;
                  break;
                }

                _step$value = (0, _slicedToArray2["default"])(_step.value, 2), _key2 = _step$value[0], _value = _step$value[1];

                if (!_module.KoconutTypeChecker.checkIsEquatable(_key2)) {
                  _context.next = 30;
                  break;
                }

                isConflict = false;
                _iterator2 = _createForOfIteratorHelper(this.mKeys);
                _context.prev = 10;

                _iterator2.s();

              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 19;
                  break;
                }

                eachPrevEquatableKey = _step2.value;

                if (!_key2.equalsTo(eachPrevEquatableKey)) {
                  _context.next = 17;
                  break;
                }

                isConflict = true;
                return _context.abrupt("break", 19);

              case 17:
                _context.next = 12;
                break;

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);

                _iterator2.e(_context.t0);

              case 24:
                _context.prev = 24;

                _iterator2.f();

                return _context.finish(24);

              case 27:
                if (!isConflict) {
                  this.mKeys.add(_key2);
                  this.combinedDataWrapper.add(new _module.Entry(_key2, _value));
                  this.mEntries.add(new _module.Entry(_key2, _value));
                  this.mValues.push(_value);
                } else (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data["delete"](_key2);

                _context.next = 34;
                break;

              case 30:
                this.mKeys.add(_key2);
                this.combinedDataWrapper.add(new _module.Entry(_key2, _value));
                this.mEntries.add(new _module.Entry(_key2, _value));
                this.mValues.push(_value);

              case 34:
                _context.next = 5;
                break;

              case 36:
                _context.next = 41;
                break;

              case 38:
                _context.prev = 38;
                _context.t1 = _context["catch"](3);

                _iterator.e(_context.t1);

              case 41:
                _context.prev = 41;

                _iterator.f();

                return _context.finish(41);

              case 44:
                this.mSize = data.size;

              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 38, 41, 44], [10, 21, 24, 27]]);
      }));

      function validate(_x) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
    /* Properties */

  }, {
    key: "keys",

    /* Properties Getter */
    value: function keys() {
      var _this2 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _this2.mKeys);

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
    key: "entries",
    value: function entries() {
      var _this3 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _this3.mEntries);

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
    key: "values",
    value: function values() {
      var _this4 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _this4.mValues);

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
    value: function size() {
      var _this5 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this5.mSize);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      return koconutToReturn;
    }
    /* Functions */

  }, {
    key: "asArray",
    value: function asArray() {
      var _this6 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", Array.from(_this6.mEntries));

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
    key: "contains",
    value: function contains(key) {
      var _this7 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var _iterator3, _step3, eachKey;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelper(_this7.mKeys);
                _context7.prev = 1;

                _iterator3.s();

              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context7.next = 9;
                  break;
                }

                eachKey = _step3.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey.equalsTo(key) || !_module.KoconutTypeChecker.checkIsEquatable(eachKey) && eachKey == key)) {
                  _context7.next = 7;
                  break;
                }

                return _context7.abrupt("return", true);

              case 7:
                _context7.next = 3;
                break;

              case 9:
                _context7.next = 14;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](1);

                _iterator3.e(_context7.t0);

              case 14:
                _context7.prev = 14;

                _iterator3.f();

                return _context7.finish(14);

              case 17:
                return _context7.abrupt("return", false);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 11, 14, 17]]);
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
      var _this8 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var _iterator4, _step4, eachValue;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper(_this8.mValues);
                _context8.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context8.next = 9;
                  break;
                }

                eachValue = _step4.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue.equalsTo(value) || !_module.KoconutTypeChecker.checkIsEquatable(eachValue) && eachValue == value)) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt("return", true);

              case 7:
                _context8.next = 3;
                break;

              case 9:
                _context8.next = 14;
                break;

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](1);

                _iterator4.e(_context8.t0);

              case 14:
                _context8.prev = 14;

                _iterator4.f();

                return _context8.finish(14);

              case 17:
                return _context8.abrupt("return", false);

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 11, 14, 17]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var _this9 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var processedMap, _iterator5, _step5, eachEntry;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                processedMap = new Map();

                if (!(_this9.data != null)) {
                  _context9.next = 21;
                  break;
                }

                _iterator5 = _createForOfIteratorHelper(_this9.mEntries);
                _context9.prev = 3;

                _iterator5.s();

              case 5:
                if ((_step5 = _iterator5.n()).done) {
                  _context9.next = 13;
                  break;
                }

                eachEntry = _step5.value;
                _context9.next = 9;
                return predicate(eachEntry);

              case 9:
                if (!_context9.sent) {
                  _context9.next = 11;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 11:
                _context9.next = 5;
                break;

              case 13:
                _context9.next = 18;
                break;

              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9["catch"](3);

                _iterator5.e(_context9.t0);

              case 18:
                _context9.prev = 18;

                _iterator5.f();

                return _context9.finish(18);

              case 21:
                return _context9.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[3, 15, 18, 21]]);
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
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var processedMap, _iterator6, _step6, eachEntry;

        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                processedMap = new Map();

                if (!(_this10.data != null)) {
                  _context10.next = 21;
                  break;
                }

                _iterator6 = _createForOfIteratorHelper(_this10.mEntries);
                _context10.prev = 3;

                _iterator6.s();

              case 5:
                if ((_step6 = _iterator6.n()).done) {
                  _context10.next = 13;
                  break;
                }

                eachEntry = _step6.value;
                _context10.next = 9;
                return predicate(eachEntry.key);

              case 9:
                if (!_context10.sent) {
                  _context10.next = 11;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 11:
                _context10.next = 5;
                break;

              case 13:
                _context10.next = 18;
                break;

              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](3);

                _iterator6.e(_context10.t0);

              case 18:
                _context10.prev = 18;

                _iterator6.f();

                return _context10.finish(18);

              case 21:
                return _context10.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterNot",
    value: function filterNot(predicate) {
      var _this11 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var processedMap, _iterator7, _step7, eachEntry;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                processedMap = new Map();

                if (!(_this11.data != null)) {
                  _context11.next = 21;
                  break;
                }

                _iterator7 = _createForOfIteratorHelper(_this11.mEntries);
                _context11.prev = 3;

                _iterator7.s();

              case 5:
                if ((_step7 = _iterator7.n()).done) {
                  _context11.next = 13;
                  break;
                }

                eachEntry = _step7.value;
                _context11.next = 9;
                return predicate(eachEntry);

              case 9:
                if (_context11.sent) {
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

                _iterator7.e(_context11.t0);

              case 18:
                _context11.prev = 18;

                _iterator7.f();

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
    key: "filterNotTo",
    value: function filterNotTo(destination, predicate) {
      var _this12 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var _iterator8, _step8, eachEntry;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(_this12.data != null)) {
                  _context12.next = 20;
                  break;
                }

                _iterator8 = _createForOfIteratorHelper(_this12.mEntries);
                _context12.prev = 2;

                _iterator8.s();

              case 4:
                if ((_step8 = _iterator8.n()).done) {
                  _context12.next = 12;
                  break;
                }

                eachEntry = _step8.value;
                _context12.next = 8;
                return predicate(eachEntry);

              case 8:
                if (_context12.sent) {
                  _context12.next = 10;
                  break;
                }

                destination.set(eachEntry.key, eachEntry.value);

              case 10:
                _context12.next = 4;
                break;

              case 12:
                _context12.next = 17;
                break;

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12["catch"](2);

                _iterator8.e(_context12.t0);

              case 17:
                _context12.prev = 17;

                _iterator8.f();

                return _context12.finish(17);

              case 20:
                return _context12.abrupt("return", _this12.data);

              case 21:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterTo",
    value: function filterTo(destination, predicate) {
      var _this13 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
        var _iterator9, _step9, eachEntry;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(_this13.data != null)) {
                  _context13.next = 20;
                  break;
                }

                _iterator9 = _createForOfIteratorHelper(_this13.mEntries);
                _context13.prev = 2;

                _iterator9.s();

              case 4:
                if ((_step9 = _iterator9.n()).done) {
                  _context13.next = 12;
                  break;
                }

                eachEntry = _step9.value;
                _context13.next = 8;
                return predicate(eachEntry);

              case 8:
                if (!_context13.sent) {
                  _context13.next = 10;
                  break;
                }

                destination.set(eachEntry.key, eachEntry.value);

              case 10:
                _context13.next = 4;
                break;

              case 12:
                _context13.next = 17;
                break;

              case 14:
                _context13.prev = 14;
                _context13.t0 = _context13["catch"](2);

                _iterator9.e(_context13.t0);

              case 17:
                _context13.prev = 17;

                _iterator9.f();

                return _context13.finish(17);

              case 20:
                return _context13.abrupt("return", _this13.data);

              case 21:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterValues",
    value: function filterValues(predicate) {
      var _this14 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
        var processedMap, _iterator10, _step10, eachEntry;

        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                processedMap = new Map();

                if (!(_this14.data != null)) {
                  _context14.next = 21;
                  break;
                }

                _iterator10 = _createForOfIteratorHelper(_this14.mEntries);
                _context14.prev = 3;

                _iterator10.s();

              case 5:
                if ((_step10 = _iterator10.n()).done) {
                  _context14.next = 13;
                  break;
                }

                eachEntry = _step10.value;
                _context14.next = 9;
                return predicate(eachEntry.value);

              case 9:
                if (!_context14.sent) {
                  _context14.next = 11;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 11:
                _context14.next = 5;
                break;

              case 13:
                _context14.next = 18;
                break;

              case 15:
                _context14.prev = 15;
                _context14.t0 = _context14["catch"](3);

                _iterator10.e(_context14.t0);

              case 18:
                _context14.prev = 18;

                _iterator10.f();

                return _context14.finish(18);

              case 21:
                return _context14.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "flatMapTo",
    value: function flatMapTo(destination, transform) {
      var _this15 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
        var _iterator11, _step11, eachEntry, _iterator12, _step12, eachResultData;

        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(_this15.data != null)) {
                  _context15.next = 22;
                  break;
                }

                _iterator11 = _createForOfIteratorHelper(_this15.mEntries);
                _context15.prev = 2;

                _iterator11.s();

              case 4:
                if ((_step11 = _iterator11.n()).done) {
                  _context15.next = 14;
                  break;
                }

                eachEntry = _step11.value;
                _context15.t0 = _createForOfIteratorHelper;
                _context15.next = 9;
                return transform(eachEntry);

              case 9:
                _context15.t1 = _context15.sent;
                _iterator12 = (0, _context15.t0)(_context15.t1);

                try {
                  for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                    eachResultData = _step12.value;
                    if (destination instanceof Array) destination.push(eachResultData);else destination.add(eachResultData);
                  }
                } catch (err) {
                  _iterator12.e(err);
                } finally {
                  _iterator12.f();
                }

              case 12:
                _context15.next = 4;
                break;

              case 14:
                _context15.next = 19;
                break;

              case 16:
                _context15.prev = 16;
                _context15.t2 = _context15["catch"](2);

                _iterator11.e(_context15.t2);

              case 19:
                _context15.prev = 19;

                _iterator11.f();

                return _context15.finish(19);

              case 22:
                return _context15.abrupt("return", _this15.data);

              case 23:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "get",
    value: function get(key) {
      var _this16 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
        var _iterator13, _step13, eachEntry;

        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(_this16.data != null)) {
                  _context16.next = 18;
                  break;
                }

                _iterator13 = _createForOfIteratorHelper(_this16.mEntries);
                _context16.prev = 2;

                _iterator13.s();

              case 4:
                if ((_step13 = _iterator13.n()).done) {
                  _context16.next = 10;
                  break;
                }

                eachEntry = _step13.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key) || !_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) {
                  _context16.next = 8;
                  break;
                }

                return _context16.abrupt("return", eachEntry.value);

              case 8:
                _context16.next = 4;
                break;

              case 10:
                _context16.next = 15;
                break;

              case 12:
                _context16.prev = 12;
                _context16.t0 = _context16["catch"](2);

                _iterator13.e(_context16.t0);

              case 15:
                _context16.prev = 15;

                _iterator13.f();

                return _context16.finish(15);

              case 18:
                return _context16.abrupt("return", null);

              case 19:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[2, 12, 15, 18]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getOrDefault",
    value: function getOrDefault(key, defaultValue) {
      var _this17 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
        var _iterator14, _step14, eachEntry;

        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!(_this17.data != null)) {
                  _context17.next = 18;
                  break;
                }

                _iterator14 = _createForOfIteratorHelper(_this17.mEntries);
                _context17.prev = 2;

                _iterator14.s();

              case 4:
                if ((_step14 = _iterator14.n()).done) {
                  _context17.next = 10;
                  break;
                }

                eachEntry = _step14.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key) || !_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) {
                  _context17.next = 8;
                  break;
                }

                return _context17.abrupt("return", eachEntry.value);

              case 8:
                _context17.next = 4;
                break;

              case 10:
                _context17.next = 15;
                break;

              case 12:
                _context17.prev = 12;
                _context17.t0 = _context17["catch"](2);

                _iterator14.e(_context17.t0);

              case 15:
                _context17.prev = 15;

                _iterator14.f();

                return _context17.finish(15);

              case 18:
                return _context17.abrupt("return", defaultValue);

              case 19:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[2, 12, 15, 18]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getOrElse",
    value: function getOrElse(key, defaultValue) {
      var _this18 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
        var _iterator15, _step15, eachEntry;

        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                if (!(_this18.data != null)) {
                  _context18.next = 18;
                  break;
                }

                _iterator15 = _createForOfIteratorHelper(_this18.mEntries);
                _context18.prev = 2;

                _iterator15.s();

              case 4:
                if ((_step15 = _iterator15.n()).done) {
                  _context18.next = 10;
                  break;
                }

                eachEntry = _step15.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key) || !_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) {
                  _context18.next = 8;
                  break;
                }

                return _context18.abrupt("return", eachEntry.value);

              case 8:
                _context18.next = 4;
                break;

              case 10:
                _context18.next = 15;
                break;

              case 12:
                _context18.prev = 12;
                _context18.t0 = _context18["catch"](2);

                _iterator15.e(_context18.t0);

              case 15:
                _context18.prev = 15;

                _iterator15.f();

                return _context18.finish(15);

              case 18:
                _context18.next = 20;
                return defaultValue();

              case 20:
                return _context18.abrupt("return", _context18.sent);

              case 21:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[2, 12, 15, 18]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "getValue",
    value: function getValue(key) {
      var _this19 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
        var _iterator16, _step16, eachEntry;

        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!(_this19.data != null)) {
                  _context19.next = 18;
                  break;
                }

                _iterator16 = _createForOfIteratorHelper(_this19.mEntries);
                _context19.prev = 2;

                _iterator16.s();

              case 4:
                if ((_step16 = _iterator16.n()).done) {
                  _context19.next = 10;
                  break;
                }

                eachEntry = _step16.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key.equalsTo(key) || !_module.KoconutTypeChecker.checkIsEquatable(eachEntry.key) && eachEntry.key == key)) {
                  _context19.next = 8;
                  break;
                }

                return _context19.abrupt("return", eachEntry.value);

              case 8:
                _context19.next = 4;
                break;

              case 10:
                _context19.next = 15;
                break;

              case 12:
                _context19.prev = 12;
                _context19.t0 = _context19["catch"](2);

                _iterator16.e(_context19.t0);

              case 15:
                _context19.prev = 15;

                _iterator16.f();

                return _context19.finish(15);

              case 18:
                throw new _module.KoconutNoSuchElementException("No such element mathces given key ".concat(key, " is found"));

              case 19:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[2, 12, 15, 18]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var _this20 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                return _context20.abrupt("return", _this20.mSize == 0);

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      })));
      return koconutToReturn;
    }
  }, {
    key: "isNotEmpty",
    value: function isNotEmpty() {
      var _this21 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                return _context21.abrupt("return", _this21.mSize != 0);

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      })));
      return koconutToReturn;
    }
  }, {
    key: "isNullOrEmpty",
    value: function isNullOrEmpty() {
      var _this22 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                return _context22.abrupt("return", _this22.data == null || _this22.mSize == 0);

              case 1:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      })));
      return koconutToReturn;
    }
  }, {
    key: "map",
    value: function map(transform) {
      var _this23 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
        var processedArray, _iterator17, _step17, eachEntry;

        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                processedArray = new Array();

                if (!(_this23.data != null)) {
                  _context23.next = 22;
                  break;
                }

                _iterator17 = _createForOfIteratorHelper(_this23.mEntries);
                _context23.prev = 3;

                _iterator17.s();

              case 5:
                if ((_step17 = _iterator17.n()).done) {
                  _context23.next = 14;
                  break;
                }

                eachEntry = _step17.value;
                _context23.t0 = processedArray;
                _context23.next = 10;
                return transform(eachEntry);

              case 10:
                _context23.t1 = _context23.sent;

                _context23.t0.push.call(_context23.t0, _context23.t1);

              case 12:
                _context23.next = 5;
                break;

              case 14:
                _context23.next = 19;
                break;

              case 16:
                _context23.prev = 16;
                _context23.t2 = _context23["catch"](3);

                _iterator17.e(_context23.t2);

              case 19:
                _context23.prev = 19;

                _iterator17.f();

                return _context23.finish(19);

              case 22:
                return _context23.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapKeys",
    value: function mapKeys(transform) {
      var _this24 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
        var processedMap, _iterator18, _step18, eachEntry;

        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                processedMap = new Map();

                if (!(_this24.data != null)) {
                  _context24.next = 23;
                  break;
                }

                _iterator18 = _createForOfIteratorHelper(_this24.mEntries);
                _context24.prev = 3;

                _iterator18.s();

              case 5:
                if ((_step18 = _iterator18.n()).done) {
                  _context24.next = 15;
                  break;
                }

                eachEntry = _step18.value;
                _context24.t0 = processedMap;
                _context24.next = 10;
                return transform(eachEntry);

              case 10:
                _context24.t1 = _context24.sent;
                _context24.t2 = eachEntry.value;

                _context24.t0.set.call(_context24.t0, _context24.t1, _context24.t2);

              case 13:
                _context24.next = 5;
                break;

              case 15:
                _context24.next = 20;
                break;

              case 17:
                _context24.prev = 17;
                _context24.t3 = _context24["catch"](3);

                _iterator18.e(_context24.t3);

              case 20:
                _context24.prev = 20;

                _iterator18.f();

                return _context24.finish(20);

              case 23:
                return _context24.abrupt("return", processedMap);

              case 24:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapKeysTo",
    value: function mapKeysTo(destination, transform) {
      var _this25 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
        var _iterator19, _step19, eachEntry;

        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                if (!(_this25.data != null)) {
                  _context25.next = 22;
                  break;
                }

                _iterator19 = _createForOfIteratorHelper(_this25.mEntries);
                _context25.prev = 2;

                _iterator19.s();

              case 4:
                if ((_step19 = _iterator19.n()).done) {
                  _context25.next = 14;
                  break;
                }

                eachEntry = _step19.value;
                _context25.t0 = destination;
                _context25.next = 9;
                return transform(eachEntry);

              case 9:
                _context25.t1 = _context25.sent;
                _context25.t2 = eachEntry.value;

                _context25.t0.set.call(_context25.t0, _context25.t1, _context25.t2);

              case 12:
                _context25.next = 4;
                break;

              case 14:
                _context25.next = 19;
                break;

              case 16:
                _context25.prev = 16;
                _context25.t3 = _context25["catch"](2);

                _iterator19.e(_context25.t3);

              case 19:
                _context25.prev = 19;

                _iterator19.f();

                return _context25.finish(19);

              case 22:
                return _context25.abrupt("return", _this25.data);

              case 23:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapNotNull",
    value: function mapNotNull(transform) {
      var _this26 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
        var processedArray, _iterator20, _step20, eachEntry, dataToAdd;

        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                processedArray = new Array();

                if (!(_this26.data != null)) {
                  _context26.next = 21;
                  break;
                }

                _iterator20 = _createForOfIteratorHelper(_this26.mEntries);
                _context26.prev = 3;

                _iterator20.s();

              case 5:
                if ((_step20 = _iterator20.n()).done) {
                  _context26.next = 13;
                  break;
                }

                eachEntry = _step20.value;
                _context26.next = 9;
                return transform(eachEntry);

              case 9:
                dataToAdd = _context26.sent;
                if (dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd);

              case 11:
                _context26.next = 5;
                break;

              case 13:
                _context26.next = 18;
                break;

              case 15:
                _context26.prev = 15;
                _context26.t0 = _context26["catch"](3);

                _iterator20.e(_context26.t0);

              case 18:
                _context26.prev = 18;

                _iterator20.f();

                return _context26.finish(18);

              case 21:
                return _context26.abrupt("return", processedArray);

              case 22:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapNotNullTo",
    value: function mapNotNullTo(destination, transform) {
      var _this27 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
        var _iterator21, _step21, eachEntry, dataToAdd;

        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (!(_this27.data != null)) {
                  _context27.next = 20;
                  break;
                }

                _iterator21 = _createForOfIteratorHelper(_this27.mEntries);
                _context27.prev = 2;

                _iterator21.s();

              case 4:
                if ((_step21 = _iterator21.n()).done) {
                  _context27.next = 12;
                  break;
                }

                eachEntry = _step21.value;
                _context27.next = 8;
                return transform(eachEntry);

              case 8:
                dataToAdd = _context27.sent;
                if (dataToAdd != null) if (destination instanceof Array) destination.push(dataToAdd);else destination.add(dataToAdd);

              case 10:
                _context27.next = 4;
                break;

              case 12:
                _context27.next = 17;
                break;

              case 14:
                _context27.prev = 14;
                _context27.t0 = _context27["catch"](2);

                _iterator21.e(_context27.t0);

              case 17:
                _context27.prev = 17;

                _iterator21.f();

                return _context27.finish(17);

              case 20:
                return _context27.abrupt("return", _this27.data);

              case 21:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapTo",
    value: function mapTo(destination, transform) {
      var _this28 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
        var _iterator22, _step22, eachEntry, dataToAdd;

        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!(_this28.data != null)) {
                  _context28.next = 20;
                  break;
                }

                _iterator22 = _createForOfIteratorHelper(_this28.mEntries);
                _context28.prev = 2;

                _iterator22.s();

              case 4:
                if ((_step22 = _iterator22.n()).done) {
                  _context28.next = 12;
                  break;
                }

                eachEntry = _step22.value;
                _context28.next = 8;
                return transform(eachEntry);

              case 8:
                dataToAdd = _context28.sent;
                if (destination instanceof Array) destination.push(dataToAdd);else destination.add(dataToAdd);

              case 10:
                _context28.next = 4;
                break;

              case 12:
                _context28.next = 17;
                break;

              case 14:
                _context28.prev = 14;
                _context28.t0 = _context28["catch"](2);

                _iterator22.e(_context28.t0);

              case 17:
                _context28.prev = 17;

                _iterator22.f();

                return _context28.finish(17);

              case 20:
                return _context28.abrupt("return", _this28.data);

              case 21:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapVaues",
    value: function mapVaues(transform) {
      var _this29 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
        var processedMap, _iterator23, _step23, eachEntry;

        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                processedMap = new Map();

                if (!(_this29.data != null)) {
                  _context29.next = 23;
                  break;
                }

                _iterator23 = _createForOfIteratorHelper(_this29.mEntries);
                _context29.prev = 3;

                _iterator23.s();

              case 5:
                if ((_step23 = _iterator23.n()).done) {
                  _context29.next = 15;
                  break;
                }

                eachEntry = _step23.value;
                _context29.t0 = processedMap;
                _context29.t1 = eachEntry.key;
                _context29.next = 11;
                return transform(eachEntry);

              case 11:
                _context29.t2 = _context29.sent;

                _context29.t0.set.call(_context29.t0, _context29.t1, _context29.t2);

              case 13:
                _context29.next = 5;
                break;

              case 15:
                _context29.next = 20;
                break;

              case 17:
                _context29.prev = 17;
                _context29.t3 = _context29["catch"](3);

                _iterator23.e(_context29.t3);

              case 20:
                _context29.prev = 20;

                _iterator23.f();

                return _context29.finish(20);

              case 23:
                return _context29.abrupt("return", processedMap);

              case 24:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapValuesTo",
    value: function mapValuesTo(destination, transform) {
      var _this30 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
        var _iterator24, _step24, eachEntry;

        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (!(_this30.data != null)) {
                  _context30.next = 22;
                  break;
                }

                _iterator24 = _createForOfIteratorHelper(_this30.mEntries);
                _context30.prev = 2;

                _iterator24.s();

              case 4:
                if ((_step24 = _iterator24.n()).done) {
                  _context30.next = 14;
                  break;
                }

                eachEntry = _step24.value;
                _context30.t0 = destination;
                _context30.t1 = eachEntry.key;
                _context30.next = 10;
                return transform(eachEntry);

              case 10:
                _context30.t2 = _context30.sent;

                _context30.t0.set.call(_context30.t0, _context30.t1, _context30.t2);

              case 12:
                _context30.next = 4;
                break;

              case 14:
                _context30.next = 19;
                break;

              case 16:
                _context30.prev = 16;
                _context30.t3 = _context30["catch"](2);

                _iterator24.e(_context30.t3);

              case 19:
                _context30.prev = 19;

                _iterator24.f();

                return _context30.finish(19);

              case 22:
                return _context30.abrupt("return", _this30.data);

              case 23:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxBy",
    value: function maxBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxBy", this).call(this, selector, this);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "maxByOrNull",
    value: function maxByOrNull(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fromSuper = (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutMap.prototype), "maxByOrNull", this).call(this, selector, this);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(fromSuper['prevYieldable']).setProcessor(fromSuper['processor']);
      return koconutToReturn;
    }
  }, {
    key: "maxOfWith",
    value: function maxOfWith(selector, comparator) {
      var _this31 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
        var lastComparableDatumToReturn, _iterator25, _step25, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (!(_this31.data == null || _this31.mSize == 0)) {
                  _context31.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator25 = _createForOfIteratorHelper(_this31.mEntries);
                _context31.prev = 4;

                _iterator25.s();

              case 6:
                if ((_step25 = _iterator25.n()).done) {
                  _context31.next = 21;
                  break;
                }

                eachEntry = _step25.value;
                _context31.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context31.sent;
                _context31.t0 = lastComparableDatumToReturn == null;

                if (_context31.t0) {
                  _context31.next = 17;
                  break;
                }

                _context31.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context31.t1 = _context31.sent;
                _context31.t0 = _context31.t1 < 0;

              case 17:
                if (!_context31.t0) {
                  _context31.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context31.next = 6;
                break;

              case 21:
                _context31.next = 26;
                break;

              case 23:
                _context31.prev = 23;
                _context31.t2 = _context31["catch"](4);

                _iterator25.e(_context31.t2);

              case 26:
                _context31.prev = 26;

                _iterator25.f();

                return _context31.finish(26);

              case 29:
                return _context31.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxOfWithOrNull",
    value: function maxOfWithOrNull(selector, comparator) {
      var _this32 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
        var lastComparableDatumToReturn, _iterator26, _step26, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                if (!(_this32.data == null || _this32.mSize == 0)) {
                  _context32.next = 2;
                  break;
                }

                return _context32.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator26 = _createForOfIteratorHelper(_this32.mEntries);
                _context32.prev = 4;

                _iterator26.s();

              case 6:
                if ((_step26 = _iterator26.n()).done) {
                  _context32.next = 21;
                  break;
                }

                eachEntry = _step26.value;
                _context32.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context32.sent;
                _context32.t0 = lastComparableDatumToReturn == null;

                if (_context32.t0) {
                  _context32.next = 17;
                  break;
                }

                _context32.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context32.t1 = _context32.sent;
                _context32.t0 = _context32.t1 < 0;

              case 17:
                if (!_context32.t0) {
                  _context32.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context32.next = 6;
                break;

              case 21:
                _context32.next = 26;
                break;

              case 23:
                _context32.prev = 23;
                _context32.t2 = _context32["catch"](4);

                _iterator26.e(_context32.t2);

              case 26:
                _context32.prev = 26;

                _iterator26.f();

                return _context32.finish(26);

              case 29:
                return _context32.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxWithOrNull",
    value: function maxWithOrNull(comparator) {
      var _this33 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
        var dataToReturn, _iterator27, _step27, eachEntry;

        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                if (!(_this33.data == null || _this33.mSize == 0)) {
                  _context33.next = 2;
                  break;
                }

                return _context33.abrupt("return", null);

              case 2:
                dataToReturn = null;
                _iterator27 = _createForOfIteratorHelper(_this33.mEntries);
                _context33.prev = 4;

                _iterator27.s();

              case 6:
                if ((_step27 = _iterator27.n()).done) {
                  _context33.next = 18;
                  break;
                }

                eachEntry = _step27.value;
                _context33.t0 = dataToReturn == null;

                if (_context33.t0) {
                  _context33.next = 14;
                  break;
                }

                _context33.next = 12;
                return comparator(dataToReturn, eachEntry);

              case 12:
                _context33.t1 = _context33.sent;
                _context33.t0 = _context33.t1 < 0;

              case 14:
                if (!_context33.t0) {
                  _context33.next = 16;
                  break;
                }

                dataToReturn = eachEntry;

              case 16:
                _context33.next = 6;
                break;

              case 18:
                _context33.next = 23;
                break;

              case 20:
                _context33.prev = 20;
                _context33.t2 = _context33["catch"](4);

                _iterator27.e(_context33.t2);

              case 23:
                _context33.prev = 23;

                _iterator27.f();

                return _context33.finish(23);

              case 26:
                return _context33.abrupt("return", dataToReturn);

              case 27:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, null, [[4, 20, 23, 26]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minByOrNull",
    value: function minByOrNull(selector) {
      var _this34 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutEntry();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
        var dataToReturn, lastComparableDatum, _iterator28, _step28, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (!(_this34.data == null || _this34.mSize == 0)) {
                  _context34.next = 2;
                  break;
                }

                return _context34.abrupt("return", null);

              case 2:
                dataToReturn = null;
                lastComparableDatum = null;
                _iterator28 = _createForOfIteratorHelper(_this34.mEntries);
                _context34.prev = 5;

                _iterator28.s();

              case 7:
                if ((_step28 = _iterator28.n()).done) {
                  _context34.next = 15;
                  break;
                }

                eachEntry = _step28.value;
                _context34.next = 11;
                return selector(eachEntry);

              case 11:
                eachComparableDatum = _context34.sent;

                if (lastComparableDatum == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum) {
                  dataToReturn = eachEntry;
                  lastComparableDatum = eachComparableDatum;
                }

              case 13:
                _context34.next = 7;
                break;

              case 15:
                _context34.next = 20;
                break;

              case 17:
                _context34.prev = 17;
                _context34.t0 = _context34["catch"](5);

                _iterator28.e(_context34.t0);

              case 20:
                _context34.prev = 20;

                _iterator28.f();

                return _context34.finish(20);

              case 23:
                return _context34.abrupt("return", dataToReturn);

              case 24:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, null, [[5, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOf",
    value: function minOf(selector) {
      var _this35 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
        var lastComparableDatumToReturn, _iterator29, _step29, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!(_this35.data == null || _this35.mSize == 0)) {
                  _context35.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator29 = _createForOfIteratorHelper(_this35.mEntries);
                _context35.prev = 4;

                _iterator29.s();

              case 6:
                if ((_step29 = _iterator29.n()).done) {
                  _context35.next = 14;
                  break;
                }

                eachEntry = _step29.value;
                _context35.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context35.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context35.next = 6;
                break;

              case 14:
                _context35.next = 19;
                break;

              case 16:
                _context35.prev = 16;
                _context35.t0 = _context35["catch"](4);

                _iterator29.e(_context35.t0);

              case 19:
                _context35.prev = 19;

                _iterator29.f();

                return _context35.finish(19);

              case 22:
                return _context35.abrupt("return", lastComparableDatumToReturn);

              case 23:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfOrNull",
    value: function minOfOrNull(selector) {
      var _this36 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
        var lastComparableDatumToReturn, _iterator30, _step30, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                if (!(_this36.data == null || _this36.mSize == 0)) {
                  _context36.next = 2;
                  break;
                }

                return _context36.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator30 = _createForOfIteratorHelper(_this36.mEntries);
                _context36.prev = 4;

                _iterator30.s();

              case 6:
                if ((_step30 = _iterator30.n()).done) {
                  _context36.next = 14;
                  break;
                }

                eachEntry = _step30.value;
                _context36.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context36.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context36.next = 6;
                break;

              case 14:
                _context36.next = 19;
                break;

              case 16:
                _context36.prev = 16;
                _context36.t0 = _context36["catch"](4);

                _iterator30.e(_context36.t0);

              case 19:
                _context36.prev = 19;

                _iterator30.f();

                return _context36.finish(19);

              case 22:
                return _context36.abrupt("return", lastComparableDatumToReturn);

              case 23:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfWith",
    value: function minOfWith(selector, comparator) {
      var _this37 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
        var lastComparableDatumToReturn, _iterator31, _step31, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                if (!(_this37.data == null || _this37.mSize == 0)) {
                  _context37.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator31 = _createForOfIteratorHelper(_this37.mEntries);
                _context37.prev = 4;

                _iterator31.s();

              case 6:
                if ((_step31 = _iterator31.n()).done) {
                  _context37.next = 21;
                  break;
                }

                eachEntry = _step31.value;
                _context37.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context37.sent;
                _context37.t0 = lastComparableDatumToReturn == null;

                if (_context37.t0) {
                  _context37.next = 17;
                  break;
                }

                _context37.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context37.t1 = _context37.sent;
                _context37.t0 = _context37.t1 > 0;

              case 17:
                if (!_context37.t0) {
                  _context37.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context37.next = 6;
                break;

              case 21:
                _context37.next = 26;
                break;

              case 23:
                _context37.prev = 23;
                _context37.t2 = _context37["catch"](4);

                _iterator31.e(_context37.t2);

              case 26:
                _context37.prev = 26;

                _iterator31.f();

                return _context37.finish(26);

              case 29:
                return _context37.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfWithOrNull",
    value: function minOfWithOrNull(selector, comparator) {
      var _this38 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
        var lastComparableDatumToReturn, _iterator32, _step32, eachEntry, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                if (!(_this38.data == null || _this38.mSize == 0)) {
                  _context38.next = 2;
                  break;
                }

                return _context38.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator32 = _createForOfIteratorHelper(_this38.mEntries);
                _context38.prev = 4;

                _iterator32.s();

              case 6:
                if ((_step32 = _iterator32.n()).done) {
                  _context38.next = 21;
                  break;
                }

                eachEntry = _step32.value;
                _context38.next = 10;
                return selector(eachEntry);

              case 10:
                eachComparableDatum = _context38.sent;
                _context38.t0 = lastComparableDatumToReturn == null;

                if (_context38.t0) {
                  _context38.next = 17;
                  break;
                }

                _context38.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context38.t1 = _context38.sent;
                _context38.t0 = _context38.t1 > 0;

              case 17:
                if (!_context38.t0) {
                  _context38.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context38.next = 6;
                break;

              case 21:
                _context38.next = 26;
                break;

              case 23:
                _context38.prev = 23;
                _context38.t2 = _context38["catch"](4);

                _iterator32.e(_context38.t2);

              case 26:
                _context38.prev = 26;

                _iterator32.f();

                return _context38.finish(26);

              case 29:
                return _context38.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minus",
    value: function minus(keys) {
      var _this39 = this;

      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
        var processedMap, dataToExcept, koconutKeysToExceptArray, _iterator33, _step33, eachEntry;

        return _regenerator["default"].wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                processedMap = new Map();

                if (!(_this39.data != null)) {
                  _context39.next = 24;
                  break;
                }

                dataToExcept = new Array();
                if (typeof keys[Symbol.iterator] === 'function') dataToExcept = Array.from(keys);else dataToExcept.push(keys);
                koconutKeysToExceptArray = _module.KoconutArray.from(dataToExcept);
                _iterator33 = _createForOfIteratorHelper(_this39.mEntries);
                _context39.prev = 6;

                _iterator33.s();

              case 8:
                if ((_step33 = _iterator33.n()).done) {
                  _context39.next = 16;
                  break;
                }

                eachEntry = _step33.value;
                _context39.next = 12;
                return koconutKeysToExceptArray.contains(eachEntry.key)["yield"]();

              case 12:
                if (_context39.sent) {
                  _context39.next = 14;
                  break;
                }

                processedMap.set(eachEntry.key, eachEntry.value);

              case 14:
                _context39.next = 8;
                break;

              case 16:
                _context39.next = 21;
                break;

              case 18:
                _context39.prev = 18;
                _context39.t0 = _context39["catch"](6);

                _iterator33.e(_context39.t0);

              case 21:
                _context39.prev = 21;

                _iterator33.f();

                return _context39.finish(21);

              case 24:
                return _context39.abrupt("return", processedMap);

              case 25:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, null, [[6, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minWithOrNull",
    value: function minWithOrNull(comparator) {
      var _this40 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
        var dataToReturn, _iterator34, _step34, eachEntry;

        return _regenerator["default"].wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                if (!(_this40.data == null || _this40.mSize == 0)) {
                  _context40.next = 2;
                  break;
                }

                return _context40.abrupt("return", null);

              case 2:
                dataToReturn = null;
                _iterator34 = _createForOfIteratorHelper(_this40.mEntries);
                _context40.prev = 4;

                _iterator34.s();

              case 6:
                if ((_step34 = _iterator34.n()).done) {
                  _context40.next = 18;
                  break;
                }

                eachEntry = _step34.value;
                _context40.t0 = dataToReturn == null;

                if (_context40.t0) {
                  _context40.next = 14;
                  break;
                }

                _context40.next = 12;
                return comparator(dataToReturn, eachEntry);

              case 12:
                _context40.t1 = _context40.sent;
                _context40.t0 = _context40.t1 > 0;

              case 14:
                if (!_context40.t0) {
                  _context40.next = 16;
                  break;
                }

                dataToReturn = eachEntry;

              case 16:
                _context40.next = 6;
                break;

              case 18:
                _context40.next = 23;
                break;

              case 20:
                _context40.prev = 20;
                _context40.t2 = _context40["catch"](4);

                _iterator34.e(_context40.t2);

              case 23:
                _context40.prev = 23;

                _iterator34.f();

                return _context40.finish(23);

              case 26:
                return _context40.abrupt("return", dataToReturn);

              case 27:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, null, [[4, 20, 23, 26]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "none",
    value: function none() {
      var _this41 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
        var _iterator35, _step35, eachEntry;

        return _regenerator["default"].wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                if (!(_this41.data == null || _this41.mSize == 0)) {
                  _context41.next = 2;
                  break;
                }

                return _context41.abrupt("return", true);

              case 2:
                if (!predicate) {
                  _context41.next = 23;
                  break;
                }

                _iterator35 = _createForOfIteratorHelper(_this41.mEntries);
                _context41.prev = 4;

                _iterator35.s();

              case 6:
                if ((_step35 = _iterator35.n()).done) {
                  _context41.next = 14;
                  break;
                }

                eachEntry = _step35.value;
                _context41.next = 10;
                return predicate(eachEntry);

              case 10:
                if (!_context41.sent) {
                  _context41.next = 12;
                  break;
                }

                return _context41.abrupt("return", false);

              case 12:
                _context41.next = 6;
                break;

              case 14:
                _context41.next = 19;
                break;

              case 16:
                _context41.prev = 16;
                _context41.t0 = _context41["catch"](4);

                _iterator35.e(_context41.t0);

              case 19:
                _context41.prev = 19;

                _iterator35.f();

                return _context41.finish(19);

              case 22:
                return _context41.abrupt("return", true);

              case 23:
                return _context41.abrupt("return", false);

              case 24:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "onEach",
    value: function onEach(action) {
      var _this42 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
        var _iterator36, _step36, eachEntry, signal;

        return _regenerator["default"].wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                if (!(_this42.data != null)) {
                  _context42.next = 21;
                  break;
                }

                _iterator36 = _createForOfIteratorHelper(_this42.mEntries);
                _context42.prev = 2;

                _iterator36.s();

              case 4:
                if ((_step36 = _iterator36.n()).done) {
                  _context42.next = 13;
                  break;
                }

                eachEntry = _step36.value;
                _context42.next = 8;
                return action(eachEntry);

              case 8:
                signal = _context42.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context42.next = 11;
                  break;
                }

                return _context42.abrupt("break", 13);

              case 11:
                _context42.next = 4;
                break;

              case 13:
                _context42.next = 18;
                break;

              case 15:
                _context42.prev = 15;
                _context42.t0 = _context42["catch"](2);

                _iterator36.e(_context42.t0);

              case 18:
                _context42.prev = 18;

                _iterator36.f();

                return _context42.finish(18);

              case 21:
                return _context42.abrupt("return", _this42.data);

              case 22:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "onEachIndexed",
    value: function onEachIndexed(action) {
      var _this43 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
        var eachIndex, _iterator37, _step37, eachEntry, signal;

        return _regenerator["default"].wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (!(_this43.data != null)) {
                  _context43.next = 22;
                  break;
                }

                eachIndex = 0;
                _iterator37 = _createForOfIteratorHelper(_this43.mEntries);
                _context43.prev = 3;

                _iterator37.s();

              case 5:
                if ((_step37 = _iterator37.n()).done) {
                  _context43.next = 14;
                  break;
                }

                eachEntry = _step37.value;
                _context43.next = 9;
                return action(eachIndex++, eachEntry);

              case 9:
                signal = _context43.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context43.next = 12;
                  break;
                }

                return _context43.abrupt("break", 14);

              case 12:
                _context43.next = 5;
                break;

              case 14:
                _context43.next = 19;
                break;

              case 16:
                _context43.prev = 16;
                _context43.t0 = _context43["catch"](3);

                _iterator37.e(_context43.t0);

              case 19:
                _context43.prev = 19;

                _iterator37.f();

                return _context43.finish(19);

              case 22:
                return _context43.abrupt("return", _this43.data);

              case 23:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    } // orEmpty

  }, {
    key: "plus",
    value: function plus(element) {
      var _this44 = this;

      var koconutToReturn = new KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
        var processedMap, dataToAdd, _iterator38, _step38, eachDatum, _entry, pair;

        return _regenerator["default"].wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                processedMap = _this44.data == null ? new Map() : new Map(_this44.data);
                dataToAdd = new Array();
                if (typeof element[Symbol.iterator] == 'function') dataToAdd = Array.from(element);else dataToAdd.push(element);
                _iterator38 = _createForOfIteratorHelper(dataToAdd);
                _context44.prev = 4;

                _iterator38.s();

              case 6:
                if ((_step38 = _iterator38.n()).done) {
                  _context44.next = 29;
                  break;
                }

                eachDatum = _step38.value;

                if (!(eachDatum instanceof _module.KoconutEntry)) {
                  _context44.next = 15;
                  break;
                }

                _context44.next = 11;
                return eachDatum["yield"]();

              case 11:
                _entry = _context44.sent;
                if (_entry != null) processedMap.set(_entry.key, _entry.value);
                _context44.next = 27;
                break;

              case 15:
                if (!(eachDatum instanceof _module.Entry)) {
                  _context44.next = 19;
                  break;
                }

                processedMap.set(eachDatum.key, eachDatum.value);
                _context44.next = 27;
                break;

              case 19:
                if (!(eachDatum instanceof _module.KoconutPair)) {
                  _context44.next = 26;
                  break;
                }

                _context44.next = 22;
                return eachDatum["yield"]();

              case 22:
                pair = _context44.sent;
                if (pair != null) processedMap.set(pair.first, pair.second);
                _context44.next = 27;
                break;

              case 26:
                if (eachDatum instanceof _module.Pair) processedMap.set(eachDatum.first, eachDatum.second);

              case 27:
                _context44.next = 6;
                break;

              case 29:
                _context44.next = 34;
                break;

              case 31:
                _context44.prev = 31;
                _context44.t0 = _context44["catch"](4);

                _iterator38.e(_context44.t0);

              case 34:
                _context44.prev = 34;

                _iterator38.f();

                return _context44.finish(34);

              case 37:
                return _context44.abrupt("return", processedMap);

              case 38:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, null, [[4, 31, 34, 37]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var _this45 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
        var processedArray, _iterator39, _step39, eachEntry;

        return _regenerator["default"].wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                processedArray = new Array();

                if (_this45.data != null) {
                  _iterator39 = _createForOfIteratorHelper(_this45.mEntries);

                  try {
                    for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
                      eachEntry = _step39.value;
                      processedArray.push(new _module.Entry(eachEntry.key, eachEntry.value));
                    }
                  } catch (err) {
                    _iterator39.e(err);
                  } finally {
                    _iterator39.f();
                  }
                }

                return _context45.abrupt("return", processedArray);

              case 3:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45);
      })));
      return koconutToReturn;
    }
  }], [{
    key: "from",
    value: function from(source) {
      return new KoconutMap(source);
    }
  }, {
    key: "of",
    value: function of() {
      var map = new Map();

      for (var _len2 = arguments.length, data = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        data[_key3] = arguments[_key3];
      }

      for (var _i = 0, _data = data; _i < _data.length; _i++) {
        var eachDatum = _data[_i];
        if (eachDatum instanceof _module.Entry) map.set(eachDatum.key, eachDatum.value);else if (eachDatum instanceof _module.Pair) map.set(eachDatum.first, eachDatum.second);else map.set(eachDatum[0], eachDatum[1]);
      }

      return new KoconutMap(map);
    }
  }]);
  return KoconutMap;
}(_module.KoconutIterable);

exports.KoconutMap = KoconutMap;