class AuthController {
  register(req, res, next) {
    return res.json({
      status: 200,
      message: "Registration Done!!",
    });
  }
  login() {}
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
