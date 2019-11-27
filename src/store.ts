export default class Store {
  private _previewText!: string
  private _italic!: boolean
  private _weight!: number
  debug: boolean

  constructor(_debug: boolean = false) {
    this.debug = _debug
  }

  get previewText() {
    return this._previewText
  }
  set previewText(val) {
    if (val === '' || typeof val !== 'string') val = 'Preview text'
    if (this.debug) console.log('Preview text →', val)
    this._previewText = val
  }

  get italic() {
    return this._italic
  }
  set italic(val) {
    val = !!val
    if (this.debug) console.log('Italic →', val)
    this._italic = val
  }

  get weight() {
    return this._weight
  }
  set weight(val) {
    if (typeof val !== "number" || val < 0 || 1000 < val) val = 500
    if (this.debug) console.log('Weight →', val)
    this._weight = val
  }
}