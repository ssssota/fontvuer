<script lang="ts">
  import type { Font } from "../types";
  export let displayText: string | undefined = undefined;
  export let font: Font;
  export let fontSize: number = 24;
</script>

<div class="font-detail">
  <h2
    style:font-family="'{font.family}'"
    style:font-weight={font.weight}
    style:font-stretch="{font.stretch}%"
    style:font-style={font.style}
    style:font-size="{fontSize}pt"
  >
    {displayText ?? font.full}
  </h2>
  <p>{font.full}</p>
  <div>
    <p>Family name: {font.family}</p>
    <p>Full name: {font.full}</p>
    {#if font.postscript}
      <p>PostScript name: {font.postscript}</p>
    {/if}
    <p>Path: {font.path}</p>
  </div>
  <div>
    <p>Style: {font.style}</p>
    <p>Weight: {font.weight}</p>
    <p>Stretch: {font.stretch}</p>
  </div>
  <div>
    {#if font.copyright}
      <p>Copyright: {font.copyright}</p>
    {/if}
    {#if font.license}
      <p>License: {font.license}</p>
    {/if}
  </div>
</div>

<style>
  .font-detail {
    box-sizing: border-box;
    max-width: 100%;
    padding: 1em 2em;
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }

  .font-detail div {
    padding: 0.5em 0;
  }
</style>
