"use client";
import { useDialog } from "@/context/dialogContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function BoardTabs({ boardTabs }: { boardTabs: BoardTab[] }) {
  const { openDialog } = useDialog();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (boardTabs && !params.get("board")) {
      params.set("board", boardTabs[0]?.board_name);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  return (
    <div className="mt-[5rem] space-y-4 flex-1 h-full">
      <span className="pl-6 text-gray-400 text-sm">
        {boardTabs.length > 1
          ? `All Boards (${boardTabs.length})`
          : "No boards"}
      </span>

      <div className="h-full">
        <ul className="pr-6 space-y-4 max-h-[25rem] overflow-y-auto no-scrollbar">
          {boardTabs.map((board: BoardTab, idx) => (
            <li
              key={idx}
              className="text-white flex items-center gap-x-2 bg-[#635FC7] py-4 pl-6 rounded-r-full cursor-pointer"
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
              <p className="text-base font-medium">{board.board_name}</p>
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
  );
}
