import Column from "@/models/Column";
import SubTask from "@/models/SubTask";
import Task from "@/models/Task";
import { NextRequest, NextResponse } from "next/server";

type Subtask = {
  _id: string;
  subtask_name: string;
  is_complete: boolean;
};

export async function PATCH(request: NextRequest) {
  try {
    const { userId, values, prevVal } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const taskId = prevVal._id;
    const columnChanged = values.column_id !== prevVal.column_id;

    // Update task title and description if necessary
    const updateTaskInfo = async () => {
      if (
        values.title.trim() !== prevVal.title.trim() ||
        values.description.trim() !== prevVal.description.trim()
      ) {
        await Task.findByIdAndUpdate(taskId, {
          title: values.title.trim(),
          description: values.description.trim(),
        });
      }
    };

    // Handle subtask updates, additions, and deletions
    const updateSubtasks = async () => {
      const subtaskNames = new Set(
        values.subtasks.map((st: Subtask) => st.subtask_name.trim())
      );
      const existingSubtaskNames = new Set();

      // Handle existing subtasks: Keep or remove
      await Promise.all(
        prevVal.subTasks.map(
          async (subtask: {
            _id: string;
            subtask: string;
            is_complete: boolean;
          }) => {
            const trimmedName = subtask.subtask.trim();
            if (subtaskNames.has(trimmedName)) { // current values
              existingSubtaskNames.add(trimmedName);
            } else {
              await SubTask.findByIdAndDelete(subtask._id);
              await Task.findByIdAndUpdate(
                taskId,
                { $pull: { subTasks: subtask._id } },
                { new: true }
              );
            }
          }
        )
      );

      // Add new subtasks (avoid duplicates)
      await Promise.all(
        values.subtasks.map(async (subtask: Subtask) => {
          const trimmedName = subtask.subtask_name.trim();
          if (!existingSubtaskNames.has(trimmedName)) {
            existingSubtaskNames.add(trimmedName);
            const newSubtask = await SubTask.create({ subtask: trimmedName });
            await Task.findByIdAndUpdate(
              taskId,
              { $addToSet: { subTasks: newSubtask._id } },
              { new: true }
            );
          }
        })
      );

      // If no subtasks exist, clear them
      if (values.subtasks.length === 0) {
        const subtaskIds = prevVal.subTasks.map(
          (subtask: { _id: string; subtask: string; is_complete: boolean }) =>
            subtask._id
        );
        if (subtaskIds.length) {
          await SubTask.deleteMany({ _id: { $in: subtaskIds } });
          await Task.findByIdAndUpdate(taskId, { subTasks: [] });
        }
      }
    };

    // Move task to a new column if necessary
    const handleColumnChange = async () => {
      if (columnChanged) {
        await Column.findOneAndUpdate(
          { _id: prevVal.column_id },
          { $pull: { tasks: taskId } }
        );
        await Column.findOneAndUpdate(
          { _id: values.column_id },
          { $addToSet: { tasks: taskId } } // Use $addToSet to prevent duplicates
        );
        await Task.findByIdAndUpdate(taskId, {
          column_id: values.column_id,
          column_name: values.status,
        });
      }
    };

    const task = await Task.findById(taskId);

    await updateTaskInfo();
    await updateSubtasks();
    await handleColumnChange();

    return NextResponse.json(
      {
        success: true,
        message: "You have successfully edited Board",
        task: values,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating task:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}
