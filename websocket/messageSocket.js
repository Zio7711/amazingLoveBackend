export const listenToMessageSocket = (socket) => {
  socket.on('message', (data) => console.log('server: ', data));
};
