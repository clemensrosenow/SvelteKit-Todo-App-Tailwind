
<script lang="ts">
	import { filterOptions, filterCriterion } from '../stores';
   import { TabGroup, Tab } from '@skeletonlabs/skeleton';
</script>


<nav class="flex p-3 mb-0 rounded-md justify-evenly gap-7 bg-listBackground-light">
	{#each $filterOptions as filter}
		<label class="font-semibold text-fadedText-light hover:cursor-pointer hover:text-fadedText-hover-light">
			<input type="radio" name="filter" value={filter} bind:group={$filterCriterion} class="hidden"/>
			{filter}
		</label>
	{/each}
</nav>

<!--
<TabGroup justify="justify-center" rounded="rounded-md" active="text-brightBlue" hover="hover:text-brightBlue" class="bg-listBackground-light">
   {#each $filterOptions as filter}
      <Tab bind:group={$filterCriterion} value={filter} name={filter} title={`View ${filter}`} class="font-semibold text-fadedText-light hover:text-mainText-light">
         {filter}
      </Tab>
   {/each}
</TabGroup>-->

<style lang="postcss">
	
	label:has(input[type='radio']:checked) {
		@apply text-brightBlue cursor-default underline underline-offset-[100%] decoration-2;
	}
</style>