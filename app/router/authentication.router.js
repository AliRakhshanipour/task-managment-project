const {
  AuthController,
} = require("../http/controllers/authentication.controller");
const expressValidatorMapper = require("../http/middlewares/checkErrors");
const registerValidator = require("../http/validations/authentication.validation");

const router = require("express").Router();
router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
);
module.exports = {
  authRoutes: router,
};
