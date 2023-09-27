import { io } from "./server.js";

export const socketAPI = () => {
  let activeUsers = [];
  io.on("connection", (socket) => {
    // ADD NEW USER IN SOCKET SERVER
    socket.on("new-user-add", (newUserId) => {
      console.log("New", newUserId);
      if (newUserId !== null) {
        const existingUserIndex = activeUsers.findIndex(
          (user) => user.userId === newUserId
        );
        if (existingUserIndex !== -1) {
          activeUsers[existingUserIndex].socketId = socket.id;
        } else {
          activeUsers.push({
            userId: newUserId,
            socketId: socket.id,
          });
        }
        console.log("Connected User", activeUsers);
        io.emit("get-users", activeUsers);
      }
    });

    // CHECK IF USER IS DISCONNECTED
    socket.on("disconnected", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User disconnected", activeUsers);
      io.emit("get-users", activeUsers);
    });

    // SHOWING MESSAGE
    socket.on("send-message", (data) => {
      const { recieverId } = data;
      const user = activeUsers.find((user) => user.userId === recieverId);
      console.log("Active users: ", activeUsers);
      console.log("Users: ", user);
      console.log("Sending from socket to: ", recieverId);
      console.log("Data: ", data);
      if (user) io.to(user.socketId).emit("recieve-message", data);
    });
  });
};
