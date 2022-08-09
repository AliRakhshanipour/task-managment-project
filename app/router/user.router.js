const { UserController } = require("../http/controllers/user.controller");
const {
  checkUserLoggedIn,
} = require("../http/middlewares/autoLogin.middleware");
const expressValidatorMapper = require("../http/middlewares/checkErrors");
const {
  imageUploadValidation,
} = require("../http/validations/user.validation");
const { upload_multer } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile", checkUserLoggedIn, UserController.getProfile);
router.post("/profile", checkUserLoggedIn, UserController.editProfile);
router.post(
  "/profile-image",
  upload_multer.single("image"),
  imageUploadValidation(),
  expressValidatorMapper,
  checkUserLoggedIn,
  UserController.addProfileImage
);

module.exports = {
  userRoutes: router,
};
