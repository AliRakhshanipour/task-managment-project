const TeamModel = require("../../models/team.model");

class TeamController {
  async createTeam(req, res, next) {
    try {
      const { name, description, username } = req.body;
      const owner = req.params.id;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      if (!team) throw { status: 500, message: "team creation failed" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Team created successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamList(req, res, next) {
    try {
      const teams = await TeamModel.find({});
      res.status(201).json({ status: 201, success: true, teams });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const teamId = req.params.id;
      const owner = req.user._id;
      const team = await TeamModel.find({ owner, _id: teamId });
      if (!team) throw { status: 400, message: "Team doesn't exist!!" };
      return res.status(201).json({ status: 201, success: true, team });
    } catch (error) {
      next(error);
    }
  }
  async removeTeamById(req, res, next) {
    try {
      const teamId = req.params.id;
      const owner = req.user._id;
      const team = await TeamModel.find({ owner, _id: teamId });
      if (!team) throw { status: 400, message: "Team doesn't exist!!" };
      const result = await TeamModel.deleteOne({ owner, _id: teamId });
      if (result.deletedCount > 0)
        throw { status: 200, message: "Team deleted successfully!!" };
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(req, res, next) {
    try {
      const teamId = req.params.id;
      const owner = req.user._id;
      const data = req.body;
      const team = TeamModel.find({ owner, _id: teamId });
      if (!team) throw { status: 400, message: "Team doesn't exist!!'" };
      const editResult = await TeamModel.updateOne(
        { owner, _id: teamId },
        { $set: data }
      );
      if (editResult.modifiedCount == 0)
        throw { status: 400, message: "team update failed!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "team updated successfully!!",
      });
    } catch (error) {
      next(error);
    }
  }
  inviteUserToTeam(user) {}
  removeUserFromTeam() {}
}

module.exports = { TeamController: new TeamController() };
