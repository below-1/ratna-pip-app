<script lang="ts">
  export let value: string;
  export let name: string;
  export let error: string | null = null;
</script>

<style lang="postcss">
  .Input.error {
    @apply border-red-600;
  }
</style>

<input
  bind:value={value}
  class="Input px-4 py-2 outline-none bg-gray-100 border-b-2 border-blue-300 focus:border-2 focus:bg-white focus:border-blue-400 w-full"
  class:error={error}
  {name}
/>
{#if error}
  <small class="text-red-500 text-xs">{error}</small>
{/if}
