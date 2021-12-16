`use strict`;

import {
  KoconutDeprecation,
  KoconutEquatable,
  KoconutComparable,
  KoconutPrimitive,
  KoconutBoolean,
} from '../src/module';
KoconutDeprecation.isRunningOnDevUnitTesting = true;
export class Person implements KoconutEquatable {
  constructor(public firstName: string, public lastName: string) {}

  /* Override */
  equalsTo(other: Person): boolean {
    return this.lastName == other.lastName;
  }
}

export class Dog implements KoconutEquatable {
  constructor(public name: string, public age: number, public id: number) {}
  equalsTo(other: Dog): KoconutBoolean {
    return new KoconutBoolean(this.id == other.id);
  }
}

export class Worker extends Person implements KoconutComparable {
  constructor(firstName: string, lastName: string, public pay: number) {
    super(firstName, lastName);
  }

  compareTo(other: Worker): KoconutPrimitive<number> {
    return new KoconutPrimitive(this.pay - other.pay);
  }
}

export class ProductInfo implements KoconutEquatable, KoconutComparable {
  constructor(public id: string, public name: string, public price: number) {}

  /* Override */
  equalsTo(other: ProductInfo): boolean {
    return this.id == other.id;
  }

  /* Override */
  compareTo(other: ProductInfo): number {
    return this.price - other.price;
  }
}
