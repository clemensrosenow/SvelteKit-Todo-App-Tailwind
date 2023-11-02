<script lang="ts">
	export let task: string;
	export let completed: boolean;
	export let id: string;
	export let index: number;

	import { enhance } from '$app/forms';
	import { spring } from 'svelte/motion';
	import { todos } from '../stores';
	// Toast Notification after Deletion
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Todo item removed.',
		timeout: 2000,
		hideDismiss: true,
		background: 'bg-purple-300'
	};

	let formElement: HTMLFormElement;
	$: if (formElement) {
		formElement.style.translate = `-${$swipePositionX}px`;
	}
   let submitButton: HTMLButtonElement;
   $: buttonWidth = submitButton?.offsetWidth;

	let initialCoordinates = {
		x: 0,
		y: 0
	};

	let swipingLeft: boolean | null = null;

	const swipePositionX = spring(0, {
		stiffness: 0.05,
		damping: 0.3,
		precision: 1
	});

	function startTouch(event: TouchEvent) {
		initialCoordinates.x = event.touches[0].clientX;
		initialCoordinates.y = event.touches[0].clientY;
	}

	function slideTodo(event: TouchEvent) {
		if (!initialCoordinates.x || !initialCoordinates.y || swipingLeft === false) {
			return;
		}

		const currentCoordinates = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY
		};

		const diffX = initialCoordinates.x - currentCoordinates.x;
		const diffY = initialCoordinates.y - currentCoordinates.y;

		if (swipingLeft === null) {
			// Boolean Expression checking if swiped horizontally & left
			return (swipingLeft = Math.abs(diffX) > Math.abs(diffY) && diffX > 0);
		}

		//Avoid swiping to the right after initially to the left and further than delete button width
		if (diffX < 0 || diffX > buttonWidth) {
			return;
		}

		return swipePositionX.set(diffX);
	}

	function endTouch() {
		initialCoordinates.x = 0;
		initialCoordinates.y = 0;
		swipingLeft = null;
      if ($swipePositionX > buttonWidth / 2) {
         //Make todo stick to the left
         swipePositionX.set(buttonWidth)
         submitButton.style.zIndex = "10"
      } else {
         swipePositionX.set(0);
      }
	}

	//Drag & Drop Needed Event Listeners: dragstart,dragenter, dragleave, dragover, drop
</script>

<form
	method="post"
	action="?/delete"
	id={index.toString()}
	bind:this={formElement}
	on:touchstart={startTouch}
	on:touchmove|preventDefault={slideTodo}
	on:touchend|preventDefault={endTouch}
	use:enhance={() => {
		todos.delete(id);
		toastStore.trigger(t);

		return async ({ update }) => {
			await update();
		};
	}}
	class="flex items-center flex-1 gap-3 px-5 py-4 bg-white hover:cursor-grab"
>
	<input
		type="checkbox"
		name="checkbox"
		{id}
		bind:checked={completed}
		on:change={async () => {
			//Toggle Todo in backend using dynamic API route
			await fetch(`todo/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}}
		class="p-3 rounded-full border-lowContrast-light checked:text-brightBlue hover:cursor-pointer hover:border-brightBlue focus:outline-brightBlue"
	/>
	<label for={id} class="flex-1 hover:cursor-grab">{task}</label>

	<!--Delivers the id value for deleting the todo on the backend-->
	<input type="hidden" hidden name="id" value={id} />
</form>

<!-- Button located outside of form to enable fixed absolute position -->
<button
	type="submit"
	form={index.toString()}
	class="absolute inset-0 left-auto px-3 shadow-inner bg-mainText-light -z-10"
   bind:this={submitButton}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-close w-9"
		><path
			class="secondary"
			fill-rule="evenodd"
			d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
		/></svg
	>
</button>

<style lang="postcss">
	input:checked + label {
		color: theme(colors.fadedText.light);
		text-decoration: line-through;
	}
	form:has(input[type='checkbox']:focus) {
		background-color: theme(colors.purple.50);
	}
</style>
