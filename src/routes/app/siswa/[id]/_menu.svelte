<script lang="ts">
  import { getContext } from 'svelte';
  import type { Siswa } from '../types';
  import Icon from '@iconify/svelte';

  const siswa = getContext<Siswa>('siswa');

  const menus = [
    { 
      label: 'Nilai', 
      path: `/app/siswa/${siswa.id}/nilai`, 
      icon: 'fa-solid:table'
    },
    { 
      label: 'Biodata', 
      path: `/app/siswa/${siswa.id}/biodata`,
      icon: 'clarity:form-line'
    },
    { 
      label: 'Hapus', 
      path: `/app/siswa/${siswa.id}/remove`,
      icon: 'bi:trash-fill'
    }
  ]
</script>

<div class="Menu flex border-b border-gray-300">
  {#each menus as menu}
    <a 
      href={menu.path}
      class="px-6 py-3 font-medium flex items-center justify-center gap-x-2 flex-grow"
    >
      <Icon icon={menu.icon} class="text-lg text-gray-500" />
      <div>
        {menu.label}
      </div>
    </a>
  {/each}
</div>
