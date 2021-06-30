import { exit } from "process"
import {
    runPromisifiedCommand
} from "./CommandShell"

const matchMochaDependency = async () => {
    const nodeVersion = (await runPromisifiedCommand("node -v")).trim()
    console.log(`Current node.js version : ${nodeVersion}`)


    const masterVersionLevel = parseInt(nodeVersion.split(".")[0].slice(1))
    if(masterVersionLevel <= 7) {
        await runPromisifiedCommand("npm install mocha@^6.x --save-dev")
    } else if(masterVersionLevel <= 9) {
        await runPromisifiedCommand("npm install mocha@^7.x --save-dev")
    }


    exit(0)
}
matchMochaDependency()


//   - npm install mocha@^7.x --save-dev

/*
const checkIsNewVersionCodeValid = (newVersionCode : string) => {
    if(versionStringReg.test(newVersionCode)) {
        const prevVersionIntArray = getVersion().split('.').map(eachCharacter => parseInt(eachCharacter))
        const newVersionIntArray = newVersionCode.split('.').map(eachCharacter => parseInt(eachCharacter))
        for(let index in prevVersionIntArray) {
            if(prevVersionIntArray[index] > newVersionIntArray[index]) break
            if(prevVersionIntArray[index] == newVersionIntArray[index]) continue
            else return true
        }
        console.warn(`It should be higher than current current version; ${getVersion()}`)
    } else console.warn(`Invalid version code. It should be matched with regular expression : ${versionStringReg}`)
    return false
}
*/