import { join, normalize } from 'path'
import { appendFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'fs'
import * as Koconut from "../src/index"

const rootPath = normalize(`${__dirname}/../`)

const setNoJekyll = () => {
    const nojekyllPath = join(rootPath, "docs", ".nojekyll")
    writeFileSync(nojekyllPath, "")
}

const setTsdGeneratorCssInvisible = () => {
    const mainStyleSheetPath = join(rootPath, "docs", "assets", "css", "main.css")
    appendFileSync(mainStyleSheetPath, `
        .tsd-generator {
            display: none;
        }
    `)
}

const capitalizePageFiles = () => {
    if(process.platform != 'win32') return
    const srcPath = join(rootPath, "src")
    let foundFiles = Array<string>()
    const scanFiles = (dirPath : string) => {
        if(existsSync(dirPath)) {
            readdirSync(dirPath).forEach(eachFileName => {
                const eachFilePath = normalize(join(dirPath, eachFileName))
                if(statSync(eachFilePath).isDirectory()) scanFiles(eachFilePath)
                else if(!eachFileName.includes("internal")) foundFiles.push(eachFileName)
            })
        }
    }
    scanFiles(srcPath)
    // foundFiles = foundFiles.map

    console.log(foundFiles)

    console.log(Object.values(Koconut))
    const t= Object.values(Koconut).map((it : any) => it['name'])
    console.log(t)
}

const typeDocAfterRendering = async () => {
    
    setNoJekyll()
    setTsdGeneratorCssInvisible()
    
    // capitalizePageFiles()
}
typeDocAfterRendering()