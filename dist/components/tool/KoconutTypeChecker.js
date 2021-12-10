'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KoconutTypeChecker = void 0;
var KoconutTypeChecker = {
  checkIsComparable: function checkIsComparable(target) {
    if (target && target.compareTo && typeof target.compareTo === 'function')
      return true;
    else return false;
  },
  checkIsEquatable: function checkIsEquatable(target) {
    if (target && target.equalsTo && typeof target.equalsTo === 'function')
      return true;
    else return false;
  },
};
exports.KoconutTypeChecker = KoconutTypeChecker;
