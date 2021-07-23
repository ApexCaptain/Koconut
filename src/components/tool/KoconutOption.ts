
import {
    /* Enum */
    KoconutLocale
} from "../../module.internal"

export class KoconutOption {

    // Deprecation Warning
    static isDeprecationWarningEnabled : boolean = true
    static doesDeprecationWarningShowCallStack : boolean = true

    // Locale
    private static _locale : KoconutLocale
    static get locale() : KoconutLocale {
        if(this._locale == null) this._locale = KoconutLocale.fromString(Intl.DateTimeFormat().resolvedOptions().locale)
        return this._locale
    }
    static set locale(locale : KoconutLocale) {
        this._locale = locale
    }

}