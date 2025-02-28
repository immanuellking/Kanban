import Board from "@/models/Board";
import Column from "@/models/Column";
import SubTask from "@/models/SubTask";
import Task from "@/models/Task";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { userId, board_id } = await request.json();

    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    const board = await Board.findById(board_id).select("columns");

    await Promise.all(
      board.columns.map(async (column_id: mongoose.Types.ObjectId) => {
        const colObj = await Column.findById(column_id).select("tasks");

        colObj.tasks.map(async (task_id: mongoose.Types.ObjectId) => {
          const taskObj = await Task.findById(task_id).select("subTasks");

          taskObj.subTasks.map(async (subtask_id: mongoose.Types.ObjectId) => {
            await SubTask.findByIdAndDelete(subtask_id);
          });

          await Task.findByIdAndDelete(task_id);
        });

        await Column.findByIdAndDelete(column_id);
      })
    );

    await Board.findByIdAndDelete(board_id);

    const user = await User.where("clerkId").equals(`${userId}`).select("_id");

    await User.findByIdAndUpdate(user[0]._id, {
      $pull: { boards: board_id },
    });

    return NextResponse.json(
      { success: true, message: "Board Deleted successfully.", board },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error Deleting Board:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
