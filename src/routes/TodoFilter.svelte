
<script lang="ts">
	import { filterOptions, filterCriterion } from '../stores';
</script>

<nav class="flex justify-center p-3 mb-0 rounded-md gap-7 bg-listBackground-light">
	{#each $filterOptions as filter}
		<label class="font-semibold text-fadedText-light hover:cursor-pointer hover:text-fadedText-hover-light">
			<input type="radio" name="filter" value={filter} bind:group={$filterCriterion} class="hidden"/>
			{filter}
		</label>
	{/each}
</nav>

<style lang="postcss">
	
	label:has(input[type='radio']:checked) {
		@apply text-brightBlue cursor-default;
	}
</style>