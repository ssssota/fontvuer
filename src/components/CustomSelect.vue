<template>
  <p class="custom-select">
    <select
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      :form="form"
      :multiple="multiple"
      :name="name"
      :required="required"
      :size="size"
      v-model="_value"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)">
      <slot></slot>
    </select>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomSelect extends Vue {
  @Prop({ default: '' }) private autocomplete!: string;
  @Prop({ default: false }) private autofocus!: boolean;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop({ default: '' }) private form!: string;
  @Prop({ default: false }) private multiple!: boolean;
  @Prop({ default: '' }) private name!: string;
  @Prop({ default: false }) private required!: boolean;
  @Prop({ default: 0 }) private size!: number;
  @Prop({ default: '' }) private value!: string;

  get _value() { return this.value; }
  set _value(val) { this.$emit('input', val); }
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;

  &::after {
    // fix position
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    right: 0.15em;
    top: 0.15em;
    // fix appearance
    content: '';
    background: url('../assets/keyboard_arrow_down-24px.svg');
    pointer-events: none;
  }

  select {
    // fix position
    display: block;
    width: 100%;
    margin: 0 auto;
    // fix appearance
    color: #666;
    outline: none;
    appearance: none;
    background: transparent;
    border: 2px solid #ccc;
    border-radius: 1px;
    padding: 5px;

    transition: all .2s ease;

    &:hover {
      box-shadow: 0 1px 5px rgba(0, 0, 0, .33);
    }
    &:focus {
      border: 2px solid #c0c0ff;
    }
  }
}
</style>