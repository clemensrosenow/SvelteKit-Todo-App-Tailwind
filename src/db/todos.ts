import db from '$db/mongodb'
import { COLLECTION_NAME } from '$env/static/private';

export const todos = db.collection(COLLECTION_NAME);