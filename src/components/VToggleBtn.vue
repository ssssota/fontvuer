<template>
  <v-btn text @click="click" class="v-toggle-btn">
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
  @Prop({ default: false }) private initValue!: boolean;
  private innerValue!: boolean;

  click() {
    console.log(this.bvalue, this.innerValue);
    console.log(!this.bvalue);
    this.bvalue = !this.bvalue;
    console.log(this.bvalue, this.innerValue);
  }
  get bvalue() {
    return this.innerValue = (typeof this.innerValue === 'undefined')? this.initValue: this.innerValue;
  }
  set bvalue(val) {
    console.log('set', this.innerValue, val);
    this.innerValue = val;
    console.log('set', this.innerValue, val)
    this.$emit('change', this.innerValue);
  }
  get iconName() {
    return (this.bvalue)? this.trueIcon: this.falseIcon;
  }
  get color() {
    return (this.bvalue)? this.trueColor: this.falseColor;
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