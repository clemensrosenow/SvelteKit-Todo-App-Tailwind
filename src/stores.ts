import { writable, derived, readable } from 'svelte/store';

export interface Todo {
	task: string;
   _id: string;
	completed: boolean;
}

function createTodoStore() {
	const initialTodos: Todo[] = [];
	const { subscribe, set, update } = writable(initialTodos);

	return {
		subscribe,
		set,
		add: (task: string) => {
			const todo = {
				task,
				completed: false,
				_id: Date.now().toString()
			};
			update(($todos) => [todo, ...$todos]);
		},
		clearCompleted: () => {
			update(($todos) => $todos.filter((todo: Todo) => !todo.completed));
		},
		remove: (todoId: string) => {
			update(($todos) => $todos.filter((todo: Todo) => todo._id !== todoId));
		},
		toggle: (todoId: string) => {
			update(($todos) =>
				$todos.map((todo: Todo) => {
					if (todo._id === todoId) {
						return { ...todo, completed: !todo.completed };
					}
					return todo;
				})
			);
		}
	};
}

export const todos = createTodoStore();
export const remainingTodos = derived(
	todos,
	($todos) => $todos.filter((todo: Todo) => !todo.completed).length
);
export const darkMode = writable(false);
const filters = ['All', 'Active', 'Completed'];
export const filterOptions = readable(filters);
export const filterCriterion = writable(filters[0]);

export const displayedTodos = derived([todos, filterCriterion], ([$todos, $filterCriterion]) => {
	switch ($filterCriterion) {
		case 'Active':
			return $todos.filter((todo: Todo) => !todo.completed);
		case 'Completed':
			return $todos.filter((todo: Todo) => todo.completed);
		case 'All':
		default:
			return $todos;
	}
});