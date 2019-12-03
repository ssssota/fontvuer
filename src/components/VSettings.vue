<template>
  <v-card max-width="450" class="pa-1">
    <v-card-title>Settings</v-card-title>
    <v-list>
      <v-list-item>
        <v-list-item-title>Font size(px)</v-list-item-title>
        <v-list-item-action>
          <v-select
            v-model="state.size"
            :items="[6,8,10,12,14,16,20,24,32,36,48,64,72,96]"
            @change="changeSize" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Font weight</v-list-item-title>
        <v-list-item-action>
          <v-select
            :items="fontWeightItems"
            v-model="state.weight" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Italic</v-list-item-title>
        <v-list-item-action>
          <v-switch v-model="state.italic" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Kerning</v-list-item-title>
        <v-list-item-action>
          <v-text-field type="number" v-model="state.kerning" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Favorite only</v-list-item-title>
        <v-list-item-action>
          <v-switch v-model="state.favotiteOnly" />
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
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IState, store } from '../store';

@Component
export default class VSettings extends Vue {
  private state: IState = store.state;
  private showSettings: boolean = false;
  get fontWeightItems(): Array<object> {
    return [
      { text: '100(Thin)', value: 100 },
      { text: '200(Extra Light)', value: 200 },
      { text: '300(Light)', value: 300 },
      { text: '400(Normal)', value: 400 },
      { text: '500(Medium)', value: 500 },
      { text: '600(Semi Bold)', value: 600 },
      { text: '700(Bold)', value: 700 },
      { text: '800(Extra Bold)', value: 800 },
      { text: '900(Heavy)', value: 900 }
    ];
  }

  changeSize(val: number) {
    store.setSize(val)
  }
}
</script>