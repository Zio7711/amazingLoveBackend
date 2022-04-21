import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

import { StatusCodes } from 'http-status-codes';
import Users from '../models/User.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('Missing required fields');
  }

  const userAlreadyExist = await Users.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError('Email already exists');
  }

  const user = await Users.create({ name, email, password });
  const token = user.createJWT();

  // do not send password to the front end
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    },
    token,
  });
};

// setup login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Missing required fields');

  // retrieve user from db
  const user = await Users.findOne({ email })
    .select('+password')
    .populate('soulmate');

  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new UnauthorizedError('Invalid credentials');

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      soulmate: user.soulmate,
    },
    token,
  });
};

// set up update user controller only update soulmate
const updateUser = async (req, res) => {
  const { email } = req.body;

  if (!email) throw new BadRequestError('Missing required fields');

  const user = await Users.findOne({ _id: req.user.userId });
  if (user.email === email)
    throw new BadRequestError('You cannot link your own email');

  const soulmateUser = await Users.findOne({ email });

  soulmateUser.soulmate = user._id;
  user.soulmate = soulmateUser._id;

  await user.save();
  await soulmateUser.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    soulmateUser,
    token,
  });
};

const autoLogin = async (req, res) => {
  const user = await Users.findOne({ _id: req.user.userId }).populate(
    'soulmate'
  );

  res.status(StatusCodes.OK).json({
    user,
  });
};

export { register, login, updateUser, autoLogin };
