
import ColumnTask from "./ColumnTask";

export default function ColumnTasks({tasks} : {tasks: Task[]}) {
  return (
    <div>
      {tasks.map((task) => (
        <ColumnTask key={task._id} task={task} />
      ))}
    </div>
  );
}
