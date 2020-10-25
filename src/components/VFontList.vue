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
import { Component, Vue } from 'vue-property-decorator';
import VFontCard from './VFontCard.vue';
import VFontDetailCard from './VFontDetailCard.vue';
import { getFontListFromManager } from '../fonts';
import { State, store } from '../store';
import { FontFamily } from '../types';

@Component({
  components: {
    VFontCard,
    VFontDetailCard,
  },
})
export default class VFontList extends Vue {
  private fontArray: FontFamily[] = [];

  private showModal = false;

  private state: State = store.state;

  created(): void {
    getFontListFromManager()
      .then((res) => { this.fontArray = res; })
      .catch(console.error);
  }

  get targetFontArray(): FontFamily[] {
    return this.fontArray;
  }
}
</script>
