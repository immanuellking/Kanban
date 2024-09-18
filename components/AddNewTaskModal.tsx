"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddNewBoardForm } from "./AddNewBoardForm";
import { useDialog } from "@/context/dialogContext";
import { AddNewColumnForm } from "./AddNewColumnForm";
import AddNewTaskForm from "./AddNewTaskForm";

export default function AddNewTaskModal({ columns }: { columns: Column[] }) {
  const { state, closeNewTaskDialog } = useDialog();
  return (
    <Dialog
      onOpenChange={closeNewTaskDialog}
      open={state.isAddNewTaskOpen}
      modal
      defaultOpen={state.isAddNewTaskOpen}
    >
      <DialogContent
        className="bg-[#2B2C37] border-none h-[30rem]"
        hideCloseButton={true}
        aria-description=""
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Add New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="overflow-auto container-scrollbar">
          <AddNewTaskForm columns={columns} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
