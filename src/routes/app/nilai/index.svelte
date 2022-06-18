<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PeriodeFilter from '$lib/PeriodeFilter.svelte';
  import SearchBox from '$lib/SearchBox.svelte';
  import debounce from '$lib/debounce';

  export let items: any[] = [];
  export let tahun: number = 2020;
  export let semester: number = 1;
  export let keyword = '';
  export let nochange = true;
  let loading = false;

  $: getData(tahun, semester, keyword);

  async function _getData(tahun: number, semester: number, keyword: string) {
    if (!browser) {
      return;
    }
    if (nochange) {
      nochange = false;
      return;
    }
    const url = new URL($page.url);
    url.searchParams.set('tahun', '' + tahun);
    url.searchParams.set('semester', '' + semester);
    url.searchParams.set('keyword', keyword);
    url.searchParams.delete('nochange');
    goto(url);
  }

  const getData = debounce(_getData, 500);
</script>

<div class="p-4 flex flex-col gap-y-4">
  <h1 class="text-2xl font-bold mb-2">Daftar Nilai</h1>
  <PeriodeFilter
    bind:tahun={tahun}
    bind:semester={semester}
  />
  <SearchBox
    bind:keyword={keyword}
  />

  {#each items as item}
    <a
      href={`/app/siswa/${item.id}/nilai?tahun=${tahun}&semester=${semester}`}
      class="flex items-center py-3 border-b"
    >
      <img 
        src={item.avatar}
        class="w-12 h-12"
        alt="avatar"
      />
      <div class="flex-grow px-4">
        <div class="font-bold">{item.nama}</div>
        <div class="text-sm">{item.nisn}</div>
      </div>
      <div class="font-bold">
        {parseFloat(item.rata).toFixed(2)}
      </div>
    </a>
  {/each}

</div>
