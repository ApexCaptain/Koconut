import { KoconutComparable } from "../../internal"

export const KoconutTypeChecker = {
    checkIsComparable : function(target : any) : target is KoconutComparable {
        if(target && target.compareTo && typeof(target.compareTo) === 'function') return true
        else return false
    }
}