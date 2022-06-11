<script lang="ts">
  import type { Siswa } from '../types';

  export let siswa: Siswa;
</script>

<section class="py-6 bg-gray-50">
  <div class="flex items-center px-4 gap-x-4">
    <img
      src={siswa.avatar}
      alt="avatar"
      class="h-20 w-20 rounded"
    />
    <div class="flex-grow">
      <h1 class="text-2xl text-black flex-grow">{siswa.nama}</h1>
      <p class="text-gray-600">{siswa.nisn}</p>
    </div>
  </div>
</section>
