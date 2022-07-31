<script lang="ts">
  import { families } from './lib/store';
</script>

<ul>
  {#each $families as family (family)}
    <li>
      <p>{family}</p>
    </li>
  {/each}
</ul>
