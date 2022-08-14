const { body } = require("express-validator");
const createProjectValidator = () => {
  return [
    body("title").notEmpty().withMessage("project title cannot be empty"),
    body("text")
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage("project text atLeast 20 characters"),

    body("tags").isArray({ min: 0, max: 10 }).withMessage("at most 10 tags!!"),
  ];
};

module.exports = { createProjectValidator };
