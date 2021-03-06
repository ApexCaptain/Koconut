
import { existsSync, readFileSync, unlinkSync } from 'fs'
import { join, normalize } from 'path'

const versionStringReg = /\d+.\d+.\d+/
const rootPath = normalize(`${__dirname}/../`)
const devDeprecationListTmpFilePath = join(rootPath, "dev/DevDeprecationList.tmp")
const packageJsonPath = join(rootPath, 'package.json')

const checkIdsDepreactionVersionValid = (deprecationVersionIntArray : Array<number>, currentVersionIntArray : Array<number>) : boolean => {
    for(let index in deprecationVersionIntArray) {
        if(currentVersionIntArray[index] > deprecationVersionIntArray[index]) break
        if(currentVersionIntArray[index] == deprecationVersionIntArray[index]) continue
        else return true
    }
    return false
}

export const validateDeprecatedMethod = async (currentVersion : string | null = null) : Promise<boolean> => {
    if(existsSync(devDeprecationListTmpFilePath)) {
        currentVersion = currentVersion == null ? require(packageJsonPath).version : currentVersion
        const currentVersionIntArray = currentVersion!!.split('.').map(eachCharacter => parseInt(eachCharacter))
        let count = 0
        readFileSync(devDeprecationListTmpFilePath, 'utf-8')
            .split('\n')
            .filter(eachInfo => eachInfo.length != 0)
            .map(eachInfo => eachInfo.split('/'))
            .forEach(eachSplitedInfo => {
                const [className, methodName, deprecationVersion] = eachSplitedInfo
                if(deprecationVersion == 'null') return
                const isValid = checkIdsDepreactionVersionValid(deprecationVersion.split('.').map(eachCharacter => parseInt(eachCharacter)), currentVersionIntArray)
                if(!isValid) console.warn(`\x1b[33m [${++count}] ${className}.${methodName} - ${deprecationVersion}\x1b[0m // It's still available. It must be removed before distribution.`)
            })
        unlinkSync(devDeprecationListTmpFilePath)
        if(count != 0) {
            console.warn(`\x1b[31mThere ${count == 1 ? 'is 1 deprecated method' : `are ${count} deprecated methods`} still avaiable.\x1b[0m`)
            return false
        }
    }
    return true
}
if(process.argv[2] == '-f') validateDeprecatedMethod()