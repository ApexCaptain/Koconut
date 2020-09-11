
const { Octokit } = require('@octokit/rest')
const fs = require('fs')
const octokit = new Octokit()
const path = require('path')
const rootPath = path.normalize(`${__dirname}/../`)
const packageJsonPath = path.join(rootPath, 'package.json')
const fetchTopics = async () => {
    try {
        const topics = (await octokit.repos.getAllTopics({
            owner :"ApexCaptain",
            repo :"Koconut"
        })).data.names
        const packageToBeChanged = require('../package.json')
        packageToBeChanged.keywords = topics
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))

        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}
fetchTopics()