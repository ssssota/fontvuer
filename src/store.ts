import Store from 'electron-store';
import { FontFamily } from './types';

const estore = new Store();

const settingsPath = {
  forceItalic: 'settings.forceItalic',
  dispNoItalic: 'settings.dispNoItalic',
  dispNoMonospace: 'settings.dispNoItalic',
  darkMode: 'settings.darkMode',
} as const;

const INIT_SIZE = 24;
const INIT_WEIGHT = 400;
const INIT_KERNING = 0;
const INIT_ITALIC = false;
const INIT_MONOSPACE = false;
const INIT_FORCE_ITALIC = estore.get(settingsPath.forceItalic, false);
const INIT_DISP_NO_ITALIC = estore.get(settingsPath.dispNoItalic, false);
const INIT_DISP_NO_MONOSPACE = estore.get(settingsPath.dispNoMonospace, false);
const INIT_PREVIEW = 'fontvuer';
const INIT_FAV_ONLY = false;
const INIT_DARK_MODE = estore.get(settingsPath.darkMode, false);

if (!estore.has(settingsPath.forceItalic)) estore.set(settingsPath.forceItalic, false);
if (!estore.has(settingsPath.dispNoItalic)) estore.set(settingsPath.dispNoItalic, false);
if (!estore.has(settingsPath.dispNoMonospace)) estore.set(settingsPath.dispNoMonospace, false);
if (!estore.has(settingsPath.darkMode)) estore.set(settingsPath.darkMode, false);

export interface State {
  previewText: string
  size: number
  italic: boolean
  monospace: boolean
  forceItalic: boolean
  dispNoItalic: boolean
  dispNoMonospace: boolean
  weight: number
  kerning: number
  favoriteOnly: boolean
  darkMode: boolean
  detailFont: FontFamily
  selectedPostscriptIndex: number
  favFonts: string[]
  searchText: string
}

export const store = {
  state: {
    previewText: INIT_PREVIEW,
    size: INIT_SIZE,
    italic: INIT_ITALIC,
    monospace: INIT_MONOSPACE,
    forceItalic: INIT_FORCE_ITALIC,
    dispNoItalic: INIT_DISP_NO_ITALIC,
    dispNoMonospace: INIT_DISP_NO_MONOSPACE,
    weight: INIT_WEIGHT,
    kerning: INIT_KERNING,
    favoriteOnly: INIT_FAV_ONLY,
    darkMode: INIT_DARK_MODE,
    favFonts: [],
    detailFont: {} as FontFamily,
    selectedPostscriptIndex: 0,
    searchText: '',
  } as State,

  getPreviewText(): string {
    return (this.state.previewText === '') ? 'Preview text' : this.state.previewText;
  },
  setPreviewText(previewText: string): void {
    this.state.previewText = (!previewText)
      ? '' : previewText;
  },
  setSize(size: number): void {
    this.state.size = (size < 0 || size > 1000)
      ? INIT_SIZE : size;
  },
  setItalic(italic: boolean): void {
    this.state.italic = italic;
  },
  setMonospace(mono: boolean): void {
    this.state.monospace = mono;
  },
  setForceItalic(forceItalic: boolean): void {
    this.state.forceItalic = forceItalic;
    estore.set(settingsPath.forceItalic, forceItalic);
  },
  setDispNoItalic(dispNoItalic: boolean): void {
    this.state.dispNoItalic = dispNoItalic;
    estore.set(settingsPath.dispNoItalic, dispNoItalic);
  },
  setDispNoMonospace(dispNoMonospace: boolean): void {
    this.state.dispNoMonospace = dispNoMonospace;
    estore.set(settingsPath.dispNoMonospace, dispNoMonospace);
  },
  setWeight(weight: number): void {
    this.state.weight = (weight < 0 || weight > 1000)
      ? INIT_WEIGHT : weight;
  },
  setKerning(kerning: number): void {
    this.state.kerning = kerning;
  },
  setFavoriteOnly(favoriteOnly: boolean): void {
    this.state.favoriteOnly = favoriteOnly;
  },
  setDarkMode(darkMode: boolean): void {
    this.state.darkMode = darkMode;
    estore.set(settingsPath.darkMode, darkMode);
  },
  setDetailFont(detailFont: FontFamily): void {
    this.state.detailFont = detailFont;
  },
  setSelectedPostscriptIndex(index: number): void {
    this.state.selectedPostscriptIndex = index;
  },
  setSearchText(searchText: string): void {
    this.state.searchText = searchText.toLowerCase();
  },
};
