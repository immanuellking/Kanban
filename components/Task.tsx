"use client";

import { useDialog } from "@/context/dialogContext";
import TaskViewModal from "./TaskViewModal";

export default function Task({ task }: { task: Task }) {
  const { openViewTaskDialog } = useDialog();

  const done = task.subTasks.reduce(
    (acc, curr) => (curr.is_complete ? acc + 1 : acc),
    0
  );

  return (
    <>
      <div
        onClick={() => openViewTaskDialog(task)}
        className="group bg-[#2B2C37] h-24 flex flex-col justify-center px-4 rounded-sm space-y-2 cursor-pointer shadow-[0px_4px_6px_0px_rgba(54,78,126,0.10)]"
      >
        <h2 className="text-white capitalize text-lg font-semibold m-0 p-0 group-hover:text-[#635fc7] transition-all ease-linear duration-150">
          {task.title}
        </h2>
        <p className="text-gray-400 text-[13px] m-0 p-0">
          {done} of {task.subTasks.length} subtasks
        </p>
      </div>
    </>
  );
}
