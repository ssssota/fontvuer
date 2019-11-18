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
import { IFontDescripter, IFontManager, IFontFamily, IPostscript } from '../type';

const fontManager: IFontManager = require('font-manager');

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
    return [
      // 重複削除
      ...new Map(
        // フォント一覧取得
        (fontManager.getAvailableFontsSync() as IFontDescripter[])
        .sort((a: IFontDescripter, b: IFontDescripter) => ((a.postscriptName < b.postscriptName)? -1: 1))
        .map(fd => [fd.postscriptName, fd])
      ).values()
    ];
  }

  get fontArray(): IFontFamily[] {
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
            } as IPostscript
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
        } as IPostscript)
      }
      return arr;
    }, [] as IFontFamily[]).map(f => {
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