import { IFontDescripter, IFontManager, IFontFamily, IPostscript } from './type';
import Store from 'electron-store';

const estore = new Store();

const fontManager: IFontManager = require('font-manager');
let fontDescripters: IFontDescripter[];

export const getFontList = (): Promise<IFontFamily[]> => new Promise(async resolve => {
  /*
    |cache|manag|result|
    |-----|-----|------|
    |0    |0    |0     |
    |0    |1    |manag |
    |1    |0    |0     |
    |1    |1    |cache |
  */
  const manager = await getFontListFromManager();
  resolve(manager);
});

// get fontlist(IFontFamily[]) from font-manager module
export const getFontListFromManager = (): Promise<IFontFamily[]> => new Promise(resolve => {
  resolve(getFontDescripters().reduce((arr, fd) => {
    const i = arr.findIndex(obj => obj.family === fd.family);
    if (i < 0) {
      arr.push({
        family: fd.family,
        favorite: false,
        postscripts: [
          {
            name: fd.postscriptName,
            italic: fd.italic,
            monospace: fd.monospace,
            style: fd.style,
            weight: fd.weight,
            width: fd.width
          } as IPostscript
        ]
      });
    }
    else {
      arr[i].postscripts.push({
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width
      } as IPostscript);
    }
    return arr;
  }, [] as IFontFamily[]).map(f => {
    f.postscripts = f.postscripts.sort((p1, p2) => (p1.weight > p2.weight) ? 1 : -1);
    return f;
  }));
});

export const getFavFonts = (): string[] => {
  return estore.get('favFonts', []);
};

export const getFavFontIndex = (fontFamilyName: string): number => {
  return getFavFonts().findIndex(favFontFamilyName => favFontFamilyName === fontFamilyName);
};

export const getFavFont = (fontFamilyName: string): boolean => {
  return getFavFontIndex(fontFamilyName) >= 0;
};

export const saveFavFonts = (fontFamilyName: string, val: boolean) => {
  const favFonts = getFavFonts();
  const favFontIndex = getFavFontIndex(fontFamilyName);
  const favFont = favFontIndex >= 0;

  if (val && !favFont) {
    // add to fav fonts array
    favFonts.push(fontFamilyName);
    estore.set('favFonts', favFonts);
  } else if (!val && favFont) {
    // remove from fav fonts array
    favFonts.splice(favFontIndex, 1);
    estore.set('favFonts', favFonts);
  }
};

const getFontDescripters = (force: boolean = false): IFontDescripter[] => {
  // gotten descripters and not force
  if (fontDescripters && !force) return fontDescripters;
  fontDescripters = [
    // 重複削除
    ...new Map(
      // フォント一覧取得
      (fontManager.getAvailableFontsSync() as IFontDescripter[])
        .sort((a: IFontDescripter, b: IFontDescripter) => ((a.postscriptName < b.postscriptName)? -1: 1))
        .map(fd => [fd.postscriptName, fd])
    ).values()
  ];
  return fontDescripters;
};