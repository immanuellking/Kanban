import { Schema, models, model } from "mongoose";

const TaskSchema = new Schema({
  column_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  column_id: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  subTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubTask",
    },
  ],
});

export default models.Task || model("Task", TaskSchema);
