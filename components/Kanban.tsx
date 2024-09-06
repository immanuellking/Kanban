import SideBar from "./SideBar";
import MainBoard from "./MainBoard";
import { createNewUser, getAllBoards } from "@/lib/data";

async function Kanban() {
  const isSignedIn = await createNewUser();
  const boardTabs = await getAllBoards();

  return (
    <main className="flex h-screen">
      <SideBar boardTabs={boardTabs} />
      <MainBoard isSignedIn={isSignedIn} />
    </main>
  );
}

export default Kanban;
