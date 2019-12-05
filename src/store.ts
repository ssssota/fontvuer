import { IFontFamily } from './type';
import Store from 'electron-store';

const estore = new Store();

const INIT_SIZE = 32
const INIT_WEIGHT = 400
const INIT_KERNING = 0
const INIT_ITALIC = false
const INIT_FORCE_ITALIC = estore.get('settings.forceItalic')
const INIT_PREVIEW = 'fontvuer'
const INIT_FAV_ONLY = false

if (!INIT_FORCE_ITALIC) estore.set('settings.forceItalic', false)

export interface IState {
  previewText: string
  size: number
  italic: boolean
  forceItalic: boolean
  weight: number
  kerning: number
  favoriteOnly: boolean
  detailFont: IFontFamily
  favFonts: string[]
}

export const store = {
  debug: process.env.NODE_ENV !== 'production',
  state: {
    previewText: INIT_PREVIEW,
    size: INIT_SIZE,
    italic: INIT_ITALIC,
    forceItalic: INIT_FORCE_ITALIC,
    weight: INIT_WEIGHT,
    kerning: INIT_KERNING,
    favoriteOnly: INIT_FAV_ONLY,
    favFonts: [],
    detailFont: {} as IFontFamily
  } as IState,

  getPreviewText() {
    return (this.state.previewText === '')? 'Preview text': this.state.previewText;
  },
  setPreviewText(_previewText: string) {
    if (_previewText === '' || typeof _previewText !== 'string') _previewText = ''
    //if (this.debug) console.log('Preview text →', _previewText)
    this.state.previewText = _previewText
  },
  setSize(_size: number) {
    if (typeof _size !== "number" || _size < 0 || 1000 < _size) _size = INIT_SIZE
    //if (this.debug) console.log('Size →', _size)
    this.state.size = _size
  },
  setItalic(_italic: boolean) {
    _italic = !!_italic
    //if (this.debug) console.log('Italic →', _italic)
    this.state.italic = _italic
  },
  setForceItalic(_forceItalic: boolean) {
    //if (this.debug) console.log('Force italic →', _forceItalic)
    this.state.forceItalic = _forceItalic
  },
  setWeight(_weight: number) {
    if (typeof _weight !== "number" || _weight < 0 || 1000 < _weight) _weight = INIT_WEIGHT
    //if (this.debug) console.log('Weight →', _weight)
    this.state.weight = _weight
  },
  setKerning(_kerning: number) {
    if (typeof _kerning !== "number") _kerning = INIT_KERNING
    //if (this.debug) console.log('Kerning →', _kerning)
    this.state.kerning = _kerning
  },
  setFavoriteOnly(_favoriteOnly: boolean) {
    _favoriteOnly = !!_favoriteOnly
    //if (this.debug) console.log('Favorite only →', _favoriteOnly)
    this.state.favoriteOnly = _favoriteOnly
  },
  setDetailFont(_detailFont: IFontFamily) {
    //if (this.debug) console.log('Detail font →', _detailFont.family)
    this.state.detailFont = _detailFont
  }
}