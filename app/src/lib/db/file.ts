import { open } from './utils';

export const put = (path: string, source: string) =>
  open().then((db) => db.put('file', { path, source }));

export const list = () => open().then((db) => db.getAllKeys('file'));
