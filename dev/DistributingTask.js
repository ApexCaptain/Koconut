`use stict`

const exec = require('child_process').exec
const readline = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
})
const versionStringReg = /\d+.\d+.\d+/
const fs = require('fs')
const { validateDeprecatedMethod } = require("./DepreactedMethodValidatingTask.js")

const path = require('path')
const rootPath = path.normalize(`${__dirname}/../`)
const packageJsonPath = path.join(rootPath, 'package.json')
const readmePath = path.join(rootPath, "README.md")
const npmReadmePath = path.join(rootPath, "README.npm.md")
const gitReadmePath = path.join(rootPath, "README.git.md")

const runPromisifiedCommand = async (cmd, showLog = true) => {
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

const readPromisifiedText = async (text) => {
    return new Promise((resolve) => {
        readline.question(text, input => resolve(input))
    })
}

const generateDefaultNextVersion = () => {
    let defaultNextVersion = getVersion().split('.').map(eachStringNum => parseInt(eachStringNum))
    defaultNextVersion[defaultNextVersion.length - 1]++
    for(let reversedIndex = defaultNextVersion.length - 1 ; reversedIndex >= 1 ; reversedIndex--) {
        if(defaultNextVersion[reversedIndex] == 100) {
            defaultNextVersion[reversedIndex] = 0
            defaultNextVersion[reversedIndex - 1]++
        }
    }
    defaultNextVersion = defaultNextVersion.map(eachNumber => eachNumber.toString())
    defaultNextVersion = defaultNextVersion.join('.')
    return defaultNextVersion
}

const getVersion = () => {
    return require('../package.json').version
}

const checkIsNewVersionCodeValid = (newVersionCode) => {
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
    return false;
}

const distibute = async () => {
    try {
        var newVersionCode
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
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))
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
        delete packageToBeChanged.devDependencies
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))
        fs.renameSync(readmePath, gitReadmePath)
        fs.renameSync(npmReadmePath, readmePath)
        await runPromisifiedCommand(`npm publish`)
        fs.writeFileSync(packageJsonPath, JSON.stringify(copiedPackageInfo, null, 2))
        fs.renameSync(readmePath, npmReadmePath)
        fs.renameSync(gitReadmePath, readmePath)
        
        console.log("Deploying package is successfully completed!")
        process.exit(0)
        
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

// distibute()

console.log(path.join(rootPath, 'package.json'))