export const listenToMessageSocket = (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("join room, couple id", data);
    console.log("socket room", socket.rooms);
  });

  socket.on("send_message", (data) => {
    console.log("send message", data.couple);
    socket.to(data.couple).emit("receive_messages", data);
  });

  socket.on("message", (data) => {
    console.log("socket id: ", socket.id);
    socket.emit("refresh", "refresh fetching");
  });
};
