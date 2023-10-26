import { todos } from '$db/todos';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	//Load all todos with the newest first
	const data = await todos.find().sort({ _id: -1 }).toArray();

	// Convert MongoDB ObjectId index "_id" to string for serialization expected from SvelteKit
	const todosData = data.map((todo) => {
		const { _id, ...properties } = todo;

		return { id: _id.toString(), ...properties };
	});

	return {
		todos: todosData
	};
};

export const actions = {
	clearCompleted: async () => {
		todos.deleteMany({ completed: true });
	},
	create: async ({ request }) => {
		const data = await request.formData();
      const task = data.get('todoText');
      if (!task) {
			throw new Error('Task cannot be empty.');
		}

		const insertResult = await todos.insertOne({
			task,
			completed: false,
      });

      const objectId = insertResult.insertedId;
      
      // Return objectId to client
      return { objectId };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (!id) {
			throw new Error('No ID provided.');
		}

		todos.deleteOne({ _id: new ObjectId(id.toString()) });
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (!id) {
			throw new Error('No ID provided.');
		}
		todos.updateOne({ _id: new ObjectId(id.toString()) }, [
			{ $set: { completed: { $not: '$completed' } } }
		]);
	}
};
