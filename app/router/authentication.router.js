const {
  AuthController,
} = require("../http/controllers/authentication.controller");
const expressValidatorMapper = require("../http/middlewares/checkErrors");
const {
  registerValidator,
  loginValidator,
} = require("../http/validations/authentication.validation");

// router for user register
const router = require("express").Router();
router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
);

//router for user login
router.post(
  "/login",
  loginValidator(),
  expressValidatorMapper,
  AuthController.login
);
module.exports = {
  authRoutes: router,
};
