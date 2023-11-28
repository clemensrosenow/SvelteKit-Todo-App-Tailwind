import { todos } from '$db/todos';
import { ObjectId } from 'mongodb';

export async function PATCH({ params }) {
	//Toggle todo in MongoDB using ID from url params
	await todos.updateOne({ _id: new ObjectId(params.id.toString()) }, [
		{ $set: { completed: { $not: '$completed' } } }
	]);

	return new Response(null, { status: 204 });
}

/*Create API endpoint to swap order of todos by swapping ids: 
const [todo1, todo2] = await Promise.all([
            todosCollection.findOne({ id: todoId1 }),
            todosCollection.findOne({ id: todoId2 })
        ]);

        // Update the documents in the collection to swap their positions using Promise.all()
        await Promise.all([
            todosCollection.updateOne({ id: todoId1 }, { $set: todo2 }),
            todosCollection.updateOne({ id: todoId2 }, { $set: todo1 })
        ]);*/
