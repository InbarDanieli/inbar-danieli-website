import mongoose from "mongoose";

export const connectToDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }
  return mongoose
    .connect(MONGODB_URI, { dbName: "crochet_db" })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};