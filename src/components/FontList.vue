<template>
  <div class="font-list">
    <FontDetail
      v-if="showModal"
      :font="moreFont"
      @close="closeModal" />
    <FontView
      v-for="font in fontArray"
      :key="font.family"
      :previewText="previewText"
      :font="font"
      :italic="italic"
      :weight="weight"
      :kerning="kerning"
      @click="openModal(font)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FontView from './FontView.vue';
import FontDetail from './FontDetail.vue';

// font-manager interface
interface IFontDescripter {
  path: string;
  postscriptName: string;
  family: string;
  style: string;
  weight: number;
  width: number;
  italic: boolean;
  monospace: boolean;
}
interface IFontManager {
  getAvailableFonts(callback: Function): void;
  getAvailableFontsSync(): Array<IFontDescripter>;
}
interface IPostscirpt {
  name: string;
  italic: boolean;
  monospace: boolean;
  style: string;
  weight: number;
  width: number;
}
interface IFontFamily {
  family: string;
  favorite: boolean;
  postscripts: Array<IPostscirpt>;
}
const fontManager = require('font-manager');

@Component({
  components: {
    FontView,
    FontDetail
  }
})
export default class FontList extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;
  private moreFont!: IFontFamily;
  private showModal: boolean = false;

  private weight: number = 400;
  private italic: boolean = false;
  private kerning: number = 0;

  openModal(font: IFontFamily) {
    this.moreFont = font;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  get fontList() {
    const _fontlist = [
      // 重複削除
      ...new Map(
        // フォント一覧取得
        (fontManager.getAvailableFontsSync() as Array<IFontDescripter>)
        .sort((a: IFontDescripter, b: IFontDescripter) => ((a.postscriptName < b.postscriptName)? -1: 1))
        .map(fd => [fd.postscriptName, fd])
      ).values()
    ];
    return _fontlist;
  }

  get fontArray(): Array<IFontFamily> {
    return this.fontList.reduce((arr, fd) => {
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
            } as IPostscirpt
          ]
        })
      } else {
        arr[i].postscripts.push({
          name: fd.postscriptName,
          italic: fd.italic,
          monospace: fd.monospace,
          style: fd.style,
          weight: fd.weight,
          width: fd.width
        } as IPostscirpt)
      }
      return arr;
    }, [] as Array<IFontFamily>).map(f => {
      f.postscripts = f.postscripts.sort((p1, p2) => (p1.weight > p2.weight)? 1: -1);
      return f;
    });
  }
}
</script>

<style lang="scss" scoped>
.font-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: flex-start;

  .font-view {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;;
  }
}
</style>