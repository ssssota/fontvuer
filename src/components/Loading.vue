<template>
  <div class="loading">
    <div class="loading-text">
      <p v-html="textHtml"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: 'Loading...' }) private text!: string;

  get textHtml() {
    return this.text.split('').map(v => `<span class="char">${v}</span>`).join('')
  }
}
</script>

<style lang="scss" scoped>
.loading {
  // fix position
  margin: 0 auto;
  width: 100vmin;
  height: 90vmin;
  position: relative;
  // fix appearance
  font-size: 2em;

  .loading-text {
    // fix position
    width: 100vmin;
    height: 100vmin;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      :nth-child(n) {
        display: inline-block;
      }
      :nth-child(4n  ) { animation: wave 1s cubic-bezier(0, 0.25, 1, 0.75) 0s    infinite; }
      :nth-child(4n+1) { animation: wave 1s cubic-bezier(0, 0.25, 1, 0.75) 0.25s infinite; }
      :nth-child(4n+2) { animation: wave 1s cubic-bezier(0, 0.25, 1, 0.75) 0.5s  infinite; }
      :nth-child(4n+3) { animation: wave 1s cubic-bezier(0, 0.25, 1, 0.75) 0.75s infinite; }
    }
  }
}

@keyframes wave {
  0% { transform: translateY(0px); }
  25% { transform: translateY(-3px); }
  50% { transform: translateY(0px); }
  75% { transform: translateY(3px); }
  100% { transform: translateY(0px); }
}
</style>