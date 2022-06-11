<script lang="ts">
  export let style: string = 'none';
  export let disabled: any = null;
  export let color = '';
  export let size = 'base';
  export let path = '';
  export let loading = false;
</script>

<style lang="postcss">
  .btn.xl {
    @apply text-xl;
  }
  .btn.lg {
    @apply text-lg;
  }
  .btn.sm {
    @apply text-sm;
  }

  .btn.secondary {
    @apply bg-secondary text-white shadow-secondary;
  }

  .btn.primary {
    @apply bg-blue-600 text-white px-3 py-2 rounded uppercase font-semibold
  }

  .btn.disabled {
    @apply opacity-50;
  }
</style>

{#if !path}
  <button
    on:click
    class="btn flex items-center"
    class:secondary={color == 'secondary'}
    class:primary={color == 'primary'}
    class:lg={size == 'lg'}
    class:sm={size == 'sm'}
    class:xl={size == 'xl'}
    class:disabled={disabled || loading}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot></slot>
  </button>
{:else}
  <a
    href={path}
    class="btn"
    class:secondary={color == 'secondary'}
    class:primary={color == 'primary'}
    class:lg={size == 'lg'}
    class:sm={size == 'sm'}
    class:xl={size == 'xl'}
    class:disabled={disabled}
  >
    <slot></slot>
  </a>
{/if}