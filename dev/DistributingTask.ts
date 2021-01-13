
import {
    exec
} from 'child_process'
import {
    createInterface
} from 'readline'
import {

} from 'fs'
import {
    validateDepreactedMethod
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