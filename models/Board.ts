import { Schema, models, model } from "mongoose";

const BoardSchema = new Schema({
  board_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Board = models.Board || model("Board", BoardSchema);

export default Board;
