export interface Yieldable<YieldType> {
    yield() : Promise<YieldType | null>
}
export interface SetterUnlocker<DataType> {
    setProcessor(processor : () => Promise<DataType>) : void
    setPrevYieldable(prevYieldable : Yieldable<any>) : void
}