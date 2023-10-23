<script lang="ts">
	import { todos } from '../stores';
	//Noch ändern, sodass keine default values nötig
	export let task:string;
	export let completed:boolean;
	export let _id:string;
</script>

<!-- Häkchen nicht sichtbar wegen BG-->
<input
	type="checkbox"
	name="TodoToggle"
	id={_id}
	bind:checked={completed}
	on:change={() => todos.toggle(_id)}
	class="p-3 rounded-full border-lowContrast-light checked:text-brightBlue hover:cursor-pointer hover:border-brightBlue focus:outline-brightBlue"
/>
<label for={_id} class="flex-1 hover:cursor-grab">{task}</label>

<button
	on:click={() => {
		todos.remove(_id);
	}}
	class="ml-auto mr-2"
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
</style>
