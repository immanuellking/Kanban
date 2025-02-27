import Board from "@/models/Board";
import Column from "@/models/Column";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, columns, board_id } = await request.json();

  try {
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const columnsData = await createdColumns(columns, userId, board_id);

    const columnIds = columnsData.map((column) => column._id);

    const boar = await Board.findByIdAndUpdate(
      board_id,
      { $push: { columns: { $each: columnIds } } },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Board created successfully.",
        columns: columnsData,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow requests from anywhere
        },
      }
    );
  } catch (error) {
    console.error("Error Creating New Column:", error);

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

  const columnsData = createdColumns.map((column) => column);

  return columnsData;
}
