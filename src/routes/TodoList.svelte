<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicIn } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import { filterCriterion, filterOptions, todos } from '../stores';
	import TodoItem from './TodoItem.svelte';
	import TodoListFooter from './TodoListFooter.svelte';

	/* Scroll after update
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

	let listContainer: HTMLUListElement;
	let validTarget = false; //Necessary for dropzone highlighting
	let highlightedItem: HTMLLIElement | HTMLUListElement | null = null; //Nessary for UI feedback & drop position

	// ✅
	function handleDragStart(event: DragEvent, index: number) {
		if (!event.dataTransfer) return;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain', index.toString());
	}

	function getHighlightTarget(
		listElement: HTMLLIElement,
		clientY: number
	): HTMLLIElement | HTMLUListElement {
		const rect = listElement.getBoundingClientRect();
		const centerY = rect.top + rect.height / 2;

		if (clientY < centerY) {
			const previousSibling = listElement.previousElementSibling as HTMLLIElement;
			return previousSibling ?? listContainer; //Return ul element first list item with no previous sibling
		}
		return listElement;
	}

	function handleDrop(event: DragEvent) {
		if (!event.dataTransfer) return;
		const droppedIndex = parseInt(event.dataTransfer?.getData('text/plain'));
      
      //Bug: ul listContainer hat keinen Data-Index, daher hier immmer Abbruch, + 1 rechnen bei li bisher erfolglos
      const dropTargetIndex = parseInt(highlightedItem?.getAttribute('data-index') ?? '-1');
		
      updateTodoListOrder(droppedIndex, dropTargetIndex);

      //Reset values
      validTarget = false;
      highlightedItem = null;
	}

   function updateTodoListOrder(fromIndex: number, toIndex: number) {
      if (fromIndex === toIndex) return;
      if (fromIndex - 1 === toIndex) return;
      
      const [droppedItem] = $todos.splice(fromIndex, 1);
      
      if (toIndex === -1) {
         $todos = [droppedItem, ...$todos];
      } else {
         $todos = $todos.toSpliced(toIndex, 0, droppedItem);  
      }
      
      //Todo: Update MongoDB using API endpoint (extra attribute for order possibly needed)
   }
</script>

<section class="grid grid-rows-[1fr_auto] overflow-visible">
	<ul
		bind:this={listContainer}
		class="overflow-x-visible bg-listBackground-light"
		class:validTarget
		class:topHighlight={highlightedItem === listContainer}
		on:dragover|preventDefault={() => (validTarget = true)}
		on:dragleave={(e) => e.target === listContainer && (validTarget = false, highlightedItem = null)}
		on:drop={handleDrop}
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
				draggable="true"
				data-id={id}
				data-index={index}
				on:dragstart={(e) => handleDragStart(e, index)}
				on:dragover|preventDefault={(e) =>
					(highlightedItem = getHighlightTarget(e.currentTarget, e.clientY))}
				animate:flip={{ duration: 300 }}
				in:fly={{ y: -20, duration: 300 }}
				out:slide={{ axis: 'x', duration: 300, easing: cubicIn }}
				class="grid grid-cols-1"
				class:bottomHighlight={highlightedItem?.getAttribute('data-id') === id.toString()}
			>
				{#if todoIsVisible}
					<TodoItem {task} bind:completed {id} {index} />
				{/if}
			</li>
		{/each}
	</ul>
	<TodoListFooter />
</section>

<style lang="postcss">
	.validTarget {
		@apply outline-2 outline-dashed outline-brightBlue;
	}

	/*Kann noch vereinfacht werden*/
	.topHighlight {
		@apply border-t-4 border-brightBlue;
	}

	.bottomHighlight {
		@apply border-b-4 border-brightBlue;
	}
</style>
