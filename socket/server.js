const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:5173", "http://impactshaala-testsite.tech"],
  },
});

let activeUsers = [];
io.on("connection", (socket) => {
  console.log("Socket is running");

  // ADD NEW USER IN SOCKET SERVER
  socket.on("new-user-add", (newUserId) => {
    // IF USER IS NOT ADDED PREVIOUSLY
    if (newUserId !== null) {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
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

server.listen(8800, () => {
  console.log("Socket is running on port 8800");
});
