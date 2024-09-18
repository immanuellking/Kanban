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
  subtask_name: string;
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
    console.log("Does board name exist?", result);
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
