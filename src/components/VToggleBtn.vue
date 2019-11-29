<template>
  <v-btn text @click="bvalue = !value" class="v-toggle-btn">
    <v-icon :color="color">{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VToggleBtn extends Vue {
  @Prop({ required: true }) private trueIcon!: string;
  @Prop({ required: true }) private falseIcon!: string;
  @Prop() private trueColor!: string | undefined;
  @Prop() private falseColor!: string | undefined;
  private value: boolean = false;

  get bvalue() {
    return this.value;
  }
  set bvalue(val) {
    this.value = val;
    this.$emit('change', this.value);
  }
  get iconName() {
    return (this.value)? this.trueIcon: this.falseIcon;
  }
  get color() {
    return (this.value)? this.trueColor: this.falseColor;
  }
}
</script>

<style lang="scss" scoped>
.v-toggle-btn {
  padding: 0 !important;
  min-width: 36px !important;
  border-radius: 50%;
  background: rgba(0,0,0,0);

  &:hover {
    background: rgba(0,0,0,.1);
  }

  transition: all 0.2s ease;
}
</style>