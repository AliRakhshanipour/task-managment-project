const { Schema, model } = require("mongoose");

// Schema for users
const UserSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    roles: { type: String, default: ["USER"] },
    skills: { type: String, default: [] },
    teams: { type: String, default: [] },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);
module.exports = UserModel;
