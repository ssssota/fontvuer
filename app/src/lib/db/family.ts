import { open } from './utils';

export const put = (familyName: string) =>
  open().then((db) => db.put('family', null, familyName));

export const list = () => open().then((db) => db.getAllKeys('family'));
