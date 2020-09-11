/**
 * Classes which inherit from this protocol have a defined total ordering between their instances
 */
export interface KoconutComparable {
    /**
     * Compares this instance with the target object.
     * <pre>
     * Returns zero            -- This object equals to other.
     * Returns negative number -- This object is less than other.
     * Returns positive number -- This object is grater than other.
     * </pre>
     *
     * @param other Target instance to compare.
     */
    compareTo(other: any): number;
}
