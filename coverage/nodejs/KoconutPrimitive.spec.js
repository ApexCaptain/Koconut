"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = require("chai");
var _module = require("../../dist/module");
describe("".concat(_module.KoconutPrimitive.name, " -- Processor"), function () {
  it(_module.KoconutPrimitive.prototype["let"].name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
    var koconut, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            koconut = new _module.KoconutPrimitive(5);
            (0, _chai.expect)(koconut).to.be.instanceOf(_module.KoconutPrimitive);
            _context.next = 4;
            return koconut["let"](function (result) {
              return result + 2;
            });
          case 4:
            result = _context.sent;
            (0, _chai.expect)(result).to.be.eqls(7);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it(_module.KoconutPrimitive.prototype.process.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
    var array, koconut;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            array = [1, 2, 3, 4, 5];
            koconut = _module.KoconutArray.from(array);
            (0, _chai.expect)(koconut).to.be.instanceOf(_module.KoconutArray);
            _context2.next = 5;
            return koconut.onEachIndexed(function (index, eachElement) {
              (0, _chai.expect)(eachElement).to.be.equals(index + 1);
            }).process();
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it(_module.KoconutPrimitive.prototype.also.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
    var koconut, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5);
            (0, _chai.expect)(koconut).to.be.instanceOf(_module.KoconutArray);
            _context3.next = 4;
            return koconut.also(function (result) {
              result.push(6, 7, 8);
            });
          case 4:
            result = _context3.sent;
            (0, _chai.expect)(result).to.be.eqls([1, 2, 3, 4, 5, 6, 7, 8]);
          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it(_module.KoconutPrimitive.prototype.retrieve.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
    var koconut, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            koconut = new _module.KoconutPrimitive(5);
            (0, _chai.expect)(koconut).to.be.instanceOf(_module.KoconutPrimitive);
            _context4.next = 4;
            return koconut.retrieve();
          case 4:
            result = _context4.sent;
            (0, _chai.expect)(result).to.be.eqls(koconut);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it(_module.KoconutPrimitive.prototype["yield"].name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
    var koconut, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            koconut = new _module.KoconutPrimitive(5);
            (0, _chai.expect)(koconut).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 4;
            return koconut["yield"]();
          case 4:
            result = _context5.sent;
            (0, _chai.expect)(result).to.be.equals(5);
          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});