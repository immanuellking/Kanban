"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { getRandomBrightColor } from "@/lib/utils";
import AddNewColumnModal from "./AddNewColumnModal";
import { useDialog } from "@/context/dialogContext";
import { useEffect, useState } from "react";
import EmptyBoard from "./EmptyBoard";
import LoginNow from "./LoginNow";
import AddNewColumnButton from "./AddNewColumnButton";
import ColumnTask from "./ColumnTask";
import ColumnTasks from "./ColumnTasks";

export default function BoardContainer({
  isSignedIn,
  boardData,
}: {
  isSignedIn: boolean;
  boardData: BoardData[];
}) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { openNewColumnDialog, openDialog, setIsLoading } = useDialog();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("board") === boardData[0]?.board_name) {
      setIsLoading(false);
    }
  }, [boardData, searchParams]);

  return (
    <>
      <section className="w-full h-full bg-[#20212C]">
        {!isSignedIn ? (
          <LoginNow />
        ) : (
          <div className="overflow-x-auto no-scrollbar flex h-full">
            {boardData.length > 0 ? (
              <div className="h-full pt-6 pb-4 px-6 flex gap-4">
                {boardData[0]?.columns.length > 0
                  ? boardData[0]?.columns.map((column) => (
                      <div key={column._id} className="h-full w-[18rem] space-y-6">
                        <div className="flex items-center gap-x-2">
                          {isClient && (
                            <div
                              className={`h-3 w-3 rounded-full`}
                              style={{
                                background: `${getRandomBrightColor()}`,
                              }}
                            ></div>
                          )}
                          <p className="text-gray-400 text-sm">
                            {column.column_name}
                          </p>
                        </div>
                        <ColumnTasks tasks={column.tasks} />
                      </div>
                    ))
                  : null}
                <AddNewColumnButton />
              </div>
            ) : (
              <EmptyBoard />
            )}
          </div>
        )}
      </section>
      <AddNewColumnModal boardData={boardData} />
    </>
  );
}
