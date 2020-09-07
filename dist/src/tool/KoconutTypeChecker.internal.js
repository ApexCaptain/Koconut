"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoconutTypeChecker = void 0;
exports.KoconutTypeChecker = {
    checkIsComparable: function (target) {
        if (target && target.compareTo && typeof (target.compareTo) === 'function')
            return true;
        else
            return false;
    },
    checkIsEquatable: function (target) {
        if (target && target.equalsTo && typeof (target.equalsTo) === 'function')
            return true;
        else
            return false;
    }
};
