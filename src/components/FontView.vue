<template>
  <div class="font-view">
    <h3 :style="style">{{ previewText }}</h3>
    <p>{{ font.family }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface IPostscirpt {
  name: string;
  italic: boolean;
  monospace: boolean;
  style: string;
  weight: number;
  width: number;
}
interface IFontFamily {
  family: string;
  postscripts: Array<IPostscirpt>;
}

@Component
export default class FontView extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;
  @Prop() private font!: IFontFamily;

  get style() {
    return {
      fontFamily: this.font.family
    }
  }
}
</script>

<style lang="scss" scoped>
.font-view {
  // fix position
  margin: 0.5em;
  padding: 1em;
  // fix appearance
  border-radius: 8px;
  box-shadow: 0 1px 3px;

  h3 {
    font-size: 2em;
    margin-block-start: auto;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: 400; 
  }

  > p {
    font-size: 0.75em;
    color: #999;
  }
}
</style>