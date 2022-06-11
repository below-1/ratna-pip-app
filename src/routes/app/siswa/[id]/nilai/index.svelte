<script lang='ts'>
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import Filter from './_filter.svelte';
  import Button from '$lib/Button.svelte';
  import EmptyNilaiForm from './_empty-nilai-form.svelte';
  import NilaiList from './detail/_list.svelte';
  import type { Siswa, NilaiDB } from '$src/types';

  const siswa = getContext<Siswa>('siswa');

  let tahun = 2022;
  let semester = 1;
  let loading = false;
  let nilai: NilaiDB | null = null;

  $: getNilai(tahun, semester);

  function goToCreatePage() {
    const params = new URLSearchParams();
    // Convert to string
    params.set('tahun', tahun as any);
    // Convert to string
    params.set('semester', semester as any);
    const url = `/app/siswa/${siswa.id}/nilai/detail` + '?' + params.toString();
    goto(url);
  }

  async function getNilai(tahun: number, semester: number) {
    if (!browser) {
      return;
    }

    loading = true;
    let url = `/app/siswa/${siswa.id}/nilai/detail`
    const urlParams = new URLSearchParams();
    urlParams.set('tahun', '' + tahun);
    urlParams.set('semester', '' + semester);
    url += '?' + urlParams;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      nilai = data.item as NilaiDB;
    } catch (err) {
      console.log(err);
    } finally {
      // Using timeout to give some room for loading indicator
      setTimeout(() => {
        loading = false;
      }, 500);
    }
  }
</script>

<div class="p-4 flex flex-col gap-y-6">
  <Filter
    bind:tahun={tahun}
    bind:semester={semester}
  />
  {#if loading}
    <div 
      transition:fade 
      class="flex flex-col gap-y-4"
    >
      {#each Array(8) as _, i}
        <div
          class="h-10 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      {/each}
    </div>
  {:else}
    <div transition:fade >
      {#if !nilai}
        <EmptyNilaiForm
          {tahun}
          {semester}
          on:create={goToCreatePage}
        />
      {:else}
        <NilaiList
          item={nilai}
        />
        <Button color="primary" outline on:click={goToCreatePage}>
          Ubah Nilai
        </Button>
      {/if}
    </div>
  {/if}
</div>