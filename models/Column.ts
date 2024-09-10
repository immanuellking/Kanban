import { Schema, models, model } from "mongoose";

const ColumnSchema = new Schema({
  column_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  board_id: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    // required: true,
  },
});

export default models.Column || model("Column", ColumnSchema);
