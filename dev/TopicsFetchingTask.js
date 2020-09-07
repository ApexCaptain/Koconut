
const { Octokit } = require('@octokit/rest')
const fs = require('fs')
const octokit = new Octokit()
const fetchTopics = async () => {
    try {
        const topics = (await octokit.repos.getAllTopics({
            owner :"ApexCaptain",
            repo :"Koconut"
        })).data.names
        const packageToBeChanged = require('../package.json')
        packageToBeChanged.keywords = topics
        fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageToBeChanged, null, 2))

        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}
fetchTopics()