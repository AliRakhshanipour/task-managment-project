const { compareSync } = require("bcrypt");
const UserModel = require("../../models/user.model");
const { hashString, tokenGenerator } = require("../../modules/functions");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password, phone } = req.body;
      const hash_password = hashString(password);
      const user = await UserModel.create({
        username,
        email,
        password: hash_password,
        phone,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      console.log(req.headers);
      const user = await UserModel.findOne({ username });
      if (!user)
        throw { status: 401, message: "username or password is wrong!!" };
      const check_password = compareSync(password, user.password);
      if (!check_password)
        throw { status: 401, message: "username or password is wrong!!" };
      const token = tokenGenerator({ username });
      user.token = token;
      user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: `${user.username} , welcome to your account :)`,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
