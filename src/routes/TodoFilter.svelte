<script lang="ts">
	import { filterOptions, filterCriterion } from '../stores';
</script>


<nav class="flex p-3 mb-0 rounded-md justify-evenly gap-7 bg-listBackground-light dark:bg-listBackground-dark">
	{#each $filterOptions as filter}
		<label class="font-semibold text-fadedText-light hover:cursor-pointer hover:text-fadedText-hover-light dark:text-fadedText-dark dark:hover:text-fadedText-hover-dark">
			<input type="radio" name="filter" value={filter} bind:group={$filterCriterion} class="hidden"/>
			{filter}
		</label>
	{/each}
</nav>

<style lang="postcss">
	
	label:has(input[type='radio']:checked) {
		@apply text-brightBlue cursor-default underline underline-offset-[100%] decoration-2;
	}
</style>