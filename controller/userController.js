import { NotFoundError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import Users from '../models/User.js';

const getUserById = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) return new NotFoundError('User not found');
  res.status(StatusCodes.OK).json({
    user,
  });
};

export { getUserById };
