"use client";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import BoardTabs from "./BoardTabs";
import { useDialog } from "@/context/dialogContext";

function MobileBoardTabs({ boardTabs }: { boardTabs: BoardTab[] }) {
  const { state, closeMobileBoardTabs } = useDialog();
  return (
    <div className="sm:hidden">
      <Dialog
        onOpenChange={closeMobileBoardTabs}
        open={state.isMobileTabsOpen}
        modal
        defaultOpen={state.isMobileTabsOpen}
      >
        <DialogContent
          className="sm:hidden w-[90%] bg-[#20212C] border-none h-[35rem]"
          overlay="sm:relative sm:hidden"
        >
          <BoardTabs boardTabs={boardTabs} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MobileBoardTabs;
