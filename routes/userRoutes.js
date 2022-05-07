const {
  getCoupleById,
  getUserById,
} = require("../controller/userController.js");

const express = require("express");

const userRouter = express.Router();

userRouter.route("/:id").get(getUserById);
userRouter.route("/couple/:id").get(getCoupleById);

module.exports = userRouter;
