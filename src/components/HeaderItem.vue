<template>
  <v-toolbar dense>
      <v-toolbar-title>
        <v-text-field
          class="title"
          clearable
          hide-details
          placeholder="Preview text"
          @input="$store.previewText = $event"
          @click:clear="$store.previewText = ''">
        </v-text-field>
      </v-toolbar-title>
      <v-spacer />
      <v-select
        :items="[100,200,300,400,500,600,700,800,900]"
        hide-details
        placceholder="Weight"
        @change="$store.weight = $event">
      </v-select>
      <v-toggle-btn
        trueIcon="mdi-format-italic"
        trueColor="black"
        falseIcon="mdi-format-italic"
        falseColor="grey"
        @change="$store.italic = $event" />
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VToggleBtn from './VToggleBtn.vue';
import CustomInput from './CustomInput.vue';

@Component({
  components: {
    VToggleBtn
  }
})
export default class Header extends Vue {
  @Prop({ default: 'fontvuer' }) private value!: string;

  get previewText() { return this.value; }
  set previewText(val) { this.$emit('input', val); }
}
</script>

<style lang="scss" scoped>
</style>