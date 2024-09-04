import { Schema, model, models, SchemaTypes } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  clerkId: { type: String, required: true, unique: true },
  boards: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Board",
    },
  ],
});

export default models.User || model("User", userSchema);
