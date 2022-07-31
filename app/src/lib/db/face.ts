import { open } from './utils';
import type { Descriptor, FontFace } from '../../types';

export const put = (descriptor: FontFace & Descriptor) =>
  open().then((db) => db.put('face', descriptor));

export const listByFamily = (familyName: string) =>
  open().then((db) =>
    db.getAllFromIndex('face', 'family', IDBKeyRange.only(familyName))
  );
