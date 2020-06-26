<template>
  <v-card
    class="ma-1"
    tile
    outlined
    v-if="isDisp">
    <v-card-title
      :style="style"
      @click.self.stop="setDetailFont">
      {{ previewText }}
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn-toggle dense group v-model="favorite">
            <v-btn text icon v-on="on">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
        <span>Favorite</span>
      </v-tooltip>
    </v-card-title>
    <v-card-subtitle :class="{'pb-0':hasNoItalicAndOblique}">
      {{ font.family }}
      <v-copy-btn :copy-text="font.family" />
    </v-card-subtitle>
    <v-card-text>
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
import { IFontFamily, IPostscript } from '../type'
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

  setDetailFont() {
    store.setDetailFont(this.font);
    this.$emit('open-modal');
  }

  get isDisp() {
    return this.isDispForFavorite && this.isDispForItalic && this.isDispForMonospace && this.isSearched;
  }
  get isDispForFavorite() { return !this.state.favoriteOnly || this._favorite; }
  get isDispForItalic() { return !this.state.italic || this.state.forceItalic || !this.state.dispNoItalic || !this.hasNoItalicAndOblique; }
  get isDispForMonospace() { return !this.state.monospace || this.hasMonospace || !this.state.dispNoMonospace; }
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
  get hasItalic() {
    return this.font.postscripts.findIndex(ps => ps.italic) >= 0;
  }
  get hasOblique() {
    return this.font.postscripts.findIndex(ps => ps.style.toLowerCase().includes('oblique')) >= 0;
  }
  get hasWeights() {
    return this.font.postscripts.map(ps => ps.weight)
  }
  hasWeight(weight: number) {
    return this.font.postscripts.findIndex(ps => {
      return ps.weight === weight && (!this.isDispForItalic || ps.italic) && (!this.isDispForMonospace || ps.monospace);
    }) >= 0;
  }
  weight(target: number) {
    target = Math.floor(target)
    switch (true) {
      case 500<=target:
        for (let weight = target; weight <= 1000; weight++) {
          if (this.hasWeight(weight)) return weight;
        }
        for (let weight = target; weight > 0; weight--) {
          if (this.hasWeight(weight)) return weight;
        }
        break;
      case 400<=target:
        for (let weight = target; weight <= 500; weight++) {
          if (this.hasWeight(weight)) return weight;
        }
        for (let weight = target; weight > 0; weight--) {
          if (this.hasWeight(weight)) return weight;
        }
        for (let weight = 500; weight <= 1000; weight++) {
          if (this.hasWeight(weight)) return weight;
        }
        break;
      case target<400:
        for (let weight = target; weight > 0; weight--) {
          if (this.hasWeight(weight)) return weight;
        }
        for (let weight = target; weight <= 1000; weight++) {
          if (this.hasWeight(weight)) return weight;
        }
        break;
    }
    return this.font.postscripts[0].weight;
  }

  get style() {
    const fontStyle =
      (this.state.forceItalic)? 'italic':
      (this.hasItalic)? 'italic':
      (this.hasOblique)? 'oblique':
      'normal';

    return {
      fontSize: `${this.state.size}px`,
      fontFamily: this.font.family,
      fontWeight: this.weight(this.state.weight),
      fontStyle: (this.state.italic)? fontStyle: 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size+4}px`,
      cursor: 'pointer'
    }
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