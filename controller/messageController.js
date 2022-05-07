const { BadRequestError } = require("../errors/index.js");
const { StatusCodes } = require("http-status-codes");

const models = require("../models/index.js");
const { Message } = models;

const createMessage = async (req, res) => {
  const { senderId, receiverId, content, coupleId } = req.body;

  // check if required fields are submitted
  if (!senderId || !receiverId || !content | !coupleId) {
    throw new BadRequestError("Missing required fields");
  }

  if (senderId != req.user.userId)
    throw new UnAuthenticatedError("Invalid credentials");

  const message = await Message.create({
    senderId,
    receiverId,
    content,
    coupleId,
  });

  res.status(StatusCodes.CREATED).json({ message });
};

const deleteMessage = async (req, res) => {
  res.send("delete message not implemented");
};

// This route is not used yet
// const getMessageByUser = async (req, res) => {
//   //get userId from token auth middleware
//   const userId = req.user.userId;

//   // find all messages where userId is either sender or receiver
//   const messages = await Messages.find({
//     $or: [{ sender: userId }, { receiver: userId }],
//   }).sort({ createdAt: -1 });

//   res.status(StatusCodes.OK).json({ messages });
// };

const getMessageByCoupleId = async (req, res) => {
  const messages = await Message.findAll({
    where: { coupleId: req.params.coupleId },

    order: [["createdAt", "ASC"]],
  });

  res.status(StatusCodes.OK).json({ messages });
};

module.exports = {
  createMessage,
  deleteMessage,
  //  getMessageByUser,
  getMessageByCoupleId,
};
