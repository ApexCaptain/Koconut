'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Pair = exports.KoconutPair = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

var _get2 = _interopRequireDefault(require('@babel/runtime/helpers/get'));

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits'),
);

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn'),
);

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf'),
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

var _module = require('../../../module');

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

var Pair = (function () {
  function Pair(firstElement, secondElement) {
    (0, _classCallCheck2['default'])(this, Pair);
    this.firstElement = firstElement;
    this.secondElement = secondElement;
  }

  (0, _createClass2['default'])(
    Pair,
    [
      {
        key: 'first',
        get: function get() {
          return this.firstElement;
        },
      },
      {
        key: 'second',
        get: function get() {
          return this.secondElement;
        },
      },
      {
        key: 'toString',
        value: function toString() {
          return JSON.stringify({
            first: this.first,
            second: this.second,
          });
        },
      },
      {
        key: 'toArray',
        value: function toArray() {
          return [this.first, this.second];
        },
      },
      {
        key: 'toEntry',
        value: function toEntry() {
          return new _module.Entry(this.first, this.second);
        },
      },
      {
        key: 'equalsTo',
        value: function equalsTo(other) {
          var _this = this;

          if (
            _module.KoconutTypeChecker.checkIsEquatable(this.firstElement) &&
            _module.KoconutTypeChecker.checkIsEquatable(other.firstElement)
          ) {
            var firstCompareResult = this.firstElement.equalsTo(
              other.firstElement,
            );

            if (firstCompareResult instanceof _module.KoconutBoolean) {
              var koconutToReturn = new _module.KoconutBoolean();
              koconutToReturn.setProcessor(
                (0, _asyncToGenerator2['default'])(
                  _regenerator['default'].mark(function _callee() {
                    var thisValue;
                    var compareResult;
                    return _regenerator['default'].wrap(function _callee$(
                      _context,
                    ) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            thisValue = koconutToReturn['data'];

                            if (thisValue) {
                              _context.next = 3;
                              break;
                            }

                            return _context.abrupt('return', false);

                          case 3:
                            if (
                              !(
                                _module.KoconutTypeChecker.checkIsEquatable(
                                  _this.secondElement,
                                ) &&
                                _module.KoconutTypeChecker.checkIsEquatable(
                                  other.secondElement,
                                )
                              )
                            ) {
                              _context.next = 14;
                              break;
                            }

                            compareResult = _this.secondElement.equalsTo(
                              other.secondElement,
                            );

                            if (
                              !(compareResult instanceof _module.KoconutBoolean)
                            ) {
                              _context.next = 11;
                              break;
                            }

                            _context.next = 8;
                            return compareResult['yield']();

                          case 8:
                            return _context.abrupt('return', _context.sent);

                          case 11:
                            return _context.abrupt('return', compareResult);

                          case 12:
                            _context.next = 15;
                            break;

                          case 14:
                            return _context.abrupt(
                              'return',
                              _this.secondElement == other.secondElement,
                            );

                          case 15:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    },
                    _callee);
                  }),
                ),
              );
              return koconutToReturn;
            } else {
              if (!firstCompareResult) return false;

              if (
                _module.KoconutTypeChecker.checkIsEquatable(
                  this.secondElement,
                ) &&
                _module.KoconutTypeChecker.checkIsEquatable(other.secondElement)
              ) {
                var secondCompareResult = this.secondElement.equalsTo(
                  other.secondElement,
                );
                if (secondCompareResult instanceof _module.KoconutBoolean)
                  return _module.KoconutBoolean['fromPrimitive'](
                    secondCompareResult,
                  );
                else return secondCompareResult;
              } else return this.secondElement == other.secondElement;
            }
          } else {
            if (this.firstElement != other.firstElement) return false;

            if (
              _module.KoconutTypeChecker.checkIsEquatable(this.secondElement) &&
              _module.KoconutTypeChecker.checkIsEquatable(other.secondElement)
            ) {
              var compareResult = this.secondElement.equalsTo(
                other.secondElement,
              );
              if (compareResult instanceof _module.KoconutBoolean)
                return _module.KoconutBoolean['fromPrimitive'](compareResult);
              else return compareResult;
            } else return this.secondElement == other.secondElement;
          }
        },
      },
    ],
    [
      {
        key: 'from',
        value: function from(pair) {
          return new Pair(pair[0], pair[1]);
        },
      },
    ],
  );
  return Pair;
})();

exports.Pair = Pair;

var KoconutPair = (function (_KoconutPrimitive) {
  (0, _inherits2['default'])(KoconutPair, _KoconutPrimitive);

  var _super = _createSuper(KoconutPair);

  function KoconutPair() {
    var _this2;

    var first =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var second =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0, _classCallCheck2['default'])(this, KoconutPair);
    if (first != null && second != null)
      _this2 = _super.call(this, new Pair(first, second));
    else _this2 = _super.call(this);
    return (0, _possibleConstructorReturn2['default'])(_this2);
  }

  (0, _createClass2['default'])(KoconutPair, [
    {
      key: 'retrieve',
      value: (function () {
        var _retrieve = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee2() {
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.next = 2;
                      return (0, _get2['default'])(
                        (0, _getPrototypeOf2['default'])(KoconutPair.prototype),
                        'retrieve',
                        this,
                      ).call(this);

                    case 2:
                      return _context2.abrupt('return', this);

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this,
            );
          }),
        );

        function retrieve() {
          return _retrieve.apply(this, arguments);
        }

        return retrieve;
      })(),
    },
    {
      key: 'equalsTo',
      value: function equalsTo(other) {
        if (this.data != null && other.data != null)
          return this.data.equalsTo(other.data);
        return false;
      },
    },
  ]);
  return KoconutPair;
})(_module.KoconutPrimitive);

exports.KoconutPair = KoconutPair;
