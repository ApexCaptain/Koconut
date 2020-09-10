import {
    /* Tool */
    KoconutOption
} from "../../module.internal"
import { existsSync, writeFileSync, readFileSync, appendFileSync } from "fs"
export enum FontStyle {
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",
}
enum FontTextColour {
    Black = "\x1b[30m",
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
    White = "\x1b[37m",
}
export enum FontBackgroundColour {
    Black = "\x1b[40m",
    Red = "\x1b[41m",
    Green = "\x1b[42m",
    Yellow = "\x1b[43m",
    Blue = "\x1b[44m",
    Magenta = "\x1b[45m",
    Cyan = "\x1b[46m",
    White = "\x1b[47m",
}
const deprecationWarningGenerators = {

    "english" : (className : string, methodName : string, deprecationVersion : string | null, alternativeMethodName : string | null | undefined) => 
        `${FontTextColour.Yellow}[Deprecation Warning] ${FontStyle.Reset}: `
        + `Method named ${FontTextColour.Cyan}'${methodName}' ${FontStyle.Reset}of ${FontTextColour.Magenta}'${className}' ${FontStyle.Reset}class would be ${FontTextColour.Yellow}Deprecated${FontStyle.Reset} `
        + `${deprecationVersion ? `since Version : ${FontTextColour.Cyan}'${deprecationVersion}'${FontStyle.Reset}.` : "in the future."}`
        + `${alternativeMethodName ? `\n                        You can use ${FontTextColour.Cyan}'${alternativeMethodName}' ${FontStyle.Reset}method alternatively.` : ""}`,

    "japanese" : (className : string, methodName : string, deprecationVersion : string | null, alternativeMethodName : string | null | undefined) =>
        `${FontTextColour.Yellow}[非推奨の警告] ${FontStyle.Reset}: `
        + `${FontTextColour.Magenta}'${className}'${FontStyle.Reset}クラスの${FontTextColour.Cyan}'${methodName}'${FontStyle.Reset}メソッドは`
        + `${deprecationVersion ? `${FontTextColour.Cyan}'${deprecationVersion}'${FontStyle.Reset}バージョンから` : ` 向後`}サポートが${FontTextColour.Yellow}中止${FontStyle.Reset}される予定です。`
        + `${alternativeMethodName ? `\n                 その機能は${FontTextColour.Cyan}'${alternativeMethodName}'${FontStyle.Reset}メソッドに置換えて使用することをお勧めします。` : ``}`,

    "korean" : (className : string, methodName : string, deprecationVersion : string | null, alternativeMethodName : string | null | undefined) =>
        `${FontTextColour.Yellow}[지원 중단 경고] ${FontStyle.Reset}: `
        + `${FontTextColour.Magenta}'${className}' ${FontStyle.Reset}클래스의 ${FontTextColour.Cyan}'${methodName}' ${FontStyle.Reset}메소드는`
        + `${deprecationVersion ? ` ${FontTextColour.Cyan}'${deprecationVersion}' ${FontStyle.Reset}버전부터` : ` 향후`} 지원이 ${FontTextColour.Yellow}중단${FontStyle.Reset} 될 예정입니다.`
        + `${alternativeMethodName ? `\n                   해당 기능은 ${FontTextColour.Cyan}'${alternativeMethodName}'${FontStyle.Reset} 메소드로 대체하여 사용하는 것을 권장합니다.` : ``}`,

}
const deprecationWarningLocale = {
    // English
    "en"    : deprecationWarningGenerators.english,
    "en-AU" : deprecationWarningGenerators.english,
    "en-BZ" : deprecationWarningGenerators.english,
    "en-CA" : deprecationWarningGenerators.english,
    "en-CB"	: deprecationWarningGenerators.english,
    "en-GB" : deprecationWarningGenerators.english,	
    "en-IE" : deprecationWarningGenerators.english,	
    "en-JM" : deprecationWarningGenerators.english,	
    "en-NZ" : deprecationWarningGenerators.english,	
    "en-PH" : deprecationWarningGenerators.english,	
    "en-TT" : deprecationWarningGenerators.english,	
    "en-US" : deprecationWarningGenerators.english,	
    "en-ZA" : deprecationWarningGenerators.english,	
    "en-ZW" : deprecationWarningGenerators.english,

    // Japanese
    'ja'    : deprecationWarningGenerators.japanese,
    'ja-JP' : deprecationWarningGenerators.japanese,

    // Korean
    "ko"    : deprecationWarningGenerators.korean,
    "ko-KR" : deprecationWarningGenerators.korean,

}
export class KoconutDeprecation {
    static isRunningOnDevUnitTesting = false
    private static devDeprecationListSet : Set<string>
    private static devDepreactionListTmpFilePath = "./dev/DevDeprecationList.tmp"
    static showDeprecationWarning(deprecationVersion : string | null = null, alternative : ((...params : any) => any ) | null = null) {
        if(KoconutOption.isDeprecationWarningEnabled) {
            const callStack = (new Error().stack)?.split('\n').slice(2, 8)
            const [ className, methodName ] = callStack!.shift()!.trim().split(' ')[1].split('.')
            let warningString = deprecationWarningLocale[KoconutOption.locale]!(className, methodName, deprecationVersion, alternative?.name)
            if(KoconutOption.doesDeprecationWarningShowCallStack) warningString += `\n${FontTextColour.Green}${callStack?.join('\n')}\n${FontStyle.Reset}`
            console.warn(warningString)
            if(this.isRunningOnDevUnitTesting) {
                try {
                    const stringToAdd = `${className}/${methodName}/${deprecationVersion}`
                    if(!existsSync(this.devDepreactionListTmpFilePath)) writeFileSync(this.devDepreactionListTmpFilePath, "")
                    if(!this.devDeprecationListSet) this.devDeprecationListSet = new Set(readFileSync(this.devDepreactionListTmpFilePath, 'utf-8').split('\n'))
                    if(!this.devDeprecationListSet.has(stringToAdd)) {
                        this.devDeprecationListSet.add(stringToAdd)
                        appendFileSync(this.devDepreactionListTmpFilePath, `\n${stringToAdd}`)
                    }
                } catch(error) {console.error(error)}
            }
        }
    }

}