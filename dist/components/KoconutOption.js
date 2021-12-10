'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutOption = void 0;

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

var KoconutOption = (function () {
  function KoconutOption() {
    (0, _classCallCheck2['default'])(this, KoconutOption);
  }

  (0, _createClass2['default'])(KoconutOption, null, [
    {
      key: 'locale',
      get: function get() {
        if (this._locale == null)
          this._locale = _module.KoconutLocale.fromString(
            new Intl.DateTimeFormat().resolvedOptions().locale,
          );
        return this._locale;
      },
      set: function set(locale) {
        this._locale = locale;
      },
    },
  ]);
  return KoconutOption;
})();

exports.KoconutOption = KoconutOption;
(0, _defineProperty2['default'])(
  KoconutOption,
  'isDeprecationWarningEnabled',
  true,
);
(0, _defineProperty2['default'])(
  KoconutOption,
  'doesDeprecationWarningShowCallStack',
  true,
);
(0, _defineProperty2['default'])(KoconutOption, '_locale', void 0);
