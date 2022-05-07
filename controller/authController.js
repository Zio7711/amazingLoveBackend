const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");

// const Couples = require('../models/Couple.js');
const { StatusCodes } = require("http-status-codes");
// const Users  = require('../models/User.js');
const models = require("../models/index.js");
const {
  createJWT,
  hashPassword,
  comparePassword,
} = require("../utils/JWTtoken.js");
const { User, Couple } = models;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Missing required fields");
  }

  const userAlreadyExist = await User.findOne({ where: { email } });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already exists");
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = createJWT(user.id);

  // do not send password to the front end
  res.status(StatusCodes.CREATED).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      soulmateId: user.soulmateId,
    },
    token,
  });
};

// setup login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Missing required fields");

  // retrieve user from db

  const user = await User.findOne({
    where: { email },
  });

  if (!user) throw new UnAuthenticatedError("Invalid credentials");

  // compare password
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new UnAuthenticatedError("Invalid credentials");

  const token = createJWT(user.id);

  res.status(StatusCodes.OK).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

// set up update user controller only update soulmate
const updateUser = async (req, res) => {
  const { email } = req.body;

  if (!email) throw new BadRequestError("Missing required fields");

  // const user = await User.findOne({ id: req.user.userId });
  const user = await User.findOne({
    where: { id: req.user.userId },
  });

  if (user.soulmateId) throw new BadRequestError("You Already have a soulmate");

  if (user.email === email)
    throw new BadRequestError("You cannot link your own email");

  // const soulmateUser = await User.findOne({ email });
  const soulmateUser = await User.findOne({
    where: { email },
  });

  if (!soulmateUser) throw new BadRequestError("User does not exist");

  // update user
  const updatedUser = await User.update(
    { soulmateId: soulmateUser.id },
    {
      where: { id: user.id },
      returning: true,
      // plain: true,
    }
  );

  //update SoulmateUser
  const updatedSoulmateUser = await User.update(
    { soulmateId: user.id },
    {
      where: { id: soulmateUser.id },
      returning: true,
      plain: true,
    }
  );

  // link this couple save to the Couple model
  const couple = await Couple.create({
    girlfriendId: user.id,
    boyfriendId: soulmateUser.id,
  });

  const token = createJWT(user.id);

  res.status(StatusCodes.CREATED).json({
    user: updatedUser[1],
    soulmateUser: updatedSoulmateUser[1],
    couple,
    token,
  });
};

const autoLogin = async (req, res) => {
  // const user = await User.findOne({ id: req.user.userId }).populate("soulmate");

  const user = await User.findOne({
    where: { id: req.user.userId },
    include: "soulmate",
  });

  res.status(StatusCodes.OK).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { register, login, updateUser, autoLogin };
