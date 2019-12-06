<template>
  <v-app>
    <v-header
      ref="header"
      @open-setting="showSettings = true"
      @open-search="showSearch = true" />
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
import { FontSizes, FontWeightItems } from './util';

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
  private showSearch: boolean = false;

  created() {
    window.addEventListener('keydown', e => {
      console.log(e);
      if (e.ctrlKey || e.metaKey) switch (e.key) {
        // ctrl/cmd + key
        case 'i':
        case 'I': {
          store.setItalic(!this.state.italic);
          break;
        }
        case 'f':
        case 'F': {
          store.setFavoriteOnly(!this.state.favoriteOnly);
          break;
        }
        case '-': {
          const currentIndex = FontSizes.findIndex(fs => fs === this.state.size);
          store.setSize(FontSizes[(0 < currentIndex)? currentIndex-1: currentIndex]);
          break;
        }
        case '+': {
          const currentIndex = FontSizes.findIndex(fs => fs === this.state.size);
          store.setSize(FontSizes[(currentIndex < FontSizes.length-1)? currentIndex+1: currentIndex]);
          break;
        }
        case 'ArrowDown': {
          const currentIndex = FontWeightItems.findIndex(fwi => fwi.value === this.state.weight);
          store.setWeight(FontWeightItems[(0 < currentIndex)? currentIndex-1: currentIndex].value);
          break;
        }
        case 'ArrowUp': {
          const currentIndex = FontWeightItems.findIndex(fwi => fwi.value === this.state.weight);
          store.setWeight(FontWeightItems[(currentIndex < FontWeightItems.length-1)? currentIndex+1: currentIndex].value);
          break;
        }
      } else switch(e.key) {
        // only key
        case 't':
        case 'T': {
          ((this.$refs.header as Vue).$refs.previewText as HTMLElement).focus();
          break;
        }
        case 'm':
        case 'M': {
          this.showSettings = true;
          break;
        }
        case '/': {
          this.showSearch = true;
          break;
        }
        case '[': {
          store.setKerning(this.state.kerning-0.1);
          break;
        }
        case ']': {
          store.setKerning(this.state.kerning+0.1);
          break;
        }
      }
    });
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
