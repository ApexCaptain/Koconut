/* eslint-disable no-unused-vars */
import { expect } from 'chai';
import {
  /* Tool */
  KoconutPrimitive,
  KoconutDeprecation,

  /* Base */
  Entry,
  KoconutEntry,
  Pair,
  KoconutPair,

  /* Container */
  KoconutArray,
  KoconutSet,
  KoconutMap,
  KoconutFlow,
  Flow,
  KoconutBoolean,

  /* Exception */
  KoconutNoSuchElementException,
  KoconutInvalidArgumentException,
} from '../src/module';
import { Person, ProductInfo, Dog } from './TestDataClasses';

KoconutDeprecation.isRunningOnDevUnitTesting = true;

describe(`${KoconutMap.name} -- Creator`, () => {
  it(`constructor`, async () => {
    const koconut = new KoconutMap([
      [0, 'a'],
      new Entry(1, 'b'),
      new Pair(2, 'c'),
    ]);
    const result = await koconut.yield();
    expect(result).eqls(
      new Map([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ]),
    );
  });

  it(`${KoconutMap.from.name}`, async () => {
    const koconut = KoconutMap.from<number, number>();
    const result = await koconut.yield();
    expect(result).eqls(new Map<number, number>());
  });

  it(`${KoconutMap.generate.name}`, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.generate(5, (index) => {
      if (index == 0) return [index, index + 1];
      else if (index == 1) return new Pair(index, index + 1);
      else if (index == 2) return new KoconutPair(index, index + 1);
      else if (index == 3) return new Entry(index, index + 1);
      else return new KoconutEntry(index, index + 1);
    });

    const resultCase1 = await koconutCase1.yield();
    expect(resultCase1).eqls(
      new Map([
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ]),
    );

    /* Case 2 */
    const koconutCase2 = KoconutMap.generate(-1, (index) => [index, index + 1]);
    try {
      await koconutCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutInvalidArgumentException);
    }
  });
});

describe(`${KoconutMap.name} -- Processor`, () => {
  it(`${KoconutMap.prototype.retrieve.name}`, async () => {
    const koconut = KoconutMap.of([0, 1], [1, 2]);
    const yieldable = await koconut.retrieve();
    expect(yieldable).eqls(koconut);
    const result = await yieldable.yield();
    expect(result).eqls(
      new Map([
        [0, 1],
        [1, 2],
      ]),
    );
  });
});

describe(`${KoconutMap.name} -- Accessor`, () => {
  it('entries', async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);

    const yieldableCase1 = koconutCase1.entries;
    expect(yieldableCase1).to.be.instanceOf(KoconutSet);
    const resultCase1 = await yieldableCase1.yield();
    const expectedResultEntryArrayCase1 = [
      new Entry(0, 'a'),
      new Entry(1, 'b'),
      new Entry(2, 'c'),
    ];
    expect(resultCase1).eqls(new Set(expectedResultEntryArrayCase1));

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      [new Dog('unknown', 0, 0), 1],
      [new Dog('unknown', 2, 0), 2],
      [new Dog('unknown', 0, 1), 3],
    );

    const yieldableCase2 = koconutCase2.entries;
    expect(yieldableCase2).to.be.instanceOf(KoconutSet);
    const resultCase2 = await yieldableCase2.yield();
    const expectedResultEntryArrayCase2 = [
      new Entry(new Dog('unknown', 0, 0), 1),
      new Entry(new Dog('unknown', 0, 1), 3),
    ];
    expect(resultCase2).eqls(new Set(expectedResultEntryArrayCase2));
  });

  it('keys', async () => {
    const koconut = KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);

    const yieldable = koconut.keys;
    expect(yieldable).to.be.instanceOf(KoconutSet);
    const result = await yieldable.yield();
    expect(result).eqls(new Set([0, 1, 2]));
  });

  it('size', async () => {
    const koconut = KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);

    const yieldable = koconut.size;
    expect(yieldable).to.be.instanceOf(KoconutPrimitive);
    const result = await yieldable.yield();
    expect(result).equals(3);
  });

  it('values', async () => {
    const koconut = KoconutMap.of([0, 'a'], [1, 'b'], [2, 'c']);

    const yieldable = koconut.values;
    expect(yieldable).to.be.instanceOf(KoconutArray);
    const result = await yieldable.yield();
    expect(result).eqls(['a', 'b', 'c']);
  });
});

describe(`${KoconutMap.name} -- Calculator`, () => {
  it(KoconutMap.prototype.count.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.count();
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(5);

    /* Case 2 */
    const yieldableCase2 = koconut.count((eachEntry) => eachEntry.key % 2 == 0);

    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(2);
  });

  it(KoconutMap.prototype.maxBy.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.maxBy((eachEntry) => eachEntry.value);
    expect(yieldableCase1).to.be.instanceOf(KoconutEntry);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Carol', 51));

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .maxBy((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutEntry);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.maxBy((eachEntry) => eachEntry.value);
    expect(yieldableCase3).to.be.instanceOf(KoconutEntry);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new Entry('A-1', new ProductInfo('A-1', 'Mac Book Pro -- May', 2000)),
    );
  });

  it(KoconutMap.prototype.maxByOrNull.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.maxByOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutEntry);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Carol', 51));

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .maxByOrNull((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutEntry);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.maxByOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutEntry);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new Entry('A-1', new ProductInfo('A-1', 'Mac Book Pro -- May', 2000)),
    );
  });

  it(KoconutMap.prototype.maxOf.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.maxOf((eachEntry) => eachEntry.value);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(51);

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .maxOf((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.maxOf((eachEntry) => eachEntry.value);
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
    );
  });

  it(KoconutMap.prototype.maxOfOrNull.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.maxOfOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(51);

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .maxOfOrNull((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.maxOfOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
    );
  });

  it(KoconutMap.prototype.maxOfWith.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.maxOfWith(
      (eachEntry) => eachEntry.value,
      (front, rear) => front - rear,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(51);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .maxOfWith(
        (eachEntry) => eachEntry.value,
        (front, rear) => (front = rear),
      );
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }
  });

  it(KoconutMap.prototype.maxOfWithOrNull.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.maxOfWithOrNull(
      (eachEntry) => eachEntry.value,
      (front, rear) => front - rear,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(51);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .maxOfWithOrNull(
        (eachEntry) => eachEntry.value,
        (front, rear) => (front = rear),
      );
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);
  });

  it(KoconutMap.prototype.maxWith.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.maxWith(
      (front, rear) => front.value - rear.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Carol', 51));

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .maxWith((front, rear) => front.value - rear.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.yield();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }
  });

  it(KoconutMap.prototype.maxWithOrNull.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.maxWithOrNull(
      (front, rear) => front.value - rear.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Carol', 51));

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .maxWithOrNull((front, rear) => front.value - rear.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);
  });

  it(KoconutMap.prototype.minBy.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.minBy((eachEntry) => eachEntry.value);
    expect(yieldableCase1).to.be.instanceOf(KoconutEntry);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Bob', 28));

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .minBy((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutEntry);
    try {
      await yieldableCase2.yield();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.minBy((eachEntry) => eachEntry.value);
    expect(yieldableCase3).to.be.instanceOf(KoconutEntry);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new Entry(
        'A-2',
        new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      ),
    );
  });

  it(KoconutMap.prototype.minByOrNull.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.minByOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutEntry);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Bob', 28));

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .minByOrNull((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutEntry);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.minByOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutEntry);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new Entry(
        'A-2',
        new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      ),
    );
  });

  it(KoconutMap.prototype.minOf.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.minOf((eachEntry) => eachEntry.value);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(28);

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .minOf((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.minOf((eachEntry) => eachEntry.value);
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
    );
  });

  it(KoconutMap.prototype.minOfOrNull.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );

    const yieldableCase1 = koconutCase1.minOfOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(28);

    /* Case 2 */
    const koconutCase2 = KoconutMap.of(
      ['Alice', 42],
      ['Bob', 28],
      ['Carol', 51],
    );
    const yieldableCase2 = koconutCase2
      .filter((eachEntry) => eachEntry.value > 100)
      .minOfOrNull((eachEntry) => eachEntry.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new ProductInfo('A-1', 'Mac Book Pro -- May', 2000),
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
      new ProductInfo('A-3', 'iPhone -- June', 1500),
    ]).associateBy((eachElement) => eachElement.id);

    const yieldableCase3 = koconutCase3.minOfOrNull(
      (eachEntry) => eachEntry.value,
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(
      new ProductInfo('A-2', 'Mac Book Air -- September', 1200),
    );
  });

  it(KoconutMap.prototype.minOfWith.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.minOfWith(
      (eachEntry) => eachEntry.value,
      (front, rear) => front - rear,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(28);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .minOfWith(
        (eachEntry) => eachEntry.value,
        (front, rear) => (front = rear),
      );
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }
  });

  it(KoconutMap.prototype.minOfWithOrNull.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.minOfWithOrNull(
      (eachEntry) => eachEntry.value,
      (front, rear) => front - rear,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(28);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .minOfWithOrNull(
        (eachEntry) => eachEntry.value,
        (front, rear) => (front = rear),
      );
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);
  });

  it(KoconutMap.prototype.minWith.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.minWith(
      (front, rear) => front.value - rear.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Bob', 28));

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .minWith((front, rear) => front.value - rear.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.yield();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }
  });

  it(KoconutMap.prototype.minWithOrNull.name, async () => {
    const koconut = KoconutMap.of(['Alice', 42], ['Bob', 28], ['Carol', 51]);

    /* Case 1 */
    const yieldableCase1 = koconut.minWithOrNull(
      (front, rear) => front.value - rear.value,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(new Entry('Bob', 28));

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.value > 100)
      .minWithOrNull((front, rear) => front.value - rear.value);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);
  });
});

describe(`${KoconutMap.name} -- Caster`, () => {
  it(KoconutMap.prototype.asArray.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3).associate(
      (eachElement) => new Pair(eachElement, eachElement),
    );

    const yieldable = koconut.asArray();
    expect(yieldable).to.be.instanceOf(KoconutArray);
    const result = await yieldable.yield();
    expect(result).eqls([new Entry(1, 1), new Entry(2, 2), new Entry(3, 3)]);
  });

  it(KoconutMap.prototype.asSet.name, async () => {
    const koconut = KoconutArray.of(1, 1, 2, 2, 3, 3).associate(
      (eachElement) => new Pair(eachElement, eachElement),
    );

    const yieldable = koconut.asSet();
    expect(yieldable).to.be.instanceOf(KoconutSet);
    const result = await yieldable.yield();
    expect(result).eqls(
      new Set([new Entry(1, 1), new Entry(2, 2), new Entry(3, 3)]),
    );
  });

  /*
    it(KoconutMap.prototype.asFlow.name, async () => {

        const koconut = KoconutArray.of(1,2,3)
                        .associate(eachElement => new Pair(eachElement, eachElement))

        const yieldable =
                        koconut
                        .asFlow()
        expect(yieldable).to.be.instanceOf(KoconutFlow)
        const result = await yieldable.yield()
        expect(result).to.be.instanceOf(Flow)
        expect(result.dataArray).eqls([
                                        new Entry(1, 1),
                                        new Entry(2, 2),
                                        new Entry(3, 3)
                                    ])

    })
    */
});

describe(`${KoconutMap.name} -- Inspector`, () => {
  it(KoconutMap.prototype.all.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.all(
      (eachEntry) => eachEntry.value / eachEntry.key == 2,
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const yieldableCase2 = koconut.all((eachEntry) => eachEntry.value < 8);
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(false);
  });

  it(KoconutMap.prototype.any.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * eachElement,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.any((eachEntry) => eachEntry.value == 1);
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const yieldableCase2 = koconut.any((eachEntry) => eachEntry.value < 0);
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(false);
  });

  it(KoconutMap.prototype.isEmpty.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.isEmpty();
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(false);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.key > 10)
      .isEmpty();
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);
  });

  it(KoconutMap.prototype.isNotEmpty.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.isNotEmpty();
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.key > 10)
      .isNotEmpty();
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(false);
  });

  it(KoconutMap.prototype.isNullOrEmpty.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.isNullOrEmpty();
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(false);

    /* Case 2 */
    const yieldableCase2 = koconut
      .filter((eachEntry) => eachEntry.key > 10)
      .isNullOrEmpty();
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);
  });

  it(KoconutMap.prototype.contains.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3).associate(
      (eachElement) => new Pair(eachElement, eachElement),
    );

    const yieldableCase1 = koconutCase1.contains(2);
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const koconutCase2 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase2 = koconutCase2.contains(new Person('Grace', 'Hopper'));
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);

    /* Case 3 */
    const koconutCase3 = KoconutArray.of(
      new Dog('Brie', 3, 0),
      new Dog('Mike', 5, 1),
      new Dog('unknown', 3, 0),
    ).associate((eachElement) => [eachElement, eachElement.name]);

    const yieldableCase3 = koconutCase3.contains(new Dog('unknown', -1, 4));
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equal(false);
  });

  it(KoconutMap.prototype.containsKey.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3).associate(
      (eachElement) => new Pair(eachElement, eachElement),
    );

    const yieldableCase1 = koconutCase1.containsKey(2);
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const koconutCase2 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase2 = koconutCase2.containsKey(
      new Person('Grace', 'Hopper'),
    );
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);
  });

  it(KoconutMap.prototype.containsValue.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3).associate(
      (eachElement) => new Pair(eachElement, eachElement),
    );

    const yieldableCase1 = koconutCase1.containsValue(2);
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const koconutCase2 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement.firstName + eachElement.lastName,
      eachElement,
    ]);

    const yieldableCase2 = koconutCase2.containsValue(
      new Person('Grace', 'Hopper'),
    );
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);

    /* Case 3 */
    const koconutCase3 = KoconutArray.of(
      new Dog('Brie', 3, 0),
      new Dog('Mike', 5, 1),
      new Dog('unknown', 3, 0),
    ).associate((eachElement) => [eachElement.name, eachElement]);

    const yieldableCase3 = koconutCase3.containsValue(
      new Dog('unknown', -1, 4),
    );
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equal(false);
  });

  it(KoconutMap.prototype.none.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement,
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut
      .filter((eachEntry) => eachEntry.key > 10)
      .none();
    expect(yieldableCase1).to.be.instanceOf(KoconutBoolean);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(true);

    /* Case 2 */
    const yieldableCase2 = koconut.none((eachEntry) => eachEntry.key > 10);
    expect(yieldableCase2).to.be.instanceOf(KoconutBoolean);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(true);
  });
});

describe(`${KoconutMap.name} -- Iterator`, () => {
  it(KoconutMap.prototype.forEach.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.forEach((eachEntry) => {
      expect(eachEntry.value / eachEntry.key).equals(2);
    });
    expect(yieldable).to.be.instanceOf(KoconutPrimitive);
    await yieldable.process();
  });

  it(KoconutMap.prototype.onEach.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement,
    ]);

    const yieldable = koconut.onEach((eachEntry) => {
      expect(eachEntry.value - eachEntry.key).equals(0);
    });
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
  });
});

describe(`${KoconutMap.name} -- Manipulator`, () => {
  it(KoconutMap.prototype.filter.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.filter((eachEntry) => eachEntry.key % 2 == 0);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<number, number>([
      [2, 4],
      [4, 8],
    ]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.filterNot.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.filterNot((eachEntry) => eachEntry.value < 6);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<number, number>([
      [3, 6],
      [4, 8],
      [5, 10],
    ]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.filterTo.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const destination = new Map<number, number>();
    const yieldable = koconut.filterTo(
      destination,
      (eachEntry) => eachEntry.key % 2 == 0,
    );
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    const expectedResultMap = new Map<number, number>([
      [2, 4],
      [4, 8],
    ]);
    expect(destination).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.filterNotTo.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const destination = new Map<number, number>();
    const yieldable = koconut.filterNotTo(
      destination,
      (eachEntry) => eachEntry.value < 6,
    );
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    const expectedResultMap = new Map<number, number>([
      [3, 6],
      [4, 8],
      [5, 10],
    ]);
    expect(destination).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.filterKeys.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.filterKeys((eachKey) => eachKey % 3 == 0);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<number, number>([[3, 6]]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.filterValues.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.filterValues((eachElement) => eachElement > 6);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<number, number>([
      [4, 8],
      [5, 10],
    ]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.minus.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3).associate((eachElement) => [
      eachElement,
      eachElement,
    ]);

    const yieldableCase1 = koconutCase1.minus(1);
    expect(yieldableCase1).to.be.instanceOf(KoconutMap);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(
      new Map([
        [2, 2],
        [3, 3],
      ]),
    );

    /* Case 2 */
    const koconutCase2 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase2 = koconutCase2.minus(new Person('Jinyoung', 'Luvya'));
    expect(yieldableCase2).to.be.instanceOf(KoconutMap);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).eqls(
      new Map([
        [new Person('Grace', 'Hopper'), 'GraceHopper'],
        [new Person('Jacob', 'Bernoulli'), 'JacobBernoulli'],
      ]),
    );
  });

  it(KoconutMap.prototype.plus.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3).associate((eachElement) => [
      eachElement,
      eachElement,
    ]);

    const expectedResultMap = new Map([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]);

    /* Case 1 */
    const yieldableCase1 = koconut.plus(new Pair(4, 4));
    expect(yieldableCase1).to.be.instanceOf(KoconutMap);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).eqls(expectedResultMap);

    /* Case 2 */
    const yieldableCase2 = koconut.plus(new KoconutPair(4, 4));
    expect(yieldableCase2).to.be.instanceOf(KoconutMap);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).eqls(expectedResultMap);

    /* Case 3 */
    const yieldableCase3 = koconut.plus(new Entry(4, 4));
    expect(yieldableCase3).to.be.instanceOf(KoconutMap);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).eqls(expectedResultMap);

    /* Case 4 */
    const yieldableCase4 = koconut.plus(new KoconutEntry(4, 4));
    expect(yieldableCase4).to.be.instanceOf(KoconutMap);
    const resultCase4 = await yieldableCase4.yield();
    expect(resultCase4).eqls(expectedResultMap);

    expectedResultMap.set(5, 5);

    /* Case 5 */
    const yieldableCase5 = koconut.plus(new Pair(4, 4), new Pair(5, 5));
    expect(yieldableCase5).to.be.instanceOf(KoconutMap);
    const resultCase5 = await yieldableCase5.yield();
    expect(resultCase5).eqls(expectedResultMap);

    /* Case 6 */
    const yieldableCase6 = koconut.plus(
      new KoconutPair(4, 4),
      new KoconutPair(5, 5),
    );
    expect(yieldableCase6).to.be.instanceOf(KoconutMap);
    const resultCase6 = await yieldableCase6.yield();
    expect(resultCase6).eqls(expectedResultMap);

    /* Case 7 */
    const yieldableCase7 = koconut.plus(new Entry(4, 4), new Entry(5, 5));
    expect(yieldableCase7).to.be.instanceOf(KoconutMap);
    const resultCase7 = await yieldableCase7.yield();
    expect(resultCase7).eqls(expectedResultMap);

    /* Case 8 */
    const yieldableCase8 = koconut.plus(
      new KoconutEntry(4, 4),
      new KoconutEntry(5, 5),
    );
    expect(yieldableCase8).to.be.instanceOf(KoconutMap);
    const resultCase8 = await yieldableCase8.yield();
    expect(resultCase8).eqls(expectedResultMap);

    /* Case 9 */
    const yieldableCase9 = koconut.plus([4, 4], [5, 5]);
    expect(yieldableCase9).to.be.instanceOf(KoconutMap);
    const resultCase9 = await yieldableCase9.yield();
    expect(resultCase9).eqls(expectedResultMap);
  });
});

describe(`${KoconutMap.name} -- Selector`, () => {
  it(KoconutMap.prototype.get.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase1 = koconutCase1.get(2);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(4);

    /* Case 2 */
    const koconutCase2 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase2 = koconutCase2
      .filterKeys((eachKey) => eachKey > 3)
      .get(1);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(null);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase3 = koconutCase3.get(new Person('Grace', 'Hopper'));
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equals('GraceHopper');

    /* Case 4 */
    const koconutCase4 = KoconutMap.of(
      [new Dog('unknown', 0, 0), 1],
      [new Dog('unknown', 2, 0), 2],
      [new Dog('unknown', 0, 1), 3],
    );

    const yieldableCase4 = koconutCase4.get(new Dog('Brie', 1, 1));
    expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive);
    const resultCase4 = await yieldableCase4.yield();
    expect(resultCase4).to.be.eqls(3);
  });

  it(KoconutMap.prototype.getOrDefault.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase1 = koconutCase1.getOrDefault(2, 100);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(4);

    /* Case 2 */
    const koconutCase2 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase2 = koconutCase2
      .filterKeys((eachKey) => eachKey > 3)
      .getOrDefault(1, 100);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(100);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase3 = koconutCase3.getOrDefault(
      new Person('Grace', 'Hopper'),
      'SteveJobs',
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equals('GraceHopper');

    /* Case 4 */
    const koconutCase4 = KoconutMap.of(
      [new Dog('unknown', 0, 0), 1],
      [new Dog('unknown', 2, 0), 2],
      [new Dog('unknown', 0, 1), 3],
    );

    const yieldableCase4 = koconutCase4.getOrDefault(new Dog('Brie', 1, 2), 10);
    expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive);
    const resultCase4 = await yieldableCase4.yield();
    expect(resultCase4).to.be.eqls(10);
  });

  it(KoconutMap.prototype.getOrElse.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase1 = koconutCase1.getOrElse(2, () => 100);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(4);

    /* Case 2 */
    const koconutCase2 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase2 = koconutCase2
      .filterKeys((eachKey) => eachKey > 3)
      .getOrElse(1, () => 100);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    const resultCase2 = await yieldableCase2.yield();
    expect(resultCase2).equals(100);

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase3 = koconutCase3.getOrElse(
      new Person('Grace', 'Hopper'),
      () => 'SteveJobs',
    );
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equals('GraceHopper');

    /* Case 4 */
    const koconutCase4 = KoconutMap.of(
      [new Dog('unknown', 0, 0), 1],
      [new Dog('unknown', 2, 0), 2],
      [new Dog('unknown', 0, 1), 3],
    );

    const yieldableCase4 = koconutCase4.getOrElse(
      new Dog('Brie', 1, 2),
      () => 10,
    );
    expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive);
    const resultCase4 = await yieldableCase4.yield();
    expect(resultCase4).to.be.eqls(10);
  });

  it(KoconutMap.prototype.getValue.name, async () => {
    /* Case 1 */
    const koconutCase1 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase1 = koconutCase1.getValue(2);
    expect(yieldableCase1).to.be.instanceOf(KoconutPrimitive);
    const resultCase1 = await yieldableCase1.yield();
    expect(resultCase1).equals(4);

    /* Case 2 */
    const koconutCase2 = KoconutArray.of(1, 2, 3, 4, 5).associate(
      (eachElement) => [eachElement, eachElement * 2],
    );

    const yieldableCase2 = koconutCase2
      .filterKeys((eachKey) => eachKey > 3)
      .getValue(1);
    expect(yieldableCase2).to.be.instanceOf(KoconutPrimitive);
    try {
      await yieldableCase2.process();
    } catch (error) {
      expect(error).to.be.instanceOf(KoconutNoSuchElementException);
    }

    /* Case 3 */
    const koconutCase3 = KoconutArray.from([
      new Person('Grace', 'Hopper'),
      new Person('Jacob', 'Bernoulli'),
      new Person('Johann', 'Bernoulli'),
      new Person('Jinyoung', 'Luvya'),
    ]).associate((eachElement) => [
      eachElement,
      eachElement.firstName + eachElement.lastName,
    ]);

    const yieldableCase3 = koconutCase3.getValue(new Person('Grace', 'Hopper'));
    expect(yieldableCase3).to.be.instanceOf(KoconutPrimitive);
    const resultCase3 = await yieldableCase3.yield();
    expect(resultCase3).equals('GraceHopper');

    /* Case 4 */
    const koconutCase4 = KoconutMap.of(
      [new Dog('unknown', 0, 0), 1],
      [new Dog('unknown', 2, 0), 2],
      [new Dog('unknown', 0, 1), 3],
    );

    const yieldableCase4 = koconutCase4.getValue(new Dog('Brie', 1, 1));
    expect(yieldableCase4).to.be.instanceOf(KoconutPrimitive);
    const resultCase4 = await yieldableCase4.yield();
    expect(resultCase4).to.be.eqls(3);
  });
});

describe(`${KoconutMap.name} -- Transformer`, () => {
  it(KoconutMap.prototype.flatMap.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut
      .flatMap((eachEntry) => [eachEntry.key, eachEntry.value])
      .distinct()
      .sortedBy((eachElement) => eachElement);
    expect(yieldable).to.be.instanceOf(KoconutArray);
    const result = await yieldable.yield();
    expect(result).eqls([1, 2, 3, 4, 5, 6, 8, 10]);
  });

  it(KoconutMap.prototype.flatMapTo.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const destination = new Array<number>();
    const yieldable = koconut.flatMapTo(destination, (eachEntry) => [
      eachEntry.key,
      eachEntry.value,
    ]);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    expect(destination).eqls([1, 2, 2, 4, 3, 6, 4, 8, 5, 10]);
  });

  it(KoconutMap.prototype.map.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.map(
      (eachEntry) => eachEntry.key + eachEntry.value,
    );
    expect(yieldable).to.be.instanceOf(KoconutArray);
    const result = await yieldable.yield();
    expect(result).eqls([3, 6, 9, 12, 15]);
  });

  it(KoconutMap.prototype.mapKeys.name, async () => {
    const koconut = KoconutMap.of(['beer', 2.7], ['bisquit', 5.8]);

    const yieldable = koconut.mapKeys((eachEntry) => eachEntry.key.length);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<number, number>([
      [4, 2.7],
      [7, 5.8],
    ]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.mapKeysTo.name, async () => {
    const koconut = KoconutMap.of(['beer', 2.7], ['bisquit', 5.8]);

    const destination = new Map<number, number>();
    const yieldable = koconut.mapKeysTo(
      destination,
      (eachEntry) => eachEntry.key.length,
    );
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    const expectedResultMap = new Map<number, number>([
      [4, 2.7],
      [7, 5.8],
    ]);
    expect(destination).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.mapNotNull.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const yieldable = koconut.mapNotNull((eachEntry) => {
      if (eachEntry.key > 3) return eachEntry.key + eachEntry.value;
    });
    expect(yieldable).to.be.instanceOf(KoconutArray);
    const result = await yieldable.yield();
    expect(result).eqls([12, 15]);
  });

  it(KoconutMap.prototype.mapNotNullTo.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const destination = new Array<number>();
    const yieldable = koconut.mapNotNullTo(destination, (eachEntry) => {
      if (eachEntry.key > 3) return eachEntry.key + eachEntry.value;
    });
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    expect(destination).eqls([12, 15]);
  });

  it(KoconutMap.prototype.mapTo.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5).associate((eachElement) => [
      eachElement,
      eachElement * 2,
    ]);

    const destination = new Array<number>();
    const yieldable = koconut.mapTo(
      destination,
      (eachEntry) => eachEntry.key + eachEntry.value,
    );
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    expect(destination).eqls([3, 6, 9, 12, 15]);
  });

  it(KoconutMap.prototype.mapValues.name, async () => {
    const koconut = KoconutMap.of(['beverage', 2.7], ['meal', 12.4]);

    const yieldable = koconut.mapValues((eachEntry) => `${eachEntry.value}$`);
    expect(yieldable).to.be.instanceOf(KoconutMap);
    const result = await yieldable.yield();
    const expectedResultMap = new Map<string, string>([
      ['beverage', '2.7$'],
      ['meal', '12.4$'],
    ]);
    expect(result).eqls(expectedResultMap);
  });

  it(KoconutMap.prototype.mapValuesTo.name, async () => {
    const koconut = KoconutMap.of(['beverage', 2.7], ['meal', 12.4]);

    const destination = new Map<string, string>();
    const yieldable = koconut.mapValuesTo(
      destination,
      (eachEntry) => `${eachEntry.value}$`,
    );
    expect(yieldable).to.be.instanceOf(KoconutMap);
    await yieldable.process();
    const expectedResultMap = new Map<string, string>([
      ['beverage', '2.7$'],
      ['meal', '12.4$'],
    ]);
    expect(destination).eqls(expectedResultMap);
  });
});
