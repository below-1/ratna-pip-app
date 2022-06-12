<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PeriodeFilter from '$lib/PeriodeFilter.svelte';
  import SearchBox from '$lib/SearchBox.svelte';

  const _tahun = $page.url.searchParams.get('tahun');
  const _semester = $page.url.searchParams.get('semester');

  export let items: any[] = [];
  export let tahun: number;
  export let semester: number;
  export let keyword = '';
  let loading = false;

  $: getListNilai(tahun, semester);
  $: onKeywordChange(keyword);

  async function getListNilai(tahun: number, semester: number) {
    const url = new URL($page.url);
    url.searchParams.set('tahun', '' + tahun);
    url.searchParams.set('semester', '' + semester);
    goto(url);
  }

  async function onKeywordChange(keyword: string) {
    const url = new URL($page.url);
    url.searchParams.set('tahun', '' + tahun);
    url.searchParams.set('semester', '' + semester);
    url.searchParams.set('keyword', '' + keyword);
    goto(url); 
  }
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
