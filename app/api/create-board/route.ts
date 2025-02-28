import Board from "@/models/Board";
import Column from "@/models/Column";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS", // Allowed methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const values = await request.json();

    const { userId, board_name, columns } = values;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const board = await Board.create({
      board_name: board_name.trim(),
      user_id: userId,
    });

    const columnIds = await createdColumns(columns, userId, board._id);

    await Board.findByIdAndUpdate(board._id, {
      columns: columnIds,
    });

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { $push: { boards: board._id } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update the user with the new board.");
    }

    return NextResponse.json(
      { success: true, message: "Board created successfully.", board },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow requests from anywhere
        },
      }
    );
  } catch (error) {
    console.error("Error Creating board:", error);

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

async function createdColumns(
  columns: { column_name: string }[],
  user_id: string,
  board_id: string
) {
  const createdColumns = await Promise.all(
    columns.map((column) =>
      Column.create({
        column_name: column.column_name.trim(),
        user_id: user_id,
        board_id: board_id,
        tasks: [],
      })
    )
  );

  const columnIds = createdColumns.map((column) => column._id);

  return columnIds;
}
