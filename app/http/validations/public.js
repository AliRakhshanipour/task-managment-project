const { param } = require("express-validator");
const mongoIdValidator = () => {
  return [
    param("id").isMongoId().withMessage("this is not a valid Mongo ID!!"),
  ];
};

module.exports = {
  mongoIdValidator,
};
