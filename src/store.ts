import { IFontFamily } from './type';

export interface IState {
  previewText: string
  size: number
  italic: boolean
  weight: number
  kerning: number
  favoriteOnly: boolean
  detailFont: IFontFamily
  favFonts: string[]
}

export const store = {
  debug: process.env.NODE_ENV !== 'production',
  state: {
    previewText: 'fontvuer',
    size: 16,
    italic: false,
    weight: 400,
    kerning: 0,
    favoriteOnly: false,
    favFonts: [],
    detailFont: {} as IFontFamily
  } as IState,

  getPreviewText() {
    return (this.state.previewText === '')? 'Preview text': this.state.previewText;
  },
  setPreviewText(_previewText: string) {
    if (_previewText === '' || typeof _previewText !== 'string') _previewText = ''
    if (this.debug) console.log('Preview text →', _previewText)
    this.state.previewText = _previewText
  },
  setItalic(_italic: boolean) {
    _italic = !!_italic
    if (this.debug) console.log('Italic →', _italic)
    this.state.italic = _italic
  },
  setWeight(_weight: number) {
    if (typeof _weight !== "number" || _weight < 0 || 1000 < _weight) _weight = 500
    if (this.debug) console.log('Weight →', _weight)
    this.state.weight = _weight
  },
  setKerning(_kerning: number) {
    if (typeof _kerning !== "number") _kerning = 0
    if (this.debug) console.log('Weight →', _kerning)
    this.state.kerning = _kerning
  },
  setFavoriteOnly(_favoriteOnly: boolean) {
    _favoriteOnly = !!_favoriteOnly
    if (this.debug) console.log('Favorite only →', _favoriteOnly)
    this.state.favoriteOnly = _favoriteOnly
  },
  setDetailFont(_detailFont: IFontFamily) {
    if (this.debug) console.log('Detail font →', _detailFont.family)
    this.state.detailFont = _detailFont
  }
}