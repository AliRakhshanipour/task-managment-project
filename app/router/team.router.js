const { TeamController } = require("../http/controllers/team.controller");
const {
  checkUserLoggedIn,
} = require("../http/middlewares/autoLogin.middleware");
const expressValidatorMapper = require("../http/middlewares/checkErrors");
const { createTeamValidator } = require("../http/validations/team.validation");

const router = require("express").Router();
//create team
router.post(
  "/create/:id",
  checkUserLoggedIn,
  createTeamValidator(),
  expressValidatorMapper,
  TeamController.createTeam
);
//get list of teams
router.get("/team-list", checkUserLoggedIn, TeamController.getTeamList);

//get team by team id
router.get("/:id", checkUserLoggedIn, TeamController.getTeamById);

//remove team by team id
router.delete("/:id", checkUserLoggedIn, TeamController.removeTeamById);

//update team data
router.put(
  "/:id",
  checkUserLoggedIn,
  createTeamValidator(),
  expressValidatorMapper,
  TeamController.updateTeam
);
module.exports = {
  teamRoutes: router,
};
