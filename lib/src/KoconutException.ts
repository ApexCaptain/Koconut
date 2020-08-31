
export class KoconutInvalidArgumentException extends Error {
    constructor(message : string) {
        super(message)
        Object.setPrototypeOf(this, KoconutInvalidArgumentException.prototype)
    }
}

export class KoconutIndexOutOfBoundsException extends Error {
    constructor(message : string) {
        super(message)
        Object.setPrototypeOf(this, KoconutIndexOutOfBoundsException.prototype)
    }
}

export class KoconutNoSuchElementException extends Error {
    constructor(message : string) {
        super(message)
        Object.setPrototypeOf(this, KoconutNoSuchElementException.prototype)
    }
}