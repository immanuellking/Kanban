"use client";
import { useDialog } from "@/context/dialogContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";

export default function BoardTabs({ boardTabs }: { boardTabs: BoardTab[] }) {
  const { state, openDialog, setIsLoading } = useDialog();
  const [active, setActive] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function setTabInView(board_name: string) {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("board", board_name);
    setActive(board_name);
    router.replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const boardParam = params.get("board");
    const firstTab = boardTabs[0]?.board_name;

    if (boardTabs.length > 0) {
      // If no 'board' param, set the first tab as active
      if (!boardParam) {
        params.set("board", firstTab);
        setActive(firstTab);
        router.replace(`${pathname}?${params.toString()}`);
      }
      // If a valid 'board' param exists, set it as active
      else if (
        boardParam &&
        boardTabs.some((tab) => tab.board_name === boardParam)
      ) {
        setActive(boardParam);
      }
      // If 'board' param is invalid, fallback to the first tab
      else {
        params.set("board", firstTab);
        setActive(firstTab);
        router.replace(`${pathname}?${params.toString()}`);
      }
    } else {
      // No board tabs exist, so remove 'board' param
      params.delete("board");
      router.replace(`${pathname}`);
    }
  }, [boardTabs, searchParams, pathname, router, active]);

  return (
    <>
      <div className="mt-[5rem] space-y-4 flex-1 h-full">
        <span className="pl-6 text-gray-400 text-sm">
          {boardTabs.length > 0
            ? `All Boards (${boardTabs.length})`
            : "No boards"}
        </span>

        <div className="h-full">
          <ul className="pr-6 space-y-4 max-h-[25rem] overflow-y-auto no-scrollbar">
            {boardTabs.map((board: BoardTab, idx) => (
              <li
                key={idx}
                className={`text-gray-400 flex items-center gap-x-2 py-4 pl-6 rounded-r-full cursor-pointer ${
                  active === board.board_name
                    ? "bg-[#635FC7] text-white"
                    : "bg-transparent hover:text-[#635FC7] hover:bg-white transition-all duration-300 ease-linear"
                }`}
                onClick={() => setTabInView(board.board_name)}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[1.5rem] w-[1.5rem]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M4 12h8"></path>
                  <path d="M12 15h8"></path>
                  <path d="M12 9h8"></path>
                  <path d="M12 4v16"></path>
                </svg>
                <p className="text-base capitalize font-medium">{board.board_name}</p>
              </li>
            ))}
          </ul>
          <button
            className="flex items-center gap-x-2 text-[#635FC7] py-4 px-6 mt-2 rounded-r-full cursor-pointer"
            onClick={() => openDialog()}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.5rem] w-[1.5rem]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M4 12h8"></path>
              <path d="M12 15h8"></path>
              <path d="M12 9h8"></path>
              <path d="M12 4v16"></path>
            </svg>
            <p className="text-base font-medium">Create New Board</p>
          </button>
        </div>
      </div>
      {state.isLoading && <Loader />}
    </>
  );
}
