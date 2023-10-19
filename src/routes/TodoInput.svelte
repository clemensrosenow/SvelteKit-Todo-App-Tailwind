<script lang="ts">
	import { filterCriterion, filterOptions, todos } from '../stores';
	let todoText = '';

	/*async function addTodo() {
      try {
         const todo = {
            task: todoText, 
            completed: false
         }
         await fetch('/', {
            method: 'POST',
            body: JSON.stringify(todo)
         })
      } catch (error) {
         console.error(error)
      } finally {
         todoText = ''
      }
   }*/
</script>

<form
	on:submit|preventDefault={() => {
      // Added todo uncompleted by default -> view switch when from "completed" to "all" to ensure visibility
      if ($filterCriterion === $filterOptions[2]) {
         $filterCriterion = $filterOptions[0];
      }
		todos.add(todoText);
		todoText = '';
	}}
	class="flex justify-between gap-2 py-1 pl-1 bg-listBackground-light"
>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		placeholder="Create a new todo..."
		autofocus={true}
      required={true}
		bind:value={todoText}
		class="flex-1 px-4 py-2 bg-transparent border-0 rounded-sm form-input text-mainText-light caret-brightBlue placeholder-fadedText-light"
	/>
	<button type="submit" class="pr-2 text-mainText-light " 
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-add w-9"
			><path
				class="secondary"
            class:activated={todoText !== ''}
				fill-rule="evenodd"
				d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
			/></svg
		></button
	>
</form>

<style lang="postcss">
   .activated {
      fill: theme(colors.mainText.light);
   }
</style>