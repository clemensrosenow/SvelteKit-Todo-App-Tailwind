import { todos } from '$db/todos';
/*export async function GET(request: Request): Promise<Response> {
  // Add code to retrieve todos from MongoDB and respond with the data
  //const todos = []; // Replace this with your MongoDB retrieval logic
   //return json(todos);
   

   // Goal: Return a list of all todos from MongoDB

   //const completed = request.query.get('completed') === 'true' ? true : false;
   const completed = true

   return {
      status: 200,
      body: {
        completed: completed
      }
   }
}*/

/*export function POST(request: Request) {
   return {
      status: 200,
      body: {
        completed: true
      }
   }
  }*/

   // Add code to store the todo data in MongoDB
   
   // Goal: Store the created todo in MongoDB




export async function GET(request: Request): Promise<Response> {
  // Add code to retrieve todos from MongoDB and respond with the data
  //const todos = []; // Replace this with your MongoDB retrieval logic
   //return json(todos);
   

   // Goal: Return a list of all todos from MongoDB

   const completed = request.query.get('completed') === 'true' ? true : false;

   return {
      status: 200,
      body: {
        completed: completed
      }
   }
}

export async function POST({ request }) {
   const {task, completed} = await request.json();
   
   await todos.insertOne({
      task,
      completed
   })

   
   
   const response = new Response(
      "Todo created successfully.",
      { headers: { 'content-type': 'text/plain' } }
   )

   return response
}


export async function PUT (request: Request) {
  /*const { id } = request.params;
  const { text } = request.body as { text: string };

  // Add code to update the todo in MongoDB*/
   
   
   // Goal: Update the todo completed status in MongoDB 
}

export async function DELETE (request: Request) {
  /*const { id } = request.params;

  // Add code to delete the todo from MongoDB*/
   
      
   // Goal: Delete the todo from MongoDB based on the id
}