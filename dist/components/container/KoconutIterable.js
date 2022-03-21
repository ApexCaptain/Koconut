'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutIterable = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
);

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized'),
);

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits'),
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn'),
);

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf'),
);

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty'),
);

var _module = require('../../module');

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var normalCompletion = true;
  var didErr = false;
  var err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it['return'] != null) it['return']();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2['default'])(Derived);
    var result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2['default'])(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2['default'])(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

var KoconutIterable = (function (_KoconutPrimitive) {
  (0, _inherits2['default'])(KoconutIterable, _KoconutPrimitive);

  var _super = _createSuper(KoconutIterable);

  function KoconutIterable() {
    var _this;

    (0, _classCallCheck2['default'])(this, KoconutIterable);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'mSize',
      0,
    );
    return _this;
  }

  (0, _createClass2['default'])(KoconutIterable, [
    {
      key: 'count',
      value: function count() {
        var _this2 = this;

        var predicate =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;
        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        if (predicate) predicate.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee() {
              var count;
              var _iterator;
              var _step;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        count = 0;
                        _iterator = _createForOfIteratorHelper(
                          _this2.combinedDataWrapper,
                        );
                        _context.prev = 2;

                        _iterator.s();

                      case 4:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 16;
                          break;
                        }

                        eachCombinedDatum = _step.value;

                        if (predicate) {
                          _context.next = 10;
                          break;
                        }

                        count++;
                        _context.next = 14;
                        break;

                      case 10:
                        _context.next = 12;
                        return predicate(eachCombinedDatum);

                      case 12:
                        if (!_context.sent) {
                          _context.next = 14;
                          break;
                        }

                        count++;

                      case 14:
                        _context.next = 4;
                        break;

                      case 16:
                        _context.next = 21;
                        break;

                      case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](2);

                        _iterator.e(_context.t0);

                      case 21:
                        _context.prev = 21;

                        _iterator.f();

                        return _context.finish(21);

                      case 24:
                        return _context.abrupt('return', count);

                      case 25:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                null,
                [[2, 18, 21, 24]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxBy',
      value: function maxBy(selector) {
        var _this3 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;

        _module.KoconutDeprecation.showDeprecationWarning(
          '1.2.0',
          this.maxByOrNull,
        );

        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee2() {
              var dataToReturn;
              var lastComparableDatum;
              var _iterator2;
              var _step2;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        dataToReturn = null;
                        lastComparableDatum = null;
                        _iterator2 = _createForOfIteratorHelper(
                          _this3.combinedDataWrapper,
                        );
                        _context2.prev = 3;

                        _iterator2.s();

                      case 5:
                        if ((_step2 = _iterator2.n()).done) {
                          _context2.next = 29;
                          break;
                        }

                        eachCombinedDatum = _step2.value;
                        _context2.next = 9;
                        return selector(eachCombinedDatum);

                      case 9:
                        eachComparableDatum = _context2.sent;
                        shouldBeChanged = lastComparableDatum == null;

                        if (shouldBeChanged) {
                          _context2.next = 26;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context2.next = 25;
                          break;
                        }

                        eachCompareResult =
                          eachComparableDatum.compareTo(lastComparableDatum);
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context2.next = 21;
                          break;
                        }

                        _context2.next = 18;
                        return eachCompareResult['yield']();

                      case 18:
                        numberResult = _context2.sent;
                        _context2.next = 22;
                        break;

                      case 21:
                        numberResult = eachCompareResult;

                      case 22:
                        if (numberResult > 0) shouldBeChanged = true;
                        _context2.next = 26;
                        break;

                      case 25:
                        shouldBeChanged =
                          lastComparableDatum < eachComparableDatum;

                      case 26:
                        if (shouldBeChanged) {
                          dataToReturn = eachCombinedDatum;
                          lastComparableDatum = eachComparableDatum;
                        }

                      case 27:
                        _context2.next = 5;
                        break;

                      case 29:
                        _context2.next = 34;
                        break;

                      case 31:
                        _context2.prev = 31;
                        _context2.t0 = _context2['catch'](3);

                        _iterator2.e(_context2.t0);

                      case 34:
                        _context2.prev = 34;

                        _iterator2.f();

                        return _context2.finish(34);

                      case 37:
                        if (!(dataToReturn == null)) {
                          _context2.next = 39;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 39:
                        return _context2.abrupt('return', dataToReturn);

                      case 40:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                },
                _callee2,
                null,
                [[3, 31, 34, 37]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxByOrNull',
      value: function maxByOrNull(selector) {
        var _this4 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee3() {
              var dataToReturn;
              var lastComparableDatum;
              var _iterator3;
              var _step3;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        dataToReturn = null;
                        lastComparableDatum = null;
                        _iterator3 = _createForOfIteratorHelper(
                          _this4.combinedDataWrapper,
                        );
                        _context3.prev = 3;

                        _iterator3.s();

                      case 5:
                        if ((_step3 = _iterator3.n()).done) {
                          _context3.next = 29;
                          break;
                        }

                        eachCombinedDatum = _step3.value;
                        _context3.next = 9;
                        return selector(eachCombinedDatum);

                      case 9:
                        eachComparableDatum = _context3.sent;
                        shouldBeChanged = lastComparableDatum == null;

                        if (shouldBeChanged) {
                          _context3.next = 26;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context3.next = 25;
                          break;
                        }

                        eachCompareResult =
                          eachComparableDatum.compareTo(lastComparableDatum);
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context3.next = 21;
                          break;
                        }

                        _context3.next = 18;
                        return eachCompareResult['yield']();

                      case 18:
                        numberResult = _context3.sent;
                        _context3.next = 22;
                        break;

                      case 21:
                        numberResult = eachCompareResult;

                      case 22:
                        if (numberResult > 0) shouldBeChanged = true;
                        _context3.next = 26;
                        break;

                      case 25:
                        shouldBeChanged =
                          lastComparableDatum < eachComparableDatum;

                      case 26:
                        if (shouldBeChanged) {
                          dataToReturn = eachCombinedDatum;
                          lastComparableDatum = eachComparableDatum;
                        }

                      case 27:
                        _context3.next = 5;
                        break;

                      case 29:
                        _context3.next = 34;
                        break;

                      case 31:
                        _context3.prev = 31;
                        _context3.t0 = _context3['catch'](3);

                        _iterator3.e(_context3.t0);

                      case 34:
                        _context3.prev = 34;

                        _iterator3.f();

                        return _context3.finish(34);

                      case 37:
                        return _context3.abrupt('return', dataToReturn);

                      case 38:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                null,
                [[3, 31, 34, 37]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxOf',
      value: function maxOf(selector) {
        var _this5 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee4() {
              var lastComparableDatumToReturn;
              var _iterator4;
              var _step4;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator4 = _createForOfIteratorHelper(
                          _this5.combinedDataWrapper,
                        );
                        _context4.prev = 2;

                        _iterator4.s();

                      case 4:
                        if ((_step4 = _iterator4.n()).done) {
                          _context4.next = 28;
                          break;
                        }

                        eachCombinedDatum = _step4.value;
                        _context4.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context4.sent;
                        shouldBeChanged = lastComparableDatumToReturn == null;

                        if (shouldBeChanged) {
                          _context4.next = 25;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context4.next = 24;
                          break;
                        }

                        eachCompareResult = eachComparableDatum.compareTo(
                          lastComparableDatumToReturn,
                        );
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context4.next = 20;
                          break;
                        }

                        _context4.next = 17;
                        return eachCompareResult['yield']();

                      case 17:
                        numberResult = _context4.sent;
                        _context4.next = 21;
                        break;

                      case 20:
                        numberResult = eachCompareResult;

                      case 21:
                        if (numberResult > 0) shouldBeChanged = true;
                        _context4.next = 25;
                        break;

                      case 24:
                        shouldBeChanged =
                          lastComparableDatumToReturn < eachComparableDatum;

                      case 25:
                        if (shouldBeChanged)
                          lastComparableDatumToReturn = eachComparableDatum;

                      case 26:
                        _context4.next = 4;
                        break;

                      case 28:
                        _context4.next = 33;
                        break;

                      case 30:
                        _context4.prev = 30;
                        _context4.t0 = _context4['catch'](2);

                        _iterator4.e(_context4.t0);

                      case 33:
                        _context4.prev = 33;

                        _iterator4.f();

                        return _context4.finish(33);

                      case 36:
                        if (!(lastComparableDatumToReturn == null)) {
                          _context4.next = 38;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 38:
                        return _context4.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 39:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                null,
                [[2, 30, 33, 36]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxOfOrNull',
      value: function maxOfOrNull(selector) {
        var _this6 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee5() {
              var lastComparableDatumToReturn;
              var _iterator5;
              var _step5;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee5$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator5 = _createForOfIteratorHelper(
                          _this6.combinedDataWrapper,
                        );
                        _context5.prev = 2;

                        _iterator5.s();

                      case 4:
                        if ((_step5 = _iterator5.n()).done) {
                          _context5.next = 28;
                          break;
                        }

                        eachCombinedDatum = _step5.value;
                        _context5.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context5.sent;
                        shouldBeChanged = lastComparableDatumToReturn == null;

                        if (shouldBeChanged) {
                          _context5.next = 25;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context5.next = 24;
                          break;
                        }

                        eachCompareResult = eachComparableDatum.compareTo(
                          lastComparableDatumToReturn,
                        );
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context5.next = 20;
                          break;
                        }

                        _context5.next = 17;
                        return eachCompareResult['yield']();

                      case 17:
                        numberResult = _context5.sent;
                        _context5.next = 21;
                        break;

                      case 20:
                        numberResult = eachCompareResult;

                      case 21:
                        if (numberResult > 0) shouldBeChanged = true;
                        _context5.next = 25;
                        break;

                      case 24:
                        shouldBeChanged =
                          lastComparableDatumToReturn < eachComparableDatum;

                      case 25:
                        if (shouldBeChanged)
                          lastComparableDatumToReturn = eachComparableDatum;

                      case 26:
                        _context5.next = 4;
                        break;

                      case 28:
                        _context5.next = 33;
                        break;

                      case 30:
                        _context5.prev = 30;
                        _context5.t0 = _context5['catch'](2);

                        _iterator5.e(_context5.t0);

                      case 33:
                        _context5.prev = 33;

                        _iterator5.f();

                        return _context5.finish(33);

                      case 36:
                        return _context5.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 37:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                },
                _callee5,
                null,
                [[2, 30, 33, 36]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxOfWith',
      value: function maxOfWith(selector, comparator) {
        var _this7 = this;

        var selectorThisArg =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var comparatorThisArg =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee6() {
              var lastComparableDatumToReturn;
              var _iterator6;
              var _step6;
              var eachCombinedDatum;
              var eachComparableDatum;

              return _regenerator['default'].wrap(
                function _callee6$(_context6) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator6 = _createForOfIteratorHelper(
                          _this7.combinedDataWrapper,
                        );
                        _context6.prev = 2;

                        _iterator6.s();

                      case 4:
                        if ((_step6 = _iterator6.n()).done) {
                          _context6.next = 19;
                          break;
                        }

                        eachCombinedDatum = _step6.value;
                        _context6.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context6.sent;
                        _context6.t0 = lastComparableDatumToReturn == null;

                        if (_context6.t0) {
                          _context6.next = 15;
                          break;
                        }

                        _context6.next = 13;
                        return comparator(
                          lastComparableDatumToReturn,
                          eachComparableDatum,
                        );

                      case 13:
                        _context6.t1 = _context6.sent;
                        _context6.t0 = _context6.t1 < 0;

                      case 15:
                        if (!_context6.t0) {
                          _context6.next = 17;
                          break;
                        }

                        lastComparableDatumToReturn = eachComparableDatum;

                      case 17:
                        _context6.next = 4;
                        break;

                      case 19:
                        _context6.next = 24;
                        break;

                      case 21:
                        _context6.prev = 21;
                        _context6.t2 = _context6['catch'](2);

                        _iterator6.e(_context6.t2);

                      case 24:
                        _context6.prev = 24;

                        _iterator6.f();

                        return _context6.finish(24);

                      case 27:
                        if (!(lastComparableDatumToReturn == null)) {
                          _context6.next = 29;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 29:
                        return _context6.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 30:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                },
                _callee6,
                null,
                [[2, 21, 24, 27]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxOfWithOrNull',
      value: function maxOfWithOrNull(selector, comparator) {
        var _this8 = this;

        var selectorThisArg =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var comparatorThisArg =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee7() {
              var lastComparableDatumToReturn;
              var _iterator7;
              var _step7;
              var eachCombinedDatum;
              var eachComparableDatum;

              return _regenerator['default'].wrap(
                function _callee7$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator7 = _createForOfIteratorHelper(
                          _this8.combinedDataWrapper,
                        );
                        _context7.prev = 2;

                        _iterator7.s();

                      case 4:
                        if ((_step7 = _iterator7.n()).done) {
                          _context7.next = 19;
                          break;
                        }

                        eachCombinedDatum = _step7.value;
                        _context7.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context7.sent;
                        _context7.t0 = lastComparableDatumToReturn == null;

                        if (_context7.t0) {
                          _context7.next = 15;
                          break;
                        }

                        _context7.next = 13;
                        return comparator(
                          lastComparableDatumToReturn,
                          eachComparableDatum,
                        );

                      case 13:
                        _context7.t1 = _context7.sent;
                        _context7.t0 = _context7.t1 < 0;

                      case 15:
                        if (!_context7.t0) {
                          _context7.next = 17;
                          break;
                        }

                        lastComparableDatumToReturn = eachComparableDatum;

                      case 17:
                        _context7.next = 4;
                        break;

                      case 19:
                        _context7.next = 24;
                        break;

                      case 21:
                        _context7.prev = 21;
                        _context7.t2 = _context7['catch'](2);

                        _iterator7.e(_context7.t2);

                      case 24:
                        _context7.prev = 24;

                        _iterator7.f();

                        return _context7.finish(24);

                      case 27:
                        return _context7.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 28:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                },
                _callee7,
                null,
                [[2, 21, 24, 27]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxWith',
      value: function maxWith(comparator) {
        var _this9 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        comparator = comparator.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee8() {
              var dataToReturn;
              var _iterator8;
              var _step8;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee8$(_context8) {
                  while (1) {
                    switch ((_context8.prev = _context8.next)) {
                      case 0:
                        dataToReturn = null;
                        _iterator8 = _createForOfIteratorHelper(
                          _this9.combinedDataWrapper,
                        );
                        _context8.prev = 2;

                        _iterator8.s();

                      case 4:
                        if ((_step8 = _iterator8.n()).done) {
                          _context8.next = 16;
                          break;
                        }

                        eachCombinedDatum = _step8.value;
                        _context8.t0 = dataToReturn == null;

                        if (_context8.t0) {
                          _context8.next = 12;
                          break;
                        }

                        _context8.next = 10;
                        return comparator(dataToReturn, eachCombinedDatum);

                      case 10:
                        _context8.t1 = _context8.sent;
                        _context8.t0 = _context8.t1 < 0;

                      case 12:
                        if (!_context8.t0) {
                          _context8.next = 14;
                          break;
                        }

                        dataToReturn = eachCombinedDatum;

                      case 14:
                        _context8.next = 4;
                        break;

                      case 16:
                        _context8.next = 21;
                        break;

                      case 18:
                        _context8.prev = 18;
                        _context8.t2 = _context8['catch'](2);

                        _iterator8.e(_context8.t2);

                      case 21:
                        _context8.prev = 21;

                        _iterator8.f();

                        return _context8.finish(21);

                      case 24:
                        if (!(dataToReturn == null)) {
                          _context8.next = 26;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 26:
                        return _context8.abrupt('return', dataToReturn);

                      case 27:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                },
                _callee8,
                null,
                [[2, 18, 21, 24]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'maxWithOrNull',
      value: function maxWithOrNull(comparator) {
        var _this10 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        comparator = comparator.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee9() {
              var dataToReturn;
              var _iterator9;
              var _step9;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee9$(_context9) {
                  while (1) {
                    switch ((_context9.prev = _context9.next)) {
                      case 0:
                        dataToReturn = null;
                        _iterator9 = _createForOfIteratorHelper(
                          _this10.combinedDataWrapper,
                        );
                        _context9.prev = 2;

                        _iterator9.s();

                      case 4:
                        if ((_step9 = _iterator9.n()).done) {
                          _context9.next = 16;
                          break;
                        }

                        eachCombinedDatum = _step9.value;
                        _context9.t0 = dataToReturn == null;

                        if (_context9.t0) {
                          _context9.next = 12;
                          break;
                        }

                        _context9.next = 10;
                        return comparator(dataToReturn, eachCombinedDatum);

                      case 10:
                        _context9.t1 = _context9.sent;
                        _context9.t0 = _context9.t1 < 0;

                      case 12:
                        if (!_context9.t0) {
                          _context9.next = 14;
                          break;
                        }

                        dataToReturn = eachCombinedDatum;

                      case 14:
                        _context9.next = 4;
                        break;

                      case 16:
                        _context9.next = 21;
                        break;

                      case 18:
                        _context9.prev = 18;
                        _context9.t2 = _context9['catch'](2);

                        _iterator9.e(_context9.t2);

                      case 21:
                        _context9.prev = 21;

                        _iterator9.f();

                        return _context9.finish(21);

                      case 24:
                        return _context9.abrupt('return', dataToReturn);

                      case 25:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                },
                _callee9,
                null,
                [[2, 18, 21, 24]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minBy',
      value: function minBy(selector) {
        var _this11 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;

        _module.KoconutDeprecation.showDeprecationWarning(
          '1.2.0',
          this.minByOrNull,
        );

        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee10() {
              var dataToReturn;
              var lastComparableDatum;
              var _iterator10;
              var _step10;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee10$(_context10) {
                  while (1) {
                    switch ((_context10.prev = _context10.next)) {
                      case 0:
                        dataToReturn = null;
                        lastComparableDatum = null;
                        _iterator10 = _createForOfIteratorHelper(
                          _this11.combinedDataWrapper,
                        );
                        _context10.prev = 3;

                        _iterator10.s();

                      case 5:
                        if ((_step10 = _iterator10.n()).done) {
                          _context10.next = 29;
                          break;
                        }

                        eachCombinedDatum = _step10.value;
                        _context10.next = 9;
                        return selector(eachCombinedDatum);

                      case 9:
                        eachComparableDatum = _context10.sent;
                        shouldBeChanged = lastComparableDatum == null;

                        if (shouldBeChanged) {
                          _context10.next = 26;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context10.next = 25;
                          break;
                        }

                        eachCompareResult =
                          eachComparableDatum.compareTo(lastComparableDatum);
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context10.next = 21;
                          break;
                        }

                        _context10.next = 18;
                        return eachCompareResult['yield']();

                      case 18:
                        numberResult = _context10.sent;
                        _context10.next = 22;
                        break;

                      case 21:
                        numberResult = eachCompareResult;

                      case 22:
                        if (numberResult < 0) shouldBeChanged = true;
                        _context10.next = 26;
                        break;

                      case 25:
                        shouldBeChanged =
                          lastComparableDatum > eachComparableDatum;

                      case 26:
                        if (shouldBeChanged) {
                          dataToReturn = eachCombinedDatum;
                          lastComparableDatum = eachComparableDatum;
                        }

                      case 27:
                        _context10.next = 5;
                        break;

                      case 29:
                        _context10.next = 34;
                        break;

                      case 31:
                        _context10.prev = 31;
                        _context10.t0 = _context10['catch'](3);

                        _iterator10.e(_context10.t0);

                      case 34:
                        _context10.prev = 34;

                        _iterator10.f();

                        return _context10.finish(34);

                      case 37:
                        if (!(dataToReturn == null)) {
                          _context10.next = 39;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 39:
                        return _context10.abrupt('return', dataToReturn);

                      case 40:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                },
                _callee10,
                null,
                [[3, 31, 34, 37]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minByOrNull',
      value: function minByOrNull(selector) {
        var _this12 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee11() {
              var dataToReturn;
              var lastComparableDatum;
              var _iterator11;
              var _step11;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee11$(_context11) {
                  while (1) {
                    switch ((_context11.prev = _context11.next)) {
                      case 0:
                        dataToReturn = null;
                        lastComparableDatum = null;
                        _iterator11 = _createForOfIteratorHelper(
                          _this12.combinedDataWrapper,
                        );
                        _context11.prev = 3;

                        _iterator11.s();

                      case 5:
                        if ((_step11 = _iterator11.n()).done) {
                          _context11.next = 29;
                          break;
                        }

                        eachCombinedDatum = _step11.value;
                        _context11.next = 9;
                        return selector(eachCombinedDatum);

                      case 9:
                        eachComparableDatum = _context11.sent;
                        shouldBeChanged = lastComparableDatum == null;

                        if (shouldBeChanged) {
                          _context11.next = 26;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context11.next = 25;
                          break;
                        }

                        eachCompareResult =
                          eachComparableDatum.compareTo(lastComparableDatum);
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context11.next = 21;
                          break;
                        }

                        _context11.next = 18;
                        return eachCompareResult['yield']();

                      case 18:
                        numberResult = _context11.sent;
                        _context11.next = 22;
                        break;

                      case 21:
                        numberResult = eachCompareResult;

                      case 22:
                        if (numberResult < 0) shouldBeChanged = true;
                        _context11.next = 26;
                        break;

                      case 25:
                        shouldBeChanged =
                          lastComparableDatum > eachComparableDatum;

                      case 26:
                        if (shouldBeChanged) {
                          dataToReturn = eachCombinedDatum;
                          lastComparableDatum = eachComparableDatum;
                        }

                      case 27:
                        _context11.next = 5;
                        break;

                      case 29:
                        _context11.next = 34;
                        break;

                      case 31:
                        _context11.prev = 31;
                        _context11.t0 = _context11['catch'](3);

                        _iterator11.e(_context11.t0);

                      case 34:
                        _context11.prev = 34;

                        _iterator11.f();

                        return _context11.finish(34);

                      case 37:
                        return _context11.abrupt('return', dataToReturn);

                      case 38:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                },
                _callee11,
                null,
                [[3, 31, 34, 37]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minOf',
      value: function minOf(selector) {
        var _this13 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee12() {
              var lastComparableDatumToReturn;
              var _iterator12;
              var _step12;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee12$(_context12) {
                  while (1) {
                    switch ((_context12.prev = _context12.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator12 = _createForOfIteratorHelper(
                          _this13.combinedDataWrapper,
                        );
                        _context12.prev = 2;

                        _iterator12.s();

                      case 4:
                        if ((_step12 = _iterator12.n()).done) {
                          _context12.next = 28;
                          break;
                        }

                        eachCombinedDatum = _step12.value;
                        _context12.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context12.sent;
                        shouldBeChanged = lastComparableDatumToReturn == null;

                        if (shouldBeChanged) {
                          _context12.next = 25;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context12.next = 24;
                          break;
                        }

                        eachCompareResult = eachComparableDatum.compareTo(
                          lastComparableDatumToReturn,
                        );
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context12.next = 20;
                          break;
                        }

                        _context12.next = 17;
                        return eachCompareResult['yield']();

                      case 17:
                        numberResult = _context12.sent;
                        _context12.next = 21;
                        break;

                      case 20:
                        numberResult = eachCompareResult;

                      case 21:
                        if (numberResult < 0) shouldBeChanged = true;
                        _context12.next = 25;
                        break;

                      case 24:
                        shouldBeChanged =
                          lastComparableDatumToReturn > eachComparableDatum;

                      case 25:
                        if (shouldBeChanged)
                          lastComparableDatumToReturn = eachComparableDatum;

                      case 26:
                        _context12.next = 4;
                        break;

                      case 28:
                        _context12.next = 33;
                        break;

                      case 30:
                        _context12.prev = 30;
                        _context12.t0 = _context12['catch'](2);

                        _iterator12.e(_context12.t0);

                      case 33:
                        _context12.prev = 33;

                        _iterator12.f();

                        return _context12.finish(33);

                      case 36:
                        if (!(lastComparableDatumToReturn == null)) {
                          _context12.next = 38;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 38:
                        return _context12.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 39:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                },
                _callee12,
                null,
                [[2, 30, 33, 36]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minOfOrNull',
      value: function minOfOrNull(selector) {
        var _this14 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        selector = selector.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee13() {
              var lastComparableDatumToReturn;
              var _iterator13;
              var _step13;
              var eachCombinedDatum;
              var eachComparableDatum;
              var shouldBeChanged;
              var eachCompareResult;
              var numberResult;

              return _regenerator['default'].wrap(
                function _callee13$(_context13) {
                  while (1) {
                    switch ((_context13.prev = _context13.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator13 = _createForOfIteratorHelper(
                          _this14.combinedDataWrapper,
                        );
                        _context13.prev = 2;

                        _iterator13.s();

                      case 4:
                        if ((_step13 = _iterator13.n()).done) {
                          _context13.next = 28;
                          break;
                        }

                        eachCombinedDatum = _step13.value;
                        _context13.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context13.sent;
                        shouldBeChanged = lastComparableDatumToReturn == null;

                        if (shouldBeChanged) {
                          _context13.next = 25;
                          break;
                        }

                        if (
                          !_module.KoconutTypeChecker.checkIsComparable(
                            eachComparableDatum,
                          )
                        ) {
                          _context13.next = 24;
                          break;
                        }

                        eachCompareResult = eachComparableDatum.compareTo(
                          lastComparableDatumToReturn,
                        );
                        numberResult = 0;

                        if (
                          !(
                            eachCompareResult instanceof
                            _module.KoconutPrimitive
                          )
                        ) {
                          _context13.next = 20;
                          break;
                        }

                        _context13.next = 17;
                        return eachCompareResult['yield']();

                      case 17:
                        numberResult = _context13.sent;
                        _context13.next = 21;
                        break;

                      case 20:
                        numberResult = eachCompareResult;

                      case 21:
                        if (numberResult < 0) shouldBeChanged = true;
                        _context13.next = 25;
                        break;

                      case 24:
                        shouldBeChanged =
                          lastComparableDatumToReturn > eachComparableDatum;

                      case 25:
                        if (shouldBeChanged)
                          lastComparableDatumToReturn = eachComparableDatum;

                      case 26:
                        _context13.next = 4;
                        break;

                      case 28:
                        _context13.next = 33;
                        break;

                      case 30:
                        _context13.prev = 30;
                        _context13.t0 = _context13['catch'](2);

                        _iterator13.e(_context13.t0);

                      case 33:
                        _context13.prev = 33;

                        _iterator13.f();

                        return _context13.finish(33);

                      case 36:
                        return _context13.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 37:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                },
                _callee13,
                null,
                [[2, 30, 33, 36]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minOfWith',
      value: function minOfWith(selector, comparator) {
        var _this15 = this;

        var selectorThisArg =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var comparatorThisArg =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee14() {
              var lastComparableDatumToReturn;
              var _iterator14;
              var _step14;
              var eachCombinedDatum;
              var eachComparableDatum;

              return _regenerator['default'].wrap(
                function _callee14$(_context14) {
                  while (1) {
                    switch ((_context14.prev = _context14.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator14 = _createForOfIteratorHelper(
                          _this15.combinedDataWrapper,
                        );
                        _context14.prev = 2;

                        _iterator14.s();

                      case 4:
                        if ((_step14 = _iterator14.n()).done) {
                          _context14.next = 19;
                          break;
                        }

                        eachCombinedDatum = _step14.value;
                        _context14.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context14.sent;
                        _context14.t0 = lastComparableDatumToReturn == null;

                        if (_context14.t0) {
                          _context14.next = 15;
                          break;
                        }

                        _context14.next = 13;
                        return comparator(
                          lastComparableDatumToReturn,
                          eachComparableDatum,
                        );

                      case 13:
                        _context14.t1 = _context14.sent;
                        _context14.t0 = _context14.t1 > 0;

                      case 15:
                        if (!_context14.t0) {
                          _context14.next = 17;
                          break;
                        }

                        lastComparableDatumToReturn = eachComparableDatum;

                      case 17:
                        _context14.next = 4;
                        break;

                      case 19:
                        _context14.next = 24;
                        break;

                      case 21:
                        _context14.prev = 21;
                        _context14.t2 = _context14['catch'](2);

                        _iterator14.e(_context14.t2);

                      case 24:
                        _context14.prev = 24;

                        _iterator14.f();

                        return _context14.finish(24);

                      case 27:
                        if (!(lastComparableDatumToReturn == null)) {
                          _context14.next = 29;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 29:
                        return _context14.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 30:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                },
                _callee14,
                null,
                [[2, 21, 24, 27]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minOfWithOrNull',
      value: function minOfWithOrNull(selector, comparator) {
        var _this16 = this;

        var selectorThisArg =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var comparatorThisArg =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        selector = selector.bind(selectorThisArg);
        comparator = comparator.bind(comparatorThisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee15() {
              var lastComparableDatumToReturn;
              var _iterator15;
              var _step15;
              var eachCombinedDatum;
              var eachComparableDatum;

              return _regenerator['default'].wrap(
                function _callee15$(_context15) {
                  while (1) {
                    switch ((_context15.prev = _context15.next)) {
                      case 0:
                        lastComparableDatumToReturn = null;
                        _iterator15 = _createForOfIteratorHelper(
                          _this16.combinedDataWrapper,
                        );
                        _context15.prev = 2;

                        _iterator15.s();

                      case 4:
                        if ((_step15 = _iterator15.n()).done) {
                          _context15.next = 19;
                          break;
                        }

                        eachCombinedDatum = _step15.value;
                        _context15.next = 8;
                        return selector(eachCombinedDatum);

                      case 8:
                        eachComparableDatum = _context15.sent;
                        _context15.t0 = lastComparableDatumToReturn == null;

                        if (_context15.t0) {
                          _context15.next = 15;
                          break;
                        }

                        _context15.next = 13;
                        return comparator(
                          lastComparableDatumToReturn,
                          eachComparableDatum,
                        );

                      case 13:
                        _context15.t1 = _context15.sent;
                        _context15.t0 = _context15.t1 > 0;

                      case 15:
                        if (!_context15.t0) {
                          _context15.next = 17;
                          break;
                        }

                        lastComparableDatumToReturn = eachComparableDatum;

                      case 17:
                        _context15.next = 4;
                        break;

                      case 19:
                        _context15.next = 24;
                        break;

                      case 21:
                        _context15.prev = 21;
                        _context15.t2 = _context15['catch'](2);

                        _iterator15.e(_context15.t2);

                      case 24:
                        _context15.prev = 24;

                        _iterator15.f();

                        return _context15.finish(24);

                      case 27:
                        return _context15.abrupt(
                          'return',
                          lastComparableDatumToReturn,
                        );

                      case 28:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                },
                _callee15,
                null,
                [[2, 21, 24, 27]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minWith',
      value: function minWith(comparator) {
        var _this17 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        comparator = comparator.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee16() {
              var dataToReturn;
              var _iterator16;
              var _step16;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee16$(_context16) {
                  while (1) {
                    switch ((_context16.prev = _context16.next)) {
                      case 0:
                        dataToReturn = null;
                        _iterator16 = _createForOfIteratorHelper(
                          _this17.combinedDataWrapper,
                        );
                        _context16.prev = 2;

                        _iterator16.s();

                      case 4:
                        if ((_step16 = _iterator16.n()).done) {
                          _context16.next = 16;
                          break;
                        }

                        eachCombinedDatum = _step16.value;
                        _context16.t0 = dataToReturn == null;

                        if (_context16.t0) {
                          _context16.next = 12;
                          break;
                        }

                        _context16.next = 10;
                        return comparator(dataToReturn, eachCombinedDatum);

                      case 10:
                        _context16.t1 = _context16.sent;
                        _context16.t0 = _context16.t1 > 0;

                      case 12:
                        if (!_context16.t0) {
                          _context16.next = 14;
                          break;
                        }

                        dataToReturn = eachCombinedDatum;

                      case 14:
                        _context16.next = 4;
                        break;

                      case 16:
                        _context16.next = 21;
                        break;

                      case 18:
                        _context16.prev = 18;
                        _context16.t2 = _context16['catch'](2);

                        _iterator16.e(_context16.t2);

                      case 21:
                        _context16.prev = 21;

                        _iterator16.f();

                        return _context16.finish(21);

                      case 24:
                        if (!(dataToReturn == null)) {
                          _context16.next = 26;
                          break;
                        }

                        throw new _module.KoconutNoSuchElementException(
                          'Source data is empty',
                        );

                      case 26:
                        return _context16.abrupt('return', dataToReturn);

                      case 27:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                },
                _callee16,
                null,
                [[2, 18, 21, 24]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'minWithOrNull',
      value: function minWithOrNull(comparator) {
        var _this18 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        comparator = comparator.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee17() {
              var dataToReturn;
              var _iterator17;
              var _step17;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee17$(_context17) {
                  while (1) {
                    switch ((_context17.prev = _context17.next)) {
                      case 0:
                        dataToReturn = null;
                        _iterator17 = _createForOfIteratorHelper(
                          _this18.combinedDataWrapper,
                        );
                        _context17.prev = 2;

                        _iterator17.s();

                      case 4:
                        if ((_step17 = _iterator17.n()).done) {
                          _context17.next = 16;
                          break;
                        }

                        eachCombinedDatum = _step17.value;
                        _context17.t0 = dataToReturn == null;

                        if (_context17.t0) {
                          _context17.next = 12;
                          break;
                        }

                        _context17.next = 10;
                        return comparator(dataToReturn, eachCombinedDatum);

                      case 10:
                        _context17.t1 = _context17.sent;
                        _context17.t0 = _context17.t1 > 0;

                      case 12:
                        if (!_context17.t0) {
                          _context17.next = 14;
                          break;
                        }

                        dataToReturn = eachCombinedDatum;

                      case 14:
                        _context17.next = 4;
                        break;

                      case 16:
                        _context17.next = 21;
                        break;

                      case 18:
                        _context17.prev = 18;
                        _context17.t2 = _context17['catch'](2);

                        _iterator17.e(_context17.t2);

                      case 21:
                        _context17.prev = 21;

                        _iterator17.f();

                        return _context17.finish(21);

                      case 24:
                        return _context17.abrupt('return', dataToReturn);

                      case 25:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                },
                _callee17,
                null,
                [[2, 18, 21, 24]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'asArray',
      value: function asArray() {
        var _this19 = this;

        var koconutToReturn = new _module.KoconutArray();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee18() {
              return _regenerator['default'].wrap(function _callee18$(
                _context18,
              ) {
                while (1) {
                  switch ((_context18.prev = _context18.next)) {
                    case 0:
                      return _context18.abrupt(
                        'return',
                        Array.from(_this19.combinedDataWrapper),
                      );

                    case 1:
                    case 'end':
                      return _context18.stop();
                  }
                }
              },
              _callee18);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'asSet',
      value: function asSet() {
        var _this20 = this;

        var koconutToReturn = new _module.KoconutSet();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee19() {
              return _regenerator['default'].wrap(function _callee19$(
                _context19,
              ) {
                while (1) {
                  switch ((_context19.prev = _context19.next)) {
                    case 0:
                      return _context19.abrupt(
                        'return',
                        new Set(_this20.combinedDataWrapper),
                      );

                    case 1:
                    case 'end':
                      return _context19.stop();
                  }
                }
              },
              _callee19);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'all',
      value: function all(predicate) {
        var _this21 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        predicate = predicate.bind(thisArg);
        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee20() {
              var _iterator18;
              var _step18;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee20$(_context20) {
                  while (1) {
                    switch ((_context20.prev = _context20.next)) {
                      case 0:
                        _iterator18 = _createForOfIteratorHelper(
                          _this21.combinedDataWrapper,
                        );
                        _context20.prev = 1;

                        _iterator18.s();

                      case 3:
                        if ((_step18 = _iterator18.n()).done) {
                          _context20.next = 11;
                          break;
                        }

                        eachCombinedDatum = _step18.value;
                        _context20.next = 7;
                        return predicate(eachCombinedDatum);

                      case 7:
                        if (_context20.sent) {
                          _context20.next = 9;
                          break;
                        }

                        return _context20.abrupt('return', false);

                      case 9:
                        _context20.next = 3;
                        break;

                      case 11:
                        _context20.next = 16;
                        break;

                      case 13:
                        _context20.prev = 13;
                        _context20.t0 = _context20['catch'](1);

                        _iterator18.e(_context20.t0);

                      case 16:
                        _context20.prev = 16;

                        _iterator18.f();

                        return _context20.finish(16);

                      case 19:
                        return _context20.abrupt('return', true);

                      case 20:
                      case 'end':
                        return _context20.stop();
                    }
                  }
                },
                _callee20,
                null,
                [[1, 13, 16, 19]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'any',
      value: function any(predicate) {
        var _this22 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        predicate = predicate.bind(thisArg);
        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee21() {
              var _iterator19;
              var _step19;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee21$(_context21) {
                  while (1) {
                    switch ((_context21.prev = _context21.next)) {
                      case 0:
                        _iterator19 = _createForOfIteratorHelper(
                          _this22.combinedDataWrapper,
                        );
                        _context21.prev = 1;

                        _iterator19.s();

                      case 3:
                        if ((_step19 = _iterator19.n()).done) {
                          _context21.next = 11;
                          break;
                        }

                        eachCombinedDatum = _step19.value;
                        _context21.next = 7;
                        return predicate(eachCombinedDatum);

                      case 7:
                        if (!_context21.sent) {
                          _context21.next = 9;
                          break;
                        }

                        return _context21.abrupt('return', true);

                      case 9:
                        _context21.next = 3;
                        break;

                      case 11:
                        _context21.next = 16;
                        break;

                      case 13:
                        _context21.prev = 13;
                        _context21.t0 = _context21['catch'](1);

                        _iterator19.e(_context21.t0);

                      case 16:
                        _context21.prev = 16;

                        _iterator19.f();

                        return _context21.finish(16);

                      case 19:
                        return _context21.abrupt('return', false);

                      case 20:
                      case 'end':
                        return _context21.stop();
                    }
                  }
                },
                _callee21,
                null,
                [[1, 13, 16, 19]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'isEmpty',
      value: function isEmpty() {
        var _this23 = this;

        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee22() {
              return _regenerator['default'].wrap(function _callee22$(
                _context22,
              ) {
                while (1) {
                  switch ((_context22.prev = _context22.next)) {
                    case 0:
                      return _context22.abrupt(
                        'return',
                        _this23.combinedDataWrapper != null &&
                          _this23.mSize == 0,
                      );

                    case 1:
                    case 'end':
                      return _context22.stop();
                  }
                }
              },
              _callee22);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'isNotEmpty',
      value: function isNotEmpty() {
        var _this24 = this;

        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee23() {
              return _regenerator['default'].wrap(function _callee23$(
                _context23,
              ) {
                while (1) {
                  switch ((_context23.prev = _context23.next)) {
                    case 0:
                      return _context23.abrupt('return', _this24.mSize != 0);

                    case 1:
                    case 'end':
                      return _context23.stop();
                  }
                }
              },
              _callee23);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'isNullOrEmpty',
      value: function isNullOrEmpty() {
        var _this25 = this;

        _module.KoconutDeprecation.showDeprecationWarning(
          '1.3.0',
          this.isEmpty,
        );

        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee24() {
              return _regenerator['default'].wrap(function _callee24$(
                _context24,
              ) {
                while (1) {
                  switch ((_context24.prev = _context24.next)) {
                    case 0:
                      return _context24.abrupt('return', _this25.mSize == 0);

                    case 1:
                    case 'end':
                      return _context24.stop();
                  }
                }
              },
              _callee24);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'none',
      value: function none() {
        var _this26 = this;

        var predicate =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;
        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        if (predicate) predicate = predicate.bind(thisArg);
        var koconutToReturn = new _module.KoconutBoolean();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee25() {
              var _iterator20;
              var _step20;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee25$(_context25) {
                  while (1) {
                    switch ((_context25.prev = _context25.next)) {
                      case 0:
                        if (!(_this26.mSize == 0)) {
                          _context25.next = 2;
                          break;
                        }

                        return _context25.abrupt('return', true);

                      case 2:
                        if (!predicate) {
                          _context25.next = 23;
                          break;
                        }

                        _iterator20 = _createForOfIteratorHelper(
                          _this26.combinedDataWrapper,
                        );
                        _context25.prev = 4;

                        _iterator20.s();

                      case 6:
                        if ((_step20 = _iterator20.n()).done) {
                          _context25.next = 14;
                          break;
                        }

                        eachCombinedDatum = _step20.value;
                        _context25.next = 10;
                        return predicate(eachCombinedDatum);

                      case 10:
                        if (!_context25.sent) {
                          _context25.next = 12;
                          break;
                        }

                        return _context25.abrupt('return', false);

                      case 12:
                        _context25.next = 6;
                        break;

                      case 14:
                        _context25.next = 19;
                        break;

                      case 16:
                        _context25.prev = 16;
                        _context25.t0 = _context25['catch'](4);

                        _iterator20.e(_context25.t0);

                      case 19:
                        _context25.prev = 19;

                        _iterator20.f();

                        return _context25.finish(19);

                      case 22:
                        return _context25.abrupt('return', true);

                      case 23:
                        return _context25.abrupt('return', false);

                      case 24:
                      case 'end':
                        return _context25.stop();
                    }
                  }
                },
                _callee25,
                null,
                [[4, 16, 19, 22]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'forEach',
      value: function forEach(action) {
        var _this27 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        action = action.bind(thisArg);
        var koconutToReturn = new _module.KoconutPrimitive();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee26() {
              var _iterator21;
              var _step21;
              var eachCombinedDatum;
              var signal;

              return _regenerator['default'].wrap(
                function _callee26$(_context26) {
                  while (1) {
                    switch ((_context26.prev = _context26.next)) {
                      case 0:
                        if (!(_this27.combinedDataWrapper != null)) {
                          _context26.next = 21;
                          break;
                        }

                        _iterator21 = _createForOfIteratorHelper(
                          _this27.combinedDataWrapper,
                        );
                        _context26.prev = 2;

                        _iterator21.s();

                      case 4:
                        if ((_step21 = _iterator21.n()).done) {
                          _context26.next = 13;
                          break;
                        }

                        eachCombinedDatum = _step21.value;
                        _context26.next = 8;
                        return action(eachCombinedDatum);

                      case 8:
                        signal = _context26.sent;

                        if (
                          !(
                            signal == false ||
                            signal == _module.KoconutLoopSignal.BREAK
                          )
                        ) {
                          _context26.next = 11;
                          break;
                        }

                        return _context26.abrupt('break', 13);

                      case 11:
                        _context26.next = 4;
                        break;

                      case 13:
                        _context26.next = 18;
                        break;

                      case 15:
                        _context26.prev = 15;
                        _context26.t0 = _context26['catch'](2);

                        _iterator21.e(_context26.t0);

                      case 18:
                        _context26.prev = 18;

                        _iterator21.f();

                        return _context26.finish(18);

                      case 21:
                      case 'end':
                        return _context26.stop();
                    }
                  }
                },
                _callee26,
                null,
                [[2, 15, 18, 21]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'onEach',
      value: function onEach(action, thisArg) {
        var _this28 = this;

        action = action.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee27() {
              var _iterator22;
              var _step22;
              var eachCombinedDatum;
              var signal;

              return _regenerator['default'].wrap(
                function _callee27$(_context27) {
                  while (1) {
                    switch ((_context27.prev = _context27.next)) {
                      case 0:
                        if (!(_this28.combinedDataWrapper != null)) {
                          _context27.next = 21;
                          break;
                        }

                        _iterator22 = _createForOfIteratorHelper(
                          _this28.combinedDataWrapper,
                        );
                        _context27.prev = 2;

                        _iterator22.s();

                      case 4:
                        if ((_step22 = _iterator22.n()).done) {
                          _context27.next = 13;
                          break;
                        }

                        eachCombinedDatum = _step22.value;
                        _context27.next = 8;
                        return action(eachCombinedDatum);

                      case 8:
                        signal = _context27.sent;

                        if (
                          !(
                            signal == false ||
                            signal == _module.KoconutLoopSignal.BREAK
                          )
                        ) {
                          _context27.next = 11;
                          break;
                        }

                        return _context27.abrupt('break', 13);

                      case 11:
                        _context27.next = 4;
                        break;

                      case 13:
                        _context27.next = 18;
                        break;

                      case 15:
                        _context27.prev = 15;
                        _context27.t0 = _context27['catch'](2);

                        _iterator22.e(_context27.t0);

                      case 18:
                        _context27.prev = 18;

                        _iterator22.f();

                        return _context27.finish(18);

                      case 21:
                        return _context27.abrupt('return', _this28.data);

                      case 22:
                      case 'end':
                        return _context27.stop();
                    }
                  }
                },
                _callee27,
                null,
                [[2, 15, 18, 21]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'filter',
      value: function filter(predicate, thisArg) {
        var _this29 = this;

        predicate = predicate.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee28() {
              var processedArray;
              var _iterator23;
              var _step23;
              var eachCombinedDatum;
              var processedMap;

              return _regenerator['default'].wrap(
                function _callee28$(_context28) {
                  while (1) {
                    switch ((_context28.prev = _context28.next)) {
                      case 0:
                        processedArray = new Array();

                        if (!(_this29.combinedDataWrapper != null)) {
                          _context28.next = 21;
                          break;
                        }

                        _iterator23 = _createForOfIteratorHelper(
                          _this29.combinedDataWrapper,
                        );
                        _context28.prev = 3;

                        _iterator23.s();

                      case 5:
                        if ((_step23 = _iterator23.n()).done) {
                          _context28.next = 13;
                          break;
                        }

                        eachCombinedDatum = _step23.value;
                        _context28.next = 9;
                        return predicate(eachCombinedDatum);

                      case 9:
                        if (!_context28.sent) {
                          _context28.next = 11;
                          break;
                        }

                        processedArray.push(eachCombinedDatum);

                      case 11:
                        _context28.next = 5;
                        break;

                      case 13:
                        _context28.next = 18;
                        break;

                      case 15:
                        _context28.prev = 15;
                        _context28.t0 = _context28['catch'](3);

                        _iterator23.e(_context28.t0);

                      case 18:
                        _context28.prev = 18;

                        _iterator23.f();

                        return _context28.finish(18);

                      case 21:
                        if (!(_this29.data instanceof Array)) {
                          _context28.next = 25;
                          break;
                        }

                        return _context28.abrupt('return', processedArray);

                      case 25:
                        if (!(_this29.data instanceof Set)) {
                          _context28.next = 29;
                          break;
                        }

                        return _context28.abrupt(
                          'return',
                          new Set(processedArray),
                        );

                      case 29:
                        processedMap = new Map();
                        processedArray.forEach(function (eachProcessedDatum) {
                          var eachEntry = eachProcessedDatum;
                          processedMap.set(eachEntry.key, eachEntry.value);
                        });
                        return _context28.abrupt('return', processedMap);

                      case 32:
                      case 'end':
                        return _context28.stop();
                    }
                  }
                },
                _callee28,
                null,
                [[3, 15, 18, 21]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'filterNot',
      value: function filterNot(predicate, thisArg) {
        var _this30 = this;

        predicate = predicate.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee29() {
              var processedArray;
              var _iterator24;
              var _step24;
              var eachCombinedDatum;
              var processedMap;

              return _regenerator['default'].wrap(
                function _callee29$(_context29) {
                  while (1) {
                    switch ((_context29.prev = _context29.next)) {
                      case 0:
                        processedArray = new Array();

                        if (!(_this30.combinedDataWrapper != null)) {
                          _context29.next = 21;
                          break;
                        }

                        _iterator24 = _createForOfIteratorHelper(
                          _this30.combinedDataWrapper,
                        );
                        _context29.prev = 3;

                        _iterator24.s();

                      case 5:
                        if ((_step24 = _iterator24.n()).done) {
                          _context29.next = 13;
                          break;
                        }

                        eachCombinedDatum = _step24.value;
                        _context29.next = 9;
                        return predicate(eachCombinedDatum);

                      case 9:
                        if (_context29.sent) {
                          _context29.next = 11;
                          break;
                        }

                        processedArray.push(eachCombinedDatum);

                      case 11:
                        _context29.next = 5;
                        break;

                      case 13:
                        _context29.next = 18;
                        break;

                      case 15:
                        _context29.prev = 15;
                        _context29.t0 = _context29['catch'](3);

                        _iterator24.e(_context29.t0);

                      case 18:
                        _context29.prev = 18;

                        _iterator24.f();

                        return _context29.finish(18);

                      case 21:
                        if (!(_this30.data instanceof Array)) {
                          _context29.next = 25;
                          break;
                        }

                        return _context29.abrupt('return', processedArray);

                      case 25:
                        if (!(_this30.data instanceof Set)) {
                          _context29.next = 29;
                          break;
                        }

                        return _context29.abrupt(
                          'return',
                          new Set(processedArray),
                        );

                      case 29:
                        processedMap = new Map();
                        processedArray.forEach(function (eachProcessedDatum) {
                          var eachEntry = eachProcessedDatum;
                          processedMap.set(eachEntry.key, eachEntry.value);
                        });
                        return _context29.abrupt('return', processedMap);

                      case 32:
                      case 'end':
                        return _context29.stop();
                    }
                  }
                },
                _callee29,
                null,
                [[3, 15, 18, 21]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'flatMap',
      value: function flatMap(transform) {
        var _this31 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        transform = transform.bind(thisArg);
        var koconutToReturn = new _module.KoconutArray();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee30() {
              var processedArray;
              var _iterator25;
              var _step25;
              var eachCombinedDatum;
              var _iterator26;
              var _step26;
              var eachSubElement;

              return _regenerator['default'].wrap(
                function _callee30$(_context30) {
                  while (1) {
                    switch ((_context30.prev = _context30.next)) {
                      case 0:
                        processedArray = new Array();

                        if (!(_this31.combinedDataWrapper != null)) {
                          _context30.next = 23;
                          break;
                        }

                        _iterator25 = _createForOfIteratorHelper(
                          _this31.combinedDataWrapper,
                        );
                        _context30.prev = 3;

                        _iterator25.s();

                      case 5:
                        if ((_step25 = _iterator25.n()).done) {
                          _context30.next = 15;
                          break;
                        }

                        eachCombinedDatum = _step25.value;
                        _context30.t0 = _createForOfIteratorHelper;
                        _context30.next = 10;
                        return transform(eachCombinedDatum);

                      case 10:
                        _context30.t1 = _context30.sent;
                        _iterator26 = (0, _context30.t0)(_context30.t1);

                        try {
                          for (
                            _iterator26.s();
                            !(_step26 = _iterator26.n()).done;

                          ) {
                            eachSubElement = _step26.value;
                            processedArray.push(eachSubElement);
                          }
                        } catch (err) {
                          _iterator26.e(err);
                        } finally {
                          _iterator26.f();
                        }

                      case 13:
                        _context30.next = 5;
                        break;

                      case 15:
                        _context30.next = 20;
                        break;

                      case 17:
                        _context30.prev = 17;
                        _context30.t2 = _context30['catch'](3);

                        _iterator25.e(_context30.t2);

                      case 20:
                        _context30.prev = 20;

                        _iterator25.f();

                        return _context30.finish(20);

                      case 23:
                        return _context30.abrupt('return', processedArray);

                      case 24:
                      case 'end':
                        return _context30.stop();
                    }
                  }
                },
                _callee30,
                null,
                [[3, 17, 20, 23]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'flatMapTo',
      value: function flatMapTo(destination, transform, thisArg) {
        var _this32 = this;

        transform = transform.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee31() {
              var flattenIterable;
              return _regenerator['default'].wrap(function _callee31$(
                _context31,
              ) {
                while (1) {
                  switch ((_context31.prev = _context31.next)) {
                    case 0:
                      flattenIterable = _this32.flatMap(transform, thisArg);

                      if (!(destination instanceof Array)) {
                        _context31.next = 6;
                        break;
                      }

                      _context31.next = 4;
                      return flattenIterable
                        .forEach(function (eachElement) {
                          destination.push(eachElement);
                        })
                        .process();

                    case 4:
                      _context31.next = 8;
                      break;

                    case 6:
                      _context31.next = 8;
                      return flattenIterable
                        .asSet()
                        .forEach(function (eachElement) {
                          destination.add(eachElement);
                        })
                        .process();

                    case 8:
                      return _context31.abrupt('return', _this32.data);

                    case 9:
                    case 'end':
                      return _context31.stop();
                  }
                }
              },
              _callee31);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'map',
      value: function map(transform) {
        var _this33 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        transform = transform.bind(thisArg);
        var koconutToReturn = new _module.KoconutArray();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee32() {
              var processedArray;
              var _iterator27;
              var _step27;
              var eachCombinedDatum;

              return _regenerator['default'].wrap(
                function _callee32$(_context32) {
                  while (1) {
                    switch ((_context32.prev = _context32.next)) {
                      case 0:
                        processedArray = new Array();

                        if (!(_this33.combinedDataWrapper != null)) {
                          _context32.next = 22;
                          break;
                        }

                        _iterator27 = _createForOfIteratorHelper(
                          _this33.combinedDataWrapper,
                        );
                        _context32.prev = 3;

                        _iterator27.s();

                      case 5:
                        if ((_step27 = _iterator27.n()).done) {
                          _context32.next = 14;
                          break;
                        }

                        eachCombinedDatum = _step27.value;
                        _context32.t0 = processedArray;
                        _context32.next = 10;
                        return transform(eachCombinedDatum);

                      case 10:
                        _context32.t1 = _context32.sent;

                        _context32.t0.push.call(_context32.t0, _context32.t1);

                      case 12:
                        _context32.next = 5;
                        break;

                      case 14:
                        _context32.next = 19;
                        break;

                      case 16:
                        _context32.prev = 16;
                        _context32.t2 = _context32['catch'](3);

                        _iterator27.e(_context32.t2);

                      case 19:
                        _context32.prev = 19;

                        _iterator27.f();

                        return _context32.finish(19);

                      case 22:
                        return _context32.abrupt('return', processedArray);

                      case 23:
                      case 'end':
                        return _context32.stop();
                    }
                  }
                },
                _callee32,
                null,
                [[3, 16, 19, 22]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'mapTo',
      value: function mapTo(destination, transform, thisArg) {
        var _this34 = this;

        transform = transform.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee33() {
              var mappedIterable;
              return _regenerator['default'].wrap(function _callee33$(
                _context33,
              ) {
                while (1) {
                  switch ((_context33.prev = _context33.next)) {
                    case 0:
                      mappedIterable = _this34.map(transform, thisArg);

                      if (!(destination instanceof Array)) {
                        _context33.next = 6;
                        break;
                      }

                      _context33.next = 4;
                      return mappedIterable
                        .forEach(function (eachElement) {
                          destination.push(eachElement);
                        })
                        .process();

                    case 4:
                      _context33.next = 8;
                      break;

                    case 6:
                      _context33.next = 8;
                      return mappedIterable
                        .asSet()
                        .forEach(function (eachElement) {
                          destination.add(eachElement);
                        })
                        .process();

                    case 8:
                      return _context33.abrupt('return', _this34.data);

                    case 9:
                    case 'end':
                      return _context33.stop();
                  }
                }
              },
              _callee33);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'mapNotNull',
      value: function mapNotNull(transform) {
        var _this35 = this;

        var thisArg =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;
        transform = transform.bind(thisArg);
        var koconutToReturn = new _module.KoconutArray();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee34() {
              var processedArray;
              var _iterator28;
              var _step28;
              var eachCombinedDatum;
              var dataToAdd;

              return _regenerator['default'].wrap(
                function _callee34$(_context34) {
                  while (1) {
                    switch ((_context34.prev = _context34.next)) {
                      case 0:
                        processedArray = new Array();

                        if (!(_this35.combinedDataWrapper != null)) {
                          _context34.next = 21;
                          break;
                        }

                        _iterator28 = _createForOfIteratorHelper(
                          _this35.combinedDataWrapper,
                        );
                        _context34.prev = 3;

                        _iterator28.s();

                      case 5:
                        if ((_step28 = _iterator28.n()).done) {
                          _context34.next = 13;
                          break;
                        }

                        eachCombinedDatum = _step28.value;
                        _context34.next = 9;
                        return transform(eachCombinedDatum);

                      case 9:
                        dataToAdd = _context34.sent;
                        if (dataToAdd != null && dataToAdd != undefined)
                          processedArray.push(dataToAdd);

                      case 11:
                        _context34.next = 5;
                        break;

                      case 13:
                        _context34.next = 18;
                        break;

                      case 15:
                        _context34.prev = 15;
                        _context34.t0 = _context34['catch'](3);

                        _iterator28.e(_context34.t0);

                      case 18:
                        _context34.prev = 18;

                        _iterator28.f();

                        return _context34.finish(18);

                      case 21:
                        return _context34.abrupt('return', processedArray);

                      case 22:
                      case 'end':
                        return _context34.stop();
                    }
                  }
                },
                _callee34,
                null,
                [[3, 15, 18, 21]],
              );
            }),
          ),
        );
        return koconutToReturn;
      },
    },
    {
      key: 'mapNotNullTo',
      value: function mapNotNullTo(destination, transform, thisArg) {
        var _this36 = this;

        transform = transform.bind(thisArg);
        var koconutToReturn = new KoconutIterable();
        koconutToReturn.setPrevYieldable(this).setProcessor(
          (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee35() {
              var mappedIterable;
              return _regenerator['default'].wrap(function _callee35$(
                _context35,
              ) {
                while (1) {
                  switch ((_context35.prev = _context35.next)) {
                    case 0:
                      mappedIterable = _this36.mapNotNull(transform, thisArg);

                      if (!(destination instanceof Array)) {
                        _context35.next = 6;
                        break;
                      }

                      _context35.next = 4;
                      return mappedIterable
                        .forEach(function (eachElement) {
                          destination.push(eachElement);
                        })
                        .process();

                    case 4:
                      _context35.next = 8;
                      break;

                    case 6:
                      _context35.next = 8;
                      return mappedIterable
                        .asSet()
                        .forEach(function (eachElement) {
                          destination.add(eachElement);
                        })
                        .process();

                    case 8:
                      return _context35.abrupt('return', _this36.data);

                    case 9:
                    case 'end':
                      return _context35.stop();
                  }
                }
              },
              _callee35);
            }),
          ),
        );
        return koconutToReturn;
      },
    },
  ]);
  return KoconutIterable;
})(_module.KoconutPrimitive);

exports.KoconutIterable = KoconutIterable;
