<script lang="ts">
	import { todos } from '../stores';
	import TodoInput from './TodoInput.svelte';
	import TodoList from './TodoList.svelte';

	// Retrieve the fetched todo data from MongoDB
	export let data;
	//@ts-ignore
	$todos = data.todos;

	// Syncs todo store with MongoDB ObjectId after input formaction
	export let form;
   // If statement needs to be more specific
	$: if (form) {
		todos.create(form);
	}
</script>

<!--
{#if form?.error}
   <p style="color: red">{form.error}</p>
{/if}-->

<TodoInput />
<TodoList />

<style lang="postcss">
	:global(main > *) {
		@apply rounded-md overflow-hidden shadow-lg mb-6;
		//background-color: white;
	}
</style>
