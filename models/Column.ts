import { Schema, SchemaTypes, models, model } from "mongoose";

const ColumnSchema = new Schema({
  column_name: {
    type: String,
    required: true,
    lowercase: true,
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
  tasks: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
});

export default models.Column || model("Column", ColumnSchema);
