/*import { writable, derived, readable } from "svelte/store";


interface Todo {
   task: string,
   id: number,
   completed: boolean
}

export const darkMode = writable(false)


function createTodoStore() {

   const { subscribe, set, update } = writable([])

   return {
      subscribe,
      set,
      add: (task:string) => {
         const todo = {
            task,
            completed: false,
            id: Date.now()
         }
         update(($todos) => [todo, ...$todos])
      },
      clearCompleted: () => {
         update($todos => $todos.filter(todo => !todo.completed))
      },
      remove: (todoId:number) => {
         update($todos => $todos.filter((todo) => todo.id !== todoId))
      },
      toggle: (todoId:number) => {
         update(($todos:Todo[]) => $todos.map((todo:Todo) => {
            if (todo.id === todoId) {
               return { ...todo, completed: !todo.completed }
            }
            return todo
         }))
      }
   }
}

export const todos = createTodoStore()

export const remainingTodos = derived(todos, ($todos) => $todos.filter((todo:Todo) => !todo.completed).length)

const filters = ["All", "Active", "Completed"]
export const filterOptions = readable(filters)
export const filterCriterion = writable(filters[0])

export const displayedTodos = derived([todos, filterCriterion], ([$todos, $filterCriterion]) => {
   switch ($filterCriterion) {
      case 'Active':
         return $todos.filter((todo:Todo) => !todo.completed);
      case 'Completed':
         return $todos.filter((todo:Todo) => todo.completed);
      case "All":
      default:
         return $todos;
   }
})*/