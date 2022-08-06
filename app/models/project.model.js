const { Schema, Types, model } = require("mongoose");
// Schema for users
const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { String, default: "/defaults/default.jpeg" },
    tags: { type: String },
    owner: { type: Types.ObjectId, required: true },
    team: { type: Types.ObjectId },
    private: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("project", ProjectSchema);
module.exports = ProjectModel;
