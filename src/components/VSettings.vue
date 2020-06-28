<template>
  <v-card max-width="450" class="pa-1">
    <v-card-title>Settings</v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-title>Font size(px) <kbd>{{ctrlOrCmd}}</kbd> + <kbd>-</kbd>&nbsp;/&nbsp;<kbd>+</kbd></v-list-item-title>
        <v-list-item-action>
          <v-select
            v-model="state.size"
            :items="fontSizes"
            @change="changeSize" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Font weight <kbd>{{ctrlOrCmd}}</kbd> + <kbd>↑</kbd>&nbsp;/&nbsp;<kbd>↓</kbd></v-list-item-title>
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
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-switch label="Force italic" v-model="state.forceItalic" @change="changeForceItalic" />
          </v-list-item>
          <v-list-item>
            <v-switch label="Don't display fonts that has no italic" :value="!state.forceItalic && state.dispNoItalic" @change="changeDispNoItalic" :disabled="state.forceItalic" />
          </v-list-item>
          <v-list-item>
            <v-switch label="Don't display fonts that has no monospace" v-model="state.dispNoMonospace" @change="changeDispNoMonospace" />
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
import { remote } from 'electron';
import { Component, Vue } from 'vue-property-decorator';
import { IState, store } from '../store';
import { CtrlOrCmd, FontSizes, FontWeightItems } from '../util';

@Component
export default class VSettings extends Vue {
  private state: IState = store.state;
  private showSettings: boolean = false;

  get ctrlOrCmd() { return CtrlOrCmd; }
  get fontSizes() { return FontSizes; }
  get fontWeightItems() { return FontWeightItems; }

  changeSize(val: number) {
    store.setSize(val)
  }
  changeForceItalic(val: boolean) {
    store.setForceItalic(val)
  }
  changeDispNoItalic(val: boolean) {
    store.setDispNoItalic(val)
  }
  changeDispNoMonospace(val: boolean) {
    store.setDispNoMonospace(val)
  }
  changeFavoriteOnly(val: boolean) {
    store.setFavoriteOnly(val)
  }
  changeDarkMode(val: boolean) {
    store.setDarkMode(val)
  }

  openLink(href: string) {
    remote.shell.openExternal(href);
  }
}
</script>