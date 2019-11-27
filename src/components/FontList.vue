<template>
  <div class="font-list">
    <FontDetail
      v-if="showModal"
      :font="moreFont"
      :preview-text="previewText"
      :kerning="kerning"
      @close="closeModal" />
    <Loading v-if="fontArray.length < 1" />
    <div class="fontview-wrapper">
      <FontView
        v-for="(font, i) in targetFontArray"
        :key="font.family"
        :preview-text="previewText"
        :font="font"
        :italic="italic"
        :weight="weight"
        :kerning="kerning"
        @open-detail="openModal(font)"
        @fav="favorite($event, i)" />
    </div>
    <div class="fontview-wrapper" v-if="false">
      <!-- TODO:postscripts view -->
      <FontView
        v-for="(font, i) in targetFontArray"
        :key="font.family"
        :preview-text="previewText"
        :font="font"
        :italic="italic"
        :weight="weight"
        :kerning="kerning"
        @open-detail="openModal(font)"
        @fav="favorite($event, i)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FontView from './FontView.vue';
import FontDetail from './FontDetail.vue';
import Loading from './Loading.vue';
import { IFontDescripter, IFontManager, IFontFamily, IPostscript } from '../type';
import { getFontList, saveFavFonts } from '../fonts';

const fontManager: IFontManager = require('font-manager');

@Component({
  components: {
    FontView,
    FontDetail,
    Loading
  }
})
export default class FontList extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;
  @Prop({ default: false }) private onlyFavs!: boolean;
  private moreFont!: IFontFamily;
  private showModal: boolean = false;

  private weight: number = 400;
  private italic: boolean = false;
  private kerning: number = 0;
  private fontArray: IFontFamily[] = [];
  private rerenderKey = true;

  created() {
    getFontList().then(res => res.map(ff => this.fontArray.push(ff)))
  }

  get targetFontArray() {
    return (this.onlyFavs)? this.fontArray.filter(ff => ff.favorite): this.fontArray;
  }

  openModal(font: IFontFamily) {
    this.moreFont = font;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  favorite(v: boolean, i: number) {
    this.fontArray[i].favorite = v;
    saveFavFonts(this.fontArray);
  }
}
</script>

<style lang="scss" scoped>
.font-list {
  .fontview-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: flex-start;

    font-synthesis: none;

    .font-view {
      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: auto;;
    }
  }
}
</style>