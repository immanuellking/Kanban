import SideBar from "./SideBar";
import MainBoard from "./MainBoard";
import { addNewUserToDb, getAllBoards } from "@/lib/actions";


async function Kanban() {
    const isSignedIn = await addNewUserToDb()
    const check = await getAllBoards();

  return (
    <main className="flex h-screen">
      <SideBar />
      <MainBoard isSignedIn={isSignedIn} />
    </main>
  );
}

export default Kanban;
