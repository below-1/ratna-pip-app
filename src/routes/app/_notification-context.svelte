<script lang="ts">
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import type { NotificationType, NotifyOptions } from '$src/types';

  let show = false;
  let message = '';
  let type: NotificationType = 'positive';

  function notify(options: NotifyOptions) {
    show = true;
    message = options.message;
    type = options.type;
    setTimeout(() => {
      show = false;
    }, options.timeout)
  }

  setContext('notify', notify);
</script>

<style lang="postcss">
  .Notification {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    @apply py-4 flex items-center justify-center;
  }

  .Notification.positive {
    @apply bg-blue-600 text-white;
  }

  .Notification.negative {
    @apply bg-pink-600 text-white;
  }
</style>

<slot></slot>
{#if show}
  <div 
    class="Notification"
    class:show={show}
    class:positive={type == 'positive'}
    class:negative={type == 'negative'}
    transition:fade="{{ duration: 200 }}"
  >
    <div class="Message font-bold">{message}</div>
  </div>
{/if}
