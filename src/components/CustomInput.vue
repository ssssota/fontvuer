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
      :placeholder="placeholder" 
      :value="value"
      :required="required"
      @input="$emit('input', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)">
    <button v-if="deleteButton" @click="clearInput" :style="{ fontSize: styles.fontSize }">×</button>
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
  @Prop({ default: false }) private deleteButton!: boolean;

  clearInput() {
    // input event の偽装
    // 他の正しいやり方があるはず
    this.$emit('input', { target: { value: '' } });
    
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