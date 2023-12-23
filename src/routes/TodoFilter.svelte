<script lang="ts">
	import { filterOptions } from '../stores';
   import  { page } from '$app/stores';
</script>


<nav class="flex p-3 mb-0 rounded-md justify-evenly gap-7 bg-listBackground-light dark:bg-listBackground-dark">
	{#each $filterOptions as filter}
      <a href={`?filter=${filter}`} class="font-semibold text-fadedText-light hover:cursor-pointer hover:text-fadedText-hover-light dark:text-fadedText-dark dark:hover:text-fadedText-hover-dark" class:selected={$page.url.searchParams.get("filter") === filter}>{filter}</a>
	{/each}
</nav>

<style lang="postcss">
	.selected {
		@apply text-brightBlue cursor-default underline underline-offset-[100%] decoration-2;
	}
</style>