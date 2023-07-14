const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //ADD NEW USER IN SOCKER SERVER
  socket.on("new-user-add", (newUserId) => {
    //IF USER IS NOT ADDED PREVIOUSLY
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected User", activeUsers);
    io.emit("get-users", activeUsers);
  });

  //CHECK IF USER IS DISCONNECTED
  socket.on("disconnected", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  //SHOWING MESSAGE
  socket.on("send-message", (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log("Sending from socket to: ", recieverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
