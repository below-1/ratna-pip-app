<script lang="ts">
  export let show = false;
  export let cover = false;
</script>

<style scoped>
  .Backdrop {
    position: fixed;
    top:  0;
    bottom: 0;
    left:  0;
    right:  0;
    background: rgba(250, 250, 250, 0.5);
    z-index: 9;
    display:  flex;
    justify-content: center;
    align-items: center;
  }

  .Backdrop-cover {
    z-index: 12;
  }
</style>

{#if show}
<div 
  on:click|self={() => {
    show = false;
  }} 
  class="Backdrop flex items-center justify-center md:p-4"
  class:Backdrop-cover={cover}
>
  <slot></slot>
</div>
{/if}
