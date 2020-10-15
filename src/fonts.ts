import fontkit from 'fontkit';
import Store from 'electron-store';
import {
  IFontDescripter, IFontManager, IFontFamily, IPostscript,
} from './type';

const estore = new Store();

const fontManager: IFontManager = require('font-manager');

let fontDescripters: IFontDescripter[];

export const getFontList = (): Promise<IFontFamily[]> => new Promise(async (resolve) => {
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
export const getFontListFromManager = (): Promise<IFontFamily[]> => new Promise((resolve) => {
  resolve(getFontDescripters().reduce((arr, fd) => {
    const i = arr.findIndex((obj) => obj.family === fd.family);
    if (i < 0) {
      let altFamilyName: any;
      // let subFamilyName: any;
      try {
        const font = fontkit.openSync(fd.path);
        altFamilyName = font.familyName;
        // subFamilyName = font.subfamilyName;
        const errorBuf2Str = (buf: Buffer) => Array(buf.length).fill(0).map((_, i) => (((buf as Buffer)[i] !== 0) ? Buffer.from([buf[i]]).toString() : '')).join('');

        if (altFamilyName instanceof Buffer) altFamilyName = errorBuf2Str(altFamilyName);
        // if (subFamilyName instanceof Buffer) subFamilyName = errorBuf2Str(subFamilyName);
      } catch (e) { altFamilyName = undefined; }

      arr.push({
        family: fd.family,
        altFamilyName,
        // subFamilyName: subFamilyName,
        favorite: false,
        postscripts: [
          {
            name: fd.postscriptName,
            italic: fd.italic,
            monospace: fd.monospace,
            style: fd.style,
            weight: fd.weight,
            width: fd.width,
          } as IPostscript,
        ],
      });
    } else {
      arr[i].postscripts.push({
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width,
      } as IPostscript);
    }
    return arr;
  }, [] as IFontFamily[]).map((f) => {
    f.postscripts = f.postscripts.sort((p1, p2) => ((p1.weight > p2.weight) ? 1 : -1));
    return f;
  }));
});

export const getFavFonts = (): string[] => estore.get('favFonts', []);

export const getFavFontIndex = (fontFamilyName: string): number => getFavFonts().findIndex((favFontFamilyName) => favFontFamilyName === fontFamilyName);

export const getFavFont = (fontFamilyName: string): boolean => getFavFontIndex(fontFamilyName) >= 0;

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

const getFontDescripters = (force = false): IFontDescripter[] => {
  // gotten descripters and not force
  if (fontDescripters && !force) return fontDescripters;
  fontDescripters = [
    // 重複削除
    ...new Map(
      // フォント一覧取得
      (fontManager.getAvailableFontsSync() as IFontDescripter[])
        .sort((a: IFontDescripter, b: IFontDescripter) => ((a.postscriptName < b.postscriptName) ? -1 : 1))
        .map((fd) => [fd.postscriptName, fd]),
    ).values(),
  ];
  return fontDescripters;
};
