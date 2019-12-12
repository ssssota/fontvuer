import { remote } from 'electron'

const currentVersion = remote.app.getVersion()
const [ currentMajor, currentMinor, currentBugfix] = currentVersion.split('.')

export default async () => {
  const res = await fetch('https://api.github.com/repos/ssssota/fontvuer/releases/latest')
  const json = await res.json()
  const latestVersion = (json['tag_name'] as string).substring(1)
  const [ latestMajor, latestMinor, latestBugfix ] = latestVersion.split('.')
  if ((latestMajor > currentMajor) ||
    (latestMajor === currentMajor && latestMinor > currentMinor) ||
    (latestMajor === currentMajor && latestMinor === currentMinor && latestBugfix > currentBugfix)) 
  {
    return true
  }
  return false
}