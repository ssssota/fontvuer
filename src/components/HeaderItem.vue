<template>
  <div class="header">
    <p>
      <CustomInput
        v-model="previewText"
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
  @Prop({ default: 'fontvuer' }) private value!: string;

  get previewText() { return this.value; }
  set previewText(val) { this.$emit('input', val); }
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