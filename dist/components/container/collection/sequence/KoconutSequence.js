'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Sequence = exports.KoconutSequence = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
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

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
);

var _classPrivateFieldSet2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classPrivateFieldSet'),
);

var _classPrivateFieldGet2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classPrivateFieldGet'),
);

var _module = require('../../../../module');

var _Symbol$iterator;

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

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError(
      'Cannot initialize the same private elements twice on an object',
    );
  }
}

('use strict');

var _mIsFinished = new WeakMap();

var _mLastPrevIndex = new WeakMap();

var _mParentSequence = new WeakMap();

var _mTransformer = new WeakMap();

var _mInnerDataArray = new WeakMap();

_Symbol$iterator = Symbol.iterator;

var Sequence = (function (_Symbol$iterator2) {
  function Sequence() {
    var srcSequence =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2['default'])(this, Sequence);

    _classPrivateFieldInitSpec(this, _mIsFinished, {
      writable: true,
      value: false,
    });

    _classPrivateFieldInitSpec(this, _mLastPrevIndex, {
      writable: true,
      value: 0,
    });

    _classPrivateFieldInitSpec(this, _mParentSequence, {
      writable: true,
      value: null,
    });

    _classPrivateFieldInitSpec(this, _mTransformer, {
      writable: true,
      value: null,
    });

    _classPrivateFieldInitSpec(this, _mInnerDataArray, {
      writable: true,
      value: new Array(),
    });

    if (srcSequence != null) {
      var _iterator = _createForOfIteratorHelper(srcSequence);
      var _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var eachDatum = _step.value;
          (0, _classPrivateFieldGet2['default'])(this, _mInnerDataArray).push(
            eachDatum,
          );
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  (0, _createClass2['default'])(
    Sequence,
    [
      {
        key: _Symbol$iterator2,
        value: function value() {
          return (0, _classPrivateFieldGet2['default'])(this, _mInnerDataArray)[
            Symbol.iterator
          ]();
        },
      },
      {
        key: 'done',
        value: (function () {
          var _done = (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee() {
              var index;
              return _regenerator['default'].wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        index = 0;
                        if (
                          (0, _classPrivateFieldGet2['default'])(
                            this,
                            _mParentSequence,
                          )
                        )
                          (0, _classPrivateFieldSet2['default'])(
                            (0, _classPrivateFieldGet2['default'])(
                              this,
                              _mParentSequence,
                            ),
                            _mIsFinished,
                            false,
                          );

                      case 2:
                        if (
                          (0, _classPrivateFieldGet2['default'])(
                            this,
                            _mIsFinished,
                          )
                        ) {
                          _context.next = 7;
                          break;
                        }

                        _context.next = 5;
                        return this.getDatum(index++);

                      case 5:
                        _context.next = 2;
                        break;

                      case 7:
                        (0, _classPrivateFieldSet2['default'])(
                          this,
                          _mParentSequence,
                          null,
                        );
                        (0, _classPrivateFieldSet2['default'])(
                          this,
                          _mTransformer,
                          null,
                        );
                        (0, _classPrivateFieldSet2['default'])(
                          this,
                          _mLastPrevIndex,
                          0,
                        );
                        return _context.abrupt('return', this);

                      case 11:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
              );
            }),
          );

          function done() {
            return _done.apply(this, arguments);
          }

          return done;
        })(),
      },
      {
        key: 'getDatum',
        value: (function () {
          var _getDatum = (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee2(index) {
              var fetchedResult;
              var _this$mLastPrevIndex;
              var result;

              return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (
                          !(
                            (0, _classPrivateFieldGet2['default'])(
                              this,
                              _mParentSequence,
                            ) == null
                          )
                        ) {
                          _context2.next = 5;
                          break;
                        }

                        if (
                          index ==
                          (0, _classPrivateFieldGet2['default'])(
                            this,
                            _mInnerDataArray,
                          ).length -
                            1
                        )
                          (0, _classPrivateFieldSet2['default'])(
                            this,
                            _mIsFinished,
                            true,
                          );
                        return _context2.abrupt(
                          'return',
                          (0, _classPrivateFieldGet2['default'])(
                            this,
                            _mInnerDataArray,
                          )[index],
                        );

                      case 5:
                        _context2.next = 7;
                        return (0, _classPrivateFieldGet2['default'])(
                          this,
                          _mParentSequence,
                        ).getDatum(index);

                      case 7:
                        fetchedResult = _context2.sent;

                        if (!fetchedResult) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 11;
                        return (0, _classPrivateFieldGet2['default'])(
                          this,
                          _mTransformer,
                        )(
                          ((0, _classPrivateFieldSet2['default'])(
                            this,
                            _mLastPrevIndex,
                            (_this$mLastPrevIndex = +(0,
                            _classPrivateFieldGet2['default'])(
                              this,
                              _mLastPrevIndex,
                            )) + 1,
                          ),
                          _this$mLastPrevIndex),
                          fetchedResult,
                        );

                      case 11:
                        result = _context2.sent;
                        if (
                          (0, _classPrivateFieldGet2['default'])(
                            (0, _classPrivateFieldGet2['default'])(
                              this,
                              _mParentSequence,
                            ),
                            _mIsFinished,
                          )
                        )
                          (0, _classPrivateFieldSet2['default'])(
                            this,
                            _mIsFinished,
                            true,
                          );
                        if (result)
                          (0, _classPrivateFieldGet2['default'])(
                            this,
                            _mInnerDataArray,
                          ).push(result);
                        return _context2.abrupt('return', result);

                      case 15:
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

          function getDatum(_x) {
            return _getDatum.apply(this, arguments);
          }

          return getDatum;
        })(),
      },
      {
        key: 'chainSequence',
        value: function chainSequence(prevSequence, transformer) {
          (0, _classPrivateFieldSet2['default'])(
            prevSequence,
            _mIsFinished,
            false,
          );
          (0, _classPrivateFieldSet2['default'])(
            this,
            _mParentSequence,
            prevSequence,
          );
          (0, _classPrivateFieldSet2['default'])(
            this,
            _mTransformer,
            transformer,
          );
          return this;
        },
      },
    ],
    [
      {
        key: 'of',
        value: function of() {
          for (
            var _len = arguments.length,
              srcSequence = new Array(_len),
              _key = 0;
            _key < _len;
            _key++
          ) {
            srcSequence[_key] = arguments[_key];
          }

          return new Sequence(srcSequence);
        },
      },
      {
        key: 'from',
        value: function from() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          return new Sequence(srcSequence);
        },
      },
    ],
  );
  return Sequence;
})(_Symbol$iterator);

exports.Sequence = Sequence;

var KoconutSequence = (function (_KoconutCollection) {
  (0, _inherits2['default'])(KoconutSequence, _KoconutCollection);

  var _super = _createSuper(KoconutSequence);

  function KoconutSequence() {
    var _this;

    var srcSequence =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2['default'])(this, KoconutSequence);
    _this = _super.call(this);
    _this.data = new Sequence(srcSequence);
    return _this;
  }

  (0, _createClass2['default'])(
    KoconutSequence,
    [
      {
        key: 'onEach',
        value: function onEach(action) {
          var _this2 = this;

          var thisArg =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          action.bind(thisArg);
          var koconutToReturn = new KoconutSequence();
          koconutToReturn.setPrevYieldable(this).setProcessor(
            (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee4() {
                var continueProcess;
                return _regenerator['default'].wrap(function _callee4$(
                  _context4,
                ) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        continueProcess = true;
                        return _context4.abrupt(
                          'return',
                          new Sequence()['chainSequence'](
                            _this2.data,
                            (function () {
                              var _ref2 = (0, _asyncToGenerator2['default'])(
                                _regenerator['default'].mark(function _callee3(
                                  _,
                                  srcDatum,
                                ) {
                                  var signal;
                                  return _regenerator['default'].wrap(
                                    function _callee3$(_context3) {
                                      while (1) {
                                        switch (
                                          (_context3.prev = _context3.next)
                                        ) {
                                          case 0:
                                            if (!continueProcess) {
                                              _context3.next = 5;
                                              break;
                                            }

                                            _context3.next = 3;
                                            return action(srcDatum);

                                          case 3:
                                            signal = _context3.sent;
                                            if (
                                              signal == false ||
                                              signal ==
                                                _module.KoconutLoopSignal.BREAK
                                            )
                                              continueProcess = false;

                                          case 5:
                                            return _context3.abrupt(
                                              'return',
                                              srcDatum,
                                            );

                                          case 6:
                                          case 'end':
                                            return _context3.stop();
                                        }
                                      }
                                    },
                                    _callee3,
                                  );
                                }),
                              );

                              return function (_x2, _x3) {
                                return _ref2.apply(this, arguments);
                              };
                            })(),
                          ),
                        );

                      case 2:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee4);
              }),
            ),
          );
          return koconutToReturn;
        },
      },
      {
        key: 'onEachIndexed',
        value: function onEachIndexed(action) {
          var _this3 = this;

          var thisArg =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          action.bind(thisArg);
          var koconutToReturn = new KoconutSequence();
          koconutToReturn.setPrevYieldable(this).setProcessor(
            (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee6() {
                var continueProcess;
                return _regenerator['default'].wrap(function _callee6$(
                  _context6,
                ) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        continueProcess = true;
                        return _context6.abrupt(
                          'return',
                          new Sequence()['chainSequence'](
                            _this3.data,
                            (function () {
                              var _ref4 = (0, _asyncToGenerator2['default'])(
                                _regenerator['default'].mark(function _callee5(
                                  index,
                                  srcDatum,
                                ) {
                                  var signal;
                                  return _regenerator['default'].wrap(
                                    function _callee5$(_context5) {
                                      while (1) {
                                        switch (
                                          (_context5.prev = _context5.next)
                                        ) {
                                          case 0:
                                            if (!continueProcess) {
                                              _context5.next = 5;
                                              break;
                                            }

                                            _context5.next = 3;
                                            return action(index, srcDatum);

                                          case 3:
                                            signal = _context5.sent;
                                            if (
                                              signal == false ||
                                              signal ==
                                                _module.KoconutLoopSignal.BREAK
                                            )
                                              continueProcess = false;

                                          case 5:
                                            return _context5.abrupt(
                                              'return',
                                              srcDatum,
                                            );

                                          case 6:
                                          case 'end':
                                            return _context5.stop();
                                        }
                                      }
                                    },
                                    _callee5,
                                  );
                                }),
                              );

                              return function (_x4, _x5) {
                                return _ref4.apply(this, arguments);
                              };
                            })(),
                          ),
                        );

                      case 2:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                },
                _callee6);
              }),
            ),
          );
          return koconutToReturn;
        },
      },
      {
        key: 'filter',
        value: function filter(predicate) {
          var _this4 = this;

          var thisArg =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          predicate = predicate.bind(thisArg);
          var koconutToReturn = new KoconutSequence();
          koconutToReturn.setPrevYieldable(this).setProcessor(
            (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee8() {
                return _regenerator['default'].wrap(function _callee8$(
                  _context8,
                ) {
                  while (1) {
                    switch ((_context8.prev = _context8.next)) {
                      case 0:
                        return _context8.abrupt(
                          'return',
                          new Sequence()['chainSequence'](
                            _this4.data,
                            (function () {
                              var _ref6 = (0, _asyncToGenerator2['default'])(
                                _regenerator['default'].mark(function _callee7(
                                  _,
                                  srcDatum,
                                ) {
                                  return _regenerator['default'].wrap(
                                    function _callee7$(_context7) {
                                      while (1) {
                                        switch (
                                          (_context7.prev = _context7.next)
                                        ) {
                                          case 0:
                                            _context7.next = 2;
                                            return predicate(srcDatum);

                                          case 2:
                                            if (!_context7.sent) {
                                              _context7.next = 4;
                                              break;
                                            }

                                            return _context7.abrupt(
                                              'return',
                                              srcDatum,
                                            );

                                          case 4:
                                          case 'end':
                                            return _context7.stop();
                                        }
                                      }
                                    },
                                    _callee7,
                                  );
                                }),
                              );

                              return function (_x6, _x7) {
                                return _ref6.apply(this, arguments);
                              };
                            })(),
                          ),
                        );

                      case 1:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                },
                _callee8);
              }),
            ),
          );
          return koconutToReturn;
        },
      },
      {
        key: 'filterIndexed',
        value: function filterIndexed(predicate) {
          var _this5 = this;

          var thisArg =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          predicate = predicate.bind(thisArg);
          var koconutToReturn = new KoconutSequence();
          koconutToReturn.setPrevYieldable(this).setProcessor(
            (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee10() {
                return _regenerator['default'].wrap(function _callee10$(
                  _context10,
                ) {
                  while (1) {
                    switch ((_context10.prev = _context10.next)) {
                      case 0:
                        return _context10.abrupt(
                          'return',
                          new Sequence()['chainSequence'](
                            _this5.data,
                            (function () {
                              var _ref8 = (0, _asyncToGenerator2['default'])(
                                _regenerator['default'].mark(function _callee9(
                                  index,
                                  srcDatum,
                                ) {
                                  return _regenerator['default'].wrap(
                                    function _callee9$(_context9) {
                                      while (1) {
                                        switch (
                                          (_context9.prev = _context9.next)
                                        ) {
                                          case 0:
                                            _context9.next = 2;
                                            return predicate(index, srcDatum);

                                          case 2:
                                            if (!_context9.sent) {
                                              _context9.next = 4;
                                              break;
                                            }

                                            return _context9.abrupt(
                                              'return',
                                              srcDatum,
                                            );

                                          case 4:
                                          case 'end':
                                            return _context9.stop();
                                        }
                                      }
                                    },
                                    _callee9,
                                  );
                                }),
                              );

                              return function (_x8, _x9) {
                                return _ref8.apply(this, arguments);
                              };
                            })(),
                          ),
                        );

                      case 1:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                },
                _callee10);
              }),
            ),
          );
          return koconutToReturn;
        },
      },
    ],
    [
      {
        key: 'of',
        value: function of() {
          for (
            var _len2 = arguments.length,
              srcSequence = new Array(_len2),
              _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            srcSequence[_key2] = arguments[_key2];
          }

          return new KoconutSequence(srcSequence);
        },
      },
      {
        key: 'from',
        value: function from() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          return new KoconutSequence(srcSequence);
        },
      },
    ],
  );
  return KoconutSequence;
})(_module.KoconutCollection);

exports.KoconutSequence = KoconutSequence;
