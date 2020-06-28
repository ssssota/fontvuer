<template>
  <v-card max-width="600">
    <v-card-title>
      {{ state.detailFont.family }}
      <v-copy-btn :copy-text="state.detailFont.family" />
    </v-card-title>
    <v-card-text>
      <v-radio-group
        v-if="state.detailFont.postscripts.length > 1"
        v-model="selectedPostscriptIndex"
        row dense>
        <v-radio
          v-for="(ps, i) in state.detailFont.postscripts"
          :key="ps.name"
          :label="ps.style"
          :value="i">
        </v-radio>
      </v-radio-group>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
    if (
      this.selectedPostscriptIndex == null ||
      this.state.detailFont.postscripts.length <= 1 ||
      this.state.detailFont.postscripts.length <= this.selectedPostscriptIndex
    ) return this.state.detailFont.postscripts[0];
    return this.state.detailFont.postscripts[this.selectedPostscriptIndex];
  }
  get previewText() {
    return store.getPreviewText();
  }
  get fontStyle() {
    return (this.selectedPostscript.italic)? 'italic':
      (this.selectedPostscript.style.toLowerCase().includes('oblique'))? 'oblique':
      'normal';
  }

  get style() {
    return {
      padding: '16px',
      fontSize: `${this.state.size}px`,
      fontFamily: this.state.detailFont.family,
      fontStyle: this.fontStyle,
      fontWeight: this.selectedPostscript.weight,
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size+4}px`
    };
  }

  boolToYenNo(val: boolean): string {
    return val? 'Yes': 'No';
  }

  @Watch('state.detailFont')
  onChangeFont() {
    this.$nextTick(() => {
      this.selectedPostscriptIndex = 0;
    });
  }
}
</script>
