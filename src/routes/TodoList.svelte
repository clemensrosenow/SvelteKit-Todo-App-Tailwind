<script lang="ts">
	
	import TodoItems from './TodoItems.svelte';
	import TodoListFooter from './TodoListFooter.svelte';
   import { todos } from '../stores';

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
	<ul bind:this={listContainer} class="overflow-y-auto">
		{#if $todos.length === 0}
			<p class="p-3 text-center text-fadedText-light">
				Add todos using the input above.<br />Drag and drop to reorder list.<br />Swipe left to
				remove todos.
			</p>
		{/if}
		<TodoItems/>
	</ul>
	<TodoListFooter />
</section>
