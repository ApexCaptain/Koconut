import { KoconutLocale } from "../module";
export declare class KoconutOption {
    static isDeprecationWarningEnabled: boolean;
    static doesDeprecationWarningShowCallStack: boolean;
    private static _locale;
    static get locale(): KoconutLocale;
    static set locale(locale: KoconutLocale);
}
