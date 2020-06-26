import { KoconutCollection } from "./KoconutCollection"
import { KoconutString } from "./KoconutString";

export class KoconutArray<DataType> extends KoconutCollection<DataType, Array<DataType>> {

    
    join(
        separator : string = ", ",
        prefix :string = "",
        postfix : string = "",
        limit : number = -1,
        truncated : string = "...",
        transform : ((element : DataType, index : number, source : Array<DataType>) => string | Promise<string>) | null = null,
        thisArg : any = null
    ) : KoconutString {
    
        return KoconutString.fromCollection(super.join(separator, prefix, postfix, limit, truncated, transform, thisArg))

    }
    

}