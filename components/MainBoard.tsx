import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";

export default function MainBoard({ boardData }: { boardData: BoardData[] }) {
  return (
    <main className="w-full sm:w-[75%] lg:w-[82%] flex-grow h-screen flex flex-col">
      <BoardHeader boardData={boardData} />
      <BoardContainer boardData={boardData} />
    </main>
  );
}
