import { useDialog } from "@/context/dialogContext";

export default function EmptyBoard() {
  const { openDialog } = useDialog();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
      <h4 className="text-xl font-semibold text-[#828fa3]">
        You currently don't have any boards. Create a new board to get started
      </h4>
      <button
        className="bg-[#635FC7] w-[35rem] hover:bg-[#a8a4ff] transition-all ease-in-out duration-500 py-3.5 text-white font-semibold rounded-full"
        onClick={() => openDialog()}
      >
        + Create New Board
      </button>
    </div>
  );
}
