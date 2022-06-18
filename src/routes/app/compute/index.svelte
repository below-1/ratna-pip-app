<script lang="ts">
  import { onMount } from 'svelte';
  import PeriodeFilter from '$lib/PeriodeFilter.svelte';
  import kmeans from './_kmeans';

  export let tahun: number = 2021;
  export let semester: number = 1;

  let loading = false;
  let items: any[] = [];

  async function loadDataForPeriode() {
    const response = await fetch(`/app/nilai/${tahun}-${semester}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    items = data.items;
    return items;
  }

  async function onRunCompute() {
    loading = true;
    try {
      const items = await loadDataForPeriode();
      const result = kmeans(items);
      console.log(result);
    } catch (err) {
      console.log(err);
      alert('gagal menghitung cluster')
    } finally {
      loading = false;
    }
  }
</script>

<section class="pt-6 px-4 flex flex-col gap-y-2">
  <h1 class="text-2xl text-black">Pemilihan Siswa Terbaik</h1>
  <PeriodeFilter
    bind:tahun={tahun}
    bind:semester={semester}
    on:change={event => {
      console.log(event.detail)
    }}
  />
  <div class="flex-grow justify-center flex items-center bg-gray-100 rounded">
    <button
      type="button"
      class="px-4 py-2 text-center text-lg uppercase font-bold bg-blue-600 text-white shadow-lg rounded disabled:opacity-50 flex items-center justify-center gap-x-4"
      on:click={onRunCompute}
      disabled={loading}
    >
      {#if loading}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {/if}
      jalankan
    </button>
  </div>
</section>