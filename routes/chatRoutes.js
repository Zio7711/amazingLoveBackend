import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageByUser,
} from '../controller/chatController';

import express from 'express';

const messageRouter = express.Router();

messageRouter.route('/').get(getAllMessages).post(createMessage);
messageRouter.route('/user/:id').get(getMessageByUser);
messageRouter.route('/:id').delete(deleteMessage);

export default messageRouter;
