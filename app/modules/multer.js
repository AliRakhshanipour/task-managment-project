const multer = require("multer");
const { createUploadPath } = require("./functions");
const path = require("path");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, createUploadPath());
  },
  filename: (request, file, callback) => {
    try {
      const type = path.extname(file?.originalname || "");
      callback(null, Date.now() + type);
    } catch (error) {
      console.log(error);
    }
  },
});

const upload_multer = multer({ storage });

module.exports = {
  upload_multer,
};
