<script lang="ts">
	import { enhance } from '$app/forms';
	import { todos } from '../stores';
   import { spring } from 'svelte/motion';

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
   $: if(todoForm) { todoForm.style.translate = `-${$swipePositionX}px`}

   let initialCoordinates: {x: number | null, y: number | null} = {
      x: null,
      y: null
   }
   
	let swipingLeft: boolean | null = null;

   const swipePositionX = spring(0, {
      stiffness: 0.05,
      damping: 0.3,
      precision: 1
   })

	function startTouch(event: TouchEvent) {
		initialCoordinates.x = event.touches[0].clientX;
		initialCoordinates.y = event.touches[0].clientY;
	}

	function slideTodo(event: TouchEvent) {
		if (initialCoordinates.x === null || initialCoordinates.y === null || swipingLeft === false) {
			return;
		}

		const currentX = event.touches[0].clientX;
		const currentY = event.touches[0].clientY;

		const diffX = initialCoordinates.x - currentX;
		const diffY = initialCoordinates.y - currentY;

		if (swipingLeft === null) {
			// Boolean Expression checking if swiped horizontally & left
			return swipingLeft = Math.abs(diffX) > Math.abs(diffY) && diffX > 0;
		}
      
      //Avoid swiping to the right after initially to the left
      if (diffX < 0) {
         return
      }
          
      return swipePositionX.set(diffX) 
	}

	function endTouch() {
      //handle Logic for sticking left
      
		initialCoordinates.x = null;
		initialCoordinates.y = null;
		swipingLeft = null;
      swipePositionX.set(0)
	}
</script>

<form
	method="post"
	action="?/toggle"
	bind:this={todoForm}
	on:touchstart={startTouch}
	on:touchmove|preventDefault={slideTodo}
	on:touchend|preventDefault={endTouch}
	use:enhance={({ submitter }) => {
		if (submitter?.classList.contains('delete-button')) {
			todos.delete(_id);
			toastStore.trigger(t);
		} else {
			todos.toggle(_id);
		}

		return async ({ update }) => {
			await update();
		};
	}}
	class="flex items-center gap-3 py-3 pl-5 transition-transform duration-1000 hover:cursor-grab even:bg-neutral-50 odd:bg-transparent"
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
