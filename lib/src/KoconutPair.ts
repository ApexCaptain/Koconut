export class KoconutPair<FirstType, SecondType> {
    private _first : FirstType
    private _second : SecondType
    constructor(fisrt : FirstType, second : SecondType) {
        this._first = fisrt
        this._second = second
    }
    get first() : FirstType { return this._first }
    get second() : SecondType { return this._second }
    toString() : string { return JSON.stringify({first : this._first, second : this._second}) }
    toArray() : Array<any> { return [this._first, this._second] }
}