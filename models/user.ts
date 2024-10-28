import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email is already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true, "Username is already exists"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    image: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
