<script lang="ts">
  import { getContext } from 'svelte';
  import Icon from '@iconify/svelte';
  import type { LayoutStore } from './_layout';

  const layoutStores = getContext<LayoutStore>('layout');
  const { showNavigation } = layoutStores;
  
  function onClickNav() {
    showNavigation.set(!($showNavigation));
  }
</script>

<style>
  .main-nav {
    position:  fixed;
    top:  0;
    left:  0;
    right:  0;
    z-index: 10;
  }

  .backdrop {
    position:  fixed;
    left:  0;
    top:  3rem;
    bottom:  0;
    right:  0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.2);
  }
</style>

<nav class="main-nav flex shadow text-white bg-indigo-600 h-14 shadow-lg">
  <button 
    class="bg-indigo-600 text-white px-4"
    class:bg-indigo-700={$showNavigation}
    on:click={onClickNav}
  >
    <Icon icon="mdi:menu" class="w-7 h-7 text-white" />
  </button>
  <a href="/" class="p-3 flex items-center justify-center">
    <span class="font-bold">PIP</span>
  </a>
  <div class="flex-grow"></div>
  <button 
    class="p-4 bg-indigo-600"
  >
    <Icon icon="mdi:github" class="w-7 h-7 text-white" />
  </button>
</nav>

{#if $showNavigation}
<div class="backdrop flex">
  <nav class="sidenav bg-gray-50 w-64 text-gray-800 pt-4 shadow-lg font-semibold flex flex-col items-start">
    <a class="px-4 py-2" href="/app/siswa?nochange=true">
      Daftar Siswa
    </a>
    <a class="px-4 py-2" href="/app/nilai?nochange=true">
      Daftar Nilai
    </a>
    <a class="px-4 py-2" href="/app/compute">
      Penentuan Siswa Terbaik
    </a>
  </nav>
</div>
{/if}