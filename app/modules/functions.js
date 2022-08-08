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
module.exports = { hashString, tokenGenerator };
