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
    await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(`Error connecting to MongoDB: , ${error}`);
  }
}

export default dbConnect;
