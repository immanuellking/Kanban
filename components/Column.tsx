import { updateDropColumn } from "@/lib/action";
import ColumnTasks from "./ColumnTasks";
import { getRandomBrightColor } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useDialog } from "@/context/dialogContext";

export default function Column({ column }: { column: Column }) {
  const { state, setIsLoading } = useDialog();
  const [isClient, setIsClient] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = async () => {
    setIsDraggingOver(false);
    console.log("Handle drop function", state.dragData);
    if (state.dragData && column._id !== state.dragData?.column_id) {
      setIsLoading(true);
      await updateDropColumn(column._id, state.dragData);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default to allow drop
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-full w-[18rem] space-y-6">
      <div className="flex items-center gap-x-2">
        {isClient && (
          <div
            className={`h-3 w-3 rounded-full`}
            style={{
              background: `${getRandomBrightColor()}`,
            }}
          ></div>
        )}
        <p className="text-gray-400 capitalize text-sm">
          {column.column_name} ({column.tasks.length})
        </p>
      </div>
      <div
        className={`w-full h-full overflow-y-auto no-scrollbar pb-16 ${
          isDraggingOver &&
          "bg-[#3e3f53] border-[#635FC7] border transition-all duration-75 ease-linear"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ColumnTasks tasks={column.tasks} />
      </div>
    </div>
  );
}
