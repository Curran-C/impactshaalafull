import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import companyRoutes from "../api/routes/company.routes.js";
import postRoutes from "../api/routes/post.routes.js";
import chatRoutes from "../api/routes/chat.routes.js";
import messageRoutes from "../api/routes/message.routes.js";
import collabRoutes from "../api/routes/collaboration.routes.js";
import documentRoutes from "../api/routes/documents.routes.js";
import notificationRoutes from "../api/routes/notification.routes.js";
import feedbackRoutes from "../api/routes/feedback.routes.js";
import invitationRoutes from "../api/routes/invitation.routes.js";

dotenv.config();
const app = express();
const PORT = 8000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB server");
  } catch (err) {
    console.error(err);
  }
};

// Define a middleware function to set CORS headers
app.use((req, res, next) => {
  // Replace 'http://localhost:5173' with the actual origin of your frontend
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/company", companyRoutes);
app.use("/api/post", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/collaboration", collabRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/invitation", invitationRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT}`);
});
