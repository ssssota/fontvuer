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

export class FontFamily {
  family: string;
  altFamilyName?: string;
  //subFamilyName?: string;
  favorite: boolean;
  postscripts: IPostscript[];

  constructor(init: {
    family: string,
    altFamilyName?: string,
    favorite: boolean,
    postscripts: IPostscript[]
  }) {
    this.family = init.family;
    this.altFamilyName = init.altFamilyName;
    this.favorite = init.favorite;
    this.postscripts = init.postscripts;
  }

  addPostscript(ps: IPostscript) {
    this.postscripts.push(ps);
  }

  getFirstFamilyName(altFirst: boolean): string {
    return altFirst ? this.altFamilyName || this.family : this.family;
  }
  getSecondFamilyName(altFirst: boolean): string {
    return altFirst ? this.family : this.altFamilyName || this.family;
  }
}