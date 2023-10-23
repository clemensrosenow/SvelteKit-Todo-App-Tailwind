import { startMongoDB } from "$db/mongodb";

startMongoDB().then(() => {
   console.log("Mongo started")
}).catch((error:Error) => console.error(error))