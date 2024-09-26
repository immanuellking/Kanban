"use client";
import { useDialog } from "@/context/dialogContext";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddNewTaskModal from "./AddNewTaskModal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function BoardHeader({ boardData }: { boardData: BoardData[] }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentTab = params.get("board");

  const { openNewTaskDialog, openEditBoard } = useDialog();

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
    openEditBoard(boardEditData)
  };

  return (
    <>
      <div className="w-full flex items-center justify-between px-10 py-6 bg-[#2B2C37]">
        <div>
          <h1 className="text-2xl text-white font-semibold capitalize">
            {currentTab}
          </h1>
        </div>

        <div className="flex gap-x-12">
          <button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-[2rem] text-[#828fa3]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Logout">
                <g>
                  <path d="M20.968,18.448a2.577,2.577,0,0,1-2.73,2.5c-2.153.012-4.306,0-6.459,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.647A1.546,1.546,0,0,0,19,4.175a3.023,3.023,0,0,0-1.061-.095H11.779a.5.5,0,0,1,0-1c2.224,0,4.465-.085,6.687,0a2.567,2.567,0,0,1,2.5,2.67Z"></path>
                  <path d="M3.176,11.663a.455.455,0,0,0-.138.311c0,.015,0,.028-.006.043s0,.027.006.041a.457.457,0,0,0,.138.312l3.669,3.669a.5.5,0,0,0,.707-.707L4.737,12.516H15.479a.5.5,0,0,0,0-1H4.737L7.552,8.7a.5.5,0,0,0-.707-.707Z"></path>
                </g>
              </g>
            </svg>
          </button>

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
              <PopoverTrigger className="hover:bg-[#20212c] py-3 px-0.5 rounded-full transition-all ease-linear duration-150 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!boardData.length}>
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
                <div className="text-red-500 px-8 py-3 cursor-pointer">
                  Delete Board
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <AddNewTaskModal columns={columns} />
    </>
  );
}
