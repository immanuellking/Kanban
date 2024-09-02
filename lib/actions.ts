"use server";
import dbConnect from "./mongoose";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function addNewUserToDb() {
  const { userId } = auth(); // Extract the userId from Clerk authentication
  if (!userId) {
    // throw new Error("User is not authenticated.");
    console.log("User is not authenticated.");
    return false;
  }

  // Fetch user information from Clerk
  const user = await fetchClerkUser(userId); // Function to fetch user details
  const email = user?.email_addresses[0].email_address;

  await dbConnect();

  const userExist = await User.findOne({ email });

  if (!userExist) {
    const userAll = await User.create({
      email: email,
      clerkId: userId,
    });

    return true;
  }

  return true;
}

async function fetchClerkUser(userId: string) {
  const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Add your Clerk API key in .env.local
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details from Clerk.");
  }
  const data = await response.json();

  return data;
}

export async function getAllBoards() {}
