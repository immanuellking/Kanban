import { useDialog } from "@/context/dialogContext";

export default function AddNewColumnButton() {
  const { openNewColumnDialog } = useDialog();
  return (
    <div
      className="group bg-[#22232E] h-full w-[18rem] rounded-sm flex items-center justify-center cursor-pointer"
      onClick={() => openNewColumnDialog()}
    >
      <button className="text-2xl font-semibold text-[rgb(130,143,163)] group-hover:text-[#635FC7] transition-all ease-in duration-150">
        + New Column
      </button>
    </div>
  );
}
