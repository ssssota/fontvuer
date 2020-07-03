<template>
  <v-card
    tile
    elevation="0"
    min-height="100%">
    <v-dialog v-model="showModal" max-width="600">
      <v-font-detail-card />
    </v-dialog>
    <v-container fluid class="d-flex flex-wrap">
      <v-font-card
        v-for="(font) in targetFontArray"
        :key="font.family"
        :font="font"
        class="flex-grow-1 flex-shrink-0"
        @open-modal="showModal = true" />
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VFontCard from './VFontCard.vue';
import VFontDetailCard from './VFontDetailCard.vue';
import { IFontDescripter, IFontManager, FontFamily, IPostscript } from '../type';
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
  private fontArray: FontFamily[] = [];
  private showModal: boolean = false;
  private state: IState = store.state;

  created() {
    getFontList().then(res => res.map(ff => this.fontArray.push(ff)));
  }

  get targetFontArray() {
    return this.fontArray;
  }
}
</script>
