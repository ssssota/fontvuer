<template>
  <v-card max-width="450" class="pa-1">
    <v-card-title>Settings</v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          Font size(px) <kbd>{{ctrlOrCmd}}</kbd> + <kbd>-</kbd>&nbsp;/&nbsp;<kbd>+</kbd>
        </v-list-item-title>
        <v-list-item-action>
          <v-select
            v-model="state.size"
            :items="fontSizes"
            @change="changeSize" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          Font weight <kbd>{{ctrlOrCmd}}</kbd> + <kbd>↑</kbd>&nbsp;/&nbsp;<kbd>↓</kbd>
        </v-list-item-title>
        <v-list-item-action>
          <v-select
            :items="fontWeightItems"
            v-model="state.weight" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Italic <kbd>{{ctrlOrCmd}}</kbd> + <kbd>I</kbd></v-list-item-title>
        <v-list-item-action>
          <v-switch v-model="state.italic" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Kerning <kbd>[</kbd>&nbsp;/&nbsp;<kbd>]</kbd></v-list-item-title>
        <v-list-item-action>
          <v-text-field type="number" step="0.1" v-model="state.kerning" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Favorite only <kbd>F</kbd></v-list-item-title>
        <v-list-item-action>
          <v-switch :value="state.favoriteOnly" @change="changeFavoriteOnly" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Dark mode <kbd>{{ctrlOrCmd}}</kbd> + <kbd>D</kbd></v-list-item-title>
        <v-list-item-action>
          <v-switch :value="state.darkMode" @change="changeDarkMode" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-spacer />
        <v-btn @click="showSettings = true">More settings</v-btn>
      </v-list-item>
    </v-list>
    <v-dialog
      fullscreen
      transition="dialog-bottom-transition"
      v-model="showSettings">
      <v-card tile>
        <v-toolbar>
          <v-btn icon @click="showSettings = false">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-switch
              label="Force italic"
              v-model="state.forceItalic"
              @change="changeForceItalic"
            />
          </v-list-item>
          <v-list-item>
            <v-switch
              label="Don't display fonts that has no italic"
              :value="!state.forceItalic && state.dispNoItalic"
              @change="changeDispNoItalic"
              :disabled="state.forceItalic"
            />
          </v-list-item>
          <v-list-item>
            <v-switch
              label="Don't display fonts that has no monospace"
              v-model="state.dispNoMonospace"
              @change="changeDispNoMonospace"
            />
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-btn text @click="openLink('https://github.com/ssssota/fontvuer/issues')">Report issue / Feature request</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { CtrlCmd } from '@/types';
import { remote } from 'electron';
import { Component, Vue } from 'vue-property-decorator';
import { mdiClose } from '@mdi/js';
import { State, store } from '../store';
import { CtrlOrCmd } from '../utils';
import { fontSizes, fontWeightItems } from '../constants';

@Component
export default class VSettings extends Vue {
  private state: State = store.state;

  private showSettings = false;

  private icons = { mdiClose };

  // eslint-disable-next-line class-methods-use-this
  get ctrlOrCmd(): CtrlCmd { return CtrlOrCmd; }

  // eslint-disable-next-line class-methods-use-this
  get fontSizes(): typeof fontSizes { return fontSizes; }

  // eslint-disable-next-line class-methods-use-this
  get fontWeightItems(): typeof fontWeightItems { return fontWeightItems; }

  // eslint-disable-next-line class-methods-use-this
  changeSize(val: number): void {
    store.setSize(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeForceItalic(val: boolean): void {
    store.setForceItalic(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeDispNoItalic(val: boolean): void {
    store.setDispNoItalic(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeDispNoMonospace(val: boolean): void {
    store.setDispNoMonospace(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeFavoriteOnly(val: boolean): void {
    store.setFavoriteOnly(val);
  }

  // eslint-disable-next-line class-methods-use-this
  changeDarkMode(val: boolean): void {
    store.setDarkMode(val);
  }

  // eslint-disable-next-line class-methods-use-this
  openLink(href: string): void {
    remote.shell.openExternal(href);
  }
}
</script>
