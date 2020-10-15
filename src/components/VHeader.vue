<template>
  <v-app-bar dense fixed elevation="1">
    <v-toolbar-title>
      <span title="Preview text">
        <v-text-field
          class="title"
          ref="previewText"
          clearable
          hide-details
          placeholder="Preview text"
          value="fontvuer"
          @change="setPreviewText"
          @click:clear="setPreviewText('')">
        </v-text-field>
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <span :title="`Font size (${ctrlOrCmd} + -/+)`">
        <v-select
          class="mt-2 ml-2"
          placeholder="Font size"
          :items="fontSizes"
          v-model="state.size"
          @change="changeSize" />
      </span>
      <span :title="`Font weight (${ctrlOrCmd} + Up/Down)`">
        <v-select
          class="mt-2 ml-2"
          placeholder="Font weight"
          :items="fontWeightItems"
          v-model="state.weight" />
      </span>
      <span title="Kerning ([ / ])">
        <v-text-field
          type="number"
          step="0.05"
          class="mt-2 ml-2"
          v-model="state.kerning"
          placeholder="Kerning" />
      </span>
      <v-btn-toggle
        multiple
        dense
        group>
        <v-btn icon v-model="state.italic" :title="`Italic (${ctrlOrCmd} + I)`" class="ma-0">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn icon v-model="state.monospace" :title="`Monospace (${ctrlOrCmd} + M)`" class="ma-0">
          <v-icon>mdi-alpha-m</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        dense
        group
        :value="state.favoriteOnly"
        @change="changeFavoriteOnly">
        <v-btn icon :value="true" title="Favorite only (F)" class="ma-0">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        dense
        group
        :value="state.darkMode"
        @change="changeDarkMode">
        <v-btn icon :value="true" :title="`Dark mode (${ctrlOrCmd} + D)`" class="ma-0">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar-items>
    <v-btn icon text @click.stop="$emit('open-search')" :title="`Search (${ctrlOrCmd} + F)`">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon text @click.stop="$emit('open-setting')" title="More (M)">
      <v-icon>mdi-tune</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IState, store } from '../store';
import { CtrlOrCmd, FontSizes, FontWeightItems } from '../util';

@Component
export default class VHeader extends Vue {
  private state: IState = store.state;

  private fav: boolean = this.state.favoriteOnly;

  private dark: boolean = this.state.darkMode;

  get ctrlOrCmd() { return CtrlOrCmd; }

  get fontSizes() { return FontSizes; }

  get fontWeightItems() { return FontWeightItems; }

  setPreviewText(_previewText: string) {
    store.setPreviewText(_previewText);
  }

  changeSize(val: number) {
    store.setSize(val);
  }

  changeFavoriteOnly(val?: true) {
    store.setFavoriteOnly(!!val);
  }

  changeDarkMode(val?: true) {
    store.setDarkMode(!!val);
  }
}
</script>

<style lang="scss" scoped>
</style>
