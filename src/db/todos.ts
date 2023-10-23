import db from '$db/mongodb'

export const todos = db.collection('todo_items');