const autoBind = require("auto-bind");
const ProjectModel = require("../../models/project.model");

class ProjectController {
  constructor() {
    autoBind(this);
  }
  async createProject(req, res, next) {
    try {
      const { title, text, tags } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({ title, text, owner, tags });
      if (!result)
        throw {
          status: 400,
          message: "project creation got a problem!!",
        };
      res.status(201).json({
        status: "success",
        message: "Project created successfully",
        user: req.user,
      });
      console.log(req.user._id);
    } catch (error) {
      next(error);
    }
  }
  async getProjects(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      return res.status(200).json({ status: 200, success: true, projects });
    } catch (error) {
      next(error);
    }
  }

  async findProject(owner, projectId) {
    return await ProjectModel.findOne({ owner, _id: projectId });
  }

  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      const project = await this.findProject(owner, projectId);
      if (!project) throw { status: 404, message: "Project not found" };
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      const project = await this.findProject(owner, projectId);
      console.log(project);
      const deletionResult = await ProjectModel.deleteOne({ _id: projectId });
      if (!project) throw { status: 404, message: "project not found" };
      if (deletionResult.deletedCount == 0)
        throw { status: 404, message: "deletion unsuccessful!" };
      return res.status(200).json({
        status: 200,
        success: true,
        project,
        message: "deletion successfully done!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectId = req.params.id;
      const { title, text, tags, Private } = req.body;

      const project = await ProjectModel.findOne({ owner, _id: projectId });
      if (!project) throw { status: 404, message: "project not found" };
      const result = await project.updateOne({ title, text, tags, Private });
      if (result.modifiedCount == 0)
        throw { status: 404, message: "project update failed!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project update successfully done!!",
      });
    } catch (error) {
      next(error);
    }
  }
  getProjectByTeam() {}
  getProjectByUser() {}
}

module.exports = { ProjectController: new ProjectController() };
