<script lang="ts">
  import { browser } from '$app/env';
  import type { Siswa } from "./types";
  import ItemLoading from "$lib/ItemLoading.svelte";
  import debounce from "$lib/debounce";
  import Icon from "@iconify/svelte";
  import SearchBox from '$lib/SearchBox.svelte';

  export let items: Siswa[] = [];
  export let keyword = '';
  export let nochange = true;
  let loading = false;

  $: debouncedLoadSiswa(keyword);

  async function loadSiswa(keyword: string) {
    if (!browser) {
      return;
    }
    loading = true;
    let url = '/app/siswa';
    let searchParams = new URLSearchParams();
    searchParams.set('keyword', keyword);
    url += '?' + searchParams;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      items = data.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }

  const debouncedLoadSiswa = debounce(loadSiswa, 500);

  function getLastItem() {
    if (items.length == 0) {
      return null;
    }
    return items[items.length - 1];
  }

  async function loadMore() {
    loading = true;
    let newItems: Siswa[] = [];
    const url = new URL('/app/siswa', location.origin);
    const lastItem = getLastItem();
    if (lastItem) {
      url.searchParams.append('after', lastItem.id);
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      newItems = data.items;
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
    if (!newItems || !newItems.length) {
      return;
    }
    items = [ ...items, ...newItems ];
  }

  function onKeyUp(event: Event) {
    loadSiswa((event.target as HTMLInputElement).value)
  }

  const debouncedKeyUp = debounce(onKeyUp, 1000);
</script>

<section class="pt-6">

  <div class="flex items-center px-4 mb-6">
    <div class="flex-grow">
      <h1 class="text-2xl text-black flex-grow">Daftar Siswa</h1>
      <p class="text-sm text-gray-600">24 Siswa</p>
    </div>
    <a 
      href="/app/siswa/create"
      type="button" 
      class="p-2 rounded bg-indigo-600 text-white"
    >
      tambah siswa
    </a>
  </div>

  <div class="mx-4">
    <SearchBox bind:keyword={keyword} />
  </div>

  <div class="px-4 pt-4 flex flex-col gap-y-4">
    {#if loading}
      <ItemLoading n={5} />
    {:else}
    <div class="flex flex-col">
      {#each items as item}
        <a 
          class="py-4 border-b flex gap-x-4"
          href={`/app/siswa/${item.id}/biodata`}
        >
          <img 
            src={item.avatar}
            class="w-12 h-12"
            alt="avatar"
          />
          <div>
            <div>{item.nama}</div>
            <div>{item.nisn}</div>
          </div>
        </a>
      {/each}
      </div>
    <button 
      on:click={loadMore}
      class="p-2 py-1 rounded border bg-gray-500 text-gray-50 shadow-inset"
    >
      muat lebih banyak
    </button>
    {/if}
  </div>

</section>