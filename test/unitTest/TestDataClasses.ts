`use strict`

import {
    KoconutEquatable, KoconutComparable
} from "../../lib/module.internal"

export class Person implements KoconutEquatable {
    firstName : string
    lastName : string
    constructor(firstName : string, lastName : string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    /* Override */
    equalsTo(other : Person) : boolean {
        return this.lastName == other.lastName
    }
    
}

export class ProductInfo implements KoconutEquatable, KoconutComparable {
    id : string
    name : string
    price : number
    constructor(id : string, name : string, price : number) {
        this.id = id
        this.name = name
        this.price = price
    }

    /* Override */
    equalsTo(other : ProductInfo) : boolean {
        return this.id == other.id
    }

    /* Override */
    compareTo(other : ProductInfo) : number {
        return this.price - other.price
    }
}

