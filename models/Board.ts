import { Schema, models, model, SchemaTypes } from "mongoose";

const BoardSchema = new Schema({
  board_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  columns: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Column",
    },
  ],
});

export default models.Board || model("Board", BoardSchema);
