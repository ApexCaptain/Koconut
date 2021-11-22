"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutArray = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _module = require("../../../../module");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

var KoconutArray = function (_KoconutCollection) {
  (0, _inherits2["default"])(KoconutArray, _KoconutCollection);

  var _super = _createSuper(KoconutArray);

  function KoconutArray() {
    var _this;

    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2["default"])(this, KoconutArray);
    _this = _super.call(this);
    _this.data = array == null ? new Array() : Array.from(array);
    return _this;
  }

  (0, _createClass2["default"])(KoconutArray, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "retrieve", this).call(this);

              case 2:
                return _context.abrupt("return", this);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function retrieve() {
        return _retrieve.apply(this, arguments);
      }

      return retrieve;
    }()
  }, {
    key: "onEach",
    value: function onEach(action) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "onEach", this).call(this, action, thisArg));
    }
  }, {
    key: "onEachIndexed",
    value: function onEachIndexed(action) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "onEachIndexed", this).call(this, action, thisArg));
    }
  }, {
    key: "associateByTo",
    value: function associateByTo(destination, keySelector) {
      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "associateByTo", this).call(this, destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
  }, {
    key: "associateTo",
    value: function associateTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "associateTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "associateWithTo",
    value: function associateWithTo(destination, valueSelector) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "associateWithTo", this).call(this, destination, valueSelector, thisArg));
    }
  }, {
    key: "flatMapTo",
    value: function flatMapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "flatMapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "flatMapIndexedTo",
    value: function flatMapIndexedTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "flatMapIndexedTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "groupByTo",
    value: function groupByTo(destination, keySelector) {
      var valueTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var keySelectorThisArg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var valueTransformThisArg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "groupByTo", this).call(this, destination, keySelector, valueTransform, keySelectorThisArg, valueTransformThisArg));
    }
  }, {
    key: "mapTo",
    value: function mapTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "mapTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapNotNullTo",
    value: function mapNotNullTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "mapNotNullTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapIndexedTo",
    value: function mapIndexedTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "mapIndexedTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "mapIndexedNotNullTo",
    value: function mapIndexedNotNullTo(destination, transform) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "mapIndexedNotNullTo", this).call(this, destination, transform, thisArg));
    }
  }, {
    key: "distinct",
    value: function distinct() {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "distinct", this).call(this));
    }
  }, {
    key: "distinctBy",
    value: function distinctBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "distinctBy", this).call(this, selector, thisArg));
    }
  }, {
    key: "drop",
    value: function drop(n) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "drop", this).call(this, n));
    }
  }, {
    key: "dropLast",
    value: function dropLast(n) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "dropLast", this).call(this, n));
    }
  }, {
    key: "dropLastWhile",
    value: function dropLastWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "dropLastWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "dropWhile",
    value: function dropWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "dropWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filter",
    value: function filter(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filter", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterNot",
    value: function filterNot(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterNot", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterTo",
    value: function filterTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "filterNotTo",
    value: function filterNotTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterNotTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "filterIndexed",
    value: function filterIndexed(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterIndexed", this).call(this, predicate, thisArg));
    }
  }, {
    key: "filterIndexedTo",
    value: function filterIndexedTo(destination, predicate) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterIndexedTo", this).call(this, destination, predicate, thisArg));
    }
  }, {
    key: "filterNotNull",
    value: function filterNotNull() {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterNotNull", this).call(this));
    }
  }, {
    key: "filterNotNullTo",
    value: function filterNotNullTo(destination) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "filterNotNullTo", this).call(this, destination));
    }
  }, {
    key: "sortedBy",
    value: function sortedBy(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "sortedBy", this).call(this, selector, thisArg));
    }
  }, {
    key: "sortedByDescending",
    value: function sortedByDescending(selector) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "sortedByDescending", this).call(this, selector, thisArg));
    }
  }, {
    key: "sortedWith",
    value: function sortedWith(comparator) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "sortedWith", this).call(this, comparator, thisArg));
    }
  }, {
    key: "take",
    value: function take(n) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "take", this).call(this, n));
    }
  }, {
    key: "takeLast",
    value: function takeLast(n) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "takeLast", this).call(this, n));
    }
  }, {
    key: "takeLastWhile",
    value: function takeLastWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "takeLastWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "takeWhile",
    value: function takeWhile(predicate) {
      var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "takeWhile", this).call(this, predicate, thisArg));
    }
  }, {
    key: "minus",
    value: function minus(elements) {
      if (typeof elements[Symbol.iterator] === 'function') return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "minus", this).call(this, elements));else return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "minus", this).call(this, elements));
    }
  }, {
    key: "minusElement",
    value: function minusElement(element) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "minusElement", this).call(this, element));
    }
  }, {
    key: "plus",
    value: function plus(elements) {
      if (typeof elements[Symbol.iterator] === 'function') return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "plus", this).call(this, elements));else return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "plus", this).call(this, elements));
    }
  }, {
    key: "plusElement",
    value: function plusElement(element) {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "plusElement", this).call(this, element));
    }
  }, {
    key: "reversed",
    value: function reversed() {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "reversed", this).call(this));
    }
  }, {
    key: "shuffled",
    value: function shuffled() {
      return KoconutArray.fromCollection((0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutArray.prototype), "shuffled", this).call(this));
    }
  }], [{
    key: "fromCollection",
    value: function fromCollection(collection) {
      var koconutToReturn = new KoconutArray(collection['data']);
      koconutToReturn.processor = collection['processor'];
      koconutToReturn.prevYieldable = collection['prevYieldable'];
      return koconutToReturn;
    }
  }, {
    key: "from",
    value: function from() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new KoconutArray(source == null ? null : Array.from(source));
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      return new KoconutArray(data);
    }
  }, {
    key: "generate",
    value: function generate(count, generator) {
      var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (count < 0) throw new _module.KoconutInvalidArgumentException("Count must be larger than 0. Given value : ".concat(count));
      generator = generator.bind(thisArg);
      var koconutToReturn = new KoconutArray();
      koconutToReturn.setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        var processedArray, eachIndex;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                processedArray = new Array();
                eachIndex = 0;

              case 2:
                if (!(eachIndex < count)) {
                  _context2.next = 11;
                  break;
                }

                _context2.t0 = processedArray;
                _context2.next = 6;
                return generator(eachIndex);

              case 6:
                _context2.t1 = _context2.sent;

                _context2.t0.push.call(_context2.t0, _context2.t1);

              case 8:
                eachIndex++;
                _context2.next = 2;
                break;

              case 11:
                return _context2.abrupt("return", processedArray);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
      return koconutToReturn;
    }
  }]);
  return KoconutArray;
}(_module.KoconutCollection);

exports.KoconutArray = KoconutArray;