const { body } = require("express-validator");
const createProjectValidator = () => {
  return [
    body("title").notEmpty().withMessage("project title cannot be empty"),
    body("text")
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage("project text atLeast 20 characters"),
  ];
};

module.exports = { createProjectValidator };
