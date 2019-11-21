<template>
  <div class="font-view" @click="$emit('click')">
    <h3 @click="$emit('open-detail')" :style="style">{{ previewText }} <StarButton v-model="_favorite" /></h3>
    <p @click="$emit('open-detail')">{{ font.family }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IFontFamily, IPostscript } from '../type';
import StarButton from './StarButton.vue';

@Component({
  components: {
    StarButton
  }
})
export default class FontView extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;
  @Prop() private font!: IFontFamily;
  @Prop({ default: 400 }) private weight!: number;
  @Prop({ default: false }) private italic!: boolean;
  @Prop({ default: 0 }) private kerning!: number;

  get style() {
    return {
      fontFamily: this.font.family,
      fontWeight: this.weight,
      fontStyle: (this.italic)? 'italic': 'normal',
      letterSpacing: `${this.kerning}em`,
      fontKerning: 'normal',
      fontFutureSettings: 'palt 1'
    }
  }

  get _favorite() { return this.font.favorite; }
  set _favorite(v) { this.$emit('fav', v); }
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
    cursor: pointer;
  }

  > p {
    font-size: 0.75em;
    color: #999;
    cursor: pointer;
  }
}
</style>