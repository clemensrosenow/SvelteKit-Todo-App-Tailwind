<!--
<script lang="ts">
	import { todos } from '../stores';
	let todoText = '';

   async function addTodo() {
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
   }
</script>

<form
	on:submit|preventDefault={() => {
		todos.add(todoText);
		todoText = '';
	}}
>
	<input type="text" placeholder="Create a new todo..." bind:value={todoText} />
   {#if todoText !== ''}
      <button type="submit">+ Create todo</button>
   {/if}
</form>

<style>
   /*Breite noch richtig festlegen*/
   input {
      font-size: 1em;
      color: var(--main-text);
      width: 0;
      flex-grow: 1;
   }
   input::placeholder {
      color: var(--faded-text);
   }

   form {
      background-color: var(--list-background);
      display: flex;
      justify-content: space-between;
      gap: 1em;
   }

   button {
      color: var(--faded-text);
   }
</style>
-->