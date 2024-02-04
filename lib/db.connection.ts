import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("missing mongo db url");
  if (isConnected) console.log("Mongo DB Connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "debug-overflow",
    });
    isConnected = true;
    console.log("mongo db is connected");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
