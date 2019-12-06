<template>
  <v-card
    class="pa-2">
    <v-text-field
      class="pa-2"
      prepend-icon="mdi-magnify"
      label="Search"
      hide-details
      clearable
      v-model="searchText"
      @keydown.enter="search" />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store } from '../store';

@Component
export default class VSearch extends Vue {
  private searchText: string = ''

  search() {
    store.setSearchText(this.searchText);
    this.$emit('close-search');
  }
}
</script>