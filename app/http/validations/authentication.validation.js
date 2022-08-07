const { body } = require("express-validator");
const registerValidator = () => {
  return [
    body("username")
      .isLength({ min: 4, max: 20 })
      .custom((value, context) => {
        if (value) {
          const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(value)) {
            return true;
          }
          throw "username cannot be empty!!";
        }
      }),
    body("email").isEmail().withMessage("Please enter a valid email address!!"),
    body("phone")
      .isMobilePhone("fa-IR")
      .withMessage("Please enter a valid phone number!!"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("password must be at least 6 characters")
      .custom((value, context) => {
        if (value != context?.req?.body?.password_confirmation) {
          throw "password and password confirmation must be equal!";
        }
        return 1;
      }),
  ];
};

module.exports = registerValidator;
