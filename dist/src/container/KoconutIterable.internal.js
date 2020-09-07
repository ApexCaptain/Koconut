"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoconutIterable = void 0;
const module_internal_1 = require("../../module.internal");
class KoconutIterable extends module_internal_1.KoconutPrimitive {
    constructor() {
        super(...arguments);
        this.combinedDataWrapper = null;
    }
    all(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.combinedDataWrapper == null)
                return false;
            for (const eachCombinedData of this.combinedDataWrapper)
                if (!(yield predicate(eachCombinedData)))
                    return false;
            return true;
        }));
        return koconutToReturn;
    }
    any(predicate, thisArg = null) {
        predicate = predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.combinedDataWrapper == null)
                return false;
            for (const eachCombinedData of this.combinedDataWrapper)
                if (yield predicate(eachCombinedData))
                    return true;
            return false;
        }));
        return koconutToReturn;
    }
    asIterable() {
        return this;
    }
    // asSequence
    count(predicate = null, thisArg = null) {
        if (predicate)
            predicate.bind(thisArg);
        const koconutToReturn = new module_internal_1.KoconutPrimitive();
        koconutToReturn
            .setPrevYieldable(this)
            .setProcessor(() => __awaiter(this, void 0, void 0, function* () {
            if (this.combinedDataWrapper == null)
                return 0;
            let count = 0;
            for (const eachCombinedData of this.combinedDataWrapper) {
                if (!predicate)
                    count++;
                else if (yield predicate(eachCombinedData))
                    count++;
            }
            return count;
        }));
        return koconutToReturn;
    }
}
exports.KoconutIterable = KoconutIterable;
