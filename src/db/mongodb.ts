//@ts-nocheck
import {MongoClient} from "mongodb"
import dotenv from 'dotenv'
dotenv.config()

const URI = process.env['MONGODB_URI'];
const CLIENT = new MongoClient(URI)

export function startMongoDB() {
   console.log("Starting Mongo...")

   if (process.env['NODE_ENVIRONMENT'] === 'development') {
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
export default CLIENT.db(process.env["DATABASE_NAME"])