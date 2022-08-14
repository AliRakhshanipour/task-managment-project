const ProjectModel = require("../../models/project.model");

class ProjectController {
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
  getProjectById() {}
  getProjectByTeam() {}
  getProjectByUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = { ProjectController: new ProjectController() };
