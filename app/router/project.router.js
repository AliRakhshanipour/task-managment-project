const { ProjectController } = require("../http/controllers/project.controller");
const {
  checkUserLoggedIn,
} = require("../http/middlewares/autoLogin.middleware");
const expressValidatorMapper = require("../http/middlewares/checkErrors");
const {
  createProjectValidator,
} = require("../http/validations/project.validation");
const { uploadFile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");

const router = require("express").Router();
router.post(
  "/create",
  fileupload(),
  createProjectValidator(),
  expressValidatorMapper,
  checkUserLoggedIn,
  uploadFile,
  ProjectController.createProject
);

router.get(
  "/project-list",
  checkUserLoggedIn,
  expressValidatorMapper,
  ProjectController.getProjects
);

module.exports = {
  projectRoutes: router,
};
