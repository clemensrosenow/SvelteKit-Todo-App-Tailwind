<script lang="ts">
	import { enhance } from '$app/forms';
	import { remainingTodos, todos } from '../stores';

	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Todo items cleared.',
		timeout: 2000,
		hideDismiss: true,
		background: 'bg-purple-300'
	};
</script>

<form
	method="post"
	action="?/clearCompleted"
	use:enhance={() => {
		todos.clearCompleted();
		toastStore.trigger(t);

		return async ({ update }) => {
			await update();
		};
	}}
	class="flex items-center w-full gap-1 px-5 py-3 text-sm shadow-inner ab text-fadedText-light dark:bg-listBackground-dark bg-neutral-100"
>
	{$remainingTodos}
	{$remainingTodos === 1 ? 'item' : 'items'} left
	<button
		on:click={todos.clearCompleted}
		class="px-3 py-1 ml-auto bg-white border rounded-md shadow-inner dark:bg-neutral-900 dark:border-fadedText-light">Clear Completed</button
	>
</form>
