<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';
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

	//Handle drag & drop functionality
	function handleDragStart(event: DragEvent, id: string) {
		if (event.dataTransfer === null) return;
		event.dataTransfer.setData('text/plain', id);
		console.log('started dragging' + id);
	}
	function handleDragOver() {
		console.log('dragover');
	}

	function handleDrop(event: DragEvent) {
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

<section class="grid grid-rows-[1fr_auto]">
	<ul
		on:dragover|preventDefault={handleDragOver}
		on:drop|preventDefault={(event) => handleDrop(event)}
		bind:this={listContainer}
		class="h-full overflow-y-scroll"
	>
		{#if $displayedTodos.length === 0}
			<p class="p-3 text-center text-fadedText-light">
				Add your todos using the input above.<br />Drag and drop to reorder list.<br />Swipe left to
				delete todo.
			</p>
		{/if}
		{#each $displayedTodos as todo (todo._id)}
			<li
				draggable="true"
				animate:flip={{ duration: 300 }}
				in:fly={{ y: -20, duration: 300 }}
				out:slide={{ axis: 'x', duration: 5000 }}
				on:dragstart={(event) => handleDragStart(event, todo._id)}
			>
				<TodoItem {...todo} />
			</li>
		{/each}
	</ul>
	<TodoListFooter />
</section>
