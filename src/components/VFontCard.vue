<template>
  <v-card
    class="ma-1"
    tile
    outlined
    v-if="isDisp">
    <v-card-title
      ref="mainPreview"
      :style="style"
      @click.self.stop="setDetailFont">
      {{ previewText }}
      <v-spacer></v-spacer>
      <v-btn-toggle dense group v-model="favorite">
        <v-btn text icon title="favorite">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-card-subtitle :class="{ 'pb-2': !displayWarn, 'pb-0': displayWarn }">
      {{ font.family }}
      <v-copy-btn :copy-text="font.family" />
    </v-card-subtitle>
    <v-card-text v-if="displayWarn" class="pb-2">
      <v-alert
        v-if="hasNoItalicAndOblique"
        class="ma-0 caption"
        type="warning"
        dense
        outlined
        tile>This font has no italic.</v-alert>
      <v-alert
        v-if="hasNoMonospace"
        class="ma-0 caption mt-1"
        type="warning"
        dense
        outlined
        tile>This font has no monospace.</v-alert>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IFontFamily, IPostscript } from '../type';
import VCopyBtn from './VCopyBtn.vue';
import { IState, store } from '../store';
import { getFavFont, saveFavFonts } from '../fonts';

@Component({
  components: {
    VCopyBtn
  }
})
export default class VFontCard extends Vue {
  @Prop() private font!: IFontFamily;

  private state: IState = store.state;
  private favorite: number | null | undefined = getFavFont(this.font.family)? 0: null;

  mounted() {
    const previewElem = this.$refs.mainPreview;
    if (previewElem instanceof HTMLElement && previewElem.style.fontFamily === '') {
      previewElem.style.fontFamily = `"${this.font.altFamilyName}"` || '';
    }
  }

  setDetailFont() {
    store.setDetailFont(this.font);
    store.setSelectedPostscriptIndex(this.selectedPostscriptIndex);
    this.$emit('open-modal');
  }

  get isDisp() {
    return this.isDispForFavorite && (this.isDispForItalic || !this.hasNoItalicAndOblique) && (this.isDispForMonospace || this.hasMonospace) && this.isSearched;
  }
  get isDispForFavorite() { return !this.state.favoriteOnly || this._favorite; }
  get isDispForItalic() { return !this.state.italic || this.state.forceItalic || !this.state.dispNoItalic; }
  get isDispForMonospace() { return !this.state.monospace || !this.state.dispNoMonospace; }
  get isSearched() {
    return this.font.family.toLowerCase().includes(this.state.searchText);
  }
  get hasMonospace() {
    return this.font.postscripts.findIndex(ps => ps.monospace) >= 0;
  }
  get hasNoMonospace() {
    return this.state.monospace && !this.hasMonospace;
  }
  get hasNoItalicAndOblique() {
    return this.state.italic && !this.hasItalic && !this.hasOblique;
  }
  get displayWarn() {
    return this.hasNoMonospace || this.hasNoItalicAndOblique;
  }
  get hasItalic() {
    return this.font.postscripts.findIndex(ps => ps.italic) >= 0;
  }
  get hasOblique() {
    return this.font.postscripts.findIndex(ps => ps.style.toLowerCase().includes('oblique')) >= 0;
  }
  psHasItalic(ps: IPostscript) {
    return ps.italic || ps.style.toLowerCase().includes('oblique');
  }
  get hasWeights() {
    return this.font.postscripts.map(ps => ps.weight);
  }
  hasWeightPostscriptIndex(weight: number) {
    const res = this.font.postscripts.findIndex(ps => {
      return ps.weight === weight &&
        (this.isDispForMonospace || ps.monospace) &&
        (
          (this.state.italic && this.psHasItalic(ps)) ||
          (!this.state.italic && !this.psHasItalic(ps))
        );
    });
    if (res >= 0) return res;
    return this.font.postscripts.findIndex(ps => {
      return ps.weight === weight && (this.isDispForMonospace || ps.monospace);
    });
  }
  get selectedPostscriptIndex() {
    const target = Math.floor(this.state.weight);
    if (500<=target) {
      // bold
      for (let weight = target; weight <= 1000; weight++) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight > 0; weight--) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    } else if (400<=target) {
      // regular
      for (let weight = target; weight <= 500; weight++) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight > 0; weight--) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = 500; weight <= 1000; weight++) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    } else if (target<400) {
      // light
      for (let weight = target; weight > 0; weight--) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight <= 1000; weight++) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    }
    // fallback
    return 0;
  }
  get selectedPostscript() { return this.font.postscripts[this.selectedPostscriptIndex]; }
  get fontStyle() {
    return (this.state.forceItalic)? 'italic':
      (this.selectedPostscript.italic)? 'italic':
        (this.selectedPostscript.style.toLowerCase().includes('oblique'))? 'oblique':
          'normal';
  }

  get style() {
    return {
      fontSize: `${this.state.size}pt`,
      fontFamily: this.font.family,
      fontWeight: this.selectedPostscript.weight,
      fontStyle: (this.state.italic)? this.fontStyle: 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size+4}pt`,
      cursor: 'pointer'
    };
  }

  get previewText() {
    return store.getPreviewText();
  }

  get _favorite() {
    return this.favorite === 0;
  }

  @Watch('favorite')
  setFavorite() {
    saveFavFonts(this.font.family, this._favorite);
  }
}
</script>

<style lang="scss" scoped>
</style>