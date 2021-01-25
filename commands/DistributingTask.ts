
import {
    exec
} from 'child_process'
import {
    createInterface
} from 'readline'
import {
    writeFileSync, renameSync
} from 'fs'
import {
    validateDeprecatedMethod
} from "./DepreactedMethodValidatingTask"
import {
    normalize, join
} from 'path'

const readLine = createInterface({
    input : process.stdin,
    output : process.stdout
})
const versionStringReg = /\d+.\d+.\d+/
const rootPath = normalize(`${__dirname}/../`)
const packageJsonPath = join(rootPath, 'package.json')
const readmePath = join(rootPath, "README.md")
const npmReadmePath = join(rootPath, "README.npm.md")
const gitReadmeTmp = join(rootPath, "README.git.tmp")

const runPromisifiedCommand = async (cmd : string, showLog : boolean = true) : Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if(err) reject(err)
            else {
                const rst = stdout ? stdout : stderr
                if(showLog) console.log(rst)
                resolve(rst)
            }
        })
    })
}

const readPromisifiedText = async (text : string) : Promise<string> => new Promise(resolve => {
    readLine.question(text, input => resolve(input))
})

const getVersion = () : string => {
    return require(packageJsonPath).version
}

const generateDefaultNextVersion = () : string => {
    let defaultNextVersion = getVersion().split('.').map(eachStringNum => parseInt(eachStringNum))
    defaultNextVersion[defaultNextVersion.length - 1]++
    for(let reversedIndex = defaultNextVersion.length - 1 ; reversedIndex >= 1 ; reversedIndex--) {
        if(defaultNextVersion[reversedIndex] == 100) {
            defaultNextVersion[reversedIndex] = 0
            defaultNextVersion[reversedIndex - 1]++
        }
    }
    return defaultNextVersion.map(eachNumber => eachNumber.toString()).join('.')
}

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

const distribute = async () => {
    try {
        var newVersionCode : string
        while(true) {
            newVersionCode = await readPromisifiedText(`\nCurrent Version : ${getVersion()}\nPlease, type the version string of new package (Default : ${generateDefaultNextVersion()}) : `)
            if(newVersionCode === "") newVersionCode = generateDefaultNextVersion()
            const isNewVersionCodeValid = checkIsNewVersionCodeValid(newVersionCode)
            if(isNewVersionCodeValid) break
        }

        if(!await validateDeprecatedMethod(newVersionCode)) {
            console.log(`Cannot distribute the package. Not all deprecated method is valid in version of ${newVersionCode}`)
            process.exit(0)
        }
        
        const packageToBeChanged = require('../package.json')
        packageToBeChanged.version = newVersionCode
        console.log(`\n-- Check your new package info --\n`)
        console.log(packageToBeChanged)
        while(true) {
            const answer = (await readPromisifiedText(`\nWould you like to proceed version for ${newVersionCode}? (Y/N) : `)).toUpperCase()
            if(answer == 'Y' || answer == 'YES') break
            else if(answer == 'N' || answer == 'NO') process.exit()
        }
        
        console.log(`\nUpdating version...`)
        writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))
        console.log("Package version overriden")
        
        const defualtMessage = `New version released : ${newVersionCode}`
        var commitMessage = await readPromisifiedText(`\nGit Commit Message (Default : ${defualtMessage}) : `)
        if(!commitMessage) commitMessage = defualtMessage
        await runPromisifiedCommand('git add -A', false)
        await runPromisifiedCommand(`git commit -m "${commitMessage}"`)
        await runPromisifiedCommand(`git tag "${newVersionCode}"`)
        await runPromisifiedCommand('git push origin master --tags')

        const copiedPackageInfo = JSON.parse(JSON.stringify(packageToBeChanged))
        delete packageToBeChanged.scripts
        // delete packageToBeChanged.devDependencies
        writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))
        renameSync(readmePath, gitReadmeTmp)
        renameSync(npmReadmePath, readmePath)
        await runPromisifiedCommand(`npm publish`)
        writeFileSync(packageJsonPath, JSON.stringify(copiedPackageInfo, null, 2))
        renameSync(readmePath, npmReadmePath)
        renameSync(gitReadmeTmp, readmePath)
        
        console.log("Deploying package is successfully completed!")
        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}
distribute()