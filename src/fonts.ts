import fontkit from 'fontkit';
import Store from 'electron-store';
import fontManager, { FontDescriptor } from 'font-manager';
import { FontFamily, Postscript } from './types';

const estore = new Store();

// const fontManager: IFontManager = require('font-manager');

let fontDescripters: FontDescriptor[];
const getFontDescripters = (force = false): FontDescriptor[] => {
  // gotten descripters and not force
  if (fontDescripters && !force) return fontDescripters;
  fontDescripters = fontManager
    .getAvailableFontsSync()
    .sort((a, b) => ((a.postscriptName < b.postscriptName) ? -1 : 1));
  return fontDescripters;
};

const errorBuf2Str = (buf: Buffer) => Array(buf.length)
  .fill(0)
  .map((_, i) => (((buf as Buffer)[i] !== 0) ? Buffer.from([buf[i]]).toString() : ''))
  .join('');

export const getFontListFromManager = (): Promise<FontFamily[]> => new Promise((resolve) => {
  resolve(getFontDescripters().reduce((families, fd) => {
    const family = families.find((obj) => obj.family === fd.family);

    // already exists font family
    if (family) {
      family.postscripts.push({
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width,
      } as Postscript);
      family.postscripts.sort();
      return families;
    }

    // new family
    let altFamilyName: string | Buffer | undefined;
    try {
      const font = fontkit.openSync(fd.path);
      altFamilyName = font.familyName as string | Buffer;

      if (altFamilyName instanceof Buffer) altFamilyName = errorBuf2Str(altFamilyName);
    } catch (e) { altFamilyName = undefined; }

    families.push({
      family: fd.family,
      altFamilyName,
      favorite: false,
      postscripts: [{
        name: fd.postscriptName,
        italic: fd.italic,
        monospace: fd.monospace,
        style: fd.style,
        weight: fd.weight,
        width: fd.width,
      } as Postscript],
    });
    return families;
  }, [] as FontFamily[]));
});

export const getFavFonts = (): string[] => estore.get('favFonts', []);

export const getFavFontIndex = (fontFamilyName: string): number => getFavFonts()
  .findIndex((favFontFamilyName) => favFontFamilyName === fontFamilyName);

export const isFavFont = (fontFamilyName: string): boolean => getFavFontIndex(fontFamilyName) >= 0;

export const saveFavFonts = (fontFamilyName: string, val: boolean): void => {
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
