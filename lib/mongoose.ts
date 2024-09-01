// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    console.log("User already connected to MongoDB");
    return;
  }

  try {
    const url = process.env.MONGO_URL;
    if (!url) {
      throw new Error("Define MONGO_URI in your env.local");
    }

    await mongoose.connect(url);

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(`Error connecting to MongoDB: , ${error}`);
  }
}

export default dbConnect;
