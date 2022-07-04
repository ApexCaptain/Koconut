'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutPrimitive = void 0;

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

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty'),
);

var _module = require('../module');

('use strict');

var KoconutPrimitive = (function () {
  function KoconutPrimitive() {
    var data =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2['default'])(this, KoconutPrimitive);
    (0, _defineProperty2['default'])(this, 'data', void 0);
    (0, _defineProperty2['default'])(this, 'prevYieldable', void 0);
    (0, _defineProperty2['default'])(this, 'processor', void 0);
    (0, _defineProperty2['default'])(this, 'isValidated', false);
    this.data = data;
  }

  (0, _createClass2['default'])(KoconutPrimitive, [
    {
      key: 'setPrevYieldable',
      value: function setPrevYieldable(prevYieldable) {
        this.prevYieldable = prevYieldable;
        return this;
      },
    },
    {
      key: 'setProcessor',
      value: function setProcessor(processor) {
        this.processor = processor;
        return this;
      },
    },
    {
      key: 'validate',
      value: (function () {
        var _validate = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee(data) {
            return _regenerator['default'].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        function validate(_x) {
          return _validate.apply(this, arguments);
        }

        return validate;
      })(),
    },
    {
      key: 'process',
      value: (function () {
        var _process = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee2() {
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (!(this.prevYieldable != null)) {
                        _context2.next = 7;
                        break;
                      }

                      _context2.next = 3;
                      return this.prevYieldable['yield']();

                    case 3:
                      this.data = _context2.sent;

                      if (
                        !(
                          !(this instanceof _module.KoconutSequence) &&
                          this.data instanceof _module.Sequence
                        )
                      ) {
                        _context2.next = 7;
                        break;
                      }

                      _context2.next = 7;
                      return this.data.done();

                    case 7:
                      if (!(this.processor != null)) {
                        _context2.next = 11;
                        break;
                      }

                      _context2.next = 10;
                      return this.processor();

                    case 10:
                      this.data = _context2.sent;

                    case 11:
                      if (this.isValidated) {
                        _context2.next = 15;
                        break;
                      }

                      _context2.next = 14;
                      return this.validate(this.data);

                    case 14:
                      this.isValidated = true;

                    case 15:
                      delete this.prevYieldable;
                      delete this.processor;

                    case 17:
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

        function process() {
          return _process.apply(this, arguments);
        }

        return process;
      })(),
    },
    {
      key: 'retrieve',
      value: (function () {
        var _retrieve = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee3() {
            return _regenerator['default'].wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.next = 2;
                      return this.process();

                    case 2:
                      return _context3.abrupt('return', this);

                    case 3:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
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
      key: 'yield',
      value: (function () {
        var _yield2 = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee4() {
            return _regenerator['default'].wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.next = 2;
                      return this.process();

                    case 2:
                      return _context4.abrupt('return', this.data);

                    case 3:
                    case 'end':
                      return _context4.stop();
                  }
                }
              },
              _callee4,
              this,
            );
          }),
        );

        function _yield() {
          return _yield2.apply(this, arguments);
        }

        return _yield;
      })(),
    },
    {
      key: 'let',
      value: (function () {
        var _let2 = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee5(block) {
            return _regenerator['default'].wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.t0 = block;
                      _context5.next = 3;
                      return this['yield']();

                    case 3:
                      _context5.t1 = _context5.sent;
                      _context5.next = 6;
                      return (0, _context5.t0)(_context5.t1);

                    case 6:
                      return _context5.abrupt('return', _context5.sent);

                    case 7:
                    case 'end':
                      return _context5.stop();
                  }
                }
              },
              _callee5,
              this,
            );
          }),
        );

        function _let(_x2) {
          return _let2.apply(this, arguments);
        }

        return _let;
      })(),
    },
    {
      key: 'also',
      value: (function () {
        var _also = (0, _asyncToGenerator2['default'])(
          _regenerator['default'].mark(function _callee6(block) {
            return _regenerator['default'].wrap(
              function _callee6$(_context6) {
                while (1) {
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.t0 = block;
                      _context6.next = 3;
                      return this['yield']();

                    case 3:
                      _context6.t1 = _context6.sent;
                      _context6.next = 6;
                      return (0, _context6.t0)(_context6.t1);

                    case 6:
                      return _context6.abrupt('return', this.data);

                    case 7:
                    case 'end':
                      return _context6.stop();
                  }
                }
              },
              _callee6,
              this,
            );
          }),
        );

        function also(_x3) {
          return _also.apply(this, arguments);
        }

        return also;
      })(),
    },
  ]);
  return KoconutPrimitive;
})();

exports.KoconutPrimitive = KoconutPrimitive;
