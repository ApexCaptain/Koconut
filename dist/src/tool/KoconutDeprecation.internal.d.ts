export declare enum FontStyle {
    Reset = "\u001B[0m",
    Bright = "\u001B[1m",
    Dim = "\u001B[2m",
    Underscore = "\u001B[4m",
    Blink = "\u001B[5m",
    Reverse = "\u001B[7m",
    Hidden = "\u001B[8m"
}
export declare enum FontBackgroundColour {
    Black = "\u001B[40m",
    Red = "\u001B[41m",
    Green = "\u001B[42m",
    Yellow = "\u001B[43m",
    Blue = "\u001B[44m",
    Magenta = "\u001B[45m",
    Cyan = "\u001B[46m",
    White = "\u001B[47m"
}
export declare class KoconutDeprecation {
    static isRunningOnDevUnitTesting: boolean;
    private static devDeprecationListSet;
    private static devDepreactionListTmpFilePath;
    static showDeprecationWarning(deprecationVersion?: string | null, alternative?: ((...params: any) => any) | null): void;
}
