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
		/*toggle: (todoId: string) => {
			update(($todos) =>
				$todos.map((todo: Todo) => {
               if (todo.id === todoId) {
                  console.log("Todo store value: ", todo.completed)
                  console.log("New store value", !todo.completed)
						return { ...todo, completed: !todo.completed };
					}
					return todo;
				})
			);
		}*/
	};
}

export const todos = customTodoStore();
export const remainingTodos = derived(
	todos,
	($todos) => $todos.filter((todo: Todo) => !todo.completed).length
);
export const darkMode = writable(false);
const filters = ['All', 'Active', 'Completed'];
export const filterOptions = readable(filters);
export const filterCriterion = writable(filters[0]);

/*export const displayedTodos = derived([todos, filterCriterion], ([$todos, $filterCriterion]) => {
	switch ($filterCriterion) {
		case 'Active':
			return $todos.filter((todo: Todo) => !todo.completed);
		case 'Completed':
			return $todos.filter((todo: Todo) => todo.completed);
		case 'All':
		default:
			return $todos;
	}
});*/
