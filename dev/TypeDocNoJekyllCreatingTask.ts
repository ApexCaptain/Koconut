import { join, normalize } from 'path'
import { writeFileSync } from 'fs'

const rootPath = normalize(`${__dirname}/../`)
const nojekyllPath = join(rootPath, "docs", ".nojekyll")
writeFileSync(nojekyllPath, "")
console.log("TypeDoc documentation successfully completed.")