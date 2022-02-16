<script>
  import { slide } from "../lib/transition";
  import Portal from "svelte-portal";
  export let target = "body";
  export let width = "480px";
  /** @type {boolean} */
  export let open;
</script>

<Portal {target}>
  {#if open}
    <div style:width transition:slide={{ duration: 200 }}>
      <slot />
    </div>
  {/if}
</Portal>

<style>
  div {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
  }
</style>
