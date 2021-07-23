import {
    Octokit
} from '@octokit/rest'
import { writeFileSync } from 'fs'
import { join, normalize } from 'path'


const octokit = new Octokit()
const rootPath = normalize(`${__dirname}/../`)
const packageJsonPath = join(rootPath, 'package.json')
const fetchTopics = async () => {
    try {
        const topics = (await octokit.repos.getAllTopics({
            owner : "ApexCaptain",
            repo : "Koconut"
        })).data.names
        const packageToBeChanged = require(packageJsonPath)
        packageToBeChanged.keywords = topics
        writeFileSync(packageJsonPath, JSON.stringify(packageToBeChanged, null, 2))
        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}
fetchTopics()