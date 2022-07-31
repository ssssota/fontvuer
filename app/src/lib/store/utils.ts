import { writable, type Writable } from 'svelte/store';

export type State<T, E = unknown> =
  | {
      promise: Promise<T>;
      status: 'pending';
      value?: T;
      error?: undefined;
    }
  | {
      promise: Promise<T>;
      status: 'fulfilled';
      value: T;
      error?: undefined;
    }
  | {
      promise: Promise<T>;
      status: 'rejected';
      value?: T;
      error: E;
    };

export const promiseToStateStore = <T, E>(
  promise: Promise<T>
): Writable<State<T, E>> & { refresh: (p: Promise<T>) => void } => {
  const { subscribe, set, update } = writable<State<T, E>>({
    status: 'pending',
    promise,
  });
  const watch = (p: Promise<T>) => {
    p.then((value) => set({ status: 'fulfilled', promise: p, value })).catch(
      (error) => set({ status: 'rejected', promise: p, error })
    );
  };
  watch(promise);

  return {
    subscribe,
    set,
    update,
    refresh: (p: Promise<T>) => {
      set({
        status: 'pending',
        promise: p,
      });
      watch(p);
    },
  };
};
