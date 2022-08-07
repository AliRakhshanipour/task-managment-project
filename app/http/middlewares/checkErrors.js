const { validationResult } = require("express-validator");

const expressValidatorMapper = (req, res, next) => {
  let messages = {};
  const result = validationResult(req);
  if (result?.errors?.length > 0) {
    result?.errors.forEach((error) => {
      messages[error.param] = error.msg;
    });
    return res.status(400).json({
      status: 400,
      success: false,
      messages,
    });
  }
  next();
};

module.exports = expressValidatorMapper;
