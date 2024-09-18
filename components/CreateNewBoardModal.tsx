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

export default function CreateNewBoardModal() {
  const { state, closeDialog } = useDialog();
  return (
    <Dialog
      onOpenChange={closeDialog}
      open={state.isOpen}
      modal
      defaultOpen={state.isOpen}
    >
      <DialogContent
        className="bg-[#2B2C37] border-none"
        hideCloseButton={true}
        aria-description=""
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Add New Board
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          <AddNewBoardForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
