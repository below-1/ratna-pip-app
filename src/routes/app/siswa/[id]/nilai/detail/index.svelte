<script lang='ts'>
  import { page } from '$app/stores';
  import type { Nilai } from '$src/types';
  import Button from '$lib/Button.svelte'
  import NilaiForm from '../_nilai-form.svelte';

  export let item: Nilai;

  const _tahun = $page.url.searchParams.get('tahun');
  let loading = false;
  let tahun_ajaran = parseInt(_tahun!);
  const _semester = $page.url.searchParams.get('semester');
  let semester = parseInt(_semester!);

  async function save() {
    loading = true;
    try {
      const response = await fetch($page.url, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err);
      alert('gagal menyimpan data');
    } finally {
      loading = false;
    }
  }
</script>

<div class="p-4 flex flex-col gap-y-8">
  <div>
    <p class="text-2xl pt-8 uppercase font-semibold">
      Form Input Nilai
    </p>
    <p class="text-lg uppercase font-semibold text-gray-600">
      Tahun Ajaran {tahun_ajaran}, Semester {semester}
    </p>
  </div>
  <NilaiForm
    bind:matematika={item.matematika}
    bind:ipa={item.ipa}
    bind:ips={item.ips}
    bind:bindo={item.bindo}
    bind:bing={item.bing}
    bind:agama={item.agama}
    bind:prakarya={item.prakarya}
    bind:penjaskes={item.penjaskes}
  />
  <div class="flex gap-x-2">
    <Button 
      color="primary" 
      {loading}
      on:click={save}
    >
      simpan
    </Button>
    <button 
      class="border border-gray-500 px-3 py-2 rounded uppercase font-semibold"
      on:click={() => {
        window.history.back();
      }}
    >
      kembali
    </button>
  </div>
</div>