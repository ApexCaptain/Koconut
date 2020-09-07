import { KoconutPrimitive } from "../../module.internal";
export declare class KoconutIterable<DataType, CombinedDataType, CombinedWrapperType extends Iterable<CombinedDataType>, WrapperType extends Iterable<DataType>> extends KoconutPrimitive<WrapperType> {
    protected combinedDataWrapper: CombinedWrapperType | null;
    all(predicate: (element: CombinedDataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<boolean>;
    any(predicate: (element: CombinedDataType) => boolean | Promise<boolean>, thisArg?: any): KoconutPrimitive<boolean>;
    asIterable(): KoconutIterable<DataType, CombinedDataType, CombinedWrapperType, WrapperType>;
    count(predicate?: ((element: CombinedDataType) => boolean | Promise<boolean>) | null, thisArg?: any): KoconutPrimitive<number>;
}
