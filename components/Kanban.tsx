import SideBar from "./SideBar";
import MainBoard from "./MainBoard";
import { createNewUser, getBoardTabs, getBoardData } from "@/lib/data";
import MobileBoardTabs from "./MobileBoardTabs";

async function Kanban({ boardQuery }: { boardQuery: string }) {
  const isSignedIn = await createNewUser();
  const boardTabs = await getBoardTabs();
  const boardData = await getBoardData(boardQuery);

  return (
    <>
      <main className="flex h-screen overflow-hidden">
        <SideBar boardTabs={boardTabs} />
        <MainBoard isSignedIn={isSignedIn} boardData={boardData} />
      </main>
      <MobileBoardTabs boardTabs={boardTabs} />
    </>
  );
}

export default Kanban;
