"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDialog } from "@/context/dialogContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { deleteTask, handleSubtaskIsCompleted } from "@/lib/action";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function TaskViewModal() {
  const {
    state,
    closeViewTaskDialog,
    openViewTaskDialog,
    openNewTaskDialog,
    setIsLoading,
  } = useDialog();

  const done = state.task?.subTasks.reduce(
    (acc, curr) => (curr.is_complete ? acc + 1 : acc),
    0
  );

  const handleEditingTask = () => {
    closeViewTaskDialog();
    openNewTaskDialog(true);
  };

  const handleDeleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteTask(id);
      closeViewTaskDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (val: boolean, id: string) => {
    if (state.task) {
      await handleSubtaskIsCompleted(val, id);
      const updatedViewTask = {
        ...state.task,
        subTasks: state.task?.subTasks.map((sub) =>
          sub._id === id ? { ...sub, is_complete: !sub.is_complete } : sub
        ),
      };
      openViewTaskDialog(updatedViewTask);
    }
  };

  return (
    <Dialog
      onOpenChange={closeViewTaskDialog}
      open={state.viewTaskOpen}
      modal
      defaultOpen={state.viewTaskOpen}
    >
      <DialogContent
        className="bg-[#2B2C37] border-none max-h-[30rem]"
        hideCloseButton={true}
        aria-description=""
      >
        <DialogHeader className="flex relative">
          <DialogTitle className="text-xl text-white capitalize">
            {state.task?.title}
          </DialogTitle>

          <Popover>
            <PopoverTrigger className="hover:bg-[#20212c] absolute -top-3 right-0 w-fit py-3 px-0.5 rounded-full transition-all ease-linear duration-150">
              {/* <button className="hover:bg-[#20212c] absolute -top-3 right-0 w-fit py-3 px-0.5 rounded-full transition-all ease-linear duration-150"> */}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-[1.2rem] text-[#828fa3]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
              </svg>
              {/* </button> */}
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={2}
              className="bg-[#20212c] border-none w-fit m-0 p-0"
            >
              <div
                className="text-gray-500 px-8 py-3 cursor-pointer"
                onClick={() => handleEditingTask()}
              >
                Edit Task
              </div>
              <div
                className="text-red-500 px-8 py-3 cursor-pointer"
                onClick={() => {
                  if (state.task) handleDeleteTask(state.task?._id);
                }}
              >
                Delete Task
              </div>
            </PopoverContent>
          </Popover>

          <DialogDescription />
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-[#828fa3] leading-snug text-sm">
            {state?.task?.description
              ? capitalizeFirstLetter(state.task.description)
              : ""}
          </p>

          <h5 className="text-sm text-white mb-2">
            Subtasks ({done} of {state.task?.subTasks.length})
          </h5>
          <div className="overflow-auto max-h-[10rem] container-scrollbar">
            <div className="gap-y-2 flex flex-col">
              {state.task?.subTasks.map((subtask, idx) => (
                <div
                  key={subtask._id}
                  className="bg-[#20212C] px-4 py-4 flex items-start gap-x-4"
                >
                  <Checkbox
                    defaultChecked={subtask.is_complete}
                    onCheckedChange={(checked) =>
                      handleCheck(!!checked, subtask._id)
                    }
                    className="appearance-none bg-white data-[state=checked]:bg-[#635fc7]"
                  />
                  <Label
                    htmlFor={`subtask-${idx}`}
                    className="text-white font-normal"
                  >
                    {capitalizeFirstLetter(subtask.subtask)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm text-white mb-2">Current status</h5>
            <button className="border border-gray-600 text-white w-full py-2 px-4 text-left">
              {state.task?.column_name}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
