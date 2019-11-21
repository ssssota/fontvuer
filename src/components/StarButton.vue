<template>
  <span class="star-button">
    <button v-if="_fav" @click="_fav=false"><img src="../assets/star-24px.svg"></button>
    <button v-else @click="_fav=true"><img src="../assets/star_border-24px.svg"></button>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class StarButton extends Vue {
  @Prop({ default: false }) private value!: boolean;

  get _fav() { return this.value; }
  set _fav(v) { this.$emit('input', v); }
}
</script>

<style lang="scss" scoped>
.star-button {
  width: 24px;
  height: 24px;

  button {
    // fix appearance
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    appearance: none;
    background: transparent;
    border-radius: 50%;

    transition: all .3s ease;

    &:hover {
      background: rgba(0, 0, 0, .1);
    }
  }
}
</style>