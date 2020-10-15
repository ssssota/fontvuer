export interface IFontDescripter {
  path: string;
  postscriptName: string;
  family: string;
  style: string;
  weight: number;
  width: number;
  italic: boolean;
  monospace: boolean;
}

// for font-manager module
export interface IFontManager {
  getAvailableFonts(callback: Function): void;
  getAvailableFontsSync(): IFontDescripter[];
  findFonts(descripter: Object, callback: Function): void;
  findFonts(descripter: Object): IFontDescripter[];
  findFont(descripter: Object, callback: Function): void;
  findFontSync(descripter: Object): IFontDescripter;
  substituteFont(postscriptName: string, text: string, callback: Function): void;
  substituteFontSync(postscriptName: string, text: string): IFontDescripter;
}

export interface IPostscript {
  name: string;
  favorite: boolean;
  italic: boolean;
  monospace: boolean;
  style: string;
  weight: number;
  width: number;
}

export interface IFontFamily {
  family: string;
  altFamilyName?: string;
  // subFamilyName?: string;
  favorite: boolean;
  postscripts: IPostscript[];
}
