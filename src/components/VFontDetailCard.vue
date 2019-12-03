<template>
  <v-card max-width="600">
    <v-card-title>
      {{ state.detailFont.family }}
      <v-copy-btn :copy-text="state.detailFont.family" />
    </v-card-title>
    <v-card-text>
      <v-btn-toggle
        mandatory
        v-model="selectedPostscriptIndex"
        v-if="state.detailFont.postscripts.length > 1">
        <v-btn
          x-small
          dense
          v-for="(ps, i) in state.detailFont.postscripts"
          :key="ps.name"
          :value="i">
          {{ ps.style }}
        </v-btn>
      </v-btn-toggle>
      <h3 :style="style">{{ previewText }}</h3>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Postscript name</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Italic support</v-list-item-title>
          <v-list-item-subtitle>
            {{ boolToYenNo(selectedPostscript.italic) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Font weight</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.weight }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Font width</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.width }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Monospace support</v-list-item-title>
          <v-list-item-subtitle>
            {{ boolToYenNo(selectedPostscript.monospace) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VCopyBtn from './VCopyBtn.vue';
import { IFontFamily, IPostscript } from '../type';
import { IState, store } from '../store';

@Component({
  components: {
    VCopyBtn
  }
})
export default class VFontDetailCard extends Vue {
  private state: IState = store.state;
  private copyMessage: string = 'Copy';
  private selectedPostscriptIndex: number = 0;

  get selectedPostscript() {
    if (this.state.detailFont.postscripts.length <= 1) return this.state.detailFont.postscripts[0]
    return this.state.detailFont.postscripts[this.selectedPostscriptIndex]
  }
  get previewText() {
    return store.getPreviewText();
  }

  get style() {
    const fontStyle =
      (this.selectedPostscript.italic)? 'italic':
      (this.selectedPostscript.style.toLowerCase().includes('oblique'))? 'oblique':
      'normal';

    return {
      margin: '0.5em',
      fontSize: `${this.state.size}px`,
      fontFamily: this.state.detailFont.family,
      fontStyle: fontStyle,
      fontWeight: this.selectedPostscript.weight,
      fontKerning: `${this.state.kerning}em`
    };
  }

  boolToYenNo(val: boolean): string {
    return val? 'Yes': 'No';
  }
}
</script>