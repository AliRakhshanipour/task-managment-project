const { body } = require("express-validator");
const imageUploadValidation = () => {
  return [
    body("image").custom(async (image, { req }) => {
      const allowedTypes = ["jpeg", "png", "jpg", "gif"];
      const file_type = req.file.filename.split(".")[1];
      if (!allowedTypes.includes(file_type.toLowerCase()))
        throw "type of file is not allowed!!";
      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) throw "file size is too big";
      return 1;
    }),
  ];
};

module.exports = {
  imageUploadValidation,
};
