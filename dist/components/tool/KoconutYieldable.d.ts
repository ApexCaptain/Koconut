export interface KoconutYieldable<DataType> {
  yield(): Promise<DataType | null>;
}
