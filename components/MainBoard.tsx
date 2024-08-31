import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";

export default function MainBoard() {
  return (
    <main className="w-full h-screen flex flex-col">
      <BoardHeader />
      <BoardContainer />
    </main>
  );
}
