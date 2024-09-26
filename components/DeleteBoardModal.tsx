import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDialog } from "@/context/dialogContext";
import { deleteBoard } from "@/lib/action";

export default function DeleteBoardModal({
  boardName,
  boardId,
}: {
  boardName: string;
  boardId: string;
}) {
  const { state, closeDeleteBoard, setIsLoading } = useDialog();

  const handleDeleteBoard = async () => {
    setIsLoading(true);
    try {
      await deleteBoard(boardId);
      closeDeleteBoard()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog
      onOpenChange={closeDeleteBoard}
      open={state.isDeleteBoard}
      defaultOpen={state.isDeleteBoard}
    >
      <AlertDialogContent className="bg-[#2B2C37] border-none p-6 py-8 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#EA5555] mb-5">
            Delete this board?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500">
            Are you sure you want to delete the ‘{boardName}’ board? This action
            will remove all columns and tasks and cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center mt-2">
          <AlertDialogCancel className="w-full rounded-full text-[#635FC7]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full rounded-full bg-[#EA5555] hover:bg-[#ff9898] transition-all duration-200 ease-linear"
            onClick={handleDeleteBoard}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}