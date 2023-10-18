<script lang="ts">
	import { blur } from 'svelte/transition';
	import '../app.css';
	import { darkMode } from '../stores';
   //Später ersetzen, file extension ".svelte"bisher nicht erkannt
   //import { LightSwitch } from '@skeletonlabs/skeleton';

	function toggleDarkMode() {
		$darkMode = !$darkMode;
		document.documentElement.classList.toggle('dark');
		localStorage.theme = $darkMode ? 'dark' : 'light';
	}
	$: console.log($darkMode);
</script>

<svelte:head>
	<!--Global CSS-->
	<link rel="stylesheet" href="styles/style.css" />

	<!--Google Fonts-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>

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

<header class="flex justify-between py-7 mt-4">
	{#key $darkMode}
		<picture>
			<source
				media="(min-width: 768px)"
				srcset={`images/bg-desktop-${$darkMode ? 'dark' : 'light'}.jpg`}
			/>
			<img
				src={`images/bg-mobile-${$darkMode ? 'dark' : 'light'}.jpg`}
				alt="Background"
				transition:blur={{ duration: 250 }}
				class="absolute w-full inset-0 -z-10"
			/>
		</picture>
	{/key}

	<h1 class="uppercase tracking-[8px] text-3xl font-semibold mr-auto text-neutral-50">Todo</h1>
	<button on:click={toggleDarkMode}>
		<img
			src={`images/icon-${$darkMode ? 'sun' : 'moon'}.svg`}
			alt={`Activate ${$darkMode ? 'light' : 'dark'} mode`}
		/>
	</button>
</header>

<main class="transition-colors">
	<slot />
</main>

<style lang="postcss">
	header,
	main {
		@apply max-w-4xl mx-auto px-6;
	}

	:global(html) {
		background-color: theme(colors.bodyBackground.light);
	}
   :global(body) {
      scroll-behavior: smooth;
   }
	/* Noch anpassen theme colors */
	:global(.secondary) {
		fill: theme(colors.lowContrast.light);
	}
</style>
