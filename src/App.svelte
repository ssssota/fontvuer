<script lang="ts">
import { onMount } from 'svelte';

  import Font from './components/Font.svelte';
  import { fonts } from './lib/fonts';

  onMount(() => fonts.load())
</script>

<svelte:body on:contextmenu={(e) => e.preventDefault()} />

<main>
  {#each $fonts as font (`${font.path}.${font.index}`)}
    <Font {font} />
  {/each}
</main>

<style>
  @font-face {
    font-family: "Last Resort";
    src: url("/LastResort-Regular.ttf");
  }
  :root {
    background: #333;
    color: #ccc;
    user-select: none;
  }
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  main > :global(*) {
    flex-grow: 1;
  }
</style>
