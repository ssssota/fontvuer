<template>
  <v-app>
    <v-header
      ref="header"
      @open-setting="showSettings = true"
      @open-search="showSearch = true" />
    <v-dialog v-model="showSettings" max-width="450">
      <v-settings />
    </v-dialog>
    <v-dialog v-model="showSearch" max-width="450">
      <v-search @close-search="showSearch = false" :isOpen="showSearch" />
    </v-dialog>
    <v-main class="mt-12">
      <v-font-list />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { remote, MessageBoxSyncOptions } from 'electron';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Mousetrap from 'mousetrap';
import VHeader from './components/VHeader.vue';
import VSettings from './components/VSettings.vue';
import VSearch from './components/VSearch.vue';
import VFontList from './components/VFontList.vue';
import { IState, store } from './store';
import { FontSizes, FontWeightItems } from './util';
import { isUpdateComing, currentVersion, latestVersion } from './update-checker';

@Component({
  components: {
    VHeader,
    VSettings,
    VSearch,
    VFontList,
  },
})
export default class App extends Vue {
  private state: IState = store.state;

  private showSettings = false;

  private showSearch = false;

  created() {
    Mousetrap.bind(['ctrl+-', 'command+-'], () => {
      const currentIndex = FontSizes.findIndex((fs) => fs === this.state.size);
      store.setSize(FontSizes[(currentIndex > 0) ? currentIndex - 1 : currentIndex]);
    });
    Mousetrap.bind(['ctrl+plus', 'command+plus'], () => {
      const currentIndex = FontSizes.findIndex((fs) => fs === this.state.size);
      store.setSize(FontSizes[(currentIndex < FontSizes.length - 1) ? currentIndex + 1 : currentIndex]);
    });
    Mousetrap.bind(['ctrl+down', 'command+down'], () => {
      const currentIndex = FontWeightItems.findIndex((fwi) => fwi.value === this.state.weight);
      store.setWeight(FontWeightItems[(currentIndex > 0) ? currentIndex - 1 : currentIndex].value);
    });
    Mousetrap.bind(['ctrl+up', 'command+up'], () => {
      const currentIndex = FontWeightItems.findIndex((fwi) => fwi.value === this.state.weight);
      store.setWeight(FontWeightItems[(currentIndex < FontWeightItems.length - 1) ? currentIndex + 1 : currentIndex].value);
    });
    Mousetrap.bind(['ctrl+i', 'command+i'], () => store.setItalic(!this.state.italic));
    Mousetrap.bind(['ctrl+m', 'command+m'], () => store.setMonospace(!this.state.monospace));
    Mousetrap.bind(['ctrl+f', 'command+f'], () => { this.showSearch = !this.showSearch; });
    Mousetrap.bind(['ctrl+d', 'command+d'], () => store.setDarkMode(!this.state.darkMode));
    Mousetrap.bind('f', () => store.setFavoriteOnly(!this.state.favoriteOnly));
    Mousetrap.bind('t', () => ((this.$refs.header as Vue).$refs.previewText as HTMLElement).focus());
    Mousetrap.bind('m', () => { this.showSettings = !this.showSettings; });
    Mousetrap.bind('[', () => store.setKerning(this.state.kerning - 0.05));
    Mousetrap.bind(']', () => store.setKerning(this.state.kerning + 0.05));

    // Update check
    isUpdateComing.then((updateIsFound) => {
      if (!updateIsFound) return;
      const { platform } = remote.process as NodeJS.Process;
      const isMacOrWin = platform === 'darwin' || platform === 'win32';
      const result = remote.dialog.showMessageBoxSync({
        type: 'info',
        title: 'New version was found',
        message: `New version was found!\nCheck new version.\nCurrent: v${currentVersion}\nLatest: v${latestVersion}`,
        buttons: isMacOrWin ? ['Cancel', 'OK'] : ['OK'],
      } as MessageBoxSyncOptions);

      if (result === 1) {
        remote.shell.openExternal('https://fontvuer.netlify.com/#download');
      }
    });
  }

  @Watch('state.darkMode', { immediate: true })
  setDarkMode() {
    this.$vuetify.theme.dark = this.state.darkMode;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}
</style>
