const { Schema, Types, model } = require("mongoose");
// Schema for users
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { String, default: "" },
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
