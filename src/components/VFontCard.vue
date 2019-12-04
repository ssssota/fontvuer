<template>
  <v-card class="ma-1" tile outlined>
    <v-card-title
      :style="style"
      @click.self.stop="setDetailFont">
      {{ previewText }}
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn-toggle multiple dense group>
            <v-btn text icon v-model="favorite">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
        <span>Favorite</span>
      </v-tooltip>
    </v-card-title>
    <v-card-subtitle :class="{'pb-0':showItalicWarn}">
      {{ font.family }}
      <v-copy-btn :copy-text="font.family" />
    </v-card-subtitle>
    <v-card-text v-if="showItalicWarn">
      <v-alert
        class="ma-0"
        type="warning"
        dense
        outlined
        tile>This font has no italic.</v-alert>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IFontFamily, IPostscript } from '../type'
import VCopyBtn from './VCopyBtn.vue';
import { IState, store } from '../store';

@Component({
  components: {
    VCopyBtn
  }
})
export default class VFontCard extends Vue {
  @Prop() private font!: IFontFamily;

  private state: IState = store.state;
  private favorite: boolean = false;

  setDetailFont() {
    store.setDetailFont(this.font);
    this.$emit('open-modal');
  }

  get showItalicWarn() {
    return this.state.italic && !this.hasItalic && !this.hasOblique;
  }
  get hasItalic() {
    return this.font.postscripts.findIndex(ps => ps.italic) >= 0;
  }
  get hasOblique() {
    return this.font.postscripts.findIndex(ps => ps.style.toLowerCase().includes('oblique')) >= 0;
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
      fontWeight: this.state.weight,
      fontStyle: (this.state.italic)? fontStyle: 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size+4}px`
    }
  }

  get previewText() {
    return store.getPreviewText();
  }

  @Watch('favorite')
  _favorite() {
    console.log(this.font.family, this.favorite)
  }
}
</script>

<style lang="scss" scoped>
</style>