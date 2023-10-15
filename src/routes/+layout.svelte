<script lang="ts">
	import '../app.css';
   import { onMount } from 'svelte';
	//import { darkMode } from '../stores';
	import { blur } from 'svelte/transition';

   
	onMount(() => {
		if (
			localStorage.darkMode === 'true' ||
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			toggleDarkMode();
		}
	});
   
   
	function toggleDarkMode() {
      return darkMode = !darkMode
		/*$darkMode = !$darkMode;
		document.body.classList.toggle('darkMode');
		localStorage.darkMode = $darkMode;*/
	}
    //Tailwind Dark Mode -> https://tailwindcss.com/docs/dark-mode
   let darkMode = true
</script>

<svelte:head>
	<!--Global CSS-->
	<link rel="stylesheet" href="styles/style.css" />

	<!--Google Fonts-->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Dark Mode wieder $ hinzufügen-->
<header class="flex justify-between my-12">
	{#key darkMode}
     
		<picture>
			<source
				media="(min-width: 768px)"
				srcset={`images/bg-desktop-${darkMode ? 'dark' : 'light'}.jpg`}
			/>
			<img
				src={`images/bg-mobile-${darkMode ? 'dark' : 'light'}.jpg`}
				alt="Background"
				transition:blur={{duration: 250}}
            class="absolute w-full inset-0 opacity-20"
			/>
		</picture>
     
	{/key}

	<h1 class="uppercase tracking-widest text-3xl font-bold mr-auto text-fadedText-">Todo</h1>
	<button on:click={toggleDarkMode}>
		<img
			src={`images/icon-${darkMode ? 'sun' : 'moon'}.svg`}
			alt={`Activate ${darkMode ? 'light' : 'dark'} mode`}
		/>
	</button>
</header>
<main class="transition-colors">
	<slot />
</main>