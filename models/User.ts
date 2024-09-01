import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
//   clerkId: { type: String, required: true, unique: true },
  // Add more fields as needed
});

export default models.User || model("User", userSchema);
