/*
import { todos } from "$lib/todos";


export const load = async function () {
   const data = await todos.find({}).toArray()
   console.log(data[0])
   
   //const result = await todos.insertMany([
      //{ task: "Abendessen", complete: false },
      //{ task: "VL einrichten", complete: false },
      //{ task: "MongoDB Setup", complete: true },
   //])
   
   // Convert ObjectId to a string for serialization expected from SvelteKit
   const todosData = data.map(todo => {
      todo._id = todo._id.toString(); 
      return todo;
   });

   return {
      todos: todosData
   }
}*/