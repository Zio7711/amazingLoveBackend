import {
  createMessage,
  deleteMessage,
  getMessageByUser,
} from '../controller/messageController.js';

import express from 'express';

const messageRouter = express.Router();

messageRouter.route('/').get(getMessageByUser);
messageRouter.route('/new').post(createMessage);
messageRouter.route('/:id').delete(deleteMessage);

export default messageRouter;
