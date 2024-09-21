import Task from "./Task";

export default function ColumnTasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
}
