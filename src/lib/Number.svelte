<script lang="ts">
  export let value: number;
  export let name: string;
  export let error: string | null = null;
  export let min = 0;
  export let max = 100;
</script>

<style lang="postcss">
  .Number.error {
    @apply border-red-600;
  }
</style>

<input
  type="number"
  {min}
  {max}
  bind:value={value}
  on:change
  class="Number px-4 py-2 outline-none bg-gray-100 border-b-2 border-blue-300 focus:bg-gray-50 focus:border-blue-400 w-full"
  class:error={error}
  {name}
/>
{#if error}
  <small class="text-red-500 text-xs">{error}</small>
{/if}
