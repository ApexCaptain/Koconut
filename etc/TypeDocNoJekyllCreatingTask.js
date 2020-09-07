`use strict`;
(require('fs')).writeFileSync(`${__dirname}/../docs/.nojekyll`, "")
console.log("TypeDoc documentation successfully completed.")