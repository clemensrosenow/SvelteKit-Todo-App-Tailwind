//@ts-nocheck
import {MongoClient} from "mongodb"
import { MONGODB_URI, NODE_ENVIRONMENT, DATABASE_NAME } from "$env/static/private";


const CLIENT = new MongoClient(MONGODB_URI)

export function startMongoDB() {
   console.log("Starting Mongo...")

   if (NODE_ENVIRONMENT === 'development') {
      //Preserves value across module reloads caused by Hot Module Replacement in development mode
      
      if (!global._mongoClientPromise) {
         global._mongoClientPromise = CLIENT.connect()
      }
      return global._mongoClientPromise
   }
   //In production mode, no global variable is used
   return CLIENT.connect()
}

// Database can be shared across functions
export default CLIENT.db(DATABASE_NAME)