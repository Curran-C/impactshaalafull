import { Server } from "socket.io";

export const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "http://impactshaala-testsite.tech"],
  },
});
