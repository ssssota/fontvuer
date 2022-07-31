import { openDB } from 'idb';
import type { SchemaV1 } from './schema';

const dbName = 'font-db';
export const open = () =>
  openDB<SchemaV1>(dbName, 1, {
    upgrade(db) {
      // db.deleteObjectStore('face');
      // db.deleteObjectStore('family');
      // db.deleteObjectStore('file');
      db.createObjectStore('family');
      db.createObjectStore('file', {
        keyPath: 'path',
      }).createIndex('source', 'source', { unique: false });
      db.createObjectStore('face', {
        keyPath: ['path', 'fontIndex'],
      }).createIndex('family', 'familyName', { unique: false });
    },
  });
