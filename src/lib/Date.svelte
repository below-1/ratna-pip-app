<script lang="ts">
  export let value: string | null;
  export let name: string;
  export let error: string | null = null;
</script>

<style lang="postcss">
  .input.error {
    @apply border-red-600;
  }
</style>

<input
  type="date"
  bind:value={value}
  class="input px-2 py-1 border border-gray-500 rounded"
  class:error={error}
  {name}
/>
{#if error}
  <small class="text-red-500 text-xs">{error}</small>
{/if}
