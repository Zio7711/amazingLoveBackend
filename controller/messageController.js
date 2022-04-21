import { BadRequestError } from '../errors/index.js';
import Messages from '../models/Message.js';
import { StatusCodes } from 'http-status-codes';

const createMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  // check if required fields are submitted
  if (!sender || !receiver || !content) {
    throw new BadRequestError('Missing required fields');
  }

  const message = await Messages.create({ sender, receiver, content });

  res.status(StatusCodes.CREATED).json({ message });
};

const deleteMessage = async (req, res) => {
  res.send('createMessage');
};

const getMessageByUser = async (req, res) => {
  //get userId from token auth middleware
  const userId = req.user.userId;

  // find all messages where userId is either sender or receiver
  const messages = await Messages.find({
    $or: [{ sender: userId }, { receiver: userId }],
  }).sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({ messages });
};

export { createMessage, deleteMessage, getMessageByUser };
