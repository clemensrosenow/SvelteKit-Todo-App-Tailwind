<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { displayedTodos } from '../stores';
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

	// Drag Start Event Listeners mit use:action https://stackoverflow.com/questions/60934557/how-to-bind-events-dynamically-in-svelte
	//Needed Event Listeners: dragstart,dragenter, dragleave, dragover, drop
</script>

<section class="grid grid-rows-[1fr_auto]">
	<ul bind:this={listContainer} class="overflow-y-scroll">
		{#if $displayedTodos.length === 0}
			<p class="p-3 text-center text-fadedText-light">
				Add todos using the input above.<br />Drag and drop to reorder list.<br />Swipe left to
				remove todos.
			</p>
		{/if}
		{#each $displayedTodos as todo, index (todo.id)}
			<li animate:flip={{ duration: 300 }} transition:fly={{ y: -20, duration: 300 }} class="relative">
				<TodoItem {...todo} {index}/>
			</li>
		{/each}
	</ul>
	<TodoListFooter />
</section>
