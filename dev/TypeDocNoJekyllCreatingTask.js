`use strict`;
const path = require('path')
const rootPath = path.normalize(`${__dirname}/../`)
const nojekyllPath = path.join(rootPath, "docs", ".nojekyll")
const fs = require('fs')

fs.writeFileSync(nojekyllPath, "")

console.log("TypeDoc documentation successfully completed.")