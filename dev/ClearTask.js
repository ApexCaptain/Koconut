const fs = require('fs')
const path = require('path')

const outputPath = path.normalize("./dist")
const cleanDirectory = (dirPath) => {
    if(fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(eachFileName => {
            const eachFilePath = path.normalize(path.join(dirPath, eachFileName))
            if(fs.statSync(eachFilePath).isDirectory()) cleanDirectory(eachFilePath)
            else fs.unlinkSync(eachFilePath)
        })
        fs.rmdirSync(dirPath)
    }
}
cleanDirectory(outputPath)