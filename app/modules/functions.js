const { genSaltSync, hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

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

const createUploadPath = () => {
  let d = new Date();
  const year = String(d.getFullYear());
  const month = String(d.getMonth());
  const day = String(d.getDate());
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "uploads", year, month, day);
};

module.exports = {
  hashString,
  tokenGenerator,
  jwtTokenVerification,
  createUploadPath,
};
