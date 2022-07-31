import type { DBSchema } from 'idb';
import type { Descriptor } from '../../types';

export interface SchemaV1 extends DBSchema {
  family: {
    key: string;
    value: null;
  };
  file: {
    key: string;
    value: {
      path: string;
      source: string;
    };
    indexes: {
      source: string;
    };
  };
  face: {
    key: string;
    value: Descriptor & {
      familyName: string;
      path: string;
      fontIndex: number;

      favorite?: boolean;
    };
    indexes: {
      family: string;
      favorite: number;
    };
  };
}
