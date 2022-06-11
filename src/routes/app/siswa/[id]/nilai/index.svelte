<script lang='ts'>
  import Filter from './_filter.svelte';
  import EmptyNilaiForm from './_empty-nilai-form.svelte';
  import { goto } from '$app/navigation';
  import { getContext } from 'svelte';
  import type { Siswa } from '$src/types';

  const siswa = getContext<Siswa>('siswa');

  let tahun = 2022;
  let semester = 1;

  function goToCreatePage() {
    const params = new URLSearchParams();
    // Convert to string
    params.set('tahun', tahun as any);
    // Convert to string
    params.set('semester', semester as any);
    const url = `/app/siswa/${siswa.id}/nilai/detail` + '?' + params.toString();
    goto(url);
  }
</script>

<div class="p-4 flex flex-col gap-y-8">
  <Filter
    bind:tahun={tahun}
    bind:semester={semester}
  />
  <EmptyNilaiForm
    {tahun}
    {semester}
    on:create={goToCreatePage}
  />
</div>