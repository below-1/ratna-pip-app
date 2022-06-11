<script lang="ts">
  import { setContext } from 'svelte';
  import { layout, type LayoutStore } from './_layout';
  import Navigation from './_navigation.svelte';
  import Footer from '$lib/Footer.svelte';

  setContext<LayoutStore>('layout', layout);

  const { showNavigation } = layout;
</script>

<style>
  .main-container {
    min-height: 100vh;
  }

  :global(.main-container > *:first-child) {
    flex-grow: 1;
    margin-top: 3.5rem;
  }
</style>

<Navigation/>
<div class="main-container flex flex-col">
  <slot></slot>
  <Footer></Footer>
</div>
