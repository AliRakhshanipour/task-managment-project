const UserModel = require("../../models/user.model");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image =
        req.protocol + "://" + req.get("host") + user.profile_image;
      return res.status(200).json({ status: 200, success: true, user });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user._id;
      console.log(userId);
      let fields = ["first_name", "last_name", "skills"];
      let badValues = [" ", null, "", 0, -1, undefined, NaN];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });
      console.log(data);
      const result = await UserModel.updateOne({ _id: userId }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "update profile successfully done!!",
        });
      }
      throw {
        status: 401,
        message: "update profile unsuccessful",
      };
    } catch (error) {
      next(error);
    }
  }
  async addProfileImage(req, res, next) {
    try {
      const userId = req.user._id;
      const profile_image = req?.file.path.split("public")[1];
      const result = await UserModel.updateOne(
        { _id: userId },
        { $set: { profile_image } }
      );
      if (result.modifiedCount == 0)
        throw { status: 401, message: "profile image can not be updated!!" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "update profile successfully done!!",
      });
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInvitation() {}
  rejectInvitation() {}
}

module.exports = { UserController: new UserController() };
