<template>
  <v-card class="ma-1" tile outlined>
    <v-card-title
      :style="style"
      @click.self.stop="setDetailFont">
      {{ previewText }}
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-toggle-btn
            v-on="on"
            trueIcon="mdi-star"
            falseIcon="mdi-star-outline"
            :value="state.favFonts" />
        </template>
        <span>Favorite</span>
      </v-tooltip>
    </v-card-title>
    <v-card-subtitle>
      {{ font.family }}
      <v-copy-btn :copy-text="font.family" />
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFontFamily, IPostscript } from '../type';
import VToggleBtn from './VToggleBtn.vue';
import VCopyBtn from './VCopyBtn.vue';
import { IState, store } from '../store';

@Component({
  components: {
    VToggleBtn,
    VCopyBtn
  }
})
export default class VFontCard extends Vue {
  @Prop() private font!: IFontFamily;

  private state: IState = store.state;

  setDetailFont() {
    store.setDetailFont(this.font);
    this.$emit('open-modal');
  }

  get style() {
    return {
      fontSize: `${this.state.size}px`,
      fontFamily: this.font.family,
      fontWeight: this.state.weight,
      fontStyle: (this.state.italic)? 'italic': 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1',
      lineHeight: `${this.state.size+4}px`
    }
  }

  get previewText() {
    return store.getPreviewText();
  }

  get _favorite() { return this.font.favorite; }
  set _favorite(v) { this.$emit('fav', v); }
}
</script>

<style lang="scss" scoped>
</style>