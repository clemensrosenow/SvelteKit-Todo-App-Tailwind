import { todos } from '$db/todos';
import { ObjectId } from 'mongodb';

export async function PATCH({ params }) {
   //Toggle todo in MongoDB using ID from url params
	await todos.updateOne({ _id: new ObjectId(params.id.toString()) }, [
		{ $set: { completed: {$not: "$completed"} } }
	]);

   return new Response(null, { status: 204 });
}
