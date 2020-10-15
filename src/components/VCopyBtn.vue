<template>
  <v-btn
    text
    icon
    :title="copyMessage"
    @click="copyFamilyName">
    <v-icon small>mdi-content-copy</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VCopyBtn extends Vue {
  @Prop({ required: true }) private copyText!: string;

  private copyMessage = 'Copy';

  copyFamilyName() {
    // 空div 生成
    const preWrapper = document.createElement('div');
    // 選択用のタグ生成
    const pre = document.createElement('pre');
    // 親要素のCSSで user-select: none だとコピーできないので書き換える
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';

    preWrapper.appendChild(pre);
    pre.textContent = this.copyText;

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
}
</script>
