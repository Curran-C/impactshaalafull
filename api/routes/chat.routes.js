import express from "express";
import {
  createChat,
  userChats,
  findChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats); //find all chats of a user
router.get("/find/:firstId/:secondId", findChat); //finding a specific chat with a specific person

export default router;
