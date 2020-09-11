"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutCollection = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

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

/** @internal */
var KoconutCollection = /*#__PURE__*/function (_KoconutIterable) {
  (0, _inherits2["default"])(KoconutCollection, _KoconutIterable);

  var _super = _createSuper(KoconutCollection);

  function KoconutCollection() {
    var _this;

    (0, _classCallCheck2["default"])(this, KoconutCollection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mSize", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mIndices", new Array());
    return _this;
  }

  (0, _createClass2["default"])(KoconutCollection, [{
    key: "validate",

    /* Koconut Primitive */
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
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
    /* Properties */

  }, {
    key: "size",
    value: function size() {
      var _this3 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
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
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
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
    /* Funcions */

  }, {
    key: "associate",
    value: function associate(transform) {
      var _this5 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var processedMap, _iterator, _step, eachDatum, eachTransformResult, eachPair;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                processedMap = new Map();

                if (!(_this5.data != null)) {
                  _context4.next = 28;
                  break;
                }

                _iterator = _createForOfIteratorHelper(_this5.data);
                _context4.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context4.next = 20;
                  break;
                }

                eachDatum = _step.value;
                _context4.next = 9;
                return transform(eachDatum);

              case 9:
                eachTransformResult = _context4.sent;

                if (!(eachTransformResult instanceof _module.KoconutPair)) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 13;
                return eachTransformResult["yield"]();

              case 13:
                eachPair = _context4.sent;
                if (eachPair != null) processedMap.set(eachPair.first, eachPair.second);
                _context4.next = 18;
                break;

              case 17:
                if (eachTransformResult instanceof _module.Pair) processedMap.set(eachTransformResult.first, eachTransformResult.second);else processedMap.set(eachTransformResult[0], eachTransformResult[1]);

              case 18:
                _context4.next = 5;
                break;

              case 20:
                _context4.next = 25;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](3);

                _iterator.e(_context4.t0);

              case 25:
                _context4.prev = 25;

                _iterator.f();

                return _context4.finish(25);

              case 28:
                return _context4.abrupt("return", processedMap);

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[3, 22, 25, 28]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "associateBy",
    value: function associateBy(keySelector) {
      var _this6 = this;

      var valueTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var keySelectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var valueTransformThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var processedMap, _iterator2, _step2, eachDatum, eachKey, eachValue;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                processedMap = new Map();

                if (!(_this6.data != null)) {
                  _context5.next = 29;
                  break;
                }

                _iterator2 = _createForOfIteratorHelper(_this6.data);
                _context5.prev = 3;

                _iterator2.s();

              case 5:
                if ((_step2 = _iterator2.n()).done) {
                  _context5.next = 21;
                  break;
                }

                eachDatum = _step2.value;
                _context5.next = 9;
                return keySelector(eachDatum);

              case 9:
                eachKey = _context5.sent;

                if (!valueTransform) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 13;
                return valueTransform(eachDatum);

              case 13:
                _context5.t0 = _context5.sent;
                _context5.next = 17;
                break;

              case 16:
                _context5.t0 = eachDatum;

              case 17:
                eachValue = _context5.t0;
                processedMap.set(eachKey, eachValue);

              case 19:
                _context5.next = 5;
                break;

              case 21:
                _context5.next = 26;
                break;

              case 23:
                _context5.prev = 23;
                _context5.t1 = _context5["catch"](3);

                _iterator2.e(_context5.t1);

              case 26:
                _context5.prev = 26;

                _iterator2.f();

                return _context5.finish(26);

              case 29:
                return _context5.abrupt("return", processedMap);

              case 30:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "associateByTo",
    value: function associateByTo(destination, keySelector) {
      var _this7 = this;

      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var _iterator3, _step3, eachDatum, eachKey, eachValue;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(_this7.data != null)) {
                  _context6.next = 28;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(_this7.data);
                _context6.prev = 2;

                _iterator3.s();

              case 4:
                if ((_step3 = _iterator3.n()).done) {
                  _context6.next = 20;
                  break;
                }

                eachDatum = _step3.value;
                _context6.next = 8;
                return keySelector(eachDatum);

              case 8:
                eachKey = _context6.sent;

                if (!valueTransform) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 12;
                return valueTransform(eachDatum);

              case 12:
                _context6.t0 = _context6.sent;
                _context6.next = 16;
                break;

              case 15:
                _context6.t0 = eachDatum;

              case 16:
                eachValue = _context6.t0;
                destination.set(eachKey, eachValue);

              case 18:
                _context6.next = 4;
                break;

              case 20:
                _context6.next = 25;
                break;

              case 22:
                _context6.prev = 22;
                _context6.t1 = _context6["catch"](2);

                _iterator3.e(_context6.t1);

              case 25:
                _context6.prev = 25;

                _iterator3.f();

                return _context6.finish(25);

              case 28:
                return _context6.abrupt("return", _this7.data);

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 22, 25, 28]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "associateTo",
    value: function associateTo(destination, transform) {
      var _this8 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var _iterator4, _step4, eachDatum, eachTransformResult, eachPair;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(_this8.data != null)) {
                  _context7.next = 27;
                  break;
                }

                _iterator4 = _createForOfIteratorHelper(_this8.data);
                _context7.prev = 2;

                _iterator4.s();

              case 4:
                if ((_step4 = _iterator4.n()).done) {
                  _context7.next = 19;
                  break;
                }

                eachDatum = _step4.value;
                _context7.next = 8;
                return transform(eachDatum);

              case 8:
                eachTransformResult = _context7.sent;

                if (!(eachTransformResult instanceof _module.KoconutPair)) {
                  _context7.next = 16;
                  break;
                }

                _context7.next = 12;
                return eachTransformResult["yield"]();

              case 12:
                eachPair = _context7.sent;
                if (eachPair != null) destination.set(eachPair.first, eachPair.second);
                _context7.next = 17;
                break;

              case 16:
                if (eachTransformResult instanceof _module.Pair) destination.set(eachTransformResult.first, eachTransformResult.second);else destination.set(eachTransformResult[0], eachTransformResult[1]);

              case 17:
                _context7.next = 4;
                break;

              case 19:
                _context7.next = 24;
                break;

              case 21:
                _context7.prev = 21;
                _context7.t0 = _context7["catch"](2);

                _iterator4.e(_context7.t0);

              case 24:
                _context7.prev = 24;

                _iterator4.f();

                return _context7.finish(24);

              case 27:
                return _context7.abrupt("return", _this8.data);

              case 28:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "associateWith",
    value: function associateWith(valueSelector) {
      var _this9 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      valueSelector = valueSelector.bind(thisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var processedMap, _iterator5, _step5, eachDatum, eachValue;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                processedMap = new Map();

                if (!(_this9.data != null)) {
                  _context8.next = 21;
                  break;
                }

                _iterator5 = _createForOfIteratorHelper(_this9.data);
                _context8.prev = 3;

                _iterator5.s();

              case 5:
                if ((_step5 = _iterator5.n()).done) {
                  _context8.next = 13;
                  break;
                }

                eachDatum = _step5.value;
                _context8.next = 9;
                return valueSelector(eachDatum);

              case 9:
                eachValue = _context8.sent;
                processedMap.set(eachDatum, eachValue);

              case 11:
                _context8.next = 5;
                break;

              case 13:
                _context8.next = 18;
                break;

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](3);

                _iterator5.e(_context8.t0);

              case 18:
                _context8.prev = 18;

                _iterator5.f();

                return _context8.finish(18);

              case 21:
                return _context8.abrupt("return", processedMap);

              case 22:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "associateWithTo",
    value: function associateWithTo(destination, valueSelector) {
      var _this10 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      valueSelector = valueSelector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        var _iterator6, _step6, eachDatum, eachValue;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(_this10.data != null)) {
                  _context9.next = 20;
                  break;
                }

                _iterator6 = _createForOfIteratorHelper(_this10.data);
                _context9.prev = 2;

                _iterator6.s();

              case 4:
                if ((_step6 = _iterator6.n()).done) {
                  _context9.next = 12;
                  break;
                }

                eachDatum = _step6.value;
                _context9.next = 8;
                return valueSelector(eachDatum);

              case 8:
                eachValue = _context9.sent;
                destination.set(eachDatum, eachValue);

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
                return _context9.abrupt("return", _this10.data);

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
    key: "chunked",
    value: function chunked(size) {
      var _this11 = this;

      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var processedArray, currentIndex, dataArray, transformedArray, eachProcessedIndex;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                processedArray = new Array();

                if (_this11.data != null) {
                  currentIndex = 0;
                  dataArray = Array.from(_this11.data);

                  while (currentIndex < dataArray.length) {
                    processedArray.push(dataArray.slice(currentIndex, currentIndex + size));
                    currentIndex += size;
                  }
                }

                if (!transform) {
                  _context10.next = 15;
                  break;
                }

                transformedArray = new Array();
                _context10.t0 = _regenerator["default"].keys(processedArray);

              case 5:
                if ((_context10.t1 = _context10.t0()).done) {
                  _context10.next = 14;
                  break;
                }

                eachProcessedIndex = _context10.t1.value;
                _context10.t2 = transformedArray;
                _context10.next = 10;
                return transform(processedArray[eachProcessedIndex]);

              case 10:
                _context10.t3 = _context10.sent;

                _context10.t2.push.call(_context10.t2, _context10.t3);

                _context10.next = 5;
                break;

              case 14:
                return _context10.abrupt("return", transformedArray);

              case 15:
                return _context10.abrupt("return", processedArray);

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      })));
      return koconutToReturn;
    }
  }, {
    key: "contains",
    value: function contains(element) {
      var _this12 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var _iterator7, _step7, eachDatum;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(_this12.data == null)) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", false);

              case 2:
                _iterator7 = _createForOfIteratorHelper(_this12.data);
                _context11.prev = 3;

                _iterator7.s();

              case 5:
                if ((_step7 = _iterator7.n()).done) {
                  _context11.next = 11;
                  break;
                }

                eachDatum = _step7.value;

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachDatum) && eachDatum.equalsTo(element) || !_module.KoconutTypeChecker.checkIsEquatable(eachDatum) && element == eachDatum)) {
                  _context11.next = 9;
                  break;
                }

                return _context11.abrupt("return", true);

              case 9:
                _context11.next = 5;
                break;

              case 11:
                _context11.next = 16;
                break;

              case 13:
                _context11.prev = 13;
                _context11.t0 = _context11["catch"](3);

                _iterator7.e(_context11.t0);

              case 16:
                _context11.prev = 16;

                _iterator7.f();

                return _context11.finish(16);

              case 19:
                return _context11.abrupt("return", false);

              case 20:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[3, 13, 16, 19]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "containsAll",
    value: function containsAll(elements) {
      var _this13 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var dataArray, _iterator8, _step8, eachElementToCheck, isIncluded, _iterator9, _step9, eachDatum;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(_this13.data == null)) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return", false);

              case 2:
                dataArray = Array.from(_this13.data);
                _iterator8 = _createForOfIteratorHelper(elements);
                _context12.prev = 4;

                _iterator8.s();

              case 6:
                if ((_step8 = _iterator8.n()).done) {
                  _context12.next = 36;
                  break;
                }

                eachElementToCheck = _step8.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachElementToCheck)) {
                  _context12.next = 32;
                  break;
                }

                isIncluded = false;
                _iterator9 = _createForOfIteratorHelper(dataArray);
                _context12.prev = 11;

                _iterator9.s();

              case 13:
                if ((_step9 = _iterator9.n()).done) {
                  _context12.next = 20;
                  break;
                }

                eachDatum = _step9.value;

                if (!eachElementToCheck.equalsTo(eachDatum)) {
                  _context12.next = 18;
                  break;
                }

                isIncluded = true;
                return _context12.abrupt("break", 20);

              case 18:
                _context12.next = 13;
                break;

              case 20:
                _context12.next = 25;
                break;

              case 22:
                _context12.prev = 22;
                _context12.t0 = _context12["catch"](11);

                _iterator9.e(_context12.t0);

              case 25:
                _context12.prev = 25;

                _iterator9.f();

                return _context12.finish(25);

              case 28:
                if (isIncluded) {
                  _context12.next = 30;
                  break;
                }

                return _context12.abrupt("return", false);

              case 30:
                _context12.next = 34;
                break;

              case 32:
                if (dataArray.includes(eachElementToCheck)) {
                  _context12.next = 34;
                  break;
                }

                return _context12.abrupt("return", false);

              case 34:
                _context12.next = 6;
                break;

              case 36:
                _context12.next = 41;
                break;

              case 38:
                _context12.prev = 38;
                _context12.t1 = _context12["catch"](4);

                _iterator8.e(_context12.t1);

              case 41:
                _context12.prev = 41;

                _iterator8.f();

                return _context12.finish(41);

              case 44:
                return _context12.abrupt("return", true);

              case 45:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[4, 38, 41, 44], [11, 22, 25, 28]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "distinct",
    value: function distinct() {
      var _this14 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
        var processedArray, _iterator10, _step10, eachDatum, isConflict, _iterator11, _step11, eachPrevEquatableDatum;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                processedArray = new Array();

                if (!(_this14.data != null)) {
                  _context13.next = 42;
                  break;
                }

                _iterator10 = _createForOfIteratorHelper(_this14.data);
                _context13.prev = 3;

                _iterator10.s();

              case 5:
                if ((_step10 = _iterator10.n()).done) {
                  _context13.next = 34;
                  break;
                }

                eachDatum = _step10.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                  _context13.next = 30;
                  break;
                }

                isConflict = false;
                _iterator11 = _createForOfIteratorHelper(processedArray);
                _context13.prev = 10;

                _iterator11.s();

              case 12:
                if ((_step11 = _iterator11.n()).done) {
                  _context13.next = 19;
                  break;
                }

                eachPrevEquatableDatum = _step11.value;

                if (!eachPrevEquatableDatum.equalsTo(eachDatum)) {
                  _context13.next = 17;
                  break;
                }

                isConflict = true;
                return _context13.abrupt("break", 19);

              case 17:
                _context13.next = 12;
                break;

              case 19:
                _context13.next = 24;
                break;

              case 21:
                _context13.prev = 21;
                _context13.t0 = _context13["catch"](10);

                _iterator11.e(_context13.t0);

              case 24:
                _context13.prev = 24;

                _iterator11.f();

                return _context13.finish(24);

              case 27:
                if (!isConflict) processedArray.push(eachDatum);
                _context13.next = 32;
                break;

              case 30:
                processedArray = Array.from(new Set(_this14.data));
                return _context13.abrupt("break", 34);

              case 32:
                _context13.next = 5;
                break;

              case 34:
                _context13.next = 39;
                break;

              case 36:
                _context13.prev = 36;
                _context13.t1 = _context13["catch"](3);

                _iterator10.e(_context13.t1);

              case 39:
                _context13.prev = 39;

                _iterator10.f();

                return _context13.finish(39);

              case 42:
                if (!(_this14.data instanceof Array)) {
                  _context13.next = 46;
                  break;
                }

                return _context13.abrupt("return", processedArray);

              case 46:
                return _context13.abrupt("return", new Set(processedArray));

              case 47:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[3, 36, 39, 42], [10, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "distinctBy",
    value: function distinctBy(selector) {
      var _this15 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
        var processedArray, keyArray, equatableKeyArray, _iterator12, _step12, eachDatum, eachKey, isConflict, _iterator13, _step13, eachPrevEquatableKey;

        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                processedArray = new Array();

                if (!(_this15.data != null)) {
                  _context14.next = 46;
                  break;
                }

                keyArray = new Array();
                equatableKeyArray = new Array();
                _iterator12 = _createForOfIteratorHelper(_this15.data);
                _context14.prev = 5;

                _iterator12.s();

              case 7:
                if ((_step12 = _iterator12.n()).done) {
                  _context14.next = 38;
                  break;
                }

                eachDatum = _step12.value;
                _context14.next = 11;
                return selector(eachDatum);

              case 11:
                eachKey = _context14.sent;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachKey)) {
                  _context14.next = 35;
                  break;
                }

                isConflict = false;
                _iterator13 = _createForOfIteratorHelper(equatableKeyArray);
                _context14.prev = 15;

                _iterator13.s();

              case 17:
                if ((_step13 = _iterator13.n()).done) {
                  _context14.next = 24;
                  break;
                }

                eachPrevEquatableKey = _step13.value;

                if (!eachPrevEquatableKey.equalsTo(eachKey)) {
                  _context14.next = 22;
                  break;
                }

                isConflict = true;
                return _context14.abrupt("break", 24);

              case 22:
                _context14.next = 17;
                break;

              case 24:
                _context14.next = 29;
                break;

              case 26:
                _context14.prev = 26;
                _context14.t0 = _context14["catch"](15);

                _iterator13.e(_context14.t0);

              case 29:
                _context14.prev = 29;

                _iterator13.f();

                return _context14.finish(29);

              case 32:
                if (!isConflict) {
                  equatableKeyArray.push(eachKey);
                  processedArray.push(eachDatum);
                }

                _context14.next = 36;
                break;

              case 35:
                if (!keyArray.includes(eachKey)) {
                  keyArray.push(eachKey);
                  processedArray.push(eachDatum);
                }

              case 36:
                _context14.next = 7;
                break;

              case 38:
                _context14.next = 43;
                break;

              case 40:
                _context14.prev = 40;
                _context14.t1 = _context14["catch"](5);

                _iterator12.e(_context14.t1);

              case 43:
                _context14.prev = 43;

                _iterator12.f();

                return _context14.finish(43);

              case 46:
                if (!(_this15.data instanceof Array)) {
                  _context14.next = 50;
                  break;
                }

                return _context14.abrupt("return", processedArray);

              case 50:
                return _context14.abrupt("return", new Set(processedArray));

              case 51:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[5, 40, 43, 46], [15, 26, 29, 32]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "drop",
    value: function drop(n) {
      var _this16 = this;

      if (n < 0) throw new _module.KoconutInvalidArgumentException("Given argument ".concat(n, " is invalid, 'n' must be larger than 0."));
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                processedArray = new Array();
                if (_this16.data != null) processedArray = Array.from(_this16.data).slice(n);

                if (!(_this16.data instanceof Array)) {
                  _context15.next = 6;
                  break;
                }

                return _context15.abrupt("return", processedArray);

              case 6:
                return _context15.abrupt("return", new Set(processedArray));

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })));
      return koconutToReturn;
    }
  }, {
    key: "dropLast",
    value: function dropLast(n) {
      var _this17 = this;

      if (n < 0) throw new _module.KoconutInvalidArgumentException("Given argument ".concat(n, " is invalid, 'n' must be larger than 0."));
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                processedArray = new Array();
                if (_this17.data != null) processedArray = Array.from(_this17.data).slice(0, -n);

                if (!(_this17.data instanceof Array)) {
                  _context16.next = 6;
                  break;
                }

                return _context16.abrupt("return", processedArray);

              case 6:
                return _context16.abrupt("return", new Set(processedArray));

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      })));
      return koconutToReturn;
    } // 추후 문제 발생 가능성 있음

  }, {
    key: "dropLastWhile",
    value: function dropLastWhile(predicate) {
      var _this18 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
        var processedArray, dataArray, indexNumber, eachIndex;
        return _regenerator["default"].wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                processedArray = new Array();

                if (!(_this18.data != null)) {
                  _context17.next = 15;
                  break;
                }

                dataArray = Array.from(_this18.data);
                indexNumber = 0;
                eachIndex = dataArray.length - 1;

              case 5:
                if (!(eachIndex >= 0)) {
                  _context17.next = 14;
                  break;
                }

                _context17.next = 8;
                return predicate(dataArray[eachIndex]);

              case 8:
                if (_context17.sent) {
                  _context17.next = 11;
                  break;
                }

                indexNumber = eachIndex;
                return _context17.abrupt("break", 14);

              case 11:
                eachIndex--;
                _context17.next = 5;
                break;

              case 14:
                processedArray = dataArray.slice(0, indexNumber + 1);

              case 15:
                if (!(_this18.data instanceof Array)) {
                  _context17.next = 19;
                  break;
                }

                return _context17.abrupt("return", processedArray);

              case 19:
                return _context17.abrupt("return", new Set(processedArray));

              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      })));
      return koconutToReturn;
    }
  }, {
    key: "dropWhile",
    value: function dropWhile(predicate) {
      var _this19 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
        var processedArray, dataArray, indexNumber, eachIndex;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                processedArray = new Array();

                if (!(_this19.data != null)) {
                  _context18.next = 15;
                  break;
                }

                dataArray = Array.from(_this19.data);
                indexNumber = dataArray.length;
                _context18.t0 = _regenerator["default"].keys(dataArray);

              case 5:
                if ((_context18.t1 = _context18.t0()).done) {
                  _context18.next = 14;
                  break;
                }

                eachIndex = _context18.t1.value;
                _context18.next = 9;
                return predicate(dataArray[eachIndex]);

              case 9:
                if (_context18.sent) {
                  _context18.next = 12;
                  break;
                }

                indexNumber = parseInt(eachIndex);
                return _context18.abrupt("break", 14);

              case 12:
                _context18.next = 5;
                break;

              case 14:
                processedArray = dataArray.slice(indexNumber);

              case 15:
                if (!(_this19.data instanceof Array)) {
                  _context18.next = 19;
                  break;
                }

                return _context18.abrupt("return", processedArray);

              case 19:
                return _context18.abrupt("return", new Set(processedArray));

              case 20:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      })));
      return koconutToReturn;
    }
  }, {
    key: "elementAt",
    value: function elementAt(index) {
      var _this20 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
        var foundData;
        return _regenerator["default"].wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                foundData = Array.from(_this20.data)[index];

                if (!(foundData == undefined)) {
                  _context19.next = 3;
                  break;
                }

                throw new _module.KoconutIndexOutOfBoundsException("Cannot search for data at index of ".concat(index));

              case 3:
                return _context19.abrupt("return", foundData);

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      })));
      return koconutToReturn;
    }
  }, {
    key: "elementAtOrElse",
    value: function elementAtOrElse(index, defaultValue) {
      var _this21 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
        var foundData;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (!(_this21.data == null)) {
                  _context20.next = 2;
                  break;
                }

                return _context20.abrupt("return", defaultValue(index));

              case 2:
                foundData = Array.from(_this21.data)[index];
                return _context20.abrupt("return", foundData ? foundData : defaultValue(index));

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      })));
      return koconutToReturn;
    }
  }, {
    key: "elementAtOrNull",
    value: function elementAtOrNull(index) {
      var _this22 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
        var foundData;
        return _regenerator["default"].wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                if (!(_this22.data == null)) {
                  _context21.next = 2;
                  break;
                }

                return _context21.abrupt("return", null);

              case 2:
                foundData = Array.from(_this22.data)[index];
                return _context21.abrupt("return", foundData ? foundData : null);

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var _this23 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
        var processedArray, _iterator14, _step14, eachDatum;

        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                processedArray = new Array();

                if (!(_this23.data != null)) {
                  _context22.next = 21;
                  break;
                }

                _iterator14 = _createForOfIteratorHelper(_this23.data);
                _context22.prev = 3;

                _iterator14.s();

              case 5:
                if ((_step14 = _iterator14.n()).done) {
                  _context22.next = 13;
                  break;
                }

                eachDatum = _step14.value;
                _context22.next = 9;
                return predicate(eachDatum);

              case 9:
                if (!_context22.sent) {
                  _context22.next = 11;
                  break;
                }

                processedArray.push(eachDatum);

              case 11:
                _context22.next = 5;
                break;

              case 13:
                _context22.next = 18;
                break;

              case 15:
                _context22.prev = 15;
                _context22.t0 = _context22["catch"](3);

                _iterator14.e(_context22.t0);

              case 18:
                _context22.prev = 18;

                _iterator14.f();

                return _context22.finish(18);

              case 21:
                if (!(_this23.data instanceof Array)) {
                  _context22.next = 25;
                  break;
                }

                return _context22.abrupt("return", processedArray);

              case 25:
                return _context22.abrupt("return", new Set(processedArray));

              case 26:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterIndexed",
    value: function filterIndexed(predicate) {
      var _this24 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
        var processedArray, _iterator15, _step15, _step15$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                processedArray = new Array();

                if (!(_this24.data != null)) {
                  _context23.next = 21;
                  break;
                }

                _iterator15 = _createForOfIteratorHelper(Array.from(_this24.data).entries());
                _context23.prev = 3;

                _iterator15.s();

              case 5:
                if ((_step15 = _iterator15.n()).done) {
                  _context23.next = 13;
                  break;
                }

                _step15$value = (0, _slicedToArray2["default"])(_step15.value, 2), eachIndex = _step15$value[0], eachDatum = _step15$value[1];
                _context23.next = 9;
                return predicate(eachIndex, eachDatum);

              case 9:
                if (!_context23.sent) {
                  _context23.next = 11;
                  break;
                }

                processedArray.push(eachDatum);

              case 11:
                _context23.next = 5;
                break;

              case 13:
                _context23.next = 18;
                break;

              case 15:
                _context23.prev = 15;
                _context23.t0 = _context23["catch"](3);

                _iterator15.e(_context23.t0);

              case 18:
                _context23.prev = 18;

                _iterator15.f();

                return _context23.finish(18);

              case 21:
                if (!(_this24.data instanceof Array)) {
                  _context23.next = 25;
                  break;
                }

                return _context23.abrupt("return", processedArray);

              case 25:
                return _context23.abrupt("return", new Set(processedArray));

              case 26:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterIndexedTo",
    value: function filterIndexedTo(destination, predicate) {
      var _this25 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
        var _iterator16, _step16, _step16$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                if (!(_this25.data != null)) {
                  _context24.next = 20;
                  break;
                }

                _iterator16 = _createForOfIteratorHelper(Array.from(_this25.data).entries());
                _context24.prev = 2;

                _iterator16.s();

              case 4:
                if ((_step16 = _iterator16.n()).done) {
                  _context24.next = 12;
                  break;
                }

                _step16$value = (0, _slicedToArray2["default"])(_step16.value, 2), eachIndex = _step16$value[0], eachDatum = _step16$value[1];
                _context24.next = 8;
                return predicate(eachIndex, eachDatum);

              case 8:
                if (!_context24.sent) {
                  _context24.next = 10;
                  break;
                }

                if (destination instanceof Array) destination.push(eachDatum);else destination.add(eachDatum);

              case 10:
                _context24.next = 4;
                break;

              case 12:
                _context24.next = 17;
                break;

              case 14:
                _context24.prev = 14;
                _context24.t0 = _context24["catch"](2);

                _iterator16.e(_context24.t0);

              case 17:
                _context24.prev = 17;

                _iterator16.f();

                return _context24.finish(17);

              case 20:
                return _context24.abrupt("return", _this25.data);

              case 21:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    } // filterIsInstance
    // filterIsInstanceTo

  }, {
    key: "filterNot",
    value: function filterNot(predicate) {
      var _this26 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
        var processedArray, _iterator17, _step17, eachDatum;

        return _regenerator["default"].wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                processedArray = new Array();

                if (!(_this26.data != null)) {
                  _context25.next = 21;
                  break;
                }

                _iterator17 = _createForOfIteratorHelper(_this26.data);
                _context25.prev = 3;

                _iterator17.s();

              case 5:
                if ((_step17 = _iterator17.n()).done) {
                  _context25.next = 13;
                  break;
                }

                eachDatum = _step17.value;
                _context25.next = 9;
                return predicate(eachDatum);

              case 9:
                if (_context25.sent) {
                  _context25.next = 11;
                  break;
                }

                processedArray.push(eachDatum);

              case 11:
                _context25.next = 5;
                break;

              case 13:
                _context25.next = 18;
                break;

              case 15:
                _context25.prev = 15;
                _context25.t0 = _context25["catch"](3);

                _iterator17.e(_context25.t0);

              case 18:
                _context25.prev = 18;

                _iterator17.f();

                return _context25.finish(18);

              case 21:
                if (!(_this26.data instanceof Array)) {
                  _context25.next = 25;
                  break;
                }

                return _context25.abrupt("return", processedArray);

              case 25:
                return _context25.abrupt("return", new Set(processedArray));

              case 26:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterNotNull",
    value: function filterNotNull() {
      var _this27 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
        var processedArray, _iterator18, _step18, eachDatum;

        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                processedArray = new Array();

                if (_this27.data != null) {
                  _iterator18 = _createForOfIteratorHelper(_this27.data);

                  try {
                    for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
                      eachDatum = _step18.value;
                      if (eachDatum != null) processedArray.push(eachDatum);
                    }
                  } catch (err) {
                    _iterator18.e(err);
                  } finally {
                    _iterator18.f();
                  }
                }

                if (!(_this27.data instanceof Array)) {
                  _context26.next = 6;
                  break;
                }

                return _context26.abrupt("return", processedArray);

              case 6:
                return _context26.abrupt("return", new Set(processedArray));

              case 7:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterNotNullTo",
    value: function filterNotNullTo(destination) {
      var _this28 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
        var _iterator19, _step19, eachDatum;

        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (_this28.data != null) {
                  _iterator19 = _createForOfIteratorHelper(_this28.data);

                  try {
                    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                      eachDatum = _step19.value;
                      if (eachDatum != null) if (destination instanceof Array) destination.push(eachDatum);else destination.add(eachDatum);
                    }
                  } catch (err) {
                    _iterator19.e(err);
                  } finally {
                    _iterator19.f();
                  }
                }

                return _context27.abrupt("return", _this28.data);

              case 2:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      })));
      return koconutToReturn;
    }
  }, {
    key: "filterNotTo",
    value: function filterNotTo(destination, predicate) {
      var _this29 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
        var _iterator20, _step20, eachDatum;

        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!(_this29.data != null)) {
                  _context28.next = 20;
                  break;
                }

                _iterator20 = _createForOfIteratorHelper(_this29.data);
                _context28.prev = 2;

                _iterator20.s();

              case 4:
                if ((_step20 = _iterator20.n()).done) {
                  _context28.next = 12;
                  break;
                }

                eachDatum = _step20.value;
                _context28.next = 8;
                return predicate(eachDatum);

              case 8:
                if (_context28.sent) {
                  _context28.next = 10;
                  break;
                }

                if (destination instanceof Array) destination.push(eachDatum);else destination.add(eachDatum);

              case 10:
                _context28.next = 4;
                break;

              case 12:
                _context28.next = 17;
                break;

              case 14:
                _context28.prev = 14;
                _context28.t0 = _context28["catch"](2);

                _iterator20.e(_context28.t0);

              case 17:
                _context28.prev = 17;

                _iterator20.f();

                return _context28.finish(17);

              case 20:
                return _context28.abrupt("return", _this29.data);

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
    key: "filterTo",
    value: function filterTo(destination, predicate) {
      var _this30 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
        var _iterator21, _step21, eachDatum;

        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                if (!(_this30.data != null)) {
                  _context29.next = 20;
                  break;
                }

                _iterator21 = _createForOfIteratorHelper(_this30.data);
                _context29.prev = 2;

                _iterator21.s();

              case 4:
                if ((_step21 = _iterator21.n()).done) {
                  _context29.next = 12;
                  break;
                }

                eachDatum = _step21.value;
                _context29.next = 8;
                return predicate(eachDatum);

              case 8:
                if (!_context29.sent) {
                  _context29.next = 10;
                  break;
                }

                if (destination instanceof Array) destination.push(eachDatum);else destination.add(eachDatum);

              case 10:
                _context29.next = 4;
                break;

              case 12:
                _context29.next = 17;
                break;

              case 14:
                _context29.prev = 14;
                _context29.t0 = _context29["catch"](2);

                _iterator21.e(_context29.t0);

              case 17:
                _context29.prev = 17;

                _iterator21.f();

                return _context29.finish(17);

              case 20:
                return _context29.abrupt("return", _this30.data);

              case 21:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "find",
    value: function find(predicate) {
      var _this31 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
        var _iterator22, _step22, eachDatum;

        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                if (!(_this31.data == null)) {
                  _context30.next = 2;
                  break;
                }

                return _context30.abrupt("return", null);

              case 2:
                _iterator22 = _createForOfIteratorHelper(_this31.data);
                _context30.prev = 3;

                _iterator22.s();

              case 5:
                if ((_step22 = _iterator22.n()).done) {
                  _context30.next = 13;
                  break;
                }

                eachDatum = _step22.value;
                _context30.next = 9;
                return predicate(eachDatum);

              case 9:
                if (!_context30.sent) {
                  _context30.next = 11;
                  break;
                }

                return _context30.abrupt("return", eachDatum);

              case 11:
                _context30.next = 5;
                break;

              case 13:
                _context30.next = 18;
                break;

              case 15:
                _context30.prev = 15;
                _context30.t0 = _context30["catch"](3);

                _iterator22.e(_context30.t0);

              case 18:
                _context30.prev = 18;

                _iterator22.f();

                return _context30.finish(18);

              case 21:
                return _context30.abrupt("return", null);

              case 22:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "findLast",
    value: function findLast(predicate) {
      var _this32 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (!(_this32.data == null)) {
                  _context31.next = 2;
                  break;
                }

                return _context31.abrupt("return", null);

              case 2:
                dataArray = Array.from(_this32.data);
                eachIndex = dataArray.length - 1;

              case 4:
                if (!(eachIndex >= 0)) {
                  _context31.next = 12;
                  break;
                }

                _context31.next = 7;
                return predicate(dataArray[eachIndex]);

              case 7:
                if (!_context31.sent) {
                  _context31.next = 9;
                  break;
                }

                return _context31.abrupt("return", dataArray[eachIndex]);

              case 9:
                eachIndex--;
                _context31.next = 4;
                break;

              case 12:
                return _context31.abrupt("return", null);

              case 13:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      })));
      return koconutToReturn;
    }
  }, {
    key: "first",
    value: function first() {
      var _this33 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
        var _iterator23, _step23, eachDatum;

        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                if (!(_this33.data == null || _this33.mSize == 0)) {
                  _context32.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                if (!predicate) {
                  _context32.next = 23;
                  break;
                }

                _iterator23 = _createForOfIteratorHelper(_this33.data);
                _context32.prev = 4;

                _iterator23.s();

              case 6:
                if ((_step23 = _iterator23.n()).done) {
                  _context32.next = 14;
                  break;
                }

                eachDatum = _step23.value;
                _context32.next = 10;
                return predicate(eachDatum);

              case 10:
                if (!_context32.sent) {
                  _context32.next = 12;
                  break;
                }

                return _context32.abrupt("return", eachDatum);

              case 12:
                _context32.next = 6;
                break;

              case 14:
                _context32.next = 19;
                break;

              case 16:
                _context32.prev = 16;
                _context32.t0 = _context32["catch"](4);

                _iterator23.e(_context32.t0);

              case 19:
                _context32.prev = 19;

                _iterator23.f();

                return _context32.finish(19);

              case 22:
                throw new _module.KoconutNoSuchElementException("No such element is found");

              case 23:
                return _context32.abrupt("return", Array.from(_this33.data)[0]);

              case 24:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "firstOrNull",
    value: function firstOrNull() {
      var _this34 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
        var _iterator24, _step24, eachDatum;

        return _regenerator["default"].wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                if (!(_this34.data == null || _this34.mSize == 0)) {
                  _context33.next = 2;
                  break;
                }

                return _context33.abrupt("return", null);

              case 2:
                if (!predicate) {
                  _context33.next = 23;
                  break;
                }

                _iterator24 = _createForOfIteratorHelper(_this34.data);
                _context33.prev = 4;

                _iterator24.s();

              case 6:
                if ((_step24 = _iterator24.n()).done) {
                  _context33.next = 14;
                  break;
                }

                eachDatum = _step24.value;
                _context33.next = 10;
                return predicate(eachDatum);

              case 10:
                if (!_context33.sent) {
                  _context33.next = 12;
                  break;
                }

                return _context33.abrupt("return", eachDatum);

              case 12:
                _context33.next = 6;
                break;

              case 14:
                _context33.next = 19;
                break;

              case 16:
                _context33.prev = 16;
                _context33.t0 = _context33["catch"](4);

                _iterator24.e(_context33.t0);

              case 19:
                _context33.prev = 19;

                _iterator24.f();

                return _context33.finish(19);

              case 22:
                return _context33.abrupt("return", null);

              case 23:
                return _context33.abrupt("return", Array.from(_this34.data)[0]);

              case 24:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "flatMapIndexed",
    value: function flatMapIndexed(transform) {
      var _this35 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
        var processedArray, _iterator25, _step25, _step25$value, eachIndex, eachDatum, _iterator26, _step26, eachSubElement;

        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                processedArray = new Array();

                if (!(_this35.data != null)) {
                  _context34.next = 23;
                  break;
                }

                _iterator25 = _createForOfIteratorHelper(Array.from(_this35.data).entries());
                _context34.prev = 3;

                _iterator25.s();

              case 5:
                if ((_step25 = _iterator25.n()).done) {
                  _context34.next = 15;
                  break;
                }

                _step25$value = (0, _slicedToArray2["default"])(_step25.value, 2), eachIndex = _step25$value[0], eachDatum = _step25$value[1];
                _context34.t0 = _createForOfIteratorHelper;
                _context34.next = 10;
                return transform(eachIndex, eachDatum);

              case 10:
                _context34.t1 = _context34.sent;
                _iterator26 = (0, _context34.t0)(_context34.t1);

                try {
                  for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                    eachSubElement = _step26.value;
                    processedArray.push(eachSubElement);
                  }
                } catch (err) {
                  _iterator26.e(err);
                } finally {
                  _iterator26.f();
                }

              case 13:
                _context34.next = 5;
                break;

              case 15:
                _context34.next = 20;
                break;

              case 17:
                _context34.prev = 17;
                _context34.t2 = _context34["catch"](3);

                _iterator25.e(_context34.t2);

              case 20:
                _context34.prev = 20;

                _iterator25.f();

                return _context34.finish(20);

              case 23:
                return _context34.abrupt("return", processedArray);

              case 24:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, null, [[3, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "flatMapIndexedTo",
    value: function flatMapIndexedTo(destination, transform) {
      var _this36 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
        var _iterator27, _step27, _step27$value, eachIndex, eachDatum, _iterator28, _step28, eachSubElement;

        return _regenerator["default"].wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!(_this36.data != null)) {
                  _context35.next = 22;
                  break;
                }

                _iterator27 = _createForOfIteratorHelper(Array.from(_this36.data).entries());
                _context35.prev = 2;

                _iterator27.s();

              case 4:
                if ((_step27 = _iterator27.n()).done) {
                  _context35.next = 14;
                  break;
                }

                _step27$value = (0, _slicedToArray2["default"])(_step27.value, 2), eachIndex = _step27$value[0], eachDatum = _step27$value[1];
                _context35.t0 = _createForOfIteratorHelper;
                _context35.next = 9;
                return transform(eachIndex, eachDatum);

              case 9:
                _context35.t1 = _context35.sent;
                _iterator28 = (0, _context35.t0)(_context35.t1);

                try {
                  for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                    eachSubElement = _step28.value;
                    if (destination instanceof Array) destination.push(eachSubElement);else destination.add(eachSubElement);
                  }
                } catch (err) {
                  _iterator28.e(err);
                } finally {
                  _iterator28.f();
                }

              case 12:
                _context35.next = 4;
                break;

              case 14:
                _context35.next = 19;
                break;

              case 16:
                _context35.prev = 16;
                _context35.t2 = _context35["catch"](2);

                _iterator27.e(_context35.t2);

              case 19:
                _context35.prev = 19;

                _iterator27.f();

                return _context35.finish(19);

              case 22:
                return _context35.abrupt("return", _this36.data);

              case 23:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "flatMapTo",
    value: function flatMapTo(destination, transform) {
      var _this37 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
        var _iterator29, _step29, eachDatum, _iterator30, _step30, eachSubElement;

        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                if (!(_this37.data != null)) {
                  _context36.next = 22;
                  break;
                }

                _iterator29 = _createForOfIteratorHelper(_this37.data);
                _context36.prev = 2;

                _iterator29.s();

              case 4:
                if ((_step29 = _iterator29.n()).done) {
                  _context36.next = 14;
                  break;
                }

                eachDatum = _step29.value;
                _context36.t0 = _createForOfIteratorHelper;
                _context36.next = 9;
                return transform(eachDatum);

              case 9:
                _context36.t1 = _context36.sent;
                _iterator30 = (0, _context36.t0)(_context36.t1);

                try {
                  for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                    eachSubElement = _step30.value;
                    if (destination instanceof Array) destination.push(eachSubElement);else destination.add(eachSubElement);
                  }
                } catch (err) {
                  _iterator30.e(err);
                } finally {
                  _iterator30.f();
                }

              case 12:
                _context36.next = 4;
                break;

              case 14:
                _context36.next = 19;
                break;

              case 16:
                _context36.prev = 16;
                _context36.t2 = _context36["catch"](2);

                _iterator29.e(_context36.t2);

              case 19:
                _context36.prev = 19;

                _iterator29.f();

                return _context36.finish(19);

              case 22:
                return _context36.abrupt("return", _this37.data);

              case 23:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, null, [[2, 16, 19, 22]]);
      })));
      return koconutToReturn;
    } // flatten

  }, {
    key: "fold",
    value: function fold(initial, operation) {
      var _this38 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
        var dataToReturn, _iterator31, _step31, eachDatum;

        return _regenerator["default"].wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                dataToReturn = initial;

                if (!(_this38.data != null)) {
                  _context37.next = 20;
                  break;
                }

                _iterator31 = _createForOfIteratorHelper(_this38.data);
                _context37.prev = 3;

                _iterator31.s();

              case 5:
                if ((_step31 = _iterator31.n()).done) {
                  _context37.next = 12;
                  break;
                }

                eachDatum = _step31.value;
                _context37.next = 9;
                return operation(dataToReturn, eachDatum);

              case 9:
                dataToReturn = _context37.sent;

              case 10:
                _context37.next = 5;
                break;

              case 12:
                _context37.next = 17;
                break;

              case 14:
                _context37.prev = 14;
                _context37.t0 = _context37["catch"](3);

                _iterator31.e(_context37.t0);

              case 17:
                _context37.prev = 17;

                _iterator31.f();

                return _context37.finish(17);

              case 20:
                return _context37.abrupt("return", dataToReturn);

              case 21:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, null, [[3, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "foldIndexed",
    value: function foldIndexed(initial, operation) {
      var _this39 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
        var dataToReturn, _iterator32, _step32, _step32$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                dataToReturn = initial;

                if (!(_this39.data != null)) {
                  _context38.next = 20;
                  break;
                }

                _iterator32 = _createForOfIteratorHelper(Array.from(_this39.data).entries());
                _context38.prev = 3;

                _iterator32.s();

              case 5:
                if ((_step32 = _iterator32.n()).done) {
                  _context38.next = 12;
                  break;
                }

                _step32$value = (0, _slicedToArray2["default"])(_step32.value, 2), eachIndex = _step32$value[0], eachDatum = _step32$value[1];
                _context38.next = 9;
                return operation(eachIndex, dataToReturn, eachDatum);

              case 9:
                dataToReturn = _context38.sent;

              case 10:
                _context38.next = 5;
                break;

              case 12:
                _context38.next = 17;
                break;

              case 14:
                _context38.prev = 14;
                _context38.t0 = _context38["catch"](3);

                _iterator32.e(_context38.t0);

              case 17:
                _context38.prev = 17;

                _iterator32.f();

                return _context38.finish(17);

              case 20:
                return _context38.abrupt("return", dataToReturn);

              case 21:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, null, [[3, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "groupBy",
    value: function groupBy(keySelector) {
      var _this40 = this;

      var valueTransform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var keySelectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var valueTransformThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new _module.KoconutMap();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
        var processedMap, _iterator33, _step33, _processedMap$get, eachDatum, eachKey, eachValue;

        return _regenerator["default"].wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                processedMap = new Map();

                if (!(_this40.data != null)) {
                  _context39.next = 30;
                  break;
                }

                _iterator33 = _createForOfIteratorHelper(_this40.data);
                _context39.prev = 3;

                _iterator33.s();

              case 5:
                if ((_step33 = _iterator33.n()).done) {
                  _context39.next = 22;
                  break;
                }

                eachDatum = _step33.value;
                _context39.next = 9;
                return keySelector(eachDatum);

              case 9:
                eachKey = _context39.sent;

                if (!valueTransform) {
                  _context39.next = 16;
                  break;
                }

                _context39.next = 13;
                return valueTransform(eachDatum);

              case 13:
                _context39.t0 = _context39.sent;
                _context39.next = 17;
                break;

              case 16:
                _context39.t0 = eachDatum;

              case 17:
                eachValue = _context39.t0;
                if (!processedMap.has(eachKey)) processedMap.set(eachKey, new Array());
                (_processedMap$get = processedMap.get(eachKey)) === null || _processedMap$get === void 0 ? void 0 : _processedMap$get.push(eachValue);

              case 20:
                _context39.next = 5;
                break;

              case 22:
                _context39.next = 27;
                break;

              case 24:
                _context39.prev = 24;
                _context39.t1 = _context39["catch"](3);

                _iterator33.e(_context39.t1);

              case 27:
                _context39.prev = 27;

                _iterator33.f();

                return _context39.finish(27);

              case 30:
                return _context39.abrupt("return", processedMap);

              case 31:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, null, [[3, 24, 27, 30]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "groupByTo",
    value: function groupByTo(destination, keySelector) {
      var _this41 = this;

      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      keySelector = keySelector.bind(keySelectorThisArg);
      if (valueTransform) valueTransform = valueTransform.bind(valueTransformThisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
        var _iterator34, _step34, _destination$get, eachDatum, eachKey, eachValue;

        return _regenerator["default"].wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                if (!(_this41.data != null)) {
                  _context40.next = 29;
                  break;
                }

                _iterator34 = _createForOfIteratorHelper(_this41.data);
                _context40.prev = 2;

                _iterator34.s();

              case 4:
                if ((_step34 = _iterator34.n()).done) {
                  _context40.next = 21;
                  break;
                }

                eachDatum = _step34.value;
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
                if (!destination.has(eachKey)) destination.set(eachKey, new Array());
                (_destination$get = destination.get(eachKey)) === null || _destination$get === void 0 ? void 0 : _destination$get.push(eachValue);

              case 19:
                _context40.next = 4;
                break;

              case 21:
                _context40.next = 26;
                break;

              case 23:
                _context40.prev = 23;
                _context40.t1 = _context40["catch"](2);

                _iterator34.e(_context40.t1);

              case 26:
                _context40.prev = 26;

                _iterator34.f();

                return _context40.finish(26);

              case 29:
                return _context40.abrupt("return", _this41.data);

              case 30:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, null, [[2, 23, 26, 29]]);
      })));
      return koconutToReturn;
    } // groupingBy

  }, {
    key: "indexOf",
    value: function indexOf(elementToFind) {
      var _this42 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
        var _iterator35, _step35, _step35$value, _index, _element;

        return _regenerator["default"].wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                if (!(_this42.data != null)) {
                  _context41.next = 18;
                  break;
                }

                _iterator35 = _createForOfIteratorHelper(Array.from(_this42.data).entries());
                _context41.prev = 2;

                _iterator35.s();

              case 4:
                if ((_step35 = _iterator35.n()).done) {
                  _context41.next = 10;
                  break;
                }

                _step35$value = (0, _slicedToArray2["default"])(_step35.value, 2), _index = _step35$value[0], _element = _step35$value[1];

                if (!(_module.KoconutTypeChecker.checkIsEquatable(_element) && _element.equalsTo(elementToFind) || !_module.KoconutTypeChecker.checkIsEquatable(_element) && _element == elementToFind)) {
                  _context41.next = 8;
                  break;
                }

                return _context41.abrupt("return", _index);

              case 8:
                _context41.next = 4;
                break;

              case 10:
                _context41.next = 15;
                break;

              case 12:
                _context41.prev = 12;
                _context41.t0 = _context41["catch"](2);

                _iterator35.e(_context41.t0);

              case 15:
                _context41.prev = 15;

                _iterator35.f();

                return _context41.finish(15);

              case 18:
                return _context41.abrupt("return", -1);

              case 19:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, null, [[2, 12, 15, 18]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "indexOfFirst",
    value: function indexOfFirst(predicate) {
      var _this43 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
        var _iterator36, _step36, _step36$value, _index2, _element2;

        return _regenerator["default"].wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                if (!(_this43.data != null)) {
                  _context42.next = 20;
                  break;
                }

                _iterator36 = _createForOfIteratorHelper(Array.from(_this43.data).entries());
                _context42.prev = 2;

                _iterator36.s();

              case 4:
                if ((_step36 = _iterator36.n()).done) {
                  _context42.next = 12;
                  break;
                }

                _step36$value = (0, _slicedToArray2["default"])(_step36.value, 2), _index2 = _step36$value[0], _element2 = _step36$value[1];
                _context42.next = 8;
                return predicate(_element2);

              case 8:
                if (!_context42.sent) {
                  _context42.next = 10;
                  break;
                }

                return _context42.abrupt("return", _index2);

              case 10:
                _context42.next = 4;
                break;

              case 12:
                _context42.next = 17;
                break;

              case 14:
                _context42.prev = 14;
                _context42.t0 = _context42["catch"](2);

                _iterator36.e(_context42.t0);

              case 17:
                _context42.prev = 17;

                _iterator36.f();

                return _context42.finish(17);

              case 20:
                return _context42.abrupt("return", -1);

              case 21:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "indexOfLast",
    value: function indexOfLast(predicate) {
      var _this44 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (!(_this44.data != null)) {
                  _context43.next = 11;
                  break;
                }

                dataArray = Array.from(_this44.data);
                eachIndex = dataArray.length - 1;

              case 3:
                if (!(eachIndex >= 0)) {
                  _context43.next = 11;
                  break;
                }

                _context43.next = 6;
                return predicate(dataArray[eachIndex]);

              case 6:
                if (!_context43.sent) {
                  _context43.next = 8;
                  break;
                }

                return _context43.abrupt("return", eachIndex);

              case 8:
                eachIndex--;
                _context43.next = 3;
                break;

              case 11:
                return _context43.abrupt("return", -1);

              case 12:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43);
      })));
      return koconutToReturn;
    }
  }, {
    key: "intersect",
    value: function intersect(other) {
      var _this45 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
        var processedSet, otherArray, _iterator37, _step37, eachDatum;

        return _regenerator["default"].wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                processedSet = new Set();

                if (!_this45.data) {
                  _context44.next = 22;
                  break;
                }

                otherArray = _module.KoconutArray.from(other);
                _iterator37 = _createForOfIteratorHelper(_this45.data);
                _context44.prev = 4;

                _iterator37.s();

              case 6:
                if ((_step37 = _iterator37.n()).done) {
                  _context44.next = 14;
                  break;
                }

                eachDatum = _step37.value;
                _context44.next = 10;
                return otherArray.contains(eachDatum)["yield"]();

              case 10:
                if (!_context44.sent) {
                  _context44.next = 12;
                  break;
                }

                processedSet.add(eachDatum);

              case 12:
                _context44.next = 6;
                break;

              case 14:
                _context44.next = 19;
                break;

              case 16:
                _context44.prev = 16;
                _context44.t0 = _context44["catch"](4);

                _iterator37.e(_context44.t0);

              case 19:
                _context44.prev = 19;

                _iterator37.f();

                return _context44.finish(19);

              case 22:
                return _context44.abrupt("return", processedSet);

              case 23:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "isNotEmpty",
    value: function isNotEmpty() {
      var _this46 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
        return _regenerator["default"].wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                return _context45.abrupt("return", Array.from(_this46.data).length != 0);

              case 1:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45);
      })));
      return koconutToReturn;
    }
  }, {
    key: "isNullOrEmpty",
    value: function isNullOrEmpty() {
      var _this47 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
        return _regenerator["default"].wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                return _context46.abrupt("return", _this47.data == null || _this47.mSize == 0);

              case 1:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46);
      })));
      return koconutToReturn;
    } // joinTo
    // joinToString

  }, {
    key: "join",
    value: function join() {
      var _this48 = this;

      var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ", ";
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
      var truncated = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "...";
      var transform = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var thisArg = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee47() {
        var resultString, currentCount, length, _iterator38, _step38, eachDatum;

        return _regenerator["default"].wrap(function _callee47$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                resultString = prefix;

                if (!(_this48.data != null)) {
                  _context47.next = 33;
                  break;
                }

                currentCount = 0;
                length = _this48.mSize;
                _iterator38 = _createForOfIteratorHelper(_this48.data);
                _context47.prev = 5;

                _iterator38.s();

              case 7:
                if ((_step38 = _iterator38.n()).done) {
                  _context47.next = 25;
                  break;
                }

                eachDatum = _step38.value;

                if (!(currentCount == limit)) {
                  _context47.next = 12;
                  break;
                }

                resultString += truncated;
                return _context47.abrupt("break", 25);

              case 12:
                _context47.t0 = resultString;

                if (!transform) {
                  _context47.next = 19;
                  break;
                }

                _context47.next = 16;
                return transform(eachDatum);

              case 16:
                _context47.t1 = _context47.sent;
                _context47.next = 20;
                break;

              case 19:
                _context47.t1 = eachDatum;

              case 20:
                resultString = _context47.t0 += _context47.t1;
                currentCount++;
                if (currentCount != length && currentCount != limit) resultString += separator;

              case 23:
                _context47.next = 7;
                break;

              case 25:
                _context47.next = 30;
                break;

              case 27:
                _context47.prev = 27;
                _context47.t2 = _context47["catch"](5);

                _iterator38.e(_context47.t2);

              case 30:
                _context47.prev = 30;

                _iterator38.f();

                return _context47.finish(30);

              case 33:
                resultString += postfix;
                return _context47.abrupt("return", resultString);

              case 35:
              case "end":
                return _context47.stop();
            }
          }
        }, _callee47, null, [[5, 27, 30, 33]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "last",
    value: function last() {
      var _this49 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee48() {
        var dataArray, eachIndex;
        return _regenerator["default"].wrap(function _callee48$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                if (!(_this49.data == null || _this49.mSize == 0)) {
                  _context48.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                dataArray = Array.from(_this49.data);

                if (!predicate) {
                  _context48.next = 14;
                  break;
                }

                eachIndex = dataArray.length;

              case 5:
                if (!(eachIndex >= 0)) {
                  _context48.next = 13;
                  break;
                }

                _context48.next = 8;
                return predicate(dataArray[eachIndex]);

              case 8:
                if (!_context48.sent) {
                  _context48.next = 10;
                  break;
                }

                return _context48.abrupt("return", dataArray[eachIndex]);

              case 10:
                eachIndex--;
                _context48.next = 5;
                break;

              case 13:
                throw new _module.KoconutNoSuchElementException("No such element is found");

              case 14:
                return _context48.abrupt("return", dataArray[dataArray.length - 1]);

              case 15:
              case "end":
                return _context48.stop();
            }
          }
        }, _callee48);
      })));
      return koconutToReturn;
    }
  }, {
    key: "lastIndexOf",
    value: function lastIndexOf(element) {
      var _this50 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee49() {
        var dataArray, eachIndex, eachElement;
        return _regenerator["default"].wrap(function _callee49$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                if (!(_this50.data != null)) {
                  _context49.next = 10;
                  break;
                }

                dataArray = Array.from(_this50.data);
                eachIndex = dataArray.length - 1;

              case 3:
                if (!(eachIndex >= 0)) {
                  _context49.next = 10;
                  break;
                }

                eachElement = dataArray[eachIndex];

                if (!(_module.KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement.equalsTo(element) || !_module.KoconutTypeChecker.checkIsEquatable(eachElement) && eachElement == element)) {
                  _context49.next = 7;
                  break;
                }

                return _context49.abrupt("return", eachIndex);

              case 7:
                eachIndex--;
                _context49.next = 3;
                break;

              case 10:
                return _context49.abrupt("return", -1);

              case 11:
              case "end":
                return _context49.stop();
            }
          }
        }, _callee49);
      })));
      return koconutToReturn;
    }
  }, {
    key: "lastOrNull",
    value: function lastOrNull() {
      var _this51 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee50() {
        var dataArray, length, eachIndex;
        return _regenerator["default"].wrap(function _callee50$(_context50) {
          while (1) {
            switch (_context50.prev = _context50.next) {
              case 0:
                if (!(_this51.data != null)) {
                  _context50.next = 18;
                  break;
                }

                dataArray = Array.from(_this51.data);
                length = dataArray.length;

                if (!(length == 0)) {
                  _context50.next = 5;
                  break;
                }

                return _context50.abrupt("return", null);

              case 5:
                if (!predicate) {
                  _context50.next = 17;
                  break;
                }

                eachIndex = length - 1;

              case 7:
                if (!(eachIndex >= 0)) {
                  _context50.next = 15;
                  break;
                }

                _context50.next = 10;
                return predicate(dataArray[eachIndex]);

              case 10:
                if (!_context50.sent) {
                  _context50.next = 12;
                  break;
                }

                return _context50.abrupt("return", dataArray[eachIndex] != undefined ? dataArray[eachIndex] : null);

              case 12:
                eachIndex--;
                _context50.next = 7;
                break;

              case 15:
                _context50.next = 18;
                break;

              case 17:
                return _context50.abrupt("return", dataArray[length - 1] != undefined ? dataArray[length - 1] : null);

              case 18:
                return _context50.abrupt("return", null);

              case 19:
              case "end":
                return _context50.stop();
            }
          }
        }, _callee50);
      })));
      return koconutToReturn;
    }
  }, {
    key: "map",
    value: function map(transform) {
      var _this52 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee51() {
        var processedArray, _iterator39, _step39, eachDatum;

        return _regenerator["default"].wrap(function _callee51$(_context51) {
          while (1) {
            switch (_context51.prev = _context51.next) {
              case 0:
                processedArray = new Array();

                if (!(_this52.data != null)) {
                  _context51.next = 22;
                  break;
                }

                _iterator39 = _createForOfIteratorHelper(_this52.data);
                _context51.prev = 3;

                _iterator39.s();

              case 5:
                if ((_step39 = _iterator39.n()).done) {
                  _context51.next = 14;
                  break;
                }

                eachDatum = _step39.value;
                _context51.t0 = processedArray;
                _context51.next = 10;
                return transform(eachDatum);

              case 10:
                _context51.t1 = _context51.sent;

                _context51.t0.push.call(_context51.t0, _context51.t1);

              case 12:
                _context51.next = 5;
                break;

              case 14:
                _context51.next = 19;
                break;

              case 16:
                _context51.prev = 16;
                _context51.t2 = _context51["catch"](3);

                _iterator39.e(_context51.t2);

              case 19:
                _context51.prev = 19;

                _iterator39.f();

                return _context51.finish(19);

              case 22:
                return _context51.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context51.stop();
            }
          }
        }, _callee51, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapIndexed",
    value: function mapIndexed(transform) {
      var _this53 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee52() {
        var processedArray, _iterator40, _step40, _step40$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee52$(_context52) {
          while (1) {
            switch (_context52.prev = _context52.next) {
              case 0:
                processedArray = new Array();

                if (!(_this53.data != null)) {
                  _context52.next = 22;
                  break;
                }

                _iterator40 = _createForOfIteratorHelper(Array.from(_this53.data).entries());
                _context52.prev = 3;

                _iterator40.s();

              case 5:
                if ((_step40 = _iterator40.n()).done) {
                  _context52.next = 14;
                  break;
                }

                _step40$value = (0, _slicedToArray2["default"])(_step40.value, 2), eachIndex = _step40$value[0], eachDatum = _step40$value[1];
                _context52.t0 = processedArray;
                _context52.next = 10;
                return transform(eachIndex, eachDatum);

              case 10:
                _context52.t1 = _context52.sent;

                _context52.t0.push.call(_context52.t0, _context52.t1);

              case 12:
                _context52.next = 5;
                break;

              case 14:
                _context52.next = 19;
                break;

              case 16:
                _context52.prev = 16;
                _context52.t2 = _context52["catch"](3);

                _iterator40.e(_context52.t2);

              case 19:
                _context52.prev = 19;

                _iterator40.f();

                return _context52.finish(19);

              case 22:
                return _context52.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context52.stop();
            }
          }
        }, _callee52, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapIndexedNotNull",
    value: function mapIndexedNotNull(transform) {
      var _this54 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee53() {
        var processedArray, _iterator41, _step41, _step41$value, eachIndex, eachDatum, eachResultData;

        return _regenerator["default"].wrap(function _callee53$(_context53) {
          while (1) {
            switch (_context53.prev = _context53.next) {
              case 0:
                processedArray = new Array();

                if (!(_this54.data != null)) {
                  _context53.next = 21;
                  break;
                }

                _iterator41 = _createForOfIteratorHelper(Array.from(_this54.data).entries());
                _context53.prev = 3;

                _iterator41.s();

              case 5:
                if ((_step41 = _iterator41.n()).done) {
                  _context53.next = 13;
                  break;
                }

                _step41$value = (0, _slicedToArray2["default"])(_step41.value, 2), eachIndex = _step41$value[0], eachDatum = _step41$value[1];
                _context53.next = 9;
                return transform(eachIndex, eachDatum);

              case 9:
                eachResultData = _context53.sent;
                if (eachResultData != null && eachResultData != undefined) processedArray.push(eachResultData);

              case 11:
                _context53.next = 5;
                break;

              case 13:
                _context53.next = 18;
                break;

              case 15:
                _context53.prev = 15;
                _context53.t0 = _context53["catch"](3);

                _iterator41.e(_context53.t0);

              case 18:
                _context53.prev = 18;

                _iterator41.f();

                return _context53.finish(18);

              case 21:
                return _context53.abrupt("return", processedArray);

              case 22:
              case "end":
                return _context53.stop();
            }
          }
        }, _callee53, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapIndexedNotNullTo",
    value: function mapIndexedNotNullTo(destination, transform) {
      var _this55 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee54() {
        var _iterator42, _step42, _step42$value, eachIndex, eachDatum, eachResultData;

        return _regenerator["default"].wrap(function _callee54$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                if (!(_this55.data != null)) {
                  _context54.next = 20;
                  break;
                }

                _iterator42 = _createForOfIteratorHelper(Array.from(_this55.data).entries());
                _context54.prev = 2;

                _iterator42.s();

              case 4:
                if ((_step42 = _iterator42.n()).done) {
                  _context54.next = 12;
                  break;
                }

                _step42$value = (0, _slicedToArray2["default"])(_step42.value, 2), eachIndex = _step42$value[0], eachDatum = _step42$value[1];
                _context54.next = 8;
                return transform(eachIndex, eachDatum);

              case 8:
                eachResultData = _context54.sent;
                if (eachResultData != null && eachResultData != undefined) if (destination instanceof Array) destination.push(eachResultData);else destination.add(eachResultData);

              case 10:
                _context54.next = 4;
                break;

              case 12:
                _context54.next = 17;
                break;

              case 14:
                _context54.prev = 14;
                _context54.t0 = _context54["catch"](2);

                _iterator42.e(_context54.t0);

              case 17:
                _context54.prev = 17;

                _iterator42.f();

                return _context54.finish(17);

              case 20:
                return _context54.abrupt("return", _this55.data);

              case 21:
              case "end":
                return _context54.stop();
            }
          }
        }, _callee54, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapIndexedTo",
    value: function mapIndexedTo(destination, transform) {
      var _this56 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee55() {
        var _iterator43, _step43, _step43$value, eachIndex, eachDatum, eachResultData;

        return _regenerator["default"].wrap(function _callee55$(_context55) {
          while (1) {
            switch (_context55.prev = _context55.next) {
              case 0:
                if (!(_this56.data != null)) {
                  _context55.next = 20;
                  break;
                }

                _iterator43 = _createForOfIteratorHelper(Array.from(_this56.data).entries());
                _context55.prev = 2;

                _iterator43.s();

              case 4:
                if ((_step43 = _iterator43.n()).done) {
                  _context55.next = 12;
                  break;
                }

                _step43$value = (0, _slicedToArray2["default"])(_step43.value, 2), eachIndex = _step43$value[0], eachDatum = _step43$value[1];
                _context55.next = 8;
                return transform(eachIndex, eachDatum);

              case 8:
                eachResultData = _context55.sent;
                if (destination instanceof Array) destination.push(eachResultData);else destination.add(eachResultData);

              case 10:
                _context55.next = 4;
                break;

              case 12:
                _context55.next = 17;
                break;

              case 14:
                _context55.prev = 14;
                _context55.t0 = _context55["catch"](2);

                _iterator43.e(_context55.t0);

              case 17:
                _context55.prev = 17;

                _iterator43.f();

                return _context55.finish(17);

              case 20:
                return _context55.abrupt("return", _this56.data);

              case 21:
              case "end":
                return _context55.stop();
            }
          }
        }, _callee55, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapNotNull",
    value: function mapNotNull(transform) {
      var _this57 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee56() {
        var processedArray, _iterator44, _step44, eachDatum, dataToAdd;

        return _regenerator["default"].wrap(function _callee56$(_context56) {
          while (1) {
            switch (_context56.prev = _context56.next) {
              case 0:
                processedArray = new Array();

                if (!(_this57.data != null)) {
                  _context56.next = 21;
                  break;
                }

                _iterator44 = _createForOfIteratorHelper(_this57.data);
                _context56.prev = 3;

                _iterator44.s();

              case 5:
                if ((_step44 = _iterator44.n()).done) {
                  _context56.next = 13;
                  break;
                }

                eachDatum = _step44.value;
                _context56.next = 9;
                return transform(eachDatum);

              case 9:
                dataToAdd = _context56.sent;
                if (dataToAdd != null && dataToAdd != undefined) processedArray.push(dataToAdd);

              case 11:
                _context56.next = 5;
                break;

              case 13:
                _context56.next = 18;
                break;

              case 15:
                _context56.prev = 15;
                _context56.t0 = _context56["catch"](3);

                _iterator44.e(_context56.t0);

              case 18:
                _context56.prev = 18;

                _iterator44.f();

                return _context56.finish(18);

              case 21:
                return _context56.abrupt("return", processedArray);

              case 22:
              case "end":
                return _context56.stop();
            }
          }
        }, _callee56, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapNotNullTo",
    value: function mapNotNullTo(destination, transform) {
      var _this58 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee57() {
        var _iterator45, _step45, eachDatum, dataToAdd;

        return _regenerator["default"].wrap(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                if (!(_this58.data != null)) {
                  _context57.next = 20;
                  break;
                }

                _iterator45 = _createForOfIteratorHelper(_this58.data);
                _context57.prev = 2;

                _iterator45.s();

              case 4:
                if ((_step45 = _iterator45.n()).done) {
                  _context57.next = 12;
                  break;
                }

                eachDatum = _step45.value;
                _context57.next = 8;
                return transform(eachDatum);

              case 8:
                dataToAdd = _context57.sent;
                if (dataToAdd != null && dataToAdd != undefined) if (destination instanceof Array) destination.push(dataToAdd);else destination.add(dataToAdd);

              case 10:
                _context57.next = 4;
                break;

              case 12:
                _context57.next = 17;
                break;

              case 14:
                _context57.prev = 14;
                _context57.t0 = _context57["catch"](2);

                _iterator45.e(_context57.t0);

              case 17:
                _context57.prev = 17;

                _iterator45.f();

                return _context57.finish(17);

              case 20:
                return _context57.abrupt("return", _this58.data);

              case 21:
              case "end":
                return _context57.stop();
            }
          }
        }, _callee57, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "mapTo",
    value: function mapTo(destination, transform) {
      var _this59 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      transform = transform.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee58() {
        var _iterator46, _step46, eachDatum, dataToAdd;

        return _regenerator["default"].wrap(function _callee58$(_context58) {
          while (1) {
            switch (_context58.prev = _context58.next) {
              case 0:
                if (!(_this59.data != null)) {
                  _context58.next = 20;
                  break;
                }

                _iterator46 = _createForOfIteratorHelper(_this59.data);
                _context58.prev = 2;

                _iterator46.s();

              case 4:
                if ((_step46 = _iterator46.n()).done) {
                  _context58.next = 12;
                  break;
                }

                eachDatum = _step46.value;
                _context58.next = 8;
                return transform(eachDatum);

              case 8:
                dataToAdd = _context58.sent;
                if (destination instanceof Array) destination.push(dataToAdd);else destination.add(dataToAdd);

              case 10:
                _context58.next = 4;
                break;

              case 12:
                _context58.next = 17;
                break;

              case 14:
                _context58.prev = 14;
                _context58.t0 = _context58["catch"](2);

                _iterator46.e(_context58.t0);

              case 17:
                _context58.prev = 17;

                _iterator46.f();

                return _context58.finish(17);

              case 20:
                return _context58.abrupt("return", _this59.data);

              case 21:
              case "end":
                return _context58.stop();
            }
          }
        }, _callee58, null, [[2, 14, 17, 20]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxOfWith",
    value: function maxOfWith(selector, comparator) {
      var _this60 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee59() {
        var lastComparableDatumToReturn, _iterator47, _step47, eachDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee59$(_context59) {
          while (1) {
            switch (_context59.prev = _context59.next) {
              case 0:
                if (!(_this60.data == null || _this60.mSize == 0)) {
                  _context59.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator47 = _createForOfIteratorHelper(_this60.data);
                _context59.prev = 4;

                _iterator47.s();

              case 6:
                if ((_step47 = _iterator47.n()).done) {
                  _context59.next = 21;
                  break;
                }

                eachDatum = _step47.value;
                _context59.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context59.sent;
                _context59.t0 = lastComparableDatumToReturn == null;

                if (_context59.t0) {
                  _context59.next = 17;
                  break;
                }

                _context59.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context59.t1 = _context59.sent;
                _context59.t0 = _context59.t1 < 0;

              case 17:
                if (!_context59.t0) {
                  _context59.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context59.next = 6;
                break;

              case 21:
                _context59.next = 26;
                break;

              case 23:
                _context59.prev = 23;
                _context59.t2 = _context59["catch"](4);

                _iterator47.e(_context59.t2);

              case 26:
                _context59.prev = 26;

                _iterator47.f();

                return _context59.finish(26);

              case 29:
                return _context59.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context59.stop();
            }
          }
        }, _callee59, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxOfWithOrNull",
    value: function maxOfWithOrNull(selector, comparator) {
      var _this61 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee60() {
        var lastComparableDatumToReturn, _iterator48, _step48, eachDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee60$(_context60) {
          while (1) {
            switch (_context60.prev = _context60.next) {
              case 0:
                if (!(_this61.data == null || _this61.mSize == 0)) {
                  _context60.next = 2;
                  break;
                }

                return _context60.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator48 = _createForOfIteratorHelper(_this61.data);
                _context60.prev = 4;

                _iterator48.s();

              case 6:
                if ((_step48 = _iterator48.n()).done) {
                  _context60.next = 21;
                  break;
                }

                eachDatum = _step48.value;
                _context60.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context60.sent;
                _context60.t0 = lastComparableDatumToReturn == null;

                if (_context60.t0) {
                  _context60.next = 17;
                  break;
                }

                _context60.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context60.t1 = _context60.sent;
                _context60.t0 = _context60.t1 < 0;

              case 17:
                if (!_context60.t0) {
                  _context60.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context60.next = 6;
                break;

              case 21:
                _context60.next = 26;
                break;

              case 23:
                _context60.prev = 23;
                _context60.t2 = _context60["catch"](4);

                _iterator48.e(_context60.t2);

              case 26:
                _context60.prev = 26;

                _iterator48.f();

                return _context60.finish(26);

              case 29:
                return _context60.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context60.stop();
            }
          }
        }, _callee60, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "maxWithOrNull",
    value: function maxWithOrNull(comparator) {
      var _this62 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee61() {
        var dataToReturn, _i, _Array$from, eachDatum;

        return _regenerator["default"].wrap(function _callee61$(_context61) {
          while (1) {
            switch (_context61.prev = _context61.next) {
              case 0:
                if (!(_this62.data == null || _this62.mSize == 0)) {
                  _context61.next = 2;
                  break;
                }

                return _context61.abrupt("return", null);

              case 2:
                dataToReturn = null;
                _i = 0, _Array$from = Array.from(_this62.data);

              case 4:
                if (!(_i < _Array$from.length)) {
                  _context61.next = 17;
                  break;
                }

                eachDatum = _Array$from[_i];
                _context61.t0 = dataToReturn == null;

                if (_context61.t0) {
                  _context61.next = 12;
                  break;
                }

                _context61.next = 10;
                return comparator(dataToReturn, eachDatum);

              case 10:
                _context61.t1 = _context61.sent;
                _context61.t0 = _context61.t1 < 0;

              case 12:
                if (!_context61.t0) {
                  _context61.next = 14;
                  break;
                }

                dataToReturn = eachDatum;

              case 14:
                _i++;
                _context61.next = 4;
                break;

              case 17:
                return _context61.abrupt("return", dataToReturn);

              case 18:
              case "end":
                return _context61.stop();
            }
          }
        }, _callee61);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minByOrNull",
    value: function minByOrNull(selector) {
      var _this63 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee62() {
        var dataToReturn, lastComparableDatum, _iterator49, _step49, eachDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee62$(_context62) {
          while (1) {
            switch (_context62.prev = _context62.next) {
              case 0:
                if (!(_this63.data == null || _this63.mSize == 0)) {
                  _context62.next = 2;
                  break;
                }

                return _context62.abrupt("return", null);

              case 2:
                dataToReturn = null;
                lastComparableDatum = null;
                _iterator49 = _createForOfIteratorHelper(_this63.data);
                _context62.prev = 5;

                _iterator49.s();

              case 7:
                if ((_step49 = _iterator49.n()).done) {
                  _context62.next = 15;
                  break;
                }

                eachDatum = _step49.value;
                _context62.next = 11;
                return selector(eachDatum);

              case 11:
                eachComparableDatum = _context62.sent;

                if (lastComparableDatum == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatum) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatum > eachComparableDatum) {
                  dataToReturn = eachDatum;
                  lastComparableDatum = eachComparableDatum;
                }

              case 13:
                _context62.next = 7;
                break;

              case 15:
                _context62.next = 20;
                break;

              case 17:
                _context62.prev = 17;
                _context62.t0 = _context62["catch"](5);

                _iterator49.e(_context62.t0);

              case 20:
                _context62.prev = 20;

                _iterator49.f();

                return _context62.finish(20);

              case 23:
                return _context62.abrupt("return", dataToReturn);

              case 24:
              case "end":
                return _context62.stop();
            }
          }
        }, _callee62, null, [[5, 17, 20, 23]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOf",
    value: function minOf(selector) {
      var _this64 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee63() {
        var lastComparableDatumToReturn, _iterator50, _step50, eachDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee63$(_context63) {
          while (1) {
            switch (_context63.prev = _context63.next) {
              case 0:
                if (!(_this64.data == null || _this64.mSize == 0)) {
                  _context63.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                lastComparableDatumToReturn = null;
                _iterator50 = _createForOfIteratorHelper(_this64.data);
                _context63.prev = 4;

                _iterator50.s();

              case 6:
                if ((_step50 = _iterator50.n()).done) {
                  _context63.next = 14;
                  break;
                }

                eachDatum = _step50.value;
                _context63.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context63.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context63.next = 6;
                break;

              case 14:
                _context63.next = 19;
                break;

              case 16:
                _context63.prev = 16;
                _context63.t0 = _context63["catch"](4);

                _iterator50.e(_context63.t0);

              case 19:
                _context63.prev = 19;

                _iterator50.f();

                return _context63.finish(19);

              case 22:
                return _context63.abrupt("return", lastComparableDatumToReturn);

              case 23:
              case "end":
                return _context63.stop();
            }
          }
        }, _callee63, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfOrNull",
    value: function minOfOrNull(selector) {
      var _this65 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee64() {
        var lastComparableDatumToReturn, _iterator51, _step51, eachDatum, eachComparableDatum;

        return _regenerator["default"].wrap(function _callee64$(_context64) {
          while (1) {
            switch (_context64.prev = _context64.next) {
              case 0:
                if (!(_this65.data == null || _this65.mSize == 0)) {
                  _context64.next = 2;
                  break;
                }

                return _context64.abrupt("return", null);

              case 2:
                lastComparableDatumToReturn = null;
                _iterator51 = _createForOfIteratorHelper(_this65.data);
                _context64.prev = 4;

                _iterator51.s();

              case 6:
                if ((_step51 = _iterator51.n()).done) {
                  _context64.next = 14;
                  break;
                }

                eachDatum = _step51.value;
                _context64.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context64.sent;

                if (lastComparableDatumToReturn == null || _module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && eachComparableDatum.compareTo(lastComparableDatumToReturn) < 0 || !_module.KoconutTypeChecker.checkIsComparable(eachComparableDatum) && lastComparableDatumToReturn > eachComparableDatum) {
                  lastComparableDatumToReturn = eachComparableDatum;
                }

              case 12:
                _context64.next = 6;
                break;

              case 14:
                _context64.next = 19;
                break;

              case 16:
                _context64.prev = 16;
                _context64.t0 = _context64["catch"](4);

                _iterator51.e(_context64.t0);

              case 19:
                _context64.prev = 19;

                _iterator51.f();

                return _context64.finish(19);

              case 22:
                return _context64.abrupt("return", lastComparableDatumToReturn);

              case 23:
              case "end":
                return _context64.stop();
            }
          }
        }, _callee64, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfWith",
    value: function minOfWith(selector, comparator) {
      var _this66 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee65() {
        var lastComparableDatumToReturn, _iterator52, _step52, eachDatum, eachComparableDatum;

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
                lastComparableDatumToReturn = null;
                _iterator52 = _createForOfIteratorHelper(_this66.data);
                _context65.prev = 4;

                _iterator52.s();

              case 6:
                if ((_step52 = _iterator52.n()).done) {
                  _context65.next = 21;
                  break;
                }

                eachDatum = _step52.value;
                _context65.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context65.sent;
                _context65.t0 = lastComparableDatumToReturn == null;

                if (_context65.t0) {
                  _context65.next = 17;
                  break;
                }

                _context65.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context65.t1 = _context65.sent;
                _context65.t0 = _context65.t1 > 0;

              case 17:
                if (!_context65.t0) {
                  _context65.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context65.next = 6;
                break;

              case 21:
                _context65.next = 26;
                break;

              case 23:
                _context65.prev = 23;
                _context65.t2 = _context65["catch"](4);

                _iterator52.e(_context65.t2);

              case 26:
                _context65.prev = 26;

                _iterator52.f();

                return _context65.finish(26);

              case 29:
                return _context65.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context65.stop();
            }
          }
        }, _callee65, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minOfWithOrNull",
    value: function minOfWithOrNull(selector, comparator) {
      var _this67 = this;

      var selectorThisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var comparatorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      selector = selector.bind(selectorThisArg);
      comparator = comparator.bind(comparatorThisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee66() {
        var lastComparableDatumToReturn, _iterator53, _step53, eachDatum, eachComparableDatum;

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
                lastComparableDatumToReturn = null;
                _iterator53 = _createForOfIteratorHelper(_this67.data);
                _context66.prev = 4;

                _iterator53.s();

              case 6:
                if ((_step53 = _iterator53.n()).done) {
                  _context66.next = 21;
                  break;
                }

                eachDatum = _step53.value;
                _context66.next = 10;
                return selector(eachDatum);

              case 10:
                eachComparableDatum = _context66.sent;
                _context66.t0 = lastComparableDatumToReturn == null;

                if (_context66.t0) {
                  _context66.next = 17;
                  break;
                }

                _context66.next = 15;
                return comparator(lastComparableDatumToReturn, eachComparableDatum);

              case 15:
                _context66.t1 = _context66.sent;
                _context66.t0 = _context66.t1 > 0;

              case 17:
                if (!_context66.t0) {
                  _context66.next = 19;
                  break;
                }

                lastComparableDatumToReturn = eachComparableDatum;

              case 19:
                _context66.next = 6;
                break;

              case 21:
                _context66.next = 26;
                break;

              case 23:
                _context66.prev = 23;
                _context66.t2 = _context66["catch"](4);

                _iterator53.e(_context66.t2);

              case 26:
                _context66.prev = 26;

                _iterator53.f();

                return _context66.finish(26);

              case 29:
                return _context66.abrupt("return", lastComparableDatumToReturn);

              case 30:
              case "end":
                return _context66.stop();
            }
          }
        }, _callee66, null, [[4, 23, 26, 29]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minus",
    value: function minus(elements) {
      var _this68 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee67() {
        var processedArray, dataToExcept, koconutDataToExceptArray, _iterator54, _step54, eachDatum;

        return _regenerator["default"].wrap(function _callee67$(_context67) {
          while (1) {
            switch (_context67.prev = _context67.next) {
              case 0:
                processedArray = new Array();

                if (!(_this68.data != null)) {
                  _context67.next = 24;
                  break;
                }

                dataToExcept = new Array();
                if (typeof elements[Symbol.iterator] === 'function') dataToExcept = Array.from(elements);else dataToExcept.push(elements);
                koconutDataToExceptArray = _module.KoconutArray.from(dataToExcept);
                _iterator54 = _createForOfIteratorHelper(_this68.data);
                _context67.prev = 6;

                _iterator54.s();

              case 8:
                if ((_step54 = _iterator54.n()).done) {
                  _context67.next = 16;
                  break;
                }

                eachDatum = _step54.value;
                _context67.next = 12;
                return koconutDataToExceptArray.contains(eachDatum)["yield"]();

              case 12:
                if (_context67.sent) {
                  _context67.next = 14;
                  break;
                }

                processedArray.push(eachDatum);

              case 14:
                _context67.next = 8;
                break;

              case 16:
                _context67.next = 21;
                break;

              case 18:
                _context67.prev = 18;
                _context67.t0 = _context67["catch"](6);

                _iterator54.e(_context67.t0);

              case 21:
                _context67.prev = 21;

                _iterator54.f();

                return _context67.finish(21);

              case 24:
                if (!(_this68.data instanceof Array)) {
                  _context67.next = 28;
                  break;
                }

                return _context67.abrupt("return", processedArray);

              case 28:
                return _context67.abrupt("return", new Set(processedArray));

              case 29:
              case "end":
                return _context67.stop();
            }
          }
        }, _callee67, null, [[6, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "minusElement",
    value: function minusElement(element) {
      return this.minus(element);
    }
  }, {
    key: "minWithOrNull",
    value: function minWithOrNull(comparator) {
      var _this69 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee68() {
        var dataToReturn, _i2, _Array$from2, eachDatum;

        return _regenerator["default"].wrap(function _callee68$(_context68) {
          while (1) {
            switch (_context68.prev = _context68.next) {
              case 0:
                if (!(_this69.data == null || _this69.mSize == 0)) {
                  _context68.next = 2;
                  break;
                }

                return _context68.abrupt("return", null);

              case 2:
                dataToReturn = null;
                _i2 = 0, _Array$from2 = Array.from(_this69.data);

              case 4:
                if (!(_i2 < _Array$from2.length)) {
                  _context68.next = 17;
                  break;
                }

                eachDatum = _Array$from2[_i2];
                _context68.t0 = dataToReturn == null;

                if (_context68.t0) {
                  _context68.next = 12;
                  break;
                }

                _context68.next = 10;
                return comparator(dataToReturn, eachDatum);

              case 10:
                _context68.t1 = _context68.sent;
                _context68.t0 = _context68.t1 > 0;

              case 12:
                if (!_context68.t0) {
                  _context68.next = 14;
                  break;
                }

                dataToReturn = eachDatum;

              case 14:
                _i2++;
                _context68.next = 4;
                break;

              case 17:
                return _context68.abrupt("return", dataToReturn);

              case 18:
              case "end":
                return _context68.stop();
            }
          }
        }, _callee68);
      })));
      return koconutToReturn;
    }
  }, {
    key: "none",
    value: function none() {
      var _this70 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee69() {
        var _iterator55, _step55, eachDatum;

        return _regenerator["default"].wrap(function _callee69$(_context69) {
          while (1) {
            switch (_context69.prev = _context69.next) {
              case 0:
                if (!(_this70.data == null || _this70.mSize == 0)) {
                  _context69.next = 2;
                  break;
                }

                return _context69.abrupt("return", true);

              case 2:
                if (!predicate) {
                  _context69.next = 23;
                  break;
                }

                _iterator55 = _createForOfIteratorHelper(_this70.data);
                _context69.prev = 4;

                _iterator55.s();

              case 6:
                if ((_step55 = _iterator55.n()).done) {
                  _context69.next = 14;
                  break;
                }

                eachDatum = _step55.value;
                _context69.next = 10;
                return predicate(eachDatum);

              case 10:
                if (!_context69.sent) {
                  _context69.next = 12;
                  break;
                }

                return _context69.abrupt("return", false);

              case 12:
                _context69.next = 6;
                break;

              case 14:
                _context69.next = 19;
                break;

              case 16:
                _context69.prev = 16;
                _context69.t0 = _context69["catch"](4);

                _iterator55.e(_context69.t0);

              case 19:
                _context69.prev = 19;

                _iterator55.f();

                return _context69.finish(19);

              case 22:
                return _context69.abrupt("return", true);

              case 23:
                return _context69.abrupt("return", false);

              case 24:
              case "end":
                return _context69.stop();
            }
          }
        }, _callee69, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "onEach",
    value: function onEach(action) {
      var _this71 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee70() {
        var _iterator56, _step56, eachDatum, signal;

        return _regenerator["default"].wrap(function _callee70$(_context70) {
          while (1) {
            switch (_context70.prev = _context70.next) {
              case 0:
                if (!(_this71.data != null)) {
                  _context70.next = 21;
                  break;
                }

                _iterator56 = _createForOfIteratorHelper(_this71.data);
                _context70.prev = 2;

                _iterator56.s();

              case 4:
                if ((_step56 = _iterator56.n()).done) {
                  _context70.next = 13;
                  break;
                }

                eachDatum = _step56.value;
                _context70.next = 8;
                return action(eachDatum);

              case 8:
                signal = _context70.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context70.next = 11;
                  break;
                }

                return _context70.abrupt("break", 13);

              case 11:
                _context70.next = 4;
                break;

              case 13:
                _context70.next = 18;
                break;

              case 15:
                _context70.prev = 15;
                _context70.t0 = _context70["catch"](2);

                _iterator56.e(_context70.t0);

              case 18:
                _context70.prev = 18;

                _iterator56.f();

                return _context70.finish(18);

              case 21:
                return _context70.abrupt("return", _this71.data);

              case 22:
              case "end":
                return _context70.stop();
            }
          }
        }, _callee70, null, [[2, 15, 18, 21]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "onEachIndexed",
    value: function onEachIndexed(action) {
      var _this72 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      action = action.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee71() {
        var eachIndex, _iterator57, _step57, eachDatum, signal;

        return _regenerator["default"].wrap(function _callee71$(_context71) {
          while (1) {
            switch (_context71.prev = _context71.next) {
              case 0:
                if (!(_this72.data != null)) {
                  _context71.next = 22;
                  break;
                }

                eachIndex = 0;
                _iterator57 = _createForOfIteratorHelper(_this72.data);
                _context71.prev = 3;

                _iterator57.s();

              case 5:
                if ((_step57 = _iterator57.n()).done) {
                  _context71.next = 14;
                  break;
                }

                eachDatum = _step57.value;
                _context71.next = 9;
                return action(eachIndex++, eachDatum);

              case 9:
                signal = _context71.sent;

                if (!(signal == false || signal == _module.KoconutLoopSignal.BREAK)) {
                  _context71.next = 12;
                  break;
                }

                return _context71.abrupt("break", 14);

              case 12:
                _context71.next = 5;
                break;

              case 14:
                _context71.next = 19;
                break;

              case 16:
                _context71.prev = 16;
                _context71.t0 = _context71["catch"](3);

                _iterator57.e(_context71.t0);

              case 19:
                _context71.prev = 19;

                _iterator57.f();

                return _context71.finish(19);

              case 22:
                return _context71.abrupt("return", _this72.data);

              case 23:
              case "end":
                return _context71.stop();
            }
          }
        }, _callee71, null, [[3, 16, 19, 22]]);
      })));
      return koconutToReturn;
    } // orEmpty

  }, {
    key: "partition",
    value: function partition(predicate) {
      var _this73 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPair();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee72() {
        var processedFirstArray, processedSecondArray, _iterator58, _step58, eachDatum;

        return _regenerator["default"].wrap(function _callee72$(_context72) {
          while (1) {
            switch (_context72.prev = _context72.next) {
              case 0:
                processedFirstArray = new Array();
                processedSecondArray = new Array();

                if (!(_this73.data != null)) {
                  _context72.next = 25;
                  break;
                }

                _iterator58 = _createForOfIteratorHelper(_this73.data);
                _context72.prev = 4;

                _iterator58.s();

              case 6:
                if ((_step58 = _iterator58.n()).done) {
                  _context72.next = 17;
                  break;
                }

                eachDatum = _step58.value;
                _context72.next = 10;
                return predicate(eachDatum);

              case 10:
                if (!_context72.sent) {
                  _context72.next = 14;
                  break;
                }

                processedFirstArray.push(eachDatum);
                _context72.next = 15;
                break;

              case 14:
                processedSecondArray.push(eachDatum);

              case 15:
                _context72.next = 6;
                break;

              case 17:
                _context72.next = 22;
                break;

              case 19:
                _context72.prev = 19;
                _context72.t0 = _context72["catch"](4);

                _iterator58.e(_context72.t0);

              case 22:
                _context72.prev = 22;

                _iterator58.f();

                return _context72.finish(22);

              case 25:
                if (!(_this73.data instanceof Array)) {
                  _context72.next = 29;
                  break;
                }

                return _context72.abrupt("return", new _module.Pair(processedFirstArray, processedSecondArray));

              case 29:
                return _context72.abrupt("return", new _module.Pair(new Set(processedFirstArray), new Set(processedSecondArray)));

              case 30:
              case "end":
                return _context72.stop();
            }
          }
        }, _callee72, null, [[4, 19, 22, 25]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "plus",
    value: function plus(elements) {
      var _this74 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee73() {
        var processedArray, elementsArray, _i3, _elementsArray, eachDatum;

        return _regenerator["default"].wrap(function _callee73$(_context73) {
          while (1) {
            switch (_context73.prev = _context73.next) {
              case 0:
                processedArray = _this74.data ? Array.from(_this74.data) : new Array();

                if (typeof elements[Symbol.iterator] === 'function') {
                  elementsArray = Array.from(elements);

                  for (_i3 = 0, _elementsArray = elementsArray; _i3 < _elementsArray.length; _i3++) {
                    eachDatum = _elementsArray[_i3];
                    processedArray.push(eachDatum);
                  }
                } else processedArray.push(elements);

                if (!(_this74.data instanceof Array)) {
                  _context73.next = 6;
                  break;
                }

                return _context73.abrupt("return", processedArray);

              case 6:
                return _context73.abrupt("return", new Set(processedArray));

              case 7:
              case "end":
                return _context73.stop();
            }
          }
        }, _callee73);
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
      var _this75 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee74() {
        var dataArray;
        return _regenerator["default"].wrap(function _callee74$(_context74) {
          while (1) {
            switch (_context74.prev = _context74.next) {
              case 0:
                if (!(_this75.data == null || _this75.mSize == 0)) {
                  _context74.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                dataArray = Array.from(_this75.data);
                return _context74.abrupt("return", dataArray[Math.floor(Math.random() * dataArray.length)]);

              case 4:
              case "end":
                return _context74.stop();
            }
          }
        }, _callee74);
      })));
      return koconutToReturn;
    }
  }, {
    key: "randomOrNull",
    value: function randomOrNull() {
      var _this76 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee75() {
        var dataArray;
        return _regenerator["default"].wrap(function _callee75$(_context75) {
          while (1) {
            switch (_context75.prev = _context75.next) {
              case 0:
                if (!(_this76.data == null || _this76.mSize == 0)) {
                  _context75.next = 2;
                  break;
                }

                return _context75.abrupt("return", null);

              case 2:
                dataArray = Array.from(_this76.data);
                return _context75.abrupt("return", dataArray[Math.floor(Math.random() * dataArray.length)]);

              case 4:
              case "end":
                return _context75.stop();
            }
          }
        }, _callee75);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduce",
    value: function reduce(operation) {
      var _this77 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee76() {
        var dataArray, acc, eachIndex;
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
                dataArray = Array.from(_this77.data);
                acc = dataArray[0];
                eachIndex = 1;

              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context76.next = 12;
                  break;
                }

                _context76.next = 8;
                return operation(acc, dataArray[eachIndex]);

              case 8:
                acc = _context76.sent;

              case 9:
                eachIndex++;
                _context76.next = 5;
                break;

              case 12:
                return _context76.abrupt("return", acc);

              case 13:
              case "end":
                return _context76.stop();
            }
          }
        }, _callee76);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceIndexed",
    value: function reduceIndexed(operation) {
      var _this78 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee77() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee77$(_context77) {
          while (1) {
            switch (_context77.prev = _context77.next) {
              case 0:
                if (!(_this78.data == null || _this78.mSize == 0)) {
                  _context77.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                dataArray = Array.from(_this78.data);
                acc = dataArray[0];
                eachIndex = 1;

              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context77.next = 12;
                  break;
                }

                _context77.next = 8;
                return operation(eachIndex, acc, dataArray[eachIndex]);

              case 8:
                acc = _context77.sent;

              case 9:
                eachIndex++;
                _context77.next = 5;
                break;

              case 12:
                return _context77.abrupt("return", acc);

              case 13:
              case "end":
                return _context77.stop();
            }
          }
        }, _callee77);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceIndexedOrNull",
    value: function reduceIndexedOrNull(operation) {
      var _this79 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee78() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee78$(_context78) {
          while (1) {
            switch (_context78.prev = _context78.next) {
              case 0:
                if (!(_this79.data == null || _this79.mSize == 0)) {
                  _context78.next = 2;
                  break;
                }

                return _context78.abrupt("return", null);

              case 2:
                dataArray = Array.from(_this79.data);
                acc = dataArray[0];
                eachIndex = 1;

              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context78.next = 12;
                  break;
                }

                _context78.next = 8;
                return operation(eachIndex, acc, dataArray[eachIndex]);

              case 8:
                acc = _context78.sent;

              case 9:
                eachIndex++;
                _context78.next = 5;
                break;

              case 12:
                return _context78.abrupt("return", acc);

              case 13:
              case "end":
                return _context78.stop();
            }
          }
        }, _callee78);
      })));
      return koconutToReturn;
    }
  }, {
    key: "reduceOrNull",
    value: function reduceOrNull(operation) {
      var _this80 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee79() {
        var dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee79$(_context79) {
          while (1) {
            switch (_context79.prev = _context79.next) {
              case 0:
                if (!(_this80.data == null || _this80.mSize == 0)) {
                  _context79.next = 2;
                  break;
                }

                return _context79.abrupt("return", null);

              case 2:
                dataArray = Array.from(_this80.data);
                acc = dataArray[0];
                eachIndex = 1;

              case 5:
                if (!(eachIndex < dataArray.length)) {
                  _context79.next = 12;
                  break;
                }

                _context79.next = 8;
                return operation(acc, dataArray[eachIndex]);

              case 8:
                acc = _context79.sent;

              case 9:
                eachIndex++;
                _context79.next = 5;
                break;

              case 12:
                return _context79.abrupt("return", acc);

              case 13:
              case "end":
                return _context79.stop();
            }
          }
        }, _callee79);
      })));
      return koconutToReturn;
    } // requireNoNulls

  }, {
    key: "reversed",
    value: function reversed() {
      var _this81 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee80() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee80$(_context80) {
          while (1) {
            switch (_context80.prev = _context80.next) {
              case 0:
                processedArray = _this81.data ? Array.from(_this81.data).reverse() : new Array();

                if (!(_this81.data instanceof Array)) {
                  _context80.next = 5;
                  break;
                }

                return _context80.abrupt("return", processedArray);

              case 5:
                return _context80.abrupt("return", new Set(processedArray));

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
    key: "runningFold",
    value: function runningFold(initial, operation) {
      var _this82 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee81() {
        var processedArray, _iterator59, _step59, eachDatum;

        return _regenerator["default"].wrap(function _callee81$(_context81) {
          while (1) {
            switch (_context81.prev = _context81.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);

                if (!(_this82.data != null)) {
                  _context81.next = 22;
                  break;
                }

                _iterator59 = _createForOfIteratorHelper(_this82.data);
                _context81.prev = 4;

                _iterator59.s();

              case 6:
                if ((_step59 = _iterator59.n()).done) {
                  _context81.next = 14;
                  break;
                }

                eachDatum = _step59.value;
                _context81.next = 10;
                return operation(initial, eachDatum);

              case 10:
                initial = _context81.sent;
                processedArray.push(initial);

              case 12:
                _context81.next = 6;
                break;

              case 14:
                _context81.next = 19;
                break;

              case 16:
                _context81.prev = 16;
                _context81.t0 = _context81["catch"](4);

                _iterator59.e(_context81.t0);

              case 19:
                _context81.prev = 19;

                _iterator59.f();

                return _context81.finish(19);

              case 22:
                return _context81.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context81.stop();
            }
          }
        }, _callee81, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningFoldindexed",
    value: function runningFoldindexed(initial, operation) {
      var _this83 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee82() {
        var processedArray, _iterator60, _step60, _step60$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee82$(_context82) {
          while (1) {
            switch (_context82.prev = _context82.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);

                if (!(_this83.data != null)) {
                  _context82.next = 22;
                  break;
                }

                _iterator60 = _createForOfIteratorHelper(Array.from(_this83.data).entries());
                _context82.prev = 4;

                _iterator60.s();

              case 6:
                if ((_step60 = _iterator60.n()).done) {
                  _context82.next = 14;
                  break;
                }

                _step60$value = (0, _slicedToArray2["default"])(_step60.value, 2), eachIndex = _step60$value[0], eachDatum = _step60$value[1];
                _context82.next = 10;
                return operation(eachIndex, initial, eachDatum);

              case 10:
                initial = _context82.sent;
                processedArray.push(initial);

              case 12:
                _context82.next = 6;
                break;

              case 14:
                _context82.next = 19;
                break;

              case 16:
                _context82.prev = 16;
                _context82.t0 = _context82["catch"](4);

                _iterator60.e(_context82.t0);

              case 19:
                _context82.prev = 19;

                _iterator60.f();

                return _context82.finish(19);

              case 22:
                return _context82.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context82.stop();
            }
          }
        }, _callee82, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningReduce",
    value: function runningReduce(operation) {
      var _this84 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee83() {
        var processedArray, dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee83$(_context83) {
          while (1) {
            switch (_context83.prev = _context83.next) {
              case 0:
                if (!(_this84.data == null || _this84.mSize == 0)) {
                  _context83.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                processedArray = new Array();
                dataArray = Array.from(_this84.data);
                acc = dataArray[0];
                processedArray.push(acc);
                eachIndex = 1;

              case 7:
                if (!(eachIndex < dataArray.length)) {
                  _context83.next = 15;
                  break;
                }

                _context83.next = 10;
                return operation(acc, dataArray[eachIndex]);

              case 10:
                acc = _context83.sent;
                processedArray.push(acc);

              case 12:
                eachIndex++;
                _context83.next = 7;
                break;

              case 15:
                return _context83.abrupt("return", processedArray);

              case 16:
              case "end":
                return _context83.stop();
            }
          }
        }, _callee83);
      })));
      return koconutToReturn;
    }
  }, {
    key: "runningReduceIndexed",
    value: function runningReduceIndexed(operation) {
      var _this85 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee84() {
        var processedArray, dataArray, acc, eachIndex;
        return _regenerator["default"].wrap(function _callee84$(_context84) {
          while (1) {
            switch (_context84.prev = _context84.next) {
              case 0:
                if (!(_this85.data == null || _this85.mSize == 0)) {
                  _context84.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                processedArray = new Array();
                dataArray = Array.from(_this85.data);
                acc = dataArray[0];
                processedArray.push(acc);
                eachIndex = 1;

              case 7:
                if (!(eachIndex < dataArray.length)) {
                  _context84.next = 15;
                  break;
                }

                _context84.next = 10;
                return operation(eachIndex, acc, dataArray[eachIndex]);

              case 10:
                acc = _context84.sent;
                processedArray.push(acc);

              case 12:
                eachIndex++;
                _context84.next = 7;
                break;

              case 15:
                return _context84.abrupt("return", processedArray);

              case 16:
              case "end":
                return _context84.stop();
            }
          }
        }, _callee84);
      })));
      return koconutToReturn;
    }
  }, {
    key: "scan",
    value: function scan(initial, operation) {
      var _this86 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee85() {
        var processedArray, _iterator61, _step61, eachDatum;

        return _regenerator["default"].wrap(function _callee85$(_context85) {
          while (1) {
            switch (_context85.prev = _context85.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);

                if (!(_this86.data != null)) {
                  _context85.next = 22;
                  break;
                }

                _iterator61 = _createForOfIteratorHelper(_this86.data);
                _context85.prev = 4;

                _iterator61.s();

              case 6:
                if ((_step61 = _iterator61.n()).done) {
                  _context85.next = 14;
                  break;
                }

                eachDatum = _step61.value;
                _context85.next = 10;
                return operation(initial, eachDatum);

              case 10:
                initial = _context85.sent;
                processedArray.push(initial);

              case 12:
                _context85.next = 6;
                break;

              case 14:
                _context85.next = 19;
                break;

              case 16:
                _context85.prev = 16;
                _context85.t0 = _context85["catch"](4);

                _iterator61.e(_context85.t0);

              case 19:
                _context85.prev = 19;

                _iterator61.f();

                return _context85.finish(19);

              case 22:
                return _context85.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context85.stop();
            }
          }
        }, _callee85, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "scanIndexed",
    value: function scanIndexed(initial, operation) {
      var _this87 = this;

      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      operation = operation.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee86() {
        var processedArray, _iterator62, _step62, _step62$value, eachIndex, eachDatum;

        return _regenerator["default"].wrap(function _callee86$(_context86) {
          while (1) {
            switch (_context86.prev = _context86.next) {
              case 0:
                processedArray = new Array();
                processedArray.push(initial);

                if (!(_this87.data != null)) {
                  _context86.next = 22;
                  break;
                }

                _iterator62 = _createForOfIteratorHelper(Array.from(_this87.data).entries());
                _context86.prev = 4;

                _iterator62.s();

              case 6:
                if ((_step62 = _iterator62.n()).done) {
                  _context86.next = 14;
                  break;
                }

                _step62$value = (0, _slicedToArray2["default"])(_step62.value, 2), eachIndex = _step62$value[0], eachDatum = _step62$value[1];
                _context86.next = 10;
                return operation(eachIndex, initial, eachDatum);

              case 10:
                initial = _context86.sent;
                processedArray.push(initial);

              case 12:
                _context86.next = 6;
                break;

              case 14:
                _context86.next = 19;
                break;

              case 16:
                _context86.prev = 16;
                _context86.t0 = _context86["catch"](4);

                _iterator62.e(_context86.t0);

              case 19:
                _context86.prev = 19;

                _iterator62.f();

                return _context86.finish(19);

              case 22:
                return _context86.abrupt("return", processedArray);

              case 23:
              case "end":
                return _context86.stop();
            }
          }
        }, _callee86, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "shuffled",
    value: function shuffled() {
      var _this88 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee87() {
        var processedArray, dataArray, indexes;
        return _regenerator["default"].wrap(function _callee87$(_context87) {
          while (1) {
            switch (_context87.prev = _context87.next) {
              case 0:
                processedArray = new Array();

                if (_this88.data != null) {
                  dataArray = Array.from(_this88.data);
                  indexes = Object.keys(dataArray).map(function (eachIndex) {
                    return parseInt(eachIndex);
                  });

                  while (indexes.length > 0) {
                    processedArray.push(dataArray[indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0]]);
                  }
                }

                if (!(_this88.data instanceof Array)) {
                  _context87.next = 6;
                  break;
                }

                return _context87.abrupt("return", processedArray);

              case 6:
                return _context87.abrupt("return", new Set(processedArray));

              case 7:
              case "end":
                return _context87.stop();
            }
          }
        }, _callee87);
      })));
      return koconutToReturn;
    }
  }, {
    key: "single",
    value: function single() {
      var _this89 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee88() {
        var dataToReturn, _iterator63, _step63, eachDatum;

        return _regenerator["default"].wrap(function _callee88$(_context88) {
          while (1) {
            switch (_context88.prev = _context88.next) {
              case 0:
                if (!(_this89.data == null || _this89.mSize == 0)) {
                  _context88.next = 2;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("Source data is null or empty");

              case 2:
                if (!predicate) {
                  _context88.next = 34;
                  break;
                }

                dataToReturn = null;
                _iterator63 = _createForOfIteratorHelper(_this89.data);
                _context88.prev = 5;

                _iterator63.s();

              case 7:
                if ((_step63 = _iterator63.n()).done) {
                  _context88.next = 19;
                  break;
                }

                eachDatum = _step63.value;
                _context88.next = 11;
                return predicate(eachDatum);

              case 11:
                if (!_context88.sent) {
                  _context88.next = 17;
                  break;
                }

                if (!(dataToReturn == null)) {
                  _context88.next = 16;
                  break;
                }

                dataToReturn = eachDatum;
                _context88.next = 17;
                break;

              case 16:
                throw new _module.KoconutConflictException("There are more than 2 elements maching the given predicate");

              case 17:
                _context88.next = 7;
                break;

              case 19:
                _context88.next = 24;
                break;

              case 21:
                _context88.prev = 21;
                _context88.t0 = _context88["catch"](5);

                _iterator63.e(_context88.t0);

              case 24:
                _context88.prev = 24;

                _iterator63.f();

                return _context88.finish(24);

              case 27:
                if (!(dataToReturn == null)) {
                  _context88.next = 31;
                  break;
                }

                throw new _module.KoconutNoSuchElementException("No element exists matching the given predicate");

              case 31:
                return _context88.abrupt("return", dataToReturn);

              case 32:
                _context88.next = 35;
                break;

              case 34:
                return _context88.abrupt("return", Array.from(_this89.data)[0]);

              case 35:
              case "end":
                return _context88.stop();
            }
          }
        }, _callee88, null, [[5, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "singleOrNull",
    value: function singleOrNull() {
      var _this90 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (predicate) predicate = predicate.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee89() {
        var dataToReturn, _iterator64, _step64, eachDatum;

        return _regenerator["default"].wrap(function _callee89$(_context89) {
          while (1) {
            switch (_context89.prev = _context89.next) {
              case 0:
                if (!(_this90.data == null || Array.from(_this90.data).length == 0)) {
                  _context89.next = 2;
                  break;
                }

                return _context89.abrupt("return", null);

              case 2:
                if (!predicate) {
                  _context89.next = 30;
                  break;
                }

                dataToReturn = null;
                _iterator64 = _createForOfIteratorHelper(_this90.data);
                _context89.prev = 5;

                _iterator64.s();

              case 7:
                if ((_step64 = _iterator64.n()).done) {
                  _context89.next = 19;
                  break;
                }

                eachDatum = _step64.value;
                _context89.next = 11;
                return predicate(eachDatum);

              case 11:
                if (!_context89.sent) {
                  _context89.next = 17;
                  break;
                }

                if (!(dataToReturn == null)) {
                  _context89.next = 16;
                  break;
                }

                dataToReturn = eachDatum;
                _context89.next = 17;
                break;

              case 16:
                return _context89.abrupt("return", null);

              case 17:
                _context89.next = 7;
                break;

              case 19:
                _context89.next = 24;
                break;

              case 21:
                _context89.prev = 21;
                _context89.t0 = _context89["catch"](5);

                _iterator64.e(_context89.t0);

              case 24:
                _context89.prev = 24;

                _iterator64.f();

                return _context89.finish(24);

              case 27:
                return _context89.abrupt("return", dataToReturn);

              case 30:
                return _context89.abrupt("return", Array.from(_this90.data)[0]);

              case 31:
              case "end":
                return _context89.stop();
            }
          }
        }, _callee89, null, [[5, 21, 24, 27]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "sortedBy",
    value: function sortedBy(selector) {
      var _this91 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee90() {
        var processedArray, dataArray, eachIndex, currentComparable, startIndex, middleIndex, endIndex, targetComparable;
        return _regenerator["default"].wrap(function _callee90$(_context90) {
          while (1) {
            switch (_context90.prev = _context90.next) {
              case 0:
                processedArray = new Array();

                if (!(_this91.data != null)) {
                  _context90.next = 23;
                  break;
                }

                dataArray = Array.from(_this91.data);
                _context90.t0 = _regenerator["default"].keys(dataArray);

              case 4:
                if ((_context90.t1 = _context90.t0()).done) {
                  _context90.next = 23;
                  break;
                }

                eachIndex = _context90.t1.value;
                _context90.next = 8;
                return selector(dataArray[eachIndex]);

              case 8:
                currentComparable = _context90.sent;
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;

              case 12:
                if (!(startIndex < endIndex)) {
                  _context90.next = 20;
                  break;
                }

                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context90.next = 16;
                return selector(processedArray[middleIndex]);

              case 16:
                targetComparable = _context90.sent;
                if (_module.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable.compareTo(targetComparable) >= 0 || !_module.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable >= targetComparable) startIndex = middleIndex + 1;else endIndex = middleIndex;
                _context90.next = 12;
                break;

              case 20:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                _context90.next = 4;
                break;

              case 23:
                if (!(_this91.data instanceof Array)) {
                  _context90.next = 27;
                  break;
                }

                return _context90.abrupt("return", processedArray);

              case 27:
                return _context90.abrupt("return", new Set(processedArray));

              case 28:
              case "end":
                return _context90.stop();
            }
          }
        }, _callee90);
      })));
      return koconutToReturn;
    }
  }, {
    key: "sortedByDescending",
    value: function sortedByDescending(selector) {
      var _this92 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee91() {
        var processedArray, dataArray, eachIndex, currentComparable, startIndex, middleIndex, endIndex, targetComparable;
        return _regenerator["default"].wrap(function _callee91$(_context91) {
          while (1) {
            switch (_context91.prev = _context91.next) {
              case 0:
                processedArray = new Array();

                if (!(_this92.data != null)) {
                  _context91.next = 23;
                  break;
                }

                dataArray = Array.from(_this92.data);
                _context91.t0 = _regenerator["default"].keys(dataArray);

              case 4:
                if ((_context91.t1 = _context91.t0()).done) {
                  _context91.next = 23;
                  break;
                }

                eachIndex = _context91.t1.value;
                _context91.next = 8;
                return selector(dataArray[eachIndex]);

              case 8:
                currentComparable = _context91.sent;
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;

              case 12:
                if (!(startIndex < endIndex)) {
                  _context91.next = 20;
                  break;
                }

                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context91.next = 16;
                return selector(processedArray[middleIndex]);

              case 16:
                targetComparable = _context91.sent;
                if (_module.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable.compareTo(targetComparable) <= 0 || !_module.KoconutTypeChecker.checkIsComparable(currentComparable) && currentComparable <= targetComparable) startIndex = middleIndex + 1;else endIndex = middleIndex;
                _context91.next = 12;
                break;

              case 20:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                _context91.next = 4;
                break;

              case 23:
                if (!(_this92.data instanceof Array)) {
                  _context91.next = 27;
                  break;
                }

                return _context91.abrupt("return", processedArray);

              case 27:
                return _context91.abrupt("return", new Set(processedArray));

              case 28:
              case "end":
                return _context91.stop();
            }
          }
        }, _callee91);
      })));
      return koconutToReturn;
    }
  }, {
    key: "sortedWith",
    value: function sortedWith(comparator) {
      var _this93 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      comparator = comparator.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee92() {
        var processedArray, dataArray, eachIndex, startIndex, middleIndex, endIndex;
        return _regenerator["default"].wrap(function _callee92$(_context92) {
          while (1) {
            switch (_context92.prev = _context92.next) {
              case 0:
                processedArray = new Array();

                if (!(_this93.data != null)) {
                  _context92.next = 24;
                  break;
                }

                dataArray = Array.from(_this93.data);
                _context92.t0 = _regenerator["default"].keys(dataArray);

              case 4:
                if ((_context92.t1 = _context92.t0()).done) {
                  _context92.next = 24;
                  break;
                }

                eachIndex = _context92.t1.value;
                startIndex = 0;
                middleIndex = void 0;
                endIndex = processedArray.length;

              case 9:
                if (!(startIndex < endIndex)) {
                  _context92.next = 21;
                  break;
                }

                middleIndex = Math.floor((startIndex + endIndex) / 2);
                _context92.next = 13;
                return comparator(dataArray[eachIndex], processedArray[middleIndex]);

              case 13:
                _context92.t2 = _context92.sent;

                if (!(_context92.t2 >= 0)) {
                  _context92.next = 18;
                  break;
                }

                startIndex = middleIndex + 1;
                _context92.next = 19;
                break;

              case 18:
                endIndex = middleIndex;

              case 19:
                _context92.next = 9;
                break;

              case 21:
                processedArray.splice(endIndex, 0, dataArray[eachIndex]);
                _context92.next = 4;
                break;

              case 24:
                if (!(_this93.data instanceof Array)) {
                  _context92.next = 28;
                  break;
                }

                return _context92.abrupt("return", processedArray);

              case 28:
                return _context92.abrupt("return", new Set(processedArray));

              case 29:
              case "end":
                return _context92.stop();
            }
          }
        }, _callee92);
      })));
      return koconutToReturn;
    }
  }, {
    key: "substarct",
    value: function substarct(other) {
      var _this94 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee93() {
        var processedSet, koconutDataToExceptArray, _iterator65, _step65, eachDatum;

        return _regenerator["default"].wrap(function _callee93$(_context93) {
          while (1) {
            switch (_context93.prev = _context93.next) {
              case 0:
                processedSet = new Set();

                if (!(_this94.data != null)) {
                  _context93.next = 22;
                  break;
                }

                koconutDataToExceptArray = _module.KoconutArray.from(other);
                _iterator65 = _createForOfIteratorHelper(_this94.data);
                _context93.prev = 4;

                _iterator65.s();

              case 6:
                if ((_step65 = _iterator65.n()).done) {
                  _context93.next = 14;
                  break;
                }

                eachDatum = _step65.value;
                _context93.next = 10;
                return koconutDataToExceptArray.contains(eachDatum)["yield"]();

              case 10:
                if (_context93.sent) {
                  _context93.next = 12;
                  break;
                }

                processedSet.add(eachDatum);

              case 12:
                _context93.next = 6;
                break;

              case 14:
                _context93.next = 19;
                break;

              case 16:
                _context93.prev = 16;
                _context93.t0 = _context93["catch"](4);

                _iterator65.e(_context93.t0);

              case 19:
                _context93.prev = 19;

                _iterator65.f();

                return _context93.finish(19);

              case 22:
                return _context93.abrupt("return", processedSet);

              case 23:
              case "end":
                return _context93.stop();
            }
          }
        }, _callee93, null, [[4, 16, 19, 22]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "sumBy",
    value: function sumBy(selector) {
      var _this95 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      selector = selector.bind(thisArg);
      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee94() {
        var sum, _iterator66, _step66, eachDatum;

        return _regenerator["default"].wrap(function _callee94$(_context94) {
          while (1) {
            switch (_context94.prev = _context94.next) {
              case 0:
                sum = 0;

                if (!(_this95.data != null)) {
                  _context94.next = 21;
                  break;
                }

                _iterator66 = _createForOfIteratorHelper(_this95.data);
                _context94.prev = 3;

                _iterator66.s();

              case 5:
                if ((_step66 = _iterator66.n()).done) {
                  _context94.next = 13;
                  break;
                }

                eachDatum = _step66.value;
                _context94.t0 = sum;
                _context94.next = 10;
                return selector(eachDatum);

              case 10:
                sum = _context94.t0 += _context94.sent;

              case 11:
                _context94.next = 5;
                break;

              case 13:
                _context94.next = 18;
                break;

              case 15:
                _context94.prev = 15;
                _context94.t1 = _context94["catch"](3);

                _iterator66.e(_context94.t1);

              case 18:
                _context94.prev = 18;

                _iterator66.f();

                return _context94.finish(18);

              case 21:
                return _context94.abrupt("return", sum);

              case 22:
              case "end":
                return _context94.stop();
            }
          }
        }, _callee94, null, [[3, 15, 18, 21]]);
      })));
      return koconutToReturn;
    } // sumByDouble
    // sumOf

  }, {
    key: "take",
    value: function take(n) {
      var _this96 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee95() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee95$(_context95) {
          while (1) {
            switch (_context95.prev = _context95.next) {
              case 0:
                processedArray = _this96.data ? Array.from(_this96.data).slice(0, n) : new Array();

                if (!(_this96.data instanceof Array)) {
                  _context95.next = 5;
                  break;
                }

                return _context95.abrupt("return", processedArray);

              case 5:
                return _context95.abrupt("return", new Set(processedArray));

              case 6:
              case "end":
                return _context95.stop();
            }
          }
        }, _callee95);
      })));
      return koconutToReturn;
    }
  }, {
    key: "takeLast",
    value: function takeLast(n) {
      var _this97 = this;

      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee96() {
        var processedArray;
        return _regenerator["default"].wrap(function _callee96$(_context96) {
          while (1) {
            switch (_context96.prev = _context96.next) {
              case 0:
                processedArray = _this97.data ? Array.from(_this97.data).slice(_this97.mSize - n, _this97.mSize) : new Array();

                if (!(_this97.data instanceof Array)) {
                  _context96.next = 5;
                  break;
                }

                return _context96.abrupt("return", processedArray);

              case 5:
                return _context96.abrupt("return", new Set(processedArray));

              case 6:
              case "end":
                return _context96.stop();
            }
          }
        }, _callee96);
      })));
      return koconutToReturn;
    }
  }, {
    key: "takeLastWhile",
    value: function takeLastWhile(predicate) {
      var _this98 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee97() {
        var processedArray, dataArray, targetIndex;
        return _regenerator["default"].wrap(function _callee97$(_context97) {
          while (1) {
            switch (_context97.prev = _context97.next) {
              case 0:
                processedArray = new Array();

                if (!(_this98.data != null)) {
                  _context97.next = 13;
                  break;
                }

                dataArray = Array.from(_this98.data);
                targetIndex = _this98.mSize - 1;

              case 4:
                if (!(targetIndex >= 0)) {
                  _context97.next = 12;
                  break;
                }

                _context97.next = 7;
                return predicate(dataArray[targetIndex]);

              case 7:
                if (_context97.sent) {
                  _context97.next = 9;
                  break;
                }

                return _context97.abrupt("break", 12);

              case 9:
                targetIndex--;
                _context97.next = 4;
                break;

              case 12:
                processedArray = dataArray.slice(targetIndex + 1, _this98.mSize);

              case 13:
                if (!(_this98.data instanceof Array)) {
                  _context97.next = 17;
                  break;
                }

                return _context97.abrupt("return", processedArray);

              case 17:
                return _context97.abrupt("return", new Set(processedArray));

              case 18:
              case "end":
                return _context97.stop();
            }
          }
        }, _callee97);
      })));
      return koconutToReturn;
    }
  }, {
    key: "takeWhile",
    value: function takeWhile(predicate) {
      var _this99 = this;

      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      predicate = predicate.bind(thisArg);
      var koconutToReturn = new KoconutCollection();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee98() {
        var processedArray, predicateIndex, _iterator67, _step67, eachDatum;

        return _regenerator["default"].wrap(function _callee98$(_context98) {
          while (1) {
            switch (_context98.prev = _context98.next) {
              case 0:
                processedArray = new Array();

                if (!(_this99.data != null)) {
                  _context98.next = 24;
                  break;
                }

                predicateIndex = 0;
                _iterator67 = _createForOfIteratorHelper(_this99.data);
                _context98.prev = 4;

                _iterator67.s();

              case 6:
                if ((_step67 = _iterator67.n()).done) {
                  _context98.next = 15;
                  break;
                }

                eachDatum = _step67.value;
                _context98.next = 10;
                return predicate(eachDatum);

              case 10:
                if (_context98.sent) {
                  _context98.next = 12;
                  break;
                }

                return _context98.abrupt("break", 15);

              case 12:
                predicateIndex++;

              case 13:
                _context98.next = 6;
                break;

              case 15:
                _context98.next = 20;
                break;

              case 17:
                _context98.prev = 17;
                _context98.t0 = _context98["catch"](4);

                _iterator67.e(_context98.t0);

              case 20:
                _context98.prev = 20;

                _iterator67.f();

                return _context98.finish(20);

              case 23:
                processedArray = Array.from(_this99.data).slice(0, predicateIndex);

              case 24:
                if (!(_this99.data instanceof Array)) {
                  _context98.next = 28;
                  break;
                }

                return _context98.abrupt("return", processedArray);

              case 28:
                return _context98.abrupt("return", new Set(processedArray));

              case 29:
              case "end":
                return _context98.stop();
            }
          }
        }, _callee98, null, [[4, 17, 20, 23]]);
      })));
      return koconutToReturn;
    } // toBooleanArray
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

  }, {
    key: "toArray",
    value: function toArray() {
      var _this100 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee99() {
        return _regenerator["default"].wrap(function _callee99$(_context99) {
          while (1) {
            switch (_context99.prev = _context99.next) {
              case 0:
                return _context99.abrupt("return", _this100.data ? Array.from(_this100.data) : new Array());

              case 1:
              case "end":
                return _context99.stop();
            }
          }
        }, _callee99);
      })));
      return koconutToReturn;
    }
  }, {
    key: "toSet",
    value: function toSet() {
      var _this101 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee100() {
        return _regenerator["default"].wrap(function _callee100$(_context100) {
          while (1) {
            switch (_context100.prev = _context100.next) {
              case 0:
                return _context100.abrupt("return", new Set(_this101.data));

              case 1:
              case "end":
                return _context100.stop();
            }
          }
        }, _callee100);
      })));
      return koconutToReturn;
    } // toShortArray
    // toSortedSet
    // toUByteArray
    // toUIntArray
    // toULongArray
    // toUShortArray

  }, {
    key: "union",
    value: function union(other) {
      var _this102 = this;

      var koconutToReturn = new _module.KoconutSet();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee101() {
        var processedSet, _iterator68, _step68, eachDatum;

        return _regenerator["default"].wrap(function _callee101$(_context101) {
          while (1) {
            switch (_context101.prev = _context101.next) {
              case 0:
                processedSet = _this102.data == null ? new Set() : new Set(_this102.data);
                _iterator68 = _createForOfIteratorHelper(other);

                try {
                  for (_iterator68.s(); !(_step68 = _iterator68.n()).done;) {
                    eachDatum = _step68.value;
                    processedSet.add(eachDatum);
                  }
                } catch (err) {
                  _iterator68.e(err);
                } finally {
                  _iterator68.f();
                }

                _context101.next = 5;
                return _module.KoconutSet.from(processedSet).distinct()["yield"]();

              case 5:
                return _context101.abrupt("return", _context101.sent);

              case 6:
              case "end":
                return _context101.stop();
            }
          }
        }, _callee101);
      })));
      return koconutToReturn;
    } // unzip

  }, {
    key: "windowed",
    value: function windowed(size) {
      var _this103 = this;

      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var partialWindows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var transform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var thisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      if (size < 0) size = -size;
      if (step < 0) step = -step;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee102() {
        var processedArray, currentIndex, dataArray, eachChunkedData, transformedArray, _iterator69, _step69, eachProcessedDatum;

        return _regenerator["default"].wrap(function _callee102$(_context102) {
          while (1) {
            switch (_context102.prev = _context102.next) {
              case 0:
                processedArray = new Array();

                if (_this103.data != null) {
                  currentIndex = 0;
                  dataArray = Array.from(_this103.data);

                  while (currentIndex < dataArray.length) {
                    eachChunkedData = dataArray.slice(currentIndex, currentIndex + size);
                    currentIndex += step;
                    if (partialWindows || eachChunkedData.length == size) processedArray.push(eachChunkedData);
                  }
                }

                if (!transform) {
                  _context102.next = 25;
                  break;
                }

                transformedArray = new Array();
                _iterator69 = _createForOfIteratorHelper(processedArray);
                _context102.prev = 5;

                _iterator69.s();

              case 7:
                if ((_step69 = _iterator69.n()).done) {
                  _context102.next = 16;
                  break;
                }

                eachProcessedDatum = _step69.value;
                _context102.t0 = transformedArray;
                _context102.next = 12;
                return transform(eachProcessedDatum);

              case 12:
                _context102.t1 = _context102.sent;

                _context102.t0.push.call(_context102.t0, _context102.t1);

              case 14:
                _context102.next = 7;
                break;

              case 16:
                _context102.next = 21;
                break;

              case 18:
                _context102.prev = 18;
                _context102.t2 = _context102["catch"](5);

                _iterator69.e(_context102.t2);

              case 21:
                _context102.prev = 21;

                _iterator69.f();

                return _context102.finish(21);

              case 24:
                return _context102.abrupt("return", transformedArray);

              case 25:
                return _context102.abrupt("return", processedArray);

              case 26:
              case "end":
                return _context102.stop();
            }
          }
        }, _callee102, null, [[5, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "withIndex",
    value: function withIndex() {
      var _this104 = this;

      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee103() {
        var processedArray, _iterator70, _step70, _step70$value, _index3, _element3;

        return _regenerator["default"].wrap(function _callee103$(_context103) {
          while (1) {
            switch (_context103.prev = _context103.next) {
              case 0:
                processedArray = new Array();

                if (_this104.data != null) {
                  _iterator70 = _createForOfIteratorHelper(Array.from(_this104.data).entries());

                  try {
                    for (_iterator70.s(); !(_step70 = _iterator70.n()).done;) {
                      _step70$value = (0, _slicedToArray2["default"])(_step70.value, 2), _index3 = _step70$value[0], _element3 = _step70$value[1];
                      processedArray.push(new _module.Entry(_index3, _element3));
                    }
                  } catch (err) {
                    _iterator70.e(err);
                  } finally {
                    _iterator70.f();
                  }
                }

                return _context103.abrupt("return", processedArray);

              case 3:
              case "end":
                return _context103.stop();
            }
          }
        }, _callee103);
      })));
      return koconutToReturn;
    }
  }, {
    key: "zip",
    value: function zip(other) {
      var _this105 = this;

      var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (transform) transform = transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee104() {
        var processedArray, dataArray, otherArray, minLength, eachIndex, transformedArray, _iterator71, _step71, eachProcessedData;

        return _regenerator["default"].wrap(function _callee104$(_context104) {
          while (1) {
            switch (_context104.prev = _context104.next) {
              case 0:
                processedArray = new Array();

                if (_this105.data != null) {
                  dataArray = Array.from(_this105.data);
                  otherArray = Array.from(other);
                  minLength = dataArray.length < otherArray.length ? dataArray.length : otherArray.length;

                  for (eachIndex = 0; eachIndex < minLength; eachIndex++) {
                    processedArray.push(new _module.Pair(dataArray[eachIndex], otherArray[eachIndex]));
                  }
                }

                if (!transform) {
                  _context104.next = 25;
                  break;
                }

                transformedArray = new Array();
                _iterator71 = _createForOfIteratorHelper(processedArray);
                _context104.prev = 5;

                _iterator71.s();

              case 7:
                if ((_step71 = _iterator71.n()).done) {
                  _context104.next = 16;
                  break;
                }

                eachProcessedData = _step71.value;
                _context104.t0 = transformedArray;
                _context104.next = 12;
                return transform(eachProcessedData.first, eachProcessedData.second);

              case 12:
                _context104.t1 = _context104.sent;

                _context104.t0.push.call(_context104.t0, _context104.t1);

              case 14:
                _context104.next = 7;
                break;

              case 16:
                _context104.next = 21;
                break;

              case 18:
                _context104.prev = 18;
                _context104.t2 = _context104["catch"](5);

                _iterator71.e(_context104.t2);

              case 21:
                _context104.prev = 21;

                _iterator71.f();

                return _context104.finish(21);

              case 24:
                return _context104.abrupt("return", transformedArray);

              case 25:
                return _context104.abrupt("return", processedArray);

              case 26:
              case "end":
                return _context104.stop();
            }
          }
        }, _callee104, null, [[5, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }, {
    key: "zipWithNext",
    value: function zipWithNext() {
      var _this106 = this;

      var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (transform) transform.bind(thisArg);
      var koconutToReturn = new _module.KoconutArray();
      koconutToReturn.setPrevYieldable(this).setProcessor( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee105() {
        var processedArray, dataArray, eachIndex, transformedArray, _iterator72, _step72, eachProcessedDatum;

        return _regenerator["default"].wrap(function _callee105$(_context105) {
          while (1) {
            switch (_context105.prev = _context105.next) {
              case 0:
                processedArray = new Array();

                if (_this106.data != null) {
                  dataArray = Array.from(_this106.data);

                  if (dataArray.length >= 2) {
                    for (eachIndex = 0; eachIndex < dataArray.length - 1; eachIndex++) {
                      processedArray.push(new _module.Pair(dataArray[eachIndex], dataArray[eachIndex + 1]));
                    }
                  }
                }

                if (!transform) {
                  _context105.next = 25;
                  break;
                }

                transformedArray = new Array();
                _iterator72 = _createForOfIteratorHelper(processedArray);
                _context105.prev = 5;

                _iterator72.s();

              case 7:
                if ((_step72 = _iterator72.n()).done) {
                  _context105.next = 16;
                  break;
                }

                eachProcessedDatum = _step72.value;
                _context105.t0 = transformedArray;
                _context105.next = 12;
                return transform(eachProcessedDatum.first, eachProcessedDatum.second);

              case 12:
                _context105.t1 = _context105.sent;

                _context105.t0.push.call(_context105.t0, _context105.t1);

              case 14:
                _context105.next = 7;
                break;

              case 16:
                _context105.next = 21;
                break;

              case 18:
                _context105.prev = 18;
                _context105.t2 = _context105["catch"](5);

                _iterator72.e(_context105.t2);

              case 21:
                _context105.prev = 21;

                _iterator72.f();

                return _context105.finish(21);

              case 24:
                return _context105.abrupt("return", transformedArray);

              case 25:
                return _context105.abrupt("return", processedArray);

              case 26:
              case "end":
                return _context105.stop();
            }
          }
        }, _callee105, null, [[5, 18, 21, 24]]);
      })));
      return koconutToReturn;
    }
  }]);
  return KoconutCollection;
}(_module.KoconutIterable);

exports.KoconutCollection = KoconutCollection;