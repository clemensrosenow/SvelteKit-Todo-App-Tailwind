<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';
   import {cubicIn} from 'svelte/easing'
	import { filterCriterion, filterOptions, todos } from '../stores';
	import TodoItem from './TodoItem.svelte';
	import TodoListFooter from './TodoListFooter.svelte';

	let listContainer: HTMLUListElement;

	//Bug: Undefined at first, so scroll to top function is not triggered
	//Bug: todos[0] is undefined after deleting all

	/*let firstElement = $todos[0];

   
   //Scroll to top so new added element is visible
   afterUpdate(() => {
      if(elementAdded()) {
         listContainer.scroll({top: 0, behavior: 'smooth'})
      }
      
   })

   function elementAdded(){
      console.log(firstElement, $todos[0])
      if(firstElement === undefined) {
         firstElement = $todos[0];
         return false;
      }
      if(firstElement.id !== $todos[0].id) {
         firstElement = $todos[0];
         return true;
      }
      return false;
   } */
	function handleSort(e) {
		$todos = e.detail.items;
	}
</script>

<section class="grid grid-rows-[1fr_auto]">
	<ul
		bind:this={listContainer}
		class="overflow-y-auto bg-listBackground-light"
	>
		{#if $todos.length === 0}
			<p class="p-3 text-center text-fadedText-light">
				Add todos using the input above.<br />Drag and drop to reorder list.<br />Swipe left to
				remove todos.
			</p>
		{/if}
		{#each $todos as { task, completed, id }, index (id)}
			{@const todoIsVisible =
				$filterCriterion === $filterOptions[0] ||
				($filterCriterion === $filterOptions[1] && !completed) ||
				($filterCriterion === $filterOptions[2] && completed)}
			<li
				animate:flip={{ duration: 300 }}
				in:fly={{ y: -20, duration: 300 }}
            out:slide={{axis: "x", duration: 300, easing: cubicIn}}
				class="grid grid-cols-1"
			>
				{#if todoIsVisible}
					<TodoItem {task} bind:completed {id} {index} />
				{/if}
			</li>
		{/each}
	</ul>
	<TodoListFooter />
</section>
