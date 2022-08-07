const UserModel = require("../../models/user.model");
const { hashString } = require("../../modules/functions");

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
  login() {}
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
