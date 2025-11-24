import mongoose from "mongoose";

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  return mongoose.connect(MONGODB_URI as string).then((mongoose) => {
    console.log("MongoDB Connected successfully!");
    return mongoose;
  });
}

export default dbConnect;
