const simpleGit = require('simple-git')
const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
const { repoConfig, customDomain } = require('../src/.vuepress/config')
const { owner, repo, email, pushBranch } = repoConfig

let token = null
let actor = null
if (process.env.NODE_ENV == 'local') {
  actor = require('./config').actor
  token = require('./config').token
} else if (process.env.NODE_ENV == 'action') {
  actor = process.env.GITHUB_ACTOR
  token = process.env.GITHUB_TOKEN
} else {
  throw error("Wrong Enviorment Params!")
}

async function main() {
  const rootPath = path.resolve('.')
  const distPath = path.resolve(rootPath, './dist')
  const buildPath = path.resolve(rootPath, './build')
  const repoPath = path.resolve(buildPath, repo)

  const remote = `https://${actor}:${token}@github.com/${owner}/${repo}.git`
  console.log(`[remote] ${remote}`)

  // make repo directory
  if (fs.existsSync(repoPath)) {
    shell.rm('-rf', repoPath)
    console.log(`[rm] ${repoPath} is removed`)
  }
  fs.mkdirSync(repoPath, { recursive: true })
  console.log(`[mkdir] ${repoPath} is created`)

  // clone into repo directory
  console.log('[git] cloning')
  await simpleGit().clone(remote, repoPath, ['-b', pushBranch])
  console.log('[git] clone done')

  // clean old files
  shell.ls(`-A`, repoPath).forEach(v => {
    if (v == '.git') { return }
    const targetPath = path.resolve(repoPath, v)
    shell.rm('-rf', targetPath)
    console.log(`[rm] ${targetPath}`)
  })

  // replace with new files
  shell.ls(`-A`, distPath).forEach(v => {
    const sourcePath = path.resolve(distPath, v)
    const targetPath = path.resolve(repoPath, v)
    shell.cp('-r', sourcePath, repoPath)
    console.log(`[cp] ${targetPath}`)
  })

  // write CNAME file to repo directory
  if (customDomain) {
    fs.writeFileSync(path.resolve(repoPath, 'CNAME'), customDomain)
    console.log('[host] on ' + customDomain)
  }

  console.log('[git] deploying...')
  const nowStr = new Date().toLocaleString()
  await simpleGit(repoPath)
    .addConfig('user.name', actor)
    .addConfig('user.email', email)
    .add('.')
    .commit(`deploy(blog): version ${nowStr}`)
    .push()
  console.log('[git] delploy done')
}

main()
