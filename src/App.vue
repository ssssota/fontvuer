<template>
  <v-app>
    <v-header @open-setting="showSettings = true" />
    <v-dialog v-model="showSettings" max-width="450">
      <v-settings />
    </v-dialog>
    <v-content>
      <v-font-list />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VHeader from './components/VHeader.vue';
import VSettings from './components/VSettings.vue';
import VFontList from './components/VFontList.vue';
import { IState, store } from './store';

@Component({
  components: {
    VHeader,
    VSettings,
    VFontList
  },
})
export default class App extends Vue {
  private state: IState = store.state;
  private showSettings: boolean = false;
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
</style>
