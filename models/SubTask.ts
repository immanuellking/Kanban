import { Schema, models, model } from "mongoose";

const SubTaskSchema = new Schema({
  sub_task: {
    type: String,
    lowercase: true,
  },
  is_complete: {
    type: Boolean,
    default: false,
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
});

export default models.SubTask || model("SubTask", SubTaskSchema);
