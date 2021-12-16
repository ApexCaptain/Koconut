"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var _module = require("../../dist/module");

var _TestDataClasses = require("./TestDataClasses");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe("".concat(_module.KoconutArray.name, " -- Creator"), function () {
  it(_module.KoconutArray.from.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
    var koconutCase1, resultCase1, koconutCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            (0, _chai.expect)(koconutCase1).to.be.instanceOf(_module.KoconutArray);
            _context.next = 4;
            return koconutCase1["yield"]();

          case 4:
            resultCase1 = _context.sent;
            (0, _chai.expect)(resultCase1).to.be.eqls([1, 2, 3, 4, 5]);
            koconutCase2 = _module.KoconutArray.from();
            (0, _chai.expect)(koconutCase2).to.be.instanceOf(_module.KoconutArray);
            _context.next = 10;
            return koconutCase2["yield"]();

          case 10:
            resultCase2 = _context.sent;
            (0, _chai.expect)(resultCase2).to.be.eqls([]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Property Getter"), function () {
  it(_module.KoconutArray.prototype.size.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.size();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context2.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context2.sent;
            (0, _chai.expect)(result).to.equals(5);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it(_module.KoconutArray.prototype.indices.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.indices();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context3.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context3.sent;
            (0, _chai.expect)(result).to.eql([0, 1, 2, 3, 4]);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Accumulator"), function () {
  it(_module.KoconutArray.prototype.fold.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.fold(1, function (acc, eachElement) {
              return acc * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context4.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context4.sent;
            (0, _chai.expect)(result).equals(120);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it(_module.KoconutArray.prototype.foldIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.foldIndexed(0, function (eachIndex, acc, eachElement) {
              return acc + eachIndex + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context5.sent;
            (0, _chai.expect)(result).equals(25);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Calculator"), function () {
  it(_module.KoconutArray.prototype.count.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.count();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context6.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context6.sent;
            (0, _chai.expect)(resultCase1).to.equals(5);
            yieldableCase2 = koconut.count(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context6.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context6.sent;
            (0, _chai.expect)(resultCase2).to.equals(2);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it(_module.KoconutArray.prototype.maxBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxBy(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context7.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context7.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500));
            yieldableCase2 = koconut.maxBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context7.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context7.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxBy(function (eachElement) {
              return eachElement;
            });
            _context7.prev = 14;
            _context7.next = 17;
            return yieldableCase3.process();

          case 17:
            _context7.next = 22;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](14);
            (0, _chai.expect)(_context7.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 22:
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.maxBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context7.next = 27;
            return yieldableCase4["yield"]();

          case 27:
            resultCase4 = _context7.sent;
            (0, _chai.expect)(resultCase4).to.be.eqls(new _TestDataClasses.Worker('Grace', 'Hopper', 100));

          case 29:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[14, 19]]);
  })));
  it(_module.KoconutArray.prototype.maxByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxByOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context8.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500));
            yieldableCase2 = koconut.maxByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context8.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context8.sent;
            (0, _chai.expect)(resultCase3).equals(null);
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.maxByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 24;
            return yieldableCase4["yield"]();

          case 24:
            resultCase4 = _context8.sent;
            (0, _chai.expect)(resultCase4).to.be.eqls(new _TestDataClasses.Worker('Grace', 'Hopper', 100));

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it(_module.KoconutArray.prototype.maxOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxOf(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context9.sent;
            (0, _chai.expect)(resultCase1).equals('iPhone -- June');
            yieldableCase2 = koconut.maxOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context9.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));
            koconutCase3 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase3 = koconutCase3.maxOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context9.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.Worker('Grace', 'Hopper', 100));

          case 20:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it(_module.KoconutArray.prototype.maxOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxOfOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context10.sent;
            (0, _chai.expect)(resultCase1).equals('iPhone -- June');
            yieldableCase2 = koconut.maxOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context10.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price < 500;
            }).maxOfOrNull(function (eachElement) {
              return eachElement.price;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context10.sent;
            (0, _chai.expect)(resultCase3).equals(null);
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.maxOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 24;
            return yieldableCase4["yield"]();

          case 24:
            resultCase4 = _context10.sent;
            (0, _chai.expect)(resultCase4).eqls(new _TestDataClasses.Worker('Grace', 'Hopper', 100));

          case 26:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it(_module.KoconutArray.prototype.maxOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldable = koconut.maxOfWith(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context11.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context11.sent;
            (0, _chai.expect)(result).equals('Mac Book Air -- September');

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it(_module.KoconutArray.prototype.maxOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldable = koconut.maxOfWithOrNull(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context12.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context12.sent;
            (0, _chai.expect)(result).equals('Mac Book Air -- September');

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it(_module.KoconutArray.prototype.maxWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context13.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.prev = 9;
            _context13.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context13.next = 17;
            break;

          case 14:
            _context13.prev = 14;
            _context13.t0 = _context13["catch"](9);
            (0, _chai.expect)(_context13.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[9, 14]]);
  })));
  it(_module.KoconutArray.prototype.maxWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.maxWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context14.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context14.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context14.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context14.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it(_module.KoconutArray.prototype.minBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minBy(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context15.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context15.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase2 = koconut.minBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context15.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context15.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minBy(function (eachElement) {
              return eachElement;
            });
            _context15.prev = 14;
            _context15.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            _context15.next = 22;
            break;

          case 19:
            _context15.prev = 19;
            _context15.t0 = _context15["catch"](14);
            (0, _chai.expect)(_context15.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 22:
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.minBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context15.next = 27;
            return yieldableCase4["yield"]();

          case 27:
            resultCase4 = _context15.sent;
            (0, _chai.expect)(resultCase4).to.be.eqls(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50));

          case 29:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[14, 19]]);
  })));
  it(_module.KoconutArray.prototype.minByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minByOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context16.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase2 = koconut.minByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context16.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minByOrNull(function (eachElement) {
              return eachElement;
            });
            _context16.next = 16;
            return yieldableCase3["yield"]();

          case 16:
            resultCase3 = _context16.sent;
            (0, _chai.expect)(resultCase3).equals(null);
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.minByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 23;
            return yieldableCase4["yield"]();

          case 23:
            resultCase4 = _context16.sent;
            (0, _chai.expect)(resultCase4).to.be.eqls(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50));

          case 25:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  it(_module.KoconutArray.prototype.minOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minOf(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context17.sent;
            (0, _chai.expect)(resultCase1).equals('Mac Book Air -- September');
            yieldableCase2 = koconut.minOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context17.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            koconutCase3 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase3 = koconutCase3.minOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context17.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50));

          case 20:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it(_module.KoconutArray.prototype.minOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minOfOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context18.sent;
            (0, _chai.expect)(resultCase1).equals('Mac Book Air -- September');
            yieldableCase2 = koconut.minOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context18.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price < 500;
            }).minOfOrNull(function (eachElement) {
              return eachElement.price;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context18.sent;
            (0, _chai.expect)(resultCase3).equals(null);
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50), new _TestDataClasses.Worker('Jinyoung', 'Luvya', 60), new _TestDataClasses.Worker('Grace', 'Hopper', 100), new _TestDataClasses.Worker('Johann', 'Bernoulli', 80));
            yieldableCase4 = koconutCase4.minOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 24;
            return yieldableCase4["yield"]();

          case 24:
            resultCase4 = _context18.sent;
            (0, _chai.expect)(resultCase4).eqls(new _TestDataClasses.Worker('Jacob', 'Bernoulli', 50));

          case 26:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it(_module.KoconutArray.prototype.minOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldable = koconut.minOfWith(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context19.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context19.sent;
            (0, _chai.expect)(result).equals('iPhone -- June');

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it(_module.KoconutArray.prototype.minOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldable = koconut.minOfWithOrNull(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context20.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context20.sent;
            (0, _chai.expect)(result).equals('iPhone -- June');

          case 7:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it(_module.KoconutArray.prototype.minWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context21.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context21.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context21.prev = 9;
            _context21.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context21.next = 17;
            break;

          case 14:
            _context21.prev = 14;
            _context21.t0 = _context21["catch"](9);
            (0, _chai.expect)(_context21.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[9, 14]]);
  })));
  it(_module.KoconutArray.prototype.minWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee22() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase1 = koconut.minWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context22.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context22.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context22.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context22.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Caster"), function () {
  it(_module.KoconutArray.prototype.asArray.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee23() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5);
            yieldable = koconut.asArray();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context23.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context23.sent;
            (0, _chai.expect)(result).eqls([1, 2, 3, 4, 5]);

          case 7:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  })));
  it(_module.KoconutArray.prototype.asSet.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee24() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 1, 2, 2, 3, 3);
            yieldable = koconut.asSet();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutSet);
            _context24.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context24.sent;
            (0, _chai.expect)(result).eqls(new Set([1, 2, 3]));

          case 7:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Inspector"), function () {
  it(_module.KoconutArray.prototype.all.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee25() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.all(function (element) {
              return element > 2;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context25.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context25.sent;
            (0, _chai.expect)(resultCase1).to.equals(false);
            yieldableCase2 = koconut.all(function (element) {
              return element < 10;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context25.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context25.sent;
            (0, _chai.expect)(resultCase2).to.equals(true);

          case 13:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  })));
  it(_module.KoconutArray.prototype.any.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee26() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.any(function (element) {
              return element >= 4;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context26.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context26.sent;
            (0, _chai.expect)(resultCase1).to.equals(true);
            yieldableCase2 = koconut.any(function (element) {
              return element > 10;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context26.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context26.sent;
            (0, _chai.expect)(resultCase2).to.equals(false);

          case 13:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
  it(_module.KoconutArray.prototype.isEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee27() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5);
            yieldableCase1 = koconut.isEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context27.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context27.sent;
            (0, _chai.expect)(resultCase1).equals(false);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).isEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context27.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context27.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 13:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  })));
  it(_module.KoconutArray.prototype.isNotEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee28() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5);
            yieldableCase1 = koconut.isNotEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context28.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context28.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).isNotEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context28.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context28.sent;
            (0, _chai.expect)(resultCase2).equals(false);

          case 13:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  })));
  it(_module.KoconutArray.prototype.isNullOrEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee29() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5);
            yieldableCase1 = koconut.isNullOrEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context29.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context29.sent;
            (0, _chai.expect)(resultCase1).equals(false);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).isNullOrEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context29.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context29.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 13:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29);
  })));
  it(_module.KoconutArray.prototype.contains.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee30() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.contains(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context30.sent;
            (0, _chai.expect)(resultCase1).to.equals(true);
            yieldableCase2 = koconut.contains(6);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context30.sent;
            (0, _chai.expect)(resultCase2).to.equals(false);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase3 = koconutCase3.contains(new _TestDataClasses.Person('Jinyoung', 'Luvya'));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context30.sent;
            (0, _chai.expect)(resultCase3).to.equal(true);
            koconutCase4 = _module.KoconutArray.of(new _TestDataClasses.Dog('Brie', 3, 0), new _TestDataClasses.Dog('Mike', 5, 1), new _TestDataClasses.Dog('unknown', 3, 0));
            yieldableCase4 = koconutCase4.contains(new _TestDataClasses.Dog('no-name', 3, 2));
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 25;
            return yieldableCase4["yield"]();

          case 25:
            resultCase4 = _context30.sent;
            (0, _chai.expect)(resultCase4).to.equal(false);

          case 27:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  })));
  it(_module.KoconutArray.prototype.containsAll.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee31() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4, koconutCase5, yieldableCase5, resultCase5;
    return _regenerator["default"].wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            koconut = _module.KoconutArray.from('abc');
            yieldableCase1 = koconut.containsAll('ab');
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context31.sent;
            (0, _chai.expect)(resultCase1).to.equals(true);
            yieldableCase2 = koconut.containsAll('abcd');
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context31.sent;
            (0, _chai.expect)(resultCase2).to.equals(false);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase3 = koconutCase3.containsAll([new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli')]);
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context31.sent;
            (0, _chai.expect)(resultCase3).to.equals(true);
            koconutCase4 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase4 = koconutCase4.containsAll([new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Steve', 'Jobs')]);
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 25;
            return yieldableCase4["yield"]();

          case 25:
            resultCase4 = _context31.sent;
            (0, _chai.expect)(resultCase4).to.equals(false);
            koconutCase5 = _module.KoconutArray.of(new _TestDataClasses.Dog('Brie', 3, 0), new _TestDataClasses.Dog('Mike', 5, 1));
            yieldableCase5 = koconutCase5.containsAll([new _TestDataClasses.Dog('Brie', 3, 0), new _TestDataClasses.Dog('Mike', 5, 1)]);
            (0, _chai.expect)(yieldableCase5).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 32;
            return yieldableCase5["yield"]();

          case 32:
            resultCase5 = _context31.sent;
            (0, _chai.expect)(resultCase5).to.be.eqls(true);

          case 34:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31);
  })));
  it(_module.KoconutArray.prototype.none.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee32() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.none();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context32.sent;
            (0, _chai.expect)(resultCase1).equals(false);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).none();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context32.sent;
            (0, _chai.expect)(resultCase2).equals(true);
            yieldableCase3 = koconut.none(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context32.sent;
            (0, _chai.expect)(resultCase3).equals(false);
            yieldableCase4 = koconut.none(function (eachElement) {
              return eachElement % 10 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 23;
            return yieldableCase4["yield"]();

          case 23:
            resultCase4 = _context32.sent;
            (0, _chai.expect)(resultCase4).equals(true);

          case 25:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Iterator"), function () {
  it(_module.KoconutArray.prototype.forEach.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee33() {
    var koconut, yieldableCase1, resultCase2, yieldableCase2;
    return _regenerator["default"].wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.forEach(function (eachElement) {
              (0, _chai.expect)(eachElement).to.be.a('number');
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context33.next = 5;
            return yieldableCase1.process();

          case 5:
            resultCase2 = new Array();
            yieldableCase2 = koconut.forEach(function (eachElement) {
              if (eachElement > 3) return false;
              resultCase2.push(eachElement);
            });
            _context33.next = 9;
            return yieldableCase2.process();

          case 9:
            (0, _chai.expect)(resultCase2).to.be.eqls([1, 2, 3]);

          case 10:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  })));
  it(_module.KoconutArray.prototype.forEachIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee34() {
    var koconut, yieldableCase1, resultCase2, yieldableCase2;
    return _regenerator["default"].wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.forEachIndexed(function (eachIndex, eachElement) {
              (0, _chai.expect)(eachElement - eachIndex).equals(1);
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context34.next = 5;
            return yieldableCase1.process();

          case 5:
            resultCase2 = new Array();
            yieldableCase2 = koconut.forEachIndexed(function (eachIndex, eachElement) {
              if (eachIndex > 2) return false;else resultCase2.push(eachElement);
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context34.next = 10;
            return yieldableCase2.process();

          case 10:
            (0, _chai.expect)(resultCase2).to.be.eqls([1, 2, 3]);

          case 11:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  })));
  it(_module.KoconutArray.prototype.onEach.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee35() {
    var koconut, yieldableCase1, resultCase2, yieldableCase2;
    return _regenerator["default"].wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.onEach(function (eachElement) {
              (0, _chai.expect)(eachElement).to.be.a('number');
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context35.next = 5;
            return yieldableCase1.process();

          case 5:
            resultCase2 = new Array();
            yieldableCase2 = koconut.onEach(function (eachElement) {
              if (eachElement > 3) return false;
              resultCase2.push(eachElement);
            });
            _context35.next = 9;
            return yieldableCase2.process();

          case 9:
            (0, _chai.expect)(resultCase2).to.be.eqls([1, 2, 3]);

          case 10:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35);
  })));
  it(_module.KoconutArray.prototype.onEachIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee36() {
    var koconut, yieldableCase1, resultCase2, yieldableCase2;
    return _regenerator["default"].wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.onEachIndexed(function (eachIndex, eachElement) {
              (0, _chai.expect)(eachElement - eachIndex).equals(1);
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context36.next = 5;
            return yieldableCase1.process();

          case 5:
            resultCase2 = new Array();
            yieldableCase2 = koconut.onEachIndexed(function (eachIndex, eachElement) {
              if (eachIndex > 2) return false;
              resultCase2.push(eachElement);
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context36.next = 10;
            return yieldableCase2.process();

          case 10:
            (0, _chai.expect)(resultCase2).to.be.eqls([1, 2, 3]);

          case 11:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Manipulator"), function () {
  it(_module.KoconutArray.prototype.distinct.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee37() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultArrayCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from('aAbBcCaA');
            yieldableCase1 = koconutCase1.distinct();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context37.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context37.sent;
            (0, _chai.expect)(resultCase1.join('')).equals('aAbBcC');
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.distinct();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context37.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context37.sent;
            expectedResultArrayCase2 = [new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')];
            (0, _chai.expect)(resultCase2).to.eql(expectedResultArrayCase2);
            koconutCase3 = _module.KoconutArray.of(new _TestDataClasses.Dog('no-name 1', 3, 0), new _TestDataClasses.Dog('no-name 2', 4, 0));
            yieldableCase3 = koconutCase3.distinct();
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context37.next = 20;
            return yieldableCase3["yield"]();

          case 20:
            resultCase3 = _context37.sent;
            (0, _chai.expect)(resultCase3).to.be.eqls([new _TestDataClasses.Dog('no-name 1', 3, 0)]);

          case 22:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37);
  })));
  it(_module.KoconutArray.prototype.distinctBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee38() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultArrayCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from('aAbBcCaA');
            yieldableCase1 = koconutCase1.distinctBy(function (element) {
              return element.toUpperCase();
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context38.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context38.sent;
            (0, _chai.expect)(resultCase1.join('')).equals('abc');
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.distinctBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context38.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context38.sent;
            expectedResultArrayCase2 = [new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')];
            (0, _chai.expect)(resultCase2).to.eql(expectedResultArrayCase2);
            koconutCase3 = _module.KoconutArray.of(new _TestDataClasses.Dog('no-name 1', 3, 0), new _TestDataClasses.Dog('no-name 2', 4, 0));
            yieldableCase3 = koconutCase3.distinctBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context38.next = 20;
            return yieldableCase3["yield"]();

          case 20:
            resultCase3 = _context38.sent;
            (0, _chai.expect)(resultCase3).to.be.eqls([new _TestDataClasses.Dog('no-name 1', 3, 0)]);

          case 22:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38);
  })));
  it(_module.KoconutArray.prototype.drop.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee39() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            koconut = _module.KoconutArray.from('ABCDEFG');
            yieldableCase1 = koconut.drop(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context39.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context39.sent;
            (0, _chai.expect)(resultCase1.join('')).equals('DEFG');
            yieldableCase2 = koconut.drop(-2);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context39.prev = 9;
            _context39.next = 12;
            return yieldableCase2.process();

          case 12:
            _context39.next = 17;
            break;

          case 14:
            _context39.prev = 14;
            _context39.t0 = _context39["catch"](9);
            (0, _chai.expect)(_context39.t0).to.be.instanceOf(_module.KoconutInvalidArgumentException);

          case 17:
          case "end":
            return _context39.stop();
        }
      }
    }, _callee39, null, [[9, 14]]);
  })));
  it(_module.KoconutArray.prototype.dropLast.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee40() {
    var koconut, yieldable, result, yieldableCase2;
    return _regenerator["default"].wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            koconut = _module.KoconutArray.from('ABCDEFG');
            yieldable = koconut.dropLast(3);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context40.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context40.sent;
            (0, _chai.expect)(result.join('')).equals('ABCD');
            yieldableCase2 = koconut.dropLast(-2);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context40.prev = 9;
            _context40.next = 12;
            return yieldableCase2.process();

          case 12:
            _context40.next = 17;
            break;

          case 14:
            _context40.prev = 14;
            _context40.t0 = _context40["catch"](9);
            (0, _chai.expect)(_context40.t0).to.be.instanceOf(_module.KoconutInvalidArgumentException);

          case 17:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40, null, [[9, 14]]);
  })));
  it(_module.KoconutArray.prototype.dropLastWhile.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee41() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            koconut = _module.KoconutArray.from('ABCDEFG');
            yieldable = koconut.dropLastWhile(function (eachElement) {
              return eachElement > 'C';
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context41.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context41.sent;
            (0, _chai.expect)(result.join('')).equals('ABC');

          case 7:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41);
  })));
  it(_module.KoconutArray.prototype.dropWhile.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee42() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            koconut = _module.KoconutArray.from('ABCDEFG');
            yieldable = koconut.dropWhile(function (eachElement) {
              return eachElement < 'D';
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context42.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context42.sent;
            (0, _chai.expect)(result.join('')).equals('DEFG');

          case 7:
          case "end":
            return _context42.stop();
        }
      }
    }, _callee42);
  })));
  it(_module.KoconutArray.prototype.filter.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee43() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldable = koconut.filter(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context43.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context43.sent;
            (0, _chai.expect)(result).eqls([2, 4, 6]);

          case 7:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee43);
  })));
  it(_module.KoconutArray.prototype.filterNot.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee44() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee44$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldable = koconut.filterNot(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context44.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context44.sent;
            (0, _chai.expect)(result).eqls([1, 2, 4, 5, 7]);

          case 7:
          case "end":
            return _context44.stop();
        }
      }
    }, _callee44);
  })));
  it(_module.KoconutArray.prototype.filterTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee45() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            destination = new Array();
            yieldable = koconut.filterTo(destination, function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context45.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([2, 4, 6]);

          case 7:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee45);
  })));
  it(_module.KoconutArray.prototype.filterNotTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee46() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            destination = new Array();
            yieldable = koconut.filterNotTo(destination, function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context46.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 2, 4, 5, 7]);

          case 7:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee46);
  })));
  it(_module.KoconutArray.prototype.filterIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee47() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            koconut = _module.KoconutArray.from([0, 1, 2, 3, 4, 8, 6]);
            yieldable = koconut.filterIndexed(function (eachIndex, eachElement) {
              return eachIndex == eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context47.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context47.sent;
            (0, _chai.expect)(result).eqls([0, 1, 2, 3, 4, 6]);

          case 7:
          case "end":
            return _context47.stop();
        }
      }
    }, _callee47);
  })));
  it(_module.KoconutArray.prototype.filterIndexedTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee48() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            koconut = _module.KoconutArray.from([0, 1, 2, 3, 4, 8, 6]);
            destination = new Array();
            yieldable = koconut.filterIndexedTo(destination, function (eachIndex, eachElement) {
              return eachIndex == eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context48.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([0, 1, 2, 3, 4, 6]);

          case 7:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee48);
  })));
  it(_module.KoconutArray.prototype.filterNotNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee49() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee49$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, null, 4]);
            yieldable = koconut.filterNotNull();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context49.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context49.sent;
            (0, _chai.expect)(result).eqls([1, 2, 4]);

          case 7:
          case "end":
            return _context49.stop();
        }
      }
    }, _callee49);
  })));
  it(_module.KoconutArray.prototype.filterNotNullTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee50() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee50$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, null, 4]);
            destination = new Array();
            yieldable = koconut.filterNotNullTo(destination);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context50.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 2, 4]);

          case 7:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee50);
  })));
  it(_module.KoconutArray.prototype.sortedBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee51() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, expectedResultArrayCase3;
    return _regenerator["default"].wrap(function _callee51$(_context51) {
      while (1) {
        switch (_context51.prev = _context51.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from(['aaa', 'cc', 'bbbb']);
            yieldableCase1 = koconutCase1.sortedBy(function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context51.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context51.sent;
            (0, _chai.expect)(resultCase1).eqls(['cc', 'aaa', 'bbbb']);
            koconutCase2 = _module.KoconutArray.from('dcba');
            yieldableCase2 = koconutCase2.sortedBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context51.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context51.sent;
            (0, _chai.expect)(resultCase2).eqls(['a', 'b', 'c', 'd']);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase3 = koconutCase3.sortedBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context51.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context51.sent;
            expectedResultArrayCase3 = [new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500), new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000)];
            (0, _chai.expect)(resultCase3).eqls(expectedResultArrayCase3);

          case 22:
          case "end":
            return _context51.stop();
        }
      }
    }, _callee51);
  })));
  it(_module.KoconutArray.prototype.sortedByDescending.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee52() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, expectedResultArrayCase3;
    return _regenerator["default"].wrap(function _callee52$(_context52) {
      while (1) {
        switch (_context52.prev = _context52.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from(['aaa', 'cc', 'bbbb']);
            yieldableCase1 = koconutCase1.sortedByDescending(function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context52.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context52.sent;
            (0, _chai.expect)(resultCase1).eqls(['bbbb', 'aaa', 'cc']);
            koconutCase2 = _module.KoconutArray.from('dcba');
            yieldableCase2 = koconutCase2.sortedByDescending(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context52.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context52.sent;
            (0, _chai.expect)(resultCase2).eqls(['d', 'c', 'b', 'a']);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase3 = koconutCase3.sortedByDescending(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context52.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context52.sent;
            expectedResultArrayCase3 = [new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200)];
            (0, _chai.expect)(resultCase3).eqls(expectedResultArrayCase3);

          case 22:
          case "end":
            return _context52.stop();
        }
      }
    }, _callee52);
  })));
  it(_module.KoconutArray.prototype.sortedWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee53() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultArrayCase2;
    return _regenerator["default"].wrap(function _callee53$(_context53) {
      while (1) {
        switch (_context53.prev = _context53.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from(['aaa', 'cc', 'bbbb']);
            yieldableCase1 = koconutCase1.sortedWith(function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context53.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context53.sent;
            (0, _chai.expect)(resultCase1).eqls(['cc', 'aaa', 'bbbb']);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase2 = koconutCase2.sortedWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context53.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context53.sent;
            expectedResultArrayCase2 = [new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500), new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200)];
            (0, _chai.expect)(resultCase2).eqls(expectedResultArrayCase2);

          case 15:
          case "end":
            return _context53.stop();
        }
      }
    }, _callee53);
  })));
  it(_module.KoconutArray.prototype.take.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee54() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee54$(_context54) {
      while (1) {
        switch (_context54.prev = _context54.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcdefg');
            yieldable = koconut.take(3);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context54.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context54.sent;
            (0, _chai.expect)(result).eqls(['a', 'b', 'c']);

          case 7:
          case "end":
            return _context54.stop();
        }
      }
    }, _callee54);
  })));
  it(_module.KoconutArray.prototype.takeLast.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee55() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee55$(_context55) {
      while (1) {
        switch (_context55.prev = _context55.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcdefg');
            yieldable = koconut.takeLast(3);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context55.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context55.sent;
            (0, _chai.expect)(result).eqls(['e', 'f', 'g']);

          case 7:
          case "end":
            return _context55.stop();
        }
      }
    }, _callee55);
  })));
  it(_module.KoconutArray.prototype.takeLastWhile.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee56() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee56$(_context56) {
      while (1) {
        switch (_context56.prev = _context56.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcdefg');
            yieldable = koconut.takeLastWhile(function (eachElement) {
              return eachElement > 'c';
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context56.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context56.sent;
            (0, _chai.expect)(result).eqls(['d', 'e', 'f', 'g']);

          case 7:
          case "end":
            return _context56.stop();
        }
      }
    }, _callee56);
  })));
  it(_module.KoconutArray.prototype.takeWhile.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee57() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee57$(_context57) {
      while (1) {
        switch (_context57.prev = _context57.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcdefg');
            yieldable = koconut.takeWhile(function (eachElement) {
              return eachElement < 'f';
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context57.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context57.sent;
            (0, _chai.expect)(result).eqls(['a', 'b', 'c', 'd', 'e']);

          case 7:
          case "end":
            return _context57.stop();
        }
      }
    }, _callee57);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Selector"), function () {
  it(_module.KoconutArray.prototype.elementAt.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee58() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee58$(_context58) {
      while (1) {
        switch (_context58.prev = _context58.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            yieldable = koconut.elementAt(0);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context58.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context58.sent;
            (0, _chai.expect)(result).equals(1);

          case 7:
          case "end":
            return _context58.stop();
        }
      }
    }, _callee58);
  })));
  it(_module.KoconutArray.prototype.elementAtOrElse.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee59() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee59$(_context59) {
      while (1) {
        switch (_context59.prev = _context59.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            yieldableCase1 = koconut.elementAtOrElse(0, function (index) {
              return index + 1;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context59.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context59.sent;
            (0, _chai.expect)(resultCase1).equals(1);
            yieldableCase2 = koconut.elementAtOrElse(3, function (index) {
              return index + 1;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context59.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context59.sent;
            (0, _chai.expect)(resultCase2).equals(4);

          case 13:
          case "end":
            return _context59.stop();
        }
      }
    }, _callee59);
  })));
  it(_module.KoconutArray.prototype.elementAtOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee60() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee60$(_context60) {
      while (1) {
        switch (_context60.prev = _context60.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            yieldableCase1 = koconut.elementAtOrNull(0);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context60.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context60.sent;
            (0, _chai.expect)(resultCase1).equals(1);
            yieldableCase2 = koconut.elementAtOrNull(3);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context60.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context60.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context60.stop();
        }
      }
    }, _callee60);
  })));
  it(_module.KoconutArray.prototype.find.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee61() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee61$(_context61) {
      while (1) {
        switch (_context61.prev = _context61.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldable = koconut.find(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context61.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context61.sent;
            (0, _chai.expect)(result).equals(2);

          case 7:
          case "end":
            return _context61.stop();
        }
      }
    }, _callee61);
  })));
  it(_module.KoconutArray.prototype.findLast.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee62() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee62$(_context62) {
      while (1) {
        switch (_context62.prev = _context62.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldable = koconut.findLast(function (eachElement) {
              return eachElement % 2 == 1;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context62.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context62.sent;
            (0, _chai.expect)(result).equals(7);

          case 7:
          case "end":
            return _context62.stop();
        }
      }
    }, _callee62);
  })));
  it(_module.KoconutArray.prototype.first.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee63() {
    var koconutCase1, yieldableCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee63$(_context63) {
      while (1) {
        switch (_context63.prev = _context63.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconutCase1.filter(function (eachElement) {
              return eachElement > 10;
            }).first();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context63.prev = 3;
            _context63.next = 6;
            return yieldableCase1.process();

          case 6:
            _context63.next = 11;
            break;

          case 8:
            _context63.prev = 8;
            _context63.t0 = _context63["catch"](3);
            (0, _chai.expect)(_context63.t0).instanceOf(_module.KoconutNoSuchElementException);

          case 11:
            koconutCase2 = _module.KoconutArray.from('abc');
            yieldableCase2 = koconutCase2.first(function (eachElement) {
              return eachElement > 'd';
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context63.prev = 14;
            _context63.next = 17;
            return yieldableCase2.process();

          case 17:
            _context63.next = 22;
            break;

          case 19:
            _context63.prev = 19;
            _context63.t1 = _context63["catch"](14);
            (0, _chai.expect)(_context63.t1).instanceOf(_module.KoconutNoSuchElementException);

          case 22:
            koconutCase3 = _module.KoconutArray.from([1, 2, 3]);
            yieldableCase3 = koconutCase3.first();
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context63.next = 27;
            return yieldableCase3["yield"]();

          case 27:
            resultCase3 = _context63.sent;
            (0, _chai.expect)(resultCase3).equals(1);
            koconutCase4 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase4 = koconutCase4.first(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context63.next = 34;
            return yieldableCase4["yield"]();

          case 34:
            resultCase4 = _context63.sent;
            (0, _chai.expect)(resultCase4).equals(3);

          case 36:
          case "end":
            return _context63.stop();
        }
      }
    }, _callee63, null, [[3, 8], [14, 19]]);
  })));
  it(_module.KoconutArray.prototype.firstOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee64() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee64$(_context64) {
      while (1) {
        switch (_context64.prev = _context64.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconutCase1.filter(function (eachElement) {
              return eachElement > 10;
            }).firstOrNull();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context64.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context64.sent;
            (0, _chai.expect)(resultCase1).equals(null);
            koconutCase2 = _module.KoconutArray.from('abc');
            yieldableCase2 = koconutCase2.firstOrNull(function (eachElement) {
              return eachElement > 'd';
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context64.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context64.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([1, 2, 3]);
            yieldableCase3 = koconutCase3.firstOrNull();
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context64.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context64.sent;
            (0, _chai.expect)(resultCase3).equals(1);
            koconutCase4 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase4 = koconutCase4.first(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context64.next = 26;
            return yieldableCase4["yield"]();

          case 26:
            resultCase4 = _context64.sent;
            (0, _chai.expect)(resultCase4).equals(3);

          case 28:
          case "end":
            return _context64.stop();
        }
      }
    }, _callee64);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Transformer"), function () {
  it(_module.KoconutArray.prototype.associate.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee65() {
    var koconut, expectedResultEntryArray, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee65$(_context65) {
      while (1) {
        switch (_context65.prev = _context65.next) {
          case 0:
            koconut = _module.KoconutArray.from(['Grace Hopper', 'Jacob Bernoulli', 'Johann Bernoulli', 'Jinyoung Luvya']);
            expectedResultEntryArray = [['Hopper', 'Grace'], ['Bernoulli', 'Johann'], ['Luvya', 'Jinyoung']];
            yieldableCase1 = koconut.associate(function (eachElement) {
              var _eachElement$split = eachElement.split(' '),
                  _eachElement$split2 = (0, _slicedToArray2["default"])(_eachElement$split, 2),
                  firstName = _eachElement$split2[0],
                  lastName = _eachElement$split2[1];

              return [lastName, firstName];
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutMap);
            _context65.next = 6;
            return yieldableCase1["yield"]();

          case 6:
            resultCase1 = _context65.sent;
            (0, _chai.expect)(Array.from(resultCase1.entries())).to.eql(expectedResultEntryArray);
            yieldableCase2 = koconut.associate(function (eachElement) {
              var _eachElement$split3 = eachElement.split(' '),
                  _eachElement$split4 = (0, _slicedToArray2["default"])(_eachElement$split3, 2),
                  firstName = _eachElement$split4[0],
                  lastName = _eachElement$split4[1];

              return new _module.Pair(lastName, firstName);
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutMap);
            _context65.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context65.sent;
            (0, _chai.expect)(Array.from(resultCase2.entries())).to.eql(expectedResultEntryArray);
            yieldableCase3 = koconut.associate(function (eachElement) {
              var _eachElement$split5 = eachElement.split(' '),
                  _eachElement$split6 = (0, _slicedToArray2["default"])(_eachElement$split5, 2),
                  firstName = _eachElement$split6[0],
                  lastName = _eachElement$split6[1];

              return new _module.KoconutPair(lastName, firstName);
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutMap);
            _context65.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context65.sent;
            (0, _chai.expect)(Array.from(resultCase3.entries())).to.eql(expectedResultEntryArray);

          case 20:
          case "end":
            return _context65.stop();
        }
      }
    }, _callee65);
  })));
  it(_module.KoconutArray.prototype.associateBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee66() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, expectedResultEntryArrayCase2;
    return _regenerator["default"].wrap(function _callee66$(_context66) {
      while (1) {
        switch (_context66.prev = _context66.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase1 = koconut.associateBy(function (eachElement) {
              return eachElement.lastName;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutMap);
            _context66.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context66.sent;
            (0, _chai.expect)(resultCase1 === null || resultCase1 === void 0 ? void 0 : resultCase1.get('Hopper')).to.eql(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(resultCase1 === null || resultCase1 === void 0 ? void 0 : resultCase1.get('Bernoulli')).to.eql(new _TestDataClasses.Person('Johann', 'Bernoulli'));
            (0, _chai.expect)(resultCase1 === null || resultCase1 === void 0 ? void 0 : resultCase1.get('Luvya')).to.eql(new _TestDataClasses.Person('Jinyoung', 'Luvya'));
            yieldableCase2 = koconut.associateBy(function (eachElement) {
              return eachElement.lastName;
            }, function (eachElement) {
              return eachElement.firstName;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutMap);
            _context66.next = 13;
            return yieldableCase2["yield"]();

          case 13:
            resultCase2 = _context66.sent;
            expectedResultEntryArrayCase2 = [['Hopper', 'Grace'], ['Bernoulli', 'Johann'], ['Luvya', 'Jinyoung']];
            (0, _chai.expect)(Array.from(resultCase2.entries())).to.eql(expectedResultEntryArrayCase2);

          case 16:
          case "end":
            return _context66.stop();
        }
      }
    }, _callee66);
  })));
  it(_module.KoconutArray.prototype.associateByTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee67() {
    var koconut, destinationCase1, yieldableCase1, destinationCase2, yieldableCase2, expectedResultEntryArrayCase2;
    return _regenerator["default"].wrap(function _callee67$(_context67) {
      while (1) {
        switch (_context67.prev = _context67.next) {
          case 0:
            koconut = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            destinationCase1 = new Map();
            yieldableCase1 = koconut.associateByTo(destinationCase1, function (eachElement) {
              return eachElement.lastName;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context67.next = 6;
            return yieldableCase1.process();

          case 6:
            (0, _chai.expect)(destinationCase1.get('Hopper')).to.eql(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(destinationCase1.get('Bernoulli')).to.eql(new _TestDataClasses.Person('Johann', 'Bernoulli'));
            (0, _chai.expect)(destinationCase1.get('Luvya')).to.eql(new _TestDataClasses.Person('Jinyoung', 'Luvya'));
            destinationCase2 = new Map();
            yieldableCase2 = koconut.associateByTo(destinationCase2, function (eachElement) {
              return eachElement.lastName;
            }, function (eachElement) {
              return eachElement.firstName;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context67.next = 14;
            return yieldableCase2.process();

          case 14:
            expectedResultEntryArrayCase2 = [['Hopper', 'Grace'], ['Bernoulli', 'Johann'], ['Luvya', 'Jinyoung']];
            (0, _chai.expect)(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArrayCase2);

          case 16:
          case "end":
            return _context67.stop();
        }
      }
    }, _callee67);
  })));
  it(_module.KoconutArray.prototype.associateTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee68() {
    var koconut, expectedResultEntryArray, destinationCase1, yieldableCase1, destinationCase2, yieldableCase2, destinationCase3, yieldableCase3;
    return _regenerator["default"].wrap(function _callee68$(_context68) {
      while (1) {
        switch (_context68.prev = _context68.next) {
          case 0:
            koconut = _module.KoconutArray.from(['Grace Hopper', 'Jacob Bernoulli', 'Johann Bernoulli', 'Jinyoung Luvya']);
            expectedResultEntryArray = [['Hopper', 'Grace'], ['Bernoulli', 'Johann'], ['Luvya', 'Jinyoung']];
            destinationCase1 = new Map();
            yieldableCase1 = koconut.associateTo(destinationCase1, function (eachElement) {
              var _eachElement$split7 = eachElement.split(' '),
                  _eachElement$split8 = (0, _slicedToArray2["default"])(_eachElement$split7, 2),
                  firstName = _eachElement$split8[0],
                  lastName = _eachElement$split8[1];

              return [lastName, firstName];
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context68.next = 7;
            return yieldableCase1.process();

          case 7:
            (0, _chai.expect)(Array.from(destinationCase1.entries())).to.eql(expectedResultEntryArray);
            destinationCase2 = new Map();
            yieldableCase2 = koconut.associateTo(destinationCase2, function (eachElement) {
              var _eachElement$split9 = eachElement.split(' '),
                  _eachElement$split10 = (0, _slicedToArray2["default"])(_eachElement$split9, 2),
                  firstName = _eachElement$split10[0],
                  lastName = _eachElement$split10[1];

              return new _module.Pair(lastName, firstName);
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context68.next = 13;
            return yieldableCase2.process();

          case 13:
            (0, _chai.expect)(Array.from(destinationCase2.entries())).to.eql(expectedResultEntryArray);
            destinationCase3 = new Map();
            yieldableCase3 = koconut.associateTo(destinationCase3, function (eachElement) {
              var _eachElement$split11 = eachElement.split(' '),
                  _eachElement$split12 = (0, _slicedToArray2["default"])(_eachElement$split11, 2),
                  firstName = _eachElement$split12[0],
                  lastName = _eachElement$split12[1];

              return new _module.KoconutPair(lastName, firstName);
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context68.next = 19;
            return yieldableCase3.process();

          case 19:
            (0, _chai.expect)(Array.from(destinationCase3.entries())).to.eql(expectedResultEntryArray);

          case 20:
          case "end":
            return _context68.stop();
        }
      }
    }, _callee68);
  })));
  it(_module.KoconutArray.prototype.associateWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee69() {
    var koconut, yieldable, result, expectedResultEntryArray;
    return _regenerator["default"].wrap(function _callee69$(_context69) {
      while (1) {
        switch (_context69.prev = _context69.next) {
          case 0:
            koconut = _module.KoconutArray.from(['a', 'ab', 'abc', 'abcd']);
            yieldable = koconut.associateWith(function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context69.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context69.sent;
            expectedResultEntryArray = [['a', 1], ['ab', 2], ['abc', 3], ['abcd', 4]];
            (0, _chai.expect)(Array.from(result.entries())).to.eql(expectedResultEntryArray);

          case 8:
          case "end":
            return _context69.stop();
        }
      }
    }, _callee69);
  })));
  it(_module.KoconutArray.prototype.associateWithTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee70() {
    var koconut, destination, yieldable, expectedResultEntryArray;
    return _regenerator["default"].wrap(function _callee70$(_context70) {
      while (1) {
        switch (_context70.prev = _context70.next) {
          case 0:
            koconut = _module.KoconutArray.from(['Grace Hopper', 'Jacob Bernoulli', 'Johann Bernoulli', 'Jinyoung Luvya']);
            destination = new Map();
            yieldable = koconut.associateWithTo(destination, function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context70.next = 6;
            return yieldable.process();

          case 6:
            expectedResultEntryArray = [['Grace Hopper', 12], ['Jacob Bernoulli', 15], ['Johann Bernoulli', 16], ['Jinyoung Luvya', 14]];
            (0, _chai.expect)(Array.from(destination.entries())).to.eql(expectedResultEntryArray);

          case 8:
          case "end":
            return _context70.stop();
        }
      }
    }, _callee70);
  })));
  it(_module.KoconutArray.prototype.chunked.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee71() {
    var koconut, yieldableCase1, resultCase1, expectedResultArrayCase1, yieldableCase2, resultCase2, expectedResultArrayCase2;
    return _regenerator["default"].wrap(function _callee71$(_context71) {
      while (1) {
        switch (_context71.prev = _context71.next) {
          case 0:
            koconut = _module.KoconutArray.from('one two three four five six seven eight nine ten'.split(' '));
            yieldableCase1 = koconut.chunked(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context71.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context71.sent;
            expectedResultArrayCase1 = [['one', 'two', 'three'], ['four', 'five', 'six'], ['seven', 'eight', 'nine'], ['ten']];
            (0, _chai.expect)(resultCase1).to.eql(expectedResultArrayCase1);
            yieldableCase2 = koconut.chunked(3, function (eachElements) {
              return eachElements.join(' ');
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context71.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context71.sent;
            expectedResultArrayCase2 = ['one two three', 'four five six', 'seven eight nine', 'ten'];
            (0, _chai.expect)(resultCase2).to.eql(expectedResultArrayCase2);

          case 15:
          case "end":
            return _context71.stop();
        }
      }
    }, _callee71);
  })));
  it(_module.KoconutArray.prototype.flatMap.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee72() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee72$(_context72) {
      while (1) {
        switch (_context72.prev = _context72.next) {
          case 0:
            koconut = _module.KoconutArray.from(['abc', 'de']);
            yieldable = koconut.flatMap(function (eachElement) {
              return eachElement.split('');
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context72.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context72.sent;
            (0, _chai.expect)(result).eqls(['a', 'b', 'c', 'd', 'e']);

          case 7:
          case "end":
            return _context72.stop();
        }
      }
    }, _callee72);
  })));
  it(_module.KoconutArray.prototype.flatMapIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee73() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee73$(_context73) {
      while (1) {
        switch (_context73.prev = _context73.next) {
          case 0:
            koconut = _module.KoconutArray.from(['abc', 'def', 'ghi', 'jkl']);
            yieldable = koconut.flatMapIndexed(function (eachIndex, eachElement) {
              if (eachIndex % 2 == 0) return eachElement.split('');else return [];
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context73.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context73.sent;
            (0, _chai.expect)(result).eqls(['a', 'b', 'c', 'g', 'h', 'i']);

          case 7:
          case "end":
            return _context73.stop();
        }
      }
    }, _callee73);
  })));
  it(_module.KoconutArray.prototype.flatMapTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee74() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee74$(_context74) {
      while (1) {
        switch (_context74.prev = _context74.next) {
          case 0:
            koconut = _module.KoconutArray.from(['abc', 'de']);
            destination = new Array();
            yieldable = koconut.flatMapTo(destination, function (eachElement) {
              return eachElement.split('');
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context74.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls(['a', 'b', 'c', 'd', 'e']);

          case 7:
          case "end":
            return _context74.stop();
        }
      }
    }, _callee74);
  })));
  it(_module.KoconutArray.prototype.flatMapIndexedTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee75() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee75$(_context75) {
      while (1) {
        switch (_context75.prev = _context75.next) {
          case 0:
            koconut = _module.KoconutArray.from(['abc', 'def', 'ghi', 'jkl']);
            destination = new Array();
            yieldable = koconut.flatMapIndexedTo(destination, function (eachIndex, eachElement) {
              if (eachIndex % 2 == 0) return eachElement.split('');else return [];
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context75.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls(['a', 'b', 'c', 'g', 'h', 'i']);

          case 7:
          case "end":
            return _context75.stop();
        }
      }
    }, _callee75);
  })));
  it(_module.KoconutArray.prototype.groupBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee76() {
    var koconutCase1, yieldableCase1, resultCase1, expectedResultEntryArrayCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultEntryArrayCase2;
    return _regenerator["default"].wrap(function _callee76$(_context76) {
      while (1) {
        switch (_context76.prev = _context76.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from(['a', 'abc', 'ab', 'def', 'abcd']);
            yieldableCase1 = koconutCase1.groupBy(function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutMap);
            _context76.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context76.sent;
            expectedResultEntryArrayCase1 = [[1, ['a']], [3, ['abc', 'def']], [2, ['ab']], [4, ['abcd']]];
            (0, _chai.expect)(Array.from(resultCase1.entries())).eqls(expectedResultEntryArrayCase1);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.groupBy(function (eachElement) {
              return eachElement.lastName;
            }, function (eachElement) {
              return eachElement.firstName;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutMap);
            _context76.next = 13;
            return yieldableCase2["yield"]();

          case 13:
            resultCase2 = _context76.sent;
            expectedResultEntryArrayCase2 = [['Hopper', ['Grace']], ['Bernoulli', ['Jacob', 'Johann']], ['Luvya', ['Jinyoung']]];
            (0, _chai.expect)(Array.from(resultCase2.entries())).eqls(expectedResultEntryArrayCase2);

          case 16:
          case "end":
            return _context76.stop();
        }
      }
    }, _callee76);
  })));
  it(_module.KoconutArray.prototype.groupByTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee77() {
    var koconutCase1, destinationCase1, yieldableCase1, expectedResultEntryArrayCase1, koconutCase2, destinationCase2, yieldableCase2, expectedResultEntryArrayCase2;
    return _regenerator["default"].wrap(function _callee77$(_context77) {
      while (1) {
        switch (_context77.prev = _context77.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from(['a', 'abc', 'ab', 'def', 'abcd']);
            destinationCase1 = new Map();
            yieldableCase1 = koconutCase1.groupByTo(destinationCase1, function (eachElement) {
              return eachElement.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context77.next = 6;
            return yieldableCase1.process();

          case 6:
            expectedResultEntryArrayCase1 = [[1, ['a']], [3, ['abc', 'def']], [2, ['ab']], [4, ['abcd']]];
            (0, _chai.expect)(Array.from(destinationCase1.entries())).eqls(expectedResultEntryArrayCase1);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            destinationCase2 = new Map();
            yieldableCase2 = koconutCase2.groupByTo(destinationCase2, function (eachElement) {
              return eachElement.lastName;
            }, function (eachElement) {
              return eachElement.firstName;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context77.next = 14;
            return yieldableCase2.process();

          case 14:
            expectedResultEntryArrayCase2 = [['Hopper', ['Grace']], ['Bernoulli', ['Jacob', 'Johann']], ['Luvya', ['Jinyoung']]];
            (0, _chai.expect)(Array.from(destinationCase2.entries())).eqls(expectedResultEntryArrayCase2);

          case 16:
          case "end":
            return _context77.stop();
        }
      }
    }, _callee77);
  })));
  it(_module.KoconutArray.prototype.map.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee78() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee78$(_context78) {
      while (1) {
        switch (_context78.prev = _context78.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            yieldable = koconut.map(function (eachElement) {
              return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context78.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context78.sent;
            (0, _chai.expect)(result).eqls([1, 4, 9]);

          case 7:
          case "end":
            return _context78.stop();
        }
      }
    }, _callee78);
  })));
  it(_module.KoconutArray.prototype.mapIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee79() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee79$(_context79) {
      while (1) {
        switch (_context79.prev = _context79.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            yieldable = koconut.mapIndexed(function (eachIndex, eachElement) {
              return eachIndex + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context79.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context79.sent;
            (0, _chai.expect)(result).eqls([1, 3, 5]);

          case 7:
          case "end":
            return _context79.stop();
        }
      }
    }, _callee79);
  })));
  it(_module.KoconutArray.prototype.mapIndexedNotNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee80() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee80$(_context80) {
      while (1) {
        switch (_context80.prev = _context80.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.mapIndexedNotNull(function (eachIndex, eachElement) {
              if (eachIndex % 2 == 0) return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context80.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context80.sent;
            (0, _chai.expect)(result).eqls([1, 9, 25]);

          case 7:
          case "end":
            return _context80.stop();
        }
      }
    }, _callee80);
  })));
  it(_module.KoconutArray.prototype.mapIndexedNotNullTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee81() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee81$(_context81) {
      while (1) {
        switch (_context81.prev = _context81.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            destination = new Array();
            yieldable = koconut.mapIndexedNotNullTo(destination, function (eachIndex, eachElement) {
              if (eachIndex % 2 == 0) return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context81.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 9, 25]);

          case 7:
          case "end":
            return _context81.stop();
        }
      }
    }, _callee81);
  })));
  it(_module.KoconutArray.prototype.mapIndexedTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee82() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee82$(_context82) {
      while (1) {
        switch (_context82.prev = _context82.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            destination = new Array();
            yieldable = koconut.mapIndexedTo(destination, function (eachIndex, eachElement) {
              return eachIndex + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context82.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 3, 5]);

          case 7:
          case "end":
            return _context82.stop();
        }
      }
    }, _callee82);
  })));
  it(_module.KoconutArray.prototype.mapNotNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee83() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee83$(_context83) {
      while (1) {
        switch (_context83.prev = _context83.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.mapNotNull(function (eachElement) {
              if (eachElement % 2 == 0) return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context83.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context83.sent;
            (0, _chai.expect)(result).eqls([4, 16]);

          case 7:
          case "end":
            return _context83.stop();
        }
      }
    }, _callee83);
  })));
  it(_module.KoconutArray.prototype.mapNotNullTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee84() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee84$(_context84) {
      while (1) {
        switch (_context84.prev = _context84.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            destination = new Array();
            yieldable = koconut.mapNotNullTo(destination, function (eachElement) {
              if (eachElement % 2 == 0) return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context84.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([4, 16]);

          case 7:
          case "end":
            return _context84.stop();
        }
      }
    }, _callee84);
  })));
  it(_module.KoconutArray.prototype.mapTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee85() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee85$(_context85) {
      while (1) {
        switch (_context85.prev = _context85.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3]);
            destination = new Array();
            yieldable = koconut.mapTo(destination, function (eachElement) {
              return eachElement * eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context85.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 4, 9]);

          case 7:
          case "end":
            return _context85.stop();
        }
      }
    }, _callee85);
  })));
});
describe("".concat(_module.KoconutArray.name, " -- Function"), function () {
  it(_module.KoconutArray.prototype.indexOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee86() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee86$(_context86) {
      while (1) {
        switch (_context86.prev = _context86.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.indexOf(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context86.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context86.sent;
            (0, _chai.expect)(resultCase1).equals(1);
            koconutCase2 = _module.KoconutArray.from('abc');
            yieldableCase2 = koconutCase2.indexOf('d');
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context86.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context86.sent;
            (0, _chai.expect)(resultCase2).equals(-1);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase3 = koconutCase3.indexOf(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context86.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context86.sent;
            (0, _chai.expect)(resultCase3).equals(0);

          case 21:
          case "end":
            return _context86.stop();
        }
      }
    }, _callee86);
  })));
  it(_module.KoconutArray.prototype.indexOfFirst.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee87() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee87$(_context87) {
      while (1) {
        switch (_context87.prev = _context87.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconut.indexOfFirst(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context87.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context87.sent;
            (0, _chai.expect)(resultCase1).equals(2);
            yieldableCase2 = koconut.indexOfFirst(function (eachElement) {
              return eachElement > 10;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context87.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context87.sent;
            (0, _chai.expect)(resultCase2).equals(-1);

          case 13:
          case "end":
            return _context87.stop();
        }
      }
    }, _callee87);
  })));
  it(_module.KoconutArray.prototype.indexOfLast.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee88() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee88$(_context88) {
      while (1) {
        switch (_context88.prev = _context88.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconut.indexOfLast(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context88.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context88.sent;
            (0, _chai.expect)(resultCase1).equals(5);
            yieldableCase2 = koconut.indexOfLast(function (eachElement) {
              return eachElement > 10;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context88.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context88.sent;
            (0, _chai.expect)(resultCase2).equals(-1);

          case 13:
          case "end":
            return _context88.stop();
        }
      }
    }, _callee88);
  })));
  it(_module.KoconutArray.prototype.intersect.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee89() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee89$(_context89) {
      while (1) {
        switch (_context89.prev = _context89.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconutCase1.intersect([5, 6, 7, 8, 9]);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutSet);
            _context89.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context89.sent;
            (0, _chai.expect)(resultCase1).eqls(new Set([5, 6, 7]));
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase2 = koconutCase2.intersect([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- April', 2000), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- July', 1500)]);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutSet);
            _context89.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context89.sent;
            (0, _chai.expect)(Array.from(resultCase2)).eqls([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);

          case 14:
          case "end":
            return _context89.stop();
        }
      }
    }, _callee89);
  })));
  it(_module.KoconutArray.prototype.isNotEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee90() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee90$(_context90) {
      while (1) {
        switch (_context90.prev = _context90.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.isNotEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context90.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context90.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement >= 10;
            }).isNotEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context90.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context90.sent;
            (0, _chai.expect)(resultCase2).equals(false);

          case 13:
          case "end":
            return _context90.stop();
        }
      }
    }, _callee90);
  })));
  it(_module.KoconutArray.prototype.isNullOrEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee91() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee91$(_context91) {
      while (1) {
        switch (_context91.prev = _context91.next) {
          case 0:
            koconutCase1 = new _module.KoconutArray();
            yieldableCase1 = koconutCase1.isNullOrEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context91.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context91.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            koconutCase2 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase2 = koconutCase2.filter(function (eachElement) {
              return eachElement > 10;
            }).isNullOrEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context91.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context91.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 14:
          case "end":
            return _context91.stop();
        }
      }
    }, _callee91);
  })));
  it(_module.KoconutArray.prototype.join.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee92() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee92$(_context92) {
      while (1) {
        switch (_context92.prev = _context92.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcdefg');
            yieldableCase1 = koconut.join();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context92.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context92.sent;
            (0, _chai.expect)(resultCase1).equals('a, b, c, d, e, f, g');
            yieldableCase2 = koconut.join('•', '<', '>');
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context92.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context92.sent;
            (0, _chai.expect)(resultCase2).equals('<a•b•c•d•e•f•g>');
            yieldableCase3 = koconut.join(' - ', '< ', ' >', 5, ' ~', function (eachElement) {
              return eachElement.toUpperCase();
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context92.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context92.sent;
            (0, _chai.expect)(resultCase3).equals('< A - B - C - D - E ~ >');

          case 19:
          case "end":
            return _context92.stop();
        }
      }
    }, _callee92);
  })));
  it(_module.KoconutArray.prototype.last.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee93() {
    var koconutCase1, yieldableCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3, koconutCase4, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee93$(_context93) {
      while (1) {
        switch (_context93.prev = _context93.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconutCase1.filter(function (eachElement) {
              return eachElement > 10;
            }).last();
            (0, _chai.expect)(koconutCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context93.prev = 3;
            _context93.next = 6;
            return yieldableCase1.process();

          case 6:
            _context93.next = 11;
            break;

          case 8:
            _context93.prev = 8;
            _context93.t0 = _context93["catch"](3);
            (0, _chai.expect)(_context93.t0).instanceOf(_module.KoconutNoSuchElementException);

          case 11:
            koconutCase2 = _module.KoconutArray.from('abc');
            yieldableCase2 = koconutCase2.last(function (eachElement) {
              return eachElement > 'd';
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context93.prev = 14;
            _context93.next = 17;
            return yieldableCase2.process();

          case 17:
            _context93.next = 22;
            break;

          case 19:
            _context93.prev = 19;
            _context93.t1 = _context93["catch"](14);
            (0, _chai.expect)(_context93.t1).instanceOf(_module.KoconutNoSuchElementException);

          case 22:
            koconutCase3 = _module.KoconutArray.from([1, 2, 3]);
            yieldableCase3 = koconutCase3.last();
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context93.next = 27;
            return yieldableCase3["yield"]();

          case 27:
            resultCase3 = _context93.sent;
            (0, _chai.expect)(resultCase3).equals(3);
            koconutCase4 = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase4 = koconutCase4.last(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context93.next = 34;
            return yieldableCase4["yield"]();

          case 34:
            resultCase4 = _context93.sent;
            (0, _chai.expect)(resultCase4).equals(6);

          case 36:
          case "end":
            return _context93.stop();
        }
      }
    }, _callee93, null, [[3, 8], [14, 19]]);
  })));
  it(_module.KoconutArray.prototype.lastIndexOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee94() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee94$(_context94) {
      while (1) {
        switch (_context94.prev = _context94.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 1, 2, 1, 2]);
            yieldableCase1 = koconutCase1.lastIndexOf(1);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context94.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context94.sent;
            (0, _chai.expect)(resultCase1).equals(4);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.lastIndexOf(new _TestDataClasses.Person('Johann', 'Bernoulli'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context94.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context94.sent;
            (0, _chai.expect)(resultCase2).equals(2);

          case 14:
          case "end":
            return _context94.stop();
        }
      }
    }, _callee94);
  })));
  it(_module.KoconutArray.prototype.lastOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee95() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee95$(_context95) {
      while (1) {
        switch (_context95.prev = _context95.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).lastOrNull();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context95.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context95.sent;
            (0, _chai.expect)(resultCase1).equals(null);
            yieldableCase2 = koconut.lastOrNull();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context95.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context95.sent;
            (0, _chai.expect)(resultCase2).equals(5);
            yieldableCase3 = koconut.lastOrNull(function (eachElement) {
              return eachElement > 10;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context95.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context95.sent;
            (0, _chai.expect)(resultCase3).equals(null);
            yieldableCase4 = koconut.lastOrNull(function (eachElement) {
              return eachElement % 3 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context95.next = 23;
            return yieldableCase4["yield"]();

          case 23:
            resultCase4 = _context95.sent;
            (0, _chai.expect)(resultCase4).equals(3);

          case 25:
          case "end":
            return _context95.stop();
        }
      }
    }, _callee95);
  })));
  it(_module.KoconutArray.prototype.minus.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee96() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3, expectedResultArrayCase3, koconutCase4, yieldableCase4, resultCase4, expectedResultArrayCase4;
    return _regenerator["default"].wrap(function _callee96$(_context96) {
      while (1) {
        switch (_context96.prev = _context96.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.minus(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context96.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context96.sent;
            (0, _chai.expect)(resultCase1).eqls([1, 2, 4, 5]);
            koconutCase2 = _module.KoconutArray.from('abcde');
            yieldableCase2 = koconutCase2.minus('abc');
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context96.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context96.sent;
            (0, _chai.expect)(resultCase2).eqls('de'.split(''));
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase3 = koconutCase3.minus(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context96.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context96.sent;
            expectedResultArrayCase3 = [new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')];
            (0, _chai.expect)(resultCase3).eql(expectedResultArrayCase3);
            koconutCase4 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase4 = koconutCase4.minus([new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli')]);
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutArray);
            _context96.next = 27;
            return yieldableCase4["yield"]();

          case 27:
            resultCase4 = _context96.sent;
            expectedResultArrayCase4 = [new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jinyoung', 'Luvya')];
            (0, _chai.expect)(resultCase4).eql(expectedResultArrayCase4);

          case 30:
          case "end":
            return _context96.stop();
        }
      }
    }, _callee96);
  })));
  it(_module.KoconutArray.prototype.minusElement.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee97() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultArrayCase2;
    return _regenerator["default"].wrap(function _callee97$(_context97) {
      while (1) {
        switch (_context97.prev = _context97.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.minusElement(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context97.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context97.sent;
            (0, _chai.expect)(resultCase1).eqls([1, 2, 4, 5]);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.minusElement(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context97.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context97.sent;
            expectedResultArrayCase2 = [new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')];
            (0, _chai.expect)(resultCase2).eql(expectedResultArrayCase2);

          case 15:
          case "end":
            return _context97.stop();
        }
      }
    }, _callee97);
  })));
  it(_module.KoconutArray.prototype.partition.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee98() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee98$(_context98) {
      while (1) {
        switch (_context98.prev = _context98.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.partition(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPair);
            _context98.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context98.sent;
            (0, _chai.expect)(result).eqls(new _module.Pair([2, 4], [1, 3, 5]));

          case 7:
          case "end":
            return _context98.stop();
        }
      }
    }, _callee98);
  })));
  it(_module.KoconutArray.prototype.plus.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee99() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee99$(_context99) {
      while (1) {
        switch (_context99.prev = _context99.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.plus(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context99.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context99.sent;
            (0, _chai.expect)(resultCase1).eqls([1, 2, 3, 4, 5, 3]);
            koconutCase2 = _module.KoconutArray.from('abcde');
            yieldableCase2 = koconutCase2.plus('abc');
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context99.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context99.sent;
            (0, _chai.expect)(resultCase2).eqls('abcdeabc'.split(''));

          case 14:
          case "end":
            return _context99.stop();
        }
      }
    }, _callee99);
  })));
  it(_module.KoconutArray.prototype.plusElement.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee100() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee100$(_context100) {
      while (1) {
        switch (_context100.prev = _context100.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.plusElement(3);
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context100.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context100.sent;
            (0, _chai.expect)(result).eqls([1, 2, 3, 4, 5, 3]);

          case 7:
          case "end":
            return _context100.stop();
        }
      }
    }, _callee100);
  })));
  it(_module.KoconutArray.prototype.random.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee101() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee101$(_context101) {
      while (1) {
        switch (_context101.prev = _context101.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.random();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context101.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context101.sent;
            _context101.t0 = _chai.expect;
            _context101.next = 9;
            return koconut["yield"]();

          case 9:
            _context101.t1 = _context101.sent.includes(result);
            (0, _context101.t0)(_context101.t1).equals(true);

          case 11:
          case "end":
            return _context101.stop();
        }
      }
    }, _callee101);
  })));
  it(_module.KoconutArray.prototype.randomOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee102() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee102$(_context102) {
      while (1) {
        switch (_context102.prev = _context102.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.randomOrNull();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context102.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context102.sent;
            _context102.t0 = _chai.expect;
            _context102.next = 9;
            return koconut["yield"]();

          case 9:
            _context102.t1 = _context102.sent.includes(resultCase1);
            (0, _context102.t0)(_context102.t1).equals(true);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).randomOrNull();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context102.next = 15;
            return yieldableCase2["yield"]();

          case 15:
            resultCase2 = _context102.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 17:
          case "end":
            return _context102.stop();
        }
      }
    }, _callee102);
  })));
  it(_module.KoconutArray.prototype.reduce.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee103() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee103$(_context103) {
      while (1) {
        switch (_context103.prev = _context103.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.reduce(function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context103.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context103.sent;
            (0, _chai.expect)(result).equals('abcd');

          case 7:
          case "end":
            return _context103.stop();
        }
      }
    }, _callee103);
  })));
  it(_module.KoconutArray.prototype.reduceIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee104() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee104$(_context104) {
      while (1) {
        switch (_context104.prev = _context104.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.reduceIndexed(function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context104.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context104.sent;
            (0, _chai.expect)(result).equals('ab1c2d3');

          case 7:
          case "end":
            return _context104.stop();
        }
      }
    }, _callee104);
  })));
  it(_module.KoconutArray.prototype.reduceIndexedOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee105() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee105$(_context105) {
      while (1) {
        switch (_context105.prev = _context105.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldableCase1 = koconut.reduceIndexedOrNull(function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context105.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context105.sent;
            (0, _chai.expect)(resultCase1).equals('ab1c2d3');
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 'e';
            }).reduceIndexedOrNull(function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context105.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context105.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context105.stop();
        }
      }
    }, _callee105);
  })));
  it(_module.KoconutArray.prototype.reduceOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee106() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee106$(_context106) {
      while (1) {
        switch (_context106.prev = _context106.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldableCase1 = koconut.reduceOrNull(function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context106.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context106.sent;
            (0, _chai.expect)(resultCase1).equals('abcd');
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 'e';
            }).reduceOrNull(function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context106.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context106.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context106.stop();
        }
      }
    }, _callee106);
  })));
  it(_module.KoconutArray.prototype.reversed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee107() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee107$(_context107) {
      while (1) {
        switch (_context107.prev = _context107.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldable = koconut.reversed();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context107.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context107.sent;
            (0, _chai.expect)(result).eqls([5, 4, 3, 2, 1]);

          case 7:
          case "end":
            return _context107.stop();
        }
      }
    }, _callee107);
  })));
  it(_module.KoconutArray.prototype.runningFold.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee108() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee108$(_context108) {
      while (1) {
        switch (_context108.prev = _context108.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.runningFold('W', function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context108.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context108.sent;
            (0, _chai.expect)(result).eqls(['W', 'Wa', 'Wab', 'Wabc', 'Wabcd']);

          case 7:
          case "end":
            return _context108.stop();
        }
      }
    }, _callee108);
  })));
  it(_module.KoconutArray.prototype.runningFoldIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee109() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee109$(_context109) {
      while (1) {
        switch (_context109.prev = _context109.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.runningFoldIndexed('W', function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context109.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context109.sent;
            (0, _chai.expect)(result).eqls(['W', 'Wa0', 'Wa0b1', 'Wa0b1c2', 'Wa0b1c2d3']);

          case 7:
          case "end":
            return _context109.stop();
        }
      }
    }, _callee109);
  })));
  it(_module.KoconutArray.prototype.runningReduce.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee110() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee110$(_context110) {
      while (1) {
        switch (_context110.prev = _context110.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.runningReduce(function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context110.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context110.sent;
            (0, _chai.expect)(result).eqls(['a', 'ab', 'abc', 'abcd']);

          case 7:
          case "end":
            return _context110.stop();
        }
      }
    }, _callee110);
  })));
  it(_module.KoconutArray.prototype.runningReduceIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee111() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee111$(_context111) {
      while (1) {
        switch (_context111.prev = _context111.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.runningReduceIndexed(function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context111.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context111.sent;
            (0, _chai.expect)(result).eqls(['a', 'ab1', 'ab1c2', 'ab1c2d3']);

          case 7:
          case "end":
            return _context111.stop();
        }
      }
    }, _callee111);
  })));
  it(_module.KoconutArray.prototype.scan.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee112() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee112$(_context112) {
      while (1) {
        switch (_context112.prev = _context112.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.scan('W', function (acc, eachElement) {
              return acc + eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context112.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context112.sent;
            (0, _chai.expect)(result).eqls(['W', 'Wa', 'Wab', 'Wabc', 'Wabcd']);

          case 7:
          case "end":
            return _context112.stop();
        }
      }
    }, _callee112);
  })));
  it(_module.KoconutArray.prototype.scanIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee113() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee113$(_context113) {
      while (1) {
        switch (_context113.prev = _context113.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcd');
            yieldable = koconut.scanIndexed('W', function (eachIndex, acc, eachElement) {
              return acc + eachElement + eachIndex;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context113.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context113.sent;
            (0, _chai.expect)(result).eqls(['W', 'Wa0', 'Wa0b1', 'Wa0b1c2', 'Wa0b1c2d3']);

          case 7:
          case "end":
            return _context113.stop();
        }
      }
    }, _callee113);
  })));
  it(_module.KoconutArray.prototype.shuffled.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee114() {
    var koconut, yieldable, result, _iterator, _step, eachShuffledElement;

    return _regenerator["default"].wrap(function _callee114$(_context114) {
      while (1) {
        switch (_context114.prev = _context114.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4]);
            yieldable = koconut.shuffled();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context114.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context114.sent;
            _iterator = _createForOfIteratorHelper(result);
            _context114.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context114.next = 18;
              break;
            }

            eachShuffledElement = _step.value;
            _context114.t0 = _chai.expect;
            _context114.next = 14;
            return koconut["yield"]();

          case 14:
            _context114.t1 = _context114.sent.includes(eachShuffledElement);
            (0, _context114.t0)(_context114.t1).equals(true);

          case 16:
            _context114.next = 9;
            break;

          case 18:
            _context114.next = 23;
            break;

          case 20:
            _context114.prev = 20;
            _context114.t2 = _context114["catch"](7);

            _iterator.e(_context114.t2);

          case 23:
            _context114.prev = 23;

            _iterator.f();

            return _context114.finish(23);

          case 26:
          case "end":
            return _context114.stop();
        }
      }
    }, _callee114, null, [[7, 20, 23, 26]]);
  })));
  it(_module.KoconutArray.prototype.single.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee115() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, yieldableCase3, resultCase3, yieldableCase4, yieldableCase5;
    return _regenerator["default"].wrap(function _callee115$(_context115) {
      while (1) {
        switch (_context115.prev = _context115.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.single();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context115.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context115.sent;
            (0, _chai.expect)(resultCase1).equals(1);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).single();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context115.prev = 9;
            _context115.next = 12;
            return yieldableCase2.process();

          case 12:
            _context115.next = 17;
            break;

          case 14:
            _context115.prev = 14;
            _context115.t0 = _context115["catch"](9);
            (0, _chai.expect)(_context115.t0).instanceOf(_module.KoconutNoSuchElementException);

          case 17:
            yieldableCase3 = koconut.single(function (eachElement) {
              return eachElement % 5 == 0;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context115.next = 21;
            return yieldableCase3["yield"]();

          case 21:
            resultCase3 = _context115.sent;
            (0, _chai.expect)(resultCase3).equals(5);
            yieldableCase4 = koconut.single(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context115.prev = 25;
            _context115.next = 28;
            return yieldableCase4.process();

          case 28:
            _context115.next = 33;
            break;

          case 30:
            _context115.prev = 30;
            _context115.t1 = _context115["catch"](25);
            (0, _chai.expect)(_context115.t1).to.be.instanceOf(_module.KoconutConflictException);

          case 33:
            yieldableCase5 = koconut.single(function (eachElement) {
              return eachElement % 10 == 0;
            });
            (0, _chai.expect)(yieldableCase5).to.be.instanceOf(_module.KoconutPrimitive);
            _context115.prev = 35;
            _context115.next = 38;
            return yieldableCase5.process();

          case 38:
            _context115.next = 43;
            break;

          case 40:
            _context115.prev = 40;
            _context115.t2 = _context115["catch"](35);
            (0, _chai.expect)(_context115.t2).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 43:
          case "end":
            return _context115.stop();
        }
      }
    }, _callee115, null, [[9, 14], [25, 30], [35, 40]]);
  })));
  it(_module.KoconutArray.prototype.singleOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee116() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, yieldableCase4, resultCase4, yieldableCase5, resultCase5;
    return _regenerator["default"].wrap(function _callee116$(_context116) {
      while (1) {
        switch (_context116.prev = _context116.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.singleOrNull();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context116.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context116.sent;
            (0, _chai.expect)(resultCase1).equals(1);
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement > 10;
            }).singleOrNull();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context116.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context116.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            yieldableCase3 = koconut.singleOrNull(function (eachElement) {
              return eachElement % 5 == 0;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context116.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context116.sent;
            (0, _chai.expect)(resultCase3).equals(5);
            yieldableCase4 = koconut.singleOrNull(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutPrimitive);
            _context116.next = 23;
            return yieldableCase4["yield"]();

          case 23:
            resultCase4 = _context116.sent;
            (0, _chai.expect)(resultCase4).equals(null);
            yieldableCase5 = koconut.singleOrNull(function (eachElement) {
              return eachElement % 10 == 0;
            });
            (0, _chai.expect)(yieldableCase5).to.be.instanceOf(_module.KoconutPrimitive);
            _context116.next = 29;
            return yieldableCase5["yield"]();

          case 29:
            resultCase5 = _context116.sent;
            (0, _chai.expect)(resultCase5).equals(null);

          case 31:
          case "end":
            return _context116.stop();
        }
      }
    }, _callee116);
  })));
  it(_module.KoconutArray.prototype.subtract.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee117() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee117$(_context117) {
      while (1) {
        switch (_context117.prev = _context117.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.subtract([1, 3, 5]);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutSet);
            _context117.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context117.sent;
            (0, _chai.expect)(resultCase1).eqls(new Set([2, 4]));
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.subtract([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli')]);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutSet);
            _context117.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context117.sent;
            (0, _chai.expect)(resultCase2).eqls(new Set([new _TestDataClasses.Person('Jinyoung', 'Luvya')]));

          case 14:
          case "end":
            return _context117.stop();
        }
      }
    }, _callee117);
  })));
  it(_module.KoconutArray.prototype.sumBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee118() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee118$(_context118) {
      while (1) {
        switch (_context118.prev = _context118.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.sumBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context118.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context118.sent;
            (0, _chai.expect)(resultCase1).equals(15);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]);
            yieldableCase2 = koconutCase2.sumBy(function (eachElement) {
              return eachElement.price;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context118.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context118.sent;
            (0, _chai.expect)(resultCase2).equals(4700);

          case 14:
          case "end":
            return _context118.stop();
        }
      }
    }, _callee118);
  })));
  it(_module.KoconutArray.prototype.union.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee119() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, expectedResultArrayCase2;
    return _regenerator["default"].wrap(function _callee119$(_context119) {
      while (1) {
        switch (_context119.prev = _context119.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconutCase1.union([4, 5, 6, 7, 8]);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutSet);
            _context119.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context119.sent;
            (0, _chai.expect)(resultCase1).eqls(new Set([1, 2, 3, 4, 5, 6, 7, 8]));
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]);
            yieldableCase2 = koconutCase2.union([new _TestDataClasses.Person('Steve', 'Jobs'), new _TestDataClasses.Person('SangHun', 'Luvya')]);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutSet);
            _context119.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context119.sent;
            expectedResultArrayCase2 = [new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya'), new _TestDataClasses.Person('Steve', 'Jobs')];
            (0, _chai.expect)(resultCase2).eqls(new Set(expectedResultArrayCase2));

          case 15:
          case "end":
            return _context119.stop();
        }
      }
    }, _callee119);
  })));
  it(_module.KoconutArray.prototype.windowed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee120() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, yieldableCase4, resultCase4;
    return _regenerator["default"].wrap(function _callee120$(_context120) {
      while (1) {
        switch (_context120.prev = _context120.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5, 6, 7]);
            yieldableCase1 = koconut.windowed(3);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context120.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context120.sent;
            (0, _chai.expect)(resultCase1).eqls([[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
            yieldableCase2 = koconut.windowed(3, 2);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context120.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context120.sent;
            (0, _chai.expect)(resultCase2).eqls([[1, 2, 3], [3, 4, 5], [5, 6, 7]]);
            yieldableCase3 = koconut.windowed(3, 2, true);
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutArray);
            _context120.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context120.sent;
            (0, _chai.expect)(resultCase3).eqls([[1, 2, 3], [3, 4, 5], [5, 6, 7], [7]]);
            yieldableCase4 = koconut.windowed(3, 2, false, function (eachElements) {
              var sum = 0;

              var _iterator2 = _createForOfIteratorHelper(eachElements),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var eachElement = _step2.value;
                  sum += eachElement;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              return sum;
            });
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutArray);
            _context120.next = 23;
            return yieldableCase4["yield"]();

          case 23:
            resultCase4 = _context120.sent;
            (0, _chai.expect)(resultCase4).eqls([6, 12, 18]);

          case 25:
          case "end":
            return _context120.stop();
        }
      }
    }, _callee120);
  })));
  it(_module.KoconutArray.prototype.withIndex.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee121() {
    var koconut, yieldable, result, expectedResultEntryArray;
    return _regenerator["default"].wrap(function _callee121$(_context121) {
      while (1) {
        switch (_context121.prev = _context121.next) {
          case 0:
            koconut = _module.KoconutArray.from('abcde');
            yieldable = koconut.withIndex();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context121.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context121.sent;
            expectedResultEntryArray = [new _module.Entry(0, 'a'), new _module.Entry(1, 'b'), new _module.Entry(2, 'c'), new _module.Entry(3, 'd'), new _module.Entry(4, 'e')];
            (0, _chai.expect)(result).eqls(expectedResultEntryArray);

          case 8:
          case "end":
            return _context121.stop();
        }
      }
    }, _callee121);
  })));
  it(_module.KoconutArray.prototype.zip.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee122() {
    var koconut, yieldableCase1, resultCase1, expectedResultPairArrayCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee122$(_context122) {
      while (1) {
        switch (_context122.prev = _context122.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.zip('abcdefg');
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context122.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context122.sent;
            expectedResultPairArrayCase1 = [new _module.Pair(1, 'a'), new _module.Pair(2, 'b'), new _module.Pair(3, 'c'), new _module.Pair(4, 'd'), new _module.Pair(5, 'e')];
            (0, _chai.expect)(resultCase1).eqls(expectedResultPairArrayCase1);
            yieldableCase2 = koconut.zip('abc', function (eachElement, eachOtherElement) {
              return eachElement + eachOtherElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context122.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context122.sent;
            (0, _chai.expect)(resultCase2).eqls(['1a', '2b', '3c']);

          case 14:
          case "end":
            return _context122.stop();
        }
      }
    }, _callee122);
  })));
  it(_module.KoconutArray.prototype.zipWithNext.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee123() {
    var koconut, yieldableCase1, resultCase1, expectedResultPairArrayCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee123$(_context123) {
      while (1) {
        switch (_context123.prev = _context123.next) {
          case 0:
            koconut = _module.KoconutArray.from([1, 2, 3, 4, 5]);
            yieldableCase1 = koconut.zipWithNext();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutArray);
            _context123.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context123.sent;
            expectedResultPairArrayCase1 = [new _module.Pair(1, 2), new _module.Pair(2, 3), new _module.Pair(3, 4), new _module.Pair(4, 5)];
            (0, _chai.expect)(resultCase1).eqls(expectedResultPairArrayCase1);
            yieldableCase2 = koconut.zipWithNext(function (eachFirstElement, eachSecondElement) {
              return eachFirstElement * eachSecondElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutArray);
            _context123.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context123.sent;
            (0, _chai.expect)(resultCase2).eqls([2, 6, 12, 20]);

          case 14:
          case "end":
            return _context123.stop();
        }
      }
    }, _callee123);
  })));
});