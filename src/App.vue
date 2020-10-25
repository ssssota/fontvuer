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
import { State, store } from './store';
import { isUpdateComing, currentVersion, latestVersion } from './update-checker';
import { fontSizes, fontWeightItems } from './constants';

@Component({
  components: {
    VHeader,
    VSettings,
    VSearch,
    VFontList,
  },
})
export default class App extends Vue {
  private state: State = store.state;

  private showSettings = false;

  private showSearch = false;

  created(): void {
    Mousetrap.bind(['ctrl+-', 'command+-'], () => {
      const currentIndex = fontSizes.findIndex((fs) => fs === this.state.size);
      store.setSize(
        fontSizes[(currentIndex > 0) ? currentIndex - 1 : currentIndex],
      );
    });
    Mousetrap.bind(['ctrl+plus', 'command+plus'], () => {
      const currentIndex = fontSizes.findIndex((fs) => fs === this.state.size);
      store.setSize(
        fontSizes[(currentIndex < fontSizes.length - 1) ? currentIndex + 1 : currentIndex],
      );
    });
    Mousetrap.bind(['ctrl+down', 'command+down'], () => {
      const currentIndex = fontWeightItems.findIndex((fwi) => fwi.value === this.state.weight);
      store.setWeight(
        fontWeightItems[(currentIndex > 0) ? currentIndex - 1 : currentIndex].value,
      );
    });
    Mousetrap.bind(['ctrl+up', 'command+up'], () => {
      const currentIndex = fontWeightItems.findIndex((fwi) => fwi.value === this.state.weight);
      store.setWeight(
        fontWeightItems[(currentIndex < fontWeightItems.length - 1)
          ? currentIndex + 1
          : currentIndex].value,
      );
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
      // eslint-disable-next-line no-undef
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
  setDarkMode(): void {
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
