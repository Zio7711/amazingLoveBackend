const {
  autoLogin,
  login,
  register,
  updateUser,
} = require("../controller/authController.js");

// const authenticateUser = require('../middleware/auth.js');

const express = require("express");

const authRouter = express.Router();
// authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
// authRouter.route('/autoLogin').get(authenticateUser, autoLogin);
// authRouter.route('/updateUser').patch(authenticateUser, updateUser);

module.exports = authRouter;
