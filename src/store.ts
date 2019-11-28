import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Store extends Vue {
  private _previewText: string = 'fontvuer'
  private _italic: boolean = false
  private _weight: number = 400
  debug: boolean = process.env.NODE_ENV !== 'production';

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