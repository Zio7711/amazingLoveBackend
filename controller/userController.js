import Couples from '../models/Couple.js';
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

const getCoupleById = async (req, res) => {
  const couple = await Couples.findOne({
    $or: [{ girlfriend: req.params.id }, { boyfriend: req.params.id }],
  })
    .populate('girlfriend')
    .populate('boyfriend');
  if (!couple) return new NotFoundError('Couple not found');

  res.status(StatusCodes.OK).json({
    couple,
  });
};

export { getUserById, getCoupleById };
