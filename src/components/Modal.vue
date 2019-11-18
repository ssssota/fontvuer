<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="$emit('close')">
      <div class="modal-container">
        <img
          src="../assets/clear-24px.svg"
          alt="Close"
          title="Close"
          class="close-button"
          @close="$emit('close')">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {}
</script>

<style lang="scss" scoped>
.modal-mask {
  // fix position
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  // fix appearance
  background: rgba(0, 0, 0, .5);

  .modal-container {
    // fix position
    width: 300px;
    margin: 0 auto;
    padding: 20px 30px;
    background: #fcfcfc;
    position: relative;
    // fix appearance
    max-height: 90%;
    overflow-y: auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);

    .close-button {
      position: absolute;
      top: 1em;
      right: 1em;
      cursor: pointer;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all .3s ease;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>