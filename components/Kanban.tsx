import React from "react";
import SideBar from "./SideBar";
import MainBoard from "./MainBoard";

function Kanban() {
  return (
    <main className="flex h-screen">
      <SideBar />

      <MainBoard />
    </main>
  );
}

export default Kanban;
