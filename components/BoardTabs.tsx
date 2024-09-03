import React from "react";
import CreateNewBoardButton from "./CreateNewBoardButton";

export default function BoardTabs() {
  return (
    <div className="mt-[5rem] space-y-4 flex-1 h-full">
      <span className="pl-6 text-gray-400 text-sm">All Boards (2)</span>

      <div className="h-full">
        <ul className="pr-6 space-y-4 max-h-[25rem] overflow-y-auto no-scrollbar">
          <li className="text-white flex items-center gap-x-2 bg-[#635FC7] py-4 pl-6 rounded-r-full cursor-pointer">
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
            <p className="text-base font-medium">Testing 1</p>
          </li>
        </ul>
        <CreateNewBoardButton />
      </div>
    </div>
  );
}
