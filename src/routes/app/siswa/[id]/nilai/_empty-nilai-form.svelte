<script lang="ts">
  import type { Siswa } from '$src/types';
  import { getContext } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let tahun: number;
  export let semester: number;

  const siswa = getContext<Siswa>('siswa');

  const dispatch = createEventDispatcher();
</script>

<div class="EmptyNilai bg-gray-100 rounded p-24 text-center">
  <p class="mb-6 text-gray-500 text-xl font-semibold">Belum ada nilai untuk tahun {tahun} semester {semester}</p>
  <button
    class="bg-blue-600 text-white px-4 py-2 rounded shadow-lg uppercase font-semibold"
    on:click={() => {
      dispatch('create');
    }}
  >
    tambah nilai
  </button>
</div>