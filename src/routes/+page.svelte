<script lang="ts">
	import TodoInput from './TodoInput.svelte';
	import TodoList from './TodoList.svelte';
	import TodoFilter from './TodoFilter.svelte';
	import { todos } from '../stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if (localStorage.todos !== undefined) {
			$todos = JSON.parse(localStorage.todos);
		}
		window.addEventListener('beforeunload', () => {
			localStorage.todos = JSON.stringify($todos);
		});
	});
</script>

<TodoInput />
<TodoList />
<TodoFilter />
<p class="mt-12 text-center text-fadedText-light">Drag and drop to reorder list.<br>Swipe left to delete todo.</p>

<style lang="postcss">
	:global(main > *:not(p)) {
      @apply rounded-md overflow-hidden shadow-lg mb-6;
      background-color: white;
   }
</style>
