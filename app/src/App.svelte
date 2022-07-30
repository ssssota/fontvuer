<script lang="ts">
  import Loading from './components/Loading.svelte';
  import {
    getFacesByFamilyName,
    getFamilies,
    getFontDescriptor,
  } from './lib/ipc';
  import DisplayFont from './components/DisplayFont.svelte';
</script>

{#await getFamilies()}
  <Loading />
{:then res}
  <ul>
    {#each res as familyName}
      <li>
        <p>
          {familyName}
        </p>
        <p>
          {#await getFacesByFamilyName(familyName)}
            <Loading />
          {:then faces}
            <ul>
              {#each faces as face, i}
                <li>
                  <p>
                    {face.path} [{face.fontIndex}]
                  </p>
                  {#await getFontDescriptor(face)}
                    <Loading />
                  {:then descriptor}
                    <DisplayFont
                      path={face.path}
                      id={familyName + i}
                      {descriptor}
                    />
                    <ul>
                      {#each Object.entries(descriptor).flatMap( (v) => (v[1] == null ? [] : [v]) ) as [key, value]}
                        <li>{key}: {value}</li>
                      {/each}
                    </ul>
                  {/await}
                </li>
              {/each}
            </ul>
          {:catch}
            err
          {/await}
        </p>
      </li>
    {/each}
  </ul>
{:catch}
  err
{/await}
