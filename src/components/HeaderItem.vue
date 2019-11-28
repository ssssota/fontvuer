<template>
  <v-toolbar dense>
      <v-toolbar-title>
        <v-text-field
          class="title"
          clearable
          hide-details
          placeholder="Preview text"
          v-model="$store.previewText">
        </v-text-field>
      </v-toolbar-title>
      <v-spacer />
      <v-select
        :items="[100,200,300,400,500,600,700,800,900]"
        hide-details
        placceholder="Weight"
        v-model="$store.weight">
      </v-select>
      <v-toggle-btn
        trueIcon="mdi-format-italic"
        trueColor="black"
        falseIcon="mdi-format-italic"
        falseColor="grey"
        v-model="$store.italic"
        @change="$store.italic = $event" />
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VToggleBtn from './VToggleBtn.vue';

@Component({
  components: {
    VToggleBtn
  }
})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
</style>