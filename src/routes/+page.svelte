<script lang="ts">
	import TodoInput from './TodoInput.svelte';
	import TodoList from './TodoList.svelte';
	import TodoFilter from './TodoFilter.svelte';
	import { todos } from '../stores';

   // Retrieve the fetched todo data from MongoDB
   export let data
   $todos = data.todos
   

</script>

<TodoInput />
<TodoList />


<style lang="postcss">
	:global(main > *) {
      @apply rounded-md overflow-hidden shadow-lg mb-6;
      background-color: white;
   }
</style>
