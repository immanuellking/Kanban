import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";

export default function MainBoard({
  isSignedIn,
  boardData,
}: {
  isSignedIn: boolean;
  boardData: BoardData[];
}) {
  return (
    <main className="w-full sm:w-[75%] lg:w-[82%] flex-grow h-screen flex flex-col">
      <BoardHeader boardData={boardData}/>
      <BoardContainer isSignedIn={isSignedIn} boardData={boardData} />
    </main>
  );
}
