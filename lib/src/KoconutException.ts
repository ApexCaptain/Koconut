
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