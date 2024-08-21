import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address!"], // Added basic email validation
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric characters and be unique!",
    ],
    unique: true, // Ensure that the username is unique
  },
  image: {
    type: String,
  },
});

// If the User model already exists, use it; otherwise, create a new model
const User = models.User || model("User", UserSchema);

export default User;
