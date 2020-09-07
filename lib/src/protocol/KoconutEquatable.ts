`use strict`

/**
 * Classes which inherit from this protocol is able to check equality with other instances of them. 
 */
export interface KoconutEquatable {
    /**
     * Check whether this instance equals to target object
     * @param other Target instance to check equality.
     */
    equalsTo(other : any) : boolean
}