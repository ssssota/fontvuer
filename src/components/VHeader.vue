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
      <!-- 
      <v-select
        :items="[100,200,300,400,500,600,700,800,900]"
        hide-details
        placceholder="Weight"
        v-model="state.weight"
        @change="setWeight">
      </v-select>
      <v-toggle-btn
        trueIcon="mdi-format-italic"
        trueColor="black"
        falseIcon="mdi-format-italic"
        falseColor="grey"
        v-model="state.italic"
        @change="setItalic" />
      <v-toggle-btn
        trueIcon="mdi-star"
        trueColor="black"
        falseIcon="mdi-star"
        falseColor="grey"
        v-model="state.favoriteOnly"
        @change="setFavoriteOnly" /> -->
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

  setPreviewText(_previewText: string) {
    store.setPreviewText(_previewText);
  }
  setItalic(_italic: boolean) {
    store.setItalic(_italic);
  }
  setWeight(_weight: number) {
    store.setWeight(_weight);
  }
  setFavoriteOnly(_favoriteOnly: boolean) {
    store.setFavoriteOnly(_favoriteOnly);
  }
}
</script>

<style lang="scss" scoped>
</style>