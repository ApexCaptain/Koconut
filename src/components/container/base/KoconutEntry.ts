import {
  /* Base */
  Pair,
  KoconutBoolean,

  /* Tool */
  KoconutPrimitive,
  KoconutTypeChecker,

  /* Protocol */
  KoconutEquatable,
} from '../../../module';

/**
 * Represents a key/value pair for {@link KoconutMap}.
 * The type of key basically could be any kind of class instance,
 * however it is recommended to be a number, string or custom class that inherits {@link KoconutEquatable}.
 * Otherwise, further equality check process in {@link KoconutSet} or {@link KoconutMap} will not work
 * as intented. This is beacuse even if there are two different instances of same class, which have
 * exactly identical properties, they are fundamentally indistinguishable from each other.
 * Please, check the {@link Entry.equalsTo example of 'equalsTo' method}
 *
 * @see
 * <pre>
 * -- Base --
 * {@link KoconutEntry}, {@link Pair}, {@link KoconutPair}
 *
 * -- Container --
 * {@link KoconutMap}
 *
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 *
 * @param {KeyType} KeyType The type of the key value.
 *
 * @param {ValueType} ValueType The type of the value.
 *
 */
export class Entry<KeyType, ValueType> implements KoconutEquatable {
  /**
   * Create an {@link Entry} instance by iterable two values pair.
   *
   * @param {[KeyType, ValueType]} entry Entry pair of key/value as iterable.
   *
   * @return {Entry<KeyType, ValueType>}
   *
   * @example
   * ```typescript
   * const myEntry = Entry.from(["Apex", "Captain"])
   * console.log(myEntry)
   * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
   * ```
   */
  static from<KeyType, ValueType>(
    entry: [KeyType, ValueType],
  ): Entry<KeyType, ValueType> {
    return new Entry(entry[0], entry[1]);
  }

  /**
   * Constructor of {@link Entry}.
   *
   * @param {KeyType} keyElement KeyType element it'd better be distinguishable.
   * @param {ValueType} valueElement  ValueType element.
   */
  constructor(private keyElement: KeyType, private valueElement: ValueType) {}

  /**
   * Returns the key of this key/value pair.
   * @return {KeyType} The Key of this key/value pair.
   */
  get key(): KeyType {
    return this.keyElement;
  }

  /**
   * Returns the value of key/value pair.
   * @return {ValueType} The value of this key/value pair.
   */
  get value(): ValueType {
    return this.valueElement;
  }

  /**
   * Turns this {@link Entry} into a simple JSON object string.
   *
   * @return {string}
   *
   * @example
   * ```typescript
   * const myEntry = Entry.from(["Apex", "Captain"])
   * console.log(myEntry.toString()) // Or, you can use console.log(`${myEntry}`)
   * // ↑ {"keyElement":'Apex',"valueElement":"Captain"}
   * ```
   */
  toString(): string {
    return JSON.stringify({
      keyElement: this.key,
      valueElement: this.valueElement,
    });
  }

  /**
   * Turns this {@link Entry} instance into a simple array.
   *
   * @return {[KeyType, ValueType]}
   *
   * @example
   * ```typescript
   * const myEntry = Entry.from(["Apex", "Captain"])
   * console.log(myEntry.toArray())
   * // ↑ [ 'Apex', 'Captain' ]
   * ```
   */
  toArray(): [KeyType, ValueType] {
    return [this.key, this.value];
  }

  /**
   * Turns this {@link Entry} instance into a simple {@link Pair}
   *
   * @return {Pair<KeyType, ValueType>}
   *
   * @example
   * ```typescript
   * const myEntry = Entry.from(["Apex", "Captain"])
   * console.log(myEntry.toPair())
   * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
   * ```
   */
  toPair(): Pair<KeyType, ValueType> {
    return new Pair(this.key, this.value);
  }

  /**
   * Class {@link Entry} implements {@link KoconutEquatable}. The equality check process
   * of this is done simply by using '==' operator when the KeyType is not {@link KoconutEquatable},
   * otherwise, by using the method '{@link KoconutEquatable.equalsTo equalsTo}' to the the key element.
   * Please, have a check following example.
   *
   * @param {Entry<KeyType, ValueType>} other Other {@link Entry} instance to check equality.
   *
   * @return {boolean | KoconutBoolean}
   *
   * @example
   * ```typescript
   *   class MyKey {
   *       private keyString : string
   *       constructor(keyString : string) {
   *           this.keyString = keyString
   *       }
   *   }
   *
   *   class MyEquatableKey implements KoconutEquatable {
   *
   *       private keyString : string
   *       constructor(keyString : string) {
   *           this.keyString = keyString
   *       }
   *       equalsTo(other : MyEquatableKey) {
   *           return this.keyString == other.keyString
   *       }
   *
   *   }
   *
   *   const myKeyEntry = Entry.from([new MyKey("myKeyString"), 0])
   *   const myKeyEntry2 = Entry.from([new MyKey("myKeyString"), 0])
   *   console.log(`${myKeyEntry.equalsTo(myKeyEntry2)}`)
   *   // ↑ false
   *
   *   const myEquatableKeyEntry = Entry.from([new MyEquatableKey("myEquatableKeyString"), 0])
   *   const myEquatableKeyEntry2 = Entry.from([new MyEquatableKey("myEquatableKeyString"), 0])
   *   console.log(`${myEquatableKeyEntry.equalsTo(myEquatableKeyEntry2)}`)
   *   // ↑ true
   * ```
   */
  equalsTo(other: Entry<KeyType, ValueType>): boolean | KoconutBoolean {
    if (
      KoconutTypeChecker.checkIsEquatable(this.key) &&
      KoconutTypeChecker.checkIsEquatable(other.key)
    ) {
      const equalityResult = this.key.equalsTo(other.key);
      if (equalityResult instanceof KoconutBoolean)
        return KoconutBoolean['fromPrimitive'](equalityResult);
      else return equalityResult;
    } else return this.key == other.key;
  }
}

/**
 * Koconut Wrapper class for {@link Entry}.
 *
 * @see
 * <pre>
 * -- Base --
 * {@link Entry}, {@link Pair}, {@link KoconutPair}
 *
 * -- Container --
 * {@link KoconutMap}
 *
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 *
 * @param {KeyType} KeyType Check for {@link Entry}.
 * @param {ValueType} ValueType Check for {@link Entry}.
 *
 */
export class KoconutEntry<KeyType, ValueType>
  extends KoconutPrimitive<Entry<KeyType, ValueType>>
  implements KoconutEquatable
{
  /**
   * Constructor of {@link KoconutEntry}.
   *
   * @param {KeyType | null} key KeyType element of inner {@link Entry} instance, it'd better be distinguishable.
   *
   * @param {ValueType | null} value ValueType element of inner {@link Entry}.
   */
  constructor(key: KeyType | null = null, value: ValueType | null = null) {
    if (key != null && value != null) super(new Entry(key, value));
    else super();
  }

  /**
   * Processes all the chained object and returns original {@link KoconutEntry} instance.
   *
   * @return {Promise<KoconutEntry<KeyType, ValueType>>}
   *
   * @category Processor
   *
   * @since 1.0.15
   *
   * @example
   * ```typescript
   * const koconutEntry = await new KoconutEntry(0, 1)
   *                                     .retrieve()
   *
   * console.log(koconutEntry)
   * // ↑ KoconutEntry {
   * //   isValidated: true,
   * //   data: Entry { keyElement: 0, valueElement: 1 }
   * // }
   * ```
   */
  async retrieve(): Promise<KoconutEntry<KeyType, ValueType>> {
    await super.retrieve();
    return this;
  }

  /**
   * Class {@link KoconutEntry} implements {@link KoconutEquatable}. The equality check process
   * is done by using '{@link Entry.equalsTo equalsTo method of Entry}'.
   *
   * @param {KoconutEntry<KeyType, ValueType>} other Other {@link KoconutEntry} instance to check equality.
   *
   * @return {KoconutBoolean}
   */
  equalsTo(other: KoconutEntry<KeyType, ValueType>): boolean | KoconutBoolean {
    if (this.data != null && other.data != null)
      return this.data.equalsTo(other.data);
    return false;
  }
}
