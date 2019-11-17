<template>
  <div id="app">
    <!--
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to fontvuer"/>
    -->
    <HeaderItem @change-preview-text="onChangePreviewText" :preview-text="previewText" />
    <FontList :preview-text="previewText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderItem from './components/HeaderItem.vue';
import FontList from './components/FontList.vue';

@Component({
  components: {
    HeaderItem,
    FontList
  },
})
export default class App extends Vue {
  previewText: string = "fontvuer"

  onChangePreviewText(text: string) {
    this.previewText = text
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
