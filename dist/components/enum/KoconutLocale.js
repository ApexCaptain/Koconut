"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutLocale = void 0;
"use strict";

var KoconutLocale;
exports.KoconutLocale = KoconutLocale;

(function (KoconutLocale) {
  KoconutLocale["en"] = "en";
  KoconutLocale["en-AU"] = "en-AU";
  KoconutLocale["en-BZ"] = "en-BZ";
  KoconutLocale["en-CA"] = "en-CA";
  KoconutLocale["en-CB"] = "en-CB";
  KoconutLocale["en-GB"] = "en-GB";
  KoconutLocale["en-IE"] = "en-IE";
  KoconutLocale["en-JM"] = "en-JM";
  KoconutLocale["en-NZ"] = "en-NZ";
  KoconutLocale["en-PH"] = "en-PH";
  KoconutLocale["en-TT"] = "en-TT";
  KoconutLocale["en-US"] = "en-US";
  KoconutLocale["en-ZA"] = "en-ZA";
  KoconutLocale["en-ZW"] = "en-ZW";
  KoconutLocale["ja"] = "ja";
  KoconutLocale["ja-JP"] = "ja-JP";
  KoconutLocale["ko"] = "ko";
  KoconutLocale["ko-KR"] = "ko-KR";
})(KoconutLocale || (exports.KoconutLocale = KoconutLocale = {}));

var localeNames = Object.values(KoconutLocale);
var upperCaseLocaleNames = localeNames.map(function (eachName) {
  return eachName.toString().toUpperCase();
});

(function (_KoconutLocale) {
  function fromString(localeString) {
    return upperCaseLocaleNames.includes(localeString.toUpperCase()) ? localeNames[upperCaseLocaleNames.indexOf(localeString.toUpperCase())] : KoconutLocale["en-US"];
  }

  _KoconutLocale.fromString = fromString;
})(KoconutLocale || (exports.KoconutLocale = KoconutLocale = {}));