<!--
<script lang="ts">

	import { todos, displayedTodos, remainingTodos } from '../stores';
	import TodoItem from './TodoItem.svelte';
   import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

   

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
	{#each $displayedTodos as todo (todo.id)}
		<li
			draggable="true"
			data-id={todo.id}
			animate:flip={{ duration: 300 }}
			transition:fly={{ y: -20, duration: 300 }}
			on:dragstart={(event) => handleDragStart(event, todo.id)}
         on:touchstart={event => console.log(event)}
		>
			<TodoItem {...todo} />
		</li>
	{/each}
	<li>
		{$remainingTodos}
		{$remainingTodos === 1 ? 'item' : 'items'} left
		<button on:click={todos.clearCompleted}>Clear Completed</button>
	</li>
</ul>

<style>
	ul {
		overflow: hidden;
		color: var(--main-text);
		background-color: var(--list-background);
	}
	li {
		border-bottom: 1px solid var(--low-contrast);
		display: flex;
		align-items: center;
		font-size: 0.8em;
      gap: 1em;
	}

	ul li:last-of-type {
		border-bottom: 0px;
		justify-content: space-between;
		color: var(--faded-text);
	}
	button {
		color: var(--faded-text);
	}
	
	/* Input verstecken und für Checkbox anderes Label nutzen */
</style>
-->