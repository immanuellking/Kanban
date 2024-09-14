"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { getRandomBrightColor } from "@/lib/utils";
import AddNewColumnModal from "./AddNewColumnModal";
import { useDialog } from "@/context/dialogContext";
import { useEffect, useState } from "react";

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
    if (params.get("board") === boardData[0]?.board_name  ) {
      setIsLoading(false);
    }
  }, [boardData, searchParams]);

  return (
    <>
      <section className="w-full h-full bg-[#20212C]">
        {!isSignedIn ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-y-8">
            <h4 className="text-xl font-semibold text-[#828fa3]">
              Please sign in to enjoy the Kanban app
            </h4>
            <button
              className="bg-[#635FC7] w-[20rem] hover:bg-[#a8a4ff] transition-all ease-in-out duration-500 py-4 text-white font-semibold rounded-full"
              onClick={() => push("/login")}
            >
              Login Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto no-scrollbar flex h-full">
            {boardData.length > 0 ? (
              <div className="h-full pt-6 pb-4 px-6 flex gap-4">
                {boardData[0]?.columns.length > 0
                  ? boardData[0]?.columns.map((column) => (
                      <div key={column._id} className="h-full w-[18rem]">
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
                      </div>
                    ))
                  : null}
                <div
                  className="group bg-[#22232E]  h-full w-[18rem] rounded-sm flex items-center justify-center cursor-pointer"
                  onClick={() => openNewColumnDialog()}
                >
                  <button className="text-2xl font-semibold text-[rgb(130,143,163)] group-hover:text-[#635FC7] transition-all ease-in duration-150">
                    + New Column
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center gap-y-8">
                <h4 className="text-xl font-semibold text-[#828fa3]">
                  You currently don't have any boards. Create a new board to get
                  started
                </h4>
                <button
                  className="bg-[#635FC7] w-[35rem] hover:bg-[#a8a4ff] transition-all ease-in-out duration-500 py-4 text-white font-semibold rounded-full"
                  onClick={() => openDialog()}
                >
                  + Create New Board
                </button>
              </div>
            )}
          </div>
        )}
      </section>
      <AddNewColumnModal boardData={boardData} />
    </>
  );
}
