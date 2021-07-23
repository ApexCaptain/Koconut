import express from 'express'
import open from 'open'
const app : express.Application = express()
app.use(express.static(`${__dirname}/../docs`))
app.listen(process.env.npm_package_config_docViewPort, () => {
    open(`http://localhost:${process.env.npm_package_config_docViewPort}/`)
})
