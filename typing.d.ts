type BoardTab = {
  user_id: string;
  board_name: string;
};

type Column = {
  _id: string;
  column_name: string;
  user_id: string;
  board_id: string;
};

type BoardData = {
  _id: string;
  columns: Column[];
};
