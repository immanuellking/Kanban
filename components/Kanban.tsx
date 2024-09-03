import SideBar from "./SideBar";
import MainBoard from "./MainBoard";
import { createNewUser, getAllBoards } from "@/lib/data";


async function Kanban() {
    const isSignedIn = await createNewUser()
    const check = await getAllBoards();

  return (
    <main className="flex h-screen">
      <SideBar />
      <MainBoard isSignedIn={isSignedIn} />
    </main>
  );
}

export default Kanban;
