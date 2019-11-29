<template>
  <v-card max-width="600">
    <v-card-title>
      {{ state.detailFont.family }}
      <v-copy-btn :copy-text="state.detailFont.family" />
    </v-card-title>
    <v-card-text>
      <v-btn-toggle
        mandatory
        v-model="selectedPostscriptIndex"
        v-if="state.detailFont.postscripts.length > 1">
        <v-btn
          x-small
          dense
          v-for="(ps, i) in state.detailFont.postscripts"
          :key="ps.name"
          :value="i">
          {{ ps.style }}
        </v-btn>
      </v-btn-toggle>
      <h3 :style="style">{{ previewText }}</h3>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Postscript name</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Italic support</v-list-item-title>
          <v-list-item-subtitle>
            {{ boolToYenNo(selectedPostscript.italic) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Font weight</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.weight }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Font width</v-list-item-title>
          <v-list-item-subtitle>
            {{ selectedPostscript.width }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Monospace support</v-list-item-title>
          <v-list-item-subtitle>
            {{ boolToYenNo(selectedPostscript.monospace) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
<!--
  <Modal @close="$emit('close')">
    <h2>{{ state.detailFont.family }}</h2>
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
  </Modal>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VCopyBtn from './VCopyBtn.vue';
import { IFontFamily, IPostscript } from '../type';
import { IState, store } from '../store';

@Component({
  components: {
    VCopyBtn
  }
})
export default class VFontDetailCard extends Vue {
  private state: IState = store.state;
  private copyMessage: string = 'Copy';
  private selectedPostscriptIndex: number = 0;

  get selectedPostscript() {
    if (this.state.detailFont.postscripts.length <= 1) return this.state.detailFont.postscripts[0]
    return this.state.detailFont.postscripts[this.selectedPostscriptIndex]
  }
  get previewText() {
    return store.getPreviewText();
  }

  get style() {
    const fontStyle =
      (this.selectedPostscript.italic)? 'italic':
      (this.selectedPostscript.style.toLowerCase().includes('oblique'))? 'oblique':
      'normal';

    return {
      margin: '0.5em',
      fontSize: '3em',
      fontFamily: this.state.detailFont.family,
      fontStyle: fontStyle,
      fontWeight: this.selectedPostscript.weight,
      fontKerning: `${this.state.kerning}em`
    };
  }

  boolToYenNo(val: boolean): string {
    return val? 'Yes': 'No';
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