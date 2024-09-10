import SideBar from "./SideBar";
import MainBoard from "./MainBoard";
import { createNewUser, getBoardTabs, getBoardData } from "@/lib/data";

async function Kanban({ boardQuery }: { boardQuery: string }) {
  const isSignedIn = await createNewUser();
  const boardTabs = await getBoardTabs();
  const boardData = await getBoardData(boardQuery);

  return (
    <main className="flex h-screen">
      <SideBar boardTabs={boardTabs} />
      <MainBoard isSignedIn={isSignedIn} boardData={boardData} />
    </main>
  );
}

export default Kanban;
