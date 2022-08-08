const { UserController } = require("../http/controllers/user.controller");
const {
  checkUserLoggedIn,
} = require("../http/middlewares/autoLogin.middleware");

const router = require("express").Router();

router.get("/profile", checkUserLoggedIn, UserController.getProfile);

module.exports = {
  userRoutes: router,
};
