<!--
<script lang="ts">
	import { filterOptions, filterCriterion } from '../stores';
</script>

<form>
	{#each $filterOptions as filter}
		<label>
			<input type="radio" name="filter" value={filter} bind:group={$filterCriterion} />
			{filter}
		</label>
	{/each}
</form>

<style>
	form {
		display: flex;
		justify-content: center;
		gap: 1.4em;
		background-color: var(--list-background);
	}
	label {
		color: var(--faded-text);
		font-weight: 700;
	}
   label:hover {
      cursor: pointer;
      color: var(--faded-text-hover);
   }

	label:has(input[type='radio']:checked) {
		color: var(--bright-blue);
	}
   label:has(input[type='radio']:checked):hover {
      cursor: default;
   }
	form input {
		display: none;
	}
</style>
-->