import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;

export type UserType = {
  _id: string;
  username: string;
  email: string;
  hash: string;
  salt: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
