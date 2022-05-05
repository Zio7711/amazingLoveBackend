const {
  createMessage,
  deleteMessage,
  getMessageByCoupleId,
} = require('../controller/messageController.js');

const express = require('express');

const messageRouter = express.Router();

// messageRouter.route('/').get(getMessageByUser);
messageRouter.route('/:coupleId').get(getMessageByCoupleId);
messageRouter.route('/new').post(createMessage);
messageRouter.route('/:id').delete(deleteMessage);

module.exports = messageRouter;
