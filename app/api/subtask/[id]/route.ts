import SubTask from "@/models/SubTask";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId, value } = await request.json();

  try {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    const subTask = await SubTask.findByIdAndUpdate(params.id, {
      is_complete: value,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Task successfully updated",
        sub_task: subTask,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error checking/unchecking subtask", error);

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
