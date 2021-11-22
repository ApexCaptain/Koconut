"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var _module = require("../dist/module");

var _TestDataClasses = require("./TestDataClasses");

describe("".concat(_module.KoconutSequence.name, " -- Calculator"), function () {
  it(_module.KoconutSequence.prototype.count.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            koconut = _module.KoconutSequence.of(1, 2, 3, 4, 5);
            yieldableCase1 = koconut.count();
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context.sent;
            (0, _chai.expect)(resultCase1).to.equals(5);
            yieldableCase2 = koconut.count(function (eachElement) {
              return eachElement % 2 == 0;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context.sent;
            (0, _chai.expect)(resultCase2).to.equals(2);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it(_module.KoconutSequence.prototype.maxBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxBy(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context2.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context2.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500));
            yieldableCase2 = koconut.maxBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context2.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context2.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxBy(function (eachElement) {
              return eachElement;
            });
            _context2.prev = 14;
            _context2.next = 17;
            return yieldableCase3.process();

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](14);
            (0, _chai.expect)(_context2.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[14, 19]]);
  })));
  it(_module.KoconutSequence.prototype.maxByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxByOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context3.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context3.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500));
            yieldableCase2 = koconut.maxByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context3.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context3.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context3.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context3.sent;
            (0, _chai.expect)(resultCase3).equals(null);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it(_module.KoconutSequence.prototype.maxOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxOf(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context4.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context4.sent;
            (0, _chai.expect)(resultCase1).equals("iPhone -- June");
            yieldableCase2 = koconut.maxOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context4.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context4.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it(_module.KoconutSequence.prototype.maxOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxOfOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context5.sent;
            (0, _chai.expect)(resultCase1).equals("iPhone -- June");
            yieldableCase2 = koconut.maxOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context5.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price < 500;
            }).maxOfOrNull(function (eachElement) {
              return eachElement.price;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context5.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context5.sent;
            (0, _chai.expect)(resultCase3).equals(null);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it(_module.KoconutSequence.prototype.maxOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldable = koconut.maxOfWith(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context6.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context6.sent;
            (0, _chai.expect)(result).equals("Mac Book Air -- September");

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it(_module.KoconutSequence.prototype.maxOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldable = koconut.maxOfWithOrNull(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context7.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context7.sent;
            (0, _chai.expect)(result).equals("Mac Book Air -- September");

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it(_module.KoconutSequence.prototype.maxWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context8.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context8.prev = 9;
            _context8.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context8.next = 17;
            break;

          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](9);
            (0, _chai.expect)(_context8.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[9, 14]]);
  })));
  it(_module.KoconutSequence.prototype.maxWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.maxWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context9.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).maxWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context9.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context9.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it(_module.KoconutSequence.prototype.minBy.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee10() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minBy(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context10.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase2 = koconut.minBy(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context10.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context10.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minBy(function (eachElement) {
              return eachElement;
            });
            _context10.prev = 14;
            _context10.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            _context10.next = 22;
            break;

          case 19:
            _context10.prev = 19;
            _context10.t0 = _context10["catch"](14);
            (0, _chai.expect)(_context10.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 22:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[14, 19]]);
  })));
  it(_module.KoconutSequence.prototype.minByOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee11() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minByOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context11.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context11.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase2 = koconut.minByOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context11.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context11.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minByOrNull(function (eachElement) {
              return eachElement;
            });
            _context11.next = 16;
            return yieldableCase3["yield"]();

          case 16:
            resultCase3 = _context11.sent;
            (0, _chai.expect)(resultCase3).equals(null);

          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it(_module.KoconutSequence.prototype.minOf.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee12() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minOf(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context12.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context12.sent;
            (0, _chai.expect)(resultCase1).equals("Mac Book Air -- September");
            yieldableCase2 = koconut.minOf(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context12.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context12.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));

          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it(_module.KoconutSequence.prototype.minOfOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee13() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2, yieldableCase3, resultCase3;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minOfOrNull(function (eachElement) {
              return eachElement.name;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context13.sent;
            (0, _chai.expect)(resultCase1).equals("Mac Book Air -- September");
            yieldableCase2 = koconut.minOfOrNull(function (eachElement) {
              return eachElement;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context13.sent;
            (0, _chai.expect)(resultCase2).eqls(new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200));
            yieldableCase3 = koconut.filter(function (eachElement) {
              return eachElement.price < 500;
            }).minOfOrNull(function (eachElement) {
              return eachElement.price;
            });
            (0, _chai.expect)(yieldableCase3).to.be.instanceOf(_module.KoconutPrimitive);
            _context13.next = 17;
            return yieldableCase3["yield"]();

          case 17:
            resultCase3 = _context13.sent;
            (0, _chai.expect)(resultCase3).equals(null);

          case 19:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it(_module.KoconutSequence.prototype.minOfWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee14() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldable = koconut.minOfWith(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context14.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context14.sent;
            (0, _chai.expect)(result).equals("iPhone -- June");

          case 7:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it(_module.KoconutSequence.prototype.minOfWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee15() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldable = koconut.minOfWithOrNull(function (eachElement) {
              return eachElement.name;
            }, function (front, rear) {
              return front.length - rear.length;
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context15.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context15.sent;
            (0, _chai.expect)(result).equals("iPhone -- June");

          case 7:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it(_module.KoconutSequence.prototype.minWith.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee16() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context16.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minWith(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context16.prev = 9;
            _context16.next = 12;
            return yieldableCase2["yield"]();

          case 12:
            _context16.next = 17;
            break;

          case 14:
            _context16.prev = 14;
            _context16.t0 = _context16["catch"](9);
            (0, _chai.expect)(_context16.t0).to.be.instanceOf(_module.KoconutNoSuchElementException);

          case 17:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[9, 14]]);
  })));
  it(_module.KoconutSequence.prototype.minWithOrNull.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee17() {
    var koconut, yieldableCase1, resultCase1, yieldableCase2, resultCase2;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            koconut = _module.KoconutSequence.from([new _TestDataClasses.ProductInfo("A-1", "Mac Book Pro -- May", 2000), new _TestDataClasses.ProductInfo("A-2", "Mac Book Air -- September", 1200), new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500)]);
            yieldableCase1 = koconut.minWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase1).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 5;
            return yieldableCase1["yield"]();

          case 5:
            resultCase1 = _context17.sent;
            (0, _chai.expect)(resultCase1).eqls(new _TestDataClasses.ProductInfo("A-3", "iPhone -- June", 1500));
            yieldableCase2 = koconut.filter(function (eachElement) {
              return eachElement.price > 3000;
            }).minWithOrNull(function (front, rear) {
              return front.name.length - rear.name.length;
            });
            (0, _chai.expect)(yieldableCase2).to.be.instanceOf(_module.KoconutPrimitive);
            _context17.next = 11;
            return yieldableCase2["yield"]();

          case 11:
            resultCase2 = _context17.sent;
            (0, _chai.expect)(resultCase2).equals(null);

          case 13:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
});
describe("".concat(_module.KoconutSequence.name, " -- Iterator"), function () {
  it(_module.KoconutSequence.prototype.forEach.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee18() {
    var koconut, yieldable;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            koconut = _module.KoconutSequence.of(1, 2, 3, 4, 5);
            yieldable = koconut.forEach(function (eachElement) {
              (0, _chai.expect)(eachElement).to.be.a("number");
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context18.next = 5;
            return yieldable.process();

          case 5:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it(_module.KoconutSequence.prototype.forEachIndexed.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee19() {
    var koconut, yieldable;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            koconut = _module.KoconutSequence.of(1, 2, 3, 4, 5);
            yieldable = koconut.forEachIndexed(function (eachIndex, eachElement) {
              (0, _chai.expect)(eachElement - eachIndex).equals(1);
            });
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutPrimitive);
            _context19.next = 5;
            return yieldable.process();

          case 5:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
});
describe("".concat(_module.KoconutSequence.name, " -- Caster"), function () {
  it(_module.KoconutSequence.prototype.asArray.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee20() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            koconut = _module.KoconutSequence.of(1, 2, 3, 4, 5);
            yieldable = koconut.asArray();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutArray);
            _context20.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context20.sent;
            (0, _chai.expect)(result).eqls([1, 2, 3, 4, 5]);

          case 7:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it(_module.KoconutSequence.prototype.asSet.name, (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee21() {
    var koconut, yieldable, result;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            koconut = _module.KoconutSequence.of(1, 1, 2, 2, 3, 3);
            yieldable = koconut.asSet();
            (0, _chai.expect)(yieldable).to.be.instanceOf(_module.KoconutSet);
            _context21.next = 5;
            return yieldable["yield"]();

          case 5:
            result = _context21.sent;
            (0, _chai.expect)(result).eqls(new Set([1, 2, 3]));

          case 7:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
});