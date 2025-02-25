"use client";
import { useSearchParams } from "next/navigation";
import AddNewColumnModal from "./AddNewColumnModal";
import { useDialog } from "@/context/dialogContext";
import { useEffect } from "react";
import LoginNow from "./LoginNow";

import ColumnContainers from "./ColumnContainers";
import { useUser } from "@clerk/nextjs";

export default function BoardContainer({
  boardData,
}: {
  boardData: BoardData[];
}) {
  const searchParams = useSearchParams();
  const { setIsLoading } = useDialog();

  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("board") === boardData[0]?.board_name) {
      setIsLoading(false);
    }
  }, [boardData, searchParams]);

  return (
    <>
      <section className="w-full h-[90vh] lg:h-[87vh] bg-[#20212C] pt-6 lg:pt-8 pb-4 lg:pb-2">
        {!isLoaded ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="bars-6"></div>
          </div>
        ) : !isSignedIn ? (
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
