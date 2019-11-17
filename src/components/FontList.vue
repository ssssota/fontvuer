<template>
  <div class="font-list">
    <FontView
      v-for="font in fontArray"
      :key="font.family"
      :previewText="previewText"
      :font="font" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FontView from './FontView.vue';

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
  postscripts: Array<IPostscirpt>;
}
const fontManager = require('font-manager');

@Component({
  components: {
    FontView
  }
})
export default class FontList extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;
  test:string ='';

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
    }, [] as Array<IFontFamily>);
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