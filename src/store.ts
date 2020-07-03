import { FontFamily } from './type';
import Store from 'electron-store';

const estore = new Store();

const settingsPath = {
  altFamilyNameFirst: 'settings.altFamilyNameFirst',
  forceItalic: 'settings.forceItalic',
  dispNoItalic: 'settings.dispNoItalic',
  dispNoMonospace: 'settings.dispNoItalic',
  darkMode: 'settings.darkMode'
};

const INIT_SIZE = 24;
const INIT_WEIGHT = 400;
const INIT_KERNING = 0;
const INIT_ITALIC = false;
const INIT_MONOSPACE = false;
const INIT_ALT_FAMILY_NAME_FIRST = estore.get(settingsPath.altFamilyNameFirst, false);
const INIT_FORCE_ITALIC = estore.get(settingsPath.forceItalic, false);
const INIT_DISP_NO_ITALIC = estore.get(settingsPath.dispNoItalic, false);
const INIT_DISP_NO_MONOSPACE = estore.get(settingsPath.dispNoMonospace, false);
const INIT_PREVIEW = 'fontvuer';
const INIT_FAV_ONLY = false;
const INIT_DARK_MODE = estore.get(settingsPath.darkMode, false);

if (!estore.has(settingsPath.altFamilyNameFirst)) estore.set(settingsPath.altFamilyNameFirst, false);
if (!estore.has(settingsPath.forceItalic)) estore.set(settingsPath.forceItalic, false);
if (!estore.has(settingsPath.dispNoItalic)) estore.set(settingsPath.dispNoItalic, false);
if (!estore.has(settingsPath.dispNoMonospace)) estore.set(settingsPath.dispNoMonospace, false);
if (!estore.has(settingsPath.darkMode)) estore.set(settingsPath.darkMode, false);

export interface IState {
  previewText: string
  size: number
  italic: boolean
  monospace: boolean
  altFamilyNameFirst: boolean
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
  debug: process.env.NODE_ENV !== 'production',
  state: {
    previewText: INIT_PREVIEW,
    size: INIT_SIZE,
    italic: INIT_ITALIC,
    monospace: INIT_MONOSPACE,
    altFamilyNameFirst: INIT_ALT_FAMILY_NAME_FIRST,
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
    searchText: ''
  } as IState,

  getPreviewText() {
    return (this.state.previewText === '')? 'Preview text': this.state.previewText;
  },
  setPreviewText(_previewText: string) {
    if (_previewText === '' || typeof _previewText !== 'string') _previewText = '';
    //if (this.debug) console.log('Preview text →', _previewText);
    this.state.previewText = _previewText;
  },
  setSize(_size: number) {
    if (typeof _size !== 'number' || _size < 0 || 1000 < _size) _size = INIT_SIZE;
    //if (this.debug) console.log('Size →', _size);
    this.state.size = _size;
  },
  setItalic(_italic: boolean) {
    _italic = !!_italic;
    //if (this.debug) console.log('Italic →', _italic);
    this.state.italic = _italic;
  },
  setMonospace(_mono: boolean) {
    _mono = !!_mono;
    //if (this.debug) console.log('Monospace →', _mono);
    this.state.monospace = _mono;
  },
  setAltFamilyNameFirst(_altFamilyNameFirst: boolean) {
    if (this.debug) console.log('Alt family name first →', _altFamilyNameFirst);
    this.state.altFamilyNameFirst = _altFamilyNameFirst;
    estore.set(settingsPath.altFamilyNameFirst, _altFamilyNameFirst);
  },
  setForceItalic(_forceItalic: boolean) {
    //if (this.debug) console.log('Force italic →', _forceItalic);
    this.state.forceItalic = _forceItalic;
    estore.set(settingsPath.forceItalic, _forceItalic);
  },
  setDispNoItalic(_dispNoItalic: boolean) {
    //if (this.debug) console.log('Display no italic →', _dispNoItalic);
    this.state.dispNoItalic = _dispNoItalic;
    estore.set(settingsPath.dispNoItalic, _dispNoItalic);
  },
  setDispNoMonospace(_dispNoMonospace: boolean) {
    //if (this.debug) console.log('Display no monospace →', _dispNoMonospace);
    this.state.dispNoMonospace = _dispNoMonospace;
    estore.set(settingsPath.dispNoMonospace, _dispNoMonospace);
  },
  setWeight(_weight: number) {
    if (typeof _weight !== 'number' || _weight < 0 || 1000 < _weight) _weight = INIT_WEIGHT;
    //if (this.debug) console.log('Weight →', _weight);
    this.state.weight = _weight;
  },
  setKerning(_kerning: number) {
    if (typeof _kerning !== 'number') _kerning = INIT_KERNING;
    //if (this.debug) console.log('Kerning →', _kerning);
    this.state.kerning = _kerning;
  },
  setFavoriteOnly(_favoriteOnly: boolean) {
    _favoriteOnly = !!_favoriteOnly;
    //if (this.debug) console.log('Favorite only →', _favoriteOnly);
    this.state.favoriteOnly = _favoriteOnly;
  },
  setDarkMode(_darkMode: boolean) {
    _darkMode = !!_darkMode;
    //if (this.debug) console.log('Dark mode →', _darkMode);
    this.state.darkMode = _darkMode;
    estore.set(settingsPath.darkMode, _darkMode);
  },
  setDetailFont(_detailFont: FontFamily) {
    //if (this.debug) console.log('Detail font →', _detailFont.family);
    this.state.detailFont = _detailFont;
  },
  setSelectedPostscriptIndex(_index: number) {
    if (typeof _index !== 'number') _index = 0;
    //if (this.debug) console.log('Postscript index →', _index);
    this.state.selectedPostscriptIndex = _index;
  },
  setSearchText(_searchText: string) {
    //if (this.debug) console.log('Search text →', _searchText);
    this.state.searchText = _searchText.toLowerCase();
  }
};