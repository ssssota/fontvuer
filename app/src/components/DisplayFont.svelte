<script lang="ts">
  import { convertFileSrc } from '@tauri-apps/api/tauri';
  import type { Descriptor } from 'src/lib/ipc';

  export let path: string;
  export let id: string;
  export let descriptor: Descriptor;

  let style = '';
  $: style = `<style>
    @font-face {
      font-family: "${id}";
      src: url("${convertFileSrc(path)}");
    }</style>`;

  $: console.log(id);
</script>

<svelte:head>
  {@html style}
</svelte:head>

<p
  style:font-family="'{id}'"
  style:font-weight={descriptor.weight}
  style:font-style={descriptor.style}
  style:font-stretch="{descriptor.stretch * 100}%"
>
  {descriptor.sample_text ?? descriptor.postscript_name ?? descriptor.full_name}
</p>
