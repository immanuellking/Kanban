type BoardTab = {
  user_id: string;
  board_name: string;
};

type SubTask = {
  _id: string;
  subtask: string;
  is_complete: boolean;
};

type Task = {
  _id: string;
  title: string;
  column_name: string,
  description: string;
  subTasks: SubTask[];
};

type Column = {
  _id: string;
  column_name: string;
  tasks: Task[];
};

type BoardData = {
  board_id: string;
  board_name: string;
  columns: Column[];
};
