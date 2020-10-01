const exec = require('child_process').exec
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

const test = async () => {
    await runPromisifiedCommand('git add -A', false)
    await runPromisifiedCommand(`git commit -m "Testing"`)
    await runPromisifiedCommand('git push origin master')
}

test()