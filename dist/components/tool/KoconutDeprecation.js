'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutDeprecation =
  exports.FontStyle =
  exports.FontBackgroundColour =
    void 0;

var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray'),
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

var _module = require('../../module');

var _fs = require('fs');

var FontStyle;
exports.FontStyle = FontStyle;

(function (FontStyle) {
  FontStyle['Reset'] = '\x1B[0m';
  FontStyle['Bright'] = '\x1B[1m';
  FontStyle['Dim'] = '\x1B[2m';
  FontStyle['Underscore'] = '\x1B[4m';
  FontStyle['Blink'] = '\x1B[5m';
  FontStyle['Reverse'] = '\x1B[7m';
  FontStyle['Hidden'] = '\x1B[8m';
})(FontStyle || (exports.FontStyle = FontStyle = {}));

var FontTextColour;

(function (FontTextColour) {
  FontTextColour['Black'] = '\x1B[30m';
  FontTextColour['Red'] = '\x1B[31m';
  FontTextColour['Green'] = '\x1B[32m';
  FontTextColour['Yellow'] = '\x1B[33m';
  FontTextColour['Blue'] = '\x1B[34m';
  FontTextColour['Magenta'] = '\x1B[35m';
  FontTextColour['Cyan'] = '\x1B[36m';
  FontTextColour['White'] = '\x1B[37m';
})(FontTextColour || (FontTextColour = {}));

var FontBackgroundColour;
exports.FontBackgroundColour = FontBackgroundColour;

(function (FontBackgroundColour) {
  FontBackgroundColour['Black'] = '\x1B[40m';
  FontBackgroundColour['Red'] = '\x1B[41m';
  FontBackgroundColour['Green'] = '\x1B[42m';
  FontBackgroundColour['Yellow'] = '\x1B[43m';
  FontBackgroundColour['Blue'] = '\x1B[44m';
  FontBackgroundColour['Magenta'] = '\x1B[45m';
  FontBackgroundColour['Cyan'] = '\x1B[46m';
  FontBackgroundColour['White'] = '\x1B[47m';
})(
  FontBackgroundColour ||
    (exports.FontBackgroundColour = FontBackgroundColour = {}),
);

var deprecationWarningGenerators = {
  english: function english(
    className,
    methodName,
    deprecationVersion,
    alternativeMethodName,
  ) {
    return (
      ''
        .concat(FontTextColour.Yellow, '[Deprecation Warning] ')
        .concat(FontStyle.Reset, ': ') +
      'Method named '
        .concat(FontTextColour.Cyan, "'")
        .concat(methodName, "' ")
        .concat(FontStyle.Reset, 'of ')
        .concat(FontTextColour.Magenta, "'")
        .concat(className, "' ")
        .concat(FontStyle.Reset, 'class would be ')
        .concat(FontTextColour.Yellow, 'Deprecated')
        .concat(FontStyle.Reset, ' ') +
      ''.concat(
        deprecationVersion
          ? 'since Version : '
              .concat(FontTextColour.Cyan, "'")
              .concat(deprecationVersion, "'")
              .concat(FontStyle.Reset, '.')
          : 'in the future.',
      ) +
      ''.concat(
        alternativeMethodName
          ? '\n                        You can use '
              .concat(FontTextColour.Cyan, "'")
              .concat(alternativeMethodName, "' ")
              .concat(FontStyle.Reset, 'method alternatively.')
          : '',
      )
    );
  },
  japanese: function japanese(
    className,
    methodName,
    deprecationVersion,
    alternativeMethodName,
  ) {
    return (
      ''
        .concat(
          FontTextColour.Yellow,
          '[\u975E\u63A8\u5968\u306E\u8B66\u544A] ',
        )
        .concat(FontStyle.Reset, ': ') +
      ''
        .concat(FontTextColour.Magenta, "'")
        .concat(className, "'")
        .concat(FontStyle.Reset, '\u30AF\u30E9\u30B9\u306E')
        .concat(FontTextColour.Cyan, "'")
        .concat(methodName, "'")
        .concat(FontStyle.Reset, '\u30E1\u30BD\u30C3\u30C9\u306F') +
      ''
        .concat(
          deprecationVersion
            ? ''
                .concat(FontTextColour.Cyan, "'")
                .concat(deprecationVersion, "'")
                .concat(
                  FontStyle.Reset,
                  '\u30D0\u30FC\u30B8\u30E7\u30F3\u304B\u3089',
                )
            : ' \u5411\u5F8C',
          '\u30B5\u30DD\u30FC\u30C8\u304C',
        )
        .concat(FontTextColour.Yellow, '\u4E2D\u6B62')
        .concat(
          FontStyle.Reset,
          '\u3055\u308C\u308B\u4E88\u5B9A\u3067\u3059\u3002',
        ) +
      ''.concat(
        alternativeMethodName
          ? '\n                 \u305D\u306E\u6A5F\u80FD\u306F'
              .concat(FontTextColour.Cyan, "'")
              .concat(alternativeMethodName, "'")
              .concat(
                FontStyle.Reset,
                '\u30E1\u30BD\u30C3\u30C9\u306B\u7F6E\u63DB\u3048\u3066\u4F7F\u7528\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002',
              )
          : '',
      )
    );
  },
  korean: function korean(
    className,
    methodName,
    deprecationVersion,
    alternativeMethodName,
  ) {
    return (
      ''
        .concat(
          FontTextColour.Yellow,
          '[\uC9C0\uC6D0 \uC911\uB2E8 \uACBD\uACE0] ',
        )
        .concat(FontStyle.Reset, ': ') +
      ''
        .concat(FontTextColour.Magenta, "'")
        .concat(className, "' ")
        .concat(FontStyle.Reset, '\uD074\uB798\uC2A4\uC758 ')
        .concat(FontTextColour.Cyan, "'")
        .concat(methodName, "' ")
        .concat(FontStyle.Reset, '\uBA54\uC18C\uB4DC\uB294') +
      ''
        .concat(
          deprecationVersion
            ? ' '
                .concat(FontTextColour.Cyan, "'")
                .concat(deprecationVersion, "' ")
                .concat(FontStyle.Reset, '\uBC84\uC804\uBD80\uD130')
            : ' \uD5A5\uD6C4',
          ' \uC9C0\uC6D0\uC774 ',
        )
        .concat(FontTextColour.Yellow, '\uC911\uB2E8')
        .concat(FontStyle.Reset, ' \uB420 \uC608\uC815\uC785\uB2C8\uB2E4.') +
      ''.concat(
        alternativeMethodName
          ? '\n                   \uD574\uB2F9 \uAE30\uB2A5\uC740 '
              .concat(FontTextColour.Cyan, "'")
              .concat(alternativeMethodName, "'")
              .concat(
                FontStyle.Reset,
                ' \uBA54\uC18C\uB4DC\uB85C \uB300\uCCB4\uD558\uC5EC \uC0AC\uC6A9\uD558\uB294 \uAC83\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4.',
              )
          : '',
      )
    );
  },
};
var deprecationWarningLocale = {
  en: deprecationWarningGenerators.english,
  'en-AU': deprecationWarningGenerators.english,
  'en-BZ': deprecationWarningGenerators.english,
  'en-CA': deprecationWarningGenerators.english,
  'en-CB': deprecationWarningGenerators.english,
  'en-GB': deprecationWarningGenerators.english,
  'en-IE': deprecationWarningGenerators.english,
  'en-JM': deprecationWarningGenerators.english,
  'en-NZ': deprecationWarningGenerators.english,
  'en-PH': deprecationWarningGenerators.english,
  'en-TT': deprecationWarningGenerators.english,
  'en-US': deprecationWarningGenerators.english,
  'en-ZA': deprecationWarningGenerators.english,
  'en-ZW': deprecationWarningGenerators.english,
  ja: deprecationWarningGenerators.japanese,
  'ja-JP': deprecationWarningGenerators.japanese,
  ko: deprecationWarningGenerators.korean,
  'ko-KR': deprecationWarningGenerators.korean,
};

var KoconutDeprecation = (function () {
  function KoconutDeprecation() {
    (0, _classCallCheck2['default'])(this, KoconutDeprecation);
  }

  (0, _createClass2['default'])(KoconutDeprecation, null, [
    {
      key: 'showDeprecationWarning',
      value: function showDeprecationWarning() {
        var deprecationVersion =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;
        var alternative =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : null;

        if (_module.KoconutOption.isDeprecationWarningEnabled) {
          var _Error$stack;

          var callStack =
            (_Error$stack = new Error().stack) === null ||
            _Error$stack === void 0
              ? void 0
              : _Error$stack.split('\n').slice(2, 8);

          var _trim$split$1$split = callStack
            .shift()
            .trim()
            .split(' ')[1]
            .split('.');
          var _trim$split$1$split2 = (0, _slicedToArray2['default'])(
            _trim$split$1$split,
            2,
          );
          var className = _trim$split$1$split2[0];
          var methodName = _trim$split$1$split2[1];

          var warningString = deprecationWarningLocale[
            _module.KoconutOption.locale
          ](
            className,
            methodName,
            deprecationVersion,
            alternative === null || alternative === void 0
              ? void 0
              : alternative.name,
          );

          if (_module.KoconutOption.doesDeprecationWarningShowCallStack)
            warningString += '\n'
              .concat(FontTextColour.Green)
              .concat(
                callStack === null || callStack === void 0
                  ? void 0
                  : callStack.join('\n'),
                '\n',
              )
              .concat(FontStyle.Reset);
          console.warn(warningString);

          if (this.isRunningOnDevUnitTesting) {
            try {
              var stringToAdd = ''
                .concat(className, '/')
                .concat(methodName, '/')
                .concat(deprecationVersion);
              if (!(0, _fs.existsSync)(this.devDeprecationListTmpDirPath))
                (0, _fs.mkdirSync)(this.devDeprecationListTmpDirPath);
              if (!(0, _fs.existsSync)(this.devDeprecationListTmpFilePath))
                (0, _fs.writeFileSync)(this.devDeprecationListTmpFilePath, '');
              if (!this.devDeprecationListSet)
                this.devDeprecationListSet = new Set(
                  (0, _fs.readFileSync)(
                    this.devDeprecationListTmpFilePath,
                    'utf-8',
                  ).split('\n'),
                );

              if (!this.devDeprecationListSet.has(stringToAdd)) {
                this.devDeprecationListSet.add(stringToAdd);
                (0, _fs.appendFileSync)(
                  this.devDeprecationListTmpFilePath,
                  '\n'.concat(stringToAdd),
                );
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
      },
    },
  ]);
  return KoconutDeprecation;
})();

exports.KoconutDeprecation = KoconutDeprecation;
(0, _defineProperty2['default'])(
  KoconutDeprecation,
  'isRunningOnDevUnitTesting',
  false,
);
(0, _defineProperty2['default'])(
  KoconutDeprecation,
  'devDeprecationListSet',
  void 0,
);
(0, _defineProperty2['default'])(
  KoconutDeprecation,
  'devDeprecationListTmpDirPath',
  './log',
);
(0, _defineProperty2['default'])(
  KoconutDeprecation,
  'devDeprecationListTmpFilePath',
  ''.concat(
    KoconutDeprecation.devDeprecationListTmpDirPath,
    '/DevDeprecationList.tmp',
  ),
);
