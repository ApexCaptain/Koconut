import { exit } from "process"
import {
    readPromisifiedText, runPromisifiedCommand
} from "./CommandShell"

const matchMochaDependency = async () => {
    const nodeVersion = (await runPromisifiedCommand("node -v")).trim()
    const masterVersionLevel = parseInt(nodeVersion.split(".")[0].slice(1))
    if(masterVersionLevel < 10) {
        await runPromisifiedCommand("npm install mocha@^7.x")
    }
    exit(0)
}
matchMochaDependency()


//   - npm install mocha@^7.x --save-dev