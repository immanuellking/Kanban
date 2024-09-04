"use server";

import Board from "@/models/Board";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

type BoardType = {
  board_name: string;
};

export async function createBoard(values: BoardType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const board = await Board.create({
      board_name: values.board_name,
    });

    const updateResult = await User.updateOne(
      { clerkId: userId },
      { $push: { boards: board._id } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error("Failed to update the user with the new board.");
    }

    revalidatePath("/");

    // return board; 
  } catch (error) {
    console.error("Error creating board or updating user:", error);
    throw new Error("Failed to create board or update user.");
  }
}
