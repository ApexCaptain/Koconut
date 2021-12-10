`use strict`;
// http://www.lingoes.net/en/translator/langcode.htm
export enum KoconutLocale {
  // English
  en = 'en', // English
  en_AU = 'en-AU', // Australia
  en_BZ = 'en-BZ', // Belize
  en_CA = 'en-CA', // Canada
  en_CB = 'en-CB', // Caribbean
  en_GB = 'en-GB', // United Kingdom
  en_IE = 'en-IE', // Ireland
  en_JM = 'en-JM', // Jamaica
  en_NZ = 'en-NZ', // New Zealand
  en_PH = 'en-PH', // Republic of the Philippines
  en_TT = 'en-TT', // Trinidad and Tobago
  en_US = 'en-US', // United States
  en_ZA = 'en-ZA', // South Africa
  en_ZW = 'en-ZW', // Zimbabwe

  // Japanese
  ja = 'ja', // Japanese,
  ja_JP = 'ja-JP', // Japan

  // Korean
  ko = 'ko', // Korean
  ko_KR = 'ko-KR', // Korea
}
const localeNames = Object.values(KoconutLocale);
const upperCaseLocaleNames = localeNames.map((eachName) =>
  eachName.toString().toUpperCase(),
);
export namespace KoconutLocale {
  export function fromString(localeString: string): KoconutLocale {
    return upperCaseLocaleNames.includes(localeString.toUpperCase())
      ? (localeNames[
          upperCaseLocaleNames.indexOf(localeString.toUpperCase())
        ] as KoconutLocale)
      : KoconutLocale.en_US;
  }
}
