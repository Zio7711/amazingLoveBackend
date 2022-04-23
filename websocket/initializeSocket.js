import { listenToMessageSocket } from './messageSocket.js';

// function for listening to the socket connection
export const socketOnConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.emit('hello', 'message from server');

    listenToMessageSocket(socket);

    socket.on('disconnect', () => {
      console.log('user disconnected ', socket.id);
    });
  });
};

// // function for listening to the socket disconnection
// export const socketOnDisconnection = (io) => {
//   io.on('disconnect', (socket) => {
//     console.log('a user disconnected ' + socket.id);
//   });
// };
