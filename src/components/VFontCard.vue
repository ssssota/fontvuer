<template>
  <v-card>
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
  @Prop({ default: 400 }) private weight!: number;
  @Prop({ default: false }) private italic!: boolean;
  @Prop({ default: 0 }) private kerning!: number;

  private state: IState = store.state;
  private copyMessage: string = 'Copy';

  copyFamilyName() {
    // 空div 生成
    const preWrapper = document.createElement("div");
    // 選択用のタグ生成
    const pre = document.createElement('pre');
    // 親要素のCSSで user-select: none だとコピーできないので書き換える
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';

    preWrapper.appendChild(pre);
    pre.textContent = this.font.family;

    // 要素を画面外へ
    preWrapper.style.position = 'fixed';
    preWrapper.style.right = '200%';

    // body に追加
    document.body.appendChild(preWrapper);
    // 要素を選択
    document.getSelection()!.selectAllChildren(preWrapper);

    try {
      if (!document.execCommand('copy')) throw new Error('CopyFailed');
      this.copyMessage = 'Copied!';
    } catch (e) {
      this.copyMessage = 'Copy failed';
    }
    // 要素削除
    document.body.removeChild(preWrapper);

    setTimeout(() => this.copyMessage = 'Copy', 1000);
  }

  setDetailFont() {
    store.setDetailFont(this.font);
    this.$emit('open-modal');
  }

  get style() {
    return {
      fontFamily: this.font.family,
      fontWeight: this.state.weight,
      fontStyle: (this.state.italic)? 'italic': 'normal',
      letterSpacing: `${this.state.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1'
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