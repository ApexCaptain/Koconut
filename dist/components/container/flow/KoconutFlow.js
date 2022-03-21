'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutFlow = exports.Flow = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
);

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray'),
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

var _module = require('../../../module');

var _events = require('events');

var _Symbol$iterator;

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

_Symbol$iterator = Symbol.iterator;

var Flow = (function (_EventEmitter) {
  (0, _inherits2['default'])(Flow, _EventEmitter);

  var _super = _createSuper(Flow);

  function Flow() {
    var _this;

    var srcSequence =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2['default'])(this, Flow);
    _this = _super.call(this);
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'mPentDataSize',
      0,
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'mChainedFlow',
      null,
    );
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this),
      'mInnerDataMap',
      new Map(),
    );

    if (srcSequence != null) {
      var _iterator = _createForOfIteratorHelper(srcSequence);
      var _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var eachDatum = _step.value;
          _this.mPentDataSize++;
          if (eachDatum instanceof _module.Entry)
            _this.mInnerDataMap.set(eachDatum.key, eachDatum.value);
          else if (eachDatum instanceof _module.Pair)
            _this.mInnerDataMap.set(eachDatum.first, eachDatum.second);
          else _this.mInnerDataMap.set(eachDatum[0], eachDatum[1]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return _this;
  }

  (0, _createClass2['default'])(
    Flow,
    [
      {
        key: _Symbol$iterator,
        value: function value() {
          return this.dataEntries[Symbol.iterator]();
        },
      },
      {
        key: 'sort',
        value: function sort() {
          this.mInnerDataMap = new Map(
            (0, _toConsumableArray2['default'])(
              this.mInnerDataMap.entries(),
            ).sort(),
          );
          return this;
        },
      },
      {
        key: 'dataArray',
        get: function get() {
          return Array.from(this.sort().mInnerDataMap.entries()).map(function (
            eachIterableEntry,
          ) {
            return eachIterableEntry[1];
          });
        },
      },
      {
        key: 'dataEntries',
        get: function get() {
          return Array.from(this.sort().mInnerDataMap.entries()).map(function (
            eachIterableEntry,
          ) {
            return new _module.Entry(
              eachIterableEntry[0],
              eachIterableEntry[1],
            );
          });
        },
      },
      {
        key: 'setDatum',
        value: function setDatum(id, datum) {
          this.mInnerDataMap.set(id, datum);
          this.emit(Flow.newDatumInsertedEvent, id, datum);
        },
      },
      {
        key: 'onNewDatumInserted',
        value: function onNewDatumInserted(onNewDatumInsertedListener) {
          var _this2 = this;

          var targetFlow =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          var count = 0;
          this.mChainedFlow = targetFlow;

          var mediatedListener = (function () {
            var _ref = (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee(id, datum) {
                return _regenerator['default'].wrap(function _callee$(
                  _context,
                ) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        _context.next = 2;
                        return onNewDatumInsertedListener(id, datum);

                      case 2:
                        if (_this2.mPentDataSize - 1 == count++) {
                          _this2.emit(Flow.dataScanningCompletedEvent);

                          if (targetFlow != null) {
                            targetFlow.mPentDataSize =
                              targetFlow.mInnerDataMap.size;
                            if (targetFlow.mChainedFlow == null)
                              targetFlow.emit(Flow.dataScanningCompletedEvent);
                          }
                        }

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee);
              }),
            );

            return function mediatedListener(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          })();

          this.on(Flow.newDatumInsertedEvent, mediatedListener);
          this.once(Flow.dataScanningCompletedEvent, function () {
            return _this2.removeListener(
              Flow.newDatumInsertedEvent,
              mediatedListener,
            );
          });
          if (this.mInnerDataMap.size != 0)
            this.mInnerDataMap.forEach(function (datum, id) {
              return _this2.emit(Flow.newDatumInsertedEvent, id, datum);
            });
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

          return new Flow(srcSequence);
        },
      },
      {
        key: 'from',
        value: function from() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          return new Flow(srcSequence);
        },
      },
      {
        key: 'ofSimple',
        value: function ofSimple() {
          for (
            var _len2 = arguments.length,
              srcSequence = new Array(_len2),
              _key2 = 0;
            _key2 < _len2;
            _key2++
          ) {
            srcSequence[_key2] = arguments[_key2];
          }

          return new Flow(
            srcSequence.map(function (eachDatum, eachIndex) {
              return new _module.Entry(eachIndex, eachDatum);
            }),
          );
        },
      },
      {
        key: 'fromSimple',
        value: function fromSimple() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          if (srcSequence != null)
            return new Flow(
              Array.from(srcSequence).map(function (eachDatum, eachIndex) {
                return new _module.Entry(eachIndex, eachDatum);
              }),
            );
          else return new Flow();
        },
      },
    ],
  );
  return Flow;
})(_events.EventEmitter);

exports.Flow = Flow;
(0, _defineProperty2['default'])(
  Flow,
  'newDatumInsertedEvent',
  'newDatumInserted',
);
(0, _defineProperty2['default'])(
  Flow,
  'dataScanningCompletedEvent',
  'dataScanningCompleted',
);

var KoconutFlow = (function (_KoconutIterable) {
  (0, _inherits2['default'])(KoconutFlow, _KoconutIterable);

  var _super2 = _createSuper(KoconutFlow);

  function KoconutFlow() {
    var _this3;

    var srcSequence =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2['default'])(this, KoconutFlow);
    _this3 = _super2.call(this);
    (0, _defineProperty2['default'])(
      (0, _assertThisInitialized2['default'])(_this3),
      'mIsChained',
      false,
    );
    _this3.data = new Flow(srcSequence);
    return _this3;
  }

  (0, _createClass2['default'])(
    KoconutFlow,
    [
      {
        key: 'validate',
        value: (function () {
          var _validate = (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee2(data) {
              return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (data != null) {
                          this.combinedDataWrapper = data;
                        }

                      case 1:
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

          function validate(_x3) {
            return _validate.apply(this, arguments);
          }

          return validate;
        })(),
      },
      {
        key: 'mapFlow',
        value: function mapFlow(transform) {
          var _this4 = this;

          var thisArg =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : null;
          this.mIsChained = true;
          transform = transform.bind(thisArg);
          var koconutToReturn = new KoconutFlow();
          koconutToReturn.setPrevYieldable(this).setProcessor(
            (0, _asyncToGenerator2['default'])(
              _regenerator['default'].mark(function _callee4() {
                var processedFlow;
                return _regenerator['default'].wrap(function _callee4$(
                  _context4,
                ) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        processedFlow = new Flow();

                        if (_this4.data != null) {
                          _this4.data['onNewDatumInserted'](
                            (function () {
                              var _ref3 = (0, _asyncToGenerator2['default'])(
                                _regenerator['default'].mark(function _callee3(
                                  id,
                                  datum,
                                ) {
                                  return _regenerator['default'].wrap(
                                    function _callee3$(_context3) {
                                      while (1) {
                                        switch (
                                          (_context3.prev = _context3.next)
                                        ) {
                                          case 0:
                                            _context3.t0 = processedFlow;
                                            _context3.t1 = id;
                                            _context3.next = 4;
                                            return transform(datum);

                                          case 4:
                                            _context3.t2 = _context3.sent;
                                            return _context3.abrupt(
                                              'return',
                                              _context3.t0['setDatum'].call(
                                                _context3.t0,
                                                _context3.t1,
                                                _context3.t2,
                                              ),
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

                              return function (_x4, _x5) {
                                return _ref3.apply(this, arguments);
                              };
                            })(),
                            processedFlow,
                          );
                        } else
                          processedFlow.emit(
                            Flow['dataScanningCompletedEvent'],
                          );

                        return _context4.abrupt('return', processedFlow);

                      case 3:
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
        key: 'yield',
        value: (function () {
          var _yield2 = (0, _asyncToGenerator2['default'])(
            _regenerator['default'].mark(function _callee6() {
              var _this5 = this;

              return _regenerator['default'].wrap(function _callee6$(
                _context6,
              ) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      return _context6.abrupt(
                        'return',
                        new Promise(
                          (function () {
                            var _ref4 = (0, _asyncToGenerator2['default'])(
                              _regenerator['default'].mark(function _callee5(
                                resolve,
                              ) {
                                return _regenerator['default'].wrap(
                                  function _callee5$(_context5) {
                                    while (1) {
                                      switch (
                                        (_context5.prev = _context5.next)
                                      ) {
                                        case 0:
                                          _context5.next = 2;
                                          return _this5.process();

                                        case 2:
                                          if (_this5.mIsChained)
                                            resolve(_this5.data);
                                          else {
                                            if (_this5.processor == null)
                                              resolve(_this5.data['sort']());
                                            else
                                              _this5.data.once(
                                                Flow[
                                                  'dataScanningCompletedEvent'
                                                ],
                                                function () {
                                                  resolve(
                                                    _this5.data['sort'](),
                                                  );
                                                },
                                              );
                                          }

                                        case 3:
                                        case 'end':
                                          return _context5.stop();
                                      }
                                    }
                                  },
                                  _callee5,
                                );
                              }),
                            );

                            return function (_x6) {
                              return _ref4.apply(this, arguments);
                            };
                          })(),
                        ),
                      );

                    case 1:
                    case 'end':
                      return _context6.stop();
                  }
                }
              },
              _callee6);
            }),
          );

          function _yield() {
            return _yield2.apply(this, arguments);
          }

          return _yield;
        })(),
      },
    ],
    [
      {
        key: 'from',
        value: function from() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          return new KoconutFlow(srcSequence);
        },
      },
      {
        key: 'of',
        value: function of() {
          for (
            var _len3 = arguments.length,
              srcSequence = new Array(_len3),
              _key3 = 0;
            _key3 < _len3;
            _key3++
          ) {
            srcSequence[_key3] = arguments[_key3];
          }

          return new KoconutFlow(srcSequence);
        },
      },
      {
        key: 'fromSimple',
        value: function fromSimple() {
          var srcSequence =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : null;
          return new KoconutFlow(Flow.fromSimple(srcSequence));
        },
      },
      {
        key: 'ofSimple',
        value: function ofSimple() {
          return new KoconutFlow(Flow.ofSimple.apply(Flow, arguments));
        },
      },
    ],
  );
  return KoconutFlow;
})(_module.KoconutIterable);

exports.KoconutFlow = KoconutFlow;
