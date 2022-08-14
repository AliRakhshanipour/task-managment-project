const ProjectModel = require("../../models/project.model");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, text } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({ title, text, owner });
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
  getProjects() {}
  getProjectById() {}
  getProjectByTeam() {}
  getProjectByUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = { ProjectController: new ProjectController() };
