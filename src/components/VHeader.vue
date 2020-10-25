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
          <v-icon>{{ icons.mdiFormatItalic }}</v-icon>
        </v-btn>
        <v-btn icon v-model="state.monospace" :title="`Monospace (${ctrlOrCmd} + M)`" class="ma-0">
          <v-icon>{{ icons.mdiAlphaM }}</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        dense
        group
        :value="state.favoriteOnly"
        @change="changeFavoriteOnly">
        <v-btn icon :value="true" title="Favorite only (F)" class="ma-0">
          <v-icon>{{ icons.mdiStar }}</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        dense
        group
        :value="state.darkMode"
        @change="changeDarkMode">
        <v-btn icon :value="true" :title="`Dark mode (${ctrlOrCmd} + D)`" class="ma-0">
          <v-icon>{{ icons.mdiBrightness6 }}</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar-items>
    <v-btn icon text @click.stop="$emit('open-search')" :title="`Search (${ctrlOrCmd} + F)`">
      <v-icon>{{ icons.mdiMagnify }}</v-icon>
    </v-btn>
    <v-btn icon text @click.stop="$emit('open-setting')" title="More (M)">
      <v-icon>{{ icons.mdiTune }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  mdiFormatItalic, mdiAlphaM, mdiStar, mdiBrightness6, mdiMagnify, mdiTune,
} from '@mdi/js';
import { State, store } from '../store';
import { CtrlOrCmd } from '../utils';
import { fontSizes, fontWeightItems } from '../constants';
import { CtrlCmd } from '../types';

@Component
export default class VHeader extends Vue {
  private state: State = store.state;

  private fav: boolean = this.state.favoriteOnly;

  private dark: boolean = this.state.darkMode;

  private icons = {
    mdiFormatItalic,
    mdiAlphaM,
    mdiStar,
    mdiBrightness6,
    mdiMagnify,
    mdiTune,
  };

  // eslint-disable-next-line class-methods-use-this
  get ctrlOrCmd(): CtrlCmd { return CtrlOrCmd; }

  // eslint-disable-next-line class-methods-use-this
  get fontSizes(): typeof fontSizes { return fontSizes; }

  // eslint-disable-next-line class-methods-use-this
  get fontWeightItems(): typeof fontWeightItems { return fontWeightItems; }

  // eslint-disable-next-line class-methods-use-this
  setPreviewText(_previewText: string): void {
    store.setPreviewText(_previewText);
  }

  // eslint-disable-next-line class-methods-use-this
  changeSize(val: number): void {
    store.setSize(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeFavoriteOnly(val?: true): void {
    store.setFavoriteOnly(!!val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeDarkMode(val?: true): void {
    store.setDarkMode(!!val);
  }
}
</script>

<style lang="scss" scoped>
</style>
