import { derived } from 'svelte/store';
import { listFamilies } from '../db';
import { setup } from './setup';

export const families = derived<typeof setup, string[]>(
  setup,
  (_, set) => {
    listFamilies().then(set);
  },
  []
);
