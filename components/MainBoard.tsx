import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";

export default function MainBoard({
  isSignedIn,
  boardData,
}: {
  isSignedIn: boolean;
  boardData: Column[];
}) {
  return (
    <main className="w-full h-screen flex flex-col">
      <BoardHeader />
      <BoardContainer isSignedIn={isSignedIn} boardData={boardData} />
    </main>
  );
}
