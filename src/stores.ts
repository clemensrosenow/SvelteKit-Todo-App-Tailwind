import { derived, readable, writable } from 'svelte/store';

export interface Todo {
	task: string;
	id: string;
	completed: boolean;
}

//Custom Todo store with CRUD operations
function customTodoStore() {
	const initialTodos: Todo[] = [];
	const { subscribe, set, update } = writable(initialTodos);

	return {
		subscribe,
		set,
		create: (newTodo:Todo) => {
			update(($todos) => [newTodo, ...$todos]);
		},
		clearCompleted: () => {
			update(($todos) => $todos.filter((todo: Todo) => !todo.completed));
		},
		delete: (todoId: string) => {
			update(($todos) => $todos.filter((todo: Todo) => todo.id !== todoId));
      },
      swap: (draggedId: string, enteredId: string) => { 
         update(($todos) => {
            //Get indices based on id
            const draggedIndex = $todos.findIndex((todo: Todo) => todo.id === draggedId);
            const enteredIndex = $todos.findIndex((todo: Todo) => todo.id === enteredId);

            //Swap todos in place
            [$todos[draggedIndex], $todos[enteredIndex]] = [$todos[enteredIndex], $todos[draggedIndex]];
            return $todos;
         })
      }
	};
}

export const todos = customTodoStore();
export const remainingTodos = derived(
	todos,
	($todos) => $todos.filter((todo: Todo) => !todo.completed).length
);
export const darkMode = writable(false);
export const filterOptions = readable(['All', 'Active', 'Completed']);