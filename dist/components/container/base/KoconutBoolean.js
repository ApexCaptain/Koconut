"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutBoolean = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _module = require("../../../module");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var KoconutBoolean = function (_KoconutPrimitive) {
  (0, _inherits2["default"])(KoconutBoolean, _KoconutPrimitive);

  var _super = _createSuper(KoconutBoolean);

  function KoconutBoolean() {
    var _this;

    var _boolean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    (0, _classCallCheck2["default"])(this, KoconutBoolean);
    _this = _super.call(this);
    _this.data = _boolean == null ? false : _boolean;
    return _this;
  }

  (0, _createClass2["default"])(KoconutBoolean, [{
    key: "compareTo",
    value: function compareTo(other) {
      var _this2 = this;

      var koconutToReturn = new _module.KoconutPrimitive();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
        var otherBoolean;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                otherBoolean = false;

                if (!(other instanceof _module.KoconutPrimitive)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return other["yield"]();

              case 4:
                otherBoolean = _context.sent;
                _context.next = 8;
                break;

              case 7:
                otherBoolean = other;

              case 8:
                return _context.abrupt("return", Number(_this2.data) - Number(otherBoolean));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      return koconutToReturn;
    }
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get2["default"])((0, _getPrototypeOf2["default"])(KoconutBoolean.prototype), "retrieve", this).call(this);

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
    key: "valueOf",
    value: function valueOf() {
      return this.data;
    }
  }, {
    key: "not",
    value: function not() {
      var _this3 = this;

      var koconutToReturn = new KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", !_this3.data);

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
    key: "and",
    value: function and(other) {
      var _this4 = this;

      var koconutToReturn = new KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
        var otherBoolean;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                otherBoolean = false;

                if (!(other instanceof _module.KoconutPrimitive)) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 4;
                return other["yield"]();

              case 4:
                otherBoolean = _context4.sent;
                _context4.next = 8;
                break;

              case 7:
                otherBoolean = other;

              case 8:
                return _context4.abrupt("return", _this4.data && otherBoolean);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      return koconutToReturn;
    }
  }, {
    key: "nand",
    value: function nand(other) {
      return this.and(other).not();
    }
  }, {
    key: "or",
    value: function or(other) {
      var _this5 = this;

      var koconutToReturn = new KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
        var otherBoolean;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                otherBoolean = false;

                if (!(other instanceof _module.KoconutPrimitive)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return other["yield"]();

              case 4:
                otherBoolean = _context5.sent;
                _context5.next = 8;
                break;

              case 7:
                otherBoolean = other;

              case 8:
                return _context5.abrupt("return", _this5.data || otherBoolean);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
      return koconutToReturn;
    }
  }, {
    key: "nor",
    value: function nor(other) {
      return this.or(other).not();
    }
  }, {
    key: "xor",
    value: function xor(other) {
      var _this6 = this;

      var koconutToReturn = new KoconutBoolean();
      koconutToReturn.setPrevYieldable(this).setProcessor((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
        var otherBoolean;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                otherBoolean = false;

                if (!(other instanceof _module.KoconutPrimitive)) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return other["yield"]();

              case 4:
                otherBoolean = _context6.sent;
                _context6.next = 8;
                break;

              case 7:
                otherBoolean = other;

              case 8:
                return _context6.abrupt("return", _this6.data != otherBoolean);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })));
      return koconutToReturn;
    }
  }, {
    key: "xnor",
    value: function xnor(other) {
      return this.xor(other).not();
    }
  }, {
    key: "eqv",
    value: function eqv(other) {
      return this.xor(other).not();
    }
  }], [{
    key: "fromPrimitive",
    value: function fromPrimitive(primitive) {
      var koconutToReturn = new KoconutBoolean(primitive['data']);
      koconutToReturn.processor = primitive['processor'];
      koconutToReturn.prevYieldable = primitive['prevYieldable'];
      return koconutToReturn;
    }
  }]);
  return KoconutBoolean;
}(_module.KoconutPrimitive);

exports.KoconutBoolean = KoconutBoolean;