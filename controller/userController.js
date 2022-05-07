const StatusCodes = require("http-status-codes");
const models = require("../models/index.js");
const { User, Couple } = models;
const { Op } = require("sequelize");

const { NotFoundError } = require("../errors/index.js");

const getUserById = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });

  if (!user) return new NotFoundError("User not found");
  res.status(StatusCodes.OK).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      soulmateId: user.soulmateId,
    },
  });
};

const getCoupleById = async (req, res) => {
  const couple = await Couple.findOne({
    where: {
      [Op.or]: [
        { girlfriendId: req.params.id },
        { boyfriendId: req.params.id },
      ],
    },
    include: ["girlfriend", "boyfriend"],
  });

  if (!couple) return new NotFoundError("Couple not found");

  res.status(StatusCodes.OK).json({
    couple,
  });
};

module.exports = { getUserById, getCoupleById };
