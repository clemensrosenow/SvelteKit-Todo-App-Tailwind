import { todos } from '$db/todos';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	//Load all todos with the newest first
	const data = await todos.find().sort({ _id: -1 }).toArray();

	const todosData = data.map((todo) => {
		//@ts-ignore
		todo._id = todo._id.toString(); // Convert ObjectId to a string for serialization expected from SvelteKit
		return todo;
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

		if (task === '') {
			throw new Error('Task cannot be empty.');
      }
      

		//Handle task to be unique with MongoDB
		// Server currently crashes when creating a duplicate task

		try {
			/*todos.updateOne(
				{ task },
				{
					$set: {
						task,
						completed: false
					}
				}
			);*/
			/*todos.insertOne({
				task,
				completed: false
			});*/
		} catch (error: any) {
			if (error.code === 11000) {
				console.log('Task already exists');
			}
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const _id = data.get('_id');
		if (!_id) {
			throw new Error('No ID provided.');
		}
		todos.deleteOne({ _id: new ObjectId(_id.toString()) });
	},
	toggle: async ({ request }) => {
		const data = await request.formData();
		const _id = data.get('_id');
		if (!_id) {
			throw new Error('No ID provided.');
		}
		todos.updateOne({ _id: new ObjectId(_id.toString()) }, [
			{ $set: { completed: { $not: '$completed' } } }
		]);
	}
};
