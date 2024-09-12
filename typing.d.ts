type BoardTab = {
  user_id: string;
  board_name: string;
};

type Column = {
  _id: string;
  column_name: string;
};

type BoardData = {
  board_id: string;
  board_name: string;
  columns: Column[];
};
