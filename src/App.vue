<template>
  <div id="app">
    <HeaderItem v-model="previewText" />
    <FontList :preview-text="(previewText == '')? 'Preview text': previewText" />
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
  previewText: string = "fontvuer";

  users:any;
  created() {
    this.users = [
      {id: 0, name:'a'},
      {id: 1, name:'b'}
    ]
  }

  onChangePreviewText(text: string) {
    this.previewText = text;
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
