import { fontSizes, fontWeightItems } from './constants';

export interface Postscript {
  name: string;
  favorite: boolean;
  italic: boolean;
  monospace: boolean;
  style: string;
  weight: number;
  width: number;
}

export interface FontFamily {
  family: string;
  altFamilyName?: string;
  favorite: boolean;
  postscripts: Postscript[];
}

export type YesNo = 'Yes' | 'No';
export type CtrlCmd = '⌘' | 'Ctrl';

export type FontSize = typeof fontSizes[number];
export type FontWeightItem = typeof fontWeightItems[number];
