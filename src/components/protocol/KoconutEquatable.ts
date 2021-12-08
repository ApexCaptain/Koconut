import { KoconutPrimitive } from '../../module';
/**
 * Classes which inherit from this protocol is able to check equality with other instances of them.
 */
export interface KoconutEquatable {
  /**
   * Check whether this instance equals to target object
   * Result can be either simple boolean or {@link KoconutPrimitive} instance wrapping boolean value.
   * @param other Target instance to check equality.
   */
  equalsTo(other: any): boolean | KoconutPrimitive<boolean>;
}
