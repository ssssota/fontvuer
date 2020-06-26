import { remote } from 'electron'

export const currentVersion = remote.app.getVersion()
const [ currentMajor, currentMinor, currentBugfix] = currentVersion.split('.')
export let latestVersion: string
export const isUpdateComing = (async () => {
  const res = await fetch('https://api.github.com/repos/ssssota/fontvuer/releases/latest')
  const json = await res.json()
  latestVersion = (json['tag_name'] as string).substring(1)
  const [ latestMajor, latestMinor, latestBugfix ] = latestVersion.split('.')
  if ((latestMajor > currentMajor) ||
    (latestMajor === currentMajor && latestMinor > currentMinor) ||
    (latestMajor === currentMajor && latestMinor === currentMinor && latestBugfix > currentBugfix)) 
  {
    return true
  }
  return false
})()