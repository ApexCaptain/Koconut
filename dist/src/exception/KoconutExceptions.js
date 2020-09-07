"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoconutConflictException = exports.KoconutNoSuchElementException = exports.KoconutIndexOutOfBoundsException = exports.KoconutInvalidArgumentException = void 0;
`use strict`;
class KoconutError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name.split(/(?=[A-Z])/).join(" ");
        Error.captureStackTrace(this, this.constructor);
    }
}
class KoconutInvalidArgumentException extends KoconutError {
}
exports.KoconutInvalidArgumentException = KoconutInvalidArgumentException;
class KoconutIndexOutOfBoundsException extends KoconutError {
}
exports.KoconutIndexOutOfBoundsException = KoconutIndexOutOfBoundsException;
class KoconutNoSuchElementException extends KoconutError {
}
exports.KoconutNoSuchElementException = KoconutNoSuchElementException;
class KoconutConflictException extends KoconutError {
}
exports.KoconutConflictException = KoconutConflictException;
