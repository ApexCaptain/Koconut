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
  KoconutLocale["en_AU"] = "en-AU";
  KoconutLocale["en_BZ"] = "en-BZ";
  KoconutLocale["en_CA"] = "en-CA";
  KoconutLocale["en_CB"] = "en-CB";
  KoconutLocale["en_GB"] = "en-GB";
  KoconutLocale["en_IE"] = "en-IE";
  KoconutLocale["en_JM"] = "en-JM";
  KoconutLocale["en_NZ"] = "en-NZ";
  KoconutLocale["en_PH"] = "en-PH";
  KoconutLocale["en_TT"] = "en-TT";
  KoconutLocale["en_US"] = "en-US";
  KoconutLocale["en_ZA"] = "en-ZA";
  KoconutLocale["en_ZW"] = "en-ZW";
  KoconutLocale["ja"] = "ja";
  KoconutLocale["ja_JP"] = "ja-JP";
  KoconutLocale["ko"] = "ko";
  KoconutLocale["ko_KR"] = "ko-KR";
})(KoconutLocale || (exports.KoconutLocale = KoconutLocale = {}));
var localeNames = Object.values(KoconutLocale);
var upperCaseLocaleNames = localeNames.map(function (eachName) {
  return eachName.toString().toUpperCase();
});
(function (_KoconutLocale) {
  function fromString(localeString) {
    return upperCaseLocaleNames.includes(localeString.toUpperCase()) ? localeNames[upperCaseLocaleNames.indexOf(localeString.toUpperCase())] : KoconutLocale.en_US;
  }
  _KoconutLocale.fromString = fromString;
})(KoconutLocale || (exports.KoconutLocale = KoconutLocale = {}));