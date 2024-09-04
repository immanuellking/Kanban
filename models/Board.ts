import { Schema, models, model } from "mongoose";

const BoardSchema = new Schema({
  board_name: { type: String, required: true },
});

export default models.Board || model("Board", BoardSchema);
