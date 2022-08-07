const bcrypt = require("bcrypt");
const hashString = (string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(string, salt);
};

module.exports = { hashString };
