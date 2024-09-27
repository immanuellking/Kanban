import AddNewColumnButton from "./AddNewColumnButton";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";

export default function ColumnContainers({
  boardData,
}: {
  boardData: BoardData[];
}) {
  if (!boardData.length) {
    return <EmptyBoard />;
  }

  if (boardData.length > 0) {
    const columns = boardData[0].columns || [];
    return (
      <div className="h-full pt-6 pb-0 px-6 flex gap-4">
        {columns.length > 0
          ? columns.map((column) => <Column key={column._id} column={column} />)
          : null}
        <AddNewColumnButton />
      </div>
    );
  }
}
