<script lang="ts">
  import type { NilaiDB, NilaiKeys } from "$src/types";
  import ListItem from './_list-item.svelte';

  export let item: NilaiDB;

  const keys = Object.keys(item).sort() as NilaiKeys[];
</script>

<ul>
  {#each keys as k}
    <ListItem
      name={k}
      value={item[k]}
    />
  {/each}
</ul>