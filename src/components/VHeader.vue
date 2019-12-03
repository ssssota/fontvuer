<template>
  <v-app-bar>
      <v-toolbar-title>
        <v-text-field
          class="title"
          clearable
          hide-details
          placeholder="Preview text"
          value="fontvuer"
          @change="setPreviewText"
          @click:clear="setPreviewText('')">
        </v-text-field>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon text @click="$emit('open-setting')">
        <v-icon>mdi-tune</v-icon>
      </v-btn>
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

  changeSize(val: number) {
    store.setSize(val)
  }
}
</script>

<style lang="scss" scoped>
</style>