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
exports.KoconutPrimitive = void 0;
`use strict`;
class KoconutPrimitive {
    constructor(data = null) {
        this.isValidated = false;
        this.data = data;
    }
    setPrevYieldable(prevYieldable) {
        this.prevYieldable = prevYieldable;
        return this;
    }
    setProcessor(processor) {
        this.processor = processor;
        return this;
    }
    validiate(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prevYieldable != null)
                this.data = yield this.prevYieldable.yield();
            if (this.processor != null)
                this.data = yield this.processor();
            if (!this.isValidated) {
                yield this.validiate(this.data);
                this.isValidated = true;
            }
            this.prevYieldable = undefined;
            this.processor = undefined;
        });
    }
    yield() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.process();
            return this.data;
        });
    }
    let(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block(yield this.yield());
        });
    }
    apply(block) {
        return __awaiter(this, void 0, void 0, function* () {
            yield block.call(yield this.yield());
            return this.data;
        });
    }
    run(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield block.call(yield this.yield());
        });
    }
    also(block) {
        return __awaiter(this, void 0, void 0, function* () {
            yield block(yield this.yield());
            return this.data;
        });
    }
}
exports.KoconutPrimitive = KoconutPrimitive;
