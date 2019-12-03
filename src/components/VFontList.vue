<template>
  <div class="font-list">
    <v-dialog v-model="showModal" max-width="600">
      <v-font-detail-card />
    </v-dialog><!-- 
    <v-container fluid>
      <v-row
        dense>
        <v-col
          cols="12"
          :sm="colCalc('sm', textLength)"
          :md="colCalc('md', textLength)"
          :lg="colCalc('lg', textLength)"
          :xl="colCalc('xl', textLength)"
          dense
          v-for="(font) in targetFontArray"
          :key="font.family">
          <v-font-card
            :font="font"
            @open-modal="showModal = true" />
        </v-col>
      </v-row>
    </v-container> -->
    <v-container fluid class="d-flex flex-wrap justify-space-around align-strech">
      <v-font-card
        v-for="(font) in targetFontArray"
        :key="font.family"
        :font="font"
        @open-modal="showModal = true" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VFontCard from './VFontCard.vue';
import VFontDetailCard from './VFontDetailCard.vue';
import { IFontDescripter, IFontManager, IFontFamily, IPostscript } from '../type';
import { getFontList, saveFavFonts } from '../fonts';
import { IState, store } from '../store';

const fontManager: IFontManager = require('font-manager');

@Component({
  components: {
    VFontCard,
    VFontDetailCard
  }
})
export default class VFontList extends Vue {
  private fontArray: IFontFamily[] = [];
  private showModal: boolean = false;
  private state: IState = store.state;

  created() {
    getFontList().then(res => res.map(ff => this.fontArray.push(ff)))
  }

  get targetFontArray() {
    return (this.state.favoriteOnly)? this.fontArray.filter(ff => ff.favorite): this.fontArray;
  }

  get textLength() {
    return encodeURIComponent(this.state.previewText).replace(/%../g,"x").length;
  }

  colCalc(size: string, num: number): number {
    switch (size) {
      case 'sm':
        if (num > 15) return 12;
        else return 6;
      case 'md':
        if (num > 30) return 12;
        if (num > 15) return 6;
        else return 4;
      case 'lg':
        if (num > 35) return 12;
        if (num > 25) return 6;
        if (num > 15) return 4;
        else return 3;
      case 'xl':
        if (num > 60) return 12;
        if (num > 40) return 6;
        if (num > 30) return 4;
        if (num > 15) return 3;
        else return 2;
    }
    return 12;
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