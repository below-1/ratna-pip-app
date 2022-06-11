<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import RButton from '$lib/Button.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>PIP -- Program Indonesia Pintar</title>
	<meta name="description" content="Program Indonesia Pintar" />
</svelte:head>

<section class="flex flex-col h-screen text-gray-700">
	<div class="flex-grow bg-gray-100 flex flex-col items-center justify-center">
		<h1 class="text-9xl font-bold">PIP</h1>
		<h1 class="text-2xl">Program Indonesia Pintar</h1>
		<RButton color="primary" size="xl" path="/auth/signin">
			login
		</RButton>
	</div>
	<Footer/>
</section>

