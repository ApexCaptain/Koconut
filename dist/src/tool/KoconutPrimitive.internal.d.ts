import { KoconutYieldable, KoconutOpener } from "../../module.internal";
export declare class KoconutPrimitive<DataType> implements KoconutYieldable<DataType> {
    protected data: DataType | null;
    protected prevYieldable?: KoconutYieldable<any>;
    protected processor?: () => Promise<DataType>;
    protected setPrevYieldable(prevYieldable: KoconutYieldable<any>): KoconutOpener<DataType>;
    protected setProcessor(processor: () => Promise<DataType>): KoconutOpener<DataType>;
    protected validate(data: DataType | null): Promise<void>;
    constructor(data?: DataType | null);
    protected isValidated: boolean;
    process(): Promise<void>;
    yield(): Promise<DataType>;
    let<ReturnType>(block: (data: DataType) => ReturnType | Promise<ReturnType>): Promise<ReturnType>;
    also(block: (data: DataType) => void | Promise<void>): Promise<DataType | null>;
}
