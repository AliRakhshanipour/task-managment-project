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
const { mongoIdValidator } = require("../http/validations/public");

const router = require("express").Router();
router.post(
  "/create",
  createProjectValidator(),
  expressValidatorMapper,
  checkUserLoggedIn,
  ProjectController.createProject
);

router.get(
  "/project-list",
  checkUserLoggedIn,
  expressValidatorMapper,
  ProjectController.getProjects
);

router.get(
  "/:id",
  checkUserLoggedIn,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);

router.delete(
  "/:id",
  checkUserLoggedIn,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);

router.post(
  "/:id",
  checkUserLoggedIn,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);

module.exports = {
  projectRoutes: router,
};
