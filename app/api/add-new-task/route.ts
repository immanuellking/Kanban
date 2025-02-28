import Column from "@/models/Column";
import SubTask from "@/models/SubTask";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, values } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }
    const task = await Task.create({
      column_name: values.status.trim(),
      column_id: values.column_id,
      title: values.title,
      description: values.description.trim(),
    });

    await Column.findOneAndUpdate(
      { _id: values.column_id },
      { $push: { tasks: task._id } },
      { new: true }
    );

    const subtaskIds = await createdSubtasks(values.subtasks, task._id);

    const taskUpdate = await Task.findByIdAndUpdate(task._id, {
      subTasks: subtaskIds,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully.",
        task: taskUpdate,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error Adding New Task", error);

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

async function createdSubtasks(
  subtasks: { subtask_name: string }[],
  task_id: string
) {
  const createdSubtasks = await Promise.all(
    subtasks.map((subtask) =>
      SubTask.create({
        subtask: subtask.subtask_name,
        task_id: task_id,
      })
    )
  );
  const subtaskIds = createdSubtasks.map((subtask) => subtask._id);
  return subtaskIds;
}
