import { NextRequest, NextResponse } from "next/server";
import Board from "@/models/Board"; // Import your Mongoose model
import dbConnect from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB is connected

    const { name } = await req.json(); // Get board name from request body
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Board name is required." },
        { status: 400 }
      );
    }

    const boardExists = await Board.findOne({ board_name: name });

    return NextResponse.json(
      { success: true, exists: !!boardExists },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking board name:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}

