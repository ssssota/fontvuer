import { remote } from 'electron';
import { repository } from './constants';

export const currentVersion = remote.app.getVersion();
const [currentMajor, currentMinor, currentBugfix] = currentVersion.split('.');
let latestVer = '';
export const isUpdateComing = (async () => {
  const res = await fetch(`${repository}/releases/latest`);
  const json = await res.json();
  latestVer = (json.tag_name as string).substring(1);
  const [latestMajor, latestMinor, latestBugfix] = latestVer.split('.');
  if ((latestMajor > currentMajor)
  || (latestMajor === currentMajor && latestMinor > currentMinor)
  || (latestMajor === currentMajor && latestMinor === currentMinor && latestBugfix > currentBugfix)
  ) {
    return true;
  }
  return false;
})();
export const latestVersion = latestVer;
