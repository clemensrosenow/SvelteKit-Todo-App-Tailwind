<!--
<script lang="ts">
	import { todos } from '../stores';
	export let task = '';
	export let completed = false;
	export let id = Date.now();
</script>

<button
	on:click={() => {
		completed = !completed;
		todos.toggle(id);
	}}
	class="check"
	class:done={completed}>✔</button
>
<label>
	<input
		type="checkbox"
		name="TodoToggle"
		bind:checked={completed}
		on:change={() => todos.toggle(id)}
	/>
	{task}</label
>
<button
	on:click={() => {
		todos.remove(id);
	}}
	class="remove"
>
	<img src="images/icon-cross.svg" alt="Remove todo" />
</button>

<style>
	label:has(input:checked) {
		text-decoration-line: line-through;
		color: var(--low-contrast);
	}

	input {
		display: none;
	}

	button.check {
		background: var(--input-background);
		aspect-ratio: 1;
		padding: 0.5em;
		line-height: 0;
		border-radius: 50%;
		color: white;
		outline: 1px solid red;
	}
	button.check.done {
		outline: 1px solid green;
	}

	button.remove {
		margin-left: auto;
	}
</style>
-->