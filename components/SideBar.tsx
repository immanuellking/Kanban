"use client";
import Logo from "./Logo";
import BoardTabs from "./BoardTabs";
import { useState } from "react";

export default function SideBar() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <aside
        className={`${
          open ? "flex" : "hidden"
        } w-[23%] bg-[#2B2C37] border-r-[1px] border-[#828fa3]/30 pt-8 pb-4 h-screen flex-col`}
      >
        <Logo />

        <BoardTabs />

        <button
          className="mt-auto mr-6 pl-6 py-4 text-white flex items-center gap-x-3 hover:bg-white hover:text-[#635FC7] rounded-r-full capitalize transition-all duration-150 ease-linear cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"></path>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"></path>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"></path>
          </svg>
          <p>hide SideBar</p>
        </button>
      </aside>
      <div
        className={`${
          open ? "hidden" : "block absolute bottom-20 left-0"
        } bg-[#635FC7] hover:bg-[#635Fc7]/80 text-white py-4 px-4 rounded-r-full cursor-pointer transition-all ease-linear duration-150`}
        onClick={() => setOpen(true)}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1.5rem"
          width="1.5rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
        </svg>
      </div>
    </>
  );
}
