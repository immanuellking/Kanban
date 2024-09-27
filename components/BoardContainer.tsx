"use client";
import { useSearchParams } from "next/navigation";
import AddNewColumnModal from "./AddNewColumnModal";
import { useDialog } from "@/context/dialogContext";
import { useEffect } from "react";
import LoginNow from "./LoginNow";

import ColumnContainers from "./ColumnContainers";

export default function BoardContainer({
  isSignedIn,
  boardData,
}: {
  isSignedIn: boolean;
  boardData: BoardData[];
}) {
  const searchParams = useSearchParams();
  const { setIsLoading } = useDialog();


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("board") === boardData[0]?.board_name) {
      setIsLoading(false);
    }
  }, [boardData, searchParams]);

  return (
    <>
      <section className="w-full h-[90vh] lg:h-[87vh] bg-[#20212C] pt-6 lg:pt-8 pb-4 lg:pb-2">
        {!isSignedIn ? (
          <LoginNow />
        ) : (
          <div className="overflow-x-auto overflow-y-hidden no-scrollbar w-full flex h-full ">
            <ColumnContainers boardData={boardData} />
          </div>
        )}
      </section>
      <AddNewColumnModal boardData={boardData} />
    </>
  );
}
