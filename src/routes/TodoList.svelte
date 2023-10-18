<script lang="ts">
   import { afterUpdate } from 'svelte';
   import { flip } from 'svelte/animate';
   import { fly } from 'svelte/transition';
   import { displayedTodos, remainingTodos, todos } from '../stores';
   import TodoItem from './TodoItem.svelte';

   let listContainer: HTMLDivElement;
   
   //Bug: Undefined at first, so scroll to top function is not triggered
   let firstElement = $todos[0];

   
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
   }

   //Handle drag & drop functionality
	function handleDragStart(event, id) {
		event.dataTransfer.setData('text/plain', id);
		console.log('started dragging' + id);
	}
	function handleDragOver() {
		console.log('dragover');
	}

	function handleDrop(event) {
		const draggedId = event.dataTransfer.getData('text/plain');
		console.log(draggedId);

		const targetTodo = event.target.closest('li');
		if (!targetTodo) return;

		console.log(targetTodo);

		const targetId = targetTodo.getAttribute('data-id');
		console.log(targetId);
	}

	// Drag Start Event Listeners mit use:action https://stackoverflow.com/questions/60934557/how-to-bind-events-dynamically-in-svelte
</script>

<ul
	on:dragover|preventDefault={handleDragOver}
	on:drop|preventDefault={(event) => handleDrop(event)}
>
	<div bind:this={listContainer} class="overflow-y-scroll h-80" style="scrollbar-gutter: stable;">
		{#each $displayedTodos as todo (todo.id)}
			<li
				draggable="true"
				data-id={todo.id}
				animate:flip={{ duration: 300 }}
				transition:fly={{ y: -20, duration: 300 }}
				on:dragstart={(event) => handleDragStart(event, todo.id)}
				on:touchstart={(event) => console.log(event)}
				class="flex items-center border-b-[1px] gap-3 pl-5 py-2 hover:cursor-grab"
            
			>
				<TodoItem {...todo} />
			</li>
		{/each}
	</div>
	<li class="flex items-center gap-1 px-5 py-2 text-sm border-t-2 shadow-md text-fadedText-light">
		<!--
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 icon-check"
			><circle cx="12" cy="12" r="10" class="primary" /><path
				class="secondary"
				d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
			/></svg
		>-->
		{$remainingTodos}
		{$remainingTodos === 1 ? 'item' : 'items'} left
		<button on:click={todos.clearCompleted} class="px-2 py-1 ml-auto border rounded-md border-lowContrast-light">Clear Completed</button>
	</li>
</ul>
