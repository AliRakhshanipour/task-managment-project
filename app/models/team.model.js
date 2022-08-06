const { Schema, Types, model } = require("mongoose");
// Schema for users
const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [Types.ObjectId], default: [] },
    owner: { type: Types.ObjectId, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const TeamModel = model("team", TeamSchema);
module.exports = TeamModel;
