<template>
  <Modal @close="$emit('close')">
    <h2>{{ font.family }}</h2>
    <div class="postscripts">
      <p class="select-wrapper" v-if="font.postscripts.length > 1">
        <CustomSelect v-model="selectedPostscript">
          <option
            v-for="(postscript, i) in font.postscripts"
            :key="postscript.name"
            :value="i"
            :selected="i===0">
            {{ postscript.style }}
          </option>
        </CustomSelect>
      </p>
      <h3 :style="style">{{ previewText }}</h3>
      <p>italic: {{font.postscripts[selectedPostscript].italic}}</p>
      <p>monospace: {{font.postscripts[selectedPostscript].monospace}}</p>
      <p>style: {{font.postscripts[selectedPostscript].style}}</p>
      <p>weight: {{font.postscripts[selectedPostscript].weight}}</p>
      <p>width: {{font.postscripts[selectedPostscript].width}}</p>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue';
import CustomSelect from './CustomSelect.vue';
import { IFontFamily, IPostscript } from '../type';

@Component({
  components: {
    Modal,
    CustomSelect
  }
})
export default class FontDetail extends Vue {
  @Prop() private font!: IFontFamily;
  @Prop() private previewText!: string;
  @Prop() private kerning!: number;
  selectedPostscript: number = 0;

  get style() {
    const fontStyle =
      (this.font.postscripts[this.selectedPostscript].italic)? 'italic':
      (this.font.postscripts[this.selectedPostscript].style.toLowerCase().includes('oblique'))? 'oblique':
      'normal';

    return {
      margin: 0,
      fontSize: '3em',
      fontFamily: this.font.family,
      fontStyle: fontStyle,
      fontWeight: this.font.postscripts[this.selectedPostscript].weight,
      fontKerning: `${this.kerning}em`
    };
  }
}
</script>

<style lang="scss" scoped>
.font-detail {
  // mask
  // fix position
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // fix appearance
  background: rgba(0, 0, 0, .5);

  .font-detail-container {
    // fix position
    width: 300px;
    max-height: 90%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    position: relative;
    // fix appearance
    overflow-y: auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);

    .close-button {
      position: absolute;
      top: 1em;
      right: 1em;
      cursor: pointer;
    }

    .postscripts {
      .select-wrapper {
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
          background-image: url('../assets/keyboard_arrow_down-24px.svg');
          pointer-events: none;
        }
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
          border: 2px solid #ccf;
        }
      }
    }
  }
}
.font-modal-enter-active {
  transition: all .3s ease;
}
.font-modal-leave-active {
  transition: all .3s ease;
}
.font-modal-enter {
  opacity: 0;
}
.font-modal-leave-to {
  opacity: 0;
}
</style>