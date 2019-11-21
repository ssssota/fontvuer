<template>
  <div class="custom-input">
    <slot></slot>
    <input
      class="custom-input-main"
      :style="{
        fontSize: styles.fontSize,
        color: styles.color
      }"
      :type="type" 
      :name="name"
      v-model="_value"
      :placeholder="placeholder" 
      :required="required"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :disabled="disabled"
      :form="form"
      :list="list"
      :readonly="readonly"
      :tabindex="tabindex"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)">
    <button v-if="deleteButton" @click="clearInput" :style="{ fontSize: styles.fontSize }"><img src="../assets/clear-24px.svg" title="Clear text"></button>
    <span class="bar"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CustomInput extends Vue {
  @Prop({ default: {} }) private styles!: Object;
  @Prop({ default: 'text' }) private type!: string;
  @Prop({ default: '' }) private name!: string;
  @Prop({ default: '' }) private placeholder!: string;
  @Prop({ default: '' }) private value!: string;
  @Prop({ default: false }) private required!: boolean;
  @Prop({ default: '' }) private autocomplete!: string;
  @Prop({ default: false }) private autofocus!: boolean;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop({ default: '' }) private form!: string;
  @Prop({ default: '' }) private list!: string;
  @Prop({ default: false }) private readonly!: boolean;
  @Prop({ default: 0 }) private tabindex!: number;
  @Prop({ default: false }) private deleteButton!: boolean;

  get _value() { return this.value; }
  set _value(val) { this.$emit('input', val); }

  clearInput() {
    // input event の偽装
    // 他の正しいやり方があるはず
    this._value = '';
    
    // input element にフォーカス
    const elem = this.$el.querySelector('input.custom-input-main');
    if (elem instanceof HTMLElement) elem.focus();
  }
}
</script>

<style lang="scss" scoped>
.custom-input {
  position: relative;

  input {
    width: 100%;
    // clear default border
    border: none;
    outline: none;

    border-bottom: 1px solid #666;

    ~ .bar {
      position: relative;
      display: block;
      width: 100%;

      &::before, &::after {
        content: '';
        // fix position
        position: absolute;
        // fix appearance
        background: #999;
        width: 0;
        height: 2px;
        transition: 0.2s ease all;
      }
      &::before { left: 50%; }
      &::after { right: 50%; }
    }
    &:focus {
       ~ .bar::before, ~ .bar::after {
         width: 50%;
       }
    }

    ~ button { display: block; }
    &:placeholder-shown ~ button { display: none; }
  }

  button {
    // fix appearance
    margin: 0;
    padding: 0;
    border: none;
    background: rgba(255, 255, 255, 0.75);
    color: #666;
    // fix position
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>