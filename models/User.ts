import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
});

const User = model("User", userSchema);
export default User;
