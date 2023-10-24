<script lang="ts">
	import { enhance } from '$app/forms';
	import { remainingTodos, todos } from '../stores';
</script>

<form
	method="post"
	action="?/clearCompleted"
	use:enhance={() => {
      todos.clearCompleted();
      
      return async ({ update }) => {
         await update();
      };
   }}
	class="flex items-center w-full gap-1 px-5 py-3 text-sm shadow-inner ab text-fadedText-light bg-neutral-100"
>
	{$remainingTodos}
	{$remainingTodos === 1 ? 'item' : 'items'} left
	<button
		on:click={todos.clearCompleted}
		class="px-3 py-1 ml-auto bg-white border rounded-md shadow-inner">Clear Completed</button
	>
</form>
