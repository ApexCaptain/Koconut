"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var _module = require("../../dist/module");

var _TestDataClasses = require("./TestDataClasses");

_module.KoconutDeprecation.isRunningOnDevUnitTesting = true;
describe("".concat(_module.KoconutMap.name, " -- Accessor"), function () {
  it('entries', (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
    var koconut, yieldable, result, expectedResultEntryArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            koconut = _module.KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);
            yieldable = koconut.entries;
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutSet);
            _context.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context.sent;
            expectedResultEntryArray = [new _module.Entry(0, 'a'), new _module.Entry(1, 'b'), new _module.Entry(2, 'c')];
            (0, _chai.expect)(result).eqls(new Set(expectedResultEntryArray));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('keys', (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            koconut = _module.KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);
            yieldable = koconut.keys;
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutSet);
            _context2.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context2.sent;
            (0, _chai.expect)(result).eqls(new Set([0, 1, 2]));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('size', (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            koconut = _module.KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);
            yieldable = koconut.size;
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context3.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context3.sent;
            (0, _chai.expect)(result).equals(3);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('values', (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            koconut = _module.KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);
            yieldable = koconut.values;
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context4.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context4.sent;
            (0, _chai.expect)(result).eqls(['a', 'b', 'c']);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Calculator"), function () {
  it(_module.KoconutMap.prototype.count.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconut.count();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context5.sent;
            (0, _chai.expect)(resultCase1).equals(5);
            yieldableCase2 = koconut.count(function (eachEntry) {
              return eachEntry.key % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context5.sent;
            (0, _chai.expect)(resultCase2).equals(2);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it(_module.KoconutMap.prototype.maxBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.maxBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutEntry);
            _context6.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context6.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Carol', 51));
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutEntry);
            _context6.prev = 10;
            _context6.next = 13;
            return yieldableCase2.process();

          case 13:
            _context6.next = 18;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](10);
            (0, _chai.expect)(_context6.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 18:
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.maxBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutEntry);
            _context6.next = 23;
            return yieldableCase3["yield"]();

          case 23:
            resultCase3 = _context6.sent;
            (0, _chai.expect)(resultCase3).eqls(new _module.Entry('A-1', new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000)));

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[10, 15]]);
  })));
  it(_module.KoconutMap.prototype.maxByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.maxByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutEntry);
            _context7.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context7.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Carol', 51));
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutEntry);
            _context7.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context7.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.maxByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutEntry);
            _context7.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context7.sent;
            (0, _chai.expect)(resultCase3).eqls(new _module.Entry('A-1', new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000)));

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it(_module.KoconutMap.prototype.maxOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.maxOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context8.sent;
            (0, _chai.expect)(resultCase1).eqls(51);
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.prev = 10;
            _context8.next = 13;
            return yieldableCase2.process();

          case 13:
            _context8.next = 18;
            break;

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](10);
            (0, _chai.expect)(_context8.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 18:
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.maxOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 23;
            return yieldableCase3["yield"]();

          case 23:
            resultCase3 = _context8.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));

          case 25:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[10, 15]]);
  })));
  it(_module.KoconutMap.prototype.maxOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.maxOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context9.sent;
            (0, _chai.expect)(resultCase1).eqls(51);
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context9.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.maxOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context9.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000));

          case 21:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it(_module.KoconutMap.prototype.maxOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.maxOfWith(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front - rear;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context10.sent;
            (0, _chai.expect)(resultCase1).equals(51);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxOfWith(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front = rear;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.prev = 9;
            _context10.next = 12;
            return yieldableCase2.process();

          case 12:
            _context10.next = 17;
            break;

          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](9);
            (0, _chai.expect)(_context10.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[9, 14]]);
  })));
  it(_module.KoconutMap.prototype.maxOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.maxOfWithOrNull(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front - rear;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context11.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context11.sent;
            (0, _chai.expect)(resultCase1).equals(51);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxOfWithOrNull(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front = rear;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context11.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context11.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it(_module.KoconutMap.prototype.maxWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.maxWith(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context12.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context12.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Carol', 51));
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxWith(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context12.prev = 9;
            _context12.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context12.next = 17;
            break;

          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](9);
            (0, _chai.expect)(_context12.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[9, 14]]);
  })));
  it(_module.KoconutMap.prototype.maxWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.maxWithOrNull(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context13.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Carol', 51));
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).maxWithOrNull(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context13.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it(_module.KoconutMap.prototype.minBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.minBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutEntry);
            _context14.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context14.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Bob', 28));
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutEntry);
            _context14.prev = 10;
            _context14.next = 13;
            return yieldableCase2["yield"]();

          case 13:
            _context14.next = 18;
            break;

          case 15:
            _context14.prev = 15;
            _context14.t0 = _context14["catch"](10);
            (0, _chai.expect)(_context14.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 18:
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.minBy(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutEntry);
            _context14.next = 23;
            return yieldableCase3["yield"]();

          case 23:
            resultCase3 = _context14.sent;
            (0, _chai.expect)(resultCase3).eqls(new _module.Entry('A-2', new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200)));

          case 25:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[10, 15]]);
  })));
  it(_module.KoconutMap.prototype.minByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.minByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutEntry);
            _context15.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context15.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Bob', 28));
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutEntry);
            _context15.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context15.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.minByOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutEntry);
            _context15.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context15.sent;
            (0, _chai.expect)(resultCase3).eqls(new _module.Entry('A-2', new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200)));

          case 21:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it(_module.KoconutMap.prototype.minOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.minOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context16.sent;
            (0, _chai.expect)(resultCase1).eqls(28);
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.prev = 10;
            _context16.next = 13;
            return yieldableCase2.process();

          case 13:
            _context16.next = 18;
            break;

          case 15:
            _context16.prev = 15;
            _context16.t0 = _context16["catch"](10);
            (0, _chai.expect)(_context16.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 18:
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.minOf(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 23;
            return yieldableCase3["yield"]();

          case 23:
            resultCase3 = _context16.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));

          case 25:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[10, 15]]);
  })));
  it(_module.KoconutMap.prototype.minOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            koconutCase1 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconutCase1.minOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context17.sent;
            (0, _chai.expect)(resultCase1).eqls(28);
            koconutCase2 = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase2 = koconutCase2.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context17.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.ProductInfo('A-1', 'Mac Book Pro -- May', 2000), new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200), new _TestDataClasses.ProductInfo('A-3', 'iPhone -- June', 1500)]).associateBy(function (eachElement) {
              return eachElement.id;
            });
            yieldableCase3 = koconutCase3.minOfOrNull(function (eachEntry) {
              return eachEntry.value;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context17.sent;
            (0, _chai.expect)(resultCase3).eqls(new _TestDataClasses.ProductInfo('A-2', 'Mac Book Air -- September', 1200));

          case 21:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it(_module.KoconutMap.prototype.minOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.minOfWith(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front - rear;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context18.sent;
            (0, _chai.expect)(resultCase1).equals(28);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minOfWith(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front = rear;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.prev = 9;
            _context18.next = 12;
            return yieldableCase2.process();

          case 12:
            _context18.next = 17;
            break;

          case 14:
            _context18.prev = 14;
            _context18.t0 = _context18["catch"](9);
            (0, _chai.expect)(_context18.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[9, 14]]);
  })));
  it(_module.KoconutMap.prototype.minOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.minOfWithOrNull(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front - rear;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context19.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context19.sent;
            (0, _chai.expect)(resultCase1).equals(28);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minOfWithOrNull(function (eachEntry) {
              return eachEntry.value;
            }, function (front, rear) {
              return front = rear;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context19.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context19.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it(_module.KoconutMap.prototype.minWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.minWith(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context20.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context20.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Bob', 28));
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minWith(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context20.prev = 9;
            _context20.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context20.next = 17;
            break;

          case 14:
            _context20.prev = 14;
            _context20.t0 = _context20["catch"](9);
            (0, _chai.expect)(_context20.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[9, 14]]);
  })));
  it(_module.KoconutMap.prototype.minWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            koconut = _module.KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);
            yieldableCase1 = koconut.minWithOrNull(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context21.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context21.sent;
            (0, _chai.expect)(resultCase1).eqls(new _module.Entry('Bob', 28));
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.value > 100;
            }).minWithOrNull(function (front, rear) {
              return front.value - rear.value;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context21.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context21.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Caster"), function () {
  it(_module.KoconutMap.prototype.asArray.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee22() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return new _module.Pair(eachElement, eachElement);
            });
            yieldable = koconut.asArray();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context22.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context22.sent;
            (0, _chai.expect)(result).eqls([new _module.Entry(1, 1), new _module.Entry(2, 2), new _module.Entry(3, 3)]);

          case 7:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
  it(_module.KoconutMap.prototype.asSet.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee23() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 1, 2, 2, 3, 3).associate(function (eachElement) {
              return new _module.Pair(eachElement, eachElement);
            });
            yieldable = koconut.asSet();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutSet);
            _context23.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context23.sent;
            (0, _chai.expect)(result).eqls(new Set([new _module.Entry(1, 1), new _module.Entry(2, 2), new _module.Entry(3, 3)]));

          case 7:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Inspector"), function () {
  it(_module.KoconutMap.prototype.all.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee24() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconut.all(function (eachEntry) {
              return eachEntry.value / eachEntry.key == 2;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context24.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context24.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.all(function (eachEntry) {
              return eachEntry.value < 8;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context24.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context24.sent;
            (0, _chai.expect)(resultCase2).equals(false);

          case 13:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  })));
  it(_module.KoconutMap.prototype.any.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee25() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * eachElement];
            });
            yieldableCase1 = koconut.any(function (eachEntry) {
              return eachEntry.value == 1;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context25.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context25.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.any(function (eachEntry) {
              return eachEntry.value < 0;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context25.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context25.sent;
            (0, _chai.expect)(resultCase2).equals(false);

          case 13:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  })));
  it(_module.KoconutMap.prototype.isEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee26() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconut.isEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context26.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context26.sent;
            (0, _chai.expect)(resultCase1).equals(false);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.key > 10;
            }).isEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context26.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context26.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 13:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
  it(_module.KoconutMap.prototype.isNotEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee27() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconut.isNotEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context27.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context27.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.key > 10;
            }).isNotEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context27.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context27.sent;
            (0, _chai.expect)(resultCase2).equals(false);

          case 13:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  })));
  it(_module.KoconutMap.prototype.isNullOrEmpty.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee28() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconut.isNullOrEmpty();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context28.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context28.sent;
            (0, _chai.expect)(resultCase1).equals(false);
            yieldableCase2 = koconut.filter(function (eachEntry) {
              return eachEntry.key > 10;
            }).isNullOrEmpty();
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context28.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context28.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 13:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  })));
  it(_module.KoconutMap.prototype.contains.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee29() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return new _module.Pair(eachElement, eachElement);
            });
            yieldableCase1 = koconutCase1.contains(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context29.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context29.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase2 = koconutCase2.contains(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context29.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context29.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 14:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29);
  })));
  it(_module.KoconutMap.prototype.containsKey.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee30() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return new _module.Pair(eachElement, eachElement);
            });
            yieldableCase1 = koconutCase1.containsKey(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context30.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase2 = koconutCase2.containsKey(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context30.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context30.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 14:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  })));
  it(_module.KoconutMap.prototype.containsValue.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee31() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return new _module.Pair(eachElement, eachElement);
            });
            yieldableCase1 = koconutCase1.containsValue(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context31.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement.firstName + eachElement.lastName, eachElement];
            });
            yieldableCase2 = koconutCase2.containsValue(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context31.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context31.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 14:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31);
  })));
  it(_module.KoconutMap.prototype.none.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee32() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement];
            });
            yieldableCase1 = koconut.filter(function (eachEntry) {
              return eachEntry.key > 10;
            }).none();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context32.sent;
            (0, _chai.expect)(resultCase1).equals(true);
            yieldableCase2 = koconut.none(function (eachEntry) {
              return eachEntry.key > 10;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutBoolean);
            _context32.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context32.sent;
            (0, _chai.expect)(resultCase2).equals(true);

          case 13:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Iterator"), function () {
  it(_module.KoconutMap.prototype.forEach.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee33() {
    var koconut, yieldable;
    return _regenerator["default"].wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.forEach(function (eachEntry) {
              (0, _chai.expect)(eachEntry.value / eachEntry.key).equals(2);
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context33.next = 5;
            return yieldable.process();

          case 5:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  })));
  it(_module.KoconutMap.prototype.onEach.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee34() {
    var koconut, yieldable;
    return _regenerator["default"].wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement];
            });
            yieldable = koconut.onEach(function (eachEntry) {
              (0, _chai.expect)(eachEntry.value - eachEntry.key).equals(0);
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context34.next = 5;
            return yieldable.process();

          case 5:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Manipulator"), function () {
  it(_module.KoconutMap.prototype.filter.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee35() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.filter(function (eachEntry) {
              return eachEntry.key % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context35.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context35.sent;
            expectedResultMap = new Map([[2, 4], [4, 8]]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35);
  })));
  it(_module.KoconutMap.prototype.filterNot.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee36() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.filterNot(function (eachEntry) {
              return eachEntry.value < 6;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context36.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context36.sent;
            expectedResultMap = new Map([[3, 6], [4, 8], [5, 10]]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36);
  })));
  it(_module.KoconutMap.prototype.filterTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee37() {
    var koconut, destination, yieldable, expectedResultMap;
    return _regenerator["default"].wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            destination = new Map();
            yieldable = koconut.filterTo(destination, function (eachEntry) {
              return eachEntry.key % 2 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context37.next = 6;
            return yieldable.process();

          case 6:
            expectedResultMap = new Map([[2, 4], [4, 8]]);
            (0, _chai.expect)(destination).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37);
  })));
  it(_module.KoconutMap.prototype.filterNotTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee38() {
    var koconut, destination, yieldable, expectedResultMap;
    return _regenerator["default"].wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            destination = new Map();
            yieldable = koconut.filterNotTo(destination, function (eachEntry) {
              return eachEntry.value < 6;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context38.next = 6;
            return yieldable.process();

          case 6:
            expectedResultMap = new Map([[3, 6], [4, 8], [5, 10]]);
            (0, _chai.expect)(destination).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38);
  })));
  it(_module.KoconutMap.prototype.filterKeys.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee39() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.filterKeys(function (eachKey) {
              return eachKey % 3 == 0;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context39.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context39.sent;
            expectedResultMap = new Map([[3, 6]]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context39.stop();
        }
      }
    }, _callee39);
  })));
  it(_module.KoconutMap.prototype.filterValues.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee40() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.filterValues(function (eachElement) {
              return eachElement > 6;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context40.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context40.sent;
            expectedResultMap = new Map([[4, 8], [5, 10]]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40);
  })));
  it(_module.KoconutMap.prototype.minus.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee41() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return [eachElement, eachElement];
            });
            yieldableCase1 = koconutCase1.minus(1);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutMap);
            _context41.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context41.sent;
            (0, _chai.expect)(resultCase1).eqls(new Map([[2, 2], [3, 3]]));
            koconutCase2 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase2 = koconutCase2.minus(new _TestDataClasses.Person('Jinyoung', 'Luvya'));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutMap);
            _context41.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context41.sent;
            (0, _chai.expect)(resultCase2).eqls(new Map([[new _TestDataClasses.Person('Grace', 'Hopper'), 'GraceHopper'], [new _TestDataClasses.Person('Jacob', 'Bernoulli'), 'JacobBernoulli']]));

          case 14:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41);
  })));
  it(_module.KoconutMap.prototype.plus.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee42() {
    var koconut, expectedResultMap, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3, yieldableCase4, resultCase4, yieldableCase5, resultCase5, yieldableCase6, resultCase6, yieldableCase7, resultCase7, yieldableCase8, resultCase8;
    return _regenerator["default"].wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3).associate(function (eachElement) {
              return [eachElement, eachElement];
            });
            expectedResultMap = new Map([[1, 1], [2, 2], [3, 3], [4, 4]]);
            yieldableCase1 = koconut.plus(new _module.Pair(4, 4));
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 6;
            return yieldableCase1["yield"]();

          case 6:
            resultCase1 = _context42.sent;
            (0, _chai.expect)(resultCase1).eqls(expectedResultMap);
            yieldableCase2 = koconut.plus(new _module.KoconutPair(4, 4));
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context42.sent;
            (0, _chai.expect)(resultCase2).eqls(expectedResultMap);
            yieldableCase3 = koconut.plus(new _module.Entry(4, 4));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 18;
            return yieldableCase3["yield"]();

          case 18:
            resultCase3 = _context42.sent;
            (0, _chai.expect)(resultCase3).eqls(expectedResultMap);
            yieldableCase4 = koconut.plus(new _module.KoconutEntry(4, 4));
            (0, _chai.expect)(yieldableCase4).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 24;
            return yieldableCase4["yield"]();

          case 24:
            resultCase4 = _context42.sent;
            (0, _chai.expect)(resultCase4).eqls(expectedResultMap);
            expectedResultMap.set(5, 5);
            yieldableCase5 = koconut.plus(new _module.Pair(4, 4), new _module.Pair(5, 5));
            (0, _chai.expect)(yieldableCase5).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 31;
            return yieldableCase5["yield"]();

          case 31:
            resultCase5 = _context42.sent;
            (0, _chai.expect)(resultCase5).eqls(expectedResultMap);
            yieldableCase6 = koconut.plus(new _module.KoconutPair(4, 4), new _module.KoconutPair(5, 5));
            (0, _chai.expect)(yieldableCase6).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 37;
            return yieldableCase6["yield"]();

          case 37:
            resultCase6 = _context42.sent;
            (0, _chai.expect)(resultCase6).eqls(expectedResultMap);
            yieldableCase7 = koconut.plus(new _module.Entry(4, 4), new _module.Entry(5, 5));
            (0, _chai.expect)(yieldableCase7).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 43;
            return yieldableCase7["yield"]();

          case 43:
            resultCase7 = _context42.sent;
            (0, _chai.expect)(resultCase7).eqls(expectedResultMap);
            yieldableCase8 = koconut.plus(new _module.KoconutEntry(4, 4), new _module.KoconutEntry(5, 5));
            (0, _chai.expect)(yieldableCase8).to.be.instanceOf(_module.KoconutMap);
            _context42.next = 49;
            return yieldableCase8["yield"]();

          case 49:
            resultCase8 = _context42.sent;
            (0, _chai.expect)(resultCase8).eqls(expectedResultMap);

          case 51:
          case "end":
            return _context42.stop();
        }
      }
    }, _callee42);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Selector"), function () {
  it(_module.KoconutMap.prototype.get.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee43() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconutCase1.get(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context43.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context43.sent;
            (0, _chai.expect)(resultCase1).equals(4);
            koconutCase2 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase2 = koconutCase2.filterKeys(function (eachKey) {
              return eachKey > 3;
            }).get(1);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context43.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context43.sent;
            (0, _chai.expect)(resultCase2).equals(null);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase3 = koconutCase3.get(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context43.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context43.sent;
            (0, _chai.expect)(resultCase3).equals('GraceHopper');

          case 21:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee43);
  })));
  it(_module.KoconutMap.prototype.getOrDefault.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee44() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee44$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconutCase1.getOrDefault(2, 100);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context44.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context44.sent;
            (0, _chai.expect)(resultCase1).equals(4);
            koconutCase2 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase2 = koconutCase2.filterKeys(function (eachKey) {
              return eachKey > 3;
            }).getOrDefault(1, 100);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context44.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context44.sent;
            (0, _chai.expect)(resultCase2).equals(100);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase3 = koconutCase3.getOrDefault(new _TestDataClasses.Person('Grace', 'Hopper'), 'SteveJobs');
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context44.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context44.sent;
            (0, _chai.expect)(resultCase3).equals('GraceHopper');

          case 21:
          case "end":
            return _context44.stop();
        }
      }
    }, _callee44);
  })));
  it(_module.KoconutMap.prototype.getOrElse.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee45() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, resultCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconutCase1.getOrElse(2, function () {
              return 100;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context45.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context45.sent;
            (0, _chai.expect)(resultCase1).equals(4);
            koconutCase2 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase2 = koconutCase2.filterKeys(function (eachKey) {
              return eachKey > 3;
            }).getOrElse(1, function () {
              return 100;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context45.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            resultCase2 = _context45.sent;
            (0, _chai.expect)(resultCase2).equals(100);
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase3 = koconutCase3.getOrElse(new _TestDataClasses.Person('Grace', 'Hopper'), function () {
              return 'SteveJobs';
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context45.next = 19;
            return yieldableCase3["yield"]();

          case 19:
            resultCase3 = _context45.sent;
            (0, _chai.expect)(resultCase3).equals('GraceHopper');

          case 21:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee45);
  })));
  it(_module.KoconutMap.prototype.getValue.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee46() {
    var koconutCase1, yieldableCase1, resultCase1, koconutCase2, yieldableCase2, koconutCase3, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            koconutCase1 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase1 = koconutCase1.getValue(2);
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context46.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context46.sent;
            (0, _chai.expect)(resultCase1).equals(4);
            koconutCase2 = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldableCase2 = koconutCase2.filterKeys(function (eachKey) {
              return eachKey > 3;
            }).getValue(1);
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context46.prev = 10;
            _context46.next = 13;
            return yieldableCase2.process();

          case 13:
            _context46.next = 18;
            break;

          case 15:
            _context46.prev = 15;
            _context46.t0 = _context46["catch"](10);
            (0, _chai.expect)(_context46.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 18:
            koconutCase3 = _module.KoconutArray.from([new _TestDataClasses.Person('Grace', 'Hopper'), new _TestDataClasses.Person('Jacob', 'Bernoulli'), new _TestDataClasses.Person('Johann', 'Bernoulli'), new _TestDataClasses.Person('Jinyoung', 'Luvya')]).associate(function (eachElement) {
              return [eachElement, eachElement.firstName + eachElement.lastName];
            });
            yieldableCase3 = koconutCase3.getValue(new _TestDataClasses.Person('Grace', 'Hopper'));
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context46.next = 23;
            return yieldableCase3["yield"]();

          case 23:
            resultCase3 = _context46.sent;
            (0, _chai.expect)(resultCase3).equals('GraceHopper');

          case 25:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee46, null, [[10, 15]]);
  })));
});
describe("".concat(_module.KoconutMap.name, " -- Transformer"), function () {
  it(_module.KoconutMap.prototype.flatMap.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee47() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.flatMap(function (eachEntry) {
              return [eachEntry.key, eachEntry.value];
            }).distinct().sortedBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context47.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context47.sent;
            (0, _chai.expect)(result).eqls([1, 2, 3, 4, 5, 6, 8, 10]);

          case 7:
          case "end":
            return _context47.stop();
        }
      }
    }, _callee47);
  })));
  it(_module.KoconutMap.prototype.flatMapTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee48() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee48$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            destination = new Array();
            yieldable = koconut.flatMapTo(destination, function (eachEntry) {
              return [eachEntry.key, eachEntry.value];
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context48.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);

          case 7:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee48);
  })));
  it(_module.KoconutMap.prototype.map.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee49() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee49$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.map(function (eachEntry) {
              return eachEntry.key + eachEntry.value;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context49.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context49.sent;
            (0, _chai.expect)(result).eqls([3, 6, 9, 12, 15]);

          case 7:
          case "end":
            return _context49.stop();
        }
      }
    }, _callee49);
  })));
  it(_module.KoconutMap.prototype.mapKeys.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee50() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee50$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            koconut = _module.KoconutMap.of(['beer', 2.7], ['bisquit', 5.8]);
            yieldable = koconut.mapKeys(function (eachEntry) {
              return eachEntry.key.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context50.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context50.sent;
            expectedResultMap = new Map([[4, 2.7], [7, 5.8]]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee50);
  })));
  it(_module.KoconutMap.prototype.mapKeysTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee51() {
    var koconut, destination, yieldable, expectedResultMap;
    return _regenerator["default"].wrap(function _callee51$(_context51) {
      while (1) {
        switch (_context51.prev = _context51.next) {
          case 0:
            koconut = _module.KoconutMap.of(['beer', 2.7], ['bisquit', 5.8]);
            destination = new Map();
            yieldable = koconut.mapKeysTo(destination, function (eachEntry) {
              return eachEntry.key.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context51.next = 6;
            return yieldable.process();

          case 6:
            expectedResultMap = new Map([[4, 2.7], [7, 5.8]]);
            (0, _chai.expect)(destination).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context51.stop();
        }
      }
    }, _callee51);
  })));
  it(_module.KoconutMap.prototype.mapNotNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee52() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee52$(_context52) {
      while (1) {
        switch (_context52.prev = _context52.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            yieldable = koconut.mapNotNull(function (eachEntry) {
              if (eachEntry.key > 3) return eachEntry.key + eachEntry.value;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context52.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context52.sent;
            (0, _chai.expect)(result).eqls([12, 15]);

          case 7:
          case "end":
            return _context52.stop();
        }
      }
    }, _callee52);
  })));
  it(_module.KoconutMap.prototype.mapNotNullTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee53() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee53$(_context53) {
      while (1) {
        switch (_context53.prev = _context53.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            destination = new Array();
            yieldable = koconut.mapNotNullTo(destination, function (eachEntry) {
              if (eachEntry.key > 3) return eachEntry.key + eachEntry.value;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context53.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([12, 15]);

          case 7:
          case "end":
            return _context53.stop();
        }
      }
    }, _callee53);
  })));
  it(_module.KoconutMap.prototype.mapTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee54() {
    var koconut, destination, yieldable;
    return _regenerator["default"].wrap(function _callee54$(_context54) {
      while (1) {
        switch (_context54.prev = _context54.next) {
          case 0:
            koconut = _module.KoconutArray.of(1, 2, 3, 4, 5).associate(function (eachElement) {
              return [eachElement, eachElement * 2];
            });
            destination = new Array();
            yieldable = koconut.mapTo(destination, function (eachEntry) {
              return eachEntry.key + eachEntry.value;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context54.next = 6;
            return yieldable.process();

          case 6:
            (0, _chai.expect)(destination).eqls([3, 6, 9, 12, 15]);

          case 7:
          case "end":
            return _context54.stop();
        }
      }
    }, _callee54);
  })));
  it(_module.KoconutMap.prototype.mapValues.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee55() {
    var koconut, yieldable, result, expectedResultMap;
    return _regenerator["default"].wrap(function _callee55$(_context55) {
      while (1) {
        switch (_context55.prev = _context55.next) {
          case 0:
            koconut = _module.KoconutMap.of(['beverage', 2.7], ['meal', 12.4]);
            yieldable = koconut.mapValues(function (eachEntry) {
              return "".concat(eachEntry.value, "$");
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context55.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context55.sent;
            expectedResultMap = new Map([['beverage', '2.7$'], ['meal', '12.4$']]);
            (0, _chai.expect)(result).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context55.stop();
        }
      }
    }, _callee55);
  })));
  it(_module.KoconutMap.prototype.mapValuesTo.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee56() {
    var koconut, destination, yieldable, expectedResultMap;
    return _regenerator["default"].wrap(function _callee56$(_context56) {
      while (1) {
        switch (_context56.prev = _context56.next) {
          case 0:
            koconut = _module.KoconutMap.of(['beverage', 2.7], ['meal', 12.4]);
            destination = new Map();
            yieldable = koconut.mapValuesTo(destination, function (eachEntry) {
              return "".concat(eachEntry.value, "$");
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutMap);
            _context56.next = 6;
            return yieldable.process();

          case 6:
            expectedResultMap = new Map([['beverage', '2.7$'], ['meal', '12.4$']]);
            (0, _chai.expect)(destination).eqls(expectedResultMap);

          case 8:
          case "end":
            return _context56.stop();
        }
      }
    }, _callee56);
  })));
});