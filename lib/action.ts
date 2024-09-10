"use server";
import Board from "@/models/Board";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Column from "@/models/Column";

type BoardType = {
  board_name: string;
  columns: { column_name: string }[];
};

export async function createBoard(values: BoardType) {
  noStore();
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const board = await Board.create({
      board_name: values.board_name,
      user_id: userId,
    });

    const createdColumns = await Promise.all(
      values.columns.map((column) =>
        Column.create({
          column_name: column.column_name,
          user_id: userId,
          board_id: board._id, // Set the board_id later when the board is created
        })
      )
    );

    const columnIds = createdColumns.map((column) => column._id);

    await Board.findByIdAndUpdate(board._id, {
      columns: columnIds,
    });

    // console.log("Board Update with Id's", boardUpdate);

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $push: { boards: board._id } },
      { new: true }
    );
    // console.log("Updated User with Board", updatedUser);

    // Check if the user update was successful
    if (!updatedUser) {
      throw new Error("Failed to update the user with the new board.");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating board or updating user:", error);
    throw new Error("Failed to create board or update user.");
  }
}

export async function checkBoardNameExists(name: string): Promise<boolean> {
  try {
    // Assuming this is a database call; ensure it returns a document or null
    const result = await Board.findOne({ board_name: name });
    console.log("Does board name exist?", result);
    return !!result; // Return true if the result exists, false otherwise
  } catch (error) {
    console.error("Error checking board name existence:", error);
    return false; // Fallback to false in case of an error
  }
}
