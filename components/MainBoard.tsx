import BoardContainer from "./BoardContainer";
import BoardHeader from "./BoardHeader";

export default function MainBoard({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <main className="w-full h-screen flex flex-col">
      <BoardHeader />
      <BoardContainer isSignedIn={isSignedIn} />
    </main>
  );
}
