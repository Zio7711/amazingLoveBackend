import {
  createMessage,
  deleteMessage,
  getMessageByCoupleId,
} from '../controller/messageController.js';

import express from 'express';

const messageRouter = express.Router();

// messageRouter.route('/').get(getMessageByUser);
messageRouter.route('/:coupleId').get(getMessageByCoupleId);
messageRouter.route('/new').post(createMessage);
messageRouter.route('/:id').delete(deleteMessage);

export default messageRouter;
