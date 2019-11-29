<template>
  <v-app>
    <VHeader />
    <v-content>
      <FontList />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VHeader from './components/VHeader.vue';
import FontList from './components/FontList.vue';
import { IState, store } from './store';

@Component({
  components: {
    VHeader,
    FontList
  },
})
export default class App extends Vue {
  private state: IState = store.state;
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
</style>
