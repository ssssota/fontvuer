<script lang="ts">
  import { onMount } from "svelte";
  import FontCard from "./components/FontCard.svelte";
  import FontDetail from "./components/FontDetail.svelte";
  import { fonts } from "./lib/fonts";
  import type { Font } from "./types";
  import CloseButton from "./components/CloseButton.svelte";
  import SideOverlay from "./components/SideOverlay.svelte";
  let selected: Font | undefined = undefined;
  onMount(() => fonts.load());
</script>

<svelte:body on:contextmenu={(e) => e.preventDefault()} />

<main>
  {#each $fonts as font (`${font.path}.${font.index}`)}
    <FontCard {font} on:click={() => (selected = font)} />
  {/each}
</main>

<SideOverlay open={selected !== undefined}>
  <section>
    <FontDetail font={selected} />
    <span>
      <CloseButton on:click={() => (selected = undefined)} />
    </span>
  </section>
</SideOverlay>

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
  section {
    background-color: #222;
    height: 100%;
    position: relative;
    padding: 1em;
  }
  section span {
    position: absolute;
    top: 1em;
    right: 1em;
  }
</style>
