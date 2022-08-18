const { body } = require("express-validator");
const TeamModel = require("../../models/team.model");
const createTeamValidator = () => {
  return [
    body("name")
      .isLength({ min: 5 })
      .withMessage("team name can not be less than 5 characters"),
    body("description")
      .notEmpty()
      .withMessage("team description can not be empty!!"),
    body("username").custom(async (username) => {
      const teamUsernameRegexp = /^[a-z]+[a-z0-9\.\_]{3,}$/gim;
      if (teamUsernameRegexp.test(username)) {
        const team = await TeamModel.findOne({ username });
        if (team) throw "this username already taken by another team!";
        return true;
      }
      throw { status: 401, message: "please enter a valid username" };
    }),
  ];
};

module.exports = {
  createTeamValidator,
};
