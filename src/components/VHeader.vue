<template>
  <v-app-bar dense>
    <v-toolbar-title>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            class="title"
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
          <v-col cols="4" md="3" lg="1" xl="1" v-on="on">
            <v-select
              hide-details
              placeholder="Font size"
              :items="[6,8,10,12,14,16,20,24,32,36,48,64,72,96]"
              v-model="state.size"
              @change="changeSize" />
          </v-col>
          </template>
          <span class="caption">Font size</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-col cols="4" md="3" lg="2" xl="1" v-on="on">
              <v-select
                hide-details
                placeholder="Font weight"
                :items="fontWeightItems"
                v-model="state.weight" />
            </v-col>
          </template>
          <span class="caption">Font weight</span>
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
          <span class="caption">Kerning</span>
        </v-tooltip>
        <v-col cols="4" md="3" lg="2" xl="1">
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
              <span class="caption">Italic</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn text icon v-model="state.favoriteOnly" v-on="on">
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </template>
              <span class="caption">Favorite only</span>
            </v-tooltip>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon text @click="$emit('open-setting')" v-on="on">
            <v-icon>mdi-tune</v-icon>
          </v-btn>
      </template>
      <span class="caption">More</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VToggleBtn from './VToggleBtn.vue';
import { IState, store } from '../store';

@Component({
  components: {
    VToggleBtn
  }
})
export default class VHeader extends Vue {
  private state: IState = store.state;
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