<script lang="ts">
	export let task: string;
	export let completed: boolean;
	export let id: string;
	export let index: number;
   export let touchDevice: boolean;

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

	let swipingDirection: 'left' | 'right' | 'invalid' | null = null;

	const swipePositionX = spring(0, {
		stiffness: 0.1,
		damping: 0.3,
		precision: 0.5
	});

	function startTouch(event: TouchEvent) {
		initialCoordinates.x = event.touches[0].clientX;
		initialCoordinates.y = event.touches[0].clientY;
	}

	function slideTodo(event: TouchEvent) {
		if (swipingDirection === 'invalid') {
			return;
		}

		const currentCoordinates = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY
		};
		const diffX = currentCoordinates.x - initialCoordinates.x;
		const diffY = currentCoordinates.y - initialCoordinates.y;

		// Set swiping direction
		if (!swipingDirection) {
			// Exclude Vertical Swiping
			if (Math.abs(diffY) > Math.abs(diffX)) {
				return (swipingDirection = 'invalid');
			}

			//Assign swiping direction, taking initial state into account
			if (diffX < 0 && $swipePositionX === 0) {
				swipingDirection = 'left';
			} else if (diffX > 0 && $swipePositionX === buttonWidth) {
				swipingDirection = 'right';
			} else {
				return (swipingDirection = 'invalid');
			}
		}

		/*Update swipe transformation with 2 limits: 
      1. No further back than starting position
      2. Not further than width of delete button*/
		switch (swipingDirection) {
			case 'left':
				if (-diffX < 0 || -diffX > buttonWidth) {
					return;
				}
				return swipePositionX.set(-diffX);

			case 'right':
				if (diffX < 0 || diffX > buttonWidth) {
					return;
				}
				return swipePositionX.set(buttonWidth - diffX);
		}
	}

	function endTouch() {
		//Reset values
		initialCoordinates = { x: 0, y: 0 };
		swipingDirection = null;

		// Fully slide todo to one direction
		if ($swipePositionX > buttonWidth / 2) {
			//Make todo stick to the left
			swipePositionX.set(buttonWidth);
		} else {
			swipePositionX.set(0);
		}
	}
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
	class="flex items-center flex-1 col-start-1 row-start-1 gap-3 px-5 py-4 bg-white dark:bg-listBackground-dark"
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
		class="p-3 rounded-full border-lowContrast-light checked:text-brightBlue hover:cursor-pointer hover:border-brightBlue focus:outline-brightBlue dark:bg-listBackground-dark dark:border-lowContrast-dark "
	/>
	<label for={id} class="flex-1 hover:cursor-grab dark:text-mainText-dark text-mainText-light">{task}</label>

	<!--Delivers the id value for deleting the todo on the backend-->
	<input type="hidden" hidden name="id" value={id} />
</form>

<!-- Button located outside of form for absolute positioning -->
<button
	type="submit"
	form={index.toString()}
	style:z-index={touchDevice ? -1 : 10}
	class="col-start-1 row-start-1 px-3 ml-auto shadow-inner bg-mainText-light"
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
