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

export default function AddNewColumnModal({
  boardData,
}: {
  boardData: BoardData[];
}) {
  const { state, closeNewColumnDialog } = useDialog();
  return (
    <Dialog
      onOpenChange={closeNewColumnDialog}
      open={state.isAddNewColumnOpen}
      modal
      defaultOpen={state.isAddNewColumnOpen}
    >
      <DialogContent className="bg-[#2B2C37] border-none" aria-description="">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Add New Column
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <AddNewColumnForm boardData={boardData}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
