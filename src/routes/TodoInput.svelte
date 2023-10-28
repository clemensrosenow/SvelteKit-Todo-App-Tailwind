<script lang="ts">
	import { enhance } from '$app/forms';

   // Toast Notification after Creation
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Todo item created successfully.',
		timeout: 2000,
		hideDismiss: true,
		background: 'bg-green-300'
	};

	let todoText = '';
	let creating = false;
</script>

<form
	method="post"
	action="?/create"
	use:enhance={() => {
		if (!todoText) {
			throw new Error("Todo can't be empty.");
		}

		creating = true;

		return async ({ update }) => {
			await update();
			creating = false;
			toastStore.trigger(t);
		};

	}}
	class="flex justify-between gap-2 py-1 pl-1 bg-listBackground-light"
>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		name="todoText"
		placeholder="Create a new todo..."
		autofocus
		autocomplete="off"
		required
		disabled={creating}
		bind:value={todoText}
		class="flex-1 w-0 px-4 py-3 bg-transparent border-0 rounded-sm form-input text-mainText-light caret-brightBlue placeholder-fadedText-light disabled:contrast-50"
	/>
	<button type="submit" disabled={creating} class="pr-2 text-mainText-light disabled:contrast-50"
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-add w-9"
			><path
				class="secondary"
				class:fill-mainText-light={todoText !== ''}
				fill-rule="evenodd"
				d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
			/></svg
		></button
	>
</form>
