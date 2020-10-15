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
      <h3 :style="style" ref="mainPreview">{{ previewText }}</h3>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Postscript name</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.name }}
            <v-copy-btn :copy-text="selectedPostscript.name" />
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
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import VCopyBtn from './VCopyBtn.vue';
import { IFontFamily, IPostscript } from '../type';
import { IState, store } from '../store';

@Component({
  components: {
    VCopyBtn,
  },
})
export default class VFontDetailCard extends Vue {
  private state: IState = store.state;

  private copyMessage = 'Copy';

  private selectedPostscriptIndex = 0;

  get selectedPostscript() {
    if (
      this.selectedPostscriptIndex == null
      || this.state.detailFont.postscripts.length <= 1
      || this.state.detailFont.postscripts.length <= this.selectedPostscriptIndex
    ) return this.state.detailFont.postscripts[0];
    return this.state.detailFont.postscripts[this.selectedPostscriptIndex];
  }

  get previewText() {
    return store.getPreviewText();
  }

  get fontStyle() {
    return (this.selectedPostscript.italic) ? 'italic'
      : (this.selectedPostscript.style.toLowerCase().includes('oblique')) ? 'oblique'
        : 'normal';
  }

  get style() {
    return {
      padding: '16px',
      fontSize: `${this.state.size}pt`,
      fontFamily: this.state.detailFont.family,
      fontStyle: this.fontStyle,
      fontWeight: this.selectedPostscript.weight,
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size + 4}px`,
    };
  }

  boolToYenNo(val: boolean): string {
    return val ? 'Yes' : 'No';
  }

  @Watch('state.detailFont')
  async onChangeFont() {
    await this.$nextTick();
    this.selectedPostscriptIndex = this.state.selectedPostscriptIndex;
    await this.$nextTick();
    const previewElem = this.$refs.mainPreview;
    if (
      previewElem instanceof HTMLElement
      && previewElem.style.fontFamily
      && previewElem.style.fontFamily.replace(/(?:^"|"$)/g, '') !== this.state.detailFont.family
    ) {
      previewElem.style.fontFamily = `"${this.state.detailFont.altFamilyName}"` || '';
    }
  }
}
</script>
