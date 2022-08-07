const { body } = require("express-validator");
const UserModel = require("../../models/user.model");
const registerValidator = () => {
  return [
    body("username")
      .isLength({ min: 4, max: 20 })
      .custom(async (value, context) => {
        const user = await UserModel.findOne({ username: value });
        if (user) throw "username already exists!!";
        if (value) {
          const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(value)) {
            return true;
          }
          throw "username cannot be empty!!";
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address!!")
      .custom(async (value, context) => {
        const user = await UserModel.findOne({ email: value });
        if (user) throw "email already exists!!";
      }),
    body("phone")
      .isMobilePhone("fa-IR")
      .withMessage("Please enter a valid phone number!!")
      .custom(async (value, context) => {
        const user = await UserModel.findOne({ phone: value });
        if (user) throw "phone number already exists!!";
      }),
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
