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
          <v-icon>{{ icons.mdiStar }}</v-icon>
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
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { mdiStar } from '@mdi/js';
import { FontFamily, Postscript } from '../types';
import VCopyBtn from './VCopyBtn.vue';
import { State, store } from '../store';
import { isFavFont, saveFavFonts } from '../fonts';

@Component({
  components: {
    VCopyBtn,
  },
})
export default class VFontCard extends Vue {
  @Prop() private font!: FontFamily;

  private state: State = store.state;

  private favorite: number | null = isFavFont(this.font.family) ? 0 : null;

  private icons = { mdiStar };

  static psHasItalic(ps: Postscript): boolean {
    return ps.italic || ps.style.toLowerCase().includes('oblique');
  }

  // eslint-disable-next-line class-methods-use-this
  get previewText(): string {
    return store.getPreviewText();
  }

  mounted(): void {
    const previewElem = this.$refs.mainPreview;
    if (previewElem instanceof HTMLElement && previewElem.style.fontFamily === '') {
      previewElem.style.fontFamily = `"${this.font.altFamilyName}"` || '';
    }
  }

  setDetailFont(): void {
    store.setDetailFont(this.font);
    store.setSelectedPostscriptIndex(this.selectedPostscriptIndex);
    this.$emit('open-modal');
  }

  get isDisp(): boolean {
    return this.isDispForFavorite
      && (this.isDispForItalic || !this.hasNoItalicAndOblique)
      && (this.isDispForMonospace || this.hasMonospace)
      && this.isSearched;
  }

  get isDispForFavorite(): boolean { return !this.state.favoriteOnly || this.isFavorite; }

  get isDispForItalic(): boolean {
    return !this.state.italic || this.state.forceItalic || !this.state.dispNoItalic;
  }

  get isDispForMonospace(): boolean { return !this.state.monospace || !this.state.dispNoMonospace; }

  get isSearched(): boolean {
    return this.font.family.toLowerCase().includes(this.state.searchText);
  }

  get hasMonospace(): boolean {
    return this.font.postscripts.findIndex((ps) => ps.monospace) >= 0;
  }

  get hasNoMonospace(): boolean {
    return this.state.monospace && !this.hasMonospace;
  }

  get hasNoItalicAndOblique(): boolean {
    return this.state.italic && !this.hasItalic && !this.hasOblique;
  }

  get displayWarn(): boolean {
    return this.hasNoMonospace || this.hasNoItalicAndOblique;
  }

  get hasItalic(): boolean {
    return this.font.postscripts.findIndex((ps) => ps.italic) >= 0;
  }

  get hasOblique(): boolean {
    return this.font.postscripts.findIndex((ps) => ps.style.toLowerCase().includes('oblique')) >= 0;
  }

  get hasWeights(): number[] {
    return this.font.postscripts.map((ps) => ps.weight);
  }

  hasWeightPostscriptIndex(weight: number): number {
    const res = this.font.postscripts.findIndex((ps) => ps.weight === weight
      && (this.isDispForMonospace || ps.monospace)
      && (
        (this.state.italic && VFontCard.psHasItalic(ps))
        || (!this.state.italic && !VFontCard.psHasItalic(ps))
      ));
    if (res >= 0) return res;
    return this.font.postscripts.findIndex((ps) => ps.weight === weight
      && (this.isDispForMonospace || ps.monospace));
  }

  get selectedPostscriptIndex(): number {
    const target = Math.floor(this.state.weight);
    if (target >= 500) {
      // bold
      for (let weight = target; weight <= 1000; weight += 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight > 0; weight -= 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    } else if (target >= 400) {
      // regular
      for (let weight = target; weight <= 500; weight += 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight > 0; weight -= 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = 500; weight <= 1000; weight += 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    } else if (target < 400) {
      // light
      for (let weight = target; weight > 0; weight -= 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
      for (let weight = target; weight <= 1000; weight += 1) {
        const index = this.hasWeightPostscriptIndex(weight);
        if (index >= 0) return index;
      }
    }
    // fallback
    return 0;
  }

  get selectedPostscript(): Postscript {
    return this.font.postscripts[this.selectedPostscriptIndex];
  }

  get fontStyle(): string {
    if (this.state.forceItalic || this.selectedPostscript.italic) return 'italic';
    return (this.selectedPostscript.style.toLowerCase().includes('oblique'))
      ? 'oblique'
      : 'normal';
  }

  get style(): Record<string, unknown> {
    return {
      fontSize: `${this.state.size}pt`,
      fontFamily: this.font.family,
      fontWeight: this.selectedPostscript.weight,
      fontStyle: (this.state.italic) ? this.fontStyle : 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size + 4}pt`,
      cursor: 'pointer',
    };
  }

  get isFavorite(): boolean {
    return this.favorite === 0;
  }

  @Watch('favorite')
  setFavorite(): void {
    saveFavFonts(this.font.family, this.isFavorite);
  }
}
</script>

<style lang="scss" scoped>
</style>
