`use strict`

const versionStringReg = /\d+.\d+.\d+/
const fs = require('fs')

const devDepreactionListTmpFilePath = `./dev/DevDeprecationList.tmp`

const checkIsDeprecationVersionValid = (deprecationVersionIntArray, currentVersionIntArray) => {
    for(let index in deprecationVersionIntArray) {
        if(currentVersionIntArray[index] > deprecationVersionIntArray[index]) break
        if(currentVersionIntArray[index] == deprecationVersionIntArray[index]) continue
        else return true
    }
    return false
}

module.exports.validateDeprecatedMethod = async (currentVersion = null) => {
    if(fs.existsSync(devDepreactionListTmpFilePath)) {
        currentVersion = currentVersion == null ? require("../package.json").version : currentVersion
        const currentVersionIntArray = currentVersion.split('.').map(eachCharacter => eachCharacter)
        let count = 0
        fs.readFileSync(devDepreactionListTmpFilePath, 'utf-8')
            .split('\n')
            .filter(eachInfo => eachInfo.length != 0)
            .map(eachInfo => eachInfo.split('/'))
            .forEach(eachSplitedInfo => {
                const [className, methodName, deprecationVersion] = eachSplitedInfo
                if(deprecationVersion == 'null') return
                const isValid = checkIsDeprecationVersionValid(deprecationVersion.split('.').map(eachCharacter => parseInt(eachCharacter)), currentVersionIntArray)
                if(!isValid) console.warn(`\x1b[33m [${++count}] ${className}.${methodName} - ${deprecationVersion}\x1b[0m // It's still available. It must be removed before distribution.`)
            })
        fs.unlinkSync(devDepreactionListTmpFilePath)
        if(count != 0) {
            console.warn(`\x1b[31mThere ${count == 1 ? 'is 1 deprecated method' : `are ${count} deprecated methods`} still avaiable.\x1b[0m`)
            return false
        } 
    }
    return true
}
if(process.argv[2] == '-f') module.exports.validateDeprecatedMethod()