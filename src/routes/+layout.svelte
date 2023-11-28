<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { blur } from 'svelte/transition';
	import '../app.css';
	import { darkMode } from '../stores';
	import TodoFilter from './TodoFilter.svelte';

	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	function toggleDarkMode() {
		$darkMode = !$darkMode;
		document.documentElement.classList.toggle('dark');
		localStorage.theme = $darkMode ? 'dark' : 'light';
	}
</script>

<Toast
	shadow="shadow-lg"
	background="bg-listBackground-light"
	rounded="rounded-md"
	padding="px-5 py-3"
	width="w-full"
/>
<svelte:head>
	<!--Google Fonts-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

	<!-- Initializes theme while avoiding FOUC -->
	<!-- Initializes theme while avoiding FOUC -->
	<!-- Initializes theme while avoiding FOUC -->
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!'theme' in localStorage && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			$darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<header class="flex items-center justify-between mt-3 py-7">
	{#key $darkMode}
		<picture>
			<source
				media="(min-width: 600px)"
				srcset={`images/bg-desktop-${$darkMode ? 'dark' : 'light'}.jpg`}
			/>
			<img
				src={`images/bg-mobile-${$darkMode ? 'dark' : 'light'}.jpg`}
				alt="Background"
				transition:blur={{ duration: 250 }}
				class="absolute inset-0 w-full -z-10 min-h-[13rem] object-cover"
			/>
		</picture>
	{/key}

	<h1 class="uppercase tracking-[8px] text-3xl font-semibold mr-auto text-bodyBackground-light">
		Todo
	</h1>
	<LightSwitch
		on:click={toggleDarkMode}
		title="Toggle theme"
		bgLight="bg-listBackground-light"
		bgDark="bg-listBackground-dark"
		fillLight="fill-listBackground-light"
		fillDark="fill-listBackground-dark"
		width="w-12"
		height="h-6"
		rounded="rounded-full"
	/>
</header>

<main class="grid transition-colors grid-rows-[auto_1fr]">
	<slot />
</main>

<footer>
	<TodoFilter />
</footer>

<style lang="postcss">
	header,
	main,
	footer {
		@apply max-w-4xl mx-auto px-6 w-full;
	}

	:global(html) {
		//background-color: theme(colors.bodyBackground.dark);
	}
	:global(body) {
		scroll-behavior: smooth;
		height: 100vh;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
	}
	/* Noch anpassen theme colors */
	:global(.secondary) {
		fill: theme(colors.lowContrast.light);
	}
</style>
