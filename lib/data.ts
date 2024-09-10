import Board from "@/models/Board";
import dbConnect from "./mongoose";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function createNewUser() {
  const { userId } = auth(); // Extract the userId from Clerk authentication
  if (!userId) {
    // throw new Error("User is not authenticated.");
    console.log("User is not authenticated.");
    return false;
  }

  // Fetch user information from Clerk
  const user = await fetchClerkUser(userId);
  const email = user?.email_addresses[0].email_address;

  await dbConnect();

  const userExist = await User.findOne({ email });

  if (!userExist) {
    await User.create({
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
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details from Clerk.");
  }
  const data = await response.json();

  return data;
}

export async function getBoardTabs() {
  const { userId } = auth();

  if (!userId) {
    console.error("User is not authenticated.");
    return [];
  }

  try {
    const boardsMg = await Board.where("user_id")
      .equals(`${userId}`)
      .select("board_name user_id");

    const boards = boardsMg.map((board) => ({
      user_id: board.user_id,
      board_name: board.board_name,
      _id: board._id.toString(),
    })); // Convert to plain objects

    // console.log("USER CHECKING", boardsMg);

    if (!boards) {
      console.log("No boards found for the user.");
      return [];
    }

    return boards;
  } catch (error) {
    console.error("Error fetching boards:", error);
    return [];
  }
}

export async function getBoardData(query: string) {
  const boardRawData = await Board.where("board_name")
    .equals(`${query}`)
    .select("columns")
    .populate("columns");

  if (boardRawData.length > 0 && boardRawData[0].columns) {
    const boardData = boardRawData[0].columns.map((column: any) => ({
      // Map through the columns as needed
      _id: column._id.toString(),
      column_name: column.column_name,
    }));

    console.log("Mapped Board Data:", boardData);
    return boardData;
  } else {
    console.log("No columns found for the given board.");
    return [];
  }
  // console.log("Board DATA", boradRawData?.columns);
}
