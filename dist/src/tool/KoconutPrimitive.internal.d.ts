import { KoconutYieldable, KoconutOpener } from "../../module.internal";
export declare class KoconutPrimitive<DataType> implements KoconutYieldable<DataType> {
    protected data: DataType | null;
    protected prevYieldable?: KoconutYieldable<any>;
    protected processor?: () => Promise<DataType>;
    protected setPrevYieldable(prevYieldable: KoconutYieldable<any>): KoconutOpener<DataType>;
    protected setProcessor(processor: () => Promise<DataType>): KoconutOpener<DataType>;
    protected validiate(data: DataType | null): Promise<void>;
    constructor(data?: DataType | null);
    protected isValidated: boolean;
    process(): Promise<void>;
    yield(): Promise<DataType | null>;
    let<ReturnType>(block: (data: DataType | null) => ReturnType | Promise<ReturnType>): Promise<ReturnType>;
    apply(block: (this: DataType | null) => void | Promise<void>): Promise<DataType | null>;
    run<ReturnType>(block: (this: DataType | null) => ReturnType | Promise<ReturnType>): Promise<ReturnType>;
    also(block: (data: DataType | null) => void | Promise<void>): Promise<DataType | null>;
}
