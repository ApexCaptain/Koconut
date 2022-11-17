'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutEntry = exports.Entry = void 0;
var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator'),
);
var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator'),
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
var Entry = (function () {
  function Entry(keyElement, valueElement) {
    (0, _classCallCheck2['default'])(this, Entry);
    this.keyElement = keyElement;
    this.valueElement = valueElement;
  }

  (0, _createClass2['default'])(
    Entry,
    [
      {
        key: 'key',
        get: function get() {
          return this.keyElement;
        },
      },
      {
        key: 'value',
        get: function get() {
          return this.valueElement;
        },
      },
      {
        key: 'toString',
        value: function toString() {
          return JSON.stringify({
            keyElement: this.key,
            valueElement: this.valueElement,
          });
        },
      },
      {
        key: 'toArray',
        value: function toArray() {
          return [this.key, this.value];
        },
      },
      {
        key: 'toPair',
        value: function toPair() {
          return new _module.Pair(this.key, this.value);
        },
      },
      {
        key: 'equalsTo',
        value: function equalsTo(other) {
          if (
            _module.KoconutTypeChecker.checkIsEquatable(this.key) &&
            _module.KoconutTypeChecker.checkIsEquatable(other.key)
          ) {
            var equalityResult = this.key.equalsTo(other.key);
            if (equalityResult instanceof _module.KoconutBoolean)
              return _module.KoconutBoolean['fromPrimitive'](equalityResult);
            else return equalityResult;
          } else return this.key == other.key;
        },
      },
    ],
    [
      {
        key: 'from',
        value: function from(entry) {
          return new Entry(entry[0], entry[1]);
        },
      },
    ],
  );
  return Entry;
})();
exports.Entry = Entry;
var KoconutEntry = (function (_ref) {
  (0, _inherits2['default'])(KoconutEntry, _ref);
  var _super = _createSuper(KoconutEntry);
  function KoconutEntry() {
    var _this;
    var key =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0, _classCallCheck2['default'])(this, KoconutEntry);
    if (key != null && value != null)
      _this = _super.call(this, new Entry(key, value));
    else _this = _super.call(this);
    return (0, _possibleConstructorReturn2['default'])(_this);
  }

  (0, _createClass2['default'])(KoconutEntry, [
    {
      key: 'retrieve',
      value: (function () {
        var _retrieve = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee() {
            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2;
                      return (0, _get2['default'])(
                        (0, _getPrototypeOf2['default'])(
                          KoconutEntry.prototype,
                        ),
                        'retrieve',
                        this,
                      ).call(this);
                    case 2:
                      return _context.abrupt('return', this);
                    case 3:
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
  return KoconutEntry;
})(_module.KoconutPrimitive);
exports.KoconutEntry = KoconutEntry;
