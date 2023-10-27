<script lang="ts">
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';
	import { spring } from 'svelte/motion';
	import { fly } from 'svelte/transition';
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

	let todoForm: HTMLFormElement;
	$: if (todoForm) {
		todoForm.style.translate = `-${$swipePositionX}px`;
	}

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

		//Avoid swiping to the right after initially to the left
		if (diffX < 0) {
			return;
		}

		return swipePositionX.set(diffX);
	}

	function endTouch() {
		//todo: implement Logic for sticking left

		initialCoordinates.x = 0;
		initialCoordinates.y = 0;
		swipingLeft = null;
		swipePositionX.set(0);
	}
</script>

{#each $todos as todo, index (todo.id)}
	<li animate:flip={{ duration: 300 }} transition:fly={{ y: -20, duration: 300 }} class="relative">
		<form
			method="post"
			action="?/toggle"
			id={index.toString()}
			bind:this={todoForm}
			on:touchstart={startTouch}
			on:touchmove|preventDefault={slideTodo}
			on:touchend|preventDefault={endTouch}
			use:enhance={({ action }) => {
				if (action.search.includes('delete')) {
					todos.delete(todo.id);
					toastStore.trigger(t);
				}

				return async ({ update }) => {
					await update();
				};
			}}
			class={`${
				index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
			} flex items-center flex-1 gap-3 px-5 py-3 hover:cursor-grab`}
		>
			<input
				type="checkbox"
				name="checkbox"
				id={todo.id}
				bind:checked={todo.completed}
				on:change={() => {
					//Trigger form submit for backend update without page reloading
					todoForm.requestSubmit();
				}}
				class="p-3 rounded-full border-lowContrast-light checked:text-brightBlue hover:cursor-pointer hover:border-brightBlue focus:outline-brightBlue"
			/>
			<label for={todo.id} class="flex-1 hover:cursor-grab">{todo.task}</label>

			<!--Delivers the id value for deleting the todo -->
			<input type="hidden" hidden name="id" value={todo.id} />

			<button type="submit">Toggle</button>
		</form>

		<!-- Button outside of form to enable fixed absolute position -->
		<button
			type="submit"
			form={index.toString()}
			formaction="?/delete"
			class="absolute inset-0 left-auto px-2 bg-mainText-light"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-close w-9"
				><path
					class="secondary"
					fill-rule="evenodd"
					d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
				/></svg
			>
		</button>
	</li>
{/each}

<style lang="postcss">
	input:checked + label {
		color: theme(colors.fadedText.light);
		text-decoration: line-through;
	}
	form:has(input[type='checkbox']:focus) {
		background-color: theme(colors.purple.50);
	}
</style>
