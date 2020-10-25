<template>
  <v-card class="pa-2">
    <v-text-field
      class="pa-2"
      label="Search"
      hide-details
      clearable
      ref="searchTextField"
      v-model="searchText"
      @click:clear="clearSearch"
      @keydown.enter="search"
    >
      <template slot="prepenc">
        <v-icon>{{ icons.mdiMagnify }}</v-icon>
      </template>
    </v-text-field>
  </v-card>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { mdiMagnify } from '@mdi/js';
import { store, State } from '../store';

@Component
export default class VSearch extends Vue {
  @Prop({ default: false }) readonly isOpen!: boolean;

  private state: State = store.state;

  private searchText: string | null = this.state.searchText;

  private icons = { mdiMagnify };

  @Watch('isOpen', { immediate: true })
  onOpenCloase(): void {
    if (!this.isOpen) this.search();
    else {
      this.searchText = this.state.searchText;
      this.$nextTick(() => {
        ((this.$refs.searchTextField as Vue).$refs.input as HTMLElement).focus();
      });
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.search();
  }

  search(): void {
    store.setSearchText(this.searchText || '');
    this.$emit('close-search');
  }
}
</script>
