const fileupload = require("express-fileupload");
const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req, res, next) => {
  try {
    console.log(req.file, req.files);
    if (req.file || Object.keys(req.files).length == 0) {
      throw { status: 400, message: "send project image!" };
    }
    let image = req.files.image;
    let imagePath = path.join(
      createUploadPath(),
      Date.now() + path.extname(image.name)
    );
    let uploadPath = path.join(__dirname, "..", "..", imagePath);
    console.log(uploadPath);
    image.mv(uploadPath, (err) => {
      if (err) throw { status: 500, message: "image upload not completed!!" };
      next(err);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
