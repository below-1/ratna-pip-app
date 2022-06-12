<script>
  import Icon from '@iconify/svelte';
  export let keyword = '';
  export let placeholder = '#explore';
</script>

<style lang="postcss">
  .SearchBox {
    @apply p-2 bg-gray-100 flex items-center rounded text-gray-600;
  }

  .SearchBox:focus-within {
    @apply bg-indigo-600 text-white;
  }

  .SearchBox input:focus {
    @apply font-bold;
  }
</style>

<div class="SearchBox">
  <input
    type="text"
    placeholder={placeholder}
    class="border-none outline-none bg-transparent flex-grow px-4"
    bind:value={keyword}
  />
  <div style="font-size: 1.8rem;">
    <Icon icon="mdi:search" />
  </div>
</div>