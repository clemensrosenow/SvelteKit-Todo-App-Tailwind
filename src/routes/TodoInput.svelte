<script lang="ts">
   import { enhance } from "$app/forms";
   import { filterCriterion, filterOptions, todos } from "../stores";
	let todoText = '';
   let creating = false;

</script>

<form
   method="post" action="?/create" use:enhance={() => {
      //Switch from completed to all todos when creating a new todo
      if ($filterCriterion === $filterOptions[2]) {
         $filterCriterion = $filterOptions[0];
      }
      
      todos.create(todoText)
      creating = true;

      return async ({update}) => {
         await update()
         creating = false
      }
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
		class="flex-1 px-4 py-3 bg-transparent border-0 rounded-sm form-input text-mainText-light caret-brightBlue placeholder-fadedText-light disabled:contrast-50"
	/>
	<button type="submit" disabled={creating} class="pr-2 text-mainText-light disabled:contrast-50" 
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-add w-9 "
			><path
				class="secondary"
            class:fill-mainText-light={todoText !== ''}
				fill-rule="evenodd"
				d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
			/></svg
		></button
	>
</form>