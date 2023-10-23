<script lang="ts">
   import { flip } from 'svelte/animate';
   import { fly } from 'svelte/transition';
   import { displayedTodos, remainingTodos, todos } from '../stores';
   import TodoItem from './TodoItem.svelte';

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

   //Handle drag & drop functionality
	function handleDragStart(event:DragEvent, id:string) {
      if (event.dataTransfer === null) return;
		event.dataTransfer.setData('text/plain', id);
		console.log('started dragging' + id);
	}
	function handleDragOver() {
		console.log('dragover');
	}

	function handleDrop(event:DragEvent) {
      if (event.dataTransfer === null) return;
		const draggedId = event.dataTransfer.getData('text/plain');
		console.log(draggedId);
      
		/*const targetTodo = event.target.closest('li');
		if (!targetTodo) return;

		console.log(targetTodo);

		const targetId = targetTodo.getAttribute('data-id');
		console.log(targetId);*/
	}

	// Drag Start Event Listeners mit use:action https://stackoverflow.com/questions/60934557/how-to-bind-events-dynamically-in-svelte
</script>

<section>
	<ul on:dragover|preventDefault={handleDragOver}
	on:drop|preventDefault={(event) => handleDrop(event)} bind:this={listContainer} class="overflow-y-scroll h-80" 
   style="scrollbar-gutter: stable;">
      {#if $displayedTodos.length === 0}
         <p class="p-3 text-center text-fadedText-light">Add your todos using the input above.<br>Drag and drop to reorder list.<br>Swipe left to delete todo.</p>
      {/if}
		{#each $displayedTodos as todo (todo._id)}
			<li
				draggable="true"
				data-id={todo._id}
				animate:flip={{ duration: 300 }}
				transition:fly={{ y: -20, duration: 300 }}
				on:dragstart={(event) => handleDragStart(event, todo._id)}
				on:touchstart={(event) => console.log(event)}
				class="flex items-center gap-3 py-3 pl-5 hover:cursor-grab even:bg-neutral-50 odd:bg-transparent"
            
			>
				<TodoItem {...todo} />
			</li>
		{/each}
	</ul>
	<li class="flex items-center w-full gap-1 px-5 py-3 text-sm shadow-inner ab text-fadedText-light bg-neutral-100">
		<!--
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 icon-check"
			><circle cx="12" cy="12" r="10" class="primary" /><path
				class="secondary"
				d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
			/></svg
		>-->
		{$remainingTodos}
		{$remainingTodos === 1 ? 'item' : 'items'} left
		<button on:click={todos.clearCompleted} class="px-3 py-1 ml-auto bg-white rounded-md border-lowContrast-light">Clear Completed</button>
	</li>
</section>


<style lang="postcss">
   li:has(input[type="checkbox"]:focus) {
      background-color: theme(colors.purple.50);
   }
</style>