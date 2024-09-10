import Kanban from "@/components/Kanban";

export default function Home({
  searchParams,
}: {
  searchParams: { board: string };
}) {
  const boardQuery = searchParams.board || "";

  return <Kanban boardQuery={boardQuery} />;
}
