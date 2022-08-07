const router = require("express").Router();

const { authRoutes } = require("./authentication.router");
const { projectRoutes } = require("./project.router");
const { teamRoutes } = require("./team.router");
const { userRoutes } = require("./user.router");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);

module.exports = {
  AllRoutes: router,
};
