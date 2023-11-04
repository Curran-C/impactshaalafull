import express from "express";
import {
  createChat,
  userChats,
  findChat,
} from "../controllers/chat.controller.js";
// import { cookieAuth } from "../utils/cookieAuth.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();

// router.use(cookieAuth);
router.use(authenticateUser);

router.post("/:userId", createChat);
router.get("/", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
