import {
    exec
} from 'child_process'
import {
    createInterface
} from 'readline'

const readLine = createInterface({
    input : process.stdin,
    output : process.stdout
})

export const runPromisifiedCommand = async (cmd : string, showLog : boolean = true) : Promise<string> => {
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

export const readPromisifiedText = async (text : string) : Promise<string> => new Promise(resolve => {
    readLine.question(text, input => resolve(input))
})