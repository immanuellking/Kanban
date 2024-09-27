"use client";
import { useDialog } from "@/context/dialogContext";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddNewTaskModal from "./AddNewTaskModal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DeleteBoardModal from "./DeleteBoardModal";
import { useAuth } from "@clerk/nextjs";
import SignOut from "./SignOut";

export default function BoardHeader({ boardData }: { boardData: BoardData[] }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentTab = params.get("board");
  const { sessionId } = useAuth();

  const { openNewTaskDialog, openEditBoard, openDeleteBoard } = useDialog();

  const columns = boardData[0]?.columns;

  const handleEditingBoard = () => {
    const editCol = columns.map((col) => ({
      column_id: col._id,
      column_name: col.column_name,
    }));
    const boardEditData = {
      board_id: boardData[0].board_id,
      board_name: boardData[0].board_name,
      columns: editCol,
    };
    // console.log(boardEditData)
    openEditBoard(boardEditData);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between px-10 h-[13vh] bg-[#2B2C37]">
        <div>
          <h1 className="text-2xl text-white font-semibold capitalize">
            {currentTab}
          </h1>
        </div>

        <div className="flex gap-x-12">
          {sessionId && (
            <SignOut />
          )}

          <div className="flex items-center gap-x-2">
            <button
              className="flex text-white font-semibold bg-[#635FC7] py-4 px-8 rounded-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!boardData.length}
              onClick={() => openNewTaskDialog(false)}
            >
              {" "}
              {/*Disale when board is empty*/}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-[3rem]"
                height="1.5rem"
                width="1.5rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
              </svg>
              Add New Task
            </button>

            <Popover>
              <PopoverTrigger
                className="hover:bg-[#20212c] py-3 px-0.5 rounded-full transition-all ease-linear duration-150 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!boardData.length}
              >
                {/* <button
                  className="hover:bg-[#20212c] py-3 px-0.5 rounded-full transition-all ease-linear duration-150 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!boardData.length} */}
                {/* > */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-[1.2rem] text-[#828fa3]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                </svg>
                {/* </button> */}
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={20}
                className="bg-[#20212c] border-none rounded-none shadow-md shadow-[#635FC7]/50 w-[18rem] m-0 p-0"
              >
                <div
                  className="text-gray-500 px-8 py-3 cursor-pointer"
                  onClick={handleEditingBoard}
                >
                  Edit Board
                </div>
                <div
                  className="text-red-500 px-8 py-3 cursor-pointer"
                  onClick={() => openDeleteBoard()}
                >
                  Delete Board
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <AddNewTaskModal columns={columns} />
      {boardData.length > 0 && (
        <DeleteBoardModal
          boardName={boardData[0].board_name}
          boardId={boardData[0].board_id}
        />
      )}
    </>
  );
}
