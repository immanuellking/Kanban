import Board from "@/models/Board";
import Column from "@/models/Column";
import SubTask from "@/models/SubTask";
import Task from "@/models/Task";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Col = { column_id: string; column_name: string };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle CORS Preflight Request
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function PATCH(request: NextRequest) {
  try {
    const { board, prevBoard, userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const boardId = prevBoard.board_id;

    const updateBoardName = async () => {
      if (board.board_name.trim() !== prevBoard.board_name.trim()) {
        await Board.findByIdAndUpdate(boardId, {
          board_name: board.board_name.trim(),
        });
      }
    };

    const updateColumns = async () => {
      const existingColumnIds = board.columns // new board exiting column ids
        .map((col: Col) => col.column_id)
        .filter((col: string) => col !== "");
      const existingColumns = board.columns.filter(
        (col: Col) => col.column_id !== ""
      );
      const existingColumnNames = new Set(
        prevBoard.columns.map((col: Col) => col.column_name.trim())
      );
      const newColumns = board.columns
        .map((col: Col) => (col.column_id === "" ? col.column_name : ""))
        .filter((col: string) => col !== "");

      for (const col of prevBoard.columns) {
        if (!existingColumnIds.includes(col.column_id)) {
          const res = await Column.findById(col.column_id).select("tasks");
          console.log(res);

          if (res.tasks.length > 0) {
            res.tasks.map(async (taskId: mongoose.Types.ObjectId) => {
              const res = await Task.findById(taskId).select("subTasks");
              console.log("their subtasks", res);
              res.subTasks.map(async (subTaskId: mongoose.Types.ObjectId) => {
                await SubTask.findByIdAndDelete(subTaskId);
              });
              await Task.findByIdAndDelete(taskId);
            });
          }

          await Column.findByIdAndDelete(col.column_id);
        }
      }

      await Promise.all(
        existingColumns.map(async (col: Col) => {
          if (!existingColumnNames.has(col.column_name.trim())) {
            await Column.findByIdAndUpdate(col.column_id, {
              column_name: col.column_name.trim(),
            });
          }
        })
      );

      await Promise.all(
        newColumns.map(async (col: string) => {
          const newCol = await Column.create({
            column_name: col.trim(),
            user_id: userId,
            board_id: board.board_id,
          });

          await Board.findByIdAndUpdate(board.board_id, {
            $push: { columns: newCol._id },
          });
        })
      );
    };

    await updateBoardName();
    await updateColumns();

    const boardRawData = await Board.findOne({
      board_name: board.board_name.trim(),
    })
      .select("board_name columns")
      .populate({
        path: "columns",
        model: "Column",
        populate: {
          path: "tasks",
          model: "Task",
          populate: {
            path: "subTasks",
            model: "SubTask",
          },
        },
      })
      .lean() // Convert to plain object for better performance
      .exec(); // Ensures proper promise handling

    return NextResponse.json(
      {
        success: true,
        message: "You have successfully edited Board",
        board: boardRawData,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error Updating board:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}


