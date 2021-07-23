import { join, normalize } from 'path'
import { appendFileSync, writeFileSync } from 'fs'

const rootPath = normalize(`${__dirname}/../`)
const nojekyllPath = join(rootPath, "docs", ".nojekyll")
writeFileSync(nojekyllPath, "")
const mainStyleSheetPath = join(rootPath, "docs", "assets", "css", "main.css")
appendFileSync(mainStyleSheetPath, `
    .tsd-generator {
        display: none;
    }
`)