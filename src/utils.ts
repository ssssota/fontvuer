import { CtrlCmd, YesNo } from './types';

export const CtrlOrCmd: CtrlCmd = (process.platform === 'darwin') ? '⌘' : 'Ctrl';

export const boolToYenNo = (val: boolean): YesNo => (val ? 'Yes' : 'No');
