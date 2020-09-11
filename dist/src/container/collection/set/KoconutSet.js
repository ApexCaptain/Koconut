"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutSet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _module = require("../../../../module.internal");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

var KoconutSet = /*#__PURE__*/function (_KoconutCollection) {
  (0, _inherits2["default"])(KoconutSet, _KoconutCollection);

  var _super = _createSuper(KoconutSet);

  (0, _createClass2["default"])(KoconutSet, null, [{
    key: "from",
    value: function from(source) {
      return new KoconutSet(new Set(source));
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      return new KoconutSet(new Set(data));
    }
    /* Koconut Primitive */

  }]);

  function KoconutSet() {
    var _this;

    var set = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, KoconutSet);
    _this = _super.call(this);
    _this.data = set == null ? new Set() : new Set(set);
    return _this;
  }

  (0, _createClass2["default"])(KoconutSet, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var _index, keys, _iterator, _step, eachDatum, _this$data, isConflict, _iterator2, _step2, eachPrevEquatablekDatum;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(data != null)) {
                  _context.next = 44;
                  break;
                }

                _index = 0;
                keys = new Array();
                _iterator = _createForOfIteratorHelper(data);
                _context.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 35;
                  break;
                }

                eachDatum = _step.value;

                if (!_module.KoconutTypeChecker.checkIsEquatable(eachDatum)) {
                  _context.next = 31;
                  break;
                }

                isConflict = false;
                _iterator2 = _createForOfIteratorHelper(keys);
                _context.prev = 11;

                _iterator2.s();

              case 13:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 20;
                  break;
                }

                eachPrevEquatablekDatum = _step2.value;

                if (!eachDatum.equalsTo(eachPrevEquatablekDatum)) {
                  _context.next = 18;
                  break;
                }

                isConflict = true;
                return _context.abrupt("break", 20);

              case 18:
                _context.next = 13;
                break;

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](11);

                _iterator2.e(_context.t0);

              case 25:
                _context.prev = 25;

                _iterator2.f();

                return _context.finish(25);

              case 28:
                if (!isConflict) {
                  this.mSize++;
                  this.mIndices.push(_index++);
                  keys.push(eachDatum);
                } else (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data["delete"](eachDatum);

                _context.next = 33;
                break;

              case 31:
                this.mSize++;
                this.mIndices.push(_index++);

              case 33:
                _context.next = 6;
                break;

              case 35:
                _context.next = 40;
                break;

              case 37:
                _context.prev = 37;
                _context.t1 = _context["catch"](4);

                _iterator.e(_context.t1);

              case 40:
                _context.prev = 40;

                _iterator.f();

                return _context.finish(40);

              case 43:
                this.combinedDataWrapper = data;

              case 44:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 37, 40, 43], [11, 22, 25, 28]]);
      }));

      function validate(_x) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "associateByTo",
    value: function associateByTo(destination, keySelector) {
      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "associateByTo", this).call(this, destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
  }, {
    key: "associateTo",
    value: function associateTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "associateTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "associateWithTo",
    value: function associateWithTo(destination, valueSelector) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "associateWithTo", this).call(this, destination, valueSelector, thisArg));
    }
  }, {
    key: "distinct",
    value: function distinct() {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "distinct", this).call(this));
    }
  }, {
    key: "distinctBy",
    value: function distinctBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "distinctBy", this).call(this, selector, thisArg));
    }
  }, {
    key: "drop",
    value: function drop(n) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "drop", this).call(this, n));
    }
  }, {
    key: "dropLast",
    value: function dropLast(n) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "dropLast", this).call(this, n));
    }
  }, {
    key: "dropLastWhile",
    value: function dropLastWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "dropLastWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "dropWhile",
    value: function dropWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "dropWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filter", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterIndexed",
    value: function filterIndexed(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterIndexed", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterIndexedTo",
    value: function filterIndexedTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterIndexedTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "filterNot",
    value: function filterNot(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterNot", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterNotNull",
    value: function filterNotNull() {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterNotNull", this).call(this));
    }
  }, {
    key: "filterNotNullTo",
    value: function filterNotNullTo(destination) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterNotNullTo", this).call(this, destination));
    }
  }, {
    key: "filterNotTo",
    value: function filterNotTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterNotTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "filterTo",
    value: function filterTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "filterTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "flatMapIndexedTo",
    value: function flatMapIndexedTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "flatMapIndexedTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "flatMapTo",
    value: function flatMapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "flatMapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "groupByTo",
    value: function groupByTo(destination, keySelector) {
      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "groupByTo", this).call(this, destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
  }, {
    key: "mapIndexedNotNullTo",
    value: function mapIndexedNotNullTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "mapIndexedNotNullTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapIndexedTo",
    value: function mapIndexedTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "mapIndexedTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapNotNullTo",
    value: function mapNotNullTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "mapNotNullTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapTo",
    value: function mapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "mapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "minus",
    value: function minus(elements) {
      if (typeof elements[Symbol.iterator] === 'function') return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "minus", this).call(this, elements));else return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "minus", this).call(this, elements));
    }
  }, {
    key: "minusElement",
    value: function minusElement(element) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "minusElement", this).call(this, element));
    }
  }, {
    key: "onEach",
    value: function onEach(action) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "onEach", this).call(this, action, thisArg));
    }
  }, {
    key: "onEachIndexed",
    value: function onEachIndexed(action) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "onEachIndexed", this).call(this, action, thisArg));
    }
  }, {
    key: "plus",
    value: function plus(elements) {
      if (typeof elements[Symbol.iterator] === 'function') return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "plus", this).call(this, elements));else return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "plus", this).call(this, elements));
    }
  }, {
    key: "plusElement",
    value: function plusElement(element) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "plusElement", this).call(this, element));
    }
  }, {
    key: "reversed",
    value: function reversed() {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "reversed", this).call(this));
    }
  }, {
    key: "shuffled",
    value: function shuffled() {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "shuffled", this).call(this));
    }
  }, {
    key: "sortedBy",
    value: function sortedBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "sortedBy", this).call(this, selector, thisArg));
    }
  }, {
    key: "sortedByDescending",
    value: function sortedByDescending(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "sortedByDescending", this).call(this, selector, thisArg));
    }
  }, {
    key: "sortedWith",
    value: function sortedWith(comparator) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "sortedWith", this).call(this, comparator, thisArg));
    }
  }, {
    key: "take",
    value: function take(n) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "take", this).call(this, n));
    }
  }, {
    key: "takeLast",
    value: function takeLast(n) {
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "takeLast", this).call(this, n));
    }
  }, {
    key: "takeLastWhile",
    value: function takeLastWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "takeLastWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "takeWhile",
    value: function takeWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutSet.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutSet.prototype), "takeWhile", this).call(this, predicate, thisArg));
    }
  }], [{
    key: "fromCollection",
    value: function fromCollection(collection) {
      var koconutToReturn = new KoconutSet(collection['data']);
      koconutToReturn.processor = collection['processor'];
      koconutToReturn.prevYieldable = collection['prevYieldable'];
      return koconutToReturn;
    }
  }]);
  return KoconutSet;
}(_module.KoconutCollection);

exports.KoconutSet = KoconutSet;