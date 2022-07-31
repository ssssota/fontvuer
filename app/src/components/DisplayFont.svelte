<script lang="ts">
  import { convertFileSrc } from '@tauri-apps/api/tauri';
  import type { SnakeToCamelObject } from 'src/lib/utils';
  import type { Descriptor } from '../types';

  export let path: string;
  export let id: string;
  export let descriptor: SnakeToCamelObject<Descriptor>;

  let style = '';
  $: style = `<style>
    @font-face {
      font-family: "${id}";
      src: url("${convertFileSrc(path)}");
    }</style>`;
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
  {descriptor.sampleText ?? descriptor.postscriptName ?? descriptor.fullName}
</p>
