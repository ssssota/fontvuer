<script lang="ts">
  import type { Font } from "../types";
  export let displayText: string | undefined = undefined;
  export let font: Font;
  export let fontSize: number = 24;
</script>

<div>
  <h3
    style:font-family="'{font.family}'"
    style:font-weight={font.weight}
    style:font-stretch="{font.stretch}%"
    style:font-style={font.style}
    style:font-size="{fontSize}pt"
  >
    {displayText ?? font.full}
  </h3>
  <p>{font.full}</p>
  <ul>
    {#each Object.entries(font) as [key, value]}
      <li>{key}: {value}</li>
    {/each}
  </ul>
</div>

<style>
  div {
    box-sizing: border-box;
    max-width: 100%;
    padding: 1em 2em;
  }
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
  }
</style>
