const router = require("express").Router();

const { authRoutes } = require("./authentication");
const { projectRoutes } = require("./project");
const { teamRoutes } = require("./team");
const { userRoutes } = require("./user");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);

module.exports = {
  AllRoutes: router,
};
