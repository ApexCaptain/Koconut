import {
  /* Protocol */
  KoconutComparable,

  /* Tool */
  KoconutPrimitive,
  KoconutOpener,
} from '../../../module';

export class KoconutBoolean
  extends KoconutPrimitive<boolean>
  implements Boolean, KoconutComparable
{
  // Koconut Primitive
  /**
   * Creates a new instance from ```boolean```.
   * @param {boolean} boolean A boolean value which is either true or false. If it's omitted ```false``` is default value.
   *
   * @since 1.0.15
   *
   * @example
   * ```typescript
   * const koconutBoolean = await new KoconutBoolean(true)
   * // ↑ This is a KoconutBoolean instance, of which value is true.
   *
   * const koconutBoolean = await new KoconutBoolean()
   * // ↑ This is a KoconutBoolean instance, of which value is false.
   * ```
   */
  constructor(boolean: boolean | null = null) {
    super();
    this.data = boolean == null ? false : boolean;
  }

  //
  private static fromPrimitive(
    primitive: KoconutPrimitive<boolean>,
  ): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean(primitive['data']);
    koconutToReturn.processor = primitive['processor'];
    koconutToReturn.prevYieldable = primitive['prevYieldable'];
    return koconutToReturn;
  }

  // Koconut Comparable
  compareTo(
    other: boolean | KoconutPrimitive<boolean>,
  ): KoconutPrimitive<number> {
    const koconutToReturn = new KoconutPrimitive<number>();
    (koconutToReturn as any as KoconutOpener<number>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let otherBoolean = false;
        if (other instanceof KoconutPrimitive)
          otherBoolean = await other.yield();
        else otherBoolean = other;
        return Number(this.data!) - Number(otherBoolean);
      });
    return koconutToReturn;
  }

  /**
   * Processed all the chained object and returns original {@link KoconutBoolean} instance.
   *
   * @category Processor
   *
   * @since 1.0.15
   *
   * @example
   * ```typescript
   * const koconutBoolean = await new KoconutBoolean(true)
   *                                     .retrieve()
   * console.log(koconutBoolean)
   * // ↑ KoconutBoolean { isValidated: true, data: true }
   * ```
   */
  async retrieve(): Promise<KoconutBoolean> {
    await super.retrieve();
    return this;
  }

  valueOf(): boolean {
    return this.data!;
  }

  not(): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        return !this.data!;
      });
    return koconutToReturn;
  }

  and(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let otherBoolean = false;
        if (other instanceof KoconutPrimitive)
          otherBoolean = await other.yield();
        else otherBoolean = other;
        return this.data! && otherBoolean;
      });
    return koconutToReturn;
  }

  nand(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    return this.and(other).not();
  }

  or(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let otherBoolean = false;
        if (other instanceof KoconutPrimitive)
          otherBoolean = await other.yield();
        else otherBoolean = other;
        return this.data! || otherBoolean;
      });
    return koconutToReturn;
  }

  nor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    return this.or(other).not();
  }

  xor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    const koconutToReturn = new KoconutBoolean();
    (koconutToReturn as any as KoconutOpener<boolean>)
      .setPrevYieldable(this)
      .setProcessor(async () => {
        let otherBoolean = false;
        if (other instanceof KoconutPrimitive)
          otherBoolean = await other.yield();
        else otherBoolean = other;
        return this.data! != otherBoolean;
      });
    return koconutToReturn;
  }

  xnor(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    return this.xor(other).not();
  }

  eqv(other: boolean | KoconutPrimitive<boolean>): KoconutBoolean {
    return this.xor(other).not();
  }
}
