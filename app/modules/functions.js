const { genSaltSync, hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashString = (string) => {
  const salt = genSaltSync(10);
  return hashSync(string, salt);
};

const tokenGenerator = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_SHA1, {
    expiresIn: "20 days",
  });
  return token;
};

const jwtTokenVerification = (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY_SHA1);
  if (!result?.username)
    throw { status: 401, message: "please login to your account!!" };
  return result;
};
module.exports = { hashString, tokenGenerator, jwtTokenVerification };
