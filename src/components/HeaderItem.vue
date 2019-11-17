<template>
  <div class="header">
    <p>
      <CustomInput
        @input="$emit('change-preview-text', $event.target.value)"
        :value="previewText"
        placeholder="Preview Text"
        deleteButton="true"
        :styles="{
          fontSize: '2em',
          color: '#333'
        }" />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CustomInput from './CustomInput.vue';

@Component({
  components: {
    CustomInput
  }
})
export default class Header extends Vue {
  @Prop({ default: 'fontvuer' }) private previewText!: string;

  clearChangePreviewText() {
    this.$emit('change-preview-text', '');

    // focus to input
    const elem = this.$refs.previewTextEditor;
    if (elem instanceof HTMLElement) elem.focus();
  }
}
</script>

<style lang="scss" scoped>
$sp: 640px;

.header {
  padding: 0 1%;
  .custom-input {
    width: 33%;
    max-width: $sp;

    @media (max-width: $sp) {
      width: 80%;
    }
  }
}
</style>