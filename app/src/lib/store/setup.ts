import { setup as setupFn } from '../setup';
import { promiseToStateStore } from './utils';

export const setup = promiseToStateStore(setupFn());
