<script lang="ts">
	import { enhance } from '$app/forms';
	import { todos } from '../stores';

	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Todo item removed.',
		timeout: 2000,
		hideDismiss: true,
		background: 'bg-purple-300'
	};

	export let task: string;
	export let completed: boolean;
	export let _id: string;

	let todoForm: HTMLFormElement;
</script>

<form
	method="post"
	action="?/toggle"
	bind:this={todoForm}
	use:enhance={({ submitter }) => {
		if(submitter?.classList.contains('delete-button')) {
         todos.delete(_id);
         toastStore.trigger(t);
      } else {
         todos.toggle(_id);
      }
		
		return async ({ update }) => {
			await update();
		};
	}}
	class="flex items-center gap-3 py-3 pl-5 hover:cursor-grab even:bg-neutral-50 odd:bg-transparent"
>
	<input
		type="checkbox"
		name="checkbox"
		id={_id}
		bind:checked={completed}
		on:change|preventDefault={() => todoForm.requestSubmit()}
		class="p-3 rounded-full border-lowContrast-light checked:text-brightBlue hover:cursor-pointer hover:border-brightBlue focus:outline-brightBlue"
	/>
	<label for={_id} class="flex-1 hover:cursor-grab">{task}</label>

	<!--Delivers the _id value for deleting the todo -->
	<input type="hidden" name="_id" value={_id} />

	<button
		formaction="?/delete"
		on:click={() => todos.delete(_id)}
		class="ml-auto mr-2 delete-button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-close w-9"
			><path
				class="secondary"
				fill-rule="evenodd"
				d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
			/></svg
		>
	</button>
</form>

<style lang="postcss">
	input:checked + label {
		color: theme(colors.fadedText.light);
		text-decoration: line-through;
	}
	form:has(input[type='checkbox']:focus) {
		background-color: theme(colors.purple.50);
	}
</style>
