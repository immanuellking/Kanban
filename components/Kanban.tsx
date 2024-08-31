import React from "react";
import SideBar from "./SideBar";
import MainBoard from "./MainBoard";

function Kanban() {
  return (
    <main className="flex min-h-[100vh]">
      <SideBar />

      <MainBoard />
    </main>
  );
}

export default Kanban;
