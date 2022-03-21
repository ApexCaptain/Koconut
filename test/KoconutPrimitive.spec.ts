import { expect } from 'chai';
import {
  /* Tool */
  KoconutPrimitive,
  KoconutArray,
} from '../src/module';

describe(`${KoconutPrimitive.name} -- Processor`, () => {
  it(KoconutPrimitive.prototype.let.name, async () => {
    const koconut = new KoconutPrimitive(5);
    expect(koconut).to.be.instanceOf(KoconutPrimitive);
    const result = await koconut.let((result) => result + 2);
    expect(result).to.be.eqls(7);
  });
  it(KoconutPrimitive.prototype.process.name, async () => {
    const array = [1, 2, 3, 4, 5];
    const koconut = KoconutArray.from(array);
    expect(koconut).to.be.instanceOf(KoconutArray);
    await koconut
      .onEachIndexed((index, eachElement) => {
        expect(eachElement).to.be.equals(index + 1);
      })
      .process();
  });
  it(KoconutPrimitive.prototype.also.name, async () => {
    const koconut = KoconutArray.of(1, 2, 3, 4, 5);
    expect(koconut).to.be.instanceOf(KoconutArray);
    const result = await koconut.also((result) => {
      result.push(6, 7, 8);
    });
    expect(result).to.be.eqls([1, 2, 3, 4, 5, 6, 7, 8]);
  });
  it(KoconutPrimitive.prototype.retrieve.name, async () => {
    const koconut = new KoconutPrimitive(5);
    expect(koconut).to.be.instanceOf(KoconutPrimitive);
    const result = await koconut.retrieve();
    expect(result).to.be.eqls(koconut);
  });
  it(KoconutPrimitive.prototype.yield.name, async () => {
    const koconut = new KoconutPrimitive(5);
    expect(koconut).to.be.instanceOf(KoconutPrimitive);
    const result = await koconut.yield();
    expect(result).to.be.equals(5);
  });
});
