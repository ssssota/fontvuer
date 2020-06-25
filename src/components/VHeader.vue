<template>
  <v-app-bar dense>
    <v-toolbar-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            class="title"
            ref="previewText"
            clearable
            hide-details
            placeholder="Preview text"
            value="fontvuer"
            @change="setPreviewText"
            @click:clear="setPreviewText('')">
        </v-text-field>
        </template>
        <span class="caption">Preview text</span>
      </v-tooltip>
    </v-toolbar-title>
    <v-container fluid>
      <v-row
        align="center"
        align-content="end"
        justify="end"
        dense>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <v-col class="hidden-sm-and-down" cols="4" md="3" lg="1" xl="1" v-on="on">
            <v-select
              hide-details
              placeholder="Font size"
              :items="fontSizes"
              v-model="state.size"
              @change="changeSize" />
          </v-col>
          </template>
          <span class="caption">Font size ({{ctrlOrCmd}} + -/+)</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-col class="hidden-sm-and-down" cols="4" md="3" lg="2" xl="1" v-on="on">
              <v-select
                hide-details
                placeholder="Font weight"
                :items="fontWeightItems"
                v-model="state.weight" />
            </v-col>
          </template>
          <span class="caption">Font weight ({{ctrlOrCmd}} + Up/Down)</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-col class="hidden-sm-and-down" cols="4" md="3" lg="2" xl="1" v-on="on">
              <v-text-field
                type="number"
                step="0.1"
                hide-details
                v-model="state.kerning"
                placeholder="Kerning" />
            </v-col>
          </template>
          <span class="caption">Kerning ([/])</span>
        </v-tooltip>
        <v-col class="hidden-sm-and-down" cols="2" md="2" lg="2" xl="1">
          <v-btn-toggle
            multiple
            dense
            group>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-model="state.italic" v-on="on">
                  <v-icon>mdi-format-italic</v-icon>
                </v-btn>
              </template>
              <span class="caption">Italic ({{ctrlOrCmd}} + I)</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-model="state.monospace" v-on="on">
                  <v-icon>mdi-alpha-m</v-icon>
                </v-btn>
              </template>
              <span class="caption">Monospace ({{ctrlOrCmd}} + M)</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-model="state.favoriteOnly" v-on="on">
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </template>
              <span class="caption">Favorite only (F)</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon text @click.stop="$emit('open-search')" v-on="on">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <span class="caption">Search ({{ctrlOrCmd}} + F)</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon text @click.stop="$emit('open-setting')" v-on="on">
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </template>
      <span class="caption">More (M)</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IState, store } from '../store';
import { CtrlOrCmd, FontSizes, FontWeightItems} from '../util';

@Component
export default class VHeader extends Vue {
  private state: IState = store.state;

  get ctrlOrCmd() { return CtrlOrCmd; }
  get fontSizes() { return FontSizes; }
  get fontWeightItems() { return FontWeightItems; }

  setPreviewText(_previewText: string) {
    store.setPreviewText(_previewText);
  }

  changeSize(val: number) {
    store.setSize(val)
  }
}
</script>

<style lang="scss" scoped>
</style>