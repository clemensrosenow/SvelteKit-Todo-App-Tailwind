import { todos } from "$db/todos";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async function () {
   const data = await todos.find({}).toArray()
   //console.log(data)

   
   // Convert ObjectId to a string for serialization expected from SvelteKit
   //Überlegen, ob Conversion wirklich nötig ist, oder nur für die Darstellung
   const todosData = data.map(todo => {
      todo._id = todo._id.toString(); 
      return todo;
   });

   return {
      todos: todosData
   }
}

export const actions = {
   create: async ({ request }) => {
      const data = await request.formData();
      const task = data.get('todoText');

      /*if (task === "") {
         throw new Error("Task cannot be empty.");
      }

      const existingTodo = await todos.findOne({ task });
      
      //Better Error Handling
      if (existingTodo) {
         throw new Error("Task already exists.");
      }*/
      
      todos.insertOne({
         task,
         completed: false
      });
   }
      
}