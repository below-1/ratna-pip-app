<script context="module" lang="ts">
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
  import withAvatar from '$lib/withAvatar';

  export async function load({ params, fetch }: LoadEvent): Promise<LoadOutput> {
    const url = `/app/siswa/${params.id}/layout-data`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return {
      props: {
        item: withAvatar(data.item)
      }
    }
  }
</script>

<script lang="ts">
  import type { Siswa } from '$src/types';
  import { setContext } from 'svelte';
  import SiswaCard from './_siswa-card.svelte';
  import Menu from './_menu.svelte';

  export let item: Siswa;
  setContext<Siswa>('siswa', item);
</script>

<div>
  <SiswaCard
    siswa={item}
  />
  <Menu />
  <slot></slot>
</div>

