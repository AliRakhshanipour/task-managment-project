const UserModel = require("../../models/user.model");
const { jwtTokenVerification } = require("../../modules/functions");

const checkUserLoggedIn = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization)
      throw { status: 401, message: "please login to your account!!" };
    let token = authorization.split(" ")?.[1];
    if (!token)
      throw { status: 401, message: "please login to your account!!" };
    const { username } = jwtTokenVerification(token);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw { status: 401, message: "please login to your account!!" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserLoggedIn,
};
