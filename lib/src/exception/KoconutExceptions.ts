`use strict`

class KoconutError extends Error {
    constructor(message : string) {
        super(message)
        this.name = this.constructor.name.split(/(?=[A-Z])/).join(" ")
        Error.captureStackTrace(this, this.constructor);
    }
}

export class KoconutInvalidArgumentException extends KoconutError {
    constructor(message : string) {
        super(message)
    }
}

export class KoconutIndexOutOfBoundsException extends KoconutError {
    constructor(message : string) {
        super(message)
    }
}

export class KoconutNoSuchElementException extends KoconutError {
    constructor(message : string) {
        super(message)
    }
}