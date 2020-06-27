<template>
  <v-card max-width="450" class="pa-1">
    <v-card-title>Settings</v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-title>Font size(px) <kbd>{{ctrlOrCmd}}</kbd> + <kbd>-</kbd>/<kbd>+</kbd></v-list-item-title>
        <v-list-item-action>
          <v-select
            v-model="state.size"
            :items="fontSizes"
            @change="changeSize" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Font weight <kbd>{{ctrlOrCmd}}</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd></v-list-item-title>
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
        <v-list-item-title>Kerning <kbd>[</kbd>/<kbd>]</kbd></v-list-item-title>
        <v-list-item-action>
          <v-text-field type="number" step="0.1" v-model="state.kerning" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Favorite only <kbd>F</kbd></v-list-item-title>
        <v-list-item-action>
          <v-switch v-model="state.favoriteOnly" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Dark mode <kbd>{{ctrlOrCmd}}</kbd> + <kbd>D</kbd></v-list-item-title>
        <v-list-item-action>
          <v-switch v-model="state.darkMode" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-spacer />
        <v-btn color="primary" @click="showSettings = true">More settings</v-btn>
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
        </v-list>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Store from 'electron-store';
import { Component, Vue } from 'vue-property-decorator';
import { IState, store } from '../store';
import { CtrlOrCmd, FontSizes, FontWeightItems } from '../util';

@Component
export default class VSettings extends Vue {
  private state: IState = store.state;
  private showSettings: boolean = false;
  private estore: Store = new Store();

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
}
</script>