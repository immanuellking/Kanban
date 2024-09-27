import ColumnTasks from "./ColumnTasks";
import { getRandomBrightColor } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Column({ column }: { column: Column }) {
  const [isClient, setIsClient] = useState(false);

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
      <div className="w-full h-full overflow-y-auto no-scrollbar pb-16">
        <ColumnTasks tasks={column.tasks} />
      </div>
    </div>
  );
}
