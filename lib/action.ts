"use server";
import Board from "@/models/Board";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Column from "@/models/Column";
import Task from "@/models/Task";
import SubTask from "@/models/SubTask";

type BoardType = {
  board_name: string;
  columns: { column_name: string }[];
};

interface AddNewColumnType extends BoardType {
  board_id: string;
}

type Subtask = {
  _id: string;
  subtask_name: string;
  is_complete: boolean;
};

type TaskType = {
  column_id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[] | [];
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

    const columnIds = await createdColumns(values.columns, userId, board._id);

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
  } catch (error) {
    console.error("Error creating board or updating user:", error);
    throw new Error("Failed to create board or update user.");
  }
}

export async function checkBoardNameExists(name: string): Promise<boolean> {
  try {
    // Assuming this is a database call; ensure it returns a document or null
    const result = await Board.findOne({ board_name: name });
    // console.log("Does board name exist?", result);
    return !!result; // Return true if the result exists, false otherwise
  } catch (error) {
    console.error("Error checking board name existence:", error);
    return false; // Fallback to false in case of an error
  }
}

export async function addNewColumn(values: AddNewColumnType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  const columnIds = await createdColumns(
    values.columns,
    userId,
    values.board_id
  );

  await Board.findByIdAndUpdate(
    values.board_id,
    { $push: { columns: { $each: columnIds } } },
    { new: true }
  );

  revalidatePath("/");
}

async function createdColumns(
  columns: { column_name: string }[],
  userId: string,
  board_id: string
) {
  const createdColumns = await Promise.all(
    columns.map((column) =>
      Column.create({
        column_name: column.column_name,
        user_id: userId,
        board_id: board_id,
        tasks: [],
      })
    )
  );

  const columnIds = createdColumns.map((column) => column._id);

  return columnIds;
}

export async function addNewTask(values: TaskType) {
  const task = await Task.create({
    column_name: values.status,
    column_id: values.column_id,
    title: values.title,
    description: values.description,
  });

  // console.log("Checking task info", task);

  const columnUpdate = await Column.findOneAndUpdate(
    { _id: values.column_id },
    { $push: { tasks: task._id } },
    { new: true }
  );

  // console.log("Updated Column", columnUpdate);

  const subtaskIds = await createdSubtasks(values.subtasks, task._id);

  await Task.findByIdAndUpdate(task._id, { subTasks: subtaskIds });

  revalidatePath("/");
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

export async function handleSubtaskIsCompleted(value: boolean, id: string) {
  console.log("Check box status", value);
  const checked = await SubTask.findByIdAndUpdate(id, { is_complete: value });

  revalidatePath("/");
}


export const editTask = async (values: TaskType, prevVal: Task) => {
  const taskId = prevVal._id;
  const columnChanged = values.column_id !== prevVal.column_id;

  // Update task title and description if necessary
  const updateTaskInfo = async () => {
    if (
      values.title.trim() !== prevVal.title.trim() ||
      values.description.trim() !== prevVal.description.trim()
    ) {
      await Task.findByIdAndUpdate(taskId, {
        title: values.title,
        description: values.description,
      });
    }
  };

  // Handle subtask updates, additions, and deletions
  const updateSubtasks = async () => {
    const subtaskNames = new Set(
      values.subtasks.map((subtask) => subtask.subtask_name.trim())
    );
    const existingSubtaskNames = new Set();

    // Handle existing subtasks: Keep or remove
    await Promise.all(
      prevVal.subTasks.map(async (subtask) => {
        const trimmedName = subtask.subtask.trim();
        if (subtaskNames.has(trimmedName)) {
          existingSubtaskNames.add(trimmedName);
        } else {
          // Delete subtask and remove reference from the task
          await SubTask.findByIdAndDelete(subtask._id);
          await Task.findByIdAndUpdate(
            taskId,
            { $pull: { subTasks: subtask._id } },
            { new: true }
          );
        }
      })
    );

    // Add new subtasks
    await Promise.all(
      values.subtasks.map(async (subtask) => {
        const trimmedName = subtask.subtask_name.trim();
        if (!existingSubtaskNames.has(trimmedName)) {
          const newSubtask = await SubTask.create({ subtask: trimmedName });
          await Task.findByIdAndUpdate(
            taskId,
            { $push: { subTasks: newSubtask._id } },
            { new: true }
          );
        }
      })
    );

    // If there are no subtasks, clear them from the task
    if (values.subtasks.length === 0) {
      // Find all the existing subtask IDs for the task
      const subtaskIds = prevVal.subTasks.map((subtask) => subtask._id);

      // Delete all subtasks by their IDs
      await Promise.all(
        subtaskIds.map(async (id) => {
          await SubTask.findByIdAndDelete(id);
        })
      );

      // Clear the subTasks array in the task
      await Task.findByIdAndUpdate(taskId, { subTasks: [] });
    }
  };

  // Move task to a new column if necessary
  const handleColumnChange = async () => {
    if (columnChanged) {
      await Column.findByIdAndUpdate(prevVal.column_id, {
        $pull: { tasks: taskId },
      });
      await Column.findByIdAndUpdate(values.column_id, {
        $push: { tasks: taskId },
      });
      await Task.findByIdAndUpdate(taskId, {
        column_id: values.column_id,
        column_name: values.status,
      });
    }
  };

  try {
    await updateTaskInfo();
    await updateSubtasks();
    await handleColumnChange();
  } catch (error) {
    console.error("Error updating task:", error);
  }

  revalidatePath("/");
};