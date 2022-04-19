const createMessage = async (req, res) => {
  res.send('createMessage');
};

const deleteMessage = async (req, res) => {
  res.send('createMessage');
};

const getAllMessages = async (req, res) => {
  res.send('getAllMessages');
};

const getMessageByUser = async (req, res) => {
  res.send('getMessageById');
};

export { createMessage, deleteMessage, getAllMessages, getMessageByUser };
