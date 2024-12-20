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
  column_name: string;
  column_id: string;
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

type Board = {
  board_id: string;
  board_name: string;
  columns: {
    column_id: string;
    column_name: string;
  }[];
};

type StateType = {
  isOpen: boolean;
  isAddNewColumnOpen: boolean;
  isLoading: boolean;
  isAddNewTaskOpen: boolean;
  viewTaskOpen: boolean;
  isEditingTask: boolean;
  isEditingBoard: boolean;
  task: Task | null;
  board: Board | null;
  isDeleteBoard: boolean;
  isMobileTabsOpen: boolean;
  dragData: Task | null;
};

type ActionType =
  | { type: "OPEN_DIALOG" }
  | { type: "CLOSE_DIALOG" }
  | { type: "OPEN_NEW_COLUMN_DIALOG" }
  | { type: "CLOSE_NEW_COLUMN_DIALOG" }
  | { type: "OPEN_NEW_TASK_DIALOG"; payload: boolean }
  | { type: "CLOSE_NEW_TASK_DIALOG" }
  | { type: "OPEN_VIEW_TASK_DIALOG"; payload: Task }
  | { type: "CLOSE_VIEW_TASK_DIALOG" }
  | { type: "TOGGLE_LOADING_STATE"; payload: boolean }
  | { type: "OPEN_EDIT_BOARD"; payload: Board }
  | { type: "CLOSE_EDIT_BOARD" }
  | { type: "OPEN_DELETE_BOARD" }
  | { type: "CLOSE_DELETE_BOARD" }
  | { type: "OPEN_MOBILE_BOARD_TABS" }
  | { type: "CLOSE_MOBILE_BOARD_TABS" }
  | { type: "SET_DRAG_DATA", payload: Task };
