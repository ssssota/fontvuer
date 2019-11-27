<template>
  <span class="star-button">
    <button v-if="_fav" @click="_fav=false"><img src="../assets/star-24px.svg"></button>
    <button v-else @click="_fav=true"><img src="../assets/star_border-24px.svg"></button>
    <p class="description">Favorite</p>
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
  position: relative;

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

      + .description {
        opacity: 1;
      }
    }
  }
  .description {
    // fix position
    position: absolute;
    top: 0;
    left: 24px;
    // fix appearance
    opacity: 0;
    font-size: 12px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: rgba(0, 0, 0, 0.75);
    color: #f5f5f5;
    border-radius: 2px;
    padding: 1px 2px;

    transition: all 0.2s ease;
  }
}
</style>