import { BadRequestError } from '../errors/index.js';
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

  const user = await Users.findOne({ email }).select('+password');
  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new UnauthorizedError('Invalid credentials');

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    },
    token,
  });
};

// set up update user controller
const updateUser = async (req, res) => {
  const { email, name, lastName } = req.body;

  if (!email || !name || !lastName)
    throw new BadRequestError('Missing required fields');

  const user = await Users.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

export { register, login, updateUser };
