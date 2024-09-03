import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddNewBoardForm } from "./AddNewBoardForm";

export default function CreateNewBoardButton() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <button className="flex items-center gap-x-2 text-[#635FC7] py-4 px-6 mt-2 rounded-r-full cursor-pointer">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-[1.5rem] w-[1.5rem]"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M4 12h8"></path>
            <path d="M12 15h8"></path>
            <path d="M12 9h8"></path>
            <path d="M12 4v16"></path>
          </svg>
          <p className="text-base font-medium">Create New Board</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#2B2C37] border-none">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Board</DialogTitle>
        </DialogHeader>
        <div>
          <AddNewBoardForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
