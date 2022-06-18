<script lang="ts">
  import { getContext } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Siswa } from '$src/types';

  const siswa = getContext<Siswa>('siswa');

  function onContinue() {
    let url = `/app/account/${siswa.username}/remove`;
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', '/app/siswa');
    url += ('?' + searchParams)
    goto(url);
  }
</script>

<div class="p-4">
  <div class="w-full bg-gray-50 rounded py-24 flex flex-col items-center justify-center gap-y-6">
    <h1 class="text-center text-lg font-bold">Anda akan menghapus data {siswa.nama}</h1>
    <div class="flex items-center justify-center gap-x-2 text-sm">
      <button class="bg-white border rounded px-4 py-1 rounded uppercase">batal</button>
      <button on:click={onContinue} class="bg-red-500 text-white rounded px-4 py-1 rounded uppercase">hapus data</button>
    </div>
  </div>
</div>