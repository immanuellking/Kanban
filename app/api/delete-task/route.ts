import Column from "@/models/Column";
import SubTask from "@/models/SubTask";
import Task from "@/models/Task";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { userId, task_id } = await request.json();

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const task = await Task.findById(task_id);

    await Column.findByIdAndUpdate(task.column_id, {
      $pull: { tasks: task_id },
    });

    await Promise.all(
      task.subTasks.map(async (subtask: mongoose.Types.ObjectId) => {
        await SubTask.findByIdAndDelete(subtask);
      })
    );

    await Task.findByIdAndDelete(task._id);

    return NextResponse.json(
      { success: true, message: "Task Deleted successfully.", task },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error deleting task:", error);

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
