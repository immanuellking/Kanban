import { NextResponse } from "next/server";
import Board from "@/models/Board";
import dbConnect from "@/lib/mongoose";

export async function POST(req: Request) {
  await dbConnect(); // Optional if you're using Mongoose or a similar setup

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User is not authenticated." },
        { status: 401 }
      );
    }

    const boardsMg = await Board.where("user_id")
      .equals(userId)
      .select("board_name user_id");

    const boards = boardsMg.map((board) => ({
      user_id: board.user_id,
      board_name: board.board_name,
      _id: board._id.toString(),
    }));

    return NextResponse.json(
      { success: true, boards, message: "Board Tabs fetched successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching boards." },
      { status: 500 }
    );
  }
}
