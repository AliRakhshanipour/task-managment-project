const { Schema, Types, model } = require("mongoose");
// Schema for users
const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    username: { type: String, required: true, unique: true },
    users: { type: [Types.ObjectId], default: [] },
    projects: { type: [Types.ObjectId], default: [] },
    owner: { type: Types.ObjectId, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const TeamModel = model("team", TeamSchema);
module.exports = TeamModel;
