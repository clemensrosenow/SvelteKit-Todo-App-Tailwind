<script lang="ts">
	import { todos } from '../stores';
	import TodoInput from './TodoInput.svelte';
	import TodoList from './TodoList.svelte';

	// Retrieve the fetched todo data from MongoDB
	export let data;
	$todos = data.todos;
</script>

<TodoInput />
<TodoList />

<style lang="postcss">
	:global(main > *) {
		@apply rounded-md overflow-hidden shadow-lg mb-6;
		background-color: white;
	}
</style>
